"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.15)_0%,_transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4 text-sm uppercase tracking-[0.3em] text-muted"
        >
          Design & Motion Studio
        </motion.p>

        <h1 className="max-w-4xl text-6xl font-bold leading-[1.1] tracking-tight md:text-8xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="block"
          >
            Crafting Digital
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="block text-accent"
          >
            Experiences
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mx-auto mt-6 max-w-lg text-lg text-muted"
        >
          High-end web design and motion graphics powered by Next.js, GSAP, and Motion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-10 flex gap-4 justify-center"
        >
          <Button size="lg">View Work</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
          className="h-10 w-6 rounded-full border border-white/20 flex items-start justify-center p-1.5"
        >
          <motion.div className="h-2 w-1 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
