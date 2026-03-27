"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    phase: "01",
    title: "BEARING\nWEAR",
    desc: "The fluid dynamic bearing is losing viscosity. Friction increases. The spindle wobbles 0.003mm more than spec. Imperceptible to you. Fatal to the platter.",
    accent: "bg-cyan",
  },
  {
    phase: "02",
    title: "HEAD\nDRIFT",
    desc: "The actuator arm can no longer position the read/write head with nanometer precision. It overshoots. Retries. Each retry is a moment of silence where your file should be.",
    accent: "bg-yellow",
  },
  {
    phase: "03",
    title: "SECTOR\nDEATH",
    desc: "Magnetic domains on the platter are depolarizing. Bits flip. Checksums fail. The firmware quietly remaps bad sectors, but it's running out of spares.",
    accent: "bg-magenta",
  },
  {
    phase: "04",
    title: "THE\nCLICK",
    desc: "The head crashes into the platter surface. A sound like a ticking clock. Click. Click. Click. The death rattle of a hard drive. You've heard it. You know what it means.",
    accent: "bg-accent",
  },
  {
    phase: "05",
    title: "SPIN\nDOWN",
    desc: "7,200 RPM. 6,000. 3,000. The platter decelerates for the last time. Every rotation carries less data, less memory, less of whoever stored their life here.",
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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div ref={trackRef} className="flex items-stretch">
        {/* Intro panel */}
        <div className="flex h-screen min-w-[45vw] flex-col justify-center px-[5vw]">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.5em] text-accent">
            Failure Cascade
          </p>
          <h2 className="text-6xl font-black uppercase leading-[0.9] tracking-tighter md:text-8xl">
            How a
            <br />
            drive
            <br />
            <span className="text-accent">dies</span>
          </h2>
          <div className="mt-6 h-px w-24 bg-accent/40" />
          <p className="mt-4 max-w-xs font-mono text-xs leading-relaxed text-muted">
            It never happens all at once. It&apos;s a slow unraveling. Component by component. Bit
            by bit.
          </p>
        </div>

        {/* Stage cards */}
        {stages.map((stage) => (
          <div
            key={stage.phase}
            className="group relative flex h-screen min-w-[38vw] flex-shrink-0 flex-col justify-center px-12"
          >
            <div className="relative border border-white/5 bg-white/[0.02] p-10 transition-all duration-500 group-hover:border-white/10 group-hover:bg-white/[0.04]">
              <div
                className={`absolute top-0 left-0 h-px w-16 ${stage.accent} transition-all duration-500 group-hover:w-full`}
              />

              <span className="font-mono text-7xl font-black text-white/[0.03] md:text-9xl">
                {stage.phase}
              </span>
              <h3 className="mt-2 whitespace-pre-line text-2xl font-bold uppercase leading-tight tracking-wider">
                {stage.title}
              </h3>
              <p className="mt-4 max-w-sm font-mono text-[11px] leading-relaxed text-muted">
                {stage.desc}
              </p>

              <div className="mt-8 flex items-center gap-3">
                <div className={`h-1.5 w-1.5 rounded-full ${stage.accent}`} />
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted/40">
                  Phase {stage.phase} of failure
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="min-w-[10vw] flex-shrink-0" />
      </div>
    </section>
  );
}
