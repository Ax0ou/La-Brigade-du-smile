"use client";

import Link from "next/link";
import Image from "next/image";
import WavyText from "./WavyText";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
    const { scrollY } = useScroll();

    // Desktop: curtain lifts sooner and fades to fully reveal hero
    const curtainY = useTransform(
        scrollY,
        [0, 150, 450],
        ["0%", "0%", "-100%"]
    );
    const curtainOpacity = useTransform(scrollY, [0, 150, 450], [1, 1, 0]);


    // Logo animation while the curtain lifts
    const logoScale = useTransform(scrollY, [0, 180], [1.1, 0.9]);

    // Nav items opacity
    const navbarLogoOpacity = useTransform(scrollY, [160, 260], [0, 1]);
    const navItemsOpacity = useTransform(scrollY, [160, 260], [0, 1]);

    // Scroll indicator opacity (fades out when scrolling starts)
    const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

    return (
        <>
            {/* Unified violet curtain that lifts with the logo */}
            <motion.div
                className="fixed inset-0 bg-[#C0C9EE] z-[45] md:hidden"
                style={{
                    opacity: curtainOpacity,
                    pointerEvents: useTransform<string>(scrollY, [150, 200], ["auto", "none"])
                }}
            />

            {/* Desktop Curtain: Lifts Up */}
            <motion.div
                className="fixed inset-0 bg-[#C0C9EE] z-[45] hidden md:block"
                style={{
                    y: curtainY,
                    pointerEvents: useTransform<string>(scrollY, [350, 450], ["auto", "none"])
                }}
            >
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ opacity: curtainOpacity, scale: logoScale }}
                >
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="rounded-full bg-white/40 px-8 py-6 shadow-lg"
                    >
                        <Image
                            src="/Lbds_logo.svg"
                            alt="La Brigade du Smile"
                            width={220}
                            height={72}
                            className="h-16 w-auto object-contain"
                            priority
                        />
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/60"
                    style={{ opacity: scrollIndicatorOpacity }}
                >
                    <span className="text-sm font-medium">Scroll pour découvrir</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 5v14M19 12l-7 7-7-7" />
                        </svg>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 w-full">
                {/* Animated navbar background - only appears after curtain lifts */}
                <motion.div
                    className="absolute inset-0 bg-[#C0C9EE]/80 backdrop-blur-md -z-10"
                    style={{
                        opacity: useTransform(scrollY, [700, 850], [0, 1])
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
                        <Link
                            href="#trouver-compagnon"
                            className="text-sm font-medium text-foreground transition-colors"
                        >
                            <WavyText text="Trouver un compagnon" />
                        </Link>
                    </div>
                </div>

                {/* Center: Navbar Logo */}
                <div className="flex items-center justify-center mt-1">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/Lbds_logo.svg"
                            alt="La Brigade du Smile"
                            width={120}
                            height={60}
                            className="h-16 w-auto object-contain"
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
