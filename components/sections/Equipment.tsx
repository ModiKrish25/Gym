"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { RotateCw, ShieldCheck, Cpu } from "lucide-react";

// Lazy-load the heavy 3D WebGL dumbbell canvas
const ThreeDumbbell = dynamic(
  () => import("@/components/ui/ThreeDumbbell").then((mod) => mod.ThreeDumbbell),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[420px] flex items-center justify-center font-mono text-xs uppercase tracking-widest text-[#8A8F98]">
        INITIALIZING 3D CALIBRATION ENGINE...
      </div>
    ),
  }
);

export function Equipment() {
  return (
    <section
      id="equipment"
      className="py-24 md:py-36 bg-[#0B0B0D] border-b border-[rgba(237,235,228,0.08)] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[rgba(237,235,228,0.08)] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF3F]">
                CALIBRATED ARSENAL
              </span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase text-[#EDEBE4] leading-[0.88] tracking-tight">
              Machined Steel
            </h2>
          </div>

          <div className="font-mono text-xs text-[#8A8F98] uppercase tracking-wider flex items-center gap-3">
            <span>TOLERANCE: &plusmn;0.05%</span>
            <span>•</span>
            <span className="text-[#D4FF3F]">BILLET URETHANE</span>
          </div>
        </div>

        {/* Main 3D Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 3D Model Viewport (8 cols on desktop, sharp 4px radius, hairline border) */}
          <div className="lg:col-span-8 rounded-[4px] bg-[#17181B] border border-[rgba(237,235,228,0.08)] p-6 md:p-8 relative flex flex-col justify-between overflow-hidden">
            {/* Stage Header Tags */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-[1px] bg-[#D4FF3F] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#EDEBE4]">
                  3D ARSENAL INSPECTOR
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] uppercase text-[#8A8F98]">
                <RotateCw size={13} className="text-[#D4FF3F]" />
                <span>DRAG TO ROTATE 360&deg;</span>
              </div>
            </div>

            {/* 3D WebGL Canvas on Desktop / Tablet */}
            <div className="hidden md:block relative w-full my-auto">
              <ThreeDumbbell />
            </div>

            {/* Static High-Contrast Mobile Fallback Image (disabled WebGL on mobile for battery & perf) */}
            <div className="md:hidden relative w-full h-72 my-6 rounded-[2px] overflow-hidden border border-[rgba(237,235,228,0.08)] group">
              <Image
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop"
                alt="Olympic Dumbbell Specimen at GYM"
                fill
                sizes="100vw"
                className="object-cover object-center img-athletic"
              />
              <div className="absolute inset-0 bg-[#0B0B0D]/30" />
              <div className="absolute bottom-3 left-3 px-2 py-1 bg-[#0B0B0D]/90 rounded-[2px] font-mono text-[10px] text-[#EDEBE4] uppercase">
                CALIBRATED BILLET URETHANE // MOBILE SPEC
              </div>
            </div>

            {/* Stage Footer Technical Specs */}
            <div className="pt-6 border-t border-[rgba(237,235,228,0.08)] flex flex-wrap items-center justify-between gap-4 font-mono text-xs z-10">
              <div className="flex items-center gap-4">
                <span className="text-[#8A8F98]">SHAFT: <strong className="text-[#EDEBE4]">35mm Knurled</strong></span>
                <span className="text-[#8A8F98]">STEEL: <strong className="text-[#EDEBE4]">Hard Chrome</strong></span>
              </div>
              <div className="text-[#D4FF3F]">
                SPEC: IPF CERTIFIED
              </div>
            </div>
          </div>

          {/* Right Column: Spec Specifications (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="rounded-[4px] bg-[#17181B] border border-[rgba(237,235,228,0.08)] p-7">
              <div className="flex items-center gap-2 mb-4">
                <Cpu size={16} className="text-[#D4FF3F]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#EDEBE4]">
                  ENGINEERING STANDARDS
                </span>
              </div>
              <h3 className="font-display text-3xl font-extrabold uppercase text-[#EDEBE4] mb-3">
                Zero Play. Zero Drift.
              </h3>
              <p className="font-body text-sm text-[#8A8F98] leading-relaxed mb-6">
                Cast iron chips and loses calibration over repeated drops. GYM dumbbell and barbell arsenals are machined from single-billet alloy steel, CNC-turned, and encased in high-durometer urethane.
              </p>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between p-3 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.06)]">
                  <span className="text-[#8A8F98]">TENSILE STRENGTH</span>
                  <span className="text-[#EDEBE4] font-bold">215,000 PSI</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.06)]">
                  <span className="text-[#8A8F98]">BEARING SYSTEM</span>
                  <span className="text-[#EDEBE4] font-bold">5x Needle Bearings</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.06)]">
                  <span className="text-[#8A8F98]">KNURLING PATTERN</span>
                  <span className="text-[#D4FF3F] font-bold">Volcano Diamond</span>
                </div>
              </div>
            </div>

            <div className="rounded-[4px] bg-[#17181B] border border-[rgba(237,235,228,0.08)] p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.12)] flex items-center justify-center text-[#D4FF3F] shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="font-mono text-xs uppercase font-bold text-[#EDEBE4]">
                  Lifetime Calibration Warranty
                </div>
                <div className="font-body text-xs text-[#8A8F98] mt-0.5">
                  Re-calibrated and ultrasound tested every quarter.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
