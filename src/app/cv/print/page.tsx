import type { Metadata } from "next";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "CV PDF - Adoum Salah",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-700 mb-3 border-b border-gray-200 pb-1.5">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 text-[10px] rounded-full bg-gray-100 border border-gray-200 text-gray-700 mr-1 mb-1">
      {children}
    </span>
  );
}

export default function CVPrintPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 text-[13px] leading-relaxed">
      {/* Print button - hidden in PDF */}
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-3">
        <PrintButton />
        <a
          href="/cv"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
        >
          &larr; Version web
        </a>
      </div>

      <div className="max-w-[210mm] mx-auto px-10 py-8 print:px-0 print:py-0">
        {/* Header */}
        <header className="mb-6 pb-5 border-b-2 border-indigo-600">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Adoum Salah</h1>
              <p className="text-lg text-indigo-700 font-semibold mb-3">
                Developpeur Full Stack IA / SaaS
              </p>
              <p className="text-gray-600 max-w-md text-sm">
                Developpeur passionne par la construction de produits SaaS modernes.
                J&apos;utilise l&apos;IA comme levier de productivite pour livrer plus vite
                et mieux.
              </p>
            </div>
            <div className="text-right text-sm text-gray-600 space-y-0.5 shrink-0">
              <div className="font-medium text-gray-900">sadoumachi@gmail.com</div>
              <div>07 81 31 15 41 (WhatsApp)</div>
              <div>Ile-de-France</div>
              <div className="mt-2 space-x-3 text-indigo-700">
                <span>github.com/Gojobyte</span>
              </div>
              <div className="space-x-3 text-indigo-700">
                <span>linkedin.com/in/adoum-salah-101221232</span>
              </div>
              <div className="text-indigo-700">
                <span>portfolio-ia-saas.vercel.app</span>
              </div>
            </div>
          </div>
        </header>

        {/* Candidature */}
        <div className="mb-6 p-3 rounded-lg bg-indigo-50 border border-indigo-200">
          <p className="text-sm text-indigo-800 font-semibold">Candidature : Stage / Alternance &mdash; Developpeur Full Stack IA / SaaS</p>
          <p className="text-sm text-gray-600">Disponibilite immediate &bull; 6 mois &bull; Teletravail hybride Paris compatible &bull; <a href="https://portfolio-ia-saas.vercel.app" className="text-indigo-700 font-medium underline">portfolio-ia-saas.vercel.app</a></p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main column - 2/3 */}
          <div className="col-span-2">
            <Section title="Pourquoi moi">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-indigo-600 shrink-0 font-bold">&#9654;</span>
                  <span><strong className="text-gray-900">Votre stack, c&apos;est ma stack.</strong> Next.js, PostgreSQL, GitHub &mdash; ce que j&apos;utilise chaque jour.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600 shrink-0 font-bold">&#9654;</span>
                  <span><strong className="text-gray-900">L&apos;IA est mon quotidien.</strong> Claude Code et GitHub Copilot pour coder plus vite.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600 shrink-0 font-bold">&#9654;</span>
                  <span><strong className="text-gray-900">J&apos;aime construire.</strong> 24+ repos, 170+ commits, 12 projets deployes en production.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-indigo-600 shrink-0 font-bold">&#9654;</span>
                  <span><strong className="text-gray-900">SaaS, je connais.</strong> TaskFlow : Kanban, auth multi-utilisateurs, Stripe.</span>
                </li>
              </ul>
            </Section>

            <Section title="Projets cles">
              {[
                {
                  name: "TaskFlow SaaS",
                  url: "task-saas-tau.vercel.app",
                  desc: "App SaaS de gestion de taches : Kanban drag & drop, auth multi-utilisateurs, plan Pro.",
                  tech: "Next.js 15, Prisma, NextAuth v5, PostgreSQL, Tailwind CSS",
                },
                {
                  name: "Gost AI",
                  url: "github.com/Gojobyte/gost-ai",
                  desc: "Application IA collaborative temps reel. Tests automatises, integration agents IA.",
                  tech: "Next.js, Prisma, Liveblocks, Vitest, shadcn/ui",
                },
                {
                  name: "ONG CHADIA",
                  url: "ong-chadia.com",
                  desc: "Plateforme microservices : API Gateway + 3 services (Auth, Tender, Notification).",
                  tech: "Next.js, PostgreSQL, Redis, Docker, Prisma",
                },
                {
                  name: "E-Commerce Dashboard",
                  url: "ecommerce-dashboard-blush-mu.vercel.app",
                  desc: "Dashboard analytics complet avec visualisation de donnees et gestion produits.",
                  tech: "Next.js 15, Prisma, NextAuth, Recharts",
                },
              ].map((p) => (
                <div key={p.name} className="mb-4 last:mb-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-sm text-gray-900">{p.name}</h3>
                    <span className="text-[10px] text-indigo-600">{p.url}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-0.5">{p.desc}</p>
                  <p className="text-[11px] text-gray-400">{p.tech}</p>
                </div>
              ))}
              <p className="text-[11px] text-gray-400 mt-3">
                + 8 autres projets deployes (dashboards, e-learning, e-commerce, sites vitrines) &rarr; portfolio-ia-saas.vercel.app
              </p>
            </Section>

            <Section title="Formation">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-gray-900">Formation Developpement Web</h3>
                    <span className="text-xs text-gray-500">2020 &mdash; 2021</span>
                  </div>
                  <p className="text-sm text-gray-600">Dyma, OpenClassroom &mdash; React, Node.js, TypeScript, BDD</p>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-gray-900">Ecole d&apos;ingenieur</h3>
                    <span className="text-xs text-gray-500">2016 &mdash; 2020</span>
                  </div>
                  <p className="text-sm text-gray-600">ISGA &mdash; Informatique et ingenierie</p>
                </div>
              </div>
            </Section>
          </div>

          {/* Sidebar - 1/3 */}
          <div>
            <Section title="Stack technique">
              <div className="mb-3">
                <p className="text-[10px] text-gray-500 mb-1 font-bold uppercase tracking-wider">Frontend</p>
                <div className="flex flex-wrap">
                  {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"].map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
              <div className="mb-3">
                <p className="text-[10px] text-gray-500 mb-1 font-bold uppercase tracking-wider">Backend</p>
                <div className="flex flex-wrap">
                  {["Node.js", "Prisma", "NextAuth v5", "Express", "REST API"].map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
              <div className="mb-3">
                <p className="text-[10px] text-gray-500 mb-1 font-bold uppercase tracking-wider">Bases de donnees</p>
                <div className="flex flex-wrap">
                  {["PostgreSQL", "MongoDB", "Redis", "Supabase", "MySQL"].map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
              <div className="mb-3">
                <p className="text-[10px] text-gray-500 mb-1 font-bold uppercase tracking-wider">DevOps</p>
                <div className="flex flex-wrap">
                  {["Git", "GitHub", "Docker", "Vercel", "CI/CD"].map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 mb-1 font-bold uppercase tracking-wider">IA & productivite</p>
                <div className="flex flex-wrap">
                  {["Claude Code", "GitHub Copilot", "Hermes (LLM)", "VPS Config", "Prompt Engineering", "Liveblocks"].map((s) => <Tag key={s}>{s}</Tag>)}
                </div>
              </div>
            </Section>

            <Section title="Langues">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-gray-700">Francais</span><span className="text-gray-500">Natif</span></div>
                <div className="flex justify-between"><span className="text-gray-700">Anglais</span><span className="text-gray-500">Professionnel</span></div>
                <div className="flex justify-between"><span className="text-gray-700">Arabe</span><span className="text-gray-500">Courant</span></div>
              </div>
            </Section>

            <Section title="Soft skills">
              <div className="flex flex-wrap">
                {["Autonome", "Force de proposition", "Execution rapide", "Curieux", "Collaboratif"].map((s) => <Tag key={s}>{s}</Tag>)}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}
