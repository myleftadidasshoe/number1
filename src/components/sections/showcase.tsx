"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headingRef.current || !progressRef.current || !cardsRef.current) return;

      // Horizontal progress bar tied to scroll
      gsap.to(progressRef.current, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      // Staggered card entrance
      const cards = cardsRef.current.querySelectorAll("[data-card]");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 80, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 75%",
          },
        },
      );

      // Heading parallax
      gsap.to(headingRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  const projects = [
    {
      title: "Project Alpha",
      category: "Web Design",
      color: "from-indigo-500/20 to-purple-500/20",
    },
    {
      title: "Project Beta",
      category: "Motion Graphics",
      color: "from-emerald-500/20 to-teal-500/20",
    },
    {
      title: "Project Gamma",
      category: "3D Experience",
      color: "from-amber-500/20 to-orange-500/20",
    },
    {
      title: "Project Delta",
      category: "Brand Identity",
      color: "from-rose-500/20 to-pink-500/20",
    },
  ];

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <h2 ref={headingRef} className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Selected Work
        </h2>

        {/* Scroll progress bar */}
        <div className="mb-16 h-px bg-white/10">
          <div ref={progressRef} className="h-full w-0 bg-accent" />
        </div>

        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2" style={{ perspective: "1000px" }}>
          {projects.map((project) => (
            <div
              key={project.title}
              data-card
              className="group cursor-pointer overflow-hidden rounded-xl border border-white/5"
            >
              <div
                className={`aspect-[4/3] bg-gradient-to-br ${project.color} flex items-end p-8 transition-transform duration-500 group-hover:scale-[1.02]`}
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted mb-2">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
