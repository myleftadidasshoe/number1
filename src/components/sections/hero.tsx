"use client";

import { motion, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { SplitText } from "@/components/motion/split-text";
import { TextScramble } from "@/components/motion/text-scramble";

const HDDScene = dynamic(() => import("@/components/three/hdd-scene").then((m) => m.HDDScene), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-transparent" />,
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -150]);

  return (
    <section ref={sectionRef} className="relative h-[160vh]">
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="sticky top-0 flex min-h-screen flex-col items-center justify-center overflow-hidden"
      >
        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,23,68,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,23,68,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Red glow behind 3D scene */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[150px]" />
        <div className="pointer-events-none absolute left-1/3 top-1/3 h-[300px] w-[300px] rounded-full bg-cyan/5 blur-[120px]" />

        {/* 3D HDD Scene */}
        <div className="absolute inset-0 z-0">
          <HDDScene />
        </div>

        {/* Content overlay */}
        <div className="relative z-10 text-center">
          {/* Top tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-block border border-accent/30 bg-accent/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
              <TextScramble text="NEO-TOKYO // 2026" scrambleSpeed={20} revealDelay={400} />
            </span>
          </motion.div>

          {/* Main heading */}
          <h1 className="text-7xl font-black uppercase leading-[0.9] tracking-tighter md:text-[10rem]">
            <SplitText
              text="BARE"
              delay={0.2}
              animation="rise"
              charClassName="will-change-transform"
            />
            <br />
            <SplitText
              text="METAL"
              delay={0.4}
              animation="rise"
              charClassName="will-change-transform text-accent"
            />
          </h1>

          {/* Subtitle with glitch feel */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mx-auto mt-6 max-w-sm font-mono text-sm uppercase tracking-widest text-muted"
          >
            Hardware visualization / Cyberpunk aesthetic
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="mt-10 flex items-center justify-center gap-6"
          >
            <button
              type="button"
              className="group relative overflow-hidden border border-accent bg-accent/10 px-8 py-3 font-mono text-xs uppercase tracking-[0.3em] text-accent transition-colors hover:bg-accent hover:text-white"
            >
              <span className="relative z-10">Explore</span>
            </button>
            <button
              type="button"
              className="border border-white/10 px-8 py-3 font-mono text-xs uppercase tracking-[0.3em] text-muted transition-colors hover:border-cyan hover:text-cyan"
            >
              Specs
            </button>
          </motion.div>
        </div>

        {/* Bottom HUD elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-8 font-mono text-[10px] uppercase tracking-widest text-muted/40"
        >
          <div>SYS.STATUS: ONLINE</div>
          <div className="mt-1 text-accent/40">
            SCROLL <span style={{ animation: "pulse-glow 2s infinite" }}>&#9660;</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 right-8 font-mono text-[10px] uppercase tracking-widest text-muted/40 text-right"
        >
          <div>SECTOR: 0x7F</div>
          <div className="mt-1">RPM: 7200</div>
        </motion.div>

        {/* Decorative corner brackets */}
        <div className="pointer-events-none absolute left-6 top-6 h-12 w-12 border-l border-t border-accent/20" />
        <div className="pointer-events-none absolute right-6 top-6 h-12 w-12 border-r border-t border-cyan/20" />
        <div className="pointer-events-none absolute bottom-6 left-6 h-12 w-12 border-b border-l border-accent/20" />
        <div className="pointer-events-none absolute bottom-6 right-6 h-12 w-12 border-b border-r border-cyan/20" />
      </motion.div>
    </section>
  );
}
