"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, Filter, Zap } from "lucide-react";
import { SCHEDULE, DAYS_OF_WEEK, DayOfWeek, ScheduleClass, Intensity } from "@/data/schedule";
import { BookModal } from "@/components/ui/BookModal";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";

export default function ClassesPage() {
  const [selectedDay, setSelectedDay] = useState<string>("All");
  const [selectedIntensity, setSelectedIntensity] = useState<string>("All");
  const [selectedClass, setSelectedClass] = useState<ScheduleClass | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Flatten all classes across the week with day tag
  const allClasses = DAYS_OF_WEEK.flatMap((d) =>
    (SCHEDULE[d.key] || []).map((c) => ({
      ...c,
      dayKey: d.key,
      dayFull: d.full,
    }))
  );

  const filteredClasses = allClasses.filter((item) => {
    const matchesDay = selectedDay === "All" || item.dayKey === selectedDay;
    const matchesIntensity =
      selectedIntensity === "All" || item.intensity === selectedIntensity;
    return matchesDay && matchesIntensity;
  });

  const handleBook = (cls: ScheduleClass) => {
    setSelectedClass(cls);
    setIsModalOpen(true);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 sm:pb-24 md:pb-36 bg-[#0B0B0D] text-[#EDEBE4] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-14 border-b border-[rgba(237,235,228,0.08)] pb-8 sm:pb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F]" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF3F]">
              TIMETABLE // GROUP ROSTER
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase text-[#EDEBE4] leading-[0.88] tracking-tight mb-4">
            Class Schedule
          </h1>
          <p className="font-body text-base text-[#8A8F98] max-w-2xl leading-relaxed">
            High-density coaching with small squad capacities capped at 14 athletes.
            Filter by day or training intensity to calibrate your weekly schedule.
          </p>
        </div>

        {/* Filter Toolbar (Clean 2-tier on laptop/tablet, single-row on xl) */}
        <div className="p-4 sm:p-5 rounded-[4px] bg-[#17181B] border border-[rgba(237,235,228,0.1)] mb-8 sm:mb-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 sm:gap-5">
          {/* Day Filter Strip */}
          <div className="flex items-center gap-2 overflow-x-auto w-full xl:w-auto pb-1 xl:pb-0 no-scrollbar">
            <span className="font-mono text-xs font-bold text-[#D4FF3F] uppercase tracking-widest flex items-center gap-1.5 mr-2 shrink-0">
              <Filter size={13} />
              <span>DAY:</span>
            </span>
            <button
              onClick={() => setSelectedDay("All")}
              className={`px-3.5 py-1.5 rounded-[2px] font-mono text-xs uppercase font-bold tracking-wider shrink-0 transition-all duration-200 ${
                selectedDay === "All"
                  ? "bg-[#D4FF3F] text-[#0B0B0D] shadow-[0_0_12px_rgba(212,255,63,0.3)]"
                  : "bg-[#0B0B0D] text-[#8A8F98] border border-[rgba(237,235,228,0.1)] hover:text-[#EDEBE4] hover:border-[#EDEBE4]/40"
              }`}
            >
              All Days
            </button>
            {DAYS_OF_WEEK.map((d) => (
              <button
                key={d.key}
                onClick={() => setSelectedDay(d.key)}
                className={`px-3.5 py-1.5 rounded-[2px] font-mono text-xs uppercase font-bold tracking-wider shrink-0 transition-all duration-200 ${
                  selectedDay === d.key
                    ? "bg-[#D4FF3F] text-[#0B0B0D] shadow-[0_0_12px_rgba(212,255,63,0.3)]"
                    : "bg-[#0B0B0D] text-[#8A8F98] border border-[rgba(237,235,228,0.1)] hover:text-[#EDEBE4] hover:border-[#EDEBE4]/40"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Intensity Filter Strip (Never wraps messily into 2 stacked lines) */}
          <div className="flex items-center gap-2 overflow-x-auto w-full xl:w-auto pt-3 xl:pt-0 border-t border-[rgba(237,235,228,0.06)] xl:border-t-0 shrink-0 no-scrollbar">
            <span className="font-mono text-xs font-bold text-[#8A8F98] uppercase tracking-widest mr-2 shrink-0 flex items-center gap-1.5">
              <Zap size={13} className="text-[#D4FF3F]" />
              <span>INTENSITY:</span>
            </span>
            {["All", "Low", "Medium", "High"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedIntensity(level)}
                className={`px-3.5 py-1.5 rounded-[2px] font-mono text-xs uppercase font-bold tracking-wider shrink-0 transition-all duration-200 ${
                  selectedIntensity === level
                    ? "bg-[#D4FF3F] text-[#0B0B0D] shadow-[0_0_12px_rgba(212,255,63,0.3)]"
                    : "bg-[#0B0B0D] text-[#8A8F98] border border-[rgba(237,235,228,0.1)] hover:text-[#EDEBE4] hover:border-[#EDEBE4]/40"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between font-mono text-xs text-[#8A8F98] mb-6">
          <span>
            SHOWING <strong className="text-[#D4FF3F] font-bold">{filteredClasses.length}</strong> SESSIONS
          </span>
          {filteredClasses.length === 0 && (
            <span className="text-[#D4FF3F]">No classes found matching filters</span>
          )}
        </div>

        {/* Grid of Classes */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          <AnimatePresence>
            {filteredClasses.map((cls) => {
              const isHigh = cls.intensity === "High";

              return (
                <motion.div
                  key={`${cls.dayKey}-${cls.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 sm:p-7 rounded-[4px] bg-[#17181B] border border-[rgba(237,235,228,0.08)] hover:border-[#D4FF3F] transition-all duration-300 flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-[2px] bg-[#0B0B0D] text-[#EDEBE4] border border-[rgba(237,235,228,0.12)]">
                        {cls.dayFull}
                      </span>
                      <span
                        className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-[2px] border ${
                          isHigh
                            ? "bg-[#D4FF3F]/10 text-[#D4FF3F] border-[#D4FF3F]/30"
                            : "bg-[#0B0B0D] text-[#8A8F98] border-[rgba(237,235,228,0.1)]"
                        }`}
                      >
                        {cls.intensity}
                      </span>
                    </div>

                    {/* Class Name */}
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#EDEBE4] mb-3 group-hover:text-[#D4FF3F] transition-colors">
                      {cls.name}
                    </h3>

                    {/* Time & Trainer Metadata */}
                    <div className="space-y-2 font-mono text-xs text-[#8A8F98] mb-6">
                      <div className="flex items-center gap-2">
                        <Clock size={13} className="text-[#D4FF3F]" />
                        <span>
                          {cls.time} HRS &bull; {cls.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={13} className="text-[#EDEBE4]" />
                        <span>COACH: {cls.trainer}</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking CTA Button */}
                  <button
                    onClick={() => handleBook(cls)}
                    className="w-full py-3 rounded-[2px] bg-[#0B0B0D] border border-[rgba(237,235,228,0.15)] text-xs font-mono font-bold uppercase tracking-wider text-[#EDEBE4] group-hover:bg-[#D4FF3F] group-hover:text-[#0B0B0D] group-hover:border-[#D4FF3F] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Reserve Spot</span>
                    <AnimatedArrow type="up-right" size={14} />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <BookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedClass={selectedClass}
        dayLabel={selectedDay === "All" ? "Reserved Date" : selectedDay}
      />
    </div>
  );
}
