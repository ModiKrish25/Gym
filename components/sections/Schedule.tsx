"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { DAYS_OF_WEEK, SCHEDULE, DayOfWeek, ScheduleClass } from "@/data/schedule";
import { BookModal } from "@/components/ui/BookModal";

export function Schedule() {
  const [activeDay, setActiveDay] = useState<DayOfWeek>("Mon");
  const [selectedClass, setSelectedClass] = useState<ScheduleClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentClasses = SCHEDULE[activeDay] || [];

  const handleBook = (cls: ScheduleClass) => {
    setSelectedClass(cls);
    setIsModalOpen(true);
  };

  return (
    <section
      id="schedule"
      className="py-14 sm:py-16 md:py-20 bg-[#0B0B0D] border-b border-[rgba(237,235,228,0.08)]"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[rgba(237,235,228,0.08)] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF3F]">
                TIMETABLE
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase text-[#EDEBE4] leading-[0.88] tracking-tight">
              Class Schedule
            </h2>
          </div>
        </div>

        {/* Days Filter Strip (Sharp corners, hairline borders, horizontal swipe on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {DAYS_OF_WEEK.map((day) => {
            const isActive = activeDay === day.key;
            return (
              <button
                key={day.key}
                onClick={() => setActiveDay(day.key)}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-[2px] font-mono text-xs uppercase tracking-wider transition-all duration-200 shrink-0 border focus:outline-none ${
                  isActive
                    ? "bg-[#D4FF3F] text-[#0B0B0D] border-[#D4FF3F] font-bold shadow-[0_0_12px_rgba(212,255,63,0.3)]"
                    : "bg-[#17181B] text-[#8A8F98] border-[rgba(237,235,228,0.08)] hover:text-[#EDEBE4] hover:border-[#EDEBE4]/40"
                }`}
              >
                {day.full}
              </button>
            );
          })}
        </div>

        {/* Schedule Table Layout with Large Time Numerals */}
        <div className="border border-[rgba(237,235,228,0.08)] rounded-[4px] bg-[#17181B] overflow-hidden">
          {/* Table Header Row (Desktop) */}
          <div className="hidden lg:grid grid-cols-12 px-8 py-4 border-b border-[rgba(237,235,228,0.08)] bg-[#0B0B0D]/60 font-mono text-[11px] uppercase tracking-[0.2em] text-[#8A8F98]">
            <div className="col-span-3">Time slot</div>
            <div className="col-span-4">Discipline & Focus</div>
            <div className="col-span-2">Lead Coach</div>
            <div className="col-span-2">Intensity & Area</div>
            <div className="col-span-1 text-right">Access</div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="divide-y divide-[rgba(237,235,228,0.08)]"
            >
              {currentClasses.map((cls, idx) => (
                <div
                  key={`${activeDay}-${cls.time}-${idx}`}
                  className="px-4 sm:px-8 py-5 sm:py-6 hover:bg-[#222429]/60 transition-colors duration-200 group"
                >
                  {/* Mobile & Tablet Card Layout (< lg): Left info & Right details */}
                  <div className="lg:hidden flex items-start justify-between gap-4">
                    {/* Left: Time, Discipline, Duration */}
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#EDEBE4] group-hover:text-[#D4FF3F] transition-colors tabular-nums">
                          {cls.time}
                        </span>
                        <span className="font-mono text-xs text-[#8A8F98] uppercase">
                          HRS
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold uppercase text-[#EDEBE4] group-hover:text-[#D4FF3F] transition-colors">
                        {cls.name}
                      </h3>
                      <p className="font-mono text-xs text-[#8A8F98]">
                        SESSION DURATION: {cls.duration}
                      </p>
                    </div>

                    {/* Right: Coach, Intensity, Book Action */}
                    <div className="flex flex-col items-end gap-2.5 shrink-0 text-right">
                      {/* Lead Trainer */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.12)] flex items-center justify-center font-mono text-[10px] text-[#D4FF3F]">
                          {cls.trainer.slice(0, 1)}
                        </div>
                        <span className="font-mono text-xs text-[#EDEBE4]">
                          {cls.trainer}
                        </span>
                      </div>

                      {/* Intensity & Area */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-1 rounded-[2px] text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                            cls.intensity === "High"
                              ? "bg-[#D4FF3F]/10 text-[#D4FF3F] border-[#D4FF3F]/30"
                              : "bg-[#0B0B0D] text-[#8A8F98] border-[rgba(237,235,228,0.1)]"
                          }`}
                        >
                          {cls.intensity}
                        </span>
                        <span className="font-mono text-[11px] text-[#8A8F98]">
                          OLYMPIC FLOOR
                        </span>
                      </div>

                      {/* Book CTA */}
                      <button
                        onClick={() => handleBook(cls)}
                        className="mt-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.15)] flex items-center justify-center gap-2 text-[#EDEBE4] group-hover:bg-[#D4FF3F] group-hover:text-[#0B0B0D] group-hover:border-[#D4FF3F] transition-all duration-300 font-mono text-xs uppercase"
                        aria-label={`Book ${cls.name} at ${cls.time}`}
                      >
                        <span className="font-mono font-bold text-xs uppercase tracking-wider">Book Session</span>
                        <AnimatedArrow type="up-right" size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Desktop Table Row (>= lg) */}
                  <div className="hidden lg:grid grid-cols-12 items-center gap-6">
                    {/* Column 1: Large Time Numeral in JetBrains Mono */}
                    <div className="col-span-3 flex items-baseline gap-2">
                      <span className="font-mono text-4xl md:text-5xl font-extrabold text-[#EDEBE4] group-hover:text-[#D4FF3F] transition-colors tabular-nums">
                        {cls.time}
                      </span>
                      <span className="font-mono text-xs text-[#8A8F98] uppercase">
                        HRS
                      </span>
                    </div>

                    {/* Column 2: Class Discipline */}
                    <div className="col-span-4">
                      <h3 className="font-display text-2xl md:text-3xl font-extrabold uppercase text-[#EDEBE4] group-hover:text-[#D4FF3F] transition-colors">
                        {cls.name}
                      </h3>
                      <p className="font-mono text-xs text-[#8A8F98] mt-0.5">
                        SESSION DURATION: {cls.duration}
                      </p>
                    </div>

                    {/* Column 3: Lead Trainer */}
                    <div className="col-span-2 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.12)] flex items-center justify-center font-mono text-[10px] text-[#D4FF3F]">
                        {cls.trainer.slice(0, 1)}
                      </div>
                      <span className="font-mono text-xs text-[#EDEBE4]">
                        {cls.trainer}
                      </span>
                    </div>

                    {/* Column 4: Intensity */}
                    <div className="col-span-2 flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-[2px] text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                          cls.intensity === "High"
                            ? "bg-[#D4FF3F]/10 text-[#D4FF3F] border-[#D4FF3F]/30"
                            : "bg-[#0B0B0D] text-[#8A8F98] border-[rgba(237,235,228,0.1)]"
                        }`}
                      >
                        {cls.intensity}
                      </span>
                      <span className="font-mono text-[11px] text-[#8A8F98]">
                        OLYMPIC FLOOR
                      </span>
                    </div>

                    {/* Column 5: Book CTA */}
                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={() => handleBook(cls)}
                        className="w-9 h-9 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.15)] flex items-center justify-center gap-2 text-[#EDEBE4] group-hover:bg-[#D4FF3F] group-hover:text-[#0B0B0D] group-hover:border-[#D4FF3F] transition-all duration-300 font-mono text-xs uppercase"
                        aria-label={`Book ${cls.name} at ${cls.time}`}
                      >
                        <AnimatedArrow type="up-right" size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Booking Modal */}
      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedClass={selectedClass}
        dayLabel={DAYS_OF_WEEK.find((d) => d.key === activeDay)?.full || "Monday"}
      />
    </section>
  );
}
