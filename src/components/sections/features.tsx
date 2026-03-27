"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { TextScramble } from "@/components/motion/text-scramble";

gsap.registerPlugin(ScrollTrigger);

const vitals = [
  { label: "POWER-ON HOURS", value: "87,432", status: "CRITICAL", color: "text-accent" },
  { label: "REALLOCATED SECTORS", value: "2,847", status: "FAILING", color: "text-accent" },
  { label: "TEMPERATURE", value: "58°C", status: "WARNING", color: "text-yellow" },
  { label: "SPIN RETRY COUNT", value: "142", status: "DEGRADED", color: "text-magenta" },
  { label: "READ ERROR RATE", value: "0.03%", status: "NOMINAL", color: "text-cyan" },
  { label: "REMAINING LIFE", value: "3%", status: "CRITICAL", color: "text-accent" },
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const cards = sectionRef.current.querySelectorAll("[data-vital]");
      gsap.fromTo(
        cards,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

      // Flicker the critical indicators
      const criticals = sectionRef.current.querySelectorAll("[data-critical]");
      for (const el of criticals) {
        gsap.to(el, {
          opacity: 0.3,
          duration: 0.1,
          repeat: -1,
          yoyo: true,
          ease: "steps(1)",
          delay: Math.random() * 2,
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        {/* Narrative text */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.5em] text-accent">
            S.M.A.R.T. Diagnostic
          </p>
          <h2 className="text-4xl font-black uppercase tracking-tighter md:text-6xl">
            Something is
            <br />
            <span className="text-accent">wrong.</span>
          </h2>
          <p className="mt-4 font-mono text-xs leading-relaxed text-muted">
            87,432 hours of continuous operation. 10 years of spinning at 7,200 revolutions per
            minute. The bearings are wearing. The heads are drifting. Sectors are failing faster
            than they can be remapped. This drive is dying, and it knows it.
          </p>
        </div>

        {/* Vital signs grid */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {vitals.map((vital) => (
            <div
              key={vital.label}
              data-vital
              className="group border-l-2 border-l-accent/30 bg-white/[0.02] px-6 py-5"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted">
                  {vital.label}
                </p>
                <span
                  data-critical={vital.status === "CRITICAL" ? "" : undefined}
                  className={`font-mono text-[9px] uppercase tracking-wider ${vital.color}`}
                >
                  [{vital.status}]
                </span>
              </div>
              <div className="mt-2">
                <span className={`font-mono text-3xl font-bold ${vital.color}`}>
                  <TextScramble text={vital.value} scrambleSpeed={30} revealDelay={500} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Ominous log entries */}
        <div className="mt-12 border-t border-white/5 pt-6">
          <div className="font-mono text-[9px] leading-relaxed text-muted/40 space-y-1">
            <p>[87431:22:14] Sector 0x7A2F reallocated successfully</p>
            <p>[87431:22:14] Sector 0x7A30 reallocated successfully</p>
            <p>[87431:22:15] Sector 0x7A31 reallocation FAILED</p>
            <p className="text-accent/60">
              [87431:22:15] WARNING: Pending sector count exceeded threshold
            </p>
            <p className="text-accent/60">
              [87432:01:03] WARNING: Head 2 calibration drift detected
            </p>
            <p className="text-yellow/60">[87432:04:17] NOTICE: Spin-up time increased by 340ms</p>
            <p className="text-accent">
              [87432:06:41] CRITICAL: Uncorrectable read error at LBA 0xDEADBEEF
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
