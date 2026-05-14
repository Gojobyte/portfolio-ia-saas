"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Layers,
  Database,
  Bot,
  ShoppingCart,
  FileText,
  GraduationCap,
  BarChart3,
  Package,
  UtensilsCrossed,
  School,
  MonitorSmartphone,
  Rocket,
} from "lucide-react";
import { GithubIcon } from "./icons";

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
    desc: "Application SaaS de gestion de taches avec Kanban drag & drop, authentification multi-utilisateurs, plan Pro avec limites de projets.",
    stack: ["Next.js 15", "Prisma", "NextAuth v5", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/task-saas",
    live: "https://task-saas-tau.vercel.app",
    icon: Layers,
    category: "saas" as Category,
    highlight: true,
  },
  {
    title: "Gost AI",
    desc: "Application IA collaborative en temps reel avec Liveblocks, tests automatises Vitest et integration agents IA / Claude.",
    stack: ["Next.js", "TypeScript", "Prisma", "Liveblocks", "Vitest", "shadcn/ui"],
    github: "https://github.com/Gojobyte/gost-ai",
    icon: Bot,
    category: "saas" as Category,
    highlight: true,
  },
  {
    title: "CHADIA Projects",
    desc: "Plateforme de marches publics en microservices : API Gateway + 3 services (Auth, Tender, Notification), event-driven avec Outbox pattern.",
    stack: ["Next.js", "PostgreSQL", "Redis", "Docker", "Prisma", "Resend"],
    github: "https://github.com/Gojobyte/chadia-projects",
    icon: Database,
    category: "saas" as Category,
    highlight: true,
  },
  {
    title: "E-Commerce Dashboard",
    desc: "Dashboard analytics e-commerce : revenus (82 600 EUR), 2 390 commandes, taux de conversion, top produits, graphiques mensuels.",
    stack: ["Next.js 15", "Prisma", "NextAuth", "Recharts", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/ecommerce-dashboard",
    live: "https://ecommerce-dashboard-blush-mu.vercel.app",
    icon: ShoppingCart,
    category: "dashboard" as Category,
  },
  {
    title: "SabilDash Analytics",
    desc: "Dashboard BI complet : revenus 24.5M FCFA, 2 847 utilisateurs, graphiques revenus/depenses, sources de trafic, transactions recentes.",
    stack: ["Next.js", "TypeScript", "Recharts", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/dashboard-analytics",
    live: "https://dashboard-analytics-brown.vercel.app",
    icon: BarChart3,
    category: "dashboard" as Category,
  },
  {
    title: "SabilStock",
    desc: "Gestion de stock pharmacie : 12 produits, alertes de rupture, suivi fournisseurs, mouvements quotidiens, valeur stock en FCFA.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/stock-manager",
    live: "https://stock-manager-lime-beta.vercel.app",
    icon: Package,
    category: "dashboard" as Category,
  },
  {
    title: "SabilFacture",
    desc: "Application de facturation : 18.5M FCFA factures, statuts paye/en attente/en retard, clients multi-secteurs, gestion complete.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/invoice-app",
    live: "https://invoice-app-iota-wine.vercel.app",
    icon: FileText,
    category: "dashboard" as Category,
  },
  {
    title: "SabilLearn",
    desc: "Plateforme e-learning : 35 lecons, suivi progression, categories (Dev, Design, Marketing), cours avec notes et duree.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/elearning-platform",
    live: "https://elearning-platform-eight-pearl.vercel.app",
    icon: GraduationCap,
    category: "dashboard" as Category,
  },
  {
    title: "HubDesk Store",
    desc: "Site e-commerce produit : page produit premium, galerie photos, specs techniques, checkout, livraison gratuite France.",
    stack: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/hub-store",
    live: "https://hub-store-one.vercel.app",
    icon: MonitorSmartphone,
    category: "vitrine" as Category,
  },
  {
    title: "Le Sahel Dore",
    desc: "Site restaurant haut de gamme : menu, galerie, reservation en ligne, horaires, localisation N'Djamena. Design elegant or et noir.",
    stack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/restaurant-landing",
    live: "https://restaurant-landing-rouge.vercel.app",
    icon: UtensilsCrossed,
    category: "vitrine" as Category,
  },
  {
    title: "Institut Superieur Sahel",
    desc: "Site universitaire : 1 200+ etudiants, 28 programmes, pre-inscription en ligne, actualites campus, galerie photos.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/school-website",
    live: "https://school-website-six-taupe.vercel.app",
    icon: School,
    category: "vitrine" as Category,
  },
  {
    title: "Landing Page SaaS",
    desc: "Portfolio freelance avec services, projets, tarifs (350 EUR - sur mesure), temoignages clients et formulaire de contact.",
    stack: ["Next.js 16", "Framer Motion", "Tailwind CSS"],
    github: "https://github.com/Gojobyte/landing-page",
    live: "https://landing-page-seven-iota-20.vercel.app",
    icon: Rocket,
    category: "vitrine" as Category,
  },
];

export function Projects() {
  const [filter, setFilter] = useState<Category>("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projets" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Mes <span className="text-accent-light">projets</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto mb-8">
            {projects.length} applications deployees en production, de SaaS
            complets a des sites vitrines. Chaque projet est cliquable et
            accessible en ligne.
          </p>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === c.key
                    ? "bg-accent text-white"
                    : "bg-card-bg border border-card-border text-muted hover:text-foreground"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className={`group p-6 rounded-xl border bg-card-bg transition-colors ${
                p.highlight
                  ? "border-accent/40 hover:border-accent-light"
                  : "border-card-border hover:border-accent/40"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <p.icon
                  className={
                    p.highlight ? "text-accent-light" : "text-muted"
                  }
                  size={24}
                />
                <div className="flex items-center gap-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent-light transition-colors"
                    aria-label="Code source"
                  >
                    <GithubIcon size={18} />
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent-light transition-colors"
                      aria-label="Voir en ligne"
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

              <div className="flex flex-wrap gap-2 mb-4">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded bg-background border border-card-border text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-accent-light hover:underline"
                >
                  Voir le projet <ExternalLink size={14} />
                </a>
              )}
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
            Voir les 24 repos sur GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
