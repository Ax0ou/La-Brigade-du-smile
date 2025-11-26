import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-foreground text-[#FFF9ED] py-12 px-4 md:px-6">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h4 className="font-serif text-xl font-bold mb-2">La Brigade du Sourire</h4>
                    <p className="text-sm opacity-80">Relier les générations, un sourire à la fois.</p>
                </div>

                <div className="flex gap-6">
                    <Link href="#" className="hover:text-primary transition-colors">
                        <Instagram className="w-6 h-6" />
                    </Link>
                    <Link href="#" className="hover:text-primary transition-colors">
                        <Facebook className="w-6 h-6" />
                    </Link>
                    <Link href="#" className="hover:text-primary transition-colors">
                        <Linkedin className="w-6 h-6" />
                    </Link>
                </div>

                <div className="flex gap-6 text-sm opacity-80">
                    <Link href="#" className="hover:text-primary transition-colors">Mentions légales</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Confidentialité</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
                </div>
            </div>
            <div className="container mx-auto mt-8 pt-8 border-t border-white/10 text-center text-xs opacity-60">
                © {new Date().getFullYear()} La Brigade du Sourire. Tous droits réservés.
            </div>
        </footer>
    );
}
