"use client";

import { motion } from "framer-motion";
import { Sparkles, Rocket, Brain, Code2 } from "lucide-react";

const strengths = [
  {
    icon: Rocket,
    title: "Execution rapide",
    desc: "J'aime construire vite, tester et iterer. Chaque idee peut devenir realite en quelques jours.",
  },
  {
    icon: Brain,
    title: "IA comme levier",
    desc: "J'utilise Claude, Copilot et les outils IA au quotidien pour coder plus vite et plus intelligemment.",
  },
  {
    icon: Code2,
    title: "Full Stack moderne",
    desc: "Next.js, TypeScript, Prisma, PostgreSQL : je maitrise toute la chaine, du front au back.",
  },
  {
    icon: Sparkles,
    title: "Force de proposition",
    desc: "Curieux et debrouillard, je propose des idees produit, techniques et UX a chaque sprint.",
  },
];

export function About() {
  return (
    <section id="apropos" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            A propos de <span className="text-accent-light">moi</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Developpeur passione par le code et les defis techniques, je
            cherche un environnement dynamique ou les idees deviennent
            rapidement realite. Avec +3 ans d&apos;experience en entreprise, je suis
            pret a avoir un vrai impact sur votre produit SaaS.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {strengths.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 rounded-xl bg-card-bg border border-card-border hover:border-accent/40 transition-colors"
            >
              <s.icon className="text-accent-light mb-4" size={28} />
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
