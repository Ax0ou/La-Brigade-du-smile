import Link from "next/link";
import Image from "next/image";
import WavyText from "./WavyText";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-stone-200 bg-[#C0C9EE]/80 backdrop-blur-md">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 relative">

                {/* Left: Navigation Links (Desktop) */}
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        href="#devenir-compagnon"
                        className="text-sm font-medium text-foreground transition-colors"
                    >
                        <WavyText text="Devenir compagnon" />
                    </Link>
                    <Link
                        href="#trouver-compagnon"
                        className="text-sm font-medium text-foreground transition-colors"
                    >
                        <WavyText text="Trouver un compagnon" />
                    </Link>
                </div>

                {/* Mobile Menu Placeholder (Left) */}
                <div className="md:hidden">
                    {/* We can add a hamburger menu here later */}
                </div>

                {/* Center: Logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Link href="/" className="flex items-center gap-2">
                        {/* Uncomment the Image component once you have the file */}
                        <Image src="/logo-removebg-preview.png" alt="La Brigade du Smile" width={190} height={190} className="object-contain" />
                    </Link>
                </div>

                {/* Right: Contact CTA */}
                <div className="flex items-center gap-4">
                    <button className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-secondary transition-colors">
                        Contact
                    </button>
                </div>
            </div>
        </nav>
    );
}
