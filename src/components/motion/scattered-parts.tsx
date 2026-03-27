"use client";

import { type MotionValue, motion, useScroll, useTransform } from "motion/react";

/**
 * Kowloon Walled City of dead technology.
 * Starts sparse, becomes oppressive and suffocating as you scroll.
 * ASCII hardware debris closes in from all sides.
 */

const DEBRIS = [
  // === LAYER 1: Distant, subtle — visible from start ===
  { art: "⊕", x: "5%", y: "3%", r: 0, s: 0.1 },
  { art: "⊕", x: "93%", y: "7%", r: 0, s: 0.12 },
  { art: "───┤SATA├───", x: "80%", y: "5%", r: -30, s: 0.15 },
  { art: "──╦╦╦──", x: "15%", y: "12%", r: 15, s: 0.1 },
  { art: "┃┃┃┃┃┃", x: "95%", y: "25%", r: 90, s: 0.08 },
  { art: "~~~~≈≈~~~~", x: "8%", y: "35%", r: -20, s: 0.13 },

  // === LAYER 2: Mid-depth debris ===
  {
    art: "╔══════╗\n║ VOID ║\n╚══════╝",
    x: "2%",
    y: "18%",
    r: -5,
    s: 0.2,
  },
  {
    art: "┌─┤IC├─┐\n│ ARM  │\n│ DEAD │\n└──────┘",
    x: "88%",
    y: "20%",
    r: 8,
    s: 0.25,
  },
  { art: "[■ ■ ■ ■]", x: "45%", y: "8%", r: 20, s: 0.18 },
  { art: ">>─┤PWR├──>>", x: "65%", y: "30%", r: -15, s: 0.22 },
  {
    art: "╭───╮\n│ ▓ │\n╰───╯",
    x: "20%",
    y: "45%",
    r: -12,
    s: 0.2,
  },
  { art: "◉────◉────◉", x: "72%", y: "48%", r: 30, s: 0.28 },
  {
    art: "┌┐┌┐┌┐\n└┘└┘└┘",
    x: "35%",
    y: "22%",
    r: 0,
    s: 0.15,
  },
  { art: "═══════════════", x: "50%", y: "55%", r: -60, s: 0.2 },

  // === LAYER 3: Closing in — larger, denser ===
  {
    art: "┌──────────────┐\n│ SEAGATE      │\n│ BARRACUDA    │\n│ ST1000DM010  │\n│ S/N: DEAD    │\n└──────────────┘",
    x: "3%",
    y: "55%",
    r: -3,
    s: 0.35,
  },
  {
    art: "╔═══════════╗\n║ SECTOR    ║\n║ CORRUPTED ║\n║ 0xDEAD    ║\n╚═══════════╝",
    x: "78%",
    y: "60%",
    r: 5,
    s: 0.4,
  },
  {
    art: "┌─────────────────┐\n│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │\n│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │\n│ █████  ┌──┐     │\n│ █████  │◉◉│     │\n│        └──┘     │\n│ ────────── ◉──  │\n└─────────────────┘",
    x: "25%",
    y: "65%",
    r: 2,
    s: 0.45,
  },
  {
    art: "╔══╗  ╔══╗  ╔══╗\n║▓▓║──║▓▓║──║▓▓║\n╚══╝  ╚══╝  ╚══╝",
    x: "55%",
    y: "70%",
    r: -8,
    s: 0.38,
  },
  {
    art: ">>──>>──>>──>>──>>",
    x: "10%",
    y: "75%",
    r: 0,
    s: 0.3,
  },
  {
    art: "┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃\n┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃\n┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃\n┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃",
    x: "90%",
    y: "42%",
    r: 0,
    s: 0.32,
  },

  // === LAYER 4: Oppressive — filling the screen ===
  {
    art: "ERROR ERROR ERROR ERROR\nERROR ERROR ERROR ERROR\nERROR ERROR ERROR ERROR",
    x: "30%",
    y: "80%",
    r: -2,
    s: 0.55,
  },
  {
    art: "╔══════════════════════╗\n║  UNRECOVERABLE READ  ║\n║  FAILURE AT LBA      ║\n║  0x00000000DEADBEEF   ║\n║                      ║\n║  [ABORT] [RETRY]     ║\n╚══════════════════════╝",
    x: "5%",
    y: "82%",
    r: 1,
    s: 0.6,
  },
  {
    art: "WARNING WARNING WARNING\n████████████████████████\nSECTOR REALLOCATED COUNT\nEXCEEDS THRESHOLD\n████████████████████████",
    x: "60%",
    y: "85%",
    r: -1,
    s: 0.55,
  },
  {
    art: "┌┤├┐┌┤├┐┌┤├┐┌┤├┐\n│  ││  ││  ││  │\n└──┘└──┘└──┘└──┘",
    x: "40%",
    y: "90%",
    r: 0,
    s: 0.5,
  },
  {
    art: "CLICK CLICK CLICK\nCLICK CLICK CLICK\nCLICK CLICK CLICK\nCLICK CLICK CLICK\nCLICK CLICK CLICK",
    x: "75%",
    y: "92%",
    r: 3,
    s: 0.65,
  },
  {
    art: "░░░░░░░░░░░░░░░░\n░░░░░░░░░░░░░░░░\n░░░░░░░░░░░░░░░░\n░░░░░░░░░░░░░░░░",
    x: "15%",
    y: "95%",
    r: 0,
    s: 0.7,
  },
  {
    art: "SMART FAILURE\nIMMINENT\nBACKUP AND\nREPLACE",
    x: "50%",
    y: "97%",
    r: -5,
    s: 0.75,
  },
];

export function ScatteredParts() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
      {DEBRIS.map((part, i) => (
        <DebrisPiece
          key={part.art.slice(0, 12) + String(i)}
          art={part.art}
          x={part.x}
          y={part.y}
          rotate={part.r}
          speed={part.s}
          scrollYProgress={scrollYProgress}
        />
      ))}

      {/* Vignette that darkens edges as you scroll deeper */}
      <VignetteOverlay scrollYProgress={scrollYProgress} />
    </div>
  );
}

function DebrisPiece({
  art,
  x,
  y,
  rotate,
  speed,
  scrollYProgress,
}: {
  art: string;
  x: string;
  y: string;
  rotate: number;
  speed: number;
  scrollYProgress: MotionValue<number>;
}) {
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -500 * speed]);
  const rotateVal = useTransform(scrollYProgress, [0, 1], [rotate, rotate + 60 * speed]);
  // Parts grow as you scroll — walls closing in
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.6, 1, 1.5 + speed, 2.5 + speed * 2],
  );
  // Opacity ramps aggressively
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 0.7, 1],
    [0.03, 0.06, 0.12, 0.25, 0.5 + speed * 0.3],
  );
  // Color shifts toward red as you go deeper
  const color =
    art.includes("ERROR") ||
    art.includes("FAILURE") ||
    art.includes("CLICK") ||
    art.includes("WARNING")
      ? "text-accent"
      : art.includes("SMART")
        ? "text-yellow"
        : speed > 0.4
          ? "text-accent"
          : speed > 0.25
            ? "text-cyan"
            : "text-muted";

  return (
    <motion.pre
      className={`absolute font-mono text-[8px] leading-tight ${color} select-none whitespace-pre`}
      style={{
        left: x,
        top: y,
        y: yOffset,
        rotate: rotateVal,
        scale,
        opacity,
      }}
    >
      {art}
    </motion.pre>
  );
}

/** Vignette overlay that gets more oppressive as you scroll */
function VignetteOverlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.15, 0.5]);

  return (
    <motion.div
      className="fixed inset-0 z-[6] pointer-events-none"
      style={{
        opacity: vignetteOpacity,
        background:
          "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,15,0.8) 70%, rgba(10,10,15,1) 100%)",
      }}
    />
  );
}
