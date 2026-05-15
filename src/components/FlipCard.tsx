"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export function FlipCard({ front, back, className = "" }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      style={{ perspective: 1000 }}
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl p-7 flex flex-col holo-card"
          style={{ backfaceVisibility: "hidden", background: "rgba(12, 12, 25, 0.92)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {front}
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-7 flex flex-col justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "rgba(15, 12, 30, 0.95)", border: "1px solid rgba(99,102,241,0.25)" }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}
