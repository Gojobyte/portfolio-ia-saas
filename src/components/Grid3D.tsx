"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Grid3D() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const gridZ = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 0.5, 0]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none" style={{ perspective: 600 }}>
      <motion.div
        style={{ opacity, translateZ: gridZ, rotateX: 70 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[200vw] h-[200vh]"
      >
        {/* Horizontal lines */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`h${i}`}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${i * 5}%`,
              background: `linear-gradient(90deg, transparent 0%, rgba(99,102,241,${0.08 + (i % 3) * 0.03}) 30%, rgba(99,102,241,${0.08 + (i % 3) * 0.03}) 70%, transparent 100%)`,
            }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        {/* Vertical lines */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={`v${i}`}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${i * 2.5}%`,
              background: `linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.06) 50%, transparent 100%)`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function Portal() {
  return (
    <div className="relative py-8 my-4">
      <div className="flex items-center justify-center" style={{ perspective: 800 }}>
        <motion.div
          animate={{
            rotateY: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative w-32 h-32"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Portal rings */}
          {[0, 60, 120].map((deg) => (
            <motion.div
              key={deg}
              className="absolute inset-0 rounded-full border border-accent/20"
              style={{ transform: `rotateY(${deg}deg)` }}
              animate={{ borderColor: ["rgba(99,102,241,0.1)", "rgba(139,92,246,0.3)", "rgba(99,102,241,0.1)"] }}
              transition={{ duration: 2, repeat: Infinity, delay: deg / 120 }}
            />
          ))}
          {/* Center glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-4 h-4 rounded-full bg-accent/40 blur-sm"
            />
          </div>
        </motion.div>
      </div>
      {/* Light beam */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
    </div>
  );
}
