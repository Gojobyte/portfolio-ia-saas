"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    };
    const interval = setInterval(trigger, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layers */}
      {glitch && (
        <>
          <span
            className="absolute inset-0 z-20"
            style={{
              color: "#ff0040",
              clipPath: `polygon(0 ${Math.random() * 40}%, 100% ${Math.random() * 40}%, 100% ${40 + Math.random() * 30}%, 0 ${40 + Math.random() * 30}%)`,
              transform: `translate(${-2 + Math.random() * 4}px, ${-1 + Math.random() * 2}px)`,
              opacity: 0.8,
            }}
            aria-hidden
          >
            {text}
          </span>
          <span
            className="absolute inset-0 z-20"
            style={{
              color: "#00ffff",
              clipPath: `polygon(0 ${50 + Math.random() * 30}%, 100% ${50 + Math.random() * 30}%, 100% ${80 + Math.random() * 20}%, 0 ${80 + Math.random() * 20}%)`,
              transform: `translate(${-3 + Math.random() * 6}px, ${-1 + Math.random() * 2}px)`,
              opacity: 0.8,
            }}
            aria-hidden
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
}

export function TerminalText({ lines }: { lines: string[] }) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorBlink = setInterval(() => setShowCursor((p) => !p), 500);
    return () => clearInterval(cursorBlink);
  }, []);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const line = lines[currentLine];
    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => {
          const newLines = [...prev];
          newLines[currentLine] = line.slice(0, currentChar + 1);
          return newLines;
        });
        setCurrentChar((c) => c + 1);
      }, 30 + Math.random() * 40);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
        setVisibleLines((prev) => [...prev, ""]);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentLine, currentChar, lines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-mono text-sm leading-relaxed"
    >
      {visibleLines.map((line, i) => (
        <div key={i} className="flex gap-2">
          <span className="text-accent-light select-none shrink-0">
            {line.startsWith("//") ? "//" : ">"}
          </span>
          <span className={line.startsWith("//") ? "text-muted" : "text-foreground"}>
            {line.startsWith("//") ? line.slice(3) : line}
            {i === visibleLines.length - 1 && showCursor && (
              <span className="inline-block w-2 h-4 bg-accent-light ml-0.5 align-middle animate-pulse" />
            )}
          </span>
        </div>
      ))}
    </motion.div>
  );
}
