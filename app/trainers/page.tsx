"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Clock, ArrowRight, X, Check } from "lucide-react";
import { TRAINERS, Trainer } from "@/data/content";

export default function TrainersPage() {
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-24 md:pb-36 bg-[#0B0B0D] min-h-screen">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D4FF3F] font-bold mb-3 block">
            // Coaching Faculty
          </span>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#EDEBE4] mb-4">
            Master Coaches
          </h1>
          <p className="text-base text-[#8A8F98] leading-relaxed">
            Our coaching team holds international certifications in biomechanics, sports
            nutrition, and injury rehabilitation. Every member is paired with a coach
            for targeted accountability.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="rounded-md bg-[#17181B] border border-[#2A2C31] hover:border-[#D4FF3F] transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Photo */}
              <div className="relative h-80 w-full overflow-hidden">
                <Image
                  src={trainer.image}
                  alt={trainer.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-[#0B0B0D]/50 group-hover:bg-[#0B0B0D]/20 transition-colors duration-300" />
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-sm text-xs font-mono font-bold bg-[#0B0B0D]/90 border border-[#2A2C31] text-[#D4FF3F]">
                  {trainer.experience}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#D4FF3F] font-bold mb-1 block">
                    {trainer.role}
                  </span>
                  <h3 className="font-display text-3xl font-extrabold text-[#EDEBE4] mb-3">
                    {trainer.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8E9BB0] leading-relaxed mb-6 line-clamp-3">
                    {trainer.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(142,155,176,0.12)]">
                  <button
                    onClick={() => setSelectedTrainer(trainer)}
                    className="w-full py-2.5 rounded-full border border-[#F5F6F8]/30 text-xs font-semibold text-[#F5F6F8] hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View full dossier</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trainer Profile Modal */}
      <AnimatePresence>
        {selectedTrainer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrainer(null)}
              className="fixed inset-0 bg-[#0A1220]/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl rounded-3xl bg-[#121C30] border border-[rgba(142,155,176,0.25)] overflow-hidden shadow-2xl z-10"
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTrainer(null)}
                className="absolute top-5 right-5 z-20 p-2 rounded-full bg-[#0A1220]/80 text-[#8E9BB0] hover:text-[#F5F6F8] transition-colors focus:outline-none"
                aria-label="Close trainer modal"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-12">
                {/* Modal Photo */}
                <div className="sm:col-span-5 relative h-64 sm:h-full min-h-[300px]">
                  <Image
                    src={selectedTrainer.image}
                    alt={selectedTrainer.name}
                    fill
                    className="object-cover object-top filter grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-[#0A1220]/40" />
                </div>

                {/* Modal Body */}
                <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#FF6B35] font-semibold mb-1 block">
                      {selectedTrainer.role}
                    </span>
                    <h3 className="font-heading text-3xl font-bold text-[#F5F6F8] mb-1">
                      {selectedTrainer.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#FFB38A] mb-4">
                      <Clock size={13} />
                      <span>{selectedTrainer.experience} coaching experience</span>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-[#8E9BB0] font-semibold mb-1">
                          Philosophy &amp; Background
                        </h4>
                        <p className="text-xs sm:text-sm text-[#8E9BB0] leading-relaxed">
                          {selectedTrainer.bio}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-[#8E9BB0] font-semibold mb-1">
                          Accreditations
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#F5F6F8]">
                          <Award size={16} className="text-[#FF6B35] shrink-0" />
                          <span>{selectedTrainer.certifications}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[rgba(142,155,176,0.18)] flex gap-3">
                    <Link
                      href={`/contact?coach=${selectedTrainer.id}`}
                      onClick={() => setSelectedTrainer(null)}
                      className="flex-1 py-3 rounded-full bg-[#FF6B35] text-[#0A1220] font-bold text-xs uppercase tracking-wider text-center hover:bg-[#e85e2b] transition-all"
                    >
                      Train with {selectedTrainer.name.split(" ")[0]}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
