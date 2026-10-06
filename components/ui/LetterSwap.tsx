"use client";

import React, { useState } from "react";
import { motion, Transition } from "framer-motion";

export interface LetterSwapProps {
  label: string;
  className?: string;
  secondaryClassName?: string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  reverse?: boolean;
  transition?: Transition;
  mode?: "ping-pong" | "forward";
  onClick?: () => void;
}

/**
 * LetterSwap - A text component that swaps letters vertically on hover.
 * Supports customizable stagger timing, directions, colors, and transitions.
 */
export function LetterSwap({
  label,
  className = "",
  secondaryClassName = "",
  staggerDuration = 0.035,
  staggerFrom = "first",
  reverse = false,
  transition = { duration: 0.35, ease: [0.65, 0, 0.35, 1] },
  mode = "ping-pong",
  onClick,
}: LetterSwapProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [forwardCycle, setForwardCycle] = useState(0);

  const letters = label.split("");
  const totalLetters = letters.length;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (mode === "forward") {
      setForwardCycle((prev) => prev + 1);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (mode === "forward") {
      setForwardCycle((prev) => prev + 1);
    }
  };

  const getDelay = (index: number) => {
    if (reverse || staggerFrom === "last") {
      return (totalLetters - 1 - index) * staggerDuration;
    }
    if (staggerFrom === "center") {
      const center = Math.floor(totalLetters / 2);
      return Math.abs(center - index) * staggerDuration;
    }
    return index * staggerDuration;
  };

  return (
    <span
      className={`relative inline-flex items-center cursor-pointer select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={() => {
        setIsHovered(true);
        if (mode === "forward") setForwardCycle((prev) => prev + 1);
      }}
      onTouchEnd={() => {
        setTimeout(() => {
          setIsHovered(false);
          if (mode === "forward") setForwardCycle((prev) => prev + 1);
        }, 700);
      }}
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="inline-flex items-center">
        {letters.map((char, index) => {
          const delay = getDelay(index);

          if (char === " ") {
            return (
              <span key={index} className="inline-block">
                &nbsp;
              </span>
            );
          }

          if (mode === "forward") {
            const isOddCycle = forwardCycle % 2 === 1;
            return (
              <span
                key={index}
                className="relative inline-flex flex-col overflow-hidden py-[0.04em]"
              >
                <motion.span
                  className="block"
                  initial={false}
                  animate={{
                    y: isOddCycle ? "-105%" : "0%",
                  }}
                  transition={{
                    ...transition,
                    delay,
                  }}
                >
                  {char}
                </motion.span>
                <motion.span
                  className={`absolute inset-0 block ${secondaryClassName}`}
                  initial={false}
                  animate={{
                    y: isOddCycle ? "0%" : "105%",
                  }}
                  transition={{
                    ...transition,
                    delay,
                  }}
                >
                  {char}
                </motion.span>
              </span>
            );
          }

          // Ping-Pong mode: swaps out to top on hover, swaps back in from bottom
          return (
            <span
              key={index}
              className="relative inline-flex flex-col overflow-hidden py-[0.04em]"
            >
              <motion.span
                className="block"
                initial={false}
                animate={{
                  y: isHovered ? "-105%" : "0%",
                }}
                transition={{
                  ...transition,
                  delay,
                }}
              >
                {char}
              </motion.span>
              <motion.span
                className={`absolute inset-0 block ${secondaryClassName}`}
                initial={false}
                animate={{
                  y: isHovered ? "0%" : "105%",
                }}
                transition={{
                  ...transition,
                  delay,
                }}
              >
                {char}
              </motion.span>
            </span>
          );
        })}
      </span>
    </span>
  );
}

export const LetterSwapPingPong = (props: LetterSwapProps) => (
  <LetterSwap {...props} mode="ping-pong" />
);

export const LetterSwapForward = (props: LetterSwapProps) => (
  <LetterSwap {...props} mode="forward" />
);

export default LetterSwap;
