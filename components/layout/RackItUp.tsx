"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function RackItUp() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const [ecgCompleted, setEcgCompleted] = useState(false);
  const [flashLime, setFlashLime] = useState(false);

  // When section goes out of view, reset ECG states so animation replays when scrolled back
  useEffect(() => {
    if (!isInView) {
      setEcgCompleted(false);
      setFlashLime(false);
    }
  }, [isInView]);

  const handleEcgComplete = () => {
    setEcgCompleted(true);
    setFlashLime(true);
    // Flash lime once for 750ms
    const timer = setTimeout(() => {
      setFlashLime(false);
    }, 750);
    return () => clearTimeout(timer);
  };

  const letters = ["G", "Y", "M"];

  return (
    <div
      ref={containerRef}
      className="relative w-full border-b border-[rgba(237,235,228,0.08)] pb-10 sm:pb-14 mb-14 overflow-hidden select-none"
    >
      {/* Background industrial grid accent */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #EDEBE4 1px, transparent 1px), linear-gradient(to bottom, #EDEBE4 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* The Oversized GYM Wordmark with Racking Animation */}
      <div className="relative py-2 sm:py-4 overflow-hidden">
        <div className="flex items-center justify-between w-full font-display font-black text-[clamp(6rem,24vw,22rem)] leading-[0.78] tracking-[-0.04em] text-[#EDEBE4] select-none">
          {letters.map((char, index) => (
            <div
              key={char}
              className="relative overflow-hidden inline-flex items-center justify-center flex-1"
            >
              <motion.span
                initial={{ y: "115%", opacity: 0 }}
                animate={
                  isInView
                    ? {
                        y: "0%",
                        opacity: 1,
                      }
                    : {
                        y: "115%",
                        opacity: 0,
                      }
                }
                transition={{
                  delay: index * 0.1, // Stagger 0.1s
                  duration: 0.72,
                  // Custom cubic bezier with small overshoot like heavy iron racking onto steel J-hooks
                  ease: [0.34, 1.38, 0.64, 1],
                }}
                className="inline-block transition-colors duration-300 hover:text-[#D4FF3F] cursor-default"
              >
                {char}
              </motion.span>
            </div>
          ))}
        </div>
      </div>

      {/* ECG Cardiac Line Animation */}
      <div className="relative w-full mt-2 sm:mt-4">
        {/* Full-width SVG ECG Line */}
        <div className="relative w-full h-12 sm:h-16 flex items-center overflow-visible">
          {/* Subtle baseline track line */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] bg-[rgba(237,235,228,0.06)]" />

          {/* Flash glow overlay when ECG completes */}
          <motion.div
            animate={
              flashLime
                ? {
                    opacity: [0, 0.45, 0],
                    scale: [0.98, 1.02, 1],
                  }
                : { opacity: 0 }
            }
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#D4FF3F]/20 to-[#D4FF3F]/40 blur-md rounded-[2px]"
          />

          <svg
            viewBox="0 0 1200 60"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full relative z-10 overflow-visible"
          >
            {/* Background blurred glow path */}
            <motion.path
              d="M 0 30 L 160 30 Q 180 20, 200 30 L 220 30 L 235 38 L 255 4 L 275 56 Q 305 18, 335 30 L 520 30 Q 540 22, 560 30 L 580 30 L 595 38 L 615 6 L 635 54 Q 665 18, 695 30 L 880 30 Q 900 22, 920 30 L 940 30 L 955 38 L 975 2 L 995 58 Q 1025 16, 1055 30 L 1200 30"
              stroke="#D4FF3F"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isInView
                  ? {
                      pathLength: 1,
                      opacity: flashLime ? 0.8 : 0.25,
                    }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{
                delay: 0.45, // Starts right after letters rack up
                duration: 1.35,
                ease: "easeInOut",
              }}
              className="blur-[2px]"
            />

            {/* Crisp foreground ECG lime path */}
            <motion.path
              d="M 0 30 L 160 30 Q 180 20, 200 30 L 220 30 L 235 38 L 255 4 L 275 56 Q 305 18, 335 30 L 520 30 Q 540 22, 560 30 L 580 30 L 595 38 L 615 6 L 635 54 Q 665 18, 695 30 L 880 30 Q 900 22, 920 30 L 940 30 L 955 38 L 975 2 L 995 58 Q 1025 16, 1055 30 L 1200 30"
              stroke="#D4FF3F"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={
                isInView
                  ? {
                      pathLength: 1,
                    }
                  : { pathLength: 0 }
              }
              transition={{
                delay: 0.45,
                duration: 1.35,
                ease: "easeInOut",
              }}
              onAnimationComplete={handleEcgComplete}
            />
          </svg>

          {/* End Pulse Terminal Node: Flashes Lime Once */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
            {/* The single lime flash shockwave ring */}
            <motion.div
              animate={
                flashLime
                  ? {
                      scale: [1, 3.2, 3.8],
                      opacity: [0, 1, 0],
                    }
                  : { scale: 1, opacity: 0 }
              }
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              className="absolute w-6 h-6 rounded-full border-2 border-[#D4FF3F] bg-[#D4FF3F]/30 pointer-events-none"
            />

            {/* Glowing core pulse blip */}
            <motion.div
              animate={
                flashLime
                  ? {
                      scale: [1, 2, 1],
                      boxShadow: [
                        "0 0 0px #D4FF3F",
                        "0 0 25px #D4FF3F, 0 0 45px #D4FF3F",
                        "0 0 8px #D4FF3F",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 0.65 }}
              className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                ecgCompleted
                  ? "bg-[#D4FF3F] border-[#EDEBE4] shadow-[0_0_12px_rgba(212,255,63,0.8)]"
                  : "bg-[#17181B] border-[#D4FF3F]"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
