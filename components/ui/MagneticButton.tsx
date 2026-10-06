"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "volt" | "outline" | "iron";
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  variant = "volt",
  className = "",
  onClick,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isReduced, setIsReduced] = useState(false);

  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });

  useEffect(() => {
    setIsReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isReduced || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = (e.clientX - centerX) * 0.35;
    const distanceY = (e.clientY - centerY) * 0.35;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantStyles = {
    volt: "bg-[#D4FF3F] text-[#0B0B0D] hover:text-[#0B0B0D] border border-[#D4FF3F]",
    outline: "bg-transparent text-[#EDEBE4] border border-[rgba(237,235,228,0.2)] hover:border-[#D4FF3F] hover:text-[#0B0B0D]",
    iron: "bg-[#17181B] text-[#EDEBE4] border border-[#2A2C31] hover:border-[#D4FF3F] hover:text-[#0B0B0D]",
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-[4px] px-7 py-3.5 font-mono text-xs uppercase font-bold tracking-wider transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4FF3F]",
        variantStyles[variant],
        className
      )}
      {...(props as any)}
    >
      {/* Wipe Fill layer with expo transition */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-0 translate-y-full transition-transform duration-500 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0",
          variant === "volt" ? "bg-[#b8e626]" : "bg-[#D4FF3F]"
        )}
      />

      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2 pointer-events-none">
        {children}
      </span>
    </motion.button>
  );
}
