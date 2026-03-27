"use client";

import { AnimatePresence, motion } from "motion/react";

/** Full-screen white flash that fades to reveal content */
export function FlashBang({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={() => {}}
          className="pointer-events-none fixed inset-0 z-[9999] bg-white"
        />
      )}
    </AnimatePresence>
  );
}
