"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { RESULTS_STORIES } from "@/data/content";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

export function Results() {
  return (
    <section
      id="results"
      className="py-24 md:py-36 bg-[#0A1220] border-b border-[rgba(142,155,176,0.18)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#FF6B35] font-semibold mb-3 block">
              Documented Transformations
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F6F8]">
              Real members. Real results.
            </h2>
          </div>
          <p className="text-xs text-[#8E9BB0] italic max-w-xs md:text-right">
            Note: Sample stories for demonstration. Individual timelines depend on adherence, genetics, and baseline metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Slider (6 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=900&auto=format&fit=crop"
              afterImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=900&auto=format&fit=crop"
              beforeLabel="Day 01"
              afterLabel="Day 90"
            />
            <p className="text-xs text-[#8E9BB0] text-center mt-3">
              Drag the center slider left and right to inspect conditioning changes.
            </p>
          </motion.div>

          {/* Member Stories (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
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
                className="p-6 sm:p-7 rounded-3xl bg-[#121C30] border border-[rgba(142,155,176,0.18)] hover:border-[#FF6B35]/40 transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-heading text-xl font-bold text-[#F5F6F8]">
                      {story.name}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0A1220] border border-[rgba(142,155,176,0.25)] text-[#FFB38A] font-medium">
                      {story.duration}
                    </span>
                  </div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#FF6B35]">
                    {story.focus}
                  </span>
                </div>

                <p className="text-sm text-[#8E9BB0] italic leading-relaxed flex items-start gap-2">
                  <Quote size={16} className="text-[#FF6B35] shrink-0 mt-0.5" />
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
