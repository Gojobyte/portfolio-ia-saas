"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const highlights = [
  {
    emoji: "🚀",
    title: "SaaS complet de A a Z",
    desc: "TaskFlow : Kanban drag & drop, auth multi-utilisateurs, Prisma + PostgreSQL. Deployee en production.",
  },
  {
    emoji: "🤖",
    title: "IA & collaboration temps reel",
    desc: "Gost AI : Liveblocks pour le temps reel, tests Vitest, integration agents IA et Claude.",
  },
  {
    emoji: "🏗️",
    title: "Architecture microservices",
    desc: "CHADIA Projects : 3 services, API Gateway, PostgreSQL, Redis, Docker, pattern event-driven.",
  },
  {
    emoji: "📊",
    title: "Dashboards & analytics",
    desc: "Plusieurs dashboards avec Recharts, NextAuth, Prisma. E-commerce, stock, facturation.",
  },
  {
    emoji: "⚡",
    title: "IA au quotidien",
    desc: "Claude Code, GitHub Copilot et outils IA pour coder plus vite. Ce portfolio a ete construit avec Claude.",
  },
];

const education = [
  {
    title: "Developpement Web",
    school: "Dyma, OpenClassroom",
    period: "2020 - 2021",
    desc: "React, Node.js, TypeScript, bases de donnees",
  },
  {
    title: "Ecole d'ingenieur",
    school: "ISGA",
    period: "2016 - 2020",
    desc: "Informatique et ingenierie",
  },
];

export function Experience() {
  return (
    <section id="parcours" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent-light font-mono text-sm mb-4">// parcours</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ce que j&apos;ai <span className="text-gradient">construit</span>
          </h2>
        </motion.div>

        {/* Highlights */}
        <div className="space-y-4 mb-20">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex gap-5 p-6 rounded-2xl glass-card hover:border-accent/20 transition-all"
            >
              <span className="text-2xl shrink-0 mt-0.5">{h.emoji}</span>
              <div>
                <h3 className="font-semibold text-lg mb-1 group-hover:text-accent-light transition-colors">
                  {h.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="flex items-center gap-2 text-xl font-semibold mb-8">
            <GraduationCap className="text-accent-light" size={22} />
            Formation
          </h3>
          <div className="relative border-l border-card-border pl-8 space-y-8">
            {education.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[33px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />
                <div className="text-sm text-accent-light font-mono mb-1">{e.period}</div>
                <h4 className="font-semibold">{e.title}</h4>
                <div className="text-muted text-sm">{e.school}</div>
                <p className="text-muted text-sm mt-1">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
