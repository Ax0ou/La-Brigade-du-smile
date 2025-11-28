import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

// Interfaces pour les données du formulaire
interface LeadData {
    type: "student" | "family" | "pro";
    email: string;
    phone: string;
}

export async function POST(request: NextRequest) {
    try {
        // Parser le body de la requête
        const body: LeadData = await request.json();

        console.log("Received lead submission:", body);

        // Validation basique
        if (!body.type || !body.email || !body.phone) {
            return NextResponse.json(
                { error: "Données manquantes" },
                { status: 400 }
            );
        }

        // Vérifier que les variables d'environnement sont présentes
        const notionApiKey = process.env.NOTION_API_KEY;
        const notionDatabaseId = process.env.NOTION_DATABASE_ID;

        if (!notionApiKey || !notionDatabaseId) {
            console.error("Variables d'environnement Notion manquantes");
            return NextResponse.json(
                { error: "Configuration serveur manquante" },
                { status: 500 }
            );
        }

        // Initialiser le client Notion
        const notion = new Client({
            auth: notionApiKey,
            notionVersion: "2022-06-28",
        });

        // Map the type to Client/Prestataire as per Notion schema
        let notionRole = "Client";
        if (body.type === "student" || body.type === "pro") {
            notionRole = "Prestataire";
        }

        // Also keep the original label for logging or other fields if needed
        const typeLabels: Record<string, string> = {
            student: "Devenir Compagnon",
            family: "Trouver un Compagnon",
            pro: "Professionnel"
        };
        const detailedLabel = typeLabels[body.type] || body.type;

        // Créer une nouvelle entrée dans la base de données Notion
        await notion.pages.create({
            parent: { database_id: notionDatabaseId },
            properties: {
                "Email": {
                    title: [
                        {
                            text: {
                                content: body.email,
                            }
                        }
                    ]
                },
                "Type": {
                    select: {
                        name: detailedLabel, // Using "Devenir Compagnon" etc. as per old code logic which matches current project context
                    },
                },
                "Phone": {
                    phone_number: body.phone,
                },
                "Date": {
                    date: {
                        start: new Date().toISOString(),
                    },
                },
            },
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        console.error("Erreur lors de l'ajout à Notion:", error);
        // Log detailed error for debugging
        if (error.body) {
            console.error("Notion Error Body:", error.body);
        }

        return NextResponse.json(
            { error: "Erreur lors de l'enregistrement", details: error.message },
            { status: 500 }
        );
    }
}
