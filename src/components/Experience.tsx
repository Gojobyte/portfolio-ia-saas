"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { FlipCard } from "./FlipCard";
import { Grid3D } from "./Grid3D";

const highlights = [
  {
    emoji: "🚀",
    title: "SaaS complet de A a Z",
    front: "TaskFlow : Kanban drag & drop, auth multi-utilisateurs, Prisma + PostgreSQL.",
    back: "Architecture : Next.js 15 App Router, Prisma ORM, NextAuth v5 sessions, PostgreSQL, Tailwind CSS. Deploy Vercel. 8 commits, production-ready.",
  },
  {
    emoji: "🤖",
    title: "IA & collaboration temps reel",
    front: "Gost AI : Liveblocks, tests automatises, integration agents IA et Claude.",
    back: "51 commits. Vitest pour tests. Liveblocks pour le multi-curseur temps reel. shadcn/ui components. Claude AGENTS.md pour l'IA.",
  },
  {
    emoji: "🏗️",
    title: "Architecture microservices",
    front: "CHADIA : 3 services, API Gateway, PostgreSQL, Redis, Docker.",
    back: "112 commits. Auth + Tender + Notification services. Event-driven Outbox pattern. Docker Compose. JWT inter-service. Resend emails.",
  },
  {
    emoji: "📊",
    title: "Dashboards & analytics",
    front: "Dashboards avec Recharts, NextAuth, Prisma. E-commerce, stock, facturation.",
    back: "5 dashboards differents. Recharts pour la dataviz. KPIs temps reel. Filtres dynamiques. Export donnees. Auth role-based.",
  },
  {
    emoji: "⚡",
    title: "IA & VPS au quotidien",
    front: "Claude Code, Copilot, Hermes LLM et configuration VPS pour modeles IA.",
    back: "Ce portfolio = construit avec Claude. VPS configure pour heberger Hermes. Prompt engineering avance. Automatisation workflow dev.",
  },
];

const education = [
  { title: "Developpement Web", school: "Dyma, OpenClassroom", period: "2020 - 2021", desc: "React, Node.js, TypeScript, bases de donnees" },
  { title: "Ecole d'ingenieur", school: "ISGA", period: "2016 - 2020", desc: "Informatique et ingenierie" },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section id="parcours" className="py-32 px-6 relative" ref={ref}>
      <Grid3D />
      <div className="max-w-5xl mx-auto relative z-10" style={{ perspective: 1200 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-accent-light font-mono text-sm mb-4"
          >
            {`// parcours`}
          </motion.p>
          <h2 className="text-3xl sm:text-5xl font-bold">
            Ce que j&apos;ai <span className="text-gradient">construit</span>
          </h2>
        </motion.div>

        {/* 3D Flip Highlight Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {highlights.map((h, i) => {
            const progress = useTransform(scrollYProgress, [0.05 + i * 0.06, 0.2 + i * 0.06], [0, 1]);
            const z = useTransform(progress, [0, 1], [-120, 0]);
            const rotateX = useTransform(progress, [0, 1], [25, 0]);
            const rotateY = useTransform(progress, [0, 1], [i % 2 === 0 ? -15 : 15, 0]);

            return (
              <motion.div
                key={h.title}
                style={{ translateZ: z, rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="h-52"
              >
                <FlipCard
                  className="w-full h-full"
                  front={
                    <>
                      <span className="text-3xl mb-3 block">{h.emoji}</span>
                      <h3 className="font-semibold text-base mb-2">{h.title}</h3>
                      <p className="text-muted text-xs leading-relaxed">{h.front}</p>
                      <div className="mt-auto pt-2">
                        <span className="text-[10px] text-accent-light/40 font-mono">{"{ hover for details }"}</span>
                      </div>
                    </>
                  }
                  back={
                    <>
                      <p className="text-accent-light font-mono text-[10px] mb-2">{`// ${h.title}`}</p>
                      <p className="text-xs text-muted leading-relaxed">{h.back}</p>
                    </>
                  }
                />
              </motion.div>
            );
          })}
        </div>

        {/* Education - 3D Timeline */}
        <motion.div
          initial={{ opacity: 0, rotateX: 15 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <h3 className="flex items-center gap-2 text-xl font-semibold mb-8">
            <GraduationCap className="text-accent-light" size={22} />
            Formation
          </h3>
          <div className="relative border-l border-card-border pl-8 space-y-8">
            {education.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40, rotateY: -10, z: -60 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative"
              >
                <motion.div
                  animate={{ boxShadow: ["0 0 6px rgba(99,102,241,0.3)", "0 0 12px rgba(99,102,241,0.6)", "0 0 6px rgba(99,102,241,0.3)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -left-[33px] top-1.5 w-3 h-3 rounded-full bg-accent"
                />
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
