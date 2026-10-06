"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingFormSchema, BookingFormData } from "@/lib/validators";
import { ScheduleClass } from "@/data/schedule";

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClass: ScheduleClass | null;
  dayLabel: string;
}

export function BookModal({
  isOpen,
  onClose,
  selectedClass,
  dayLabel,
}: BookModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
  });

  useEffect(() => {
    if (selectedClass) {
      setValue("className", selectedClass.name);
      setValue("trainer", selectedClass.trainer);
      setValue("timeSlot", `${dayLabel} at ${selectedClass.time}`);
    }
  }, [selectedClass, dayLabel, setValue]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsSuccess(false);
    } else {
      document.body.style.overflow = "";
      reset();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, reset]);

  // Escape key closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    // Simulate API reservation
    await new Promise((r) => setTimeout(r, 900));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0A1220]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg rounded-2xl sm:rounded-3xl bg-[#121C30] border border-[rgba(142,155,176,0.25)] p-5 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto my-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-modal-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#8E9BB0] hover:text-[#F5F6F8] hover:bg-[#0A1220] transition-colors focus:outline-none"
              aria-label="Close booking modal"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35] flex items-center justify-center text-[#FF6B35] mx-auto mb-4">
                  <Check size={28} />
                </div>
                <h3
                  id="book-modal-title"
                  className="font-heading text-2xl font-bold text-[#F5F6F8] mb-2"
                >
                  Spot Reserved
                </h3>
                <p className="text-sm text-[#8E9BB0] max-w-xs mx-auto mb-6">
                  You are registered for{" "}
                  <span className="text-[#F5F6F8] font-medium">
                    {selectedClass?.name}
                  </span>{" "}
                  with {selectedClass?.trainer}. We have emailed confirmation to your
                  inbox.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#FF6B35] text-[#0A1220] font-semibold text-sm hover:bg-[#e85e2b] transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <span className="text-xs uppercase tracking-widest text-[#FF6B35] font-semibold block mb-1">
                  Class Reservation
                </span>
                <h3
                  id="book-modal-title"
                  className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F6F8] mb-1"
                >
                  Book Your Spot
                </h3>
                <p className="text-xs text-[#8E9BB0] mb-6">
                  {selectedClass?.name} • {selectedClass?.trainer} • {dayLabel} at{" "}
                  {selectedClass?.time} ({selectedClass?.duration})
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8E9BB0] font-medium mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Arjun Patel"
                      {...register("fullName")}
                      className="w-full px-4 py-3 rounded-2xl bg-[#0A1220] border border-[rgba(142,155,176,0.2)] text-sm text-[#F5F6F8] placeholder:text-[#8E9BB0]/50 focus:border-[#FF6B35] focus:outline-none transition-colors"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-[#FF6B35] mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8E9BB0] font-medium mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-2xl bg-[#0A1220] border border-[rgba(142,155,176,0.2)] text-sm text-[#F5F6F8] placeholder:text-[#8E9BB0]/50 focus:border-[#FF6B35] focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#FF6B35] mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8E9BB0] font-medium mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      {...register("phone")}
                      className="w-full px-4 py-3 rounded-2xl bg-[#0A1220] border border-[rgba(142,155,176,0.2)] text-sm text-[#F5F6F8] placeholder:text-[#8E9BB0]/50 focus:border-[#FF6B35] focus:outline-none transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#FF6B35] mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <input type="hidden" {...register("className")} />
                  <input type="hidden" {...register("trainer")} />
                  <input type="hidden" {...register("timeSlot")} />

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-[#FF6B35] text-[#0A1220] font-bold text-sm tracking-wide hover:bg-[#e85e2b] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Securing spot...</span>
                        </>
                      ) : (
                        <span>Confirm reservation</span>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
