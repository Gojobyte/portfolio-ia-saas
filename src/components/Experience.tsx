"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Developpeur Front-End React.js",
    company: "Hello Watt",
    location: "Paris",
    period: "Juillet 2023 - Octobre 2024",
    tasks: [
      "Optimisation des fonctionnalites de la plateforme energetique",
      "Strategie d'accessibilite, SEO et ergonomie",
      "Validation du code pour compatibilite navigateurs et securite",
    ],
  },
  {
    type: "work",
    title: "Developpeur Full Stack",
    company: "Feel and Clic",
    location: "Paris",
    period: "Aout 2022 - Juin 2023",
    tasks: [
      "Analyse et optimisation de sites/applications existants",
      "Implementation d'interfaces performantes",
      "Strategie UX et accessibilite multi-plateforme",
    ],
  },
  {
    type: "work",
    title: "Developpeur Front-End",
    company: "Feel and Clic",
    location: "Paris",
    period: "Septembre 2021 - Mai 2022",
    tasks: [
      "Developpement Full Stack JavaScript / Express / React",
      "Mise en place de pipelines CI/CD",
      "Integration frontend de dashboards",
    ],
  },
];

const education = [
  {
    title: "Formation continue",
    school: "Dyma, OpenClassroom",
    period: "2020 - 2021",
    desc: "Specialisation en developpement web moderne (React, Node.js, bases de donnees)",
  },
  {
    title: "Ecole d'ingenieur",
    school: "ISGA",
    period: "2016 - 2020",
    desc: "Formation ingenieur avec specialisation informatique",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 bg-card-bg/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-accent-light">Parcours</span> professionnel
          </h2>
        </motion.div>

        {/* Experience */}
        <div className="mb-16">
          <h3 className="flex items-center gap-2 text-xl font-semibold mb-8">
            <Briefcase className="text-accent-light" size={22} />
            Experience
          </h3>
          <div className="relative border-l-2 border-card-border pl-8 space-y-10">
            {experiences.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-accent border-2 border-background" />
                <div className="text-sm text-accent-light font-mono mb-1">
                  {e.period}
                </div>
                <h4 className="text-lg font-semibold">{e.title}</h4>
                <div className="text-muted text-sm mb-3">
                  {e.company} &middot; {e.location}
                </div>
                <ul className="space-y-1">
                  {e.tasks.map((t, j) => (
                    <li key={j} className="text-sm text-muted flex gap-2">
                      <span className="text-accent-light mt-1 shrink-0">
                        &bull;
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="flex items-center gap-2 text-xl font-semibold mb-8">
            <GraduationCap className="text-accent-light" size={22} />
            Formation
          </h3>
          <div className="relative border-l-2 border-card-border pl-8 space-y-10">
            {education.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-accent border-2 border-background" />
                <div className="text-sm text-accent-light font-mono mb-1">
                  {e.period}
                </div>
                <h4 className="text-lg font-semibold">{e.title}</h4>
                <div className="text-muted text-sm mb-1">{e.school}</div>
                <p className="text-sm text-muted">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
