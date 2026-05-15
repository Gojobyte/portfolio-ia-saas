"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useSpring } from "framer-motion";

const links = [
  { href: "#accueil", label: "Accueil", code: "home()" },
  { href: "#projets", label: "Projets", code: "projects()" },
  { href: "#competences", label: "Stack", code: "stack()" },
  { href: "#parcours", label: "Parcours", code: "journey()" },
  { href: "#contact", label: "Contact", code: "contact()" },
];

function NavLink({ href, label, code, onClick }: { href: string; label: string; code: string; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [scrambled, setScrambled] = useState(label);
  const chars = "!@#$%^&*_+-=<>?/";

  useEffect(() => {
    if (!hovered) {
      setScrambled(label);
      return;
    }
    let iteration = 0;
    const interval = setInterval(() => {
      setScrambled(
        label
          .split("")
          .map((c, i) => (i < iteration ? label[i] : chars[Math.floor(Math.random() * chars.length)]))
          .join("")
      );
      iteration += 0.5;
      if (iteration >= label.length) {
        setScrambled(code);
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [hovered, label, code]);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-4 py-2 text-sm transition-colors group overflow-hidden"
    >
      <span className={`font-mono transition-colors duration-200 ${hovered ? "text-accent-light" : "text-muted"}`}>
        {scrambled}
      </span>
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-px bg-accent-light"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
    </a>
  );
}

function AnimatedLogo() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <a href="#accueil" className="relative text-lg font-bold tracking-tight group">
      <motion.span
        animate={glitch ? { x: [-2, 2, -1, 0], opacity: [1, 0.5, 1] } : {}}
        transition={{ duration: 0.15 }}
        className="relative inline-block"
      >
        <span className="text-accent-light opacity-80">{"<"}</span>
        <span className="text-foreground">Adoum</span>
        <span className="text-accent-light opacity-80">{" />"}</span>
      </motion.span>
      {glitch && (
        <span className="absolute inset-0 text-red-400/30 translate-x-[2px]" aria-hidden>
          <span>{"<"}</span>Adoum<span>{" />"}</span>
        </span>
      )}
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      // Detect active section
      const sections = ["accueil", "projets", "competences", "parcours", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[70] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/40 backdrop-blur-2xl border-b border-card-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <AnimatedLogo />

          <div className="hidden md:flex items-center gap-0.5">
            {links.map((l) => (
              <div key={l.href} className="relative">
                <NavLink {...l} />
                {activeSection === l.href.slice(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-accent-light -translate-x-1/2"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            ))}
            <motion.a
              href="/cv"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px -5px rgba(99,102,241,0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 px-5 py-2 text-sm font-mono rounded-full bg-accent/10 text-accent-light border border-accent/20 hover:bg-accent/20 transition-colors"
            >
              ./cv
            </motion.a>
          </div>

          <motion.button
            onClick={() => setOpen(!open)}
            className="md:hidden text-foreground"
            whileTap={{ scale: 0.9, rotate: 90 }}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, height: "auto", backdropFilter: "blur(24px)" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background/90 border-b border-card-border overflow-hidden"
            >
              <div className="flex flex-col px-6 py-4 gap-1">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-muted hover:text-accent-light font-mono py-2 transition-colors"
                  >
                    <span className="text-accent-light/50 mr-2">{`0${i + 1}.`}</span>
                    {l.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
