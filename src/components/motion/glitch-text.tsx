"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <motion.span
      className={cn("relative inline-block", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      {/* Base text */}
      <span className="relative z-10">{text}</span>
      {/* Red glitch layer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-accent"
        style={{ animation: "glitch-1 3s infinite linear alternate-reverse" }}
      >
        {text}
      </span>
      {/* Cyan glitch layer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-cyan"
        style={{ animation: "glitch-2 2s infinite linear alternate-reverse" }}
      >
        {text}
      </span>
    </motion.span>
  );
}
