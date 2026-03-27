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
  const messageRef = useRef<HTMLParagraphElement>(null);
  const [isReady, setIsReady] = useState(false);

  const messages = [
    "Scanning platter surface...",
    "Attempting sector recovery...",
    "Head recalibration in progress...",
    "Data fragments detected...",
    "Reconstructing file table...",
    "Warning: magnetic degradation...",
    "Recovery rate declining...",
    "Signal integrity: poor...",
    "Multiple read failures...",
    "Drive temperature critical...",
    "Final sectors unreachable.",
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleReady = () => {
      video.currentTime = 0;
      setIsReady(true);
    };

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
            if (messageRef.current) {
              const idx = Math.min(
                Math.floor(self.progress * messages.length),
                messages.length - 1,
              );
              messageRef.current.textContent = messages[idx];
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
          style={{ opacity: isReady ? 0.3 : 0, filter: "saturate(0.3) contrast(1.2)" }}
        >
          <source
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
            type="video/webm"
          />
        </video>

        {/* Heavy dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/70 to-[#0a0a0f]/90" />
        <div className="absolute inset-0 bg-accent/[0.04]" />

        {/* Content */}
        <div className="relative z-10 px-6 text-center">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.5em] text-accent">
            Recovery Mode
          </p>
          <h2 className="text-5xl font-black uppercase tracking-tighter md:text-8xl">
            Last
            <br />
            <span className="text-accent">read</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md font-mono text-xs leading-relaxed text-muted">
            The heads sweep across the platter one final time, trying to recover what they can.
            Every frame you scroll through is a sector being scanned. Most are already gone.
          </p>

          {/* Dynamic status message */}
          <p
            ref={messageRef}
            className="mt-6 font-mono text-[10px] uppercase tracking-widest text-accent/60"
          >
            Initializing scan...
          </p>
        </div>

        {/* HUD */}
        <div className="absolute top-8 left-8 font-mono text-[10px] uppercase tracking-widest text-muted/30">
          <div>
            SECTOR: <span ref={sectorRef}>0x0000</span>
          </div>
          <div className="mt-1">MODE: RECOVERY SCAN</div>
        </div>

        <div className="absolute top-8 right-8 text-right font-mono text-[10px] uppercase tracking-widest text-muted/30">
          <div>
            SCANNED: <span ref={timeRef}>0%</span>
          </div>
          <div className="mt-1">RECOVERED: 12.3%</div>
        </div>

        {/* Corner brackets */}
        <div className="pointer-events-none absolute left-6 top-6 h-8 w-8 border-l border-t border-accent/20" />
        <div className="pointer-events-none absolute right-6 top-6 h-8 w-8 border-r border-t border-accent/20" />
        <div className="pointer-events-none absolute bottom-6 left-6 h-8 w-8 border-b border-l border-accent/20" />
        <div className="pointer-events-none absolute bottom-6 right-6 h-8 w-8 border-b border-r border-accent/20" />

        {/* Progress bar */}
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
