"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Dumbbell, Flame, Activity, Zap } from "lucide-react";
import { KettlebellIcon, PowerCageIcon } from "@/components/ui/GymIcons";
import { PROGRAMS } from "@/data/content";

export function Programs() {
  // Duplicate programs list once for mathematically seamless 0 -> -50% CSS looping
  const duplicatedPrograms = [...PROGRAMS, ...PROGRAMS];

  return (
    <section
      id="programs"
      className="relative bg-[#0B0B0D] border-b border-[rgba(237,235,228,0.08)] overflow-hidden"
    >
      {/* Top Section Intro Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pt-20 md:pt-28 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(237,235,228,0.08)]">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF3F]">
              DISCIPLINES
            </span>
          </div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase text-[#EDEBE4] leading-[0.88] tracking-tight">
            Curated Programs
          </h2>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs text-[#8A8F98]">
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4FF3F] animate-pulse" />
            <span className="text-[#EDEBE4] tracking-wider uppercase">CONTINUOUS ROTATION</span>
          </span>
          <span className="hidden sm:inline-block text-[#8A8F98] uppercase tracking-wider">
            HOVER TO PAUSE
          </span>
        </div>
      </div>

      {/* Continuous Marquee Track */}
      <div className="relative w-full py-12 md:py-16 overflow-hidden">
        {/* Soft edge gradient fades for cinematic loop transition */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0B0B0D] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0B0B0D] to-transparent z-10" />

        <div className="animate-programs-scroll flex gap-6 md:gap-8 items-stretch select-none pl-4">
          {duplicatedPrograms.map((program, idx) => {
            const originalIndex = (idx % PROGRAMS.length) + 1;
            return (
              <div
                key={`${program.id}-${idx}`}
                className="w-[85vw] sm:w-[420px] md:w-[460px] lg:w-[480px] shrink-0 rounded-[4px] bg-[#17181B] border border-[rgba(237,235,228,0.08)] hover:border-[#D4FF3F] transition-all duration-500 flex flex-col overflow-hidden group select-none shadow-xl"
              >
                {/* Image Header with B&W high-contrast filter that turns to color on hover */}
                <div className="relative h-64 md:h-72 w-full overflow-hidden border-b border-[rgba(237,235,228,0.08)]">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 768px) 85vw, 480px"
                    className="object-cover object-center img-athletic group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#0B0B0D]/35 group-hover:bg-transparent transition-colors duration-500" />

                  {/* Level Chip */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-[2px] text-[11px] font-mono uppercase font-bold bg-[#0B0B0D]/90 border border-[rgba(237,235,228,0.15)] text-[#EDEBE4]">
                      {program.level}
                    </span>
                  </div>

                  {/* Duration */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-[2px] text-[11px] font-mono bg-[#0B0B0D]/90 border border-[rgba(237,235,228,0.15)] text-[#EDEBE4]">
                    <Clock size={12} className="text-[#D4FF3F]" />
                    <span>{program.duration}</span>
                  </div>

                  {/* Index tag */}
                  <div className="absolute bottom-4 right-4 font-mono text-3xl font-extrabold text-[#EDEBE4]/20 group-hover:text-[#D4FF3F]/40 transition-colors">
                    0{originalIndex}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-7 h-7 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.12)] flex items-center justify-center text-[#D4FF3F]">
                        {program.id === "strength" && <Dumbbell size={15} />}
                        {program.id === "fat-loss" && <Flame size={15} />}
                        {program.id === "functional" && <KettlebellIcon className="w-3.5 h-3.5" />}
                        {program.id === "yoga" && <Activity size={15} />}
                        {program.id === "hiit" && <Zap size={15} />}
                        {program.id === "personal" && <PowerCageIcon className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A8F98]">
                        CALIBRATED PROTOCOL
                      </span>
                    </div>

                    <h3 className="font-display text-3xl md:text-4xl font-extrabold uppercase text-[#EDEBE4] mb-3 tracking-tight group-hover:text-[#D4FF3F] transition-colors">
                      {program.title}
                    </h3>
                    <p className="font-body text-sm text-[#8A8F98] leading-relaxed mb-6">
                      {program.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[rgba(237,235,228,0.06)] flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      {program.benefits.slice(0, 2).map((benefit: string, bIdx: number) => (
                        <span
                          key={bIdx}
                          className="px-2.5 py-1 rounded-[2px] bg-[#0B0B0D] text-[10px] font-mono text-[#8A8F98]"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/classes#${program.id}`}
                      className="w-9 h-9 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.12)] flex items-center justify-center text-[#EDEBE4] group-hover:bg-[#D4FF3F] group-hover:text-[#0B0B0D] group-hover:border-[#D4FF3F] transition-all shrink-0 ml-2"
                      aria-label={`View ${program.title} syllabus`}
                    >
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
