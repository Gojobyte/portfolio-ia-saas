import { Navbar } from "@/components/Navbar";
import { Hero3D } from "@/components/Hero3D";
import { ParticleCanvas } from "@/components/ParticleCanvas";
import { FloatingShapes } from "@/components/FloatingShapes";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="noise">
      <ParticleCanvas />
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
