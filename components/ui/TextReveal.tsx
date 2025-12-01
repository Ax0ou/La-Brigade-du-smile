"use client";

import { motion } from "framer-motion";

export default function TextReveal({
    children,
    className = "",
    delay = 0,
}: {
    children: string;
    className?: string;
    delay?: number;
}) {
    const words = children.split(" ");

    return (
        <span className={className}>
            {words.map((word, i) => {
                const element = (
                    <span key={i} className="inline-block overflow-hidden align-bottom">
                        <motion.span
                            initial={{ y: "100%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: delay + i * 0.03,
                                ease: [0.33, 1, 0.68, 1],
                            }}
                            className="inline-block"
                        >
                            {word}
                        </motion.span>
                    </span>
                );
                return i < words.length - 1 ? [element, " "] : element;
            })}
        </span>
    );
}
