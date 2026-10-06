"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface AnimatedDumbbellProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  glow?: boolean;
}

export function AnimatedDumbbell({
  className = "",
  size = "md",
  interactive = false,
  glow = false,
}: AnimatedDumbbellProps) {
  const [reps, setReps] = useState(0);
  const [isLifting, setIsLifting] = useState(false);

  const dimension = size === "sm" ? 24 : size === "lg" ? 48 : 32;

  const handleLift = () => {
    if (!interactive) return;
    setIsLifting(true);
    setReps((prev) => prev + 1);
    setTimeout(() => setIsLifting(false), 500);
  };

  return (
    <div
      onClick={handleLift}
      className={`inline-flex items-center gap-2 select-none ${
        interactive ? "cursor-pointer group" : ""
      } ${className}`}
      title={interactive ? `Click to curl dumbbell (${reps} reps)` : "Olympic Dumbbell"}
    >
      <motion.svg
        width={dimension}
        height={dimension}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={
          isLifting
            ? { y: -8, rotate: -18, scale: 1.1 }
            : {
                y: [0, -3, 0],
                rotate: [0, -4, 4, 0],
              }
        }
        transition={
          isLifting
            ? { duration: 0.25, ease: "easeOut" }
            : {
                repeat: Infinity,
                duration: 3.2,
                ease: "easeInOut",
              }
        }
        className={`transition-colors duration-300 ${
          glow ? "drop-shadow-[0_0_8px_rgba(255,107,53,0.5)]" : ""
        }`}
      >
        {/* Knurled Central Bar */}
        <line
          x1="12"
          y1="24"
          x2="36"
          y2="24"
          stroke="#F5F6F8"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Knurling texture lines on center */}
        <line x1="20" y1="22" x2="20" y2="26" stroke="#8E9BB0" strokeWidth="1.5" />
        <line x1="24" y1="22" x2="24" y2="26" stroke="#8E9BB0" strokeWidth="1.5" />
        <line x1="28" y1="22" x2="28" y2="26" stroke="#8E9BB0" strokeWidth="1.5" />

        {/* Inner Left Collar */}
        <rect x="13" y="18" width="3" height="12" rx="1" fill="#FF6B35" />
        {/* Left Inner Heavy Plate */}
        <rect x="8" y="13" width="5" height="22" rx="2" fill="#121C30" stroke="#FF6B35" strokeWidth="1.5" />
        {/* Left Outer Weight Plate */}
        <rect x="4" y="16" width="4" height="16" rx="1.5" fill="#0A1220" stroke="#8E9BB0" strokeWidth="1.5" />

        {/* Inner Right Collar */}
        <rect x="32" y="18" width="3" height="12" rx="1" fill="#FF6B35" />
        {/* Right Inner Heavy Plate */}
        <rect x="35" y="13" width="5" height="22" rx="2" fill="#121C30" stroke="#FF6B35" strokeWidth="1.5" />
        {/* Right Outer Weight Plate */}
        <rect x="40" y="16" width="4" height="16" rx="1.5" fill="#0A1220" stroke="#8E9BB0" strokeWidth="1.5" />
      </motion.svg>

      {interactive && reps > 0 && (
        <span className="text-[11px] font-mono font-bold text-[#FF6B35] bg-[#0A1220] px-2 py-0.5 rounded-full border border-[#FF6B35]/40 animate-pulse">
          {reps} {reps === 1 ? "rep" : "reps"}
        </span>
      )}
    </div>
  );
}
