"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export function VideoScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const sectorRef = useRef<HTMLSpanElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Ensure video is fully loaded before setting up scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => {
      // Force the browser to buffer the video
      video.currentTime = 0;
      setIsReady(true);
    };

    // canplaythrough = enough data buffered for uninterrupted playback
    if (video.readyState >= 4) {
      handleReady();
    } else {
      video.addEventListener("canplaythrough", handleReady, { once: true });
    }

    return () => {
      video.removeEventListener("canplaythrough", handleReady);
    };
  }, []);

  useGSAP(
    () => {
      if (!videoRef.current || !sectionRef.current || !isReady) return;

      const video = videoRef.current;
      const duration = video.duration;
      if (!duration || duration === 0) return;

      // Use a proxy object for smooth scrubbing
      const obj = { time: 0 };

      gsap.to(obj, {
        time: duration,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          onUpdate: (self) => {
            // Directly set currentTime for frame-accurate scrubbing
            video.currentTime = obj.time;

            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            if (timeRef.current) {
              timeRef.current.textContent = `${Math.round(self.progress * 100)}%`;
            }
            if (sectorRef.current) {
              const sector = Math.floor(self.progress * 65535);
              sectorRef.current.textContent = `0x${sector.toString(16).toUpperCase().padStart(4, "0")}`;
            }
          },
        },
      });
    },
    { scope: sectionRef, dependencies: [isReady] },
  );

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: isReady ? 0.5 : 0 }}
        >
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
            type="video/webm"
          />
        </video>

        {/* Dark overlay with red tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-[#0a0a0f]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-accent/[0.03]" />

        {/* Content */}
        <div className="relative z-10 px-6 text-center">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.5em] text-accent">
            Scroll to Seek
          </p>
          <h2 className="text-5xl font-black uppercase tracking-tighter md:text-8xl">
            Data in
            <br />
            <span className="text-accent">Motion</span>
          </h2>
          <p className="mx-auto mt-4 max-w-sm font-mono text-xs leading-relaxed text-muted">
            Every byte finds its track. Every sector tells a story.
          </p>
        </div>

        {/* HUD overlay elements */}
        <div className="absolute top-8 left-8 font-mono text-[10px] uppercase tracking-widest text-muted/30">
          <div>
            SECTOR: <span ref={sectorRef}>0x0000</span>
          </div>
          <div className="mt-1">MODE: SEQUENTIAL READ</div>
        </div>

        <div className="absolute top-8 right-8 text-right font-mono text-[10px] uppercase tracking-widest text-muted/30">
          <div>
            PROGRESS: <span ref={timeRef}>0%</span>
          </div>
          <div className="mt-1">TRANSFER: ACTIVE</div>
        </div>

        {/* Corner brackets */}
        <div className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l border-t border-accent/20" />
        <div className="pointer-events-none absolute right-6 top-6 h-8 w-8 border-r border-t border-accent/20" />
        <div className="pointer-events-none absolute bottom-6 left-6 h-8 w-8 border-b border-l border-accent/20" />
        <div className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b border-r border-accent/20" />

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="h-[2px] w-full bg-white/5">
            <div
              ref={progressRef}
              className="h-full w-full bg-accent origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
