"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealDelay?: number;
  trigger?: boolean;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export function TextScramble({
  text,
  className,
  scrambleSpeed = 30,
  revealDelay = 0,
  trigger = true,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text.replace(/[^ ]/g, " "));
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );
      iteration += 1 / 3;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [text, scrambleSpeed]);

  useEffect(() => {
    if (!trigger) return;
    const timeout = setTimeout(animate, revealDelay);
    return () => clearTimeout(timeout);
  }, [trigger, revealDelay, animate]);

  return (
    <span className={cn("font-mono", className)} role="img" aria-label={text}>
      {display}
    </span>
  );
}
