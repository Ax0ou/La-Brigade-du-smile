"use client";

import Link from "next/link";
import Image from "next/image";
import WavyText from "./WavyText";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
    const { scrollY } = useScroll();

    // Nav items opacity - appear quickly on scroll
    const navItemsOpacity = useTransform(scrollY, [0, 200], [0, 1]);

    // Navbar logo opacity - appear quickly on scroll
    const navbarLogoOpacity = useTransform(scrollY, [0, 200], [0, 1]);

    return (
        <>
            <nav className="sticky top-0 z-[100] w-full">
                {/* Animated navbar background - appears on scroll */}
                <motion.div
                    className="absolute inset-0 bg-[#C0C9EE]/80 backdrop-blur-md -z-10"
                    style={{
                        opacity: useTransform(scrollY, [0, 100], [0, 1])
                    }}
                />

                <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">

                    {/* Left: Navigation Links */}
                    <motion.div
                        className="flex-1 hidden md:flex justify-start items-center"
                        style={{ opacity: navItemsOpacity }}
                    >
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
                    </motion.div>

                    {/* Center: Navbar Logo (appears on scroll) */}
                    <motion.div
                        className="flex items-center justify-center"
                        style={{ opacity: navbarLogoOpacity }}
                    >
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
                    </motion.div>

                    {/* Right: Contact CTA */}
                    <motion.div
                        className="flex-1 flex justify-end items-center"
                        style={{ opacity: navItemsOpacity }}
                    >
                        <a href="mailto:roussel.agathe0@gmail.com" className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-secondary transition-colors">
                            Contact
                        </a>
                    </motion.div>
                </div>
            </nav>
        </>
    );
}
