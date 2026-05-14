"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Travaillons <span className="text-accent-light">ensemble</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Disponible pour un stage ou une alternance de 6 mois. Je suis
            motive pour rejoindre une equipe qui valorise l&apos;execution, les
            idees et l&apos;autonomie.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid sm:grid-cols-2 gap-6 mb-12"
        >
          <a
            href="mailto:sadoumachi@gmail.com"
            className="flex items-center gap-4 p-6 rounded-xl bg-card-bg border border-card-border hover:border-accent/40 transition-colors"
          >
            <Mail className="text-accent-light shrink-0" size={24} />
            <div>
              <div className="text-sm text-muted">Email</div>
              <div className="font-medium">sadoumachi@gmail.com</div>
            </div>
          </a>

          <a
            href="tel:+33781311541"
            className="flex items-center gap-4 p-6 rounded-xl bg-card-bg border border-card-border hover:border-accent/40 transition-colors"
          >
            <Phone className="text-accent-light shrink-0" size={24} />
            <div>
              <div className="text-sm text-muted">Telephone</div>
              <div className="font-medium">07 81 31 15 41</div>
            </div>
          </a>

          <div className="flex items-center gap-4 p-6 rounded-xl bg-card-bg border border-card-border">
            <MapPin className="text-accent-light shrink-0" size={24} />
            <div>
              <div className="text-sm text-muted">Localisation</div>
              <div className="font-medium">Courbevoie, 92 (Ile-de-France)</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 rounded-xl bg-card-bg border border-card-border">
            <Download className="text-accent-light shrink-0" size={24} />
            <div>
              <div className="text-sm text-muted">Disponibilite</div>
              <div className="font-medium">Stage / Alternance - 6 mois</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:sadoumachi@gmail.com"
            className="px-8 py-3 bg-accent hover:bg-accent-light text-white rounded-lg font-medium transition-colors"
          >
            M&apos;envoyer un email
          </a>
          <a
            href="https://www.linkedin.com/in/adoum-salah-101221232/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-card-border hover:border-accent-light rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            <LinkedinIcon size={18} />
            LinkedIn
          </a>
          <a
            href="https://github.com/Gojobyte"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border border-card-border hover:border-accent-light rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            <GithubIcon size={18} />
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
