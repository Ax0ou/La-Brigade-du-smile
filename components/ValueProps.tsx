"use client";

import { motion } from "framer-motion";
import { HeartHandshake, BrainCircuit, Hammer } from "lucide-react";

const pillars = [
    {
        title: "Compagnonnage / Lien social",
        description: "Visites à domicile, sorties culturelles, discussions passionnées.",
        icon: HeartHandshake,
        color: "bg-primary/10 text-primary border-primary",
    },
    {
        title: "Stimulation et apprentissage",
        description: "Ateliers cognitifs, aide numérique, jeux de mémoire.",
        icon: BrainCircuit,
        color: "bg-accent-yellow/20 text-foreground border-accent-yellow",
    },
    {
        title: "Aide pratique à domicile",
        description: "Petits travaux, assistance aux déplacements, courses.",
        icon: Hammer,
        color: "bg-accent-green/20 text-foreground border-accent-green",
    },
];

export default function ValueProps() {
    return (
        <section className="py-20 px-4 md:px-6 bg-white/50">
            <div className="container mx-auto">
                <div className="grid gap-8 md:grid-cols-3">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className={`flex flex-col items-center text-center p-8 rounded-3xl border-2 ${pillar.color} hover:scale-105 transition-transform duration-300 shadow-sm`}
                        >
                            <div className="mb-6 p-4 rounded-full bg-white shadow-sm">
                                <pillar.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-serif font-bold mb-3">{pillar.title}</h3>
                            <p className="text-foreground/80">{pillar.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
