"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { FacilityModal, DetailedFacility } from "@/components/sections/FacilityModal";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";

const FACILITY_ITEMS: DetailedFacility[] = [
  {
    id: "strength-zone",
    zone: "ZONE 01 // BIOMECHANICS",
    title: "Strength Zone",
    tagline: "Calibrated Olympic platforms & precision load leverage machines",
    description:
      "Engineered for raw progressive overload and competition readiness. Features five sunken Eleiko IWF-certified Olympic lifting platforms, machined steel weight plates calibrated to within 10 grams, custom Arsenal Strength plate-loaded leverage machines, and custom urethane dumbbells ranging up to 70 KG.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    specs: ["Eleiko IWF Platforms", "Machined Steel Plates", "Urethane DBs to 70KG"],
    metrics: [
      { label: "PLATFORMS", value: "5 OLYMPIC" },
      { label: "MAX DUMBBELL", value: "70 KG" },
      { label: "BARS", value: "IWF / IPF" },
    ],
    highlights: [
      {
        title: "Eleiko Competition Barbells",
        detail: "Össur Swedish steel bars, Texas power bars, and safety squat bars with calibrated needle bearings.",
      },
      {
        title: "Sunken Acoustic Platforms",
        detail: "50mm high-density acoustic vibration dampening rubber layers preventing shock transmission.",
      },
      {
        title: "Custom Arsenal Strength Rigs",
        detail: "Biomechanical divergent convergence arcs targeting muscle bellies through complete active ROM.",
      },
      {
        title: "Micro-Load Plates",
        detail: "Fractional 0.25kg, 0.5kg, and 1.25kg steel plates for relentless progressive overload.",
      },
    ],
    protocol:
      "Chalk provided at all platforms. Drop pads mandatory on deadlifts above 220 KG. Re-racking weights to calibrated pins is an absolute standard.",
    amenities: ["Liquid Chalk Dispensers", "Belt Squat Rigs", "Specialty Grip Attachments", "Deadlift Jacks"],
  },
  {
    id: "cardio-deck",
    zone: "ZONE 02 // ENDURANCE",
    title: "Cardio Deck",
    tagline: "Skyline-facing athletic conditioning & live biometric telemetry",
    description:
      "Designed for high-output metabolic conditioning and cardiovascular capacity without the joint impact of road running. Curved non-motorized Woodway treadmills let your stride dictate resistance, while Concept2 ergometers and Wahoo smart bikes broadcast real-time telemetry to personal monitors.",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    specs: ["Woodway Curve", "Concept2 Ergometers", "Wahoo Smart Bikes"],
    metrics: [
      { label: "STATIONS", value: "18 UNITS" },
      { label: "VIEW", value: "SKYLINE" },
      { label: "TELEMETRY", value: "ANT+ / BLE" },
    ],
    highlights: [
      {
        title: "Woodway Curve Treadmills",
        detail: "Non-motorized slat-belt design recruiting 30% more glute and hamstring muscle fibers.",
      },
      {
        title: "Concept2 Erg Suite",
        detail: "RowErgs and SkiErgs equipped with PM5 performance monitors tracking power curve outputs.",
      },
      {
        title: "Wahoo KICKR Smart Bikes",
        detail: "Simulates actual gradient resistance with precision electromagnetic flywheel drag.",
      },
      {
        title: "Live Heart-Rate Broadcast",
        detail: "Sync your chest strap or Apple/Garmin watch directly to overhead telemetry screens.",
      },
    ],
    protocol:
      "Pre-program your target heart rate zones (Zone 2 aerobic base to Zone 5 VO2 max intervals) with coaching staff before endurance intervals.",
    amenities: ["Heart-Rate Strap Pairing", "High-Flow Fan Pods", "Filtered Hydration Taps", "Towel Service"],
  },
  {
    id: "recovery-lounge",
    zone: "ZONE 03 // CELLULAR RESET",
    title: "Recovery Lounge",
    tagline: "Targeted pneumatic compression, localized percussion & cellular restoration",
    description:
      "Accelerate lymphatic drainage and eliminate metabolic byproduct between training sessions. Equipped with full-leg Normatec 3 pneumatic compression boots, Hyperice venom heat wraps, Hypervolt 2 Pro percussion guns, and zero-gravity recliners positioned in low-light sound-dampened recovery pods.",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    specs: ["Normatec 3 Boots", "Hypervolt Percussion", "Zero-G Loungers"],
    metrics: [
      { label: "SESSION TIME", value: "20-30 MIN" },
      { label: "COMPRESSION", value: "7 LEVELS" },
      { label: "POD TYPE", value: "ZERO-G" },
    ],
    highlights: [
      {
        title: "Normatec 3 Leg & Arm Boots",
        detail: "7-level dynamic pulsing compression chambers mimicking natural muscle pump action.",
      },
      {
        title: "Hypervolt 2 Pro Percussion",
        detail: "QuietGlide brushless motors delivering 14mm amplitude deep tissue myofascial release.",
      },
      {
        title: "Zero-Gravity Pods",
        detail: "Ergonomic recliners positioning knees above the heart to decompress the lumbar spine.",
      },
      {
        title: "Infrared Heat Therapy",
        detail: "Targeted deep thermal pads stimulating blood flow to tight joint capsules and tendons.",
      },
    ],
    protocol:
      "Recommended 20–30 minutes immediately post-training or during deload recovery days. Disposable hygiene sleeves are provided for all compression boots.",
    amenities: ["Noise-Canceling Headphones", "Electrolyte Bar Access", "Hygiene Liners", "Binaural Audio"],
  },
  {
    id: "steam-sauna",
    zone: "ZONE 04 // THERMAL LAB",
    title: "Steam & Sauna",
    tagline: "Extreme contrast thermal therapy for autonomic nervous system reset",
    description:
      "A state-of-the-art thermal facility designed to optimize heat-shock proteins and boost cardiovascular circulation. Features a 90°C dry Finnish cedar sauna with volcanic stones, aromatic eucalyptus steam rooms, and an 8°C chilled cold plunge pool with continuous filtration.",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    specs: ["90°C Finnish Cedar", "8°C Cold Plunge", "Eucalyptus Mist"],
    metrics: [
      { label: "SAUNA HEAT", value: "90°C / 194°F" },
      { label: "COLD PLUNGE", value: "8°C / 46°F" },
      { label: "PURITY", value: "OZONE + UV" },
    ],
    highlights: [
      {
        title: "Handcrafted Finnish Cedar Sauna",
        detail: "Slow-grown Scandinavian timber heated by volcanic basalt stones for deep dry thermal stress.",
      },
      {
        title: "8°C Industrial Chilled Plunge",
        detail: "Titanium water chillers with 24/7 ozone and UV-C sterilization for anti-inflammatory contrast.",
      },
      {
        title: "Eucalyptus Aromatherapy Steam",
        detail: "100% humidity steam room misted with Tasmanian eucalyptus oil to open respiratory pathways.",
      },
      {
        title: "Thermostatic Monsoon Showers",
        detail: "High-pressure rinse showers adjacent to plunge tubs for instant thermal transitions.",
      },
    ],
    protocol:
      "Standard Contrast Protocol: 12-15 min Sauna → 2-3 min Cold Plunge → 5 min Ambient Rest (repeat 2-3 rounds). Cold rinse required before entering plunge tub.",
    amenities: ["Chilled Towels", "Thermal Bathrobes", "Mineral Salt Scrub", "Ozone Purified Water"],
  },
  {
    id: "lockers",
    zone: "ZONE 05 // SANCTUARY",
    title: "Locker Suites",
    tagline: "Private luxury enclosures, RFID security & grooming bars",
    description:
      "Transform your post-workout transition into a five-star hospitality experience. Keyless RFID-encrypted lockers with internal phone charging ports, private hyper-sanitized rain shower suites with water softening filtration, plush towels, and Dyson Supersonic styling bars.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1",
    specs: ["Private Rain Showers", "Dyson Supersonic", "Keyless RFID"],
    metrics: [
      { label: "SHOWERS", value: "PRIVATE" },
      { label: "LOCKERS", value: "RFID SECURE" },
      { label: "AMENITIES", value: "ORGANIC" },
    ],
    highlights: [
      {
        title: "Private Rain Shower Suites",
        detail: "Ceiling deluge rainheads with dual-stage water softening filters that protect hair and skin.",
      },
      {
        title: "Keyless RFID Smart Lockers",
        detail: "Assigned via wristband or phone app, featuring internal USB-C fast charging and shoe vents.",
      },
      {
        title: "Dyson Grooming Stations",
        detail: "Dyson Supersonic hair dryers, illuminated vanity mirrors, and luxury organic skincare.",
      },
      {
        title: "Continuous Sanitization",
        detail: "UV sanitizing cycles executed after each shower suite use for pristine hospital-grade hygiene.",
      },
    ],
    protocol:
      "Outdoor footwear to be exchanged for gym slides at locker threshold. Complimentary laundry service available for Elite tier members.",
    amenities: ["Plush Egyptian Cotton Towels", "Grown Alchemist Botanicals", "Shoe Shine Kit", "Steam Ironing"],
  },
  {
    id: "nutrition-bar",
    zone: "ZONE 06 // MACRO LAB",
    title: "Fuel & Nutrition Bar",
    tagline: "Bioavailable sports nutrition, cold-pressed electrolytes & chef meal prep",
    description:
      "Fuel before you train and replenish immediately after. Every smoothie and meal is formulated by our sports nutritionists with complete macronutrient transparency. Clean single-origin whey isolate, organic cold-pressed juices, and chef-curated grab-and-go meal prep designed for optimal recovery.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
    specs: ["Cold-Pressed Electrolytes", "Grass-Fed Whey", "Fresh Daily Prep"],
    metrics: [
      { label: "PROTEIN CHOICES", value: "WHEY / VEGAN" },
      { label: "PREP", value: "DAILY FRESH" },
      { label: "ESPRESSO", value: "SINGLE ORIGIN" },
    ],
    highlights: [
      {
        title: "Formulated Recovery Shakes",
        detail: "Custom post-workout shakes with precise protein-to-carb ratios and added Creapure creatine.",
      },
      {
        title: "Cold-Pressed Electrolytes",
        detail: "Raw cold-pressed citrus, ginger, and pink Himalayan salt elixirs for cellular hydration.",
      },
      {
        title: "Chef-Crafted Macro Meals",
        detail: "High-protein, micronutrient-dense prepared meals sealed fresh daily with complete calorie labeling.",
      },
      {
        title: "Pre-Workout Coffee Bar",
        detail: "Specialty single-origin espresso and cold brew roasted specifically for pre-training performance.",
      },
    ],
    protocol:
      "Order via the mobile app before your workout for instant pickup as you exit the training floor, or enjoy at the lounge counter.",
    amenities: ["Custom Macro Shakes", "Grab & Go Chiller", "Alkaline Water Tap", "Specialty Espresso"],
  },
];

export function Facilities() {
  const [selectedFacility, setSelectedFacility] = useState<DetailedFacility | null>(null);

  return (
    <section
      id="facilities"
      className="relative bg-[#0B0B0D] border-b border-[rgba(237,235,228,0.08)] overflow-hidden"
    >
      {/* Top Section Intro Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pt-14 md:pt-20 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[rgba(237,235,228,0.08)] mb-8 md:mb-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF3F]">
              THE FACILITY
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase text-[#EDEBE4] leading-[0.88] tracking-tight">
            Architected for Serious Work
          </h2>
        </div>

        <div className="lg:max-w-md flex flex-col justify-between gap-6">
          <p className="font-body text-base text-[#8A8F98] leading-relaxed">
            Over 22,000 square feet of competition-grade equipment, hyper-sanitized
            locker sanctuaries, and scientific recovery suites. Click any zone to explore full specifications.
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs text-[#8A8F98]">
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
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pb-14 md:pb-20">
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
              onClick={() => setSelectedFacility(facility)}
              className={`relative min-h-[340px] sm:min-h-[380px] md:min-h-[420px] rounded-[4px] overflow-hidden bg-[#17181B] border border-[rgba(237,235,228,0.08)] hover:border-[#D4FF3F] transition-all duration-500 flex flex-col justify-between p-5 sm:p-8 select-none group shadow-xl cursor-pointer ${facility.colSpan}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedFacility(facility);
                }
              }}
              aria-label={`Open specifications for ${facility.title}`}
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
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#D4FF3F] bg-[#0B0B0D]/90 border border-[rgba(237,235,228,0.12)] px-2.5 py-1 rounded-[2px] shadow-sm">
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
                <p className="font-body text-sm text-[#8A8F98] max-w-xl leading-relaxed mb-5 group-hover:text-[#EDEBE4]/90 transition-colors line-clamp-2 sm:line-clamp-none">
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

                  <div className="relative overflow-hidden w-8 h-8 rounded-[2px] bg-[#0B0B0D]/90 border border-[rgba(237,235,228,0.12)] flex items-center justify-center text-[#EDEBE4] group-hover:bg-[#D4FF3F] group-hover:text-[#0B0B0D] group-hover:border-[#D4FF3F] group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(212,255,63,0.45)] transition-all duration-300 shrink-0">
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 ease-out group-hover:translate-x-6 group-hover:-translate-y-6"
                    />
                    <ArrowUpRight
                      size={15}
                      className="absolute transition-transform duration-300 ease-out -translate-x-6 translate-y-6 group-hover:translate-x-0 group-hover:translate-y-0 text-[#0B0B0D]"
                    />
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
            className="relative min-h-[340px] sm:min-h-[380px] md:min-h-[420px] rounded-[4px] overflow-hidden bg-gradient-to-br from-[#17181B] via-[#121316] to-[#0B0B0D] border border-[rgba(212,255,63,0.3)] hover:border-[#D4FF3F] transition-all duration-500 flex flex-col justify-between p-5 sm:p-8 select-none group shadow-xl col-span-1 md:col-span-2 lg:col-span-1"
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
                <AnimatedArrow type="right" size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Zone Detailed Modal */}
      <FacilityModal
        facility={selectedFacility}
        onClose={() => setSelectedFacility(null)}
      />
    </section>
  );
}

export default Facilities;
