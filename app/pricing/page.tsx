"use client";

import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { Check, Minus } from "lucide-react";
import Link from "next/link";

const COMPARISON_FEATURES = [
  {
    category: "Access & Facility",
    items: [
      { name: "Gym floor & Olympic platforms", essential: true, performance: true, elite: true },
      { name: "Peak-hours access guarantee", essential: true, performance: true, elite: true },
      { name: "Luxury locker & rainfall showers", essential: true, performance: true, elite: true },
      { name: "Dedicated private locker", essential: false, performance: false, elite: true },
      { name: "Private VIP lounge access", essential: false, performance: false, elite: true },
    ],
  },
  {
    category: "Coaching & Classes",
    items: [
      { name: "Weekly group classes", essential: "2 classes / wk", performance: "Unlimited", elite: "Unlimited" },
      { name: "Class booking window", essential: "48 hours prior", performance: "7 days prior", elite: "14 days prior" },
      { name: "Personal training sessions", essential: false, performance: false, elite: "4 sessions / mo" },
      { name: "Coach performance reviews", essential: "On induction", performance: "Quarterly", elite: "Monthly" },
    ],
  },
  {
    category: "Recovery & Wellness",
    items: [
      { name: "Movement & body composition scan", essential: "Onboarding only", performance: "Bi-monthly", elite: "Monthly InBody" },
      { name: "Recovery lounge & Normatec boots", essential: false, performance: true, elite: true },
      { name: "Private steam & sauna suites", essential: false, performance: false, elite: true },
      { name: "Tailored macronutrient meal plan", essential: false, performance: "Consultation", elite: "Full Custom Plan" },
      { name: "Monthly guest passes", essential: false, performance: "1 pass / mo", elite: "2 passes / mo" },
    ],
  },
];

import React from "react";

export default function PricingPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-24 md:pb-36 bg-[#0B0B0D] text-[#EDEBE4] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Main Pricing component */}
        <Pricing />

        {/* Feature Comparison Table */}
        <section className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-[rgba(237,235,228,0.08)]">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF3F] font-semibold mb-2 sm:mb-3 block">
              DIRECT COMPARISON // METRIC AUDIT
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-[#EDEBE4] tracking-tight">
              Feature Comparison Matrix
            </h2>
            <p className="font-body text-sm text-[#8A8F98] mt-3">
              Review what is included in each membership tier side-by-side.
            </p>
          </div>

          <div className="overflow-x-auto rounded-[4px] bg-[#17181B] border border-[rgba(237,235,228,0.1)] p-4 sm:p-8">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-[rgba(237,235,228,0.12)]">
                  <th className="py-4 px-4 font-mono text-xs uppercase tracking-wider text-[#8A8F98] w-2/5">
                    Deliverable / Feature
                  </th>
                  <th className="py-4 px-4 font-mono text-xs uppercase tracking-wider text-[#EDEBE4] text-center w-1/5">
                    Essential
                  </th>
                  <th className="py-4 px-4 font-mono text-xs uppercase tracking-wider text-[#D4FF3F] font-bold text-center w-1/5">
                    Performance ★
                  </th>
                  <th className="py-4 px-4 font-mono text-xs uppercase tracking-wider text-[#EDEBE4] text-center w-1/5">
                    Elite
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((section) => (
                  <React.Fragment key={section.category}>
                    <tr>
                      <td
                        colSpan={4}
                        className="pt-6 pb-3 px-4 font-mono text-[11px] uppercase tracking-wider font-bold text-[#D4FF3F] bg-[#0B0B0D]/80 border-b border-[rgba(237,235,228,0.06)]"
                      >
                        {section.category}
                      </td>
                    </tr>
                    {section.items.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-[rgba(237,235,228,0.06)] hover:bg-[#0B0B0D]/40 transition-colors"
                      >
                        <td className="py-3.5 px-4 text-xs sm:text-sm font-body text-[#EDEBE4]">
                          {item.name}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-center text-[#8A8F98]">
                          {typeof item.essential === "boolean" ? (
                            item.essential ? (
                              <Check size={16} className="text-[#D4FF3F] mx-auto" />
                            ) : (
                              <Minus size={16} className="text-[#8A8F98]/30 mx-auto" />
                            )
                          ) : (
                            item.essential
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-center font-medium text-[#EDEBE4]">
                          {typeof item.performance === "boolean" ? (
                            item.performance ? (
                              <Check size={16} className="text-[#D4FF3F] mx-auto" />
                            ) : (
                              <Minus size={16} className="text-[#8A8F98]/30 mx-auto" />
                            )
                          ) : (
                            item.performance
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-xs text-center font-medium text-[#EDEBE4]">
                          {typeof item.elite === "boolean" ? (
                            item.elite ? (
                              <Check size={16} className="text-[#D4FF3F] mx-auto" />
                            ) : (
                              <Minus size={16} className="text-[#8A8F98]/30 mx-auto" />
                            )
                          ) : (
                            item.elite
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing FAQ Section */}
        <div className="mt-20">
          <Faq />
        </div>
      </div>
    </div>
  );
}
