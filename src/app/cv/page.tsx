import type { Metadata } from "next";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "CV - Adoum Salah | Developpeur Full Stack IA / SaaS",
  description: "CV d'Adoum Salah - Candidature stage/alternance Developpeur Full Stack IA / SaaS",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-400 mb-4 border-b border-white/10 pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300 mr-1.5 mb-1.5">
      {children}
    </span>
  );
}

export default function CVPage() {
  return (
    <div className="min-h-screen bg-[#050507] text-zinc-200">
      {/* Header */}
      <header className="bg-gradient-to-br from-indigo-950/50 to-transparent border-b border-white/5">
        <div className="max-w-4xl mx-auto px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Adoum Salah</h1>
              <p className="text-xl text-indigo-400 font-medium mb-4">
                Developpeur Full Stack IA / SaaS
              </p>
              <p className="text-zinc-400 max-w-xl leading-relaxed">
                Developpeur passionne par la construction de produits SaaS modernes.
                J&apos;utilise l&apos;IA comme levier de productivite pour livrer plus vite
                et mieux. Je cherche un environnement ou je peux construire, experimenter et
                avoir un vrai impact.
              </p>
            </div>
            <div className="text-sm text-zinc-400 space-y-1.5 shrink-0">
              <div>sadoumachi@gmail.com</div>
              <div>07 81 31 15 41 (WhatsApp)</div>
              <div>Ile-de-France</div>
              <div className="flex gap-3 mt-2">
                <a href="https://github.com/Gojobyte" className="text-indigo-400 hover:underline print:text-black print:no-underline">GitHub</a>
                <a href="https://www.linkedin.com/in/adoum-salah-101221232/" className="text-indigo-400 hover:underline print:text-black print:no-underline">LinkedIn</a>
                <a href="https://portfolio-ia-saas.vercel.app" className="text-indigo-400 hover:underline print:text-black print:no-underline">Portfolio</a>
              </div>
              <div className="mt-3">
                <PrintButton />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-10">
        {/* Candidature */}
        <div className="mb-10 p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/15">
          <p className="text-sm text-indigo-300 font-medium mb-1">Candidature : Stage / Alternance &mdash; Developpeur Full Stack IA / SaaS</p>
          <p className="text-sm text-zinc-400">Disponibilite immediate &bull; 6 mois &bull; Teletravail hybride Paris compatible</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main column */}
          <div className="lg:col-span-2">
            <Section title="Pourquoi moi">
              <ul className="space-y-3 text-sm text-zinc-300 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">▸</span>
                  <span><strong>Votre stack, c&apos;est ma stack.</strong> Next.js, PostgreSQL, GitHub &mdash; c&apos;est exactement ce que j&apos;utilise chaque jour sur mes projets personnels.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">▸</span>
                  <span><strong>L&apos;IA est mon quotidien.</strong> J&apos;utilise Claude Code et GitHub Copilot pour coder plus vite. Ce portfolio et mon CV ont ete construits avec Claude.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">▸</span>
                  <span><strong>J&apos;aime construire.</strong> 24+ repos GitHub, 170+ commits, 12 projets deployes en production &mdash; je ne fais pas que coder, je livre.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-indigo-400 shrink-0 mt-0.5">▸</span>
                  <span><strong>SaaS, je connais.</strong> J&apos;ai construit TaskFlow, un SaaS de gestion de taches complet avec Kanban, auth et Stripe.</span>
                </li>
              </ul>
            </Section>

            <Section title="Projets cles">
              {[
                {
                  name: "TaskFlow SaaS",
                  url: "https://task-saas-tau.vercel.app",
                  desc: "App SaaS de gestion de taches : Kanban drag & drop, authentification multi-utilisateurs, plan Pro.",
                  tech: "Next.js 15, Prisma, NextAuth v5, PostgreSQL, Tailwind CSS",
                },
                {
                  name: "Gost AI",
                  url: "https://github.com/Gojobyte/gost-ai",
                  desc: "Application IA collaborative temps reel. Tests automatises, integration agents IA.",
                  tech: "Next.js, Prisma, Liveblocks, Vitest, shadcn/ui",
                },
                {
                  name: "ONG CHADIA",
                  url: "https://ong-chadia.com",
                  desc: "Plateforme microservices : API Gateway + 3 services (Auth, Tender, Notification), event-driven.",
                  tech: "Next.js, PostgreSQL, Redis, Docker, Prisma",
                },
                {
                  name: "E-Commerce Dashboard",
                  url: "https://ecommerce-dashboard-blush-mu.vercel.app",
                  desc: "Dashboard analytics complet avec visualisation de donnees et gestion produits.",
                  tech: "Next.js 15, Prisma, NextAuth, Recharts",
                },
              ].map((p) => (
                <div key={p.name} className="mb-5 last:mb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{p.name}</h3>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:underline">voir &rarr;</a>
                  </div>
                  <p className="text-sm text-zinc-400 mb-1.5">{p.desc}</p>
                  <p className="text-xs text-zinc-500">{p.tech}</p>
                </div>
              ))}
              <p className="text-xs text-zinc-500 mt-4">
                + 8 autres projets deployes (dashboards, e-learning, e-commerce, sites vitrines) &rarr; <a href="https://portfolio-ia-saas.vercel.app/#projets" className="text-indigo-400 hover:underline">voir portfolio</a>
              </p>
            </Section>

            <Section title="Formation">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="font-semibold text-sm">Formation Developpement Web</h3>
                    <span className="text-xs text-zinc-500">2020 &mdash; 2021</span>
                  </div>
                  <p className="text-sm text-zinc-400">Dyma, OpenClassroom &mdash; React, Node.js, TypeScript, bases de donnees</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="font-semibold text-sm">Ecole d&apos;ingenieur</h3>
                    <span className="text-xs text-zinc-500">2016 &mdash; 2020</span>
                  </div>
                  <p className="text-sm text-zinc-400">ISGA &mdash; Informatique et ingenierie</p>
                </div>
              </div>
            </Section>
          </div>

          {/* Sidebar */}
          <div>
            <Section title="Stack technique">
              <div className="mb-4">
                <p className="text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wider">Frontend</p>
                <div className="flex flex-wrap">
                  {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"].map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wider">Backend</p>
                <div className="flex flex-wrap">
                  {["Node.js", "Prisma", "NextAuth v5", "Express", "REST API"].map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wider">Bases de donnees</p>
                <div className="flex flex-wrap">
                  {["PostgreSQL", "MongoDB", "Redis", "Supabase", "MySQL"].map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wider">DevOps & outils</p>
                <div className="flex flex-wrap">
                  {["Git", "GitHub", "Docker", "Vercel", "CI/CD"].map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wider">IA & productivite</p>
                <div className="flex flex-wrap">
                  {["Claude Code", "GitHub Copilot", "Prompt Engineering", "Liveblocks"].map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
            </Section>

            <Section title="Langues">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Francais</span><span className="text-zinc-500">Natif</span></div>
                <div className="flex justify-between"><span>Anglais</span><span className="text-zinc-500">Professionnel</span></div>
                <div className="flex justify-between"><span>Arabe</span><span className="text-zinc-500">Courant</span></div>
              </div>
            </Section>

            <Section title="Soft skills">
              <div className="flex flex-wrap">
                {["Autonome", "Force de proposition", "Execution rapide", "Curieux", "Collaboratif"].map((s) => <Tag key={s}>{s}</Tag>)}
              </div>
            </Section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <a href="/" className="text-indigo-400 hover:underline">&larr; Retour au portfolio</a>
          <span>Genere en mai 2025 &bull; Construit avec Next.js & Claude Code</span>
        </div>
      </footer>
    </div>
  );
}
