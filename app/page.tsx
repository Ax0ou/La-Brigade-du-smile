import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import PersonaSelector from "@/components/PersonaSelector";
import Footer from "@/components/Footer";

import IntroOverlay from "@/components/IntroOverlay";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col overflow-x-hidden">
      <IntroOverlay />
      <Navbar />
      <Hero />
      <ValueProps />
      <PersonaSelector />
      <Footer />
    </main>
  );
}
