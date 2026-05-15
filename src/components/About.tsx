"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TiltCard } from "./TiltCard";
import { TerminalText } from "./GlitchText";
import { FlipCard } from "./FlipCard";
import { Grid3D } from "./Grid3D";

function SpinCounter({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <TiltCard className="rounded-2xl">
      <div ref={ref} className="text-center p-8 rounded-2xl glass-card h-full relative overflow-hidden" style={{ perspective: 600 }}>
        <motion.div
          initial={{ rotateX: 90, opacity: 0 }}
          whileInView={{ rotateX: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ rotateY: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl sm:text-6xl font-black text-gradient mb-2"
          >
            {count}{suffix}
          </motion.div>
        </motion.div>
        <div className="text-sm text-muted">{label}</div>
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl border border-accent/20"
        />
      </div>
    </TiltCard>
  );
}

const expertiseCards = [
  {
    title: "Next.js & React",
    desc: "SSR/SSG performantes avec App Router",
    backTitle: "// Frontend",
    backDesc: "Pages dynamiques, Server Components, streaming SSR, optimisation images et fonts. 8+ projets Next.js deployes.",
  },
  {
    title: "PostgreSQL & Prisma",
    desc: "Modelisation robuste et requetes optimisees",
    backTitle: "// Database",
    backDesc: "Schemas relationnels complexes, migrations, indexes, requetes N+1 eliminees. Redis pour le cache.",
  },
  {
    title: "TypeScript",
    desc: "Code type de bout en bout",
    backTitle: "// Type Safety",
    backDesc: "Interfaces, generics, discriminated unions. Zero `any`. Types partages front/back via Prisma.",
  },
  {
    title: "IA & Automatisation",
    desc: "Claude, Copilot, Hermes et VPS IA",
    backTitle: "// AI Tools",
    backDesc: "Claude Code pour architecture. Copilot pour le flow. Hermes LLM sur VPS. Prompt engineering avance.",
  },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const leftX = useTransform(scrollYProgress, [0, 0.4], [-100, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.4], [100, 0]);
  const leftRotate = useTransform(scrollYProgress, [0, 0.4], [-10, 0]);
  const rightRotate = useTransform(scrollYProgress, [0, 0.4], [10, 0]);

  return (
    <section className="py-32 px-6 relative" ref={sectionRef}>
      <Grid3D />
      <div className="max-w-5xl mx-auto relative z-10" style={{ perspective: 1200 }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Terminal */}
          <motion.div style={{ x: leftX, rotateY: leftRotate, transformStyle: "preserve-3d" }}>
            <motion.div
              initial={{ opacity: 0, z: -100 }}
              whileInView={{ opacity: 1, z: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-accent-light font-mono text-sm mb-4">// a propos</p>
              <h2 className="text-3xl sm:text-5xl font-bold mb-8 leading-tight">
                Je construis<br />des produits,<br />
                <span className="text-gradient">pas juste du code.</span>
              </h2>

              {/* Terminal */}
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="p-5 rounded-xl bg-[#08081a]/95 border border-white/10 font-mono relative overflow-hidden"
                style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
              >
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-card-border">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-3 h-3 rounded-full bg-red-500/80" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs text-muted ml-2">adoum@dev ~ $</span>
                </div>
                <TerminalText
                  lines={[
                    "// Qui suis-je ?",
                    'const dev = "Full Stack passione"',
                    'const vision = "Produit > Code"',
                    'const methode = "Livrer vite, iterer"',
                    'const ia = "Claude + Copilot + Hermes"',
                    "// Chaque projet = scalable + maintenable",
                    "export default { dev, vision, methode, ia }",
                  ]}
                />
                {/* Scan effect on terminal */}
                <motion.div
                  animate={{ top: ["-10%", "110%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: 3D Flip Cards */}
          <motion.div style={{ x: rightX, rotateY: rightRotate }} className="grid grid-cols-2 gap-4">
            {expertiseCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, z: -80, rotateX: 20 }}
                whileInView={{ opacity: 1, z: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="h-40"
              >
                <FlipCard
                  className="w-full h-full"
                  front={
                    <>
                      <h3 className="text-sm font-semibold text-foreground mb-2">{card.title}</h3>
                      <p className="text-xs text-muted leading-relaxed">{card.desc}</p>
                      <div className="mt-auto pt-3">
                        <span className="text-[10px] text-accent-light/50 font-mono">hover to flip</span>
                      </div>
                    </>
                  }
                  back={
                    <>
                      <p className="text-accent-light font-mono text-[10px] mb-2">{card.backTitle}</p>
                      <p className="text-xs text-muted leading-relaxed">{card.backDesc}</p>
                    </>
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 3D Spinning Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <SpinCounter end={24} suffix="+" label="Projets realises" />
          <SpinCounter end={170} suffix="+" label="Commits GitHub" />
          <SpinCounter end={12} suffix="+" label="Technologies" />
          <SpinCounter end={10} suffix="+" label="Projets deployes" />
        </div>
      </div>
    </section>
  );
}
