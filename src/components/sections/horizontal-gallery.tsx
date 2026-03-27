"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const components = [
  {
    id: "01",
    title: "PLATTER",
    desc: "Aluminum alloy disc coated with magnetic material. Data is written in concentric tracks at nanometer precision.",
    accent: "bg-accent",
  },
  {
    id: "02",
    title: "SPINDLE",
    desc: "Fluid dynamic bearing motor. Maintains 7200 RPM with sub-micron wobble tolerance.",
    accent: "bg-cyan",
  },
  {
    id: "03",
    title: "READ/WRITE HEAD",
    desc: "Giant magnetoresistive sensor floating 3nm above the platter surface at 120km/h.",
    accent: "bg-magenta",
  },
  {
    id: "04",
    title: "ACTUATOR ARM",
    desc: "Voice coil motor positions the head across 500,000+ tracks in milliseconds.",
    accent: "bg-yellow",
  },
  {
    id: "05",
    title: "PCB",
    desc: "Controller board with ARM processor, DRAM cache, and SATA interface circuitry.",
    accent: "bg-accent",
  },
];

export function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!trackRef.current || !sectionRef.current) return;

      const totalScroll = trackRef.current.scrollWidth - window.innerWidth;

      gsap.to(trackRef.current, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div ref={trackRef} className="flex items-stretch">
        {/* Intro panel */}
        <div className="flex h-screen min-w-[45vw] flex-col justify-center px-[5vw]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.5em] text-accent">
            Internal Components
          </p>
          <h2 className="text-6xl font-black uppercase leading-[0.9] tracking-tighter md:text-8xl">
            Inside
            <br />
            <span className="text-accent">the</span>
            <br />
            Drive
          </h2>
          <div className="mt-6 h-px w-24 bg-accent/40" />
          <p className="mt-4 max-w-xs font-mono text-xs leading-relaxed text-muted">
            Every component engineered for precision at the nanometer scale.
          </p>
        </div>

        {/* Component cards */}
        {components.map((comp) => (
          <div
            key={comp.id}
            className="group relative flex h-screen min-w-[35vw] flex-shrink-0 flex-col justify-center px-12"
          >
            {/* Card content */}
            <div className="relative border border-white/5 bg-white/[0.02] p-10 transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/[0.04]">
              {/* Top accent bar */}
              <div
                className={`absolute top-0 left-0 h-px w-16 ${comp.accent} transition-all duration-500 group-hover:w-full`}
              />

              <span className="font-mono text-6xl font-black text-white/[0.04] md:text-8xl">
                {comp.id}
              </span>
              <h3 className="mt-4 text-2xl font-bold uppercase tracking-wider">{comp.title}</h3>
              <p className="mt-3 max-w-sm font-mono text-xs leading-relaxed text-muted">
                {comp.desc}
              </p>

              {/* Bottom detail */}
              <div className="mt-8 flex items-center gap-3">
                <div className={`h-1.5 w-1.5 rounded-full ${comp.accent}`} />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted/50">
                  Component {comp.id}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div className="min-w-[10vw] flex-shrink-0" />
      </div>
    </section>
  );
}
