"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check, Compass } from "lucide-react";

interface FacilityItem {
  id: string;
  zone: string;
  title: string;
  description: string;
  image: string;
  colSpan: string;
  specs: string[];
}

const FACILITY_ITEMS: FacilityItem[] = [
  {
    id: "strength-zone",
    zone: "ZONE 01 // BIOMECHANICS",
    title: "Strength Zone",
    description: "Olympic platforms, calibrated competition steel plates, and Arsenal Strength custom machines.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    specs: ["Eleiko IWF Platforms", "Machined Steel Plates", "Urethane DBs to 70KG"],
  },
  {
    id: "cardio-deck",
    zone: "ZONE 02 // ENDURANCE",
    title: "Cardio Deck",
    description: "Skyline-facing curved treadmills, air bikes, and Concept2 ergometers with live telemetry.",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    specs: ["Woodway Curve", "Concept2 Ergometers", "Wahoo Smart Bikes"],
  },
  {
    id: "recovery-lounge",
    zone: "ZONE 03 // CELLULAR RESET",
    title: "Recovery Lounge",
    description: "Targeted muscular decompression, pneumatic compression boots, and guided mobility zones.",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    specs: ["Normatec 3 Boots", "Hypervolt Percussion", "Zero-G Loungers"],
  },
  {
    id: "steam-sauna",
    zone: "ZONE 04 // THERMAL LAB",
    title: "Steam & Sauna",
    description: "Reset nervous system fatigue in 90°C Finnish cedar heat suites followed by 8°C cold plunge therapy.",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    specs: ["90°C Finnish Cedar", "8°C Cold Plunge", "Eucalyptus Mist"],
  },
  {
    id: "lockers",
    zone: "ZONE 05 // SANCTUARY",
    title: "Locker Suites",
    description: "Keyless RFID lockers, private hyper-sanitized rain showers, plush towels, and grooming bars.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    specs: ["Private Rain Showers", "Dyson Supersonic", "Keyless RFID"],
  },
  {
    id: "nutrition-bar",
    zone: "ZONE 06 // MACRO LAB",
    title: "Fuel & Nutrition Bar",
    description: "Cold-pressed juices, organic isolate shakes, and chef-curated high-protein meals formulated for recovery.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    specs: ["Cold-Pressed Electrolytes", "Grass-Fed Whey", "Fresh Daily Prep"],
  },
];

export function Facilities() {
  return (
    <section
      id="facilities"
      className="relative bg-[#0B0B0D] border-b border-[rgba(237,235,228,0.08)] overflow-hidden"
    >
      {/* Top Section Intro Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pt-20 md:pt-28 pb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[rgba(237,235,228,0.08)] mb-12 md:mb-16">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF3F]">
              THE FACILITY
            </span>
          </div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase text-[#EDEBE4] leading-[0.88] tracking-tight">
            Architected for Serious Work
          </h2>
        </div>

        <div className="lg:max-w-md flex flex-col justify-between gap-6">
          <p className="font-body text-base text-[#8A8F98] leading-relaxed">
            Over 22,000 square feet of competition-grade equipment, hyper-sanitized
            locker sanctuaries, and scientific recovery suites.
          </p>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#8A8F98]">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#17181B] border border-[rgba(237,235,228,0.08)]">
              <span className="text-[#D4FF3F] font-bold">22,000</span> SQ FT
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#17181B] border border-[rgba(237,235,228,0.08)]">
              <span className="text-[#D4FF3F] font-bold">HEPA 14</span> AIR PURITY
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#17181B] border border-[rgba(237,235,228,0.08)]">
              <span className="text-[#D4FF3F] font-bold">24/7</span> BIOMETRIC
            </span>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pb-24 md:pb-36">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FACILITY_ITEMS.map((facility, idx) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.6,
                delay: 0.08 * idx,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative min-h-[380px] md:min-h-[420px] rounded-[4px] overflow-hidden bg-[#17181B] border border-[rgba(237,235,228,0.08)] hover:border-[#D4FF3F] transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 select-none group shadow-xl ${facility.colSpan}`}
            >
              {/* Background Image with athletic desaturation to color bloom on hover */}
              <Image
                src={facility.image}
                alt={facility.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center img-athletic group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              />

              {/* High-contrast dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/75 to-[#0B0B0D]/25 group-hover:via-[#0B0B0D]/55 transition-colors duration-500 pointer-events-none" />

              {/* Card Top: Zone identifier & index */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#D4FF3F] bg-[#0B0B0D]/90 border border-[rgba(237,235,228,0.12)] px-2.5 py-1 rounded-[2px]">
                  {facility.zone}
                </span>

                <span className="font-mono text-3xl font-extrabold text-[#EDEBE4]/20 group-hover:text-[#D4FF3F]/40 transition-colors">
                  0{idx + 1}
                </span>
              </div>

              {/* Card Bottom: Title, description, specs */}
              <div className="relative z-10 pt-16">
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase text-[#EDEBE4] group-hover:text-[#D4FF3F] transition-colors tracking-tight mb-2">
                  {facility.title}
                </h3>
                <p className="font-body text-sm text-[#8A8F98] max-w-xl leading-relaxed mb-5 group-hover:text-[#EDEBE4]/90 transition-colors">
                  {facility.description}
                </p>

                {/* Specs Chips & Explore Arrow */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[rgba(237,235,228,0.08)]">
                  <div className="flex flex-wrap items-center gap-2">
                    {facility.specs.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-[2px] bg-[#0B0B0D]/90 border border-[rgba(237,235,228,0.08)] text-[10px] font-mono uppercase tracking-wider text-[#8A8F98] group-hover:text-[#EDEBE4] group-hover:border-[rgba(212,255,63,0.3)] transition-colors"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="w-8 h-8 rounded-[2px] bg-[#0B0B0D]/90 border border-[rgba(237,235,228,0.12)] flex items-center justify-center text-[#EDEBE4] group-hover:bg-[#D4FF3F] group-hover:text-[#0B0B0D] group-hover:border-[#D4FF3F] transition-all shrink-0">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* 7th Card: Guided VIP Facility Walkthrough */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-h-[380px] md:min-h-[420px] rounded-[4px] overflow-hidden bg-gradient-to-br from-[#17181B] via-[#121316] to-[#0B0B0D] border border-[rgba(212,255,63,0.3)] hover:border-[#D4FF3F] transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 select-none group shadow-xl col-span-1 md:col-span-2 lg:col-span-1"
          >
            {/* Ambient volt glow */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 bg-[#D4FF3F]/10 blur-3xl rounded-full group-hover:bg-[#D4FF3F]/20 transition-all duration-500" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0B0B0D] bg-[#D4FF3F] font-bold px-2.5 py-1 rounded-[2px]">
                  VIP ON-SITE PASS
                </span>
                <span className="w-2 h-2 rounded-full bg-[#D4FF3F] animate-ping" />
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#EDEBE4] tracking-tight mb-3">
                Experience It in Person
              </h3>
              <p className="font-body text-sm text-[#8A8F98] leading-relaxed mb-6">
                Book a private, guided walkthrough with a head coach. Includes body composition screening and a 1-day all-access training pass.
              </p>
            </div>

            <div>
              <div className="space-y-2 mb-6 font-mono text-xs text-[#EDEBE4]">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#D4FF3F]" />
                  <span>1-on-1 Tour with Senior Coach</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#D4FF3F]" />
                  <span>Full Day Floor & Sauna Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#D4FF3F]" />
                  <span>Complimentary Nutrition Shake</span>
                </div>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-[2px] bg-[#D4FF3F] text-[#0B0B0D] font-mono text-xs uppercase font-extrabold tracking-widest hover:bg-[#EDEBE4] transition-colors"
              >
                <span>Schedule Tour</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
