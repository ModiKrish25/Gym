"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedArrowProps {
  type?: "right" | "up-right";
  size?: number;
  className?: string;
  iconClassName?: string;
}

export function AnimatedArrow({
  type = "right",
  size = 14,
  className,
  iconClassName,
}: AnimatedArrowProps) {
  if (type === "up-right") {
    return (
      <span
        className={cn(
          "group/arrow relative inline-flex items-center justify-center overflow-hidden shrink-0 pointer-events-auto",
          className
        )}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <ArrowUpRight
          size={size}
          className={cn(
            "transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:-translate-y-4 group-hover/arrow:translate-x-4 group-hover/arrow:-translate-y-4",
            iconClassName
          )}
        />
        <ArrowUpRight
          size={size}
          className={cn(
            "absolute transition-transform duration-300 ease-out -translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 group-hover/arrow:translate-x-0 group-hover/arrow:translate-y-0",
            iconClassName
          )}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "group/arrow relative inline-flex items-center justify-center overflow-hidden shrink-0 pointer-events-auto",
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <ArrowRight
        size={size}
        className={cn(
          "transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover/arrow:translate-x-4",
          iconClassName
        )}
      />
      <ArrowRight
        size={size}
        className={cn(
          "absolute transition-transform duration-300 ease-out -translate-x-4 group-hover:translate-x-0 group-hover/arrow:translate-x-0",
          iconClassName
        )}
      />
    </span>
  );
}

export function AnimatedArrowBox({
  type = "up-right",
  size = 14,
  className,
}: {
  type?: "up-right" | "right";
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group/arrow relative overflow-hidden rounded-[2px] bg-[#0B0B0D]/90 border border-[rgba(237,235,228,0.12)] flex items-center justify-center text-[#EDEBE4] group-hover:bg-[#D4FF3F] group-hover:text-[#0B0B0D] group-hover:border-[#D4FF3F] group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(212,255,63,0.45)] hover:bg-[#D4FF3F] hover:text-[#0B0B0D] hover:border-[#D4FF3F] hover:scale-110 hover:shadow-[0_0_18px_rgba(212,255,63,0.45)] transition-all duration-300 shrink-0",
        className || "w-8 h-8"
      )}
      aria-hidden="true"
    >
      <AnimatedArrow type={type} size={size} />
    </div>
  );
}

export default AnimatedArrow;
