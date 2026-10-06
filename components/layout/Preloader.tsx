"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const display = "font-[family-name:var(--font-display)]";
type P = [number, number];

// 4 pairs of calibrated Olympic bumper plates
const PLATES = [
  { w: 14, h: 116, fill: "#D4FF3F", stroke: "#EDEBE4", label: "25KG" }, // innermost volt plate
  { w: 14, h: 116, fill: "#17181B", stroke: "#D4FF3F", label: "25KG" },
  { w: 12, h: 100, fill: "#17181B", stroke: "#8A8F98", label: "15KG" },
  { w: 12, h: 86,  fill: "#17181B", stroke: "#8A8F98", label: "10KG" }, // outermost plate
];

const plateX = (i: number) => 114 - 15 * i; // left sleeve position; right mirrors at 500 - x - w

/** Analytical 2-bone inverse kinematics for smooth organic elbow movement */
function solveElbow(shoulder: P, hand: P, l1: number, l2: number, isLeft: boolean): P {
  const dx = hand[0] - shoulder[0];
  const dy = hand[1] - shoulder[1];
  const d = Math.max(1, Math.min(Math.hypot(dx, dy), l1 + l2 - 0.5));
  const baseAngle = Math.atan2(dy, dx);
  const cosA = (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d);
  const angleA = Math.acos(Math.max(-1, Math.min(1, cosA)));

  const elbowAngle = isLeft ? baseAngle - angleA : baseAngle + angleA;
  return [
    shoulder[0] + l1 * Math.cos(elbowAngle),
    shoulder[1] + l1 * Math.sin(elbowAngle),
  ];
}

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  // Guarantee body scroll lock while preloader is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const finish = () => {
        document.body.style.overflow = "";
        setDone(true);
        window.dispatchEvent(new Event("preloader:done"));
      };

      const q = (s: string) => el.querySelector<SVGElement>(s);
      const num = el.querySelector<HTMLElement>(".num");
      const status = el.querySelector<HTMLElement>(".status");

      const setAttr = (n: SVGElement | null, a: Record<string, string | number>) => {
        if (!n) return;
        Object.entries(a).forEach(([k, v]) => n.setAttribute(k, String(v)));
      };

      // Animation state: y = barbell height (165 = chest rack, 58 = overhead lockout)
      // dip = knee & hip flex dip (0 = standing tall, 14 = athletic coiled dip)
      const st = { y: 165, dip: 10 };

      const updateRig = () => {
        const d = st.dip;
        const by = st.y + d;

        // Move barbell
        setAttr(q(".barbell"), { transform: `translate(0, ${by})` });

        // Shoulders sink with the dip and elevate slightly on overhead lockout
        const shoulderElevation = Math.max(0, (140 - st.y) * 0.12);
        const sL: P = [206, 172 + d - shoulderElevation];
        const sR: P = [294, 172 + d - shoulderElevation];

        // Hands grip the barbell
        const hL: P = [172, by];
        const hR: P = [328, by];

        // Solve organic elbow kinematics
        const eL = solveElbow(sL, hL, 56, 56, true);
        const eR = solveElbow(sR, hR, 56, 56, false);

        // Update arms
        setAttr(q(".upperArmL"), { x1: sL[0], y1: sL[1], x2: eL[0], y2: eL[1] });
        setAttr(q(".foreArmL"),  { x1: eL[0], y1: eL[1], x2: hL[0], y2: hL[1] });
        setAttr(q(".elbowL"),    { cx: eL[0], cy: eL[1] });
        setAttr(q(".fistL"),     { cx: hL[0], cy: hL[1] });

        setAttr(q(".upperArmR"), { x1: sR[0], y1: sR[1], x2: eR[0], y2: eR[1] });
        setAttr(q(".foreArmR"),  { x1: eR[0], y1: eR[1], x2: hR[0], y2: hR[1] });
        setAttr(q(".elbowR"),    { cx: eR[0], cy: eR[1] });
        setAttr(q(".fistR"),     { cx: hR[0], cy: hR[1] });

        // Head, neck, and traps
        const headY = 120 + d - shoulderElevation * 0.5;
        setAttr(q(".head"), { cy: headY });
        setAttr(q(".neck"), { y1: headY + 18, y2: 162 + d - shoulderElevation });

        // Muscular Torso V-taper
        const torsoD = `M 198 ${162 + d - shoulderElevation} L 302 ${162 + d - shoulderElevation} L 282 ${274 + d} L 218 ${274 + d} Z`;
        setAttr(q(".torso"), { d: torsoD });

        // Weightlifting Belt
        const beltD = `M 216 ${262 + d} L 284 ${262 + d} L 280 ${280 + d} L 220 ${280 + d} Z`;
        setAttr(q(".belt"), { d: beltD });
        setAttr(q(".beltBuckle"), { y: 266 + d });

        // Legs & knees track outward dynamically
        const hipL: P = [224, 276 + d];
        const hipR: P = [276, 276 + d];
        const kneeL: P = [204 - d * 0.5, 336 + d * 0.4];
        const kneeR: P = [296 + d * 0.5, 336 + d * 0.4];
        const footL: P = [198, 396];
        const footR: P = [302, 396];

        setAttr(q(".thighL"), { x1: hipL[0], y1: hipL[1], x2: kneeL[0], y2: kneeL[1] });
        setAttr(q(".shinL"),  { x1: kneeL[0], y1: kneeL[1], x2: footL[0], y2: footL[1] });
        setAttr(q(".kneeL"),  { cx: kneeL[0], cy: kneeL[1] });

        setAttr(q(".thighR"), { x1: hipR[0], y1: hipR[1], x2: kneeR[0], y2: kneeR[1] });
        setAttr(q(".shinR"),  { x1: kneeR[0], y1: kneeR[1], x2: footR[0], y2: footR[1] });
        setAttr(q(".kneeR"),  { cx: kneeR[0], cy: kneeR[1] });
      };

      // Initial visual setup
      updateRig();
      gsap.set(".plate", { opacity: 0 });

      // Live gradual weight counter (0 -> 100 KG)
      const kg = { v: 0 };

      const tl = gsap.timeline({
        onComplete: finish,
        onUpdate: () => {
          gsap.set(".progress-bar-fill", { scaleX: tl.progress() });
        },
      });

      const setStatusText = (t: string) => {
        tl.call(() => {
          if (status) status.textContent = t;
        });
      };

      // Continuous gradual weight increase from 0 to 100 kg across the whole routine
      tl.to(
        kg,
        {
          v: 100,
          duration: 4.5,
          ease: "power1.inOut",
          onUpdate: () => {
            if (num) num.textContent = String(Math.round(kg.v));
          },
        },
        0.1,
      );

      // Intro: Lifter approaches the bar
      setStatusText("SET UP // OLYMPIC BARBELL LOADED");
      tl.from(".fig", { opacity: 0, scale: 0.96, duration: 0.5, ease: "power2.out" }, 0);

      // Rep 1 (0 -> 25 KG)
      tl.add(() => setStatusText("REP 01 // 25 KG — EXPLOSIVE DRIVE"), 0.5);
      tl.to(st, { dip: 14, duration: 0.2, ease: "power2.in", onUpdate: updateRig }, 0.5)
        .to(st, { y: 62, dip: 0, duration: 0.4, ease: "power3.out", onUpdate: updateRig }, 0.7) // drive & lockout
        .to(st, { y: 165, dip: 8, duration: 0.35, ease: "power2.inOut", onUpdate: updateRig }, 1.15); // descent

      // Load Plate Pair 1
      tl.add(() => setStatusText("LOADING PLATES // +25 KG"), 1.35);
      tl.fromTo(".pl-0.pl-l", { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.22, ease: "power3.out" }, 1.38)
        .fromTo(".pl-0.pl-r", { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.22, ease: "power3.out" }, 1.38);

      // Rep 2 (25 -> 50 KG)
      tl.add(() => setStatusText("REP 02 // 50 KG — TENSION & CONTROL"), 1.62);
      tl.to(st, { dip: 13, duration: 0.2, ease: "power2.in", onUpdate: updateRig }, 1.62)
        .to(st, { y: 60, dip: 0, duration: 0.38, ease: "power3.out", onUpdate: updateRig }, 1.82)
        .to(st, { y: 165, dip: 8, duration: 0.35, ease: "power2.inOut", onUpdate: updateRig }, 2.22);

      // Load Plate Pair 2
      tl.add(() => setStatusText("LOADING PLATES // +25 KG"), 2.42);
      tl.fromTo(".pl-1.pl-l", { x: -75, opacity: 0 }, { x: 0, opacity: 1, duration: 0.22, ease: "power3.out" }, 2.45)
        .fromTo(".pl-1.pl-r", { x: 75, opacity: 0 }, { x: 0, opacity: 1, duration: 0.22, ease: "power3.out" }, 2.45);

      // Rep 3 (50 -> 75 KG)
      tl.add(() => setStatusText("REP 03 // 75 KG — COMPETITION STANDARD"), 2.7);
      tl.to(st, { dip: 15, duration: 0.22, ease: "power2.in", onUpdate: updateRig }, 2.7)
        .to(st, { y: 58, dip: 0, duration: 0.4, ease: "power3.out", onUpdate: updateRig }, 2.92)
        .to(st, { y: 165, dip: 8, duration: 0.35, ease: "power2.inOut", onUpdate: updateRig }, 3.35);

      // Load Plate Pair 3
      tl.add(() => setStatusText("LOADING PLATES // +25 KG"), 3.52);
      tl.fromTo(".pl-2.pl-l", { x: -70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.22, ease: "power3.out" }, 3.55)
        .fromTo(".pl-2.pl-r", { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.22, ease: "power3.out" }, 3.55);

      // Rep 4: (75 -> 100 KG MAX EFFORT)
      tl.add(() => setStatusText("REP 04 // 100 KG — MAXIMUM EFFORT LOCKOUT"), 3.8);
      tl.to(st, { dip: 16, duration: 0.24, ease: "power2.in", onUpdate: updateRig }, 3.8)
        .to(st, { y: 54, dip: 0, duration: 0.48, ease: "power3.out", onUpdate: updateRig }, 4.04);

      // Load Final Plate Pair at Lockout
      tl.fromTo(".pl-3.pl-l", { x: -65, opacity: 0 }, { x: 0, opacity: 1, duration: 0.22, ease: "power3.out" }, 4.3)
        .fromTo(".pl-3.pl-r", { x: 65, opacity: 0 }, { x: 0, opacity: 1, duration: 0.22, ease: "power3.out" }, 4.3);

      // 100 KG PR Climax Lockout & Volt Flash
      tl.call(
        () => {
          if (status) status.textContent = "100 KG — NEW PERSONAL RECORD ACHIEVED";
          if (num) {
            num.textContent = "100";
            num.style.color = "#D4FF3F";
          }
        },
        undefined,
        4.6,
      );
      tl.fromTo(".flash", { opacity: 0.4 }, { opacity: 0, duration: 0.6, ease: "power2.out" }, 4.6)
        .fromTo(".pr-badge", { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" }, 4.6)
        .to({}, { duration: 0.45 });

      // Curtains open smoothly to reveal site
      tl.to(".content-wrapper", { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" })
        .to(".curtain-top", { yPercent: -100, duration: 0.8, ease: "expo.inOut" }, "<0.08")
        .to(".curtain-bot", { yPercent: 100, duration: 0.8, ease: "expo.inOut" }, "<");
    },
    { scope: root },
  );

  const handleSkip = () => {
    document.body.style.overflow = "";
    setDone(true);
    window.dispatchEvent(new Event("preloader:done"));
  };

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] text-[#EDEBE4] select-none overflow-hidden"
      role="status"
      aria-label="Strength Loading Routine"
    >
      {/* Top & Bottom Curtains */}
      <div className="curtain-top absolute inset-x-0 top-0 h-1/2 bg-[#0B0B0D] border-b border-[rgba(237,235,228,0.08)] z-10 will-change-transform" />
      <div className="curtain-bot absolute inset-x-0 bottom-0 h-1/2 bg-[#0B0B0D] border-t border-[rgba(237,235,228,0.08)] z-10 will-change-transform" />

      {/* Volt PR Shockwave Flash */}
      <div className="flash absolute inset-0 bg-[#D4FF3F] opacity-0 pointer-events-none z-20" />

      {/* Skip Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#8A8F98] hover:text-[#D4FF3F] transition-colors px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-[2px] bg-[#17181B]/90 border border-[rgba(237,235,228,0.15)] backdrop-blur-md cursor-pointer"
      >
        SKIP [ESC]
      </button>

      {/* Main Preloader Stage Content */}
      <div className="content-wrapper absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 z-20 pointer-events-none">
        {/* Dynamic Status Eyebrow */}
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F] animate-pulse" />
          <p className="status font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[#8A8F98] text-center">
            SET UP // OLYMPIC BARBELL LOADED
          </p>
        </div>

        {/* Human Athlete SVG Stage with full explicit default geometry */}
        <svg
          className="fig h-auto w-[min(92vw,480px)] max-h-[46vh] overflow-visible"
          viewBox="0 0 500 430"
          aria-hidden="true"
        >
          {/* Platform Floor & Shadow */}
          <line x1="30" y1="400" x2="470" y2="400" stroke="#EDEBE4" strokeOpacity="0.2" strokeWidth="2" />
          <ellipse cx="250" cy="402" rx="90" ry="7" fill="#000" opacity="0.6" />

          {/* Planted Weightlifting Shoes */}
          <g fill="#17181B" stroke="#D4FF3F" strokeWidth="1.5">
            <path d="M 180 400 L 214 400 L 212 390 L 190 390 Z" />
            <line x1="180" y1="400" x2="214" y2="400" stroke="#D4FF3F" strokeWidth="3" />
            <path d="M 286 400 L 320 400 L 310 390 L 288 390 Z" />
            <line x1="286" y1="400" x2="320" y2="400" stroke="#D4FF3F" strokeWidth="3" />
          </g>

          {/* Muscular Legs with Knee Sleeves */}
          <g strokeLinecap="round" strokeLinejoin="round">
            {/* Left Leg */}
            <line className="thighL" x1="224" y1="286" x2="204" y2="340" stroke="#17181B" strokeWidth="20" />
            <line className="shinL"  x1="204" y1="340" x2="198" y2="396" stroke="#17181B" strokeWidth="17" />
            <circle className="kneeL" cx="204" cy="340" r="11" fill="#111215" stroke="#D4FF3F" strokeWidth="2" />

            {/* Right Leg */}
            <line className="thighR" x1="276" y1="286" x2="296" y2="340" stroke="#17181B" strokeWidth="20" />
            <line className="shinR"  x1="296" y1="340" x2="302" y2="396" stroke="#17181B" strokeWidth="17" />
            <circle className="kneeR" cx="296" cy="340" r="11" fill="#111215" stroke="#D4FF3F" strokeWidth="2" />
          </g>

          {/* Athletic Torso with Chest Definition */}
          <path
            className="torso"
            d="M 198 172 L 302 172 L 282 284 L 218 284 Z"
            fill="#17181B"
            stroke="#EDEBE4"
            strokeWidth="2.5"
          />

          {/* Weightlifting Belt */}
          <path
            className="belt"
            d="M 216 272 L 284 272 L 280 290 L 220 290 Z"
            fill="#0B0B0D"
            stroke="#D4FF3F"
            strokeWidth="2"
          />
          <rect className="beltBuckle" x="244" y="276" width="12" height="12" fill="#D4FF3F" rx="2" />

          {/* Head & Neck Profile */}
          <line className="neck" x1="250" y1="148" x2="250" y2="172" stroke="#EDEBE4" strokeWidth="14" strokeLinecap="round" />
          <circle className="head" cx="250" cy="130" r="21" fill="#EDEBE4" />

          {/* Muscular Arms (Deltoid -> Bicep -> Forearm with Wrist Wraps) */}
          <g strokeLinecap="round" strokeLinejoin="round">
            {/* Left Arm */}
            <line className="upperArmL" x1="206" y1="182" x2="165" y2="230" stroke="#EDEBE4" strokeWidth="16" />
            <line className="foreArmL"  x1="165" y1="230" x2="172" y2="175" stroke="#EDEBE4" strokeWidth="13" />
            <circle className="elbowL"  cx="165" cy="230" r="9" fill="#17181B" stroke="#D4FF3F" strokeWidth="2" />

            {/* Right Arm */}
            <line className="upperArmR" x1="294" y1="182" x2="335" y2="230" stroke="#EDEBE4" strokeWidth="16" />
            <line className="foreArmR"  x1="335" y1="230" x2="328" y2="175" stroke="#EDEBE4" strokeWidth="13" />
            <circle className="elbowR"  cx="335" cy="230" r="9" fill="#17181B" stroke="#D4FF3F" strokeWidth="2" />
          </g>

          {/* Olympic Barbell & Calibrated Bumper Plates */}
          <g className="barbell" transform="translate(0, 175)">
            {/* Chrome Olympic Barbell Shaft */}
            <rect x="25" y="-4" width="450" height="8" rx="2" fill="#8A8F98" />
            {/* Center Knurling Marker */}
            <rect x="244" y="-5" width="12" height="10" fill="#D4FF3F" rx="1" />
            {/* Sleeve Collar Stops */}
            <rect x="126" y="-18" width="6" height="36" fill="#EDEBE4" rx="1" />
            <rect x="368" y="-18" width="6" height="36" fill="#EDEBE4" rx="1" />

            {/* Calibrated Bumper Plates */}
            {PLATES.map((p, i) => {
              const xLeft = plateX(i);
              const xRight = 500 - xLeft - p.w;
              const yPos = -p.h / 2;

              return (
                <g key={i}>
                  {/* Left Sleeve Plate */}
                  <rect
                    className={`plate pl-${i} pl-l`}
                    x={xLeft}
                    y={yPos}
                    width={p.w}
                    height={p.h}
                    rx={3}
                    fill={p.fill}
                    stroke={p.stroke}
                    strokeWidth={2}
                  />
                  {/* Right Sleeve Plate */}
                  <rect
                    className={`plate pl-${i} pl-r`}
                    x={xRight}
                    y={yPos}
                    width={p.w}
                    height={p.h}
                    rx={3}
                    fill={p.fill}
                    stroke={p.stroke}
                    strokeWidth={2}
                  />
                </g>
              );
            })}

            {/* Quick-Release Collar Clamps */}
            <rect x="62" y="-14" width="7" height="28" fill="#D4FF3F" rx="2" />
            <rect x="431" y="-14" width="7" height="28" fill="#D4FF3F" rx="2" />
          </g>

          {/* Closed Fists Gripping Barbell */}
          <circle className="fistL" cx="172" cy="175" r="9" fill="#17181B" stroke="#D4FF3F" strokeWidth="2.5" />
          <circle className="fistR" cx="328" cy="175" r="9" fill="#17181B" stroke="#D4FF3F" strokeWidth="2.5" />
        </svg>

        {/* Live Weight Display (0 -> 100 KG) */}
        <div className="flex flex-col items-center gap-1">
          <div className={`${display} flex items-baseline gap-3 font-extrabold leading-none tabular-nums text-[#EDEBE4]`}>
            <span className="num text-[clamp(4.5rem,14vw,9.5rem)] tracking-tight transition-colors">
              0
            </span>
            <span className="text-3xl sm:text-4xl md:text-5xl text-[#8A8F98] tracking-wider">
              KG
            </span>
          </div>

          {/* PR Achievement Badge */}
          <div className="pr-badge opacity-0 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-[2px] bg-[#D4FF3F]/15 border border-[#D4FF3F] -mt-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#D4FF3F]" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#D4FF3F] font-bold text-center">
              MAX EFFORT // 100 KG PR LOCKOUT
            </span>
          </div>
        </div>

        {/* Calibrated Precision Progress Gauge */}
        <div className="h-[2px] w-[min(90vw,460px)] bg-white/10 relative overflow-hidden rounded-full">
          <div className="progress-bar-fill h-full origin-left scale-x-0 bg-[#D4FF3F] will-change-transform" />
        </div>
      </div>
    </div>
  );
}

export default Preloader;
