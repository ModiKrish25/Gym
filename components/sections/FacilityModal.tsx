"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ShieldCheck, Clock, Sparkles } from "lucide-react";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";

export interface DetailedFacility {
  id: string;
  zone: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  colSpan: string;
  specs: string[];
  metrics: { label: string; value: string }[];
  highlights: { title: string; detail: string }[];
  protocol: string;
  amenities: string[];
}

interface FacilityModalProps {
  facility: DetailedFacility | null;
  onClose: () => void;
}

export function FacilityModal({ facility, onClose }: FacilityModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body & Lenis scroll while modal is active
  useEffect(() => {
    if (facility) {
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
    return () => {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      window.dispatchEvent(new CustomEvent("lenis:start"));
      (window as any).lenis?.start();
    };
  }, [facility]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (facility) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [facility, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {facility && (
        <div
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto overscroll-contain"
        >
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0B0D]/90 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Window Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            data-lenis-prevent
            className="relative w-full max-w-3xl rounded-[4px] bg-[#121316] border border-[rgba(237,235,228,0.14)] shadow-2xl z-10 max-h-[92vh] overflow-hidden flex flex-col my-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="facility-modal-title"
          >
            {/* Header Bar with Image Preview */}
            <div className="relative h-52 sm:h-64 w-full shrink-0 overflow-hidden border-b border-[rgba(237,235,228,0.08)]">
            <Image
              src={facility.image}
              alt={facility.title}
              fill
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/70 to-[#0B0B0D]/40" />

            {/* Top Bar Badges & Close Button */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#D4FF3F] bg-[#0B0B0D]/90 border border-[rgba(237,235,228,0.15)] px-3 py-1 rounded-[2px] backdrop-blur-sm shadow-md">
                {facility.zone}
              </span>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-[2px] bg-[#0B0B0D]/90 border border-[rgba(237,235,228,0.15)] text-[#EDEBE4] hover:text-[#0B0B0D] hover:bg-[#D4FF3F] hover:border-[#D4FF3F] transition-all flex items-center justify-center cursor-pointer shadow-md"
                aria-label="Close details"
              >
                <X size={18} />
              </button>
            </div>

            {/* Bottom Title Overlay inside Image Header */}
            <div className="absolute bottom-4 inset-x-6 z-20">
              <p className="font-mono text-xs uppercase tracking-widest text-[#D4FF3F] mb-1">
                ZONE SPECIFICATIONS & ARCHITECTURE
              </p>
              <h3
                id="facility-modal-title"
                className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[#EDEBE4] leading-none tracking-tight drop-shadow-md"
              >
                {facility.title}
              </h3>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto p-5 sm:p-7 space-y-6 text-[#EDEBE4]">
            {/* Tagline & Deep Dive Description */}
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[#D4FF3F] mb-2">
                // {facility.tagline}
              </p>
              <p className="font-body text-sm sm:text-base text-[#8A8F98] leading-relaxed">
                {facility.description}
              </p>
            </div>

            {/* Key Metric Gauges */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              {facility.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-[2px] bg-[#17181B] border border-[rgba(237,235,228,0.08)] flex flex-col justify-between"
                >
                  <span className="font-mono text-[10px] text-[#8A8F98] uppercase tracking-widest block mb-1">
                    {m.label}
                  </span>
                  <span className="font-display text-xl sm:text-2xl font-bold uppercase text-[#EDEBE4] tracking-tight">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Technical Highlights / Hardware Breakdown */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#EDEBE4] mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-[#D4FF3F]" />
                HARDWARE & EQUIPMENT ROSTER
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {facility.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-[2px] bg-[#17181B]/80 border border-[rgba(237,235,228,0.06)]"
                  >
                    <p className="font-mono text-xs uppercase font-bold text-[#D4FF3F] mb-1">
                      {h.title}
                    </p>
                    <p className="font-body text-xs text-[#8A8F98] leading-relaxed">
                      {h.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Protocol & Guidelines */}
            <div className="p-4 rounded-[2px] bg-[#17181B] border-l-2 border-l-[#D4FF3F] border border-[rgba(237,235,228,0.06)]">
              <div className="flex items-center gap-2 mb-1.5 font-mono text-xs uppercase tracking-wider text-[#D4FF3F]">
                <Clock size={14} />
                <span>RECOMMENDED PROTOCOL</span>
              </div>
              <p className="font-body text-xs sm:text-sm text-[#EDEBE4]/85 leading-relaxed">
                {facility.protocol}
              </p>
            </div>

            {/* Included Amenities Chips */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#8A8F98] mb-2.5 flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#D4FF3F]" />
                ZONE AMENITIES & STANDARDS
              </h4>
              <div className="flex flex-wrap gap-2">
                {facility.amenities.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.08)] font-mono text-[11px] text-[#EDEBE4]"
                  >
                    <Check size={12} className="text-[#D4FF3F]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="p-4 sm:p-5 bg-[#0B0B0D] border-t border-[rgba(237,235,228,0.08)] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <span className="font-mono text-[11px] text-[#8A8F98] uppercase tracking-wider text-center sm:text-left">
              INCLUDED IN ALL PERFORMANCE & ELITE MEMBERSHIPS
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-[2px] border border-[rgba(237,235,228,0.15)] text-[#EDEBE4] hover:border-[#D4FF3F] hover:text-[#D4FF3F] font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                Close
              </button>

              <a
                href="#contact"
                onClick={onClose}
                className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[2px] bg-[#D4FF3F] text-[#0B0B0D] font-mono text-xs uppercase font-extrabold tracking-widest hover:bg-[#EDEBE4] transition-colors cursor-pointer text-center"
              >
                <span>Book Zone Access</span>
                <AnimatedArrow type="right" size={14} />
              </a>
            </div>
          </div>
        </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default FacilityModal;
