"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./icons";
import { TiltCard } from "./TiltCard";

type Category = "all" | "saas" | "dashboard" | "vitrine";

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "saas", label: "SaaS & IA" },
  { key: "dashboard", label: "Dashboards" },
  { key: "vitrine", label: "Sites vitrines" },
];

const projects = [
  {
    title: "TaskFlow SaaS",
    desc: "App SaaS de gestion de taches avec Kanban drag & drop et authentification multi-utilisateurs.",
    stack: ["Next.js", "Prisma", "NextAuth v5", "PostgreSQL"],
    github: "https://github.com/Gojobyte/task-saas",
    live: "https://task-saas-tau.vercel.app",
    category: "saas" as Category,
    featured: true,
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    title: "Gost AI",
    desc: "Application IA collaborative en temps reel avec Liveblocks et tests automatises.",
    stack: ["Next.js", "Prisma", "Liveblocks", "Vitest"],
    github: "https://github.com/Gojobyte/gost-ai",
    category: "saas" as Category,
    featured: true,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "ONG CHADIA",
    desc: "Site officiel de l'ONG CHADIA pour le developpement du Tchad. Architecture microservices en backend.",
    stack: ["Next.js", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/Gojobyte/chadia-projects",
    live: "https://ong-chadia.com",
    category: "saas" as Category,
    featured: true,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
  {
    title: "E-Commerce Dashboard",
    desc: "Dashboard analytics e-commerce complet avec graphiques et gestion de produits.",
    stack: ["Next.js", "Prisma", "NextAuth", "Recharts"],
    github: "https://github.com/Gojobyte/ecommerce-dashboard",
    live: "https://ecommerce-dashboard-blush-mu.vercel.app",
    category: "dashboard" as Category,
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    title: "SabilDash Analytics",
    desc: "Dashboard BI avec revenus, graphiques revenus/depenses et sources de trafic.",
    stack: ["Next.js", "TypeScript", "Recharts"],
    github: "https://github.com/Gojobyte/dashboard-analytics",
    live: "https://dashboard-analytics-brown.vercel.app",
    category: "dashboard" as Category,
    gradient: "from-sky-500/20 to-blue-500/20",
  },
  {
    title: "SabilStock",
    desc: "Gestion de stock pharmacie avec alertes de rupture et suivi fournisseurs.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/stock-manager",
    live: "https://stock-manager-lime-beta.vercel.app",
    category: "dashboard" as Category,
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "SabilFacture",
    desc: "Application de facturation avec statuts, clients multi-secteurs et gestion complete.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/invoice-app",
    live: "https://invoice-app-iota-wine.vercel.app",
    category: "dashboard" as Category,
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
  {
    title: "SabilLearn",
    desc: "Plateforme e-learning avec suivi de progression et catalogue de cours.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/elearning-platform",
    live: "https://elearning-platform-eight-pearl.vercel.app",
    category: "dashboard" as Category,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "HubDesk Store",
    desc: "Site e-commerce produit premium avec galerie, specs et checkout.",
    stack: ["Next.js", "Stripe", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/hub-store",
    live: "https://hub-store-one.vercel.app",
    category: "vitrine" as Category,
    gradient: "from-zinc-500/20 to-gray-500/20",
  },
  {
    title: "Le Sahel Dore",
    desc: "Site restaurant haut de gamme avec reservation en ligne et design elegant.",
    stack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/restaurant-landing",
    live: "https://restaurant-landing-rouge.vercel.app",
    category: "vitrine" as Category,
    gradient: "from-amber-500/20 to-yellow-500/20",
  },
  {
    title: "Institut Superieur Sahel",
    desc: "Site universitaire avec programmes, inscription en ligne et actualites.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/school-website",
    live: "https://school-website-six-taupe.vercel.app",
    category: "vitrine" as Category,
    gradient: "from-blue-500/20 to-indigo-500/20",
  },
  {
    title: "Landing Page SaaS",
    desc: "Portfolio freelance avec services, tarifs et temoignages clients.",
    stack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/landing-page",
    live: "https://landing-page-seven-iota-20.vercel.app",
    category: "vitrine" as Category,
    gradient: "from-rose-500/20 to-pink-500/20",
  },
];

export function Projects() {
  const [filter, setFilter] = useState<Category>("all");
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projets" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-accent-light font-mono text-sm mb-4"
          >
            {`// projets`}
          </motion.p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Des idees <span className="text-gradient">devenues realite</span>
          </h2>
          <p className="text-muted max-w-lg mx-auto mb-8">
            {projects.length} applications deployees en production. Chaque projet est cliquable.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === c.key
                    ? "bg-accent text-white shadow-[0_0_20px_-5px_var(--accent)]"
                    : "glass-card text-muted hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured projects - large 3D cards */}
        {filter === "all" && (
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {projects.filter((p) => p.featured).map((p, i) => (
              <TiltCard key={p.title} className="rounded-2xl">
              <motion.a
                href={p.live || p.github}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative block overflow-hidden rounded-2xl glass-card holo-card p-8 hover:border-accent/30 transition-all h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-accent-light px-3 py-1 rounded-full bg-accent/10">Featured</span>
                    <ArrowUpRight size={18} className="text-muted group-hover:text-accent-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                  <p className="text-muted text-sm mb-6 leading-relaxed">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-muted">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.a>
              </TiltCard>
            ))}
          </div>
        )}

        {/* Other projects - grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.filter((p) => filter !== "all" || !p.featured).map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="group p-5 rounded-xl glass-card hover:border-accent/20 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{p.title}</h3>
                <div className="flex items-center gap-2">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent-light transition-colors" aria-label="Code source">
                    <GithubIcon size={16} />
                  </a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent-light transition-colors" aria-label="Voir en ligne">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
              <p className="text-muted text-sm mb-4 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-muted">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="https://github.com/Gojobyte" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent-light transition-colors">
            <GithubIcon size={16} />
            Voir les 24 repos sur GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
