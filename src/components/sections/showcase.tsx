"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const memories = [
  {
    sector: "0x0001",
    content:
      "First boot. A child's hands lifting the case lid. The hum of power. Everything is new.",
    status: "INTACT",
    color: "text-cyan",
  },
  {
    sector: "0x1A3F",
    content:
      "Family photos. Birthdays. A dog named Pixel. 47,000 JPEG files, each one a moment someone wanted to keep.",
    status: "INTACT",
    color: "text-cyan",
  },
  {
    sector: "0x3B72",
    content:
      "Late nights. Music folders. Half-finished novels. Browser history that tells a coming-of-age story.",
    status: "DEGRADED",
    color: "text-yellow",
  },
  {
    sector: "0x5E91",
    content:
      "The college years. Research papers. Code repositories. A thesis titled 'On the Permanence of Digital Memory.'",
    status: "CORRUPTED",
    color: "text-magenta",
  },
  {
    sector: "0x7A2F",
    content:
      "Wedding photos. Scanned letters from a grandmother. A video of a first dance. The head scrapes trying to read this sector.",
    status: "FAILING",
    color: "text-accent",
  },
  {
    sector: "0xDEAD",
    content: "B̸̧̛̹r̷̨o̵k̸̻ë̶̝n̸.̵ ̷T̴h̵e̷ ̸d̸a̵t̷a̵ ̷w̴a̷s̴ ̴h̵e̷r̴e̴ ̶b̸u̷t̸ ̵n̷o̷w̶ ̸i̸t̴'̶s̸ ̷j̷u̸s̸t̷ ̴n̸o̷i̵s̴e̷.̶",
    status: "UNRECOVERABLE",
    color: "text-accent",
  },
];

export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const entries = sectionRef.current.querySelectorAll("[data-memory]");
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

      // The timeline line grows
      const line = sectionRef.current.querySelector("[data-mem-line]");
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

      // Color shift on the line — starts cyan, ends red
      if (line) {
        gsap.fromTo(
          line,
          { background: "rgba(0, 229, 255, 0.3)" },
          {
            background: "rgba(255, 23, 68, 0.5)",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 40%",
              end: "bottom 80%",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative px-6 py-32">
      <div className="mx-auto max-w-3xl">
        {/* Section header */}
        <div className="mb-20">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.5em] text-cyan">
            Data Recovery Attempt
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter md:text-6xl">
            What lived
            <br />
            <span className="text-accent">on these platters</span>
          </h2>
          <p className="mt-4 font-mono text-xs leading-relaxed text-muted">
            A hard drive holds more than data. It holds the shape of a life. Every sector is a
            moment someone chose to save. And now the sectors are failing, one by one, taking those
            moments with them.
          </p>
        </div>

        {/* Memory sectors */}
        <div className="relative">
          <div data-mem-line className="absolute left-4 top-0 bottom-0 w-px origin-top md:left-8" />

          <div className="space-y-12">
            {memories.map((mem) => (
              <div key={mem.sector} data-memory className="relative pl-12 md:pl-20">
                {/* Dot on line */}
                <motion.div
                  className={`absolute left-4 top-1 z-10 -translate-x-1/2 md:left-8 h-2.5 w-2.5 rounded-full ${
                    mem.status === "UNRECOVERABLE" || mem.status === "FAILING"
                      ? "bg-accent"
                      : mem.status === "CORRUPTED"
                        ? "bg-magenta"
                        : mem.status === "DEGRADED"
                          ? "bg-yellow"
                          : "bg-cyan"
                  }`}
                  whileInView={{ scale: [0, 1.5, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                />

                {/* Sector label */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted/50">
                    Sector {mem.sector}
                  </span>
                  <span className={`font-mono text-[9px] uppercase tracking-wider ${mem.color}`}>
                    [{mem.status}]
                  </span>
                </div>

                {/* Memory content */}
                <p
                  className={`font-mono text-sm leading-relaxed ${
                    mem.status === "UNRECOVERABLE"
                      ? "text-accent/60"
                      : mem.status === "FAILING"
                        ? "text-foreground/50"
                        : mem.status === "CORRUPTED"
                          ? "text-foreground/60"
                          : "text-foreground/80"
                  }`}
                >
                  {mem.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
