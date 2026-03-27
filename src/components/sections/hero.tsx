"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { SplitText } from "@/components/motion/split-text";
import { TextScramble } from "@/components/motion/text-scramble";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section ref={sectionRef} className="relative h-[150vh]">
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="sticky top-0 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      >
        {/* Animated gradient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -40, 20, 0],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[120px]"
          />
          <motion.div
            animate={{
              x: [0, -40, 30, 0],
              y: [0, 20, -30, 0],
            }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 25, ease: "linear" }}
            className="absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-500/8 blur-[100px]"
          />
        </div>

        <div className="relative z-10 text-center">
          {/* Scramble tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="mb-8"
          >
            <TextScramble
              text="DESIGN & MOTION STUDIO"
              className="text-xs tracking-[0.5em] text-muted"
              scrambleSpeed={25}
              revealDelay={600}
            />
          </motion.div>

          {/* Split text heading — the hero moment */}
          <h1 className="max-w-5xl text-7xl font-bold leading-[1.05] tracking-tight md:text-[8rem]">
            <SplitText
              text="Crafting"
              delay={0.3}
              animation="rise"
              charClassName="will-change-transform"
            />
            <br />
            <SplitText
              text="Digital"
              delay={0.5}
              animation="rise"
              charClassName="will-change-transform text-accent"
            />
            <br />
            <SplitText
              text="Experiences"
              delay={0.7}
              animation="rise"
              charClassName="will-change-transform"
            />
          </h1>

          {/* Subtitle with blur-in */}
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mx-auto mt-8 max-w-md text-lg text-muted"
          >
            High-end web design powered by Next.js, GSAP, and Motion.
          </motion.p>

          {/* Magnetic buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
          >
            <MagneticButton className="bg-accent/10 border-accent/30 hover:bg-accent/20">
              View Work
            </MagneticButton>
            <MagneticButton>About Studio</MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="absolute bottom-12 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted/50">Scroll</span>
          <motion.div
            className="h-12 w-px bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
