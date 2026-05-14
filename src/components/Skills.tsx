"use client";

import { motion } from "framer-motion";

const categories = [
  {
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "shadcn/ui",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "Prisma ORM",
      "NextAuth v5",
      "REST API",
      "Microservices",
    ],
  },
  {
    title: "Bases de donnees",
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "MySQL",
      "SQL Server",
      "Supabase",
    ],
  },
  {
    title: "Outils & DevOps",
    skills: [
      "Git / GitHub",
      "Docker",
      "Vercel",
      "CI/CD",
      "Stripe",
      "Resend",
    ],
  },
  {
    title: "IA & Productivite",
    skills: [
      "Claude Code",
      "GitHub Copilot",
      "Prompt Engineering",
      "Liveblocks",
      "Automatisation IA",
      "Vitest / Tests",
    ],
  },
];

export function Skills() {
  return (
    <section id="competences" className="py-24 px-6 bg-card-bg/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-accent-light">Stack</span> technique
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Les technologies que j&apos;utilise au quotidien pour construire des
            applications SaaS performantes.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 rounded-xl border border-card-border bg-background"
            >
              <h3 className="text-accent-light font-semibold mb-4">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 text-sm rounded-lg bg-card-bg border border-card-border text-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
