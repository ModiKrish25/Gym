"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, ArrowRight, Clock } from "lucide-react";
import { TRAINERS } from "@/data/content";

export function Trainers() {
  return (
    <section
      id="trainers"
      className="py-24 md:py-36 bg-[#0B0B0D] border-b border-[#2A2C31]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[rgba(237,235,228,0.08)] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF3F]">
                ELITE CADRE
              </span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold uppercase text-[#EDEBE4]">
              World-Class Coaches
            </h2>
          </div>
          <Link
            href="/trainers"
            className="inline-flex items-center text-xs font-mono font-bold uppercase tracking-wider text-[#D4FF3F] hover:text-[#EDEBE4] transition-colors group"
          >
            <span>View full roster</span>
            <ArrowRight
              size={14}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {TRAINERS.map((trainer, idx) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.6,
                delay: 0.08 * idx,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative h-[480px] rounded-[4px] overflow-hidden bg-[#17181B] border border-[rgba(237,235,228,0.08)] hover:border-[#D4FF3F] transition-all duration-300"
            >
              {/* Photo: High contrast B&W, color on hover */}
              <Image
                src={trainer.image}
                alt={`${trainer.name}, ${trainer.role} at GYM`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-105 group-hover:scale-105 transition-all duration-500"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/40 to-transparent group-hover:via-[#0B0B0D]/20 transition-colors duration-300" />

              {/* Outlined index number top-left */}
              <div className="absolute top-4 left-4 z-10 font-display text-4xl font-extrabold text-outline">
                0{idx + 1}
              </div>

              {/* Experience badge */}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-mono font-bold bg-[#0B0B0D]/90 border border-[#2A2C31] text-[#EDEBE4]">
                <Clock size={11} className="text-[#D4FF3F]" />
                <span>{trainer.experience}</span>
              </div>

              {/* Card Footer Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end">
                <span className="font-mono text-xs uppercase tracking-wider text-[#D4FF3F] font-bold mb-1 block">
                  {trainer.role}
                </span>
                <h3 className="font-display text-3xl font-extrabold text-[#EDEBE4] mb-2">
                  {trainer.name}
                </h3>

                {/* Bio and Certifications */}
                <div className="space-y-2">
                  <p className="text-xs text-[#8A8F98] leading-relaxed line-clamp-2">
                    &ldquo;{trainer.bio}&rdquo;
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#EDEBE4]/80 border-t border-[#2A2C31] pt-2">
                    <Award size={12} className="text-[#D4FF3F] shrink-0" />
                    <span className="truncate">{trainer.certifications}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
