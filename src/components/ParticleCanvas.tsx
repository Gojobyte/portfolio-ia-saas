"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let mouse = { x: 0, y: 0, active: false };
    const stars: Star[] = [];
    const count = 400;
    let speed = 0.5;
    let targetSpeed = 0.5;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < count; i++) {
      const z = Math.random() * 1500;
      stars.push({
        x: (Math.random() - 0.5) * canvas.width * 3,
        y: (Math.random() - 0.5) * canvas.height * 3,
        z,
        prevZ: z,
      });
    }

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseLeave = () => { mouse.active = false; };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onMouseLeave);

    const onScroll = () => {
      targetSpeed = 3;
      setTimeout(() => { targetSpeed = 0.5; }, 200);
    };
    window.addEventListener("scroll", onScroll);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Trail effect
      ctx.fillStyle = "rgba(5, 5, 7, 0.15)";
      ctx.fillRect(0, 0, w, h);

      speed += (targetSpeed - speed) * 0.02;

      for (const star of stars) {
        star.prevZ = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * w * 3;
          star.y = (Math.random() - 0.5) * h * 3;
          star.z = 1500;
          star.prevZ = 1500;
        }

        // Project current position
        const sx = (star.x / star.z) * 400 + cx;
        const sy = (star.y / star.z) * 400 + cy;

        // Project previous position
        const px = (star.x / star.prevZ) * 400 + cx;
        const py = (star.y / star.prevZ) * 400 + cy;

        if (sx < 0 || sx > w || sy < 0 || sy > h) continue;

        const size = Math.max(0, (1 - star.z / 1500) * 2.5);
        const alpha = Math.max(0, (1 - star.z / 1500) * 0.8);

        // Star trail line
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `rgba(140, 130, 255, ${alpha * 0.4})`;
        ctx.lineWidth = size * 0.5;
        ctx.stroke();

        // Star dot
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 195, 255, ${alpha})`;
        ctx.fill();
      }

      // Cursor glow
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
        gradient.addColorStop(0, "rgba(99, 102, 241, 0.04)");
        gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(mouse.x - 200, mouse.y - 200, 400, 400);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
