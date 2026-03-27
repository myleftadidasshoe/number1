"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const BOOT_LINES = [
  { text: "BIOS v4.2.1 — NEO-TOKYO SYSTEMS", delay: 0 },
  { text: "Detecting hardware...", delay: 200 },
  { text: "  > HDD: Seagate Barracuda ST1000DM010 [1TB]", delay: 500 },
  { text: "  > RPM: 7200 .............. [OK]", delay: 800 },
  { text: "  > HEADS: 4 ............... [OK]", delay: 1000 },
  { text: "  > SECTORS: 1,953,525,168 . [OK]", delay: 1200 },
  { text: "  > S.M.A.R.T. STATUS: HEALTHY", delay: 1400 },
  { text: "Loading kernel...", delay: 1800 },
  { text: "  > AKIRA_PROTOCOL v1.0", delay: 2100 },
  { text: "  > KANEDA.SYS initialized", delay: 2400 },
  { text: "  > GPU: WebGL 2.0 context acquired", delay: 2600 },
  { text: "", delay: 2800 },
  { text: "████████████████████████████ 100%", delay: 2800 },
  { text: "", delay: 3200 },
  { text: "SYSTEM READY. WELCOME.", delay: 3400 },
];

export function TerminalBoot({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    for (let i = 0; i < BOOT_LINES.length; i++) {
      timeouts.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
        }, BOOT_LINES[i].delay),
      );
    }

    // Auto-dismiss after boot sequence
    timeouts.push(
      setTimeout(() => {
        setDismissed(true);
        setTimeout(onComplete, 600);
      }, 4200),
    );

    return () => {
      for (const t of timeouts) clearTimeout(t);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0a0a0f]"
          onClick={() => {
            setDismissed(true);
            setTimeout(onComplete, 100);
          }}
        >
          {/* Scan lines on boot screen */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,23,68,0.1) 2px, rgba(255,23,68,0.1) 4px)",
            }}
          />

          <div className="w-full max-w-2xl px-8">
            {/* Terminal header */}
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent/50">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              <span>BARE_METAL.terminal</span>
            </div>

            {/* Boot lines */}
            <div className="font-mono text-xs leading-relaxed text-foreground/80">
              {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={line.text + String(i)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                  className={
                    line.text.includes("[OK]")
                      ? "text-cyan"
                      : line.text.includes("READY")
                        ? "text-accent font-bold"
                        : line.text.includes("████")
                          ? "text-accent"
                          : ""
                  }
                >
                  {line.text || "\u00A0"}
                </motion.div>
              ))}

              {/* Blinking cursor */}
              {visibleLines < BOOT_LINES.length && (
                <span
                  className="inline-block h-3 w-2 bg-accent"
                  style={{ animation: "pulse-glow 0.8s infinite" }}
                />
              )}
            </div>

            {/* Skip hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 1 }}
              className="mt-8 font-mono text-[10px] uppercase tracking-widest text-muted"
            >
              Click anywhere to skip
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
