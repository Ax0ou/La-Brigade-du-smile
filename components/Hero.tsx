"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import TextReveal from "@/components/ui/TextReveal";

export default function Hero() {
    const { scrollY } = useScroll();
    const highlightScale = useTransform(scrollY, [800, 1000], [0, 1]);

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Parallax effects - reduced intensity for better stability
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const scrollToPersona = () => {
        const element = document.getElementById("persona-selector");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15, // Slightly faster stagger
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 }, // Reduced y offset
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1.0] as const,
            },
        },
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-[200vh] bg-[#FFF2E0]"
        >
            <div className="sticky top-20 h-[calc(100vh-5rem)] w-full overflow-hidden">
                <div className="relative flex h-full items-center justify-center px-4 md:px-6">
                    <div className="container relative z-10 mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">

                        {/* Left Column: Text */}
                        <motion.div
                            className="space-y-8 text-center md:text-left"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={itemVariants}>
                                <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
                                    <TextReveal>En mission pour relier les</TextReveal>{" "}
                                    <span className="relative inline-block">
                                        <span className="relative z-10">générations</span>
                                        <motion.span
                                            style={{ scaleX: highlightScale }}
                                            className="absolute bottom-0 -left-[5%] -z-10 h-[0.6em] w-[110%] origin-left -rotate-2 rounded-sm bg-[#C0C9EE]"
                                        />
                                    </span>
                                </h1>
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-4">
                                <p className="text-lg text-foreground/90 md:text-xl leading-relaxed">
                                    La Brigade du Smile est un service de <span className="font-bold text-primary">compagnons intergénérationnels:</span> des étudiants et jeunes professionnels formés pour accompagner les seniors.
                                </p>
                                <p className="text-lg text-foreground/80 md:text-xl leading-relaxed">
                                    Notre but : leur apporter <span className="font-bold text-secondary">dynamisme, énergie, stimulation et aide pratique</span> pour améliorer leur quotidien.
                                </p>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <MagneticButton strength={0.3} className="inline-block">
                                    <button
                                        onClick={scrollToPersona}
                                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-secondary hover:scale-105 active:scale-95"
                                    >
                                        <span>Join the Brigade !</span>
                                        <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
                                    </button>
                                </MagneticButton>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Image with Organic Shape */}
                        <div className="relative mx-auto aspect-square w-full max-w-md md:max-w-full">
                            <motion.div
                                style={{ y: y1 }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
                                className="relative h-full w-full"
                            >
                                <motion.div
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="relative h-full w-full overflow-hidden shadow-2xl"
                                    style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
                                >
                                    <div className="relative h-full w-full scale-110">
                                        <Image
                                            src="/hero-image.png"
                                            alt="La Brigade du Smile - Compagnons intergénérationnels"
                                            fill
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* Second Overlapping Image */}
                            <motion.div
                                style={{ y: y2 }}
                                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
                                className="absolute -bottom-12 -right-12 h-48 w-48 md:h-64 md:w-64"
                            >
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{
                                        duration: 5,
                                        delay: 1, // Offset for organic feel
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="relative h-full w-full overflow-hidden shadow-xl"
                                    style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
                                >
                                    <div className="relative h-full w-full scale-110">
                                        <Image
                                            src="/hero-image-2.png"
                                            alt="La Brigade du Smile - Diversité"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
