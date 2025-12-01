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
        <span className={`inline-block overflow-hidden ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
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
            ))}
        </span>
    );
}
