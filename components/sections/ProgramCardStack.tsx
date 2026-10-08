"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import {
  Dumbbell,
  Flame,
  Activity,
  Zap,
  Clock,
  CheckCircle2,
  Calendar,
  UserCheck,
  Shield,
  Layers,
} from "lucide-react";
import { KettlebellIcon, PowerCageIcon } from "@/components/ui/GymIcons";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";

export interface DetailedProgramItem {
  id: string;
  index: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All levels";
  duration: string;
  frequency: string;
  intensity: string;
  coach: {
    name: string;
    role: string;
    avatar: string;
  };
  equipment: string[];
  blueprint: { phase: string; name: string; time: string; detail: string }[];
  outcomes: string[];
  image: string;
}

export const DETAILED_PROGRAMS: DetailedProgramItem[] = [
  {
    id: "strength",
    index: "01",
    title: "Strength Training",
    category: "PROGRESSIVE OVERLOAD ARCHITECTURE",
    tagline: "Calibrated compound lifts & neuromuscular hypertrophy",
    description:
      "Structured barbell and machine programming engineered to build raw neuromuscular strength and dense lean muscle tissue. Utilizing calibrated percentages of 1RM, auto-regulation, and clinical progressive overload to shatter strength plateaus safely.",
    level: "Intermediate",
    duration: "60 min",
    frequency: "3–4 Sessions / Week",
    intensity: "HIGH // RPE 8–9",
    coach: {
      name: "Aarav Mehta",
      role: "Head Strength Coach",
      avatar: "/images/athletic/coach-aarav.jpg",
    },
    equipment: ["Eleiko IWF Platforms", "Machined Steel Discs", "Arsenal Strength Leverage Rigs", "Texas Power Bars"],
    blueprint: [
      {
        phase: "PHASE 01",
        name: "CNS Activation & Joint Prep",
        time: "10 min",
        detail: "Thoracic mobility, hip capsule flossing, and empty-bar neuromuscular priming sets.",
      },
      {
        phase: "PHASE 02",
        name: "Primary Compound Overload",
        time: "30 min",
        detail: "Squat, Bench, Deadlift, or Overhead Press at wave-loaded percentages with auto-regulated rest.",
      },
      {
        phase: "PHASE 03",
        name: "Antagonist Hypertrophy Sets",
        time: "15 min",
        detail: "Plate-loaded machines and dumbbell rows targeting stabilizers and muscular balance.",
      },
      {
        phase: "PHASE 04",
        name: "Spinal Decompression & Recovery",
        time: "5 min",
        detail: "Reverse hyper extensions, hanging traction, and parasympathetic breath reset.",
      },
    ],
    outcomes: [
      "Measurable 1RM strength gain across core compound movements",
      "Dense muscular hypertrophy without empty volume",
      "Enhanced joint integrity and ligament resilience",
      "Comprehensive biomechanical movement screening",
    ],
    image: "/images/athletic/barbell-dark-gym.jpg",
  },
  {
    id: "fat-loss",
    index: "02",
    title: "Fat Loss Lab",
    category: "METABOLIC CONDITIONING & EPOC",
    tagline: "High-density resistance intervals & body composition optimization",
    description:
      "Combines targeted resistance training with high-density metabolic work to maximize EPOC (Excess Post-Exercise Oxygen Consumption) while strictly preserving lean muscle mass. Paired with weekly bioimpedance scans and macro nutrition protocols.",
    level: "Beginner",
    duration: "45 min",
    frequency: "4–5 Sessions / Week",
    intensity: "MODERATE–HIGH // ZONE 3–4",
    coach: {
      name: "Sana Kapoor",
      role: "Nutrition & Metabolic Lead",
      avatar: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop",
    },
    equipment: ["Woodway Curves", "SkiErgs", "Dumbbell Complexes", "Bioimpedance Medical Scanners"],
    blueprint: [
      {
        phase: "PHASE 01",
        name: "Metabolic Primer & Core Bracing",
        time: "8 min",
        detail: "Dynamic core activation, glute medius band work, and progressive heart-rate elevation.",
      },
      {
        phase: "PHASE 02",
        name: "High-Density Compound Complexes",
        time: "25 min",
        detail: "Timed density blocks combining multi-joint dumbbell lifts with non-impact cardio bursts.",
      },
      {
        phase: "PHASE 03",
        name: "Aerobic Flush & Lactate Clearance",
        time: "12 min",
        detail: "Zone 2 cyclical flushing on curved treadmills to speed recovery and burn free fatty acids.",
      },
    ],
    outcomes: [
      "Accelerated visceral and subcutaneous fat reduction",
      "Lean muscle mass preservation during calorie deficits",
      "Weekly medical-grade body composition scan audits",
      "Sustainable nutrition habits & meal pacing templates",
    ],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "functional",
    index: "03",
    title: "Functional Fitness",
    category: "ATHLETIC LONGEVITY & CAPACITY",
    tagline: "Multi-planar resilience, carry stamina & explosive power",
    description:
      "Move better, resist fatigue, and build a body that performs flawlessly outside the gym. Emphasizes foundational human movement patterns: squatting, hinging, carrying heavy loads, and rotating through full 3D planes of motion.",
    level: "All levels",
    duration: "50 min",
    frequency: "3–4 Sessions / Week",
    intensity: "DYNAMIC // VARIABLE LOAD",
    coach: {
      name: "Kabir Nair",
      role: "Performance & Functional Coach",
      avatar: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop",
    },
    equipment: ["Cast-Iron Kettlebells", "Heavy Sandbags", "Prowler Sleds", "Suspension Olympic Rings"],
    blueprint: [
      {
        phase: "PHASE 01",
        name: "Foot Mechanics & Hip Unlocking",
        time: "10 min",
        detail: "Barefoot ankle dorsiflexion, hip 90/90 flows, and scapular wall slides.",
      },
      {
        phase: "PHASE 02",
        name: "Rotational & Carry Complexes",
        time: "28 min",
        detail: "Heavy suitcase carries, double kettlebell cleans, sandbag to shoulder, and sled drags.",
      },
      {
        phase: "PHASE 03",
        name: "Grip & Core Capacity Finisher",
        time: "12 min",
        detail: "Farmer's walks and ring body saws for unbreakable real-world core strength.",
      },
    ],
    outcomes: [
      "Substantial increase in everyday work capacity and stamina",
      "Unshakable core stability and rotational anti-flexion power",
      "Elimination of chronic lower back and postural stiffness",
      "Transfers directly to outdoor athletics, sports, and life",
    ],
    image: "/images/athletic/kettlebell-close.jpg",
  },
  {
    id: "yoga",
    index: "04",
    title: "Yoga & Mobility",
    category: "RESTORATIVE LONGEVITY & FRC",
    tagline: "Active joint mobility, nervous system regulation & fascia release",
    description:
      "Counteract the compression of heavy strength training and sedentary daily life. Combines Functional Range Conditioning (FRC), active joint mobility, and restorative breath-driven vinyasa yoga to unlock hip, shoulder, and spinal longevity.",
    level: "All levels",
    duration: "60 min",
    frequency: "2–3 Sessions / Week",
    intensity: "CONTROLLED // LOW IMPACT",
    coach: {
      name: "Riya Shah",
      role: "Mobility & Yoga Lead (RYT-500)",
      avatar: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop",
    },
    equipment: ["Organic Cork Mats", "High-Density Foam Rollers", "Mobility Bands", "Therapy Lacrosse Balls"],
    blueprint: [
      {
        phase: "PHASE 01",
        name: "Parasympathetic Downregulation",
        time: "10 min",
        detail: "Coherent box breathing to calm the sympathetic nervous system and reduce cortisol.",
      },
      {
        phase: "PHASE 02",
        name: "FRC Active Joint Rotations (CARs)",
        time: "35 min",
        detail: "Active end-range isometric loading for shoulders, hips, and thoracic spine segments.",
      },
      {
        phase: "PHASE 03",
        name: "Deep Fascial Opening & Savasana",
        time: "15 min",
        detail: "Passive decompression holds with guided somatic awareness for total systemic reset.",
      },
    ],
    outcomes: [
      "Permanent expansion of active, usable joint range of motion",
      "Rapid reduction in resting muscle tension and stiffness",
      "Enhanced parasympathetic recovery between heavy training days",
      "Improved posture, respiratory diaphragm expansion, and sleep quality",
    ],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "hiit",
    index: "05",
    title: "HIIT Ignite",
    category: "ANAEROBIC THRESHOLD & VO2 MAX",
    tagline: "Surgical high-intensity intervals with live telemetry monitoring",
    description:
      "Short, explosive intervals engineered to push your anaerobic threshold and elevate cardiovascular power. Every athlete is monitored with live biometric heart-rate telemetry to ensure work-to-rest ratios are calculated with sports science accuracy.",
    level: "Advanced",
    duration: "30 min",
    frequency: "2–3 Sessions / Week",
    intensity: "MAXIMUM EFFORT // ZONE 5",
    coach: {
      name: "Kabir Nair",
      role: "Performance & HIIT Coach",
      avatar: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop",
    },
    equipment: ["Concept2 RowErgs & SkiErgs", "Rogue Echo Air Bikes", "Heavy Slam Balls", "Heart-Rate Telemetry"],
    blueprint: [
      {
        phase: "PHASE 01",
        name: "Dynamic Cardiovascular Warmup",
        time: "5 min",
        detail: "Progressive heart-rate ramp through Zone 1 to Zone 3 with joint dynamic mobilization.",
      },
      {
        phase: "PHASE 02",
        name: "Tabata & Anaerobic Sprint Intervals",
        time: "20 min",
        detail: "20 seconds maximum output / 10 seconds active flush across assault bikes, rowers, and slam balls.",
      },
      {
        phase: "PHASE 03",
        name: "Heart-Rate Recovery Test",
        time: "5 min",
        detail: "Coached 60-second HR drop evaluation to measure autonomic recovery efficiency.",
      },
    ],
    outcomes: [
      "Rapid elevation of VO2 max and anaerobic cardiovascular capacity",
      "Maximized caloric burn with prolonged metabolic afterburn",
      "Superior mental toughness and fatigue tolerance under pressure",
      "Quantifiable heart-rate recovery rate improvements",
    ],
    image: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "personal",
    index: "06",
    title: "Personal Coaching",
    category: "BESPOKE PRIVATE PROGRAMMING",
    tagline: "One-on-one customized coaching engineered entirely around you",
    description:
      "The ultimate individual training experience. Every movement, set, and recovery protocol is tailored to your distinct skeletal leverage, injury history, schedule, and performance targets with dedicated one-on-one coach guidance.",
    level: "All levels",
    duration: "60 min",
    frequency: "Bespoke Scheduling",
    intensity: "INDIVIDUALIZED // AUTO-REGULATED",
    coach: {
      name: "Dedicated Senior Coach",
      role: "Personal Movement Specialist",
      avatar: "/images/athletic/chalk-hands.jpg",
    },
    equipment: ["Private Coaching Platform", "Dedicated Arsenal Setup", "Full Facility Priority Access"],
    blueprint: [
      {
        phase: "PHASE 01",
        name: "Biometric Readiness & Movement Audit",
        time: "5 min",
        detail: "Assessment of daily HRV, joint mobility restrictions, and energy readiness score.",
      },
      {
        phase: "PHASE 02",
        name: "Guided Custom Training Session",
        time: "45 min",
        detail: "1-on-1 instruction with micro form corrections, forced eccentric tempos, and progressive load.",
      },
      {
        phase: "PHASE 03",
        name: "Assisted PNF Stretching & Weekly Review",
        time: "10 min",
        detail: "Manual therapist-assisted stretching, nutrition check-in, and weekly goal calibration.",
      },
    ],
    outcomes: [
      "Customized programming matching your exact biomechanics and goals",
      "Rapid form perfection and injury mitigation under professional eyes",
      "Dedicated nutrition pacing, body scans, and 24/7 direct coach support",
      "Flexible private booking scheduled completely around your calendar",
    ],
    image: "/images/athletic/chalk-hands.jpg",
  },
];

function ProgramStackCard({
  program,
  index,
  total,
}: {
  program: DetailedProgramItem;
  index: number;
  total: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const isLast = index === total - 1;

  // 3D Peeling & Stacking motion values
  // As this card is scrolled past:
  // - scale drops down
  // - rotateX tilts backward into 3D space (-6deg)
  // - subtle upward elevation y (-20px)
  // - overlayOpacity dims (0 -> 0.45)
  const targetScale = 1 - (total - index - 1) * 0.035;

  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : targetScale]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : -6]);
  const y = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : -20]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.75], [0, isLast ? 0 : 0.45]);

  const topOffset = `calc(5.5rem + ${index * 24}px)`;

  return (
    <div
      ref={containerRef}
      id={program.id}
      className={`relative w-full ${
        isLast ? "min-h-[640px] mb-12 sm:mb-16" : "h-[90vh] sm:h-[100vh] lg:h-[105vh]"
      } scroll-mt-28`}
    >
      <div
        style={{
          top: topOffset,
          zIndex: index + 1,
        }}
        className="sticky w-full [perspective:1200px]"
      >
        <motion.div
          style={{
            scale,
            rotateX,
            y,
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
          className="relative rounded-[6px] overflow-hidden bg-[#17181B] border border-[rgba(237,235,228,0.12)] hover:border-[#D4FF3F] shadow-[0_24px_50px_rgba(0,0,0,0.85)] transition-colors duration-300 group will-change-transform"
        >
          {/* Dimming depth overlay as subsequent cards stack over this one */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="pointer-events-none absolute inset-0 bg-[#0B0B0D] z-20"
          />

        {/* Ambient Top Glow on Hover */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4FF3F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />

        {/* Stack Header Bar (Always visible as cards stack over each other) */}
        <div className="bg-[#121316] border-b border-[rgba(237,235,228,0.08)] px-5 sm:px-8 py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-3 select-none">
          {/* Index & Discipline Category */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm sm:text-base font-black text-[#D4FF3F] bg-[#0B0B0D] border border-[rgba(237,235,228,0.15)] px-2.5 py-0.5 rounded-[2px]">
              {program.index} // 0{total}
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-[1px] bg-[#D4FF3F]" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8A8F98]">
                {program.category}
              </span>
            </div>
          </div>

          {/* Badges: Level & Duration */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-2.5 py-1 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.1)] text-[#EDEBE4] uppercase font-bold text-[10px] sm:text-xs">
              {program.level}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.1)] text-[#D4FF3F] text-[10px] sm:text-xs">
              <Clock size={12} />
              <span>{program.duration}</span>
            </span>
          </div>
        </div>

        {/* Main Card Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 p-5 sm:p-8 md:p-10">
          {/* Left Column: Title, Tagline, Description, Blueprint, Outcomes (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Program Title & Icon */}
              <div className="flex items-center gap-3.5 mb-2.5">
                <div className="w-10 h-10 rounded-[3px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.15)] flex items-center justify-center text-[#D4FF3F] shrink-0">
                  {program.id === "strength" && <Dumbbell size={20} />}
                  {program.id === "fat-loss" && <Flame size={20} />}
                  {program.id === "functional" && <KettlebellIcon className="w-5 h-5" />}
                  {program.id === "yoga" && <Activity size={20} />}
                  {program.id === "hiit" && <Zap size={20} />}
                  {program.id === "personal" && <PowerCageIcon className="w-5 h-5" />}
                </div>

                <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase text-[#EDEBE4] tracking-tight group-hover:text-[#D4FF3F] transition-colors">
                  {program.title}
                </h3>
              </div>

              {/* Tagline */}
              <p className="font-mono text-xs uppercase tracking-wider text-[#D4FF3F] mb-3">
                // {program.tagline}
              </p>

              {/* Description */}
              <p className="font-body text-sm sm:text-base text-[#8A8F98] leading-relaxed mb-6">
                {program.description}
              </p>

              {/* Session Blueprint / Curriculum Phases */}
              <div className="p-4 sm:p-5 rounded-[3px] bg-[#121316] border border-[rgba(237,235,228,0.06)] mb-6">
                <div className="flex items-center justify-between border-b border-[rgba(237,235,228,0.06)] pb-2.5 mb-3.5">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#EDEBE4] flex items-center gap-2">
                    <Layers size={13} className="text-[#D4FF3F]" />
                    CALIBRATED SESSION BLUEPRINT
                  </span>
                  <span className="font-mono text-[10px] text-[#8A8F98]">
                    TOTAL: {program.duration}
                  </span>
                </div>

                <div className="space-y-3">
                  {program.blueprint.map((phase, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 text-xs font-mono"
                    >
                      <div className="flex items-center gap-2 sm:w-1/3 shrink-0">
                        <span className="text-[#D4FF3F] font-bold text-[10px]">
                          {phase.phase}
                        </span>
                        <span className="text-[#EDEBE4] font-semibold">
                          {phase.name}
                        </span>
                      </div>
                      <p className="font-body text-xs text-[#8A8F98] flex-1">
                        {phase.detail}
                      </p>
                      <span className="text-[#8A8F98] text-[10px] shrink-0 sm:text-right font-mono">
                        {phase.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Measurable Outcomes */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-widest text-[#8A8F98] mb-3 flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#D4FF3F]" />
                  PROGRAMMED DELIVERABLES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {program.outcomes.map((outcome, oIdx) => (
                    <div
                      key={oIdx}
                      className="flex items-start gap-2 p-2.5 rounded-[2px] bg-[#0B0B0D]/60 border border-[rgba(237,235,228,0.04)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-[1px] bg-[#D4FF3F] mt-1.5 shrink-0" />
                      <span className="font-body text-xs text-[#EDEBE4]/90">
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[rgba(237,235,228,0.08)] flex flex-wrap items-center justify-between gap-4">
              {/* Assigned Coach Pill */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[2px] overflow-hidden bg-[#0B0B0D] border border-[rgba(237,235,228,0.15)] relative shrink-0">
                  <Image
                    src={program.coach.avatar}
                    alt={program.coach.name}
                    fill
                    sizes="40px"
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#8A8F98] block">
                    LEAD PROGRAM COACH
                  </span>
                  <span className="font-mono text-xs font-bold text-[#EDEBE4]">
                    {program.coach.name}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Link
                  href="/classes"
                  className="px-4 py-2.5 rounded-[2px] border border-[rgba(237,235,228,0.15)] text-[#EDEBE4] hover:border-[#D4FF3F] hover:text-[#D4FF3F] font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  View Schedule
                </Link>

                <Link
                  href="/pricing"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-[2px] bg-[#D4FF3F] text-[#0B0B0D] font-mono text-xs uppercase font-extrabold tracking-widest hover:bg-[#EDEBE4] transition-colors"
                >
                  <span>Enroll In Program</span>
                  <AnimatedArrow type="right" size={13} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Specs Dashboard (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            {/* High-Contrast Photo Container */}
            <div className="relative h-64 sm:h-80 lg:h-96 w-full rounded-[3px] overflow-hidden border border-[rgba(237,235,228,0.1)] group/img">
              <Image
                src={program.image}
                alt={program.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center img-athletic group-hover/img:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17181B] via-transparent to-transparent opacity-80" />

              {/* Floating Intensity Badge */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-[2px] bg-[#0B0B0D]/90 border border-[rgba(237,235,228,0.15)] backdrop-blur-md">
                <span className="font-mono text-[10px] text-[#8A8F98] uppercase tracking-widest block">
                  INTENSITY
                </span>
                <span className="font-mono text-xs font-bold text-[#D4FF3F]">
                  {program.intensity}
                </span>
              </div>

              {/* Floating Frequency Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-[2px] bg-[#0B0B0D]/90 border border-[rgba(237,235,228,0.12)] backdrop-blur-md flex items-center justify-between">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#8A8F98] block">
                    RECOMMENDED FREQUENCY
                  </span>
                  <span className="font-mono text-xs font-bold text-[#EDEBE4]">
                    {program.frequency}
                  </span>
                </div>
                <div className="w-7 h-7 rounded-[2px] bg-[#D4FF3F]/15 border border-[#D4FF3F] flex items-center justify-center text-[#D4FF3F]">
                  <Calendar size={14} />
                </div>
              </div>
            </div>

            {/* Hardware & Equipment Used */}
            <div className="p-4 rounded-[3px] bg-[#121316] border border-[rgba(237,235,228,0.06)]">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#8A8F98] block mb-2.5">
                HARDWARE & APPARATUS DEPLOYED
              </span>
              <div className="flex flex-wrap gap-1.5">
                {program.equipment.map((eq, eqIdx) => (
                  <span
                    key={eqIdx}
                    className="px-2.5 py-1 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.08)] font-mono text-[10px] text-[#EDEBE4]"
                  >
                    {eq}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
  );
}

export function ProgramCardStack() {
  const [activeId, setActiveId] = useState<string>("strength");

  // Track active visible program in the card stack
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: "-15% 0px -50% 0px" }
    );

    DETAILED_PROGRAMS.forEach((p) => {
      const el = document.getElementById(p.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full">
      {/* Quick Jump Bar with Live Active Tracker */}
      <div className="mb-10 pb-4 pt-2 border-b border-[rgba(237,235,228,0.08)] overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 sm:gap-3 min-w-max px-1">
          <span className="font-mono text-xs text-[#8A8F98] uppercase tracking-widest mr-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#D4FF3F]" />
            JUMP TO:
          </span>
          {DETAILED_PROGRAMS.map((p) => {
            const isActive = activeId === p.id;
            return (
              <a
                key={p.id}
                href={`#${p.id}`}
                className={`px-3 py-1.5 rounded-[2px] font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 shrink-0 border ${
                  isActive
                    ? "bg-[#D4FF3F] text-[#0B0B0D] border-[#D4FF3F] font-bold shadow-[0_0_12px_rgba(212,255,63,0.3)]"
                    : "bg-[#17181B] border-[rgba(237,235,228,0.1)] hover:border-[#D4FF3F] hover:text-[#D4FF3F] text-[#EDEBE4]"
                }`}
              >
                <span className={isActive ? "text-[#0B0B0D] font-black" : "text-[#D4FF3F] font-bold"}>
                  {p.index}
                </span>
                <span>{p.title}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* The 3D Peeling Stacked Cards Stream */}
      <div className="relative pb-24">
        {DETAILED_PROGRAMS.map((program, idx) => (
          <ProgramStackCard
            key={program.id}
            program={program}
            index={idx}
            total={DETAILED_PROGRAMS.length}
          />
        ))}
      </div>
    </div>
  );
}

export default ProgramCardStack;
