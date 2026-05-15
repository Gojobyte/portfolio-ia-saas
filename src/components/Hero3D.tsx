"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { GlitchText } from "./GlitchText";

const roles = [
  "Full Stack Developer",
  "Next.js Expert",
  "TypeScript Enthusiast",
  "SaaS Builder",
  "AI-Powered Coder",
];

function ExtrudedText({ text, className, depth = 8 }: { text: string; className?: string; depth?: number }) {
  return (
    <div className="relative" style={{ transformStyle: "preserve-3d" }}>
      {/* Shadow layers for 3D extrusion */}
      {Array.from({ length: depth }).map((_, i) => (
        <span
          key={i}
          className={`absolute inset-0 select-none pointer-events-none ${className}`}
          style={{
            transform: `translateZ(${-(i + 1) * 3}px)`,
            opacity: 0.03,
            color: "#6366f1",
          }}
          aria-hidden
        >
          {text}
        </span>
      ))}
      {/* Main text */}
      <span className={className} style={{ transform: "translateZ(0px)", position: "relative" }}>
        {text}
      </span>
    </div>
  );
}

function MagneticLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 200, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x: smoothX, y: smoothY }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export function Hero3D() {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

  // Scroll-driven zoom out
  const scrollScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.85]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scrollZ = useTransform(scrollYProgress, [0, 0.15], [0, -300]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="accueil"
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: 1500 }}
    >
      {/* Spotlight that follows cursor */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1] opacity-40"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]: number[]) =>
              `radial-gradient(circle 400px at ${50 + (x as number) * 40}% ${50 + (y as number) * 40}%, rgba(99,102,241,0.08), transparent 70%)`
          ),
        }}
      />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{
          rotateX,
          rotateY,
          scale: scrollScale,
          opacity: scrollOpacity,
          translateZ: scrollZ,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, z: -100, rotateX: -30 }}
          animate={{ opacity: 1, z: 0, rotateX: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ transform: "translateZ(60px)" }}
          className="inline-flex items-center gap-2 mb-10 px-5 py-2.5 rounded-full glass-card"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-muted">Disponible pour collaborer</span>
        </motion.div>

        {/* 3D Extruded Name */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d", transform: "translateZ(80px)" }}
          className="mb-6"
        >
          <ExtrudedText
            text="Adoum"
            className="block text-6xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none text-foreground"
            depth={10}
          />
          <div className="block text-6xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none">
            <GlitchText text="Salah" className="text-gradient" />
          </div>
        </motion.div>

        {/* Animated role - 3D flip */}
        <div className="h-12 mb-10 overflow-hidden" style={{ perspective: 600, transform: "translateZ(50px)" }}>
          <motion.div
            key={roleIndex}
            initial={{ rotateX: -90, opacity: 0, y: 30 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={{ rotateX: 90, opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-3xl font-mono text-accent-light"
          >
            {`{ ${roles[roleIndex]} }`}
          </motion.div>
        </div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ transform: "translateZ(30px)" }}
        >
          Je concois des applications web modernes et performantes.
          Specialise en <span className="text-foreground font-medium">Next.js</span>,{" "}
          <span className="text-foreground font-medium">TypeScript</span> et{" "}
          <span className="text-foreground font-medium">PostgreSQL</span>, j&apos;utilise
          l&apos;IA pour livrer plus vite et mieux.
        </motion.p>

        {/* CTA - Magnetic buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14" style={{ transform: "translateZ(40px)" }}>
          <MagneticLink
            href="#projets"
            className="group px-8 py-4 bg-accent hover:bg-accent-light text-white rounded-full font-medium transition-all hover:shadow-[0_0_60px_-5px_var(--accent)] flex items-center gap-2 text-lg"
          >
            Decouvrir mes projets
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </MagneticLink>
          <MagneticLink
            href="#contact"
            className="px-8 py-4 rounded-full font-medium glass-card text-foreground hover:border-accent/30 transition-all text-lg"
          >
            Me contacter
          </MagneticLink>
        </div>

        {/* Social - Magnetic */}
        <div className="flex items-center justify-center gap-5" style={{ transform: "translateZ(20px)" }}>
          {[
            { href: "https://github.com/Gojobyte", icon: <GithubIcon size={22} />, label: "GitHub" },
            { href: "https://www.linkedin.com/in/adoum-salah-101221232/", icon: <LinkedinIcon size={22} />, label: "LinkedIn" },
            { href: "mailto:sadoumachi@gmail.com", icon: <Mail size={22} />, label: "Email" },
          ].map((s) => (
            <MagneticLink
              key={s.label}
              href={s.href}
              className="w-14 h-14 rounded-full glass-card flex items-center justify-center text-muted hover:text-accent-light hover:border-accent/30 hover:shadow-[0_0_30px_-5px_var(--accent-glow)] transition-all"
            >
              {s.icon}
            </MagneticLink>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border border-card-border flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-accent-light"
          />
        </div>
      </motion.div>
    </section>
  );
}
