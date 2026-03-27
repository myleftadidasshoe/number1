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
      <div className="mx-auto max-w-6xl">
        <div data-footer-border className="h-px bg-accent/30 origin-left mb-20" />

        <div className="text-center">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.5em] text-accent">
            End of Sector
          </p>

          <h2 className="text-5xl font-black uppercase tracking-tighter md:text-8xl">
            <SplitText
              text="EJECT"
              delay={0.1}
              animation="rise"
              charClassName="will-change-transform"
            />
            <br />
            <SplitText
              text="DISK"
              delay={0.3}
              animation="rise"
              charClassName="will-change-transform text-accent"
            />
          </h2>

          <div className="mt-10">
            <button
              type="button"
              className="group relative overflow-hidden border border-accent bg-accent/10 px-10 py-4 font-mono text-xs uppercase tracking-[0.3em] text-accent transition-all duration-300 hover:bg-accent hover:text-white"
            >
              Initialize Contact
            </button>
          </div>

          <div className="mt-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted/30">
            <span>number1 &mdash; 2026</span>
            <span>Akira Protocol v1.0</span>
            <span>Neo-Tokyo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
