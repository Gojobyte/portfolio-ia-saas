"use client";

import { useEffect, useRef } from "react";

const CODE_CHARS = "const let var function return async await import export default class interface type extends implements new this super if else for while do switch case break continue try catch throw finally yield delete typeof instanceof void in of => {} [] () ; : , . ... = == === != !== > < >= <= + - * / % ** & | ^ ~ << >> >>> && || ?? ?. ! ? @ # $ _ 0 1 2 3 4 5 6 7 8 9 A B C D E F a b c d e f next react node prisma sql api tsx jsx css html".split(" ");

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  length: number;
  opacity: number;
}

export function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouse = { x: -1000, y: -1000 };
    const columns: Column[] = [];
    const charSize = 14;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initColumns();
    };

    const initColumns = () => {
      columns.length = 0;
      const colCount = Math.floor(canvas.width / (charSize + 2));
      for (let i = 0; i < colCount; i++) {
        const length = Math.floor(Math.random() * 25) + 8;
        const chars: string[] = [];
        for (let j = 0; j < length; j++) {
          chars.push(CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)]);
        }
        columns.push({
          x: i * (charSize + 2),
          y: Math.random() * -canvas.height * 2,
          speed: Math.random() * 1.5 + 0.5,
          chars,
          length,
          opacity: Math.random() * 0.3 + 0.05,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 7, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${charSize}px "Geist Mono", monospace`;

      for (const col of columns) {
        col.y += col.speed;

        for (let j = 0; j < col.chars.length; j++) {
          const cy = col.y + j * (charSize + 4);
          if (cy < -charSize || cy > canvas.height + charSize) continue;

          // Mouse proximity glow
          const dx = col.x - mouse.x;
          const dy = cy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const glow = dist < 150 ? (1 - dist / 150) * 0.6 : 0;

          // Head of column is brighter
          const isHead = j === col.chars.length - 1;
          const fade = 1 - j / col.chars.length;

          if (isHead) {
            ctx.fillStyle = `rgba(200, 200, 255, ${(col.opacity * 3 + glow)})`;
            ctx.shadowColor = "rgba(99, 102, 241, 0.8)";
            ctx.shadowBlur = 8;
          } else {
            const r = 80 + glow * 100;
            const g = 70 + glow * 80;
            const b = 200 + glow * 55;
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${col.opacity * fade + glow * 0.3})`;
            ctx.shadowBlur = 0;
          }

          ctx.fillText(col.chars[j], col.x, cy);
          ctx.shadowBlur = 0;

          // Random char mutation
          if (Math.random() < 0.002) {
            col.chars[j] = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
          }
        }

        // Reset when off screen
        if (col.y > canvas.height + col.length * (charSize + 4)) {
          col.y = -col.length * (charSize + 4) - Math.random() * 500;
          col.speed = Math.random() * 1.5 + 0.5;
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
