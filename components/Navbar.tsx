"use client";

import Link from "next/link";
import Image from "next/image";
import WavyText from "./WavyText";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
    const { scrollY } = useScroll();

    // Scroll threshold: curtain stays until 200px, then lifts quickly
    const curtainY = useTransform(
        scrollY,
        [0, 200, 400],
        ["0%", "0%", "-100%"]
    );

    // Logo animations
    const logoScale = useTransform(scrollY, [0, 400], [5, 1]);
    const heroLogoOpacity = useTransform(scrollY, [0, 200, 400], [1, 1, 0]);
    const navbarLogoOpacity = useTransform(scrollY, [200, 400], [0, 1]);

    // Nav items opacity
    const navItemsOpacity = useTransform(scrollY, [200, 400], [0, 1]);

    // Scroll indicator opacity (fades out when scrolling starts)
    const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

    return (
        <>
            {/* Violet "curtain" that stays until scroll threshold */}
            <motion.div
                className="fixed inset-0 bg-[#C0C9EE] z-[45]"
                style={{
                    y: curtainY,
                    pointerEvents: useTransform(scrollY, [300, 400], ["auto", "none"] as any)
                }}
            >
                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/60"
                    style={{ opacity: scrollIndicatorOpacity }}
                >
                    <span className="text-sm font-medium">Scroll pour découvrir</span>
                    <motion.div
                        animate={{
                            y: [0, 10, 0]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
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

            {/* Hero Logo - Centered on screen */}
            <motion.div
                className="fixed inset-0 flex items-center justify-center z-[60] pointer-events-none"
                style={{
                    opacity: heroLogoOpacity,
                    scale: logoScale,
                }}
            >
                <Image
                    src="/Lbds_logo.svg"
                    alt="La Brigade du Smile"
                    width={200}
                    height={200}
                    className="w-auto h-32 object-contain"
                    priority
                />
            </motion.div>

            {/* Navbar */}
            <nav className="sticky top-0 z-50 w-full">
                {/* Animated navbar background - only appears after curtain lifts */}
                <motion.div
                    className="absolute inset-0 bg-[#C0C9EE]/80 backdrop-blur-md -z-10"
                    style={{
                        opacity: useTransform(scrollY, [350, 450], [0, 1])
                    }}
                />

                <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">

                    {/* Left: Navigation Links */}
                    <motion.div
                        className="flex-1 flex justify-start items-center"
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
                                width={190}
                                height={100}
                                className="h-16 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </motion.div>

                    {/* Right: Contact CTA */}
                    <motion.div
                        className="flex-1 flex justify-end items-center"
                        style={{ opacity: navItemsOpacity }}
                    >
                        <button className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-secondary transition-colors">
                            Contact
                        </button>
                    </motion.div>
                </div>
            </nav>
        </>
    );
}
