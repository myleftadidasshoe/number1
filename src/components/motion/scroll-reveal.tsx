"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: ScrollTrigger.Vars;
}

export function ScrollReveal({
  children,
  className,
  from = { opacity: 0, y: 60 },
  to = { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
  trigger,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(containerRef.current, from, {
        ...to,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          ...trigger,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}
