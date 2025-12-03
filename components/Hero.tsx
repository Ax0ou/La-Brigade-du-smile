"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import TextReveal from "@/components/ui/TextReveal";

export default function Hero() {
    const { scrollY } = useScroll();

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Parallax effects - reduced intensity for better stability
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -35]);

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
            className="relative bg-[#FFF2E0] overflow-hidden"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(192,201,238,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(244,211,94,0.15),transparent_30%)]" />

            <div className="container relative z-10 mx-auto px-4 md:px-6 pt-36 md:pt-28 pb-12 min-h-[80vh] flex items-center">
                <div className="grid max-w-6xl mx-auto gap-12 lg:gap-16 lg:grid-cols-2 lg:items-center">

                    {/* Left Column: Text */}
                    <motion.div
                        className="space-y-6 sm:space-y-8 text-center lg:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants}>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-foreground">
                                <TextReveal>En mission pour relier les</TextReveal>{" "}
                                <span className="relative inline-block">
                                    <span className="relative z-10">générations</span>
                                    <motion.span
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{
                                            delay: 2.2,
                                            duration: 0.8,
                                            ease: "easeOut"
                                        }}
                                        className="absolute bottom-0 left-0 -z-10 h-[0.6em] w-full origin-left -rotate-2 rounded-sm bg-[#C0C9EE]"
                                    />
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-4 sm:space-y-5">
                            <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed">
                                La Brigade du Smile est un service de <span className="font-bold text-primary">compagnons intergénérationnels:</span> des étudiants et jeunes professionnels formés pour accompagner les seniors.
                            </p>
                            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed">
                                Notre but : leur apporter <span className="font-bold text-secondary">dynamisme, énergie, stimulation et aide pratique</span> pour améliorer leur quotidien.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <MagneticButton strength={0.3} className="inline-block">
                                <button
                                    onClick={scrollToPersona}
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#898AC4] text-white font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <span className="relative z-10">Join the Brigade !</span>
                                    <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
                                </button>
                            </MagneticButton>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Image with Organic Shape */}
                    <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] sm:max-w-[520px] lg:max-w-[560px] mt-4 sm:mt-8 lg:mt-0 lg:ml-auto">
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
                            className="absolute -bottom-8 right-4 sm:-bottom-10 sm:right-10 h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48"
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
        </section >
    );
}
