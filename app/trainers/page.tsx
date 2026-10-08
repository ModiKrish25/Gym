"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Clock, X, Check } from "lucide-react";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { TRAINERS, Trainer } from "@/data/content";

export default function TrainersPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll and Lenis smooth scroll while modal is open
  useEffect(() => {
    if (selectedTrainer) {
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.dispatchEvent(new CustomEvent("lenis:stop"));
      (window as any).lenis?.stop();
    } else {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("lenis:start"));
      (window as any).lenis?.start();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedTrainer(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("lenis:start"));
      (window as any).lenis?.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTrainer]);

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-24 md:pb-36 bg-[#0B0B0D] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D4FF3F] font-bold mb-3 block">
            // Coaching Faculty
          </span>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase text-[#EDEBE4] leading-[0.88] tracking-tight mb-4">
            Master Coaches
          </h1>
          <p className="font-body text-base text-[#8A8F98] leading-relaxed">
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
              className="rounded-[4px] bg-[#17181B] border border-[rgba(237,235,228,0.1)] hover:border-[#D4FF3F] transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-lg"
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
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-[2px] text-xs font-mono font-bold bg-[#0B0B0D]/90 border border-[rgba(237,235,228,0.15)] text-[#D4FF3F]">
                  {trainer.experience}
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#D4FF3F] font-bold mb-1 block">
                    {trainer.role}
                  </span>
                  <h3 className="font-display text-3xl font-extrabold uppercase text-[#EDEBE4] mb-3 group-hover:text-[#D4FF3F] transition-colors">
                    {trainer.name}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-[#8A8F98] leading-relaxed mb-6 line-clamp-3">
                    {trainer.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(237,235,228,0.08)]">
                  <button
                    onClick={() => setSelectedTrainer(trainer)}
                    className="w-full py-2.5 px-4 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.15)] text-xs font-mono font-bold uppercase tracking-wider text-[#EDEBE4] hover:bg-[#D4FF3F] hover:text-[#0B0B0D] hover:border-[#D4FF3F] transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <span>View full dossier</span>
                    <AnimatedArrow type="up-right" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trainer Profile Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedTrainer && (
              <div
                data-lenis-prevent
                onWheel={(e) => e.stopPropagation()}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
              >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrainer(null)}
              className="fixed inset-0 bg-[#0B0B0D]/85 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl rounded-[4px] bg-[#17181B] border border-[rgba(237,235,228,0.15)] overflow-hidden shadow-2xl z-10"
              role="dialog"
              aria-modal="true"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTrainer(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.15)] text-[#8A8F98] hover:text-[#EDEBE4] hover:border-[#D4FF3F] transition-colors focus:outline-none"
                aria-label="Close trainer modal"
              >
                <X size={18} />
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17181B] via-transparent to-transparent sm:hidden" />
                </div>

                {/* Modal Body */}
                <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#D4FF3F] font-bold mb-1.5 block">
                      {selectedTrainer.role}
                    </span>
                    <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-[#EDEBE4] mb-1 tracking-tight">
                      {selectedTrainer.name}
                    </h3>
                    <div className="flex items-center gap-2 font-mono text-xs text-[#8A8F98] mb-4">
                      <Clock size={13} className="text-[#D4FF3F]" />
                      <span>{selectedTrainer.experience} coaching experience</span>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-wider text-[#8A8F98] font-semibold mb-1">
                          Philosophy &amp; Background
                        </h4>
                        <p className="font-body text-xs sm:text-sm text-[#EDEBE4]/80 leading-relaxed">
                          {selectedTrainer.bio}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-wider text-[#8A8F98] font-semibold mb-1">
                          Accreditations
                        </h4>
                        <div className="flex items-center gap-2 font-mono text-xs text-[#EDEBE4]">
                          <Award size={15} className="text-[#D4FF3F] shrink-0" />
                          <span>{selectedTrainer.certifications}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[rgba(237,235,228,0.08)] flex gap-3">
                    <Link
                      href={`/contact?coach=${selectedTrainer.id}`}
                      onClick={() => setSelectedTrainer(null)}
                      className="flex-1 py-3.5 rounded-[2px] bg-[#D4FF3F] text-[#0B0B0D] font-mono font-bold text-xs uppercase tracking-wider text-center hover:bg-[#b8e626] transition-all shadow-[0_0_15px_rgba(212,255,63,0.25)] flex items-center justify-center gap-2"
                    >
                      <span>Train with {selectedTrainer.name.split(" ")[0]}</span>
                      <AnimatedArrow type="right" size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
