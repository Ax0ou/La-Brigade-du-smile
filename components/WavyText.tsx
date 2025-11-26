"use client";

import { motion } from "framer-motion";

interface WavyTextProps {
    text: string;
    className?: string;
}

export default function WavyText({ text, className = "" }: WavyTextProps) {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
    };

    return (
        <motion.div
            style={{ display: "flex", overflow: "hidden" }}
            className={className}
            initial="initial"
            whileHover="hover"
        >
            {letters.map((letter, index) => (
                <motion.span
                    key={index}
                    variants={{
                        initial: { y: 0 },
                        hover: {
                            y: [0, -3, 0],
                            transition: {
                                duration: 0.4,
                                ease: "easeInOut",
                                delay: index * 0.03,
                                repeat: Infinity,
                                repeatDelay: 1
                            },
                        },
                    }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
}
