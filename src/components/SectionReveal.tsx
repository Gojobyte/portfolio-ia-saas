"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function SectionReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);

  return (
    <div ref={ref} style={{ perspective: 1200 }}>
      <motion.div
        style={{ opacity, y, scale, rotateX, transformOrigin: "center top" }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function CodeDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-6 py-4"
    >
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <motion.span
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="font-mono text-[11px] text-accent-light/40 shrink-0"
        >
          {`/* ─── */`}
        </motion.span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>
    </motion.div>
  );
}

export function SectionHeader({ tag, title, gradient }: { tag: string; title: string; gradient: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-accent-light font-mono text-sm mb-4"
      >
        {tag}
      </motion.p>
      <h2 className="text-3xl sm:text-5xl font-bold">
        {title} <span className="text-gradient">{gradient}</span>
      </h2>
    </motion.div>
  );
}
