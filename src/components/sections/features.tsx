"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

const features = [
  {
    title: "Motion First",
    description:
      "Every interaction is designed with animation at its core. GSAP and Motion power scroll-driven narratives and fluid transitions.",
  },
  {
    title: "Design Systems",
    description:
      "Built on shadcn/ui and Tailwind CSS v4 for rapid iteration with full creative control. No design compromises.",
  },
  {
    title: "Performance",
    description:
      "Server Components, Turbopack, and optimized asset delivery. 60fps on desktop, smooth on mobile.",
  },
];

export function Features() {
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal className="mb-20 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-muted mb-4">Capabilities</p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Built for the Future</h2>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.15} className="group">
              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8 transition-colors hover:border-white/10 hover:bg-white/[0.04]">
                <div className="mb-4 h-1 w-8 rounded-full bg-accent transition-all group-hover:w-12" />
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
