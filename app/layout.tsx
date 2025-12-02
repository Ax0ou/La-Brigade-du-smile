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
  title: "La Brigade du Sourire",
  description: "Relier les générations : étudiants et seniors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        suppressHydrationWarning
        className={`${fraunces.variable} ${dmSans.variable} antialiased font-sans overflow-x-hidden`}
      >
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
