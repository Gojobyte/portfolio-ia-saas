"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const stack = [
  { name: "Next.js", size: 1.3 }, { name: "React", size: 1.2 }, { name: "TypeScript", size: 1.25 },
  { name: "Tailwind CSS", size: 1.1 }, { name: "Framer Motion", size: 1.0 }, { name: "shadcn/ui", size: 0.95 },
  { name: "Node.js", size: 1.15 }, { name: "Prisma", size: 1.2 }, { name: "NextAuth v5", size: 1.05 },
  { name: "Express.js", size: 1.0 }, { name: "REST API", size: 0.95 }, { name: "Microservices", size: 1.1 },
  { name: "PostgreSQL", size: 1.25 }, { name: "MongoDB", size: 1.05 }, { name: "Redis", size: 1.0 },
  { name: "Supabase", size: 1.1 }, { name: "Docker", size: 1.05 }, { name: "Vercel", size: 1.15 },
  { name: "Git", size: 0.9 }, { name: "CI/CD", size: 0.9 }, { name: "Claude Code", size: 1.2 },
  { name: "GitHub Copilot", size: 1.1 }, { name: "Hermes (LLM)", size: 1.05 }, { name: "VPS Config", size: 0.95 },
  { name: "Stripe", size: 1.0 }, { name: "Liveblocks", size: 1.0 }, { name: "Recharts", size: 0.9 },
  { name: "Resend", size: 0.85 },
];

function TagCloud3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<{ x: number; y: number; z: number; name: string; size: number }[]>([]);
  const angleRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const radius = 220;
    const positioned = stack.map((s, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / stack.length);
      const theta = Math.sqrt(stack.length * Math.PI) * phi;
      return {
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        name: s.name,
        size: s.size,
      };
    });
    setItems(positioned);

    const animate = () => {
      angleRef.current.x += 0.002 + mouseRef.current.y * 0.0001;
      angleRef.current.y += 0.003 + mouseRef.current.x * 0.0001;

      const cosX = Math.cos(angleRef.current.x);
      const sinX = Math.sin(angleRef.current.x);
      const cosY = Math.cos(angleRef.current.y);
      const sinY = Math.sin(angleRef.current.y);

      setItems((prev) =>
        prev.map((item) => {
          // Rotate around X axis
          let y1 = item.y * cosX - item.z * sinX;
          let z1 = item.y * sinX + item.z * cosX;
          // Rotate around Y axis
          let x1 = item.x * cosY + z1 * sinY;
          let z2 = -item.x * sinY + z1 * cosY;

          return { ...item, x: x1, y: y1, z: z2 };
        })
      );

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    const onMouse = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current.x = (e.clientX - rect.left - rect.width / 2);
      mouseRef.current.y = (e.clientY - rect.top - rect.height / 2);
    };

    containerRef.current?.addEventListener("mousemove", onMouse);
    return () => {
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] flex items-center justify-center cursor-grab"
      style={{ perspective: 800 }}
    >
      {items.map((item) => {
        const scale = (item.z + 300) / 600;
        const opacity = Math.max(0.2, Math.min(1, scale));
        return (
          <div
            key={item.name}
            className="absolute transition-none"
            style={{
              transform: `translate3d(${item.x}px, ${item.y}px, ${item.z}px)`,
              left: "50%",
              top: "50%",
              marginLeft: -50,
              marginTop: -15,
            }}
          >
            <span
              className="px-4 py-2 rounded-full glass-card text-foreground font-medium whitespace-nowrap inline-block hover:border-accent/40 hover:shadow-[0_0_20px_-5px_var(--accent-glow)] transition-colors"
              style={{
                fontSize: `${13 * item.size * scale}px`,
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  return (
    <section id="competences" className="py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto" style={{ perspective: 1000 }}>
        <motion.div
          style={{ rotateX, transformStyle: "preserve-3d" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <p className="text-accent-light font-mono text-sm mb-4">// stack technique</p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Les outils que j&apos;utilise <span className="text-gradient">au quotidien</span>
            </h2>
          </motion.div>

          <TagCloud3D />
        </motion.div>
      </div>
    </section>
  );
}
