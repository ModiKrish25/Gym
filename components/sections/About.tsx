"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Target, Shield, Users } from "lucide-react";
import { ABOUT_CONTENT } from "@/data/content";

const VALUE_ICONS = [Target, Shield, Users];

export function About() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
  });

  // 3 complete curls across section scroll (0 to 1)
  // curlPhase goes 0 -> 1 -> 0 -> 1 -> 0 -> 1 -> 0
  const curlPhase = useTransform(smoothProgress, (p) => {
    // 3 reps mapped across scroll
    const repProgress = (p * 3) % 1;
    // sinusoidal lift up and back down
    return Math.sin(repProgress * Math.PI);
  });

  // Translate and rotate dumbbell to simulate a bicep curl
  const dumbbellY = useTransform(curlPhase, [0, 1], [30, -75]);
  const dumbbellRotate = useTransform(curlPhase, [0, 1], [-25, 45]);
  const dumbbellScale = useTransform(curlPhase, [0, 1], [0.95, 1.05]);

  // Current rep number state ("01", "02", "03")
  const [currentRep, setCurrentRep] = useState("01");

  useEffect(() => {
    return smoothProgress.on("change", (p) => {
      if (p < 0.33) setCurrentRep("01");
      else if (p < 0.66) setCurrentRep("02");
      else setCurrentRep("03");
    });
  }, [smoothProgress]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-24 md:py-36 bg-[#0B0B0D] border-b border-[rgba(237,235,228,0.08)] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[rgba(237,235,228,0.08)] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF3F]">
                PHILOSOPHY
              </span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase text-[#EDEBE4] leading-[0.88] tracking-tight">
              {ABOUT_CONTENT.heading}
            </h2>
          </div>

          <div className="font-mono text-xs text-[#8A8F98] uppercase tracking-wider flex items-center gap-4">
            <span>STANDARD SPEC</span>
            <span>•</span>
            <span className="text-[#D4FF3F]">ZERO GUESSWORK</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Text & 3 Sharp Industrial Value Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <p className="font-body text-base sm:text-lg text-[#EDEBE4] leading-relaxed mb-4 max-w-2xl">
              {ABOUT_CONTENT.paragraph1}
            </p>
            <p className="font-body text-base sm:text-lg text-[#8A8F98] leading-relaxed mb-10 max-w-2xl">
              {ABOUT_CONTENT.paragraph2}
            </p>

            {/* 3 Sharp Value Cards (hairline borders, sharp 4px radius) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {ABOUT_CONTENT.values.map((val, idx) => {
                const IconComponent = VALUE_ICONS[idx];
                return (
                  <div
                    key={val.title}
                    className="p-6 rounded-[4px] bg-[#17181B] border border-[rgba(237,235,228,0.08)] hover:border-[#D4FF3F] transition-colors duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.1)] flex items-center justify-center text-[#EDEBE4] group-hover:text-[#D4FF3F] group-hover:border-[#D4FF3F] transition-colors mb-5">
                        <IconComponent size={18} />
                      </div>
                      <h3 className="font-display text-xl font-bold uppercase tracking-tight text-[#EDEBE4] mb-2">
                        {val.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-[#8A8F98] leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[rgba(237,235,228,0.04)] font-mono text-[10px] text-[#8A8F98]/50">
                      0{idx + 1} // PROTOCOL
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Curled SVG Dumbbell Rig + High-Contrast Photo (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* SVG Dumbbell that curls with scroll progress */}
            <div className="p-6 rounded-[4px] bg-[#17181B] border border-[rgba(237,235,228,0.08)] relative overflow-hidden flex flex-col">
              <div className="flex items-center justify-between border-b border-[rgba(237,235,228,0.08)] pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F] animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#EDEBE4]">
                    LIVE SCROLL BIOMECHANICS
                  </span>
                </div>
                {/* Rep Counter */}
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <span className="text-[#8A8F98]">REP</span>
                  <span className="text-[#D4FF3F] font-bold text-base">
                    {currentRep}
                  </span>
                  <span className="text-[#8A8F98]">/ 03</span>
                </div>
              </div>

              {/* Dynamic Curling Dumbbell Stage */}
              <div className="relative h-44 w-full flex items-center justify-center">
                {/* Visual biomechanical arc guide */}
                <svg
                  viewBox="0 0 300 150"
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
                  fill="none"
                >
                  <path
                    d="M 50 120 C 100 120, 180 80, 240 30"
                    stroke="#EDEBE4"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <circle cx="50" cy="120" r="3" fill="#8A8F98" />
                  <circle cx="240" cy="30" r="3" fill="#D4FF3F" />
                </svg>

                {/* Animated Curling Dumbbell */}
                <motion.div
                  style={{
                    y: dumbbellY,
                    rotate: dumbbellRotate,
                    scale: dumbbellScale,
                  }}
                  className="relative z-10 flex flex-col items-center cursor-grab active:cursor-grabbing"
                >
                  <svg
                    width="140"
                    height="60"
                    viewBox="0 0 140 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                  >
                    {/* Knurled Shaft */}
                    <rect x="36" y="27" width="68" height="6" rx="1.5" fill="#EDEBE4" />
                    <line x1="50" y1="27" x2="50" y2="33" stroke="#17181B" strokeWidth="1" />
                    <line x1="60" y1="27" x2="60" y2="33" stroke="#17181B" strokeWidth="1" />
                    <line x1="70" y1="27" x2="70" y2="33" stroke="#D4FF3F" strokeWidth="1.5" />
                    <line x1="80" y1="27" x2="80" y2="33" stroke="#17181B" strokeWidth="1" />
                    <line x1="90" y1="27" x2="90" y2="33" stroke="#17181B" strokeWidth="1" />

                    {/* Left Heavy Plate Stacks */}
                    <rect x="22" y="8" width="14" height="44" rx="2" fill="#17181B" stroke="#D4FF3F" strokeWidth="1.5" />
                    <rect x="10" y="12" width="12" height="36" rx="2" fill="#222429" stroke="#2A2C31" strokeWidth="1" />
                    <rect x="2" y="16" width="8" height="28" rx="1.5" fill="#17181B" stroke="#8A8F98" strokeWidth="1" />

                    {/* Right Heavy Plate Stacks */}
                    <rect x="104" y="8" width="14" height="44" rx="2" fill="#17181B" stroke="#D4FF3F" strokeWidth="1.5" />
                    <rect x="118" y="12" width="12" height="36" rx="2" fill="#222429" stroke="#2A2C31" strokeWidth="1" />
                    <rect x="130" y="16" width="8" height="28" rx="1.5" fill="#17181B" stroke="#8A8F98" strokeWidth="1" />
                  </svg>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#D4FF3F] mt-1">
                    32 KG CALIBRATED
                  </span>
                </motion.div>
              </div>

              <div className="pt-3 border-t border-[rgba(237,235,228,0.06)] flex items-center justify-between text-[11px] font-mono text-[#8A8F98]">
                <span>TENSION: 100% CONSTANT</span>
                <span className="text-[#D4FF3F]">ONE MORE REP</span>
              </div>
            </div>

            {/* High-contrast B&W photo with color on hover */}
            <div className="relative h-[360px] sm:h-[420px] w-full rounded-[4px] overflow-hidden border border-[rgba(237,235,228,0.08)] group">
              <Image
                src="https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=1200&auto=format&fit=crop"
                alt="Disciplined athlete conditioning at GYM"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center img-athletic"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-80" />

              {/* Floating Record Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-[4px] bg-[#17181B]/95 border border-[rgba(237,235,228,0.12)] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#8A8F98] block">
                    TRACK RECORD
                  </span>
                  <span className="font-display text-2xl font-bold uppercase text-[#EDEBE4]">
                    {ABOUT_CONTENT.badge}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-[2px] bg-[#D4FF3F] flex items-center justify-center text-[#0B0B0D] font-mono font-bold text-xs">
                  EST
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
