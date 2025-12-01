import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-foreground text-[#FFF9ED] py-12 px-4 md:px-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <div className="mb-4">
                        <Image
                            src="/Lbds_logo.svg"
                            alt="La Brigade du Smile"
                            width={150}
                            height={150}
                            className="brightness-0 invert opacity-90" // Making it white for the dark footer
                        />
                    </div>
                    <p className="text-sm opacity-80">Relier les générations, un sourire à la fois.</p>
                </div>

                <div className="flex gap-6 text-sm opacity-80">
                    <Link href="mailto:roussel.agathe0@gmail.com" className="hover:text-primary transition-colors">Contact</Link>
                </div>
            </div>
            <div className="container mx-auto mt-8 pt-8 border-t border-white/10 text-center text-xs opacity-60">
                © {new Date().getFullYear()} La Brigade du Smile. Tous droits réservés.
            </div>
        </footer>
    );
}
