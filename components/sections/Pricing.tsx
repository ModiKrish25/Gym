"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { PLANS, PRICING_FOOTNOTE } from "@/data/plans";
import { MagneticButton } from "@/components/ui/MagneticButton";

// SVG Barbell component showing plate stacks: 1 plate per side, 2 plates, or 3 plates
function BarbellPlateStack({ platesCount, isPopular }: { platesCount: number; isPopular?: boolean }) {
  const plateHeight = 48;

  return (
    <div className="w-full py-4 px-2 flex flex-col items-center border-b border-[rgba(237,235,228,0.08)] mb-6 bg-[#0B0B0D]/50 rounded-[2px]">
      <div className="flex items-center justify-between w-full font-mono text-[10px] uppercase text-[#8A8F98] mb-3">
        <span>CALIBRATED LOAD</span>
        <span className={isPopular ? "text-[#D4FF3F] font-bold" : "text-[#EDEBE4]"}>
          {platesCount === 1 && "60 KG // 1 PLATE / SIDE"}
          {platesCount === 2 && "100 KG // 2 PLATES / SIDE"}
          {platesCount === 3 && "140 KG // 3 PLATES / SIDE"}
        </span>
      </div>

      <svg viewBox="0 0 280 64" className="w-full max-w-[260px] h-auto overflow-visible" fill="none">
        {/* Steel Barbell Shaft */}
        <rect x="25" y="30" width="230" height="4" rx="1" fill="#EDEBE4" />
        {/* Knurled center */}
        <line x1="120" y1="30" x2="120" y2="34" stroke="#17181B" strokeWidth="1" />
        <line x1="140" y1="30" x2="140" y2="34" stroke="#17181B" strokeWidth="1" />
        <line x1="160" y1="30" x2="160" y2="34" stroke="#17181B" strokeWidth="1" />

        {/* Left Collar Stop */}
        <rect x="76" y="26" width="4" height="12" fill="#8A8F98" />
        {/* Right Collar Stop */}
        <rect x="200" y="26" width="4" height="12" fill="#8A8F98" />

        {/* LEFT PLATES */}
        {/* Plate 1 */}
        <rect
          x="68"
          y="10"
          width="7"
          height={plateHeight}
          rx="1"
          fill="#17181B"
          stroke={isPopular ? "#D4FF3F" : "#EDEBE4"}
          strokeWidth="1.2"
        />
        {/* Plate 2 (Performance & Elite) */}
        {platesCount >= 2 && (
          <rect
            x="59"
            y="12"
            width="7"
            height={plateHeight - 4}
            rx="1"
            fill="#17181B"
            stroke={isPopular ? "#D4FF3F" : "#8A8F98"}
            strokeWidth="1.2"
          />
        )}
        {/* Plate 3 (Elite only) */}
        {platesCount >= 3 && (
          <rect
            x="50"
            y="14"
            width="7"
            height={plateHeight - 8}
            rx="1"
            fill="#17181B"
            stroke="#D4FF3F"
            strokeWidth="1.2"
          />
        )}

        {/* RIGHT PLATES */}
        {/* Plate 1 */}
        <rect
          x="205"
          y="10"
          width="7"
          height={plateHeight}
          rx="1"
          fill="#17181B"
          stroke={isPopular ? "#D4FF3F" : "#EDEBE4"}
          strokeWidth="1.2"
        />
        {/* Plate 2 */}
        {platesCount >= 2 && (
          <rect
            x="214"
            y="12"
            width="7"
            height={plateHeight - 4}
            rx="1"
            fill="#17181B"
            stroke={isPopular ? "#D4FF3F" : "#8A8F98"}
            strokeWidth="1.2"
          />
        )}
        {/* Plate 3 */}
        {platesCount >= 3 && (
          <rect
            x="223"
            y="14"
            width="7"
            height={plateHeight - 8}
            rx="1"
            fill="#17181B"
            stroke="#D4FF3F"
            strokeWidth="1.2"
          />
        )}
      </svg>
    </div>
  );
}

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section
      id="pricing"
      className="py-24 md:py-36 bg-[#0B0B0D] border-b border-[rgba(237,235,228,0.08)]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[rgba(237,235,228,0.08)] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF3F]">
                MEMBERSHIP TIERS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase text-[#EDEBE4] leading-[0.88] tracking-tight">
              Plate Stacks
            </h2>
          </div>

          {/* Monthly / Yearly Toggle (Sharp corners, hairline borders) */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 p-1 rounded-[2px] bg-[#17181B] border border-[rgba(237,235,228,0.12)]">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-[2px] font-mono text-xs uppercase font-bold tracking-wider transition-all duration-200 ${
                !isYearly
                  ? "bg-[#D4FF3F] text-[#0B0B0D]"
                  : "text-[#8A8F98] hover:text-[#EDEBE4]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-[2px] font-mono text-xs uppercase font-bold tracking-wider transition-all duration-200 flex items-center gap-1.5 sm:gap-2 ${
                isYearly
                  ? "bg-[#D4FF3F] text-[#0B0B0D]"
                  : "text-[#8A8F98] hover:text-[#EDEBE4]"
              }`}
            >
              <span>Annual</span>
              <span className="px-1.5 py-0.5 rounded-[1px] text-[9px] bg-[#0B0B0D] text-[#D4FF3F] font-mono">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Plate Stack Cards Grid (Sharp corners 4-8px radius, hairline 1px grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-12">
          {PLANS.map((plan, idx) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const cadence = isYearly ? "/yr" : "/mo";
            // Map plan to plate count: Essential = 1, Performance = 2, Elite = 3
            const plateCount = idx + 1;

            return (
              <div
                key={plan.id}
                className={`relative rounded-[4px] p-5 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-300 group ${
                  plan.popular
                    ? "bg-[#17181B] border-2 border-[#D4FF3F] shadow-[0_0_30px_rgba(212,255,63,0.1)] lg:-translate-y-2"
                    : "bg-[#17181B] border border-[rgba(237,235,228,0.08)] hover:border-[rgba(237,235,228,0.25)]"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 right-4 sm:right-6 px-3 py-1 rounded-[2px] bg-[#D4FF3F] text-[#0B0B0D] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-md">
                    <Sparkles size={11} />
                    <span>RECOMMENDED SPEC</span>
                  </div>
                )}

                <div>
                  {/* Top Barbell Plate Stack Graphic */}
                  <BarbellPlateStack platesCount={plateCount} isPopular={plan.popular} />

                  <div className="mb-6">
                    <div className="font-mono text-xs uppercase tracking-widest text-[#8A8F98] mb-1">
                      TIER 0{plateCount}
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#EDEBE4]">
                      {plan.name}
                    </h3>

                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="font-mono text-base font-semibold text-[#8A8F98]">₹</span>
                      <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#EDEBE4] group-hover:text-[#D4FF3F] transition-colors tabular-nums">
                        {price.toLocaleString()}
                      </span>
                      <span className="font-mono text-xs text-[#8A8F98]">{cadence}</span>
                    </div>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3.5 mb-8 border-t border-[rgba(237,235,228,0.08)] pt-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-xs sm:text-sm text-[#8A8F98]">
                        <div className="w-4 h-4 rounded-[1px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.12)] flex items-center justify-center shrink-0 mt-0.5 text-[#D4FF3F]">
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span className="text-[#EDEBE4]/90 font-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-6 border-t border-[rgba(237,235,228,0.08)]">
                  <Link href={`/contact?plan=${plan.id}`} className="w-full block">
                    <button
                      className={`w-full py-3.5 px-6 rounded-[2px] font-mono text-xs uppercase font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                        plan.popular
                          ? "bg-[#D4FF3F] text-[#0B0B0D] hover:bg-[#b8e626] shadow-[0_0_15px_rgba(212,255,63,0.3)]"
                          : "bg-[#0B0B0D] text-[#EDEBE4] border border-[rgba(237,235,228,0.15)] hover:border-[#D4FF3F] hover:text-[#D4FF3F]"
                      }`}
                    >
                      <span>Select Tier</span>
                      <ArrowRight size={14} />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="pt-6 border-t border-[rgba(237,235,228,0.08)] text-center">
          <p className="font-mono text-xs text-[#8A8F98]">
            {PRICING_FOOTNOTE}
          </p>
        </div>
      </div>
    </section>
  );
}
