"use client";

import { motion } from "framer-motion";
import { GraduationCap, Flame, Code2, Layers, Database, Bot } from "lucide-react";

const stats = [
  { value: "24+", label: "Repositories GitHub" },
  { value: "170+", label: "Commits" },
  { value: "10+", label: "Projets deployes" },
  { value: "6+", label: "Technologies maitrisees" },
];

const highlights = [
  {
    icon: Layers,
    title: "SaaS complet de A a Z",
    desc: "Task SaaS : Kanban drag & drop, auth multi-utilisateurs, Prisma + PostgreSQL. Architecture production-ready deployee sur Vercel.",
  },
  {
    icon: Bot,
    title: "IA & collaboration temps reel",
    desc: "Gost AI : application IA avec Liveblocks pour la collaboration en temps reel, tests automatises avec Vitest, integration agents IA.",
  },
  {
    icon: Database,
    title: "Architecture microservices",
    desc: "CHADIA Projects : 3 microservices (Auth, Tender, Notification), API Gateway, PostgreSQL, Redis, Docker, pattern Outbox event-driven.",
  },
  {
    icon: Code2,
    title: "Dashboards & e-commerce",
    desc: "E-Commerce Dashboard avec Recharts, NextAuth, Prisma. Hub Store avec integration Stripe. Interfaces riches et performantes.",
  },
  {
    icon: Flame,
    title: "IA au quotidien",
    desc: "J'utilise Claude Code, GitHub Copilot et les outils IA pour coder plus vite. Ce portfolio a ete construit avec l'assistance de Claude.",
  },
];

const education = [
  {
    title: "Formation continue - Developpement Web",
    school: "Dyma, OpenClassroom",
    period: "2020 - 2021",
    desc: "Specialisation en developpement web moderne : React, Node.js, bases de donnees, TypeScript.",
  },
  {
    title: "Ecole d'ingenieur",
    school: "ISGA",
    period: "2016 - 2020",
    desc: "Formation ingenieur avec specialisation informatique.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-card-bg/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ce que j&apos;ai <span className="text-accent-light">construit</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Je prefere montrer ce que je sais faire plutot que de lister des
            titres. Voici mes realisations concretes.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center p-6 rounded-xl border border-card-border bg-background"
            >
              <div className="text-3xl font-bold text-accent-light mb-1">
                {s.value}
              </div>
              <div className="text-sm text-muted">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Highlights */}
        <div className="space-y-6 mb-16">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4 p-6 rounded-xl border border-card-border bg-background hover:border-accent/40 transition-colors"
            >
              <h.icon
                className="text-accent-light shrink-0 mt-1"
                size={24}
              />
              <div>
                <h3 className="font-semibold text-lg mb-1">{h.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <div>
          <h3 className="flex items-center gap-2 text-xl font-semibold mb-8">
            <GraduationCap className="text-accent-light" size={22} />
            Formation
          </h3>
          <div className="relative border-l-2 border-card-border pl-8 space-y-10">
            {education.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-accent border-2 border-background" />
                <div className="text-sm text-accent-light font-mono mb-1">
                  {e.period}
                </div>
                <h4 className="text-lg font-semibold">{e.title}</h4>
                <div className="text-muted text-sm mb-1">{e.school}</div>
                <p className="text-sm text-muted">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
