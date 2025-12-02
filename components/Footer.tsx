"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Smile, Heart, Stamp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const smileMessages = [
    "Validé par Yvette, 84 ans",
    "N'oublie pas d'appeler ta mamie !",
    "Tu rayonnes aujourd'hui !",
    "Un sourire, c'est gratuit !",
    "Prends soin de toi ❤️",
    "La vie est belle, non ?",
    "T'as un joli sourire !",
    "Pense à boire de l'eau 💧",
    "Bisous de la Brigade 😘"
];

export default function Footer() {
    const [message, setMessage] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSmile = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Force a brief null state to re-trigger animation if needed, 
        // or just swap the text. To make it feel responsive, let's just swap.
        // But to ensure AnimatePresence sees a change if the message happens to be the same (unlikely but possible),
        // or to restart the "enter" animation, we might want to use a unique key.
        // For now, just swapping the message is fine, but let's ensure we don't pick the exact same one if possible.

        let random;
        do {
            random = smileMessages[Math.floor(Math.random() * smileMessages.length)];
        } while (random === message && smileMessages.length > 1);

        setMessage(random);

        timeoutRef.current = setTimeout(() => {
            setMessage(null);
            timeoutRef.current = null;
        }, 3000);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <footer className="py-12 pb-32 text-center relative z-10">
            {/* Main Footer Content (Simplified) */}
            <div className="container mx-auto px-4 opacity-60 hover:opacity-100 transition-opacity duration-500">
                <p className="text-sm text-foreground/60 mb-2">
                    © {new Date().getFullYear()} La Brigade du Smile. Fait avec <Heart className="inline w-3 h-3 text-red-400 mx-1" /> pour nos aînés.
                </p>
                <div className="flex justify-center gap-4 text-xs text-foreground/40">
                    <Link href="mailto:roussel.agathe0@gmail.com" className="hover:text-primary transition-colors cursor-pointer">Contact</Link>
                </div>
            </div>

            {/* Floating Action Footer (Now Static) */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="mx-auto mt-12 inline-flex items-center gap-2 p-2 pr-6 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-full relative z-50"
            >
                {/* Boîte à Smile Button Group */}
                <div className="relative flex items-center gap-3 pr-2">
                    <motion.button
                        onClick={handleSmile}
                        className="flex items-center gap-3 bg-gradient-to-br from-primary to-secondary rounded-full p-1 pr-5 shadow-lg hover:shadow-xl transition-all group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="flex items-center justify-center w-10 h-10 bg-white text-primary rounded-full shadow-sm"
                        >
                            <Smile className="w-6 h-6" />
                        </motion.div>

                        <span className="text-sm font-bold text-white leading-tight">Clique ici</span>
                    </motion.button>

                    {/* Message Bubble */}
                    <AnimatePresence mode="wait">
                        {message && (
                            <motion.div
                                key={message}
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: -10, scale: 1 }}
                                exit={{ opacity: 0, y: 0, scale: 0.8 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-[200px] bg-white text-foreground text-sm font-bold py-2 px-4 rounded-2xl shadow-xl border border-stone-100 text-center z-50"
                            >
                                {message}
                                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-stone-100" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-foreground/10 mx-2" />

                {/* Grandma Approved Badge */}
                <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity" title="Certifié par nos grands-mères">
                    <div className="w-8 h-8 rounded-full bg-accent-yellow/20 flex items-center justify-center text-accent-yellow border border-accent-yellow/30 rotate-12">
                        <Stamp className="w-4 h-4" />
                    </div>
                    <div className="hidden sm:flex flex-col leading-none">
                        <span className="text-[9px] uppercase tracking-wider font-bold text-foreground/40">Certifié</span>
                        <span className="text-[10px] font-bold text-accent-yellow">Grand-Mère</span>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}
