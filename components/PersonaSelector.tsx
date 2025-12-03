"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, User, Users, Building2, ArrowLeft, Send, Sparkles } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import TextReveal from "@/components/ui/TextReveal";

// ... (inside component)



type PersonaType = "student" | "family" | "pro";
type Step = "selection" | "details" | "success";

const personas = {
    student: {
        id: "student",
        label: "Devenez compagnon",
        icon: User,
        color: "bg-primary",
        text: "text-primary",
        border: "border-primary",
        shadow: "shadow-primary/30",
        gradient: "from-primary/20 to-primary/5",
        textColor: "text-white",
        uiColor: "bg-white/20",
        backBtnClass: "bg-white/10 text-white/80 hover:text-white hover:bg-white/20",
        title: "Complétez vos revenus en créant du lien",
        description: "Rejoignez une communauté de jeunes engagés et vivez une expérience humaine unique.",
        points: [
            {
                title: "Complète tes revenus",
                desc: "Finis les jobs étudiants non gratifiants : complètes tes revenus selon ton emploi du temps tout en aidant les autres."
            },
            {
                title: "Choisis tes missions selon tes disponibilités",
                desc: "Travaille quand tu peux selon ton emploi du temps et tes envies."
            },
            {
                title: "Crée du lien, fais la différence",
                desc: "Participe à l’amélioration de notre monde : crée du lien avec nos ainés ! Tu verras ils t’apporteront tout autant que tu leur rapportes."
            },
            {
                title: "Rejoins la communauté",
                desc: "Des jeunes engagés qui partagent des valeurs communes. Nous faisons le maximum pour t’associer à un senior qui partage tes passions."
            }
        ],
        cta: "Rejoindre l'aventure",
        formTitle: "C'est parti !",
        formDesc: "Laissez-nous vos coordonnées, on vous recontacte très vite.",
    },
    family: {
        id: "family",
        label: "Trouver un compagnon",
        icon: Users,
        color: "bg-accent-yellow",
        text: "text-accent-yellow",
        border: "border-accent-yellow",
        shadow: "shadow-accent-yellow/30",
        gradient: "from-accent-yellow/20 to-accent-yellow/5",
        textColor: "text-[#4A3B32]",
        uiColor: "bg-[#4A3B32]/10",
        backBtnClass: "bg-[#4A3B32]/10 text-[#4A3B32]/80 hover:text-[#4A3B32] hover:bg-[#4A3B32]/20",
        title: "Offrez un compagnon de confiance",
        description: "Transformer votre inquiétude en sérénité grâce à une présence régulière, sécurisée et pleine de vie pour vos parents.",
        points: [
            {
                title: "Le Check-up Sécurisé et l’aide pratique",
                desc: "Un compagnon qualifié et formé vient à domicile. Sa mission ? Vérifier que tout se passe bien, que votre parent est en bonne forme d'esprit, l’accompagner sur les tâches du quotidien. C'est le petit \"check-up\" régulier que vous ne pouvez plus faire."
            },
            {
                title: "L’énergie de la Jeunesse, la stimulation",
                desc: "Au-delà de la vérification, c'est un moment de vie. Nos jeunes brisent l'isolement en apportant une énergie neuve, jeune et bienveillante."
            }
        ],
        cta: "Trouver une perle",
        formTitle: "Parlons-en",
        formDesc: "Dites-nous comment nous pouvons vous aider.",
    },
    pro: {
        id: "pro",
        label: "Professionnels",
        icon: Building2,
        color: "bg-accent-green",
        text: "text-accent-green",
        border: "border-accent-green",
        shadow: "shadow-accent-green/30",
        gradient: "from-accent-green/20 to-accent-green/5",
        textColor: "text-[#4A3B32]",
        uiColor: "bg-[#4A3B32]/10",
        backBtnClass: "bg-[#4A3B32]/10 text-[#4A3B32]/80 hover:text-[#4A3B32] hover:bg-[#4A3B32]/20",
        title: "Renforcez le bien-être de vos résidents grâce à nos compagnons intergénérationnels",
        description: "Apportez jeunesse, dynamisme et stimulation !",
        points: [
            {
                title: "Améliore la qualité de vie des résidents",
                desc: "Nos compagnons créent des interactions humaines, proposent des activités stimulantes et renforcent le lien social pour réduire l’isolement de vos résidents."
            },
            {
                title: "Soutien au personnel soignant",
                desc: "En déléguant certaines activités sociales ou ateliers à nos compagnons, vos équipes peuvent se concentrer sur les soins et tâches essentielles."
            },
            {
                title: "Renforce l’image de votre établissement",
                desc: "Proposer des interactions intergénérationnelles valorise votre établissement, montre votre engagement envers le bien-être des résidents et crée des expériences positives tournées vers l’extérieur."
            },
            {
                title: "Flexibilité et adaptation",
                desc: "Nos compagnons interviennent selon vos horaires, vos besoins et le rythme de vos résidents, pour un service sur-mesure et facile à intégrer dans votre organisation."
            }
        ],
        cta: "Découvrir l'offre",
        formTitle: "Espace Pro",
        formDesc: "Laissez vos coordonnées pour une démo ou un devis.",
    },
};

export default function PersonaSelector() {
    const [step, setStep] = useState<Step>("selection");
    const [selected, setSelected] = useState<PersonaType>("student");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const currentPersona = personas[selected];

    useEffect(() => {
        if (step === "details" && sectionRef.current) {
            // Add a small delay to ensure layout is stable after animation starts
            setTimeout(() => {
                if (!sectionRef.current) return;

                const element = sectionRef.current;
                const elementRect = element.getBoundingClientRect();
                const absoluteElementTop = elementRect.top + window.pageYOffset;
                const elementHeight = elementRect.height;
                const windowHeight = window.innerHeight;

                // Calculate space above to center the element
                let spaceAbove = (windowHeight - elementHeight) / 2;

                // Ensure we have at least 120px top padding (Navbar + breathing room)
                // If the element is taller than the window, this will prioritize the top
                const minSpaceAbove = 120;

                if (spaceAbove < minSpaceAbove) {
                    spaceAbove = minSpaceAbove;
                }

                const targetScrollY = absoluteElementTop - spaceAbove;

                window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
            }, 100);
        }
    }, [step]);

    const handleSelect = (type: PersonaType) => {
        setSelected(type);
        setStep("details");
    };

    const handleBack = () => {
        setStep("selection");
    };

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
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStep("success");
            } else {
                alert("Une erreur est survenue. Veuillez réessayer.");
            }
        } catch (error) {
            console.error("Network error:", error);
            alert("Erreur de connexion.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section ref={sectionRef} id="persona-selector" className="py-10 px-4 md:px-6 container mx-auto min-h-[800px] flex flex-col justify-center relative">
            {/* Navigation Anchors */}
            <div id="devenir-compagnon" className="absolute -top-24 left-0 w-full h-0 pointer-events-none" />
            <div id="trouver-compagnon" className="absolute -top-24 left-0 w-full h-0 pointer-events-none" />
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,rgba(255,255,255,0)_70%)] pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto w-full">

                {/* Header - Only visible in selection step */}
                <AnimatePresence>
                    {step === "selection" && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center mb-20 space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/50 shadow-sm text-sm font-medium text-foreground/70">
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span>Une expérience sur-mesure</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight">
                                <TextReveal>Quelle est votre mission ?</TextReveal>
                            </h2>
                            <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
                                Sélectionnez le profil qui vous correspond pour découvrir comment nous pouvons avancer ensemble.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative min-h-[500px] flex flex-col justify-center">
                    <AnimatePresence mode="wait">

                        {/* STEP 1: SELECTION */}
                        {step === "selection" && (
                            <motion.div
                                key="selection"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            >
                                {(Object.keys(personas) as PersonaType[]).map((key, index) => {
                                    const persona = personas[key];
                                    return (
                                        <motion.button
                                            key={key}
                                            onClick={() => handleSelect(key)}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ y: -12, scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`group relative flex flex-col p-8 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 hover:border-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden text-left h-full ${persona.shadow} cursor-pointer`}
                                        >
                                            {/* Gradient Background on Hover */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${persona.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                            {/* Icon */}
                                            <div className={`relative mb-8 w-20 h-20 rounded-2xl ${persona.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                                                <persona.icon className="w-10 h-10" />
                                                <div className="absolute inset-0 bg-black/10 rounded-2xl" />
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl" />
                                            </div>

                                            {/* Content */}
                                            <div className="relative z-10">
                                                <h3 className="text-3xl font-serif font-bold text-foreground mb-4 group-hover:translate-x-1 transition-transform duration-300">
                                                    {persona.label}
                                                </h3>
                                                <p className="text-foreground/70 text-base leading-relaxed mb-8 group-hover:text-foreground/90 transition-colors">
                                                    {persona.description}
                                                </p>
                                            </div>

                                            {/* CTA */}
                                            <div className={`relative mt-auto flex items-center gap-3 text-sm font-bold uppercase tracking-wider ${persona.text} group-hover:gap-5 transition-all duration-300`}>
                                                <span>Commencer</span>
                                                <ArrowLeft className="w-5 h-5 rotate-180" />
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </motion.div>
                        )}

                        {/* STEP 2: DETAILS & FORM */}
                        {step === "details" && (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 40 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="bg-white/60 backdrop-blur-2xl rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 relative"
                            >
                                {/* Absolute Back Button - Always visible top-left */}
                                <button
                                    onClick={handleBack}
                                    className={`absolute top-4 left-4 z-30 flex items-center justify-center w-10 h-10 rounded-full backdrop-blur-md border border-white/30 shadow-lg transition-all cursor-pointer lg:hidden ${currentPersona.backBtnClass}`}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>

                                <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 min-h-[400px]">
                                    {/* Left: Details (Bottom on Mobile) */}
                                    <div className={`lg:col-span-5 p-6 md:p-8 ${currentPersona.color} ${currentPersona.textColor} flex flex-col justify-between relative overflow-hidden`}>
                                        {/* Abstract Shapes */}
                                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-2xl" />

                                        <div className="relative z-10">
                                            {/* Desktop Back Button */}
                                            <button
                                                onClick={handleBack}
                                                className={`hidden lg:flex items-center gap-2 transition-colors mb-6 group w-fit px-3 py-1.5 rounded-full backdrop-blur-sm cursor-pointer ${currentPersona.backBtnClass}`}
                                            >
                                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                                <span className="text-sm font-medium">Retour</span>
                                            </button>

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <div className={`mb-4 p-2.5 rounded-2xl w-fit backdrop-blur-md shadow-inner border border-white/10 hidden lg:block ${currentPersona.uiColor}`}>
                                                    <currentPersona.icon className="w-6 h-6" />
                                                </div>

                                                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3 leading-tight mt-4 lg:mt-0">
                                                    {currentPersona.title}
                                                </h3>

                                                <div className={`w-12 h-1 rounded-full mb-4 ${currentPersona.uiColor}`} />

                                                <ul className="space-y-3">
                                                    {currentPersona.points.map((point: any, index: number) => (
                                                        <motion.li
                                                            key={index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.3 + index * 0.1 }}
                                                            className={`flex items-start gap-3 text-sm md:text-base font-light ${currentPersona.textColor}/90`}
                                                        >
                                                            <div className={`mt-1 p-1 rounded-full shrink-0 ${currentPersona.uiColor}`}>
                                                                <Check className="w-3 h-3" strokeWidth={4} />
                                                            </div>

                                                            {typeof point === 'string' ? (
                                                                <span>{point}</span>
                                                            ) : (
                                                                <div className="flex flex-col gap-0.5">
                                                                    <span className={`font-bold text-sm md:text-base leading-tight ${currentPersona.textColor}`}>{point.title}</span>
                                                                    <span className={`text-xs md:text-sm leading-relaxed ${currentPersona.textColor}/80`}>{point.desc}</span>
                                                                </div>
                                                            )}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Right: Form (Top on Mobile) */}
                                    <div className="lg:col-span-7 p-5 md:p-8 flex flex-col justify-center bg-white/50 backdrop-blur-sm pt-14 lg:pt-8">
                                        <div className="max-w-md mx-auto w-full">
                                            <div className="mb-4 text-center lg:text-left">
                                                <h4 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-1">{currentPersona.formTitle}</h4>
                                                <p className="text-foreground/60 text-sm md:text-base">{currentPersona.formDesc}</p>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-3">
                                                <div className="space-y-1 group text-left">
                                                    <label className="text-xs font-bold text-foreground/80 ml-1 group-focus-within:text-primary transition-colors">Email</label>
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        required
                                                        className="w-full p-3 rounded-xl bg-white border-2 border-stone-100 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all shadow-sm group-hover:border-stone-200 text-sm"
                                                        placeholder="votre@email.com"
                                                    />
                                                </div>
                                                <div className="space-y-1 group text-left">
                                                    <label className="text-xs font-bold text-foreground/80 ml-1 group-focus-within:text-primary transition-colors">Téléphone</label>
                                                    <input
                                                        name="phone"
                                                        type="tel"
                                                        required
                                                        className="w-full p-3 rounded-xl bg-white border-2 border-stone-100 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all shadow-sm group-hover:border-stone-200 text-sm"
                                                        placeholder="06 12 34 56 78"
                                                    />
                                                </div>

                                                <MagneticButton className="w-full pt-2">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className={`w-full py-3 ${currentPersona.color} text-white font-bold text-base rounded-xl hover:brightness-110 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-xl ${currentPersona.shadow} cursor-pointer`}
                                                    >
                                                        {isSubmitting ? (
                                                            <motion.div
                                                                animate={{ rotate: 360 }}
                                                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                                            >
                                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                                                            </motion.div>
                                                        ) : (
                                                            <>
                                                                <span>Envoyer ma demande</span>
                                                                <Send className="w-4 h-4" />
                                                            </>
                                                        )}
                                                    </button>
                                                </MagneticButton>

                                                <p className="text-[10px] text-center text-foreground/40 mt-3">
                                                    En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: SUCCESS */}
                        {step === "success" && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-2xl p-12 md:p-24 text-center max-w-2xl mx-auto border border-white/60 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-white/0 to-green-50/50 pointer-events-none" />

                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", damping: 15, delay: 0.2 }}
                                    className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-10 relative z-10"
                                >
                                    <Check className="w-16 h-16 text-green-600" strokeWidth={3} />
                                </motion.div>

                                <div className="relative z-10">
                                    <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                                        Message bien reçu !
                                    </h3>
                                    <p className="text-xl text-foreground/60 mb-12 max-w-md mx-auto leading-relaxed">
                                        Merci de votre intérêt. Notre équipe va étudier votre demande et vous recontactera sous 24h.
                                    </p>

                                    <button
                                        onClick={() => {
                                            setStep("selection");
                                            setSelected("student");
                                        }}
                                        className="px-8 py-4 rounded-full bg-stone-100 text-stone-600 font-bold hover:bg-stone-200 transition-colors"
                                    >
                                        Retour à l'accueil
                                    </button>
                                </div>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

