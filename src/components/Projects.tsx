"use client";

import { motion } from "framer-motion";
import { ExternalLink, Layers, Database, Bot, ShoppingCart, FileText, GraduationCap } from "lucide-react";
import { GithubIcon } from "./icons";

const projects = [
  {
    title: "Task SaaS",
    desc: "Application SaaS de gestion de taches avec Kanban drag & drop, authentification multi-utilisateurs et architecture scalable.",
    stack: ["Next.js 15", "Prisma", "NextAuth v5", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/task-saas",
    live: "https://task-saas-tau.vercel.app",
    icon: Layers,
    highlight: true,
  },
  {
    title: "Gost AI",
    desc: "Application IA collaborative en temps reel avec Liveblocks, tests automatises et integration Claude/agents IA.",
    stack: ["Next.js", "TypeScript", "Prisma", "Liveblocks", "Vitest", "shadcn/ui"],
    github: "https://github.com/Gojobyte/gost-ai",
    icon: Bot,
    highlight: true,
  },
  {
    title: "CHADIA Projects",
    desc: "Plateforme de gestion de marches publics en architecture microservices avec API Gateway, 3 services independants et event-driven.",
    stack: ["Next.js", "PostgreSQL", "Redis", "Docker", "Prisma", "Resend"],
    github: "https://github.com/Gojobyte/chadia-projects",
    icon: Database,
    highlight: true,
  },
  {
    title: "E-Commerce Dashboard",
    desc: "Dashboard analytics complet pour e-commerce avec visualisation de donnees, authentification et gestion de produits.",
    stack: ["Next.js 15", "Prisma", "NextAuth", "Recharts", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/ecommerce-dashboard",
    live: "https://ecommerce-dashboard-blush-mu.vercel.app",
    icon: ShoppingCart,
  },
  {
    title: "Invoice App",
    desc: "Application de creation et gestion de factures avec interface moderne et generation PDF.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/invoice-app",
    icon: FileText,
  },
  {
    title: "E-Learning Platform",
    desc: "Plateforme d'apprentissage en ligne avec gestion de cours, progression et interface responsive.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/elearning-platform",
    icon: GraduationCap,
  },
];

export function Projects() {
  return (
    <section id="projets" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Mes <span className="text-accent-light">projets</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Des applications SaaS, IA et full-stack qui montrent ma capacite a
            construire, livrer et iterer rapidement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`group p-6 rounded-xl border bg-card-bg transition-colors ${
                p.highlight
                  ? "border-accent/40 hover:border-accent-light"
                  : "border-card-border hover:border-accent/40"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <p.icon
                  className={`${
                    p.highlight ? "text-accent-light" : "text-muted"
                  }`}
                  size={24}
                />
                <div className="flex items-center gap-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent-light transition-colors"
                    aria-label="GitHub"
                  >
                    <GithubIcon size={18} />
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent-light transition-colors"
                      aria-label="Voir le site"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                {p.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded bg-background border border-card-border text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://github.com/Gojobyte"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent-light hover:underline"
          >
            <GithubIcon size={16} />
            Voir tous mes projets sur GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
