"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export function SectionReveal({
  children,
  className = "",
  delay = 0,
  yOffset = 48,
}: SectionRevealProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo for crisp, premium feel
      }}
      onAnimationComplete={() => setIsCompleted(true)}
      style={isCompleted ? { transform: "none" } : undefined}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
