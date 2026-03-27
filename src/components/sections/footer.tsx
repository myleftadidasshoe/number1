"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { SplitText } from "@/components/motion/split-text";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const border = sectionRef.current.querySelector("[data-footer-border]");
      if (border) {
        gsap.fromTo(
          border,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <footer ref={sectionRef} className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <div data-footer-border className="h-px bg-accent/30 origin-left mb-16" />

        <div className="text-center">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.5em] text-accent/50">
            End of Disk
          </p>

          <h2 className="text-5xl font-black uppercase tracking-tighter md:text-8xl">
            <SplitText
              text="SPIN"
              delay={0.1}
              animation="rise"
              charClassName="will-change-transform"
            />
            <br />
            <SplitText
              text="DOWN"
              delay={0.3}
              animation="rise"
              charClassName="will-change-transform text-accent"
            />
          </h2>

          {/* Epitaph */}
          <p className="mx-auto mt-8 max-w-md font-mono text-xs leading-relaxed text-muted/60">
            The platter stops. The heads park for the last time. 87,432 hours of service. 10 years
            of someone&apos;s life, spinning at 120 meters per second, 3 nanometers from
            destruction.
          </p>

          <p className="mx-auto mt-4 max-w-md font-mono text-xs leading-relaxed text-muted/40">
            It held birthdays and tax returns and love letters and things that were never meant to
            be found. All of it reduced to demagnetized aluminum. All of it returning to noise.
          </p>

          <pre className="mx-auto mt-10 font-mono text-[8px] leading-tight text-accent/30 select-none">
            {`    ┌──────────────────────────┐
    │                          │
    │     POWER OFF            │
    │     GOODBYE              │
    │                          │
    └──────────────────────────┘`}
          </pre>

          <div className="mt-16 font-mono text-[9px] uppercase tracking-widest text-muted/20">
            <p>Orange nights and days of gray.</p>
            <p className="mt-2">Nothing lasts. Not even the things we built to remember.</p>
          </div>

          <div className="mt-16 flex items-center justify-center gap-8 font-mono text-[9px] uppercase tracking-widest text-muted/15">
            <span>number1</span>
            <span>&#x2022;</span>
            <span>2026</span>
            <span>&#x2022;</span>
            <span>Sector 0xFFFF</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
