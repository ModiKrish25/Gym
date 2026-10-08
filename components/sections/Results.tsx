"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { RESULTS_STORIES } from "@/data/content";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

export function Results() {
  return (
    <section
      id="results"
      className="py-14 sm:py-16 md:py-20 bg-[#0B0B0D] border-b border-[rgba(237,235,228,0.08)] relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-[rgba(237,235,228,0.08)] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF3F]">
                DOCUMENTED TRANSFORMATIONS
              </span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase text-[#EDEBE4] leading-[0.88] tracking-tight">
              Real members. Real results.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8A8F98] max-w-xs md:text-right">
            90-day progressive overload protocol with customized macronutrient nutrition programming.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Slider (6 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col"
          >
            <BeforeAfterSlider
              beforeImage="/images/transformations/day-01.jpg"
              afterImage="/images/transformations/day-90.jpg"
              beforeLabel="Day 01"
              afterLabel="Day 90"
            />
            <div className="flex items-center justify-between text-xs font-mono text-[#8A8F98] mt-4 px-1">
              <span>01 // INITIAL BASELINE</span>
              <span className="text-[#D4FF3F]">DRAG TO COMPARE</span>
              <span>90 // PEAK CONDITION</span>
            </div>
          </motion.div>

          {/* Member Stories (6 cols) */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            {RESULTS_STORIES.map((story, idx) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * idx,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="p-6 rounded-[4px] bg-[#17181B] border border-[rgba(237,235,228,0.08)] hover:border-[#D4FF3F] transition-colors duration-300 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl font-bold uppercase tracking-tight text-[#EDEBE4]">
                      {story.name}
                    </span>
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.15)] text-[#D4FF3F] font-semibold">
                      {story.duration}
                    </span>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#D4FF3F]">
                    {story.focus}
                  </span>
                </div>

                <p className="font-body text-sm sm:text-base text-[#8A8F98] leading-relaxed flex items-start gap-3">
                  <Quote size={16} className="text-[#D4FF3F] shrink-0 mt-1" />
                  <span>&ldquo;{story.quote}&rdquo;</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Results;
