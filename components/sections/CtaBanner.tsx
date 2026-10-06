"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CtaBanner() {
  return (
    <section className="bg-[#17181B] text-[#EDEBE4] py-8 sm:py-10 md:py-12 overflow-hidden relative border-y border-[rgba(237,235,228,0.08)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
          {/* Left: Text Content */}
          <div className="max-w-xl text-left w-full lg:w-auto">
            {/* ONE MORE REP placed above left side text */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F]" />
              <span className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-[#D4FF3F] leading-none">
                ONE MORE REP
              </span>
            </div>
            <div className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#8A8F98] mb-2.5">
              INITIATION PROTOCOL // ZERO RISK
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#EDEBE4] leading-[0.92] mb-2">
              Your First Session Is On Us.
            </h2>
            <p className="font-body text-sm sm:text-base text-[#8A8F98] max-w-lg leading-normal">
              Experience our calibrated Olympic platforms, movement diagnostics, and elite coaching firsthand.
            </p>
          </div>

          {/* Center: Scaled Athlete Emblem Badge (Sleek Banner Proportion) */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-64 lg:h-64 shrink-0 group my-1 lg:my-0">
            <Image
              src="/images/cta-athlete-v2.png"
              alt="Elite Strength Athlete Emblem"
              fill
              sizes="(max-width: 640px) 176px, (max-width: 1024px) 240px, 256px"
              className="object-contain filter drop-shadow-[0_16px_35px_rgba(0,0,0,0.9)] drop-shadow-[0_0_40px_rgba(212,255,63,0.12)] group-hover:scale-105 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)]"
              priority
            />
          </div>

          {/* Right: CTA Action Button */}
          <div className="shrink-0 flex flex-col items-center sm:items-start lg:items-end gap-2.5 w-full lg:w-auto">
            <Link href="/contact" className="w-full sm:w-auto">
              <MagneticButton variant="volt" className="text-sm px-8 py-3.5 w-full sm:w-auto">
                <span>Book a free trial</span>
                <ArrowRight size={16} />
              </MagneticButton>
            </Link>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98]">
              No commitment required &bull; 60 min session
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
