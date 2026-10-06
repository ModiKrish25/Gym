"use client";

import { useEffect, useState } from "react";

export interface SectionStage {
  id: string;
  name: string;
  plates: number; // number of plates per side
  weight: number; // total kg
  rep: string;
}

export const SPINE_SECTIONS: SectionStage[] = [
  { id: "hero", name: "Floor // Bar", plates: 0, weight: 20, rep: "SETUP" },
  { id: "programs", name: "Curated Disciplines", plates: 1, weight: 60, rep: "REP 01" },
  { id: "method", name: "The Standard", plates: 2, weight: 110, rep: "REP 02" },
  { id: "trainers", name: "Elite Cadre", plates: 3, weight: 160, rep: "REP 03" },
  { id: "facilities", name: "Training Ground", plates: 4, weight: 210, rep: "REP 04" },
  { id: "schedule", name: "Timetable", plates: 5, weight: 250, rep: "REP 05" },
  { id: "pricing", name: "Fully Loaded", plates: 6, weight: 300, rep: "ONE MORE REP" },
];

export function useBarbellSpine() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setOverallProgress(progress);

      // Find the currently active section by bounding rects
      let foundIndex = 0;
      for (let i = 0; i < SPINE_SECTIONS.length; i++) {
        const el = document.getElementById(SPINE_SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Trigger when top of section enters upper 45% of viewport
          if (rect.top <= window.innerHeight * 0.45) {
            foundIndex = i;
          }
        }
      }

      setCurrentStageIndex(foundIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentStage = SPINE_SECTIONS[currentStageIndex];

  return {
    currentStage,
    currentStageIndex,
    allStages: SPINE_SECTIONS,
    overallProgress,
    platesCount: currentStage.plates,
    weight: currentStage.weight,
    repLabel: currentStage.rep,
  };
}
