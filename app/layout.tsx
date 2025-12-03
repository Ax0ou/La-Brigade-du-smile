import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

import NoiseOverlay from "@/components/ui/NoiseOverlay";

export const metadata: Metadata = {
  title: "La Brigade du Sourire | Compagnons intergénérationnels",
  description: "Relier les générations : étudiants et seniors. La Brigade du Smile propose des services d'accompagnement, d'aide pratique et de lien social pour les aînés.",
  keywords: ["intergénérationnel", "étudiants", "seniors", "aide à domicile", "lien social", "La Brigade du Smile", "compagnons"],
  authors: [{ name: "La Brigade du Smile" }],
  creator: "La Brigade du Smile",
  publisher: "La Brigade du Smile",
  metadataBase: new URL("https://labrigadedusmile.ch"), // Replace with actual domain if different
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "La Brigade du Sourire | Compagnons intergénérationnels",
    description: "Relier les générations : étudiants et seniors. Découvrez nos services d'accompagnement.",
    url: "https://labrigadedusmile.ch",
    siteName: "La Brigade du Smile",
    locale: "fr_CH",
    type: "website",
    images: [
      {
        url: "/hero-image.png", // Using an existing image as OG image for now
        width: 1200,
        height: 630,
        alt: "La Brigade du Smile - Compagnons intergénérationnels",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Brigade du Sourire",
    description: "Relier les générations : étudiants et seniors.",
    images: ["/hero-image.png"], // Using an existing image
  },
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "La Brigade du Smile",
  "url": "https://labrigadedusmile.ch",
  "logo": "https://labrigadedusmile.ch/Lbds_logo.svg",
  "description": "Service de compagnons intergénérationnels reliant étudiants et seniors pour de l'aide pratique et du lien social.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CH"
  },
  "sameAs": [
    "https://www.instagram.com/labrigadedusmile",
    "https://www.linkedin.com/company/la-brigade-du-smile"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${fraunces.variable} ${dmSans.variable} antialiased font-sans overflow-x-hidden`}
      >
        <NoiseOverlay />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
