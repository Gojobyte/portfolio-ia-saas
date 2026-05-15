"use client";

import { motion } from "framer-motion";

const shapes = [
  { size: 60, x: "10%", y: "20%", duration: 20, delay: 0, type: "cube" },
  { size: 40, x: "85%", y: "15%", duration: 25, delay: 2, type: "octahedron" },
  { size: 50, x: "75%", y: "70%", duration: 22, delay: 4, type: "cube" },
  { size: 35, x: "20%", y: "75%", duration: 18, delay: 1, type: "octahedron" },
  { size: 45, x: "50%", y: "85%", duration: 24, delay: 3, type: "cube" },
];

function Cube({ size }: { size: number }) {
  const half = size / 2;
  const faces = [
    { transform: `translateZ(${half}px)`, bg: "rgba(99, 102, 241, 0.08)" },
    { transform: `rotateY(180deg) translateZ(${half}px)`, bg: "rgba(139, 92, 246, 0.06)" },
    { transform: `rotateY(90deg) translateZ(${half}px)`, bg: "rgba(99, 102, 241, 0.05)" },
    { transform: `rotateY(-90deg) translateZ(${half}px)`, bg: "rgba(139, 92, 246, 0.07)" },
    { transform: `rotateX(90deg) translateZ(${half}px)`, bg: "rgba(99, 102, 241, 0.04)" },
    { transform: `rotateX(-90deg) translateZ(${half}px)`, bg: "rgba(139, 92, 246, 0.06)" },
  ];

  return (
    <div style={{ width: size, height: size, perspective: 600 }}>
      <motion.div
        animate={{ rotateX: 360, rotateY: 360, rotateZ: 180 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ width: size, height: size, transformStyle: "preserve-3d", position: "relative" }}
      >
        {faces.map((f, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              transform: f.transform,
              background: f.bg,
              border: "1px solid rgba(99, 102, 241, 0.12)",
              borderRadius: 4,
              backfaceVisibility: "hidden",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function Octahedron({ size }: { size: number }) {
  return (
    <div style={{ width: size, height: size, perspective: 600 }}>
      <motion.div
        animate={{ rotateX: 360, rotateY: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ width: size, height: size, transformStyle: "preserve-3d", position: "relative" }}
      >
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            style={{
              position: "absolute",
              width: 0,
              height: 0,
              left: "50%",
              top: "50%",
              borderLeft: `${size / 2}px solid transparent`,
              borderRight: `${size / 2}px solid transparent`,
              borderBottom: `${size}px solid rgba(139, 92, 246, 0.06)`,
              transform: `translate(-50%, -50%) rotateY(${deg}deg) rotateX(30deg)`,
              transformOrigin: "center center",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function FloatingShapes() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, 0, -10, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        >
          {s.type === "cube" ? <Cube size={s.size} /> : <Octahedron size={s.size} />}
        </motion.div>
      ))}
    </div>
  );
}
