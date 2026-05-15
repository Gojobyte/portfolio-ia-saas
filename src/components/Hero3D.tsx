"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const roles = [
  "Full Stack Developer",
  "Next.js Expert",
  "TypeScript Enthusiast",
  "SaaS Builder",
  "AI-Powered Coder",
];

export function Hero3D() {
  const [roleIndex, setRoleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const translateZ = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="accueil"
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center" style={{ perspective: 1200 }}>
        <motion.div
          style={{ rotateX, rotateY, translateZ, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ transform: "translateZ(40px)" }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full glass-card"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-muted">Disponible pour collaborer</span>
          </motion.div>

          {/* Name - 3D layered */}
          <div style={{ transformStyle: "preserve-3d" }}>
            <motion.h1
              className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-2"
              style={{ transform: "translateZ(60px)" }}
            >
              <span className="text-foreground">Adoum</span>
            </motion.h1>
            <motion.h1
              className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none mb-6"
              style={{ transform: "translateZ(80px)" }}
            >
              <span className="text-gradient">Salah</span>
            </motion.h1>

            {/* Shadow text for depth */}
            <div
              className="absolute top-0 left-0 w-full text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter leading-none opacity-[0.03] select-none pointer-events-none"
              style={{ transform: "translateZ(-40px) scale(1.05)" }}
              aria-hidden
            >
              <div>Adoum</div>
              <div>Salah</div>
            </div>
          </div>

          {/* Animated role */}
          <div className="h-10 mb-8 overflow-hidden" style={{ transform: "translateZ(50px)" }}>
            <motion.div
              key={roleIndex}
              initial={{ y: 50, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -50, opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xl sm:text-2xl font-mono text-accent-light"
            >
              {roles[roleIndex]}
            </motion.div>
          </div>

          {/* Bio */}
          <motion.p
            className="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ transform: "translateZ(30px)" }}
          >
            Je concois des applications web modernes et performantes.
            Specialise en <span className="text-foreground font-medium">Next.js</span>,{" "}
            <span className="text-foreground font-medium">TypeScript</span> et{" "}
            <span className="text-foreground font-medium">PostgreSQL</span>, j&apos;utilise
            l&apos;IA pour livrer plus vite et mieux.
          </motion.p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14" style={{ transform: "translateZ(40px)" }}>
            <a
              href="#projets"
              className="group px-8 py-3.5 bg-accent hover:bg-accent-light text-white rounded-full font-medium transition-all hover:shadow-[0_0_40px_-5px_var(--accent)] flex items-center gap-2"
            >
              Decouvrir mes projets
              <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full font-medium glass-card text-foreground hover:border-accent/30 transition-all"
            >
              Me contacter
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center justify-center gap-5" style={{ transform: "translateZ(20px)" }}>
            {[
              { href: "https://github.com/Gojobyte", icon: <GithubIcon size={20} />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/adoum-salah-101221232/", icon: <LinkedinIcon size={20} />, label: "LinkedIn" },
              { href: "mailto:sadoumachi@gmail.com", icon: <Mail size={20} />, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted hover:text-accent-light hover:border-accent/30 hover:shadow-[0_0_20px_-5px_var(--accent-glow)] transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-5 h-8 rounded-full border border-card-border flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-accent-light"
          />
        </div>
      </motion.div>
    </section>
  );
}
