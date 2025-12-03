import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://labrigadedusmile.ch"; // Replace with actual domain

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/api/", // Disallow API routes
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
