"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted">{label}</div>
    </div>
  );
}

export function About() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-16 items-center mb-20"
        >
          <div>
            <p className="text-accent-light font-mono text-sm mb-4">// a propos</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              Je construis des produits,<br />
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
                accelerateur. Chaque projet que je construis est pense pour etre scalable,
                maintenable et agreable a utiliser.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Next.js & React", desc: "Applications SSR/SSG performantes avec App Router" },
              { title: "PostgreSQL & Prisma", desc: "Modelisation de donnees robuste et requetes optimisees" },
              { title: "TypeScript", desc: "Code type de bout en bout, du front au back" },
              { title: "IA & Automatisation", desc: "Claude, Copilot et outils IA au quotidien" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-5 rounded-2xl glass-card hover:border-accent/20 transition-all"
              >
                <h3 className="text-sm font-semibold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-card-border">
          <Counter end={24} suffix="+" label="Projets realises" />
          <Counter end={170} suffix="+" label="Commits GitHub" />
          <Counter end={12} suffix="+" label="Technologies" />
          <Counter end={10} suffix="+" label="Projets deployes" />
        </div>
      </div>
    </section>
  );
}
