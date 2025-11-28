"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, User, Users, Building2 } from "lucide-react";
import Modal from "./Modal";

type PersonaType = "student" | "family" | "pro";

const personas = {
    student: {
        id: "student",
        label: "Devenez compagnon",
        icon: User,
        color: "bg-primary",
        title: "Complètes tes revenus tout en créant du lien social avec tes ainés !",
        points: [
            "Complète tes revenus : Finis les jobs étudiants non gratifiants.",
            "Choisis tes missions selon tes disponibilités.",
            "Crée du lien : Ils t’apporteront tout autant que tu leur rapportes.",
            "Rejoins la communauté : Des jeunes engagés qui partagent des valeurs communes.",
        ],
        cta: "Nous rejoindre",
        modalTitle: "Rejoindre la Brigade",
        modalDesc: "Laisse nous tes coordonnés mail nous te recontacterons au plus vite",
    },
    family: {
        id: "family",
        label: "Trouver un compagnon",
        icon: Users,
        color: "bg-secondary",
        title: "Offrez à votre proche un compagnon de confiance.",
        points: [
            "Apporter jeunesse, joie et stimulation.",
            "Des étudiants sélectionnés et formés (processus rigoureux).",
            "Un accompagnement personnalisé (selon passions).",
            "Tranquilité d’esprit (accompagnement fiable).",
        ],
        cta: "Ecrivez nous !",
        modalTitle: "Trouver un compagnon",
        modalDesc: "Laissez nous vos coordonnées : mail et tel nous vous rappelons dans les 24h",
    },
    pro: {
        id: "pro",
        label: "Professionnels du Mieux Vieillir",
        icon: Building2,
        color: "bg-accent-green",
        title: "Renforcez le bien être de vos résidents grâce à nos compagnons intergénérationnels.",
        points: [
            "Améliore la qualité de vie des résidents.",
            "Soutien au personnel soignant (délégation d'activités sociales).",
            "Renforce l’image de votre établissement.",
            "Flexibilité et adaptation.",
        ],
        cta: "Nous contacter",
        modalTitle: "Espace Professionnel",
        modalDesc: "Laissez un mail et un numéro, nous vous rapelerons dans les 24h",
    },
};

export default function PersonaSelector() {
    const [selected, setSelected] = useState<PersonaType>("student");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const currentPersona = personas[selected];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            email: formData.get("email"),
            phone: formData.get("phone"),
            type: selected,
        };

        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Trigger success animation
                setIsSuccess(true);
                // Reset after delay or keep it? 
                // Let's keep it in success state until closed.
            } else {
                const errorData = await response.json();
                console.error("Submission error:", errorData);
                alert("Une erreur est survenue. Veuillez réessayer.");
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Erreur de connexion. Veuillez vérifier votre internet.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset state when modal closes
    const handleClose = () => {
        setIsModalOpen(false);
        // Small delay to reset state after modal is closed
        setTimeout(() => {
            setIsSuccess(false);
            setIsSubmitting(false);
        }, 300);
    };

    return (
        <section id="persona-selector" className="py-20 px-4 md:px-6 container mx-auto">
            <div className="flex flex-col items-center space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                        Quelle est votre mission ?
                    </h2>
                    <p className="text-lg text-foreground/80">
                        Choisissez votre profil pour découvrir comment nous pouvons avancer ensemble.
                    </p>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                    {(Object.keys(personas) as PersonaType[]).map((key) => {
                        const persona = personas[key];
                        const isSelected = selected === key;
                        return (
                            <button
                                key={key}
                                onClick={() => setSelected(key)}
                                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3 text-center
                  ${isSelected
                                        ? `border-primary bg-primary/5 shadow-lg scale-105 z-10`
                                        : "border-stone-200 bg-white hover:border-primary/50 hover:bg-stone-50"
                                    }`}
                            >
                                <div
                                    className={`p-3 rounded-full ${isSelected ? "bg-primary text-white" : "bg-stone-100 text-stone-500"
                                        }`}
                                >
                                    <persona.icon className="w-6 h-6" />
                                </div>
                                <span
                                    className={`font-bold text-lg ${isSelected ? "text-primary" : "text-stone-600"
                                        }`}
                                >
                                    {persona.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="w-full max-w-4xl bg-white rounded-3xl border-2 border-primary/20 p-8 md:p-12 shadow-xl relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selected}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                                    {currentPersona.title}
                                </h3>
                                <div className="h-1 w-20 bg-primary rounded-full" />
                            </div>

                            <ul className="grid gap-4 md:grid-cols-2">
                                {currentPersona.points.map((point, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="mt-1 p-1 rounded-full bg-accent-green/20 text-accent-green">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        <span className="text-foreground/80 font-medium">{point}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-8 py-4 bg-primary text-white font-bold rounded-full text-lg shadow-lg hover:bg-secondary hover:scale-105 transition-all"
                                >
                                    {currentPersona.cta}
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleClose}
                title={isSuccess ? " " : currentPersona.modalTitle}
            >
                <AnimatePresence mode="wait">
                    {isSuccess ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex flex-col items-center justify-center py-8 text-center"
                        >
                            {/* Success Icon Container */}
                            <div className="relative mb-6">
                                {/* Animated Background Blob */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", damping: 12, delay: 0.2 }}
                                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"
                                >
                                    {/* Animated Checkmark */}
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="48"
                                        height="48"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-green-600"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </motion.svg>
                                </motion.div>

                                {/* Flying Plane (Decorative, leaving the scene) */}
                                <motion.div
                                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                    animate={{
                                        x: 100,
                                        y: -100,
                                        opacity: 0,
                                        scale: 0.5,
                                        rotate: -45
                                    }}
                                    transition={{ duration: 0.8, ease: "easeIn" }}
                                    className="absolute top-0 left-0 text-primary pointer-events-none"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="22" x2="11" y1="2" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-2"
                            >
                                <h3 className="text-2xl font-bold text-gray-900">Message envoyé !</h3>
                                <p className="text-gray-500 max-w-xs mx-auto">
                                    Nous avons bien reçu votre demande. <br />
                                    Notre équipe vous recontactera sous 24h.
                                </p>
                            </motion.div>

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                onClick={handleClose}
                                className="mt-8 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                Fermer
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <p className="text-foreground/80 mb-4">{currentPersona.modalDesc}</p>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full p-3 rounded-xl border-2 border-stone-200 focus:border-primary focus:outline-none transition-colors"
                                    placeholder="votre@email.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground">Téléphone</label>
                                <input
                                    name="phone"
                                    type="tel"
                                    required
                                    className="w-full p-3 rounded-xl border-2 border-stone-200 focus:border-primary focus:outline-none transition-colors"
                                    placeholder="06 12 34 56 78"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-secondary transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group overflow-hidden relative"
                            >
                                <span className={`transition-transform duration-300 ${isSubmitting ? '-translate-y-10' : 'translate-y-0'}`}>
                                    Envoyer
                                </span>
                                {isSubmitting && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                )}
                                {!isSubmitting && (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
                                    >
                                        <line x1="22" x2="11" y1="2" y2="13"></line>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                    </svg>
                                )}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </Modal>
        </section>
    );
}
