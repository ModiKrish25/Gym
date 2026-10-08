"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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

  const finish = useCallback(() => {
    document.body.style.overflow = "";
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("gym-preloaded", "true");
      } catch {
        // ignore storage errors
      }
      window.dispatchEvent(new Event("preloader:done"));
    }
    setDone(true);
  }, []);

  // Guarantee body scroll lock and escape key handler while preloader is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [finish]);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const q = (s: string) => el.querySelector<SVGElement>(s);
      const num = el.querySelector<HTMLElement>(".num");
      const status = el.querySelector<HTMLElement>(".status");

      const setAttr = (n: SVGElement | null, a: Record<string, string | number>) => {
        if (!n) return;
        Object.entries(a).forEach(([k, v]) => n.setAttribute(k, String(v)));
      };

      // Animation state:
      // y = barbell height (165 = chest rack, 52 = overhead lockout)
      // dip = knee & hip flex dip (0 = standing tall, 14 = athletic coiled dip)
      const st = { y: 165, dip: 8 };

      const updateRig = () => {
        const d = st.dip;
        const by = st.y + d;

        // Move barbell
        setAttr(q(".barbell"), { transform: `translate(0, ${by})` });

        // Shoulders sink with the dip and elevate slightly on overhead lockout
        const shoulderElevation = Math.max(0, (140 - st.y) * 0.14);
        const sL: P = [206, 172 + d - shoulderElevation];
        const sR: P = [294, 172 + d - shoulderElevation];

        // Hands grip the barbell
        const hL: P = [172, by];
        const hR: P = [328, by];

        // Solve organic elbow kinematics
        const eL = solveElbow(sL, hL, 56, 56, true);
        const eR = solveElbow(sR, hR, 56, 56, false);

        // Update Left Arm (muscular human anatomy)
        setAttr(q(".deltoidL"), { cx: sL[0], cy: sL[1] });
        setAttr(q(".upperArmL"), { x1: sL[0], y1: sL[1], x2: eL[0], y2: eL[1] });
        setAttr(q(".upperArmHighlightL"), { x1: sL[0], y1: sL[1], x2: eL[0], y2: eL[1] });
        setAttr(q(".elbowL"), { cx: eL[0], cy: eL[1] });
        setAttr(q(".foreArmL"), { x1: eL[0], y1: eL[1], x2: hL[0], y2: hL[1] });
        setAttr(q(".foreArmHighlightL"), { x1: eL[0], y1: eL[1], x2: hL[0], y2: hL[1] });
        setAttr(q(".wristWrapL"), { cx: hL[0], cy: hL[1] });
        setAttr(q(".fistL"), { transform: `translate(${hL[0]}, ${hL[1]})` });

        // Update Right Arm (muscular human anatomy)
        setAttr(q(".deltoidR"), { cx: sR[0], cy: sR[1] });
        setAttr(q(".upperArmR"), { x1: sR[0], y1: sR[1], x2: eR[0], y2: eR[1] });
        setAttr(q(".upperArmHighlightR"), { x1: sR[0], y1: sR[1], x2: eR[0], y2: eR[1] });
        setAttr(q(".elbowR"), { cx: eR[0], cy: eR[1] });
        setAttr(q(".foreArmR"), { x1: eR[0], y1: eR[1], x2: hR[0], y2: hR[1] });
        setAttr(q(".foreArmHighlightR"), { x1: eR[0], y1: eR[1], x2: hR[0], y2: hR[1] });
        setAttr(q(".wristWrapR"), { cx: hR[0], cy: hR[1] });
        setAttr(q(".fistR"), { transform: `translate(${hR[0]}, ${hR[1]})` });

        // Head, neck, and traps
        const headYOffset = d - shoulderElevation * 0.5;
        setAttr(q(".headGroup"), { transform: `translate(0, ${headYOffset})` });

        // Torso
        const torsoYOffset = d - shoulderElevation * 0.2;
        setAttr(q(".torsoGroup"), { transform: `translate(0, ${torsoYOffset})` });

        // Weightlifting Belt
        setAttr(q(".beltGroup"), { transform: `translate(0, ${d})` });

        // Legs & knees track outward dynamically
        const hipL: P = [224, 280 + d];
        const hipR: P = [276, 280 + d];
        const kneeLX = 204 - d * 0.5;
        const kneeLY = 338 + d * 0.4;
        const kneeRX = 296 + d * 0.5;
        const kneeRY = 338 + d * 0.4;
        const footL: P = [198, 394];
        const footR: P = [302, 394];

        setAttr(q(".thighL"), { x1: hipL[0], y1: hipL[1], x2: kneeLX, y2: kneeLY });
        setAttr(q(".thighStripeL"), { x1: hipL[0] - 3, y1: hipL[1], x2: kneeLX - 3, y2: kneeLY });
        setAttr(q(".kneeL"), { x: kneeLX - 11, y: kneeLY - 12 });
        setAttr(q(".shinL"), { x1: kneeLX, y1: kneeLY, x2: footL[0], y2: footL[1] });
        setAttr(q(".shinHighlightL"), { x1: kneeLX, y1: kneeLY, x2: footL[0], y2: footL[1] - 6 });

        setAttr(q(".thighR"), { x1: hipR[0], y1: hipR[1], x2: kneeRX, y2: kneeRY });
        setAttr(q(".thighStripeR"), { x1: hipR[0] + 3, y1: hipR[1], x2: kneeRX + 3, y2: kneeRY });
        setAttr(q(".kneeR"), { x: kneeRX - 11, y: kneeRY - 12 });
        setAttr(q(".shinR"), { x1: kneeRX, y1: kneeRY, x2: footR[0], y2: footR[1] });
        setAttr(q(".shinHighlightR"), { x1: kneeRX, y1: kneeRY, x2: footR[0], y2: footR[1] - 6 });
      };

      // Initial visual setup
      updateRig();
      gsap.set(".plate", { opacity: 0 });

      // Weight counter state (0 -> 100 KG)
      const kg = { v: 0 };

      const tl = gsap.timeline({
        onComplete: finish,
        onUpdate: () => {
          gsap.set(".progress-bar-fill", { scaleX: Math.min(1, tl.progress() / 0.82) });
        },
      });

      const setStatusText = (t: string) => {
        tl.call(() => {
          if (status) status.textContent = t;
        });
      };

      // 1. Continuous smooth counter progression from 0 to 100 KG (completes in ~1.9s)
      tl.to(
        kg,
        {
          v: 100,
          duration: 1.9,
          ease: "power1.inOut",
          onUpdate: () => {
            if (num) num.textContent = String(Math.round(kg.v));
          },
        },
        0.05,
      );

      // Intro
      setStatusText("SET UP // OLYMPIC BARBELL LOADED");
      tl.from(".fig", { opacity: 0, scale: 0.96, duration: 0.25, ease: "power2.out" }, 0);

      // Rep 1 (0 -> 25 KG)
      tl.add(() => setStatusText("REP 01 // 25 KG — EXPLOSIVE DRIVE"), 0.25);
      tl.to(st, { dip: 13, duration: 0.12, ease: "power2.in", onUpdate: updateRig }, 0.25)
        .to(st, { y: 62, dip: 0, duration: 0.22, ease: "power3.out", onUpdate: updateRig }, 0.37)
        .to(st, { y: 165, dip: 8, duration: 0.18, ease: "power2.inOut", onUpdate: updateRig }, 0.59);

      // Load Plate Pair 1
      tl.fromTo(".pl-0.pl-l", { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.15, ease: "power3.out" }, 0.65)
        .fromTo(".pl-0.pl-r", { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.15, ease: "power3.out" }, 0.65);

      // Rep 2 (25 -> 50 KG)
      tl.add(() => setStatusText("REP 02 // 50 KG — TENSION & CONTROL"), 0.75);
      tl.to(st, { dip: 13, duration: 0.12, ease: "power2.in", onUpdate: updateRig }, 0.75)
        .to(st, { y: 60, dip: 0, duration: 0.22, ease: "power3.out", onUpdate: updateRig }, 0.87)
        .to(st, { y: 165, dip: 8, duration: 0.18, ease: "power2.inOut", onUpdate: updateRig }, 1.09);

      // Load Plate Pair 2
      tl.fromTo(".pl-1.pl-l", { x: -55, opacity: 0 }, { x: 0, opacity: 1, duration: 0.15, ease: "power3.out" }, 1.15)
        .fromTo(".pl-1.pl-r", { x: 55, opacity: 0 }, { x: 0, opacity: 1, duration: 0.15, ease: "power3.out" }, 1.15);

      // Rep 3 (50 -> 75 KG)
      tl.add(() => setStatusText("REP 03 // 75 KG — COMPETITION STANDARD"), 1.25);
      tl.to(st, { dip: 15, duration: 0.13, ease: "power2.in", onUpdate: updateRig }, 1.25)
        .to(st, { y: 58, dip: 0, duration: 0.22, ease: "power3.out", onUpdate: updateRig }, 1.38)
        .to(st, { y: 165, dip: 8, duration: 0.18, ease: "power2.inOut", onUpdate: updateRig }, 1.6);

      // Load Plate Pair 3
      tl.fromTo(".pl-2.pl-l", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.15, ease: "power3.out" }, 1.65)
        .fromTo(".pl-2.pl-r", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.15, ease: "power3.out" }, 1.65);

      // Rep 4 (75 -> 100 KG MAX EFFORT OVERHEAD LOCKOUT)
      tl.add(() => setStatusText("REP 04 // 100 KG — MAXIMUM EFFORT LOCKOUT"), 1.72);
      tl.to(st, { dip: 16, duration: 0.14, ease: "power2.in", onUpdate: updateRig }, 1.72)
        .to(st, { y: 52, dip: 0, duration: 0.28, ease: "power3.out", onUpdate: updateRig }, 1.86);

      // Load Final Plate Pair at Lockout
      tl.fromTo(".pl-3.pl-l", { x: -45, opacity: 0 }, { x: 0, opacity: 1, duration: 0.14, ease: "power3.out" }, 1.95)
        .fromTo(".pl-3.pl-r", { x: 45, opacity: 0 }, { x: 0, opacity: 1, duration: 0.14, ease: "power3.out" }, 1.95);

      // 100 KG Completed Climax
      tl.call(
        () => {
          if (status) status.textContent = "100 KG — NEW PERSONAL RECORD ACHIEVED";
          if (num) {
            num.textContent = "100";
            num.style.color = "#D4FF3F";
          }
        },
        undefined,
        1.98,
      );
      tl.fromTo(".flash", { opacity: 0.35 }, { opacity: 0, duration: 0.35, ease: "power2.out" }, 1.98)
        .fromTo(".pr-badge", { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" }, 1.98);

      // 2. IMMEDIATELY AFTER 100 KG IS COMPLETED, EXIT & OPEN CURTAINS (no unnecessary lag)
      tl.to(".content-wrapper", { opacity: 0, y: -16, duration: 0.22, ease: "power2.in" }, 2.18)
        .to(".curtain-top", { yPercent: -100, duration: 0.55, ease: "expo.inOut" }, 2.22)
        .to(".curtain-bot", { yPercent: 100, duration: 0.55, ease: "expo.inOut" }, 2.22);
    },
    { scope: root },
  );

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
        onClick={finish}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 z-30 font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#8A8F98] hover:text-[#D4FF3F] transition-colors px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-[2px] bg-[#17181B]/90 border border-[rgba(237,235,228,0.15)] backdrop-blur-md cursor-pointer pointer-events-auto"
      >
        SKIP [ESC]
      </button>

      {/* Main Preloader Stage Content */}
      <div className="content-wrapper absolute inset-0 flex flex-col items-center justify-center gap-2 sm:gap-3 px-4 z-20 pointer-events-none">
        {/* Dynamic Status Eyebrow */}
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F] animate-pulse" />
          <p className="status font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.25em] text-[#8A8F98] text-center">
            SET UP // OLYMPIC BARBELL LOADED
          </p>
        </div>

        {/* Human Athlete SVG Stage */}
        <svg
          className="fig h-auto w-[min(92vw,480px)] max-h-[46vh] overflow-visible"
          viewBox="0 0 500 430"
          aria-hidden="true"
        >
          <defs>
            {/* Skin tone linear gradient for natural 3D muscle lighting */}
            <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5B28F" />
              <stop offset="60%" stopColor="#D49B74" />
              <stop offset="100%" stopColor="#BE825B" />
            </linearGradient>
            {/* Athletic singlet dark compression fabric */}
            <linearGradient id="singletGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E2026" />
              <stop offset="100%" stopColor="#101115" />
            </linearGradient>
          </defs>

          {/* Platform Floor & Shadow */}
          <line x1="30" y1="400" x2="470" y2="400" stroke="#EDEBE4" strokeOpacity="0.2" strokeWidth="2" />
          <line x1="80" y1="403" x2="420" y2="403" stroke="#8A8F98" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 6" />
          <ellipse cx="250" cy="402" rx="90" ry="7" fill="#000" opacity="0.65" />

          {/* Realistic Olympic Weightlifting Shoes (Planted firmly on platform) */}
          <g>
            {/* Left Shoe */}
            <polygon points="178,398 190,398 190,388 178,391" fill="#EDEBE4" opacity="0.9" />
            <path
              d="M 178 391 L 214 393 C 217 396 215 400 211 400 L 178 400 Z"
              fill="#17181B"
              stroke="#2A2C31"
              strokeWidth="1"
            />
            <rect x="189" y="390" width="5" height="9" fill="#D4FF3F" rx="1" />
            <line x1="178" y1="400" x2="214" y2="400" stroke="#D4FF3F" strokeWidth="2.5" />

            {/* Right Shoe */}
            <polygon points="322,398 310,398 310,388 322,391" fill="#EDEBE4" opacity="0.9" />
            <path
              d="M 322 391 L 286 393 C 283 396 285 400 289 400 L 322 400 Z"
              fill="#17181B"
              stroke="#2A2C31"
              strokeWidth="1"
            />
            <rect x="306" y="390" width="5" height="9" fill="#D4FF3F" rx="1" />
            <line x1="286" y1="400" x2="322" y2="400" stroke="#D4FF3F" strokeWidth="2.5" />
          </g>

          {/* Muscular Legs with Compression Singlet & Neoprene Knee Sleeves */}
          <g strokeLinecap="round" strokeLinejoin="round">
            {/* Left Thigh (Compression Singlet fabric) */}
            <line className="thighL" x1="224" y1="280" x2="204" y2="338" stroke="#121316" strokeWidth="24" />
            <line className="thighStripeL" x1="221" y1="280" x2="201" y2="338" stroke="#D4FF3F" strokeWidth="2.5" />

            {/* Left Calf (Athletic human skin tone with muscle contour) */}
            <line className="shinL" x1="204" y1="338" x2="198" y2="394" stroke="url(#skinGrad)" strokeWidth="18" />
            <line className="shinHighlightL" x1="204" y1="340" x2="198" y2="388" stroke="#F5CBB0" strokeWidth="3" opacity="0.5" />

            {/* Left Knee Sleeve (7mm neoprene competition sleeve) */}
            <rect className="kneeL" x="193" y="326" width="22" height="24" rx="5" fill="#17181B" stroke="#D4FF3F" strokeWidth="1.5" />

            {/* Right Thigh (Compression Singlet fabric) */}
            <line className="thighR" x1="276" y1="280" x2="296" y2="338" stroke="#121316" strokeWidth="24" />
            <line className="thighStripeR" x1="279" y1="280" x2="299" y2="338" stroke="#D4FF3F" strokeWidth="2.5" />

            {/* Right Calf (Athletic human skin tone with muscle contour) */}
            <line className="shinR" x1="296" y1="338" x2="302" y2="394" stroke="url(#skinGrad)" strokeWidth="18" />
            <line className="shinHighlightR" x1="296" y1="340" x2="302" y2="388" stroke="#F5CBB0" strokeWidth="3" opacity="0.5" />

            {/* Right Knee Sleeve (7mm neoprene competition sleeve) */}
            <rect className="kneeR" x="285" y="326" width="22" height="24" rx="5" fill="#17181B" stroke="#D4FF3F" strokeWidth="1.5" />
          </g>

          {/* Muscular Torso with Pectorals, V-Taper Lats & Singlet */}
          <g className="torsoGroup">
            {/* Singlet Body Path */}
            <path
              d="M 198 166 C 196 200 206 240 218 266 L 282 266 C 294 240 304 200 302 166 C 275 162 225 162 198 166 Z"
              fill="url(#singletGrad)"
              stroke="#262932"
              strokeWidth="1.5"
            />

            {/* Defined Pectorals (Chest Plates) */}
            <path
              d="M 206 172 C 220 172 248 174 248 194 C 248 202 230 204 212 198 C 206 188 206 178 206 172 Z"
              fill="#181A20"
              stroke="#2B2E38"
              strokeWidth="1.2"
            />
            <path
              d="M 294 172 C 280 172 252 174 252 194 C 252 202 270 204 288 198 C 294 188 294 178 294 172 Z"
              fill="#181A20"
              stroke="#2B2E38"
              strokeWidth="1.2"
            />
            {/* Sternum Center Line */}
            <line x1="250" y1="170" x2="250" y2="200" stroke="#2B2E38" strokeWidth="1.5" />

            {/* Core / Abdominal Ridges under Singlet */}
            <path d="M 238 214 Q 250 216 262 214" stroke="#262932" strokeWidth="1.5" fill="none" />
            <path d="M 239 230 Q 250 232 261 230" stroke="#262932" strokeWidth="1.5" fill="none" />
            <path d="M 241 246 Q 250 248 259 246" stroke="#262932" strokeWidth="1.5" fill="none" />
            <line x1="250" y1="200" x2="250" y2="260" stroke="#262932" strokeWidth="1.2" />

            {/* Volt Latitudinal Accent Seams (V-Taper) */}
            <path d="M 200 170 C 200 205 210 240 218 266" stroke="#D4FF3F" strokeWidth="2" fill="none" />
            <path d="M 300 170 C 300 205 290 240 282 266" stroke="#D4FF3F" strokeWidth="2" fill="none" />

            {/* Chest Emblem */}
            <text x="250" y="184" textAnchor="middle" fill="#EDEBE4" fillOpacity="0.75" fontSize="7" fontFamily="monospace" letterSpacing="2">
              GYM
            </text>
          </g>

          {/* Competition Weightlifting Belt */}
          <g className="beltGroup">
            <path
              d="M 216 262 C 235 264 265 264 284 262 L 282 282 C 265 284 235 284 218 282 Z"
              fill="#17181C"
              stroke="#D4FF3F"
              strokeWidth="1.5"
            />
            {/* Lever Buckle */}
            <rect x="243" y="266" width="14" height="12" rx="2" fill="#D4FF3F" />
            <rect x="247" y="268" width="6" height="8" rx="1" fill="#0B0B0D" />
          </g>

          {/* Human Head, Athletic Neck & Powerful Traps */}
          <g className="headGroup">
            {/* Trapezius muscles sweeping to shoulders */}
            <path
              d="M 238 135 C 230 146 214 158 206 166 L 294 166 C 286 158 270 146 262 135 Z"
              fill="url(#skinGrad)"
              stroke="#B57B58"
              strokeWidth="1"
            />

            {/* Powerful Neck */}
            <rect x="241" y="132" width="18" height="34" rx="4" fill="url(#skinGrad)" />
            <line x1="245" y1="138" x2="248" y2="164" stroke="#B57B58" strokeWidth="1.2" strokeOpacity="0.7" />
            <line x1="255" y1="138" x2="252" y2="164" stroke="#B57B58" strokeWidth="1.2" strokeOpacity="0.7" />

            {/* Ears */}
            <path d="M 229 116 C 226 114 225 120 226 125 C 227 128 230 129 231 127" fill="url(#skinGrad)" stroke="#B57B58" strokeWidth="1" />
            <path d="M 271 116 C 274 114 275 120 274 125 C 273 128 270 129 269 127" fill="url(#skinGrad)" stroke="#B57B58" strokeWidth="1" />

            {/* Head Silhouette with Chiseled Jawline */}
            <path
              d="M 233 112 C 233 97 267 97 267 112 C 267 124 263 134 257 140 C 254 143 246 143 243 140 C 237 134 233 124 233 112 Z"
              fill="url(#skinGrad)"
              stroke="#B57B58"
              strokeWidth="1"
            />

            {/* Athletic Tapered Haircut */}
            <path
              d="M 232 112 C 232 94 268 94 268 112 C 268 106 264 101 250 101 C 236 101 232 106 232 112 Z"
              fill="#181A1F"
            />

            {/* Focused Eyebrows in High Concentration */}
            <path d="M 238 117 Q 244 116 248 119" stroke="#181A1F" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 262 117 Q 256 116 252 119" stroke="#181A1F" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Eyes looking upward toward the barbell */}
            <path d="M 239 121 Q 243 119 247 122" stroke="#2A2C31" strokeWidth="1.5" fill="none" />
            <path d="M 261 121 Q 257 119 253 122" stroke="#2A2C31" strokeWidth="1.5" fill="none" />
            <circle cx="243.5" cy="120.5" r="1" fill="#181A1F" />
            <circle cx="256.5" cy="120.5" r="1" fill="#181A1F" />

            {/* Nose Bridge */}
            <path d="M 250 120 L 250 127 L 252 128" stroke="#B57B58" strokeWidth="1.4" fill="none" strokeLinecap="round" />

            {/* Determined Clenched Mouth & Chin Contour */}
            <path d="M 245 133 Q 250 132 255 133" stroke="#945E3D" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 247 137 Q 250 138 253 137" stroke="#B57B58" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          </g>

          {/* Muscular Human Arms with Natural Kinematics, Sleeves & Wraps */}
          <g strokeLinecap="round" strokeLinejoin="round">
            {/* Left Arm: Deltoid -> Bicep -> Elbow Sleeve -> Forearm -> Wrist Wrap */}
            <circle className="deltoidL" cx="206" cy="172" r="14" fill="url(#skinGrad)" stroke="#B57B58" strokeWidth="1" />
            <line className="upperArmL" x1="206" y1="172" x2="165" y2="230" stroke="url(#skinGrad)" strokeWidth="18" />
            <line className="upperArmHighlightL" x1="206" y1="172" x2="165" y2="230" stroke="#F5CBB0" strokeWidth="3" opacity="0.5" />
            <circle className="elbowL" cx="165" cy="230" r="11" fill="#17181B" stroke="#D4FF3F" strokeWidth="2" />
            <line className="foreArmL" x1="165" y1="230" x2="172" y2="175" stroke="url(#skinGrad)" strokeWidth="15" />
            <line className="foreArmHighlightL" x1="165" y1="230" x2="172" y2="175" stroke="#F5CBB0" strokeWidth="2.5" opacity="0.5" />
            <circle className="wristWrapL" cx="172" cy="175" r="9" fill="#17181B" stroke="#D4FF3F" strokeWidth="2" />

            {/* Right Arm: Deltoid -> Bicep -> Elbow Sleeve -> Forearm -> Wrist Wrap */}
            <circle className="deltoidR" cx="294" cy="172" r="14" fill="url(#skinGrad)" stroke="#B57B58" strokeWidth="1" />
            <line className="upperArmR" x1="294" y1="172" x2="335" y2="230" stroke="url(#skinGrad)" strokeWidth="18" />
            <line className="upperArmHighlightR" x1="294" y1="172" x2="335" y2="230" stroke="#F5CBB0" strokeWidth="3" opacity="0.5" />
            <circle className="elbowR" cx="335" cy="230" r="11" fill="#17181B" stroke="#D4FF3F" strokeWidth="2" />
            <line className="foreArmR" x1="335" y1="230" x2="328" y2="175" stroke="url(#skinGrad)" strokeWidth="15" />
            <line className="foreArmHighlightR" x1="335" y1="230" x2="328" y2="175" stroke="#F5CBB0" strokeWidth="2.5" opacity="0.5" />
            <circle className="wristWrapR" cx="328" cy="175" r="9" fill="#17181B" stroke="#D4FF3F" strokeWidth="2" />
          </g>

          {/* Olympic Barbell & Calibrated Bumper Plates */}
          <g className="barbell" transform="translate(0, 173)">
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

          {/* Clenched Human Fists with Fingers Hook-Gripped Around the Barbell */}
          <g className="fistL" transform="translate(172, 173)">
            <ellipse cx="0" cy="0" rx="8" ry="7" fill="url(#skinGrad)" stroke="#B57B58" strokeWidth="1" />
            <rect x="-6" y="-5" width="12" height="4" rx="2" fill="#BE825B" />
            <line x1="-3" y1="-5" x2="-3" y2="-1" stroke="#945E3D" strokeWidth="1" />
            <line x1="0" y1="-5" x2="0" y2="-1" stroke="#945E3D" strokeWidth="1" />
            <line x1="3" y1="-5" x2="3" y2="-1" stroke="#945E3D" strokeWidth="1" />
            <path d="M -4 2 Q 0 5 4 2" stroke="#B57B58" strokeWidth="1.5" fill="none" />
          </g>

          <g className="fistR" transform="translate(328, 173)">
            <ellipse cx="0" cy="0" rx="8" ry="7" fill="url(#skinGrad)" stroke="#B57B58" strokeWidth="1" />
            <rect x="-6" y="-5" width="12" height="4" rx="2" fill="#BE825B" />
            <line x1="-3" y1="-5" x2="-3" y2="-1" stroke="#945E3D" strokeWidth="1" />
            <line x1="0" y1="-5" x2="0" y2="-1" stroke="#945E3D" strokeWidth="1" />
            <line x1="3" y1="-5" x2="3" y2="-1" stroke="#945E3D" strokeWidth="1" />
            <path d="M -4 2 Q 0 5 4 2" stroke="#B57B58" strokeWidth="1.5" fill="none" />
          </g>
        </svg>

        {/* Live Weight Display (0 -> 100 KG) */}
        <div className="flex flex-col items-center gap-0.5 sm:gap-1">
          <div className={`${display} flex items-baseline gap-2 sm:gap-3 font-extrabold leading-none tabular-nums text-[#EDEBE4]`}>
            <span className="num text-[clamp(4rem,13vw,8.5rem)] tracking-tight transition-colors">
              0
            </span>
            <span className="text-2xl sm:text-3xl md:text-4xl text-[#8A8F98] tracking-wider">
              KG
            </span>
          </div>

          {/* PR Achievement Badge */}
          <div className="pr-badge opacity-0 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-[2px] bg-[#D4FF3F]/15 border border-[#D4FF3F] -mt-1 sm:-mt-2 mb-1">
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
