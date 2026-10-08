"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { METHOD_STEPS } from "@/data/content";

export function Method() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(1);

  // Bulletproof scroll-linked tracking across Lenis and browser scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 35%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
  });

  // Automatically update active step based on scroll progress
  useEffect(() => {
    return smoothProgress.on("change", (p) => {
      const stepIndex = Math.min(
        METHOD_STEPS.length,
        Math.max(1, Math.floor(p * METHOD_STEPS.length) + 1)
      );
      setActiveStep(stepIndex);
    });
  }, [smoothProgress]);

  // Height of the volt progress line: 0% to 100%
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      id="method"
      className="py-14 sm:py-16 md:py-20 bg-[#0B0B0D] border-b border-[rgba(237,235,228,0.08)] relative overflow-hidden"
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading and Context (5 cols, sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF3F]">
                THE METHOD
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase text-[#EDEBE4] leading-[0.88] tracking-tight mb-6">
              Four steps. One system.
            </h2>

            <p className="font-body text-base text-[#8A8F98] leading-relaxed max-w-md mb-8">
              We eliminate random workouts and subjective opinions. Every phase of your
              training is calibrated against baseline biomarkers and movement metrics.
            </p>

            {/* Current Sequence Card in Iron and Volt */}
            <div className="p-5 sm:p-6 rounded-[4px] bg-[#17181B] border border-[rgba(237,235,228,0.08)]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8A8F98]">
                  CURRENT SEQUENCE
                </span>
                <span className="font-mono text-[10px] text-[#D4FF3F] uppercase font-bold">
                  PHASE 0{activeStep} / 04
                </span>
              </div>

              <p className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#EDEBE4] tracking-tight">
                {METHOD_STEPS[activeStep - 1]?.title}
              </p>
              <p className="font-body text-xs sm:text-sm text-[#8A8F98] mt-2 leading-relaxed">
                {METHOD_STEPS[activeStep - 1]?.description}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Vertical Step List with Volt Progress Line (7 cols) */}
          <div className="lg:col-span-7 relative pl-10 sm:pl-12">
            {/* Background Track Line aligned with node center */}
            <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-[#17181B] border-r border-[rgba(237,235,228,0.08)]" />

            {/* Volt Progress Line (Animated on scroll) */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[11px] top-6 w-[2px] bg-[#D4FF3F] shadow-[0_0_12px_rgba(212,255,63,0.8)] origin-top z-10"
            />

            {/* Steps Cards */}
            <div className="space-y-6 sm:space-y-8">
              {METHOD_STEPS.map((step) => {
                const isActive = activeStep === step.step;
                const isPassed = activeStep >= step.step;

                return (
                  <div
                    key={step.step}
                    onClick={() => setActiveStep(step.step)}
                    className={`relative p-5 sm:p-8 rounded-[4px] transition-all duration-400 cursor-pointer group ${
                      isActive
                        ? "bg-[#17181B] border border-[#D4FF3F] shadow-[0_0_25px_rgba(212,255,63,0.08)]"
                        : "bg-[#17181B]/50 border border-[rgba(237,235,228,0.08)] opacity-60 hover:opacity-100 hover:border-[rgba(237,235,228,0.2)]"
                    }`}
                  >
                    {/* Step Node Marker on Line */}
                    <div
                      className={`absolute -left-10 sm:-left-12 top-6 sm:top-8 w-6 h-6 rounded-[2px] flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 z-20 ${
                        isPassed
                          ? "bg-[#D4FF3F] text-[#0B0B0D] shadow-[0_0_10px_rgba(212,255,63,0.6)]"
                          : "bg-[#17181B] border border-[rgba(237,235,228,0.2)] text-[#8A8F98]"
                      }`}
                    >
                      {step.step}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`font-mono text-[11px] uppercase tracking-widest font-bold ${
                          isActive ? "text-[#D4FF3F]" : "text-[#8A8F98]"
                        }`}
                      >
                        STEP 0{step.step}
                      </span>
                      {isActive && (
                        <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded-[2px] bg-[#D4FF3F]/15 text-[#D4FF3F] border border-[#D4FF3F]/40">
                          Active Phase
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#EDEBE4] mb-2 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm sm:text-base text-[#8A8F98] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
