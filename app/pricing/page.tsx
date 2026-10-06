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

export default function PricingPage() {
  return (
    <div className="pt-36 pb-24 md:pb-36 bg-[#0A1220] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Main Pricing component */}
        <Pricing />

        {/* Feature Comparison Table */}
        <section className="mt-20 pt-16 border-t border-[rgba(142,155,176,0.18)]">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-[#FF6B35] font-semibold mb-3 block">
              Direct Comparison
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#F5F6F8]">
              Feature Comparison Matrix
            </h2>
            <p className="text-sm text-[#8E9BB0] mt-3">
              Review what is included in each membership tier side-by-side.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl bg-[#121C30] border border-[rgba(142,155,176,0.2)] p-6 sm:p-8">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-[rgba(142,155,176,0.18)]">
                  <th className="py-4 px-4 font-heading text-lg text-[#F5F6F8] w-2/5">
                    Feature
                  </th>
                  <th className="py-4 px-4 font-heading text-lg text-[#F5F6F8] text-center w-1/5">
                    Essential
                  </th>
                  <th className="py-4 px-4 font-heading text-lg text-[#FF6B35] text-center w-1/5">
                    Performance
                  </th>
                  <th className="py-4 px-4 font-heading text-lg text-[#FFB38A] text-center w-1/5">
                    Elite
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((section) => (
                  <div key={section.category} className="contents">
                    <tr>
                      <td
                        colSpan={4}
                        className="pt-6 pb-3 px-4 text-xs uppercase tracking-wider font-bold text-[#FF6B35] bg-[#0A1220]/50"
                      >
                        {section.category}
                      </td>
                    </tr>
                    {section.items.map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-[rgba(142,155,176,0.1)] hover:bg-[#0A1220]/30 transition-colors"
                      >
                        <td className="py-3.5 px-4 text-sm text-[#F5F6F8]">
                          {item.name}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-center text-[#8E9BB0]">
                          {typeof item.essential === "boolean" ? (
                            item.essential ? (
                              <Check size={16} className="text-[#FF6B35] mx-auto" />
                            ) : (
                              <Minus size={16} className="text-[#8E9BB0]/40 mx-auto" />
                            )
                          ) : (
                            item.essential
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-center font-medium text-[#F5F6F8]">
                          {typeof item.performance === "boolean" ? (
                            item.performance ? (
                              <Check size={16} className="text-[#FF6B35] mx-auto" />
                            ) : (
                              <Minus size={16} className="text-[#8E9BB0]/40 mx-auto" />
                            )
                          ) : (
                            item.performance
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-xs text-center font-medium text-[#FFB38A]">
                          {typeof item.elite === "boolean" ? (
                            item.elite ? (
                              <Check size={16} className="text-[#FF6B35] mx-auto" />
                            ) : (
                              <Minus size={16} className="text-[#8E9BB0]/40 mx-auto" />
                            )
                          ) : (
                            item.elite
                          )}
                        </td>
                      </tr>
                    ))}
                  </div>
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
