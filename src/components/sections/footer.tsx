"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { SplitText } from "@/components/motion/split-text";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!lineRef.current) return;

      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <footer ref={sectionRef} className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Animated divider */}
        <div ref={lineRef} className="mb-20 h-px bg-white/10 origin-left" />

        <div className="flex flex-col items-center text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-muted">Ready to start?</p>

          <h2 className="text-5xl font-bold tracking-tight md:text-8xl">
            <SplitText text="Let's create" animation="rise" delay={0} />
            <br />
            <SplitText text="something" animation="rise" delay={0.2} charClassName="text-accent" />
            <br />
            <SplitText text="extraordinary." animation="rise" delay={0.4} />
          </h2>

          <div className="mt-12">
            <MagneticButton className="bg-accent/10 border-accent/30 hover:bg-accent/20 px-12 py-5 text-base">
              Get in Touch
            </MagneticButton>
          </div>

          <div className="mt-24 flex w-full items-center justify-between text-xs text-muted/50">
            <span>number1 Studio</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
