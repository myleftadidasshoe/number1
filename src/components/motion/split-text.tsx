"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  staggerDelay?: number;
  animation?: "rise" | "fade" | "blur";
}

const animations = {
  rise: {
    initial: { y: "110%", rotateX: -80 },
    animate: { y: "0%", rotateX: 0 },
  },
  fade: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
  },
};

export function SplitText({
  text,
  className,
  charClassName,
  delay = 0,
  staggerDelay = 0.03,
  animation = "rise",
}: SplitTextProps) {
  const words = text.split(" ");
  const anim = animations[animation];
  let charIndex = 0;

  return (
    <span className={cn("inline-block", className)} style={{ perspective: "600px" }}>
      {words.map((word, wordIdx) => {
        const wordChars = word.split("").map((char) => {
          const currentIndex = charIndex;
          charIndex++;
          return { char, index: currentIndex };
        });

        return (
          <span key={word + String(wordIdx)} className="inline-block whitespace-nowrap">
            {wordChars.map(({ char, index }) => (
              <span
                key={char + String(index)}
                className="inline-block overflow-hidden"
                style={{ perspective: "600px" }}
              >
                <motion.span
                  className={cn("inline-block", charClassName)}
                  initial={anim.initial}
                  whileInView={anim.animate}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: delay + index * staggerDelay,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                >
                  {char}
                </motion.span>
              </span>
            ))}
            {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
}
