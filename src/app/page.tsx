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

export default function Home() {
  return (
    <div className="noise scanline">
      <CodeRain />
      <CursorTrail />
      <FloatingShapes />
      <Navbar />
      <main className="relative z-10">
        <Hero3D />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
