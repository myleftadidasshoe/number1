"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function VideoScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!videoRef.current || !sectionRef.current) return;

      const video = videoRef.current;

      // Wait for video metadata to load
      const setup = () => {
        // Scrub video playback to scroll position
        gsap.to(video, {
          currentTime: video.duration || 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
              if (timeRef.current) {
                const pct = Math.round(self.progress * 100);
                timeRef.current.textContent = `${pct}%`;
              }
            },
          },
        });
      };

      if (video.readyState >= 1) {
        setup();
      } else {
        video.addEventListener("loadedmetadata", setup, { once: true });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Video element — using a generated gradient animation as placeholder */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        >
          {/* Replace with your actual video source */}
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
            type="video/webm"
          />
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/80" />

        {/* Content overlay */}
        <div className="relative z-10 px-6 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.5em] text-muted">Scroll to Play</p>
          <h2 className="text-5xl font-bold tracking-tight md:text-7xl">
            Motion Tells
            <br />
            <span className="text-accent">the Story</span>
          </h2>
        </div>

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 pb-8">
            <div className="flex-1 h-px bg-white/10 overflow-hidden">
              <div
                ref={progressRef}
                className="h-full w-full bg-accent origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <span ref={timeRef} className="font-mono text-xs text-muted w-8 text-right">
              0%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
