import { Navbar } from "@/components/Navbar";
import { Hero3D } from "@/components/Hero3D";
import { CodeRain } from "@/components/CodeRain";
import { CursorTrail } from "@/components/CursorTrail";
import { FloatingShapes } from "@/components/FloatingShapes";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SectionReveal } from "@/components/SectionReveal";
import { Portal } from "@/components/Grid3D";
import { GameOverlay } from "@/components/GameOverlay";

export default function Home() {
  return (
    <GameOverlay>
      <div className="noise scanline">
        <CodeRain />
        <CursorTrail />
        <FloatingShapes />
        <Navbar />
        <main className="relative z-10">
          <Hero3D />
          <Portal />
          <SectionReveal>
            <About />
          </SectionReveal>
          <Portal />
          <SectionReveal>
            <Projects />
          </SectionReveal>
          <Portal />
          <SectionReveal>
            <Skills />
          </SectionReveal>
          <Portal />
          <SectionReveal>
            <Experience />
          </SectionReveal>
          <Portal />
          <SectionReveal>
            <Contact />
          </SectionReveal>
        </main>
        <Footer />
      </div>
    </GameOverlay>
  );
}
