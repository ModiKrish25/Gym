"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBarbellSpine, SPINE_SECTIONS } from "@/hooks/useBarbellSpine";

export function BarbellSpine() {
  const { currentStageIndex, platesCount, weight, repLabel } = useBarbellSpine();
  const [isExpanded, setIsExpanded] = useState(false);

  // SVG Barbell plate rendering for 0 to 7 plates per side
  const plateHeights = [44, 42, 40, 36, 32, 28, 24]; // inner (biggest) to outer (smallest)

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Barbell Spine Navigator"
      className="fixed right-4 md:right-8 bottom-6 z-40 select-none"
    >
      {/* Main Barbell HUD Card */}
      <div className="rounded-[4px] bg-[#17181B]/95 border border-[rgba(237,235,228,0.12)] p-3 md:p-4 shadow-2xl backdrop-blur-md flex flex-col gap-3 min-w-[260px] md:min-w-[300px]">
        {/* Top Header: Current Rep & Status */}
        <div className="flex items-center justify-between border-b border-[rgba(237,235,228,0.08)] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#D4FF3F] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A8F98]">
              SPINE // BARBELL
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#D4FF3F]">
              {repLabel}
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[10px] font-mono uppercase text-[#8A8F98] hover:text-[#EDEBE4] px-1.5 py-0.5 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.1)] transition-colors"
            >
              {isExpanded ? "MIN" : "TRACK"}
            </button>
          </div>
        </div>

        {/* Visual SVG Barbell Spine with Dynamic Scroll-Linked Plates */}
        <div className="py-2 px-1 flex flex-col items-center relative">
          <svg
            viewBox="0 0 280 60"
            className="w-full h-auto overflow-visible"
            fill="none"
          >
            {/* Olympic Shaft */}
            <rect x="20" y="28" width="240" height="4" rx="1" fill="#EDEBE4" />
            <line x1="125" y1="28" x2="125" y2="32" stroke="#17181B" strokeWidth="1" />
            <line x1="140" y1="28" x2="140" y2="32" stroke="#D4FF3F" strokeWidth="1.5" />
            <line x1="155" y1="28" x2="155" y2="32" stroke="#17181B" strokeWidth="1" />

            {/* Collars */}
            <rect x="90" y="24" width="4" height="12" fill="#8A8F98" />
            <rect x="186" y="24" width="4" height="12" fill="#8A8F98" />

            {/* Left Plates (Dynamic stack from index 0 to platesCount - 1) */}
            <g>
              {Array.from({ length: 7 }).map((_, idx) => {
                const isLoaded = idx < platesCount;
                const xPos = 84 - idx * 8;
                const h = plateHeights[idx];
                const yPos = 30 - h / 2;
                return (
                  <motion.rect
                    key={`spine-l-plate-${idx}`}
                    x={xPos}
                    y={yPos}
                    width="6"
                    height={h}
                    rx="1"
                    initial={false}
                    animate={{
                      opacity: isLoaded ? 1 : 0.08,
                      scaleY: isLoaded ? 1 : 0.8,
                      x: isLoaded ? 0 : 30, // slide onto sleeve from outer right
                    }}
                    transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                    fill={isLoaded ? (idx === platesCount - 1 ? "#D4FF3F" : "#17181B") : "#2A2C31"}
                    stroke={isLoaded ? (idx === platesCount - 1 ? "#D4FF3F" : "#EDEBE4") : "#2A2C31"}
                    strokeWidth="1.2"
                  />
                );
              })}
            </g>

            {/* Right Plates (Dynamic stack) */}
            <g>
              {Array.from({ length: 7 }).map((_, idx) => {
                const isLoaded = idx < platesCount;
                const xPos = 190 + idx * 8;
                const h = plateHeights[idx];
                const yPos = 30 - h / 2;
                return (
                  <motion.rect
                    key={`spine-r-plate-${idx}`}
                    x={xPos}
                    y={yPos}
                    width="6"
                    height={h}
                    rx="1"
                    initial={false}
                    animate={{
                      opacity: isLoaded ? 1 : 0.08,
                      scaleY: isLoaded ? 1 : 0.8,
                      x: isLoaded ? 0 : -30, // slide onto sleeve from outer left
                    }}
                    transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                    fill={isLoaded ? (idx === platesCount - 1 ? "#D4FF3F" : "#17181B") : "#2A2C31"}
                    stroke={isLoaded ? (idx === platesCount - 1 ? "#D4FF3F" : "#EDEBE4") : "#2A2C31"}
                    strokeWidth="1.2"
                  />
                );
              })}
            </g>
          </svg>

          {/* Real-time Weight & Section Metric Bar */}
          <div className="w-full flex items-center justify-between mt-2 pt-2 border-t border-[rgba(237,235,228,0.06)] font-mono text-xs">
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-lg text-[#EDEBE4] tabular-nums">
                {weight}
              </span>
              <span className="text-[#D4FF3F] text-[11px] font-bold">KG</span>
            </div>

            <div className="text-[10px] uppercase text-[#8A8F98]">
              {platesCount === 0 && "BAR ONLY // 0 PLATES"}
              {platesCount > 0 && platesCount < 7 && `+${platesCount * 2} PLATES LOADED`}
              {platesCount === 7 && (
                <span className="text-[#D4FF3F] font-bold animate-pulse">
                  MAX LOAD // 14 PLATES
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Expandable Section Navigator Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
              className="overflow-hidden border-t border-[rgba(237,235,228,0.08)] pt-2 space-y-1"
            >
              {SPINE_SECTIONS.map((sec, idx) => {
                const isActive = idx === currentStageIndex;
                const isPassed = idx < currentStageIndex;

                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[2px] text-[11px] font-mono transition-colors text-left ${
                      isActive
                        ? "bg-[#D4FF3F] text-[#0B0B0D] font-bold"
                        : isPassed
                        ? "text-[#EDEBE4] hover:bg-[#222429]"
                        : "text-[#8A8F98] hover:bg-[#222429]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] opacity-60">0{idx}</span>
                      <span>{sec.name}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px]">
                      <span>{sec.weight} KG</span>
                      {isActive && <span>&bull;</span>}
                    </div>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
