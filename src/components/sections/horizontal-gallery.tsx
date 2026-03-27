"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const items = [
  { title: "Kinetic Typography", gradient: "from-violet-500/20 to-fuchsia-500/20" },
  { title: "3D Environments", gradient: "from-cyan-500/20 to-blue-500/20" },
  { title: "Scroll Narratives", gradient: "from-emerald-500/20 to-lime-500/20" },
  { title: "Brand Systems", gradient: "from-orange-500/20 to-red-500/20" },
  { title: "Motion Identity", gradient: "from-pink-500/20 to-rose-500/20" },
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
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate each card as it enters
      const cards = trackRef.current.querySelectorAll("[data-gallery-card]");
      for (const card of cards) {
        gsap.fromTo(
          card,
          { rotateY: -15, opacity: 0.3 },
          {
            rotateY: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById?.("hscroll") || undefined,
              start: "left 80%",
              end: "left 30%",
              scrub: true,
              horizontal: true,
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div ref={trackRef} className="flex gap-8 px-[10vw] py-20" style={{ perspective: "1200px" }}>
        {/* Section intro card */}
        <div className="flex h-[70vh] min-w-[40vw] flex-col justify-center pr-12">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-muted">Capabilities</p>
          <h2 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            What we
            <br />
            <span className="text-accent">build</span>
          </h2>
        </div>

        {/* Gallery cards */}
        {items.map((item) => (
          <div
            key={item.title}
            data-gallery-card
            className="group relative h-[70vh] min-w-[35vw] flex-shrink-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className={`h-full w-full rounded-2xl bg-gradient-to-br ${item.gradient} border border-white/5 p-10 flex flex-col justify-end transition-all duration-500 group-hover:border-white/15`}
            >
              <div className="h-px w-12 bg-white/30 mb-4 transition-all duration-500 group-hover:w-20 group-hover:bg-accent" />
              <h3 className="text-3xl font-bold">{item.title}</h3>
            </div>
          </div>
        ))}

        {/* End spacer */}
        <div className="min-w-[10vw] flex-shrink-0" />
      </div>
    </section>
  );
}
