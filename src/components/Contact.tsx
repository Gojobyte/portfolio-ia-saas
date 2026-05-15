"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { TextScramble } from "./TextScramble";
import { TiltCard } from "./TiltCard";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent-light font-mono text-sm mb-4">// contact</p>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            <TextScramble text="Un projet en tete ?" className="block mb-2 !font-sans text-foreground" />
            <span className="text-gradient">Discutons.</span>
          </h2>
          <p className="text-muted max-w-md mx-auto mb-12">
            Disponible pour des missions freelance, stages ou alternances.
            N&apos;hesitez pas a me contacter.
          </p>

          {/* Main CTA */}
          <a
            href="mailto:sadoumachi@gmail.com"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent hover:bg-accent-light text-white font-medium text-lg transition-all hover:shadow-[0_0_40px_-8px_var(--accent)] mb-12"
          >
            <Mail size={22} />
            sadoumachi@gmail.com
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Info cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              {
                href: "https://wa.me/33781311541",
                icon: <WhatsAppIcon size={22} />,
                label: "WhatsApp uniquement",
                value: "07 81 31 15 41",
              },
              {
                icon: <MapPin size={22} className="text-muted" />,
                label: "Localisation",
                value: "Ile-de-France",
              },
              {
                icon: <Mail size={22} className="text-muted" />,
                label: "Disponibilite",
                value: "Immediate",
              },
            ].map((item, i) => (
              <TiltCard key={i} className="rounded-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 30, rotateY: -10 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl glass-card holo-card hover:border-accent/20 transition-all group">
                      {item.icon}
                      <div className="mt-3 text-sm text-muted group-hover:text-foreground transition-colors">{item.label}</div>
                      <div className="font-medium mt-1">{item.value}</div>
                    </a>
                  ) : (
                    <div className="p-6 rounded-2xl glass-card">
                      {item.icon}
                      <div className="mt-3 text-sm text-muted">{item.label}</div>
                      <div className="font-medium mt-1">{item.value}</div>
                    </div>
                  )}
                </motion.div>
              </TiltCard>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-3">
            {[
              { href: "https://github.com/Gojobyte", icon: <GithubIcon size={20} />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/adoum-salah-101221232/", icon: <LinkedinIcon size={20} />, label: "LinkedIn" },
              { href: "https://wa.me/33781311541", icon: <WhatsAppIcon size={20} />, label: "WhatsApp" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-muted hover:text-accent-light hover:border-accent/30 transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
