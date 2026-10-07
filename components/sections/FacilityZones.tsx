"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Sparkles, Compass, ArrowUpRight, Check } from "lucide-react";

interface ZoneCard {
  id: string;
  number: string;
  titleLines: string[];
  subtitle: string;
  woodTexture: string;
  revealImage: string;
  tag: string;
  specs: string[];
  description: string;
}

const ZONES_DATA: ZoneCard[] = [
  {
    id: "free-weights",
    number: "01",
    titleLines: ["FREE", "WEIGHTS"],
    subtitle: "Heavy Iron & Olympic Platforms",
    woodTexture: "/images/zones/wood-texture.jpg",
    revealImage: "/images/zones/free-weights.jpg",
    tag: "Calibrated Iron",
    specs: ["2.5kg – 60kg DBs", "Eleiko Competition Racks", "Chalk Allowed"],
    description:
      "Solid machined urethane dumbbells, Eleiko IWF calibrated bars, and multi-layer shock absorbent drop platforms.",
  },
  {
    id: "locker-rooms",
    number: "02",
    titleLines: ["LOCKER", "ROOMS"],
    subtitle: "Cedar Sanctuaries & Contrast Baths",
    woodTexture: "/images/zones/wood-texture.jpg",
    revealImage: "/images/zones/locker-rooms.jpg",
    tag: "Sanctuary",
    specs: ["Finnish Cedar Sauna", "42°F Cold Plunges", "Private Suites"],
    description:
      "Custom oak locker sanctuaries, hyper-sanitized private rain showers, steam rooms, and post-session contrast therapy.",
  },
  {
    id: "outdoor-workout",
    number: "03",
    titleLines: ["OUTDOOR", "WORKOUT", "AREA"],
    subtitle: "Open-Air Sunlit Pit & Rigs",
    woodTexture: "/images/zones/wood-texture.jpg",
    revealImage: "/images/zones/outdoor-workout.jpg",
    tag: "Open Atmosphere",
    specs: ["Muscle Beach Spec", "Sled & Turf Track", "Natural Sunlight"],
    description:
      "Dedicated ocean-breeze outdoor yard equipped with heavy monkey bars, calisthenics rigs, tire flips, and sprint lanes.",
  },
  {
    id: "legends-mecca",
    number: "04",
    titleLines: ["OLD", "SCHOOL", "IRON"],
    subtitle: "Venice Golden Era Heritage",
    woodTexture: "/images/zones/wood-texture.jpg",
    revealImage: "/images/zones/arnold-vintage.jpg",
    tag: "Championship Legacy",
    specs: ["1970s Heritage Spirit", "No Excuses Ethos", "Calibrated Mecca"],
    description:
      "Inspired by the golden era Mecca of bodybuilding. Where relentless discipline, camaraderie, and legendary gains are forged.",
  },
];

export function FacilityZones() {
  // Card 4 is active by default to reflect the user's reference screenshot,
  // or user can hover any card to reveal it.
  const [hoveredId, setHoveredId] = useState<string | null>("legends-mecca");
  const [revealAll, setRevealAll] = useState(false);

  return (
    <section
      id="zones"
      className="py-20 md:py-32 bg-[#05080F] border-b border-[rgba(142,155,176,0.18)] relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#FFB38A]/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#121C30] border border-[rgba(142,155,176,0.22)] mb-4">
              <Sparkles size={14} className="text-[#FF6B35] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#FF6B35] font-bold">
                Interactive Ground Spaces
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#F5F6F8] tracking-tight">
              Four Zones. Zero Compromise.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
            <p className="text-sm md:text-base text-[#8E9BB0] max-w-md">
              Hover your cursor over each raw timber panel to unveil the training
              atmosphere, gear, and golden-era legacy.
            </p>

            {/* Quick Toggle Mode */}
            <button
              onClick={() => setRevealAll(!revealAll)}
              className={`shrink-0 px-4 py-2.5 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center gap-2 border ${
                revealAll
                  ? "bg-[#FF6B35] text-[#05080F] border-[#FF6B35] shadow-lg shadow-[#FF6B35]/25"
                  : "bg-[#121C30] text-[#F5F6F8] border-[rgba(142,155,176,0.25)] hover:border-[#FF6B35]"
              }`}
            >
              <Eye size={14} />
              <span>{revealAll ? "Reset Hover" : "Reveal All"}</span>
            </button>
          </div>
        </div>

        {/* The 4-Panel Reveal Strip */}
        <div className="bg-[#000000] p-2 md:p-3 rounded-2xl md:rounded-3xl border border-[rgba(142,155,176,0.2)] shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
            {ZONES_DATA.map((zone) => {
              const isRevealed = revealAll || hoveredId === zone.id;

              return (
                <div
                  key={zone.id}
                  onMouseEnter={() => !revealAll && setHoveredId(zone.id)}
                  onClick={() => setHoveredId(zone.id)}
                  className="group relative h-[380px] sm:h-[480px] lg:h-[620px] rounded-xl md:rounded-2xl overflow-hidden border border-black/80 cursor-pointer select-none transition-all duration-500"
                >
                  {/* BASE LAYER: Birch Plywood Texture */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={zone.woodTexture}
                      alt="Raw Birch Plywood Grain"
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover object-center"
                      priority
                    />
                    {/* Subtle warm varnish tint matching screenshot */}
                    <div className="absolute inset-0 bg-[#e3cca8]/20 mix-blend-multiply pointer-events-none" />
                  </div>

                  {/* REVEAL LAYER: Sepia / Monochrome Gym Image */}
                  <div
                    className={`absolute inset-0 z-10 transition-opacity duration-700 ease-out ${
                      isRevealed ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={zone.revealImage}
                      alt={zone.titleLines.join(" ")}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className={`object-cover object-center transition-transform duration-700 ease-out ${
                        isRevealed ? "scale-105" : "scale-100"
                      }`}
                    />
                    {/* Atmospheric vintage warm gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/85" />
                  </div>

                  {/* CONTENT OVERLAY */}
                  <div className="relative z-20 h-full flex flex-col justify-between p-4 sm:p-5 lg:p-6">
                    {/* TOP: Bold Condensed Uppercase Header */}
                    <div>
                      {/* Top Zone Indicator */}
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <span
                          className={`font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded transition-colors duration-300 ${
                            isRevealed
                              ? "bg-black/60 text-[#FFB38A] border border-[rgba(255,107,53,0.3)] backdrop-blur-sm"
                              : "bg-black/10 text-neutral-800 border border-black/20 font-bold"
                          }`}
                        >
                          ZONE {zone.number}
                        </span>

                        <span
                          className={`text-[11px] font-mono tracking-widest uppercase transition-colors duration-300 ${
                            isRevealed ? "text-[#FFB38A]" : "text-black/60 font-bold"
                          }`}
                        >
                          {zone.tag}
                        </span>
                      </div>

                      {/* Main Title (Condensed uppercase typography) */}
                      <h3
                        className={`font-display font-black tracking-tight uppercase leading-[0.88] transition-colors duration-300 ${
                          zone.titleLines.length > 2
                            ? "text-3xl sm:text-4xl lg:text-3xl xl:text-4xl"
                            : "text-3xl sm:text-4xl lg:text-4xl xl:text-5xl"
                        } ${
                          isRevealed
                            ? "text-[#FFFFFF] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
                            : "text-[#050505]"
                        }`}
                      >
                        {zone.titleLines.map((line, idx) => (
                          <span key={idx} className="block whitespace-nowrap">
                            {line}
                          </span>
                        ))}
                      </h3>
                    </div>

                    {/* BOTTOM: Zone Details & Reveal State */}
                    <div>
                      {/* Revealed info drawer */}
                      <div
                        className={`transition-all duration-500 ease-out ${
                          isRevealed
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4 pointer-events-none"
                        }`}
                      >
                        <p className="text-xs sm:text-sm text-[#FFB38A] font-semibold mb-2">
                          {zone.subtitle}
                        </p>
                        <p className="text-xs text-[#E2E8F0]/90 leading-relaxed mb-4 line-clamp-3">
                          {zone.description}
                        </p>

                        {/* Specs Pill List */}
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/15">
                          {zone.specs.map((spec, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-black/70 border border-white/20 text-[#F5F6F8] backdrop-blur-sm flex items-center gap-1"
                            >
                              <span className="w-1 h-1 rounded-full bg-[#FF6B35]" />
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Default Unhovered Pill */}
                      {!isRevealed && (
                        <div className="flex items-center justify-between pt-3 border-t border-black/15 text-neutral-800 text-xs font-mono font-bold">
                          <span className="flex items-center gap-1.5 tracking-wider uppercase text-[11px]">
                            <Compass size={13} className="text-black" />
                            <span>Hover to reveal</span>
                          </span>
                          <ArrowUpRight size={15} className="text-black" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Active Highlight Border Glow */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-all duration-500 rounded-xl md:rounded-2xl ${
                      isRevealed
                        ? "ring-2 ring-[#FF6B35]/60 shadow-[inset_0_0_30px_rgba(255,107,53,0.2)]"
                        : "ring-0"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Floor Spec Bar Below */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A1220] border border-[rgba(142,155,176,0.18)] text-xs text-[#8E9BB0]">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping" />
              <strong className="text-[#F5F6F8]">22,000+ Total SQ FT</strong>
            </span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span>4 Specialized Acoustic &amp; Environmental Zones</span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span>Natural Timber &amp; Raw Steel Construction</span>
          </div>
          <span className="font-mono text-[#FFB38A] text-[11px] uppercase tracking-wider">
            All Zones Open 24/7 For Members
          </span>
        </div>
      </div>
    </section>
  );
}
