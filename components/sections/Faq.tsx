"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/data/content";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-24 md:py-36 bg-[#0A1220] border-b border-[rgba(142,155,176,0.18)]"
    >
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-widest text-[#FF6B35] font-semibold mb-3 block">
            Clarity & Answers
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold text-[#F5F6F8] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-base text-[#8E9BB0]">
            Everything you need to know about membership, facilities, and protocols.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl bg-[#121C30] border border-[rgba(142,155,176,0.18)] hover:border-[#FF6B35]/40 transition-colors overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-7 text-left flex items-center justify-between gap-3 sm:gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-base sm:text-xl font-bold text-[#F5F6F8]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full bg-[#0A1220] border border-[rgba(142,155,176,0.2)] flex items-center justify-center text-[#FF6B35] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-7 sm:px-7 pt-0 text-sm sm:text-base text-[#8E9BB0] leading-relaxed border-t border-[rgba(142,155,176,0.1)]">
                        <p className="pt-4">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
