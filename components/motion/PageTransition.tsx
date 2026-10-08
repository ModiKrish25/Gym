"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Calibrated 25KG Olympic Bumper Plate SVG
 */
function OlympicPlate({
  color,
  className = "",
}: {
  color: "bone" | "lime";
  className?: string;
}) {
  const isBone = color === "bone";
  const mainColor = isBone ? "#EDEBE4" : "#D4FF3F";
  const contrastColor = isBone ? "#17181B" : "#0B0B0D";
  const grooveColor = isBone ? "#D1CFC7" : "#B8E328";

  // 24 radial knurl notches around circumference for visible rolling rotation
  const ticks = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i * 360) / 24;
    const rad = (angle * Math.PI) / 180;
    const x1 = 200 + 170 * Math.cos(rad);
    const y1 = 200 + 170 * Math.sin(rad);
    const x2 = 200 + 188 * Math.cos(rad);
    const y2 = 200 + 188 * Math.sin(rad);
    return { x1, y1, x2, y2, angle };
  });

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer shadow rim */}
      <circle cx="200" cy="200" r="196" fill={contrastColor} />

      {/* Main Calibrated Bumper Disc */}
      <circle cx="200" cy="200" r="190" fill={mainColor} />

      {/* Outer Groove */}
      <circle
        cx="200"
        cy="200"
        r="168"
        stroke={grooveColor}
        strokeWidth="6"
        fill="none"
      />

      {/* Radial knurl notches along perimeter */}
      {ticks.map((t, idx) => (
        <line
          key={idx}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={contrastColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      ))}

      {/* Inner Recessed Groove */}
      <circle
        cx="200"
        cy="200"
        r="134"
        stroke={grooveColor}
        strokeWidth="4"
        fill="none"
      />
      <circle
        cx="200"
        cy="200"
        r="128"
        stroke={contrastColor}
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="6 6"
      />

      {/* Top Stamped Brand */}
      <text
        x="200"
        y="108"
        textAnchor="middle"
        fill={contrastColor}
        fontSize="26"
        fontWeight="900"
        fontFamily="var(--font-display), Impact, sans-serif"
        letterSpacing="0.1em"
      >
        GYM
      </text>

      {/* Bottom Stamped Weight */}
      <text
        x="200"
        y="312"
        textAnchor="middle"
        fill={contrastColor}
        fontSize="22"
        fontWeight="800"
        fontFamily="var(--font-mono), monospace"
        letterSpacing="0.15em"
      >
        25 KG
      </text>

      {/* Left Spec */}
      <text
        x="98"
        y="206"
        textAnchor="middle"
        fill={contrastColor}
        fontSize="11"
        fontWeight="700"
        fontFamily="var(--font-mono), monospace"
        letterSpacing="0.2em"
        transform="rotate(-90 98 206)"
      >
        OLYMPIC
      </text>

      {/* Right Spec */}
      <text
        x="302"
        y="206"
        textAnchor="middle"
        fill={contrastColor}
        fontSize="11"
        fontWeight="700"
        fontFamily="var(--font-mono), monospace"
        letterSpacing="0.2em"
        transform="rotate(90 302 206)"
      >
        CALIBRATED
      </text>

      {/* Steel Collar Hub */}
      <circle cx="200" cy="200" r="54" fill="#17181B" stroke="#2A2C31" strokeWidth="3" />
      <circle cx="200" cy="200" r="44" fill="#222429" stroke={mainColor} strokeWidth="1.5" />

      {/* 50.4mm Olympic Barbell Hole */}
      <circle cx="200" cy="200" r="24" fill="#0B0B0D" stroke="#3A3D45" strokeWidth="2.5" />
      <circle cx="200" cy="200" r="16" fill="#0B0B0D" />
    </svg>
  );
}

export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [phase, setPhase] = useState<"idle" | "in" | "hold" | "out">("idle");

  const isNavigatingRef = useRef(false);
  const lastTransitionTimeRef = useRef(0);
  const currentPathRef = useRef(pathname.split("?")[0].split("#")[0]);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Clear all pending transition timers
  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearAllTimers();
  }, [clearAllTimers]);

  // Trigger ScrollTrigger refresh
  const triggerScrollTriggerRefresh = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        ScrollTrigger.refresh();
      } catch (err) {
        // Fallback
      }
      // Re-trigger once more after DOM paint for complete stability
      setTimeout(() => {
        try {
          ScrollTrigger.refresh();
          window.dispatchEvent(new Event("resize"));
        } catch (err) {
          // Fallback
        }
      }, 100);
    }
  }, []);

  // Run the full sequence: roll in (0.4s) -> hold (150ms) -> roll out (0.4s) -> total ~0.95s
  const executeTransitionSequence = useCallback(
    (onMidpoint?: () => void) => {
      // Prevent duplicate concurrent runs
      const now = Date.now();
      if (isNavigatingRef.current && now - lastTransitionTimeRef.current < 1400) {
        return;
      }

      clearAllTimers();
      isNavigatingRef.current = true;
      lastTransitionTimeRef.current = now;
      setIsTransitioning(true);
      setPhase("in");

      // 1. Roll in finishes at 400ms -> start 150ms hold
      const t1 = setTimeout(() => {
        setPhase("hold");
        if (onMidpoint) onMidpoint();

        // 2. Hold 150ms -> start roll out
        const t2 = setTimeout(() => {
          setPhase("out");

          // 3. Roll out finishes at 400ms -> complete
          const t3 = setTimeout(() => {
            setIsTransitioning(false);
            setPhase("idle");
            isNavigatingRef.current = false;
            triggerScrollTriggerRefresh();
          }, 400);

          timersRef.current.push(t3);
        }, 150);

        timersRef.current.push(t2);
      }, 400);

      timersRef.current.push(t1);
    },
    [clearAllTimers, triggerScrollTriggerRefresh],
  );

  // Intercept internal route navigation clicks
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      // Ignore modified clicks (cmd, ctrl, shift, right-click)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }

      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external, target blank, download, anchors on current page, tel/mailto
      if (
        target.target === "_blank" ||
        target.hasAttribute("download") ||
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#")
      ) {
        return;
      }

      // Check if it's the exact same page
      const current = window.location.pathname.split("?")[0].split("#")[0];
      const targetPath = href.split("?")[0].split("#")[0];
      if (current === targetPath || (current === "/" && targetPath === "")) {
        return;
      }

      // Prevent triggering if a transition is already underway or recently executed
      const now = Date.now();
      if (isNavigatingRef.current || now - lastTransitionTimeRef.current < 1400) {
        return;
      }

      // Intercept and launch transition!
      e.preventDefault();
      e.stopPropagation();

      // Immediately synchronize currentPathRef to the target path
      // so when Next.js updates pathname, the pathname useEffect knows it was already handled!
      currentPathRef.current = targetPath;

      executeTransitionSequence(() => {
        router.push(href);
        window.scrollTo(0, 0);
      });
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, [router, executeTransitionSequence]);

  // Handle browser back/forward (popstate) navigation only
  useEffect(() => {
    const targetPath = pathname.split("?")[0].split("#")[0];

    // If pathname matches what was already handled, ignore!
    if (targetPath === currentPathRef.current) {
      return;
    }

    const now = Date.now();
    // If a transition is currently running or ran within the last 1.4s, ignore!
    if (isNavigatingRef.current || now - lastTransitionTimeRef.current < 1400) {
      currentPathRef.current = targetPath;
      return;
    }

    currentPathRef.current = targetPath;
    executeTransitionSequence();
  }, [pathname, executeTransitionSequence]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="route-plate-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[999] pointer-events-auto select-none overflow-hidden flex items-center justify-center bg-[#0B0B0D]/90 backdrop-blur-md"
          aria-hidden="true"
        >
          {/* Subtle background hairline floor track */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[rgba(237,235,228,0.1)] -translate-y-1/2" />

          {/* Left Plate: Bone/Chalk — rolls in from left (-100vw), meets in center, rolls out */}
          <motion.div
            className="absolute top-1/2 w-[min(80vw,min(70vh,460px))] h-[min(80vw,min(70vh,460px))] sm:w-[min(60vw,min(72vh,520px))] sm:h-[min(60vw,min(72vh,520px))] flex items-center justify-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            style={{ y: "-50%" }}
            initial={{ x: "-110vw", y: "-50%", rotate: -360 }}
            animate={
              phase === "in" || phase === "hold"
                ? {
                    x: "-12vw",
                    y: "-50%",
                    rotate: 0,
                    transition: {
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1], // Heavy athletic rolling inertia
                    },
                  }
                : phase === "out"
                ? {
                    x: "-120vw",
                    y: "-50%",
                    rotate: -360,
                    transition: {
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  }
                : { y: "-50%" }
            }
          >
            <OlympicPlate color="bone" className="w-full h-full" />
          </motion.div>

          {/* Right Plate: Lime/Volt — rolls in from right (100vw), meets in center, rolls out */}
          <motion.div
            className="absolute top-1/2 w-[min(80vw,min(70vh,460px))] h-[min(80vw,min(70vh,460px))] sm:w-[min(60vw,min(72vh,520px))] sm:h-[min(60vw,min(72vh,520px))] flex items-center justify-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
            style={{ y: "-50%" }}
            initial={{ x: "110vw", y: "-50%", rotate: 360 }}
            animate={
              phase === "in" || phase === "hold"
                ? {
                    x: "12vw",
                    y: "-50%",
                    rotate: 0,
                    transition: {
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }
                : phase === "out"
                ? {
                    x: "120vw",
                    y: "-50%",
                    rotate: 360,
                    transition: {
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  }
                : { y: "-50%" }
            }
          >
            <OlympicPlate color="lime" className="w-full h-full" />
          </motion.div>

          {/* Center GYM Logo: Pops into view with collision impact when plates meet */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={
              phase === "in" || phase === "hold"
                ? {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      delay: 0.2,
                      duration: 0.25,
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                    },
                  }
                : phase === "out"
                ? {
                    scale: 0.8,
                    opacity: 0,
                    transition: { duration: 0.25, ease: "easeIn" },
                  }
                : {}
            }
            className="relative z-30 flex flex-col items-center justify-center px-6 py-4 rounded-[3px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.2)] shadow-[0_0_50px_rgba(0,0,0,0.95),0_0_35px_rgba(212,255,63,0.35)]"
          >
            <div className="flex items-center gap-2">
              <span className="font-display text-4xl sm:text-6xl font-extrabold uppercase text-[#EDEBE4] tracking-tight">
                GYM
              </span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[1px] bg-[#D4FF3F] inline-block shadow-[0_0_12px_#D4FF3F]" />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF3F] animate-ping" />
              <span className="font-mono text-[10px] sm:text-xs text-[#D4FF3F] tracking-[0.25em] uppercase font-bold">
                ONE MORE REP
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PageTransition;
