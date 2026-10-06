"use client";

import { motion } from "framer-motion";
import { MARQUEE_ITEMS } from "@/data/content";

function DumbbellIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 mx-4 sm:mx-6 md:mx-8 text-current"
      aria-hidden="true"
    >
      <rect x="2" y="6.5" width="3" height="11" rx="1" fill="currentColor" />
      <rect x="5" y="8" width="2" height="8" fill="currentColor" />
      <rect x="7" y="10.75" width="10" height="2.5" rx="0.5" fill="currentColor" />
      <rect x="17" y="8" width="2" height="8" fill="currentColor" />
      <rect x="19" y="6.5" width="3" height="11" rx="1" fill="currentColor" />
    </svg>
  );
}

function PlateIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 mx-4 sm:mx-6 md:mx-8 text-current"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

function KettlebellIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0 mx-4 sm:mx-6 md:mx-8 text-current"
      aria-hidden="true"
    >
      <path d="M8 8V5a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="12" cy="14" rx="7.5" ry="7" fill="currentColor" />
      <circle cx="12" cy="14" r="2" fill="#0B0B0D" />
    </svg>
  );
}

const ICONS = [DumbbellIcon, PlateIcon, KettlebellIcon];

export function Marquee() {
  const baseWords = [
    "ONE MORE REP",
    "PURE IRON",
    "OLYMPIC DISCIPLINE",
    "CALIBRATED STEEL",
    "HIGH TENSION",
    "MAX HYPERTROPHY",
    ...MARQUEE_ITEMS.map((item) => item.toUpperCase()),
  ];

  return (
    <section
      id="marquee"
      aria-label="Athletic Marquee Tapes"
      className="relative py-16 sm:py-24 md:py-36 overflow-hidden bg-[#0B0B0D] select-none flex items-center justify-center max-w-[100vw]"
    >
      {/* Centered Symmetrical Cross Container: Both tapes share the exact same geometric origin */}
      <div className="relative w-full h-[140px] sm:h-[180px] md:h-[220px] flex items-center justify-center">
        {/* TAPE 2: Rotated +3deg from dead-center, Infinite scroll to RIGHT (-50% -> 0%), Iron Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[140vw] sm:w-[130vw] rotate-3 bg-[#17181B] text-[#EDEBE4] py-2.5 sm:py-3.5 md:py-4 shadow-[0_8px_30px_rgba(0,0,0,0.7)] overflow-hidden border-y border-[rgba(237,235,228,0.18)]">
          <motion.div
            className="flex w-max will-change-transform"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* First Set of Items */}
            <div className="flex shrink-0 items-center">
              {baseWords.map((word, idx) => {
                const IconComponent = ICONS[(idx + 1) % ICONS.length];
                return (
                  <div key={`t2-a-${idx}`} className="flex items-center">
                    <span className="font-display text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#EDEBE4] whitespace-nowrap">
                      {word}
                    </span>
                    <div className="text-[#D4FF3F]">
                      <IconComponent />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Exact Duplicate Set for Seamless Loop */}
            <div aria-hidden="true" className="flex shrink-0 items-center">
              {baseWords.map((word, idx) => {
                const IconComponent = ICONS[(idx + 1) % ICONS.length];
                return (
                  <div key={`t2-b-${idx}`} className="flex items-center">
                    <span className="font-display text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#EDEBE4] whitespace-nowrap">
                      {word}
                    </span>
                    <div className="text-[#D4FF3F]">
                      <IconComponent />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* TAPE 1: Rotated -3deg from dead-center, Infinite scroll to LEFT (0% -> -50%), Volt Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[140vw] sm:w-[130vw] -rotate-3 bg-[#D4FF3F] text-[#0B0B0D] py-2.5 sm:py-3.5 md:py-4 shadow-[0_8px_30px_rgba(0,0,0,0.7)] overflow-hidden border-y border-[#D4FF3F]">
          <motion.div
            className="flex w-max will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* First Set of Items */}
            <div className="flex shrink-0 items-center">
              {baseWords.map((word, idx) => {
                const IconComponent = ICONS[idx % ICONS.length];
                return (
                  <div key={`t1-a-${idx}`} className="flex items-center">
                    <span className="font-display text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#0B0B0D] whitespace-nowrap">
                      {word}
                    </span>
                    <IconComponent />
                  </div>
                );
              })}
            </div>

            {/* Exact Duplicate Set for Seamless Loop */}
            <div aria-hidden="true" className="flex shrink-0 items-center">
              {baseWords.map((word, idx) => {
                const IconComponent = ICONS[idx % ICONS.length];
                return (
                  <div key={`t1-b-${idx}`} className="flex items-center">
                    <span className="font-display text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#0B0B0D] whitespace-nowrap">
                      {word}
                    </span>
                    <IconComponent />
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
