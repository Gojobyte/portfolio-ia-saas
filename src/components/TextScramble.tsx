"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function TextScramble({
  text,
  className = "",
  trigger = "view",
}: {
  text: string;
  className?: string;
  trigger?: "view" | "hover" | "always";
}) {
  const [displayed, setDisplayed] = useState(trigger === "always" ? "" : text);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration += 1 / 2;
      if (iteration >= text.length) {
        setDisplayed(text);
        clearInterval(interval);
      }
    }, 25);
  };

  useEffect(() => {
    if (trigger === "view" && inView && !hasAnimated.current) {
      hasAnimated.current = true;
      setDisplayed("");
      setTimeout(scramble, 100);
    }
    if (trigger === "always") {
      scramble();
    }
  }, [inView, trigger, text]);

  const handleHover = () => {
    if (trigger === "hover") scramble();
  };

  return (
    <span ref={ref} className={`${className} font-mono`} onMouseEnter={handleHover}>
      {displayed}
    </span>
  );
}

export function TypeWriter({
  text,
  className = "",
  speed = 50,
  delay = 0,
}: {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [inView, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      <span className="inline-block w-[2px] h-[1em] bg-accent-light ml-0.5 align-middle animate-pulse" />
    </span>
  );
}
