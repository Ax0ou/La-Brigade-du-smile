"use client";

import { motion } from "framer-motion";
import { HeartHandshake, BrainCircuit, Hammer, Sparkles } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";

const pillars = [
    {
        title: "Aide pratique",
        description: "Aller faire les courses, changer une ampoule, tondre la pelouse : tous les petits gestes du quotidien qui deviennent une montagne de stress pour nos ainés",
        icon: Hammer,
        color: "text-accent-green",
        bg: "bg-accent-green/10",
        gradient: "from-accent-green/20 to-accent-green/5",
        border: "group-hover:border-accent-green/50",
        shadow: "group-hover:shadow-accent-green/20",
    },
    {
        title: "Lien social",
        description: "Visites à domicile pour check-up, conversations, etc",
        icon: HeartHandshake,
        color: "text-primary",
        bg: "bg-primary/10",
        gradient: "from-primary/20 to-primary/5",
        border: "group-hover:border-primary/50",
        shadow: "group-hover:shadow-primary/20",
    },
    {
        title: "Stimulation et apprentissage",
        description: "Ateliers cognitifs, créatifs et numériques pour stimuler mémoire, autonomie et créativité.",
        icon: BrainCircuit,
        color: "text-accent-yellow",
        bg: "bg-accent-yellow/10",
        gradient: "from-accent-yellow/20 to-accent-yellow/5",
        border: "group-hover:border-accent-yellow/50",
        shadow: "group-hover:shadow-accent-yellow/20",
    },
];

export default function ValueProps() {
    return (
        <section className="value-props-section section-spacing px-4 md:px-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_70%)] pointer-events-none -z-10" />

            <div className="container mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 shadow-sm text-sm font-medium text-foreground/70"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>Nos piliers d'intervention</span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-bold text-foreground"
                    >
                        <TextReveal>Plus qu'un service,</TextReveal> <span className="italic text-primary">une relation</span>
                    </motion.h2>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            whileHover={{ y: -10 }}
                            className={`group relative flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-xl border border-white/60 hover:border-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden ${pillar.shadow}`}
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            {/* Icon */}
                            <div className={`relative mb-8 w-20 h-20 rounded-2xl ${pillar.bg} flex items-center justify-center ${pillar.color} shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                <pillar.icon className="w-10 h-10" />
                                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Content */}
                            <div className="relative z-10">
                                <h3 className="text-2xl font-serif font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                                    {pillar.title}
                                </h3>
                                <p className="text-foreground/70 text-lg leading-relaxed group-hover:text-foreground/90 transition-colors">
                                    {pillar.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
