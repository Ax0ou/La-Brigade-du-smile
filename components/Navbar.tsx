"use client";

import Link from "next/link";
import Image from "next/image";
import WavyText from "./WavyText";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
    const { scrollY } = useScroll();

    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] w-full">
            {/* Navbar background - always visible with blur */}
            <div className="absolute inset-0 bg-[#C0C9EE]/80 backdrop-blur-md -z-10" />

            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">

                {/* Left: Navigation Links */}
                <div className="flex-1 hidden md:flex justify-start items-center">
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="#devenir-compagnon"
                            className="text-sm font-medium text-foreground transition-colors"
                        >
                            <WavyText text="Devenir compagnon" />
                        </Link>
                        <Link
                            href="#trouver-compagnon"
                            className="text-sm font-medium text-foreground transition-colors"
                        >
                            <WavyText text="Trouver un compagnon" />
                        </Link>
                    </div>
                </div>

                {/* Center: Navbar Logo */}
                <div className="flex items-center justify-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/Lbds_logo.svg"
                            alt="La Brigade du Smile"
                            width={120}
                            height={40}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>

                {/* Right: Contact CTA */}
                <div className="flex-1 flex justify-end items-center">
                    <a href="mailto:roussel.agathe0@gmail.com" className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-secondary transition-colors">
                        Contact
                    </a>
                </div>
            </div>
        </nav>
    );
}
