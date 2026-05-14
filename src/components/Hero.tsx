"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

const roles = [
  "Full Stack Developer",
  "Next.js Expert",
  "TypeScript Enthusiast",
  "SaaS Builder",
  "AI-Powered Coder",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden noise grid-bg">
      {/* Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-500/15 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full glass-card"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-muted">Disponible pour collaborer</span>
          </motion.div>

          {/* Name */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6">
            <span className="text-foreground">Adoum</span>
            <br />
            <span className="text-gradient">Salah</span>
          </h1>

          {/* Animated role */}
          <div className="h-10 mb-8 overflow-hidden">
            <motion.div
              key={roleIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xl sm:text-2xl font-mono text-accent-light"
            >
              {roles[roleIndex]}
            </motion.div>
          </div>

          {/* Bio */}
          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Je concois des applications web modernes et performantes.
            Specialise en <span className="text-foreground">Next.js</span>,{" "}
            <span className="text-foreground">TypeScript</span> et{" "}
            <span className="text-foreground">PostgreSQL</span>, j&apos;utilise
            l&apos;IA pour livrer plus vite et mieux.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#projets"
              className="group px-8 py-3.5 bg-accent hover:bg-accent-light text-white rounded-full font-medium transition-all hover:shadow-[0_0_30px_-5px_var(--accent)] flex items-center gap-2"
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
          <div className="flex items-center justify-center gap-5">
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
                className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-muted hover:text-accent-light hover:border-accent/30 transition-all"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
