"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Parallax } from "@/components/motion/parallax";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "60", unit: "fps", label: "Animation Performance" },
  { value: "100", unit: "ms", label: "First Interaction" },
  { value: "0", unit: "kb", label: "Layout Shift" },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Animate stat numbers counting up
      const statEls = sectionRef.current.querySelectorAll("[data-stat-value]");
      for (const el of statEls) {
        const target = Number.parseInt(el.getAttribute("data-stat-value") || "0", 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
          onUpdate: () => {
            (el as HTMLElement).textContent = String(Math.floor(obj.val));
          },
        });
      }

      // Stagger the stat blocks
      const blocks = sectionRef.current.querySelectorAll("[data-stat-block]");
      gsap.fromTo(
        blocks,
        { opacity: 0, y: 60, rotateX: 20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative py-40 px-6 overflow-hidden">
      {/* Background parallax decorative elements */}
      <Parallax speed={0.3} className="pointer-events-none absolute inset-0">
        <div className="absolute right-[10%] top-[20%] h-64 w-64 rounded-full border border-white/[0.03]" />
        <div className="absolute left-[15%] bottom-[30%] h-40 w-40 rounded-full border border-white/[0.03]" />
        <div className="absolute right-[30%] bottom-[10%] h-96 w-96 rounded-full border border-white/[0.02]" />
      </Parallax>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-3" style={{ perspective: "800px" }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-stat-block
              className="group rounded-2xl border border-white/5 bg-white/[0.02] p-10 backdrop-blur-sm transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
            >
              <div className="mb-6 flex items-baseline gap-1">
                <span
                  data-stat-value={stat.value}
                  className="font-mono text-6xl font-bold text-accent md:text-7xl"
                >
                  0
                </span>
                <span className="text-2xl font-light text-muted">{stat.unit}</span>
              </div>
              <div className="h-px w-8 bg-white/10 mb-4 transition-all duration-500 group-hover:w-16 group-hover:bg-accent/50" />
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
