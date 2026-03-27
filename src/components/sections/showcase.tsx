"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { RevealImage } from "@/components/motion/reveal-image";
import { TextScramble } from "@/components/motion/text-scramble";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Project Alpha",
    category: "Web Design",
    color: "from-indigo-600/30 via-indigo-500/10 to-violet-600/30",
    year: "2026",
  },
  {
    title: "Project Beta",
    category: "Motion Graphics",
    color: "from-emerald-600/30 via-emerald-500/10 to-teal-600/30",
    year: "2025",
  },
  {
    title: "Project Gamma",
    category: "3D Experience",
    color: "from-amber-600/30 via-amber-500/10 to-orange-600/30",
    year: "2025",
  },
  {
    title: "Project Delta",
    category: "Brand Identity",
    color: "from-rose-600/30 via-rose-500/10 to-pink-600/30",
    year: "2024",
  },
];

export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!counterRef.current) return;

      // Animate the counter from 00 to 04
      const obj = { val: 0 };
      gsap.to(obj, {
        val: projects.length,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.floor(obj.val)).padStart(2, "0");
          }
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="py-40 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Section header with counter */}
        <div className="mb-20 flex items-end justify-between border-b border-white/10 pb-8">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-muted">Selected Work</p>
            <h2 className="text-5xl font-bold tracking-tight md:text-7xl">Projects</h2>
          </div>
          <div className="text-right">
            <span ref={counterRef} className="font-mono text-6xl font-bold text-accent md:text-8xl">
              00
            </span>
          </div>
        </div>

        {/* Project cards with reveal wipes */}
        <div className="space-y-24">
          {projects.map((project, i) => (
            <div key={project.title} className="group grid gap-8 md:grid-cols-2 md:items-center">
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <RevealImage direction={i % 2 === 0 ? "left" : "right"} className="rounded-2xl">
                  <div
                    className={`aspect-[16/10] bg-gradient-to-br ${project.color} flex items-end p-10`}
                  >
                    <div className="h-20 w-20 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm" />
                  </div>
                </RevealImage>
              </div>
              <div className={i % 2 === 1 ? "md:order-1 md:text-right" : ""}>
                <p className="mb-2 font-mono text-xs text-muted">{project.year}</p>
                <p className="mb-1 text-xs uppercase tracking-[0.3em] text-accent">
                  {project.category}
                </p>
                <h3 className="text-4xl font-bold tracking-tight md:text-5xl">
                  <TextScramble
                    text={project.title}
                    scrambleSpeed={20}
                    revealDelay={300 + i * 200}
                  />
                </h3>
                <div
                  className={`mt-6 h-px bg-white/10 transition-all duration-700 group-hover:bg-accent/50 ${i % 2 === 1 ? "ml-auto" : ""}`}
                  style={{ width: "60%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
