"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--accent)_0%,_transparent_50%)] opacity-15" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent-light text-sm font-mono">
            Disponible en stage / alternance
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Adoum Salah
            <br />
            <span className="text-accent-light">
              Developpeur Full Stack
            </span>
            <br />
            <span className="text-muted text-3xl sm:text-4xl lg:text-5xl">
              IA & SaaS
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Je construis des applications SaaS performantes avec{" "}
            <span className="text-foreground font-medium">Next.js</span>,{" "}
            <span className="text-foreground font-medium">PostgreSQL</span> et
            l&apos;IA comme levier de productivite. J&apos;aime livrer vite, experimenter et
            avoir un vrai impact produit.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#projets"
              className="px-8 py-3 bg-accent hover:bg-accent-light text-white rounded-lg font-medium transition-colors"
            >
              Voir mes projets
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-card-border hover:border-accent-light text-foreground rounded-lg font-medium transition-colors"
            >
              Me contacter
            </a>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a
              href="https://github.com/Gojobyte"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent-light transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/adoum-salah-101221232/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent-light transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={22} />
            </a>
            <a
              href="mailto:sadoumachi@gmail.com"
              className="text-muted hover:text-accent-light transition-colors"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#apropos" aria-label="Scroll down">
            <ArrowDown size={20} className="text-muted animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
