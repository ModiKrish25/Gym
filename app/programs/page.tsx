import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Sparkles, Activity } from "lucide-react";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { ProgramCardStack } from "@/components/sections/ProgramCardStack";

export const metadata: Metadata = {
  title: "Training Programs – 6 Calibrated Disciplines | GYM Elite Fitness",
  description:
    "Explore our 6 periodized training architectures: Strength Training, Fat Loss Lab, Functional Fitness, Yoga & Mobility, HIIT Ignite, and Bespoke Personal Coaching.",
};

export default function ProgramsPage() {
  return (
    <div className="bg-[#0B0B0D] text-[#EDEBE4] min-h-screen pt-28 sm:pt-36 pb-24 overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Page Hero Header */}
        <div className="mb-12 sm:mb-16 border-b border-[rgba(237,235,228,0.08)] pb-10 sm:pb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF3F]">
              DISCIPLINES // 06 CALIBRATED SYSTEMS
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-4xl">
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase leading-[0.88] tracking-tight text-[#EDEBE4]">
                Architected For
                <span className="block text-[#D4FF3F]">Serious Work.</span>
              </h1>
            </div>

            <div className="lg:max-w-md flex flex-col justify-between gap-6">
              <p className="font-body text-base text-[#8A8F98] leading-relaxed">
                Every physique demands an intentional stimulus. Explore our six periodized training programs, each built around progressive overload, biological adaptation, and joint longevity.
              </p>

              {/* Stat Chips */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs text-[#8A8F98]">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#17181B] border border-[rgba(237,235,228,0.08)]">
                  <span className="text-[#D4FF3F] font-bold">06</span> DISCIPLINES
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#17181B] border border-[rgba(237,235,228,0.08)]">
                  <span className="text-[#D4FF3F] font-bold">100%</span> COACH-LED
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#17181B] border border-[rgba(237,235,228,0.08)]">
                  <span className="text-[#D4FF3F] font-bold">IWF</span> STANDARD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stack Cards Animation Stream */}
        <ProgramCardStack />

        {/* Bottom Assessment Callout Banner */}
        <div className="relative mt-12 p-8 sm:p-12 md:p-16 rounded-[4px] bg-gradient-to-br from-[#17181B] via-[#121316] to-[#0B0B0D] border border-[rgba(212,255,63,0.3)] overflow-hidden shadow-2xl">
          {/* Ambient Volt Glow */}
          <div className="pointer-events-none absolute -top-32 -right-32 w-72 h-72 bg-[#D4FF3F]/15 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2.5 mb-3 font-mono text-xs uppercase tracking-widest text-[#D4FF3F]">
                <ShieldCheck size={16} />
                <span>COMPLIMENTARY BIOMECHANICAL AUDIT</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase text-[#EDEBE4] tracking-tight mb-4">
                Not Sure Which Program Fits Your Body?
              </h2>
              <p className="font-body text-base text-[#8A8F98] leading-relaxed">
                Every new athlete begins with our comprehensive 45-minute Movement Assessment. We scan your body composition, audit spinal and hip mobility, and match you with the optimal program architecture.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
              <Link
                href="/classes"
                className="px-6 py-4 rounded-[2px] border border-[rgba(237,235,228,0.15)] text-[#EDEBE4] hover:border-[#D4FF3F] hover:text-[#D4FF3F] font-mono text-xs uppercase tracking-wider transition-colors text-center"
              >
                View Class Schedule
              </Link>
              <Link
                href="/pricing"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-[2px] bg-[#D4FF3F] text-[#0B0B0D] font-mono text-xs uppercase font-extrabold tracking-widest hover:bg-[#EDEBE4] transition-colors text-center shadow-lg shadow-[#D4FF3F]/20"
              >
                <span>Book Free Assessment</span>
                <AnimatedArrow type="right" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
