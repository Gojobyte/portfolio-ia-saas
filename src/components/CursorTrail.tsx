"use client";

import { useEffect, useRef } from "react";

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const trail: { x: number; y: number; age: number; char: string; vx: number; vy: number }[] = [];
    const chars = ["</>", "{}", "=>", "[]", "()", "&&", "||", "++", "!=", "::", "##"];
    let mouse = { x: 0, y: 0 };
    let prevMouse = { x: 0, y: 0 };
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      prevMouse.x = mouse.x;
      prevMouse.y = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Emit particles on movement
      const dx = mouse.x - prevMouse.x;
      const dy = mouse.y - prevMouse.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 3 && frame % 2 === 0) {
        trail.push({
          x: mouse.x,
          y: mouse.y,
          age: 0,
          char: chars[Math.floor(Math.random() * chars.length)],
          vx: (Math.random() - 0.5) * 2 + dx * 0.05,
          vy: (Math.random() - 0.5) * 2 + dy * 0.05 - 0.5,
        });
      }

      // Update and draw trail
      ctx.font = '12px "Geist Mono", monospace';
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.age++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03; // gravity
        p.vx *= 0.99;

        const maxAge = 60;
        const alpha = 1 - p.age / maxAge;

        if (alpha <= 0) {
          trail.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `rgba(129, 140, 248, ${alpha * 0.6})`;
        ctx.fillText(p.char, p.x, p.y);
      }

      // Cursor glow ring
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(99, 102, 241, 0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(129, 140, 248, 0.4)";
      ctx.fill();

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
      className="fixed inset-0 z-[60] pointer-events-none"
    />
  );
}
