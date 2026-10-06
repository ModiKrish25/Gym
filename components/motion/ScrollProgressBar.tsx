"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate plate rolling rotation (in degrees) as scroll progresses
  const plateRotation = useTransform(smoothProgress, [0, 1], [0, 1440]);
  const plateLeft = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  if (!mounted) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-7 z-[99] pointer-events-none select-none overflow-visible"
      aria-hidden="true"
    >
      {/* Barbell sleeve track */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[2px] bg-[#17181B] border-b border-[rgba(237,235,228,0.08)]" />

      {/* Loaded Barbell Progress Fill (Volt) */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-0 h-[2.5px] bg-[#D4FF3F] origin-left shadow-[0_0_10px_rgba(212,255,63,0.8)]"
        style={{ width: plateLeft }}
      />

      {/* Rolling Olympic Plate */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center"
        style={{ left: plateLeft }}
      >
        <motion.div
          style={{ rotate: plateRotation }}
          className="w-5 h-5 rounded-full bg-[#17181B] border-2 border-[#D4FF3F] shadow-[0_0_12px_rgba(212,255,63,0.6)] flex items-center justify-center relative"
        >
          {/* Inner ring */}
          <div className="w-2.5 h-2.5 rounded-full border border-[rgba(237,235,228,0.4)] flex items-center justify-center">
            {/* Center collar hole */}
            <div className="w-1 h-1 rounded-full bg-[#D4FF3F]" />
          </div>

          {/* Radial knurl notches that demonstrate rolling */}
          <span className="absolute top-0 w-[1.5px] h-1 bg-[#D4FF3F]" />
          <span className="absolute bottom-0 w-[1.5px] h-1 bg-[#D4FF3F]" />
          <span className="absolute left-0 h-[1.5px] w-1 bg-[#D4FF3F]" />
          <span className="absolute right-0 h-[1.5px] w-1 bg-[#D4FF3F]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
