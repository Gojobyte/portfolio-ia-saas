"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TiltCard } from "./TiltCard";

function Counter({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
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
      <div ref={ref} className="text-center p-8 rounded-2xl glass-card h-full">
        <div className="text-5xl sm:text-6xl font-black text-gradient mb-2" style={{ transform: "translateZ(30px)" }}>
          {count}{suffix}
        </div>
        <div className="text-sm text-muted">{label}</div>
      </div>
    </TiltCard>
  );
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const leftX = useTransform(scrollYProgress, [0, 0.5], [-80, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [80, 0]);
  const textZ = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-100, 0, 0, -100]);

  return (
    <section className="py-32 px-6" ref={sectionRef} style={{ perspective: 1200 }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div style={{ x: leftX, translateZ: textZ, transformStyle: "preserve-3d" }}>
            <motion.div
              initial={{ opacity: 0, rotateY: -15 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-accent-light font-mono text-sm mb-4">// a propos</p>
              <h2 className="text-3xl sm:text-5xl font-bold mb-6 leading-tight">
                Je construis<br />des produits,<br />
                <span className="text-gradient">pas juste du code.</span>
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  Developpeur Full Stack passionne, je combine une expertise technique solide
                  avec une vraie vision produit. J&apos;aime comprendre le &quot;pourquoi&quot; avant
                  d&apos;ecrire la premiere ligne de code.
                </p>
                <p>
                  Mon approche : livrer vite, iterer souvent, et utiliser l&apos;IA comme
                  accelerateur. Chaque projet est pense pour etre scalable,
                  maintenable et agreable a utiliser.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div style={{ x: rightX }} className="grid grid-cols-2 gap-4">
            {[
              { title: "Next.js & React", desc: "Applications SSR/SSG performantes avec App Router" },
              { title: "PostgreSQL & Prisma", desc: "Modelisation robuste et requetes optimisees" },
              { title: "TypeScript", desc: "Code type de bout en bout, du front au back" },
              { title: "IA & Automatisation", desc: "Claude, Copilot, Hermes et VPS IA" },
            ].map((item, i) => (
              <TiltCard key={item.title} className="rounded-2xl">
                <motion.div
                  initial={{ opacity: 0, z: -50, rotateY: 10 }}
                  whileInView={{ opacity: 1, z: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-5 rounded-2xl glass-card h-full hover:border-accent/20 transition-all"
                >
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </motion.div>
              </TiltCard>
            ))}
          </motion.div>
        </div>

        {/* 3D Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Counter end={24} suffix="+" label="Projets realises" />
          <Counter end={170} suffix="+" label="Commits GitHub" />
          <Counter end={12} suffix="+" label="Technologies" />
          <Counter end={10} suffix="+" label="Projets deployes" />
        </div>
      </div>
    </section>
  );
}
