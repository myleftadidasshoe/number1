"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface RevealImageProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
}

const clipPaths = {
  left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
  right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
  up: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
  down: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
};

export function RevealImage({ children, className, direction = "left" }: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clip = clipPaths[direction];

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        containerRef.current,
        { clipPath: clip.from },
        {
          clipPath: clip.to,
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );

      // Subtle scale counter-animation for a cinematic feel
      const inner = containerRef.current.querySelector("[data-reveal-inner]");
      if (inner) {
        gsap.fromTo(
          inner,
          { scale: 1.3 },
          {
            scale: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          },
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div data-reveal-inner>{children}</div>
    </div>
  );
}
