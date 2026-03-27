"use client";

import { useCallback, useState } from "react";
import { FlashBang } from "@/components/motion/flash-bang";
import { TerminalBoot } from "@/components/motion/terminal-boot";

export function BootWrapper({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  const handleBootComplete = useCallback(() => {
    setShowFlash(true);
    setBooted(true);
  }, []);

  return (
    <>
      {!booted && <TerminalBoot onComplete={handleBootComplete} />}
      <FlashBang show={showFlash} />
      <div style={{ opacity: booted ? 1 : 0, transition: "opacity 0.3s ease" }}>{children}</div>
    </>
  );
}
