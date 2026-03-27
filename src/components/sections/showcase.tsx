"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useRef } from "react";
import { TextScramble } from "@/components/motion/text-scramble";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "1956",
    event: "IBM 350 RAMAC",
    detail:
      "First commercial hard drive. 5 megabytes across 50 24-inch platters. Weighed over a ton.",
    color: "text-accent",
  },
  {
    year: "1980",
    event: "Seagate ST-506",
    detail: 'First 5.25" HDD for microcomputers. 5MB capacity. The birth of personal storage.',
    color: "text-cyan",
  },
  {
    year: "1992",
    event: '1.3" Kittyhawk',
    detail: "HP's micro drive for PDAs. 20MB in a package smaller than a matchbox.",
    color: "text-magenta",
  },
  {
    year: "2007",
    event: "1 Terabyte",
    detail: "Hitachi ships first 1TB desktop drive. A million megabytes in 3.5 inches of aluminum.",
    color: "text-yellow",
  },
  {
    year: "2026",
    event: "30+ Terabytes",
    detail:
      "HAMR technology. Heat-assisted magnetic recording pushes density to 6Tb per square inch.",
    color: "text-accent",
  },
];

export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Animate each timeline entry
      const entries = sectionRef.current.querySelectorAll("[data-timeline-entry]");
      for (const entry of entries) {
        gsap.fromTo(
          entry,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: entry,
              start: "top 80%",
            },
          },
        );
      }

      // Animate the vertical timeline line
      const line = sectionRef.current.querySelector("[data-timeline-line]");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-20 text-center">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.5em] text-accent">
            Storage Evolution
          </p>
          <h2 className="text-5xl font-black uppercase tracking-tighter md:text-7xl">
            70 Years of
            <br />
            <span className="text-accent">Spinning Rust</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            data-timeline-line
            className="absolute left-8 top-0 bottom-0 w-px bg-accent/30 origin-top md:left-1/2"
          />

          <div className="space-y-16">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                data-timeline-entry
                className={`relative flex items-start gap-8 md:gap-16 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Dot on timeline */}
                <div className="absolute left-8 top-2 z-10 -translate-x-1/2 md:left-1/2">
                  <motion.div
                    className="h-3 w-3 rounded-full bg-accent"
                    whileInView={{ scale: [0, 1.5, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>

                {/* Content */}
                <div className={`ml-16 flex-1 md:ml-0 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <span className={`font-mono text-5xl font-black ${item.color} md:text-6xl`}>
                    {item.year}
                  </span>
                  <h3 className="mt-2 text-xl font-bold uppercase tracking-wider">
                    <TextScramble
                      text={item.event}
                      scrambleSpeed={25}
                      revealDelay={200 + i * 100}
                    />
                  </h3>
                  <p className="mt-2 max-w-sm font-mono text-xs leading-relaxed text-muted">
                    {item.detail}
                  </p>
                </div>

                {/* Spacer for other side */}
                <div className="hidden flex-1 md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
