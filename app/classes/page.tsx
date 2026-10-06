"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, Filter } from "lucide-react";
import { SCHEDULE, DAYS_OF_WEEK, DayOfWeek, ScheduleClass, Intensity } from "@/data/schedule";
import { BookModal } from "@/components/ui/BookModal";

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
    <div className="pt-36 pb-24 md:pb-36 bg-[#0A1220] min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#FF6B35] font-semibold mb-3 block">
            Class Directory
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold text-[#F5F6F8] mb-4">
            Curated Group Sessions
          </h1>
          <p className="text-base text-[#8E9BB0] leading-relaxed">
            High-density coaching with small squad capacities. Filter by day or intensity
            to find your training cadence.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="p-6 rounded-3xl bg-[#121C30] border border-[rgba(142,155,176,0.18)] mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Day Filter */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <span className="text-xs font-semibold text-[#8E9BB0] uppercase tracking-wider flex items-center gap-1.5 mr-2 shrink-0">
              <Filter size={14} className="text-[#FF6B35]" />
              <span>Day:</span>
            </span>
            <button
              onClick={() => setSelectedDay("All")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                selectedDay === "All"
                  ? "bg-[#FF6B35] text-[#0A1220]"
                  : "bg-[#0A1220] text-[#8E9BB0] hover:text-[#F5F6F8]"
              }`}
            >
              All Days
            </button>
            {DAYS_OF_WEEK.map((d) => (
              <button
                key={d.key}
                onClick={() => setSelectedDay(d.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors ${
                  selectedDay === d.key
                    ? "bg-[#FF6B35] text-[#0A1220]"
                    : "bg-[#0A1220] text-[#8E9BB0] hover:text-[#F5F6F8]"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Intensity Filter */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-[#8E9BB0] uppercase tracking-wider mr-2">
              Intensity:
            </span>
            {["All", "Low", "Medium", "High"].map((level) => (
              <button
                key={level}
                onClick={() => setSelectedIntensity(level)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  selectedIntensity === level
                    ? "bg-[#FF6B35] text-[#0A1220]"
                    : "bg-[#0A1220] text-[#8E9BB0] hover:text-[#F5F6F8]"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#8E9BB0] mb-6">
          <span>
            Showing <strong className="text-[#F5F6F8]">{filteredClasses.length}</strong> sessions
          </span>
          {filteredClasses.length === 0 && (
            <span>Try adjusting your filters above</span>
          )}
        </div>

        {/* Grid of Classes */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredClasses.map((cls) => {
              const isHigh = cls.intensity === "High";

              return (
                <motion.div
                  key={`${cls.dayKey}-${cls.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="p-7 rounded-3xl bg-[#121C30] border border-[rgba(142,155,176,0.18)] hover:border-[#FF6B35]/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#0A1220] text-[#FFB38A] border border-[rgba(142,155,176,0.2)]">
                        {cls.dayFull}
                      </span>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          isHigh
                            ? "bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/40"
                            : "bg-[#0A1220] text-[#8E9BB0] border border-[rgba(142,155,176,0.25)]"
                        }`}
                      >
                        {cls.intensity}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-[#F5F6F8] mb-2 group-hover:text-[#FF6B35] transition-colors">
                      {cls.name}
                    </h3>

                    <div className="space-y-1.5 text-xs text-[#8E9BB0] mb-6">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-[#FF6B35]" />
                        <span>
                          {cls.time} ({cls.duration})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-[#FFB38A]" />
                        <span>Coach: {cls.trainer}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBook(cls)}
                    className="w-full py-3 rounded-full border border-[#F5F6F8]/30 text-xs font-bold uppercase tracking-wider text-[#F5F6F8] hover:bg-[#FF6B35] hover:text-[#0A1220] hover:border-[#FF6B35] transition-all"
                  >
                    Reserve Spot
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
