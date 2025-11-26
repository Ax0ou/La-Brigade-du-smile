"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const scrollToPersona = () => {
        const element = document.getElementById("persona-selector");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#FFF2E0] px-4 py-20 md:px-6">
            <div className="container relative z-10 mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">

                {/* Left Column: Text */}
                <div className="space-y-8 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
                            En mission pour relier les{" "}
                            <span className="relative inline-block">
                                <span className="relative z-10">générations</span>
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                                    className="absolute bottom-1 left-0 -z-10 h-[0.6em] w-full origin-left -rotate-1 rounded-sm bg-[#C0C9EE]"
                                />
                            </span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="space-y-4"
                    >
                        <p className="text-lg text-foreground/90 md:text-xl leading-relaxed">
                            La Brigade du Smile est un service de <span className="font-bold text-primary">compagnons intergénérationnels</span> des étudiants et jeunes professionnels formés pour accompagner les seniors.
                        </p>
                        <p className="text-lg text-foreground/80 md:text-xl leading-relaxed">
                            Notre but : leur apporter <span className="font-bold text-secondary">dynamisme, énergie, stimulation et aide pratique</span> pour améliorer leur quotidien.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    >
                        <button
                            onClick={scrollToPersona}
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-secondary hover:scale-105 active:scale-95"
                        >
                            <span>Join the Brigade !</span>
                            <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
                        </button>
                    </motion.div>
                </div>

                {/* Right Column: Image with Organic Shape */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative mx-auto aspect-square w-full max-w-md md:max-w-full"
                >
                    <div
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
                    </div>

                    {/* Second Overlapping Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="absolute -bottom-12 -right-12 h-48 w-48 overflow-hidden shadow-xl md:h-64 md:w-64"
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

            {/* Wavy Divider */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg
                    className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px]"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-white"
                    ></path>
                </svg>
            </div>
        </section>
    );
}
