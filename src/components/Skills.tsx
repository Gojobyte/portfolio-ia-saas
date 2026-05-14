"use client";

import { motion } from "framer-motion";

const stack = [
  { name: "Next.js", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "shadcn/ui", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Prisma", category: "Backend" },
  { name: "NextAuth v5", category: "Backend" },
  { name: "Express.js", category: "Backend" },
  { name: "REST API", category: "Backend" },
  { name: "Microservices", category: "Backend" },
  { name: "PostgreSQL", category: "Data" },
  { name: "MongoDB", category: "Data" },
  { name: "Redis", category: "Data" },
  { name: "Supabase", category: "Data" },
  { name: "Git / GitHub", category: "DevOps" },
  { name: "Docker", category: "DevOps" },
  { name: "Vercel", category: "DevOps" },
  { name: "CI/CD", category: "DevOps" },
  { name: "Claude Code", category: "IA" },
  { name: "GitHub Copilot", category: "IA" },
  { name: "Liveblocks", category: "IA" },
  { name: "Stripe", category: "Services" },
  { name: "Resend", category: "Services" },
  { name: "Recharts", category: "Services" },
];

const categoryColors: Record<string, string> = {
  Frontend: "hover:border-blue-500/40 hover:shadow-blue-500/5",
  Backend: "hover:border-green-500/40 hover:shadow-green-500/5",
  Data: "hover:border-amber-500/40 hover:shadow-amber-500/5",
  DevOps: "hover:border-cyan-500/40 hover:shadow-cyan-500/5",
  IA: "hover:border-purple-500/40 hover:shadow-purple-500/5",
  Services: "hover:border-pink-500/40 hover:shadow-pink-500/5",
};

export function Skills() {
  return (
    <section id="competences" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-accent-light font-mono text-sm mb-4">// stack technique</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Les outils que j&apos;utilise <span className="text-gradient">au quotidien</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {stack.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className={`px-5 py-2.5 rounded-full glass-card text-sm font-medium text-foreground cursor-default transition-all hover:shadow-lg ${categoryColors[s.category]}`}
            >
              {s.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
