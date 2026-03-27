"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const specs = [
  { label: "CAPACITY", value: "1", unit: "TB", detail: "Seagate Barracuda" },
  { label: "SPEED", value: "7200", unit: "RPM", detail: "Sustained rotation" },
  { label: "CACHE", value: "256", unit: "MB", detail: "DRAM buffer" },
  { label: "INTERFACE", value: "6", unit: "Gb/s", detail: "SATA III" },
  { label: "LATENCY", value: "4.16", unit: "ms", detail: "Average seek" },
  { label: "PLATTERS", value: "2", unit: "×", detail: "PMR technology" },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Animate each spec card in
      const cards = sectionRef.current.querySelectorAll("[data-spec-card]");
      gsap.fromTo(
        cards,
        { opacity: 0, x: -40, borderLeftColor: "rgba(255,23,68,0)" },
        {
          opacity: 1,
          x: 0,
          borderLeftColor: "rgba(255,23,68,0.5)",
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

      // Count up the values
      const valueEls = sectionRef.current.querySelectorAll("[data-spec-value]");
      for (const el of valueEls) {
        const target = Number.parseFloat(el.getAttribute("data-spec-value") || "0");
        const isFloat = target % 1 !== 0;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
          onUpdate: () => {
            (el as HTMLElement).textContent = isFloat
              ? obj.val.toFixed(2)
              : String(Math.floor(obj.val));
          },
        });
      }

      // Animate the horizontal divider
      const divider = sectionRef.current.querySelector("[data-divider]");
      if (divider) {
        gsap.fromTo(
          divider,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: divider,
              start: "top 85%",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative px-6 py-32">
      {/* Section header */}
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-center gap-4">
          <div className="h-px flex-1 bg-accent/20 origin-left" data-divider />
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-accent">
            Technical Specifications
          </span>
          <div className="h-px flex-1 bg-accent/20" />
        </div>

        {/* Spec grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {specs.map((spec) => (
            <div
              key={spec.label}
              data-spec-card
              className="group border-l-2 border-l-transparent bg-white/[0.02] px-6 py-6 transition-all duration-300 hover:bg-white/[0.04]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                {spec.label}
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span
                  data-spec-value={spec.value}
                  className="font-mono text-4xl font-bold text-foreground md:text-5xl"
                >
                  0
                </span>
                <span className="font-mono text-lg text-accent">{spec.unit}</span>
              </div>
              <p className="mt-2 font-mono text-xs text-muted/60">{spec.detail}</p>
            </div>
          ))}
        </div>

        {/* Bottom detail line */}
        <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted/30">
            Model: ST1000DM010
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted/30">
            Form Factor: 3.5&quot;
          </span>
        </div>
      </div>
    </section>
  );
}
