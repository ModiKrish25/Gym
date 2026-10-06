"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Apple, Activity, ScanLine } from "lucide-react";
import { NUTRITION_RECOVERY } from "@/data/content";

const ICONS = [Apple, Activity, ScanLine];

export function NutritionRecovery() {
  return (
    <section
      id="recovery"
      className="py-24 md:py-36 bg-[#0D1627] border-b border-[rgba(142,155,176,0.18)]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#FF6B35] font-semibold mb-3 block">
            Restoration Protocols
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#F5F6F8] mb-4">
            Train hard. Recover harder.
          </h2>
          <p className="text-sm sm:text-base text-[#8E9BB0] leading-relaxed">
            Results happen outside the workout. Our nutrition and recovery services keep
            your body ready for the next session.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {NUTRITION_RECOVERY.map((item, idx) => {
            const Icon = ICONS[idx];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * idx,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#121C30] border border-[rgba(142,155,176,0.18)] hover:border-[#FF6B35]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#0A1220] border border-[rgba(142,155,176,0.2)] flex items-center justify-center text-[#FF6B35] mb-6 group-hover:scale-105 transition-transform">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-[#F5F6F8] mb-3 group-hover:text-[#FF6B35] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8E9BB0] leading-relaxed mb-8">
                    {item.description}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center text-xs uppercase tracking-wider font-bold text-[#FF6B35] hover:text-[#FFB38A] transition-colors"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight size={15} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
