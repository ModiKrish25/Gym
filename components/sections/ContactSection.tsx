"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Check, MapPin, Phone, Mail, Clock } from "lucide-react";
import { contactFormSchema, ContactFormData } from "@/lib/validators";
import { BRAND } from "@/data/content";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        setSuccessMessage(
          json.message ||
            `Thanks, ${data.fullName}. We'll confirm your trial within 24 hours.`
        );
        reset();
      } else {
        setServerError(json.message || "Failed to submit request.");
      }
    } catch {
      setServerError("Network error. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-36 bg-[#0A1220] border-b border-[rgba(142,155,176,0.18)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Details & Map Placeholder (5 cols) */}
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-widest text-[#FF6B35] font-semibold mb-3 block">
              Direct Contact
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-[#F5F6F8] mb-6">
              Step Into the Club
            </h2>
            <p className="text-base text-[#8E9BB0] leading-relaxed mb-10">
              Schedule a comprehensive baseline screening, tour our platforms, or speak
              directly with our lead strength coach.
            </p>

            {/* Contact Information List */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#121C30] border border-[rgba(142,155,176,0.2)] flex items-center justify-center text-[#FF6B35] shrink-0 mt-0.5">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-[#8E9BB0] tracking-wider mb-1">
                    Location
                  </h4>
                  <p className="text-sm font-medium text-[#F5F6F8]">{BRAND.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#121C30] border border-[rgba(142,155,176,0.2)] flex items-center justify-center text-[#FF6B35] shrink-0 mt-0.5">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-[#8E9BB0] tracking-wider mb-1">
                    Direct Line
                  </h4>
                  <p className="text-sm font-medium text-[#F5F6F8]">{BRAND.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#121C30] border border-[rgba(142,155,176,0.2)] flex items-center justify-center text-[#FF6B35] shrink-0 mt-0.5">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-[#8E9BB0] tracking-wider mb-1">
                    Inquiries
                  </h4>
                  <p className="text-sm font-medium text-[#F5F6F8]">{BRAND.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#121C30] border border-[rgba(142,155,176,0.2)] flex items-center justify-center text-[#FF6B35] shrink-0 mt-0.5">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-semibold text-[#8E9BB0] tracking-wider mb-1">
                    Operating Hours
                  </h4>
                  <p className="text-sm font-medium text-[#F5F6F8]">
                    {BRAND.hours.weekdays}
                  </p>
                  <p className="text-sm text-[#8E9BB0]">{BRAND.hours.sunday}</p>
                </div>
              </div>
            </div>

            {/* Stylized Map Placeholder */}
            <div className="h-48 w-full rounded-3xl bg-[#121C30] border border-[rgba(142,155,176,0.2)] relative overflow-hidden flex items-center justify-center p-6 text-center">
              <div className="absolute inset-0 bg-[#0A1220]/40" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35] flex items-center justify-center text-[#FF6B35] mx-auto mb-2">
                  <MapPin size={20} />
                </div>
                <p className="font-heading text-base font-bold text-[#F5F6F8]">
                  Surat Flagship Facility
                </p>
                <p className="text-xs text-[#8E9BB0]">Free member parking available on-site</p>
              </div>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-3xl bg-[#121C30] border border-[rgba(142,155,176,0.2)] shadow-2xl">
            {successMessage ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35] flex items-center justify-center text-[#FF6B35] mx-auto mb-5">
                  <Check size={32} />
                </div>
                <h3 className="font-heading text-3xl font-bold text-[#F5F6F8] mb-3">
                  Request Confirmed
                </h3>
                <p className="text-base text-[#8E9BB0] max-w-md mx-auto mb-8">
                  {successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setSuccessMessage(null)}
                  className="px-8 py-3 rounded-full bg-[#FF6B35] text-[#0A1220] font-semibold text-sm hover:bg-[#e85e2b] transition-all"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F6F8] mb-2">
                    Request an Induction Session
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8E9BB0] mb-6">
                    Fill out the form below. A performance coach will contact you to schedule
                    your assessment.
                  </p>
                </div>

                {serverError && (
                  <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-sm text-red-200">
                    {serverError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8E9BB0] font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vikram Sharma"
                      {...register("fullName")}
                      className="w-full px-4 py-3 rounded-2xl bg-[#0A1220] border border-[rgba(142,155,176,0.2)] text-sm text-[#F5F6F8] placeholder:text-[#8E9BB0]/40 focus:border-[#FF6B35] focus:outline-none transition-colors"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-[#FF6B35] mt-1.5 font-medium">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8E9BB0] font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-2xl bg-[#0A1220] border border-[rgba(142,155,176,0.2)] text-sm text-[#F5F6F8] placeholder:text-[#8E9BB0]/40 focus:border-[#FF6B35] focus:outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs text-[#FF6B35] mt-1.5 font-medium">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8E9BB0] font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      {...register("phone")}
                      className="w-full px-4 py-3 rounded-2xl bg-[#0A1220] border border-[rgba(142,155,176,0.2)] text-sm text-[#F5F6F8] placeholder:text-[#8E9BB0]/40 focus:border-[#FF6B35] focus:outline-none transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-xs text-[#FF6B35] mt-1.5 font-medium">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Interested in */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8E9BB0] font-semibold mb-2">
                      Interested In *
                    </label>
                    <select
                      {...register("interest")}
                      defaultValue="Strength Training"
                      className="w-full px-4 py-3 rounded-2xl bg-[#0A1220] border border-[rgba(142,155,176,0.2)] text-sm text-[#F5F6F8] focus:border-[#FF6B35] focus:outline-none transition-colors"
                    >
                      <option value="Strength Training">Strength Training</option>
                      <option value="Fat Loss Lab">Fat Loss Lab</option>
                      <option value="Functional Fitness">Functional Fitness</option>
                      <option value="Yoga & Mobility">Yoga & Mobility</option>
                      <option value="HIIT Ignite">HIIT Ignite</option>
                      <option value="Personal Coaching">Personal Coaching</option>
                    </select>
                    {errors.interest && (
                      <p className="text-xs text-[#FF6B35] mt-1.5 font-medium">
                        {errors.interest.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Preferred time */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8E9BB0] font-semibold mb-2">
                    Preferred Training Window *
                  </label>
                  <select
                    {...register("preferredTime")}
                    defaultValue="Morning (06:00 - 10:00)"
                    className="w-full px-4 py-3 rounded-2xl bg-[#0A1220] border border-[rgba(142,155,176,0.2)] text-sm text-[#F5F6F8] focus:border-[#FF6B35] focus:outline-none transition-colors"
                  >
                    <option value="Early Morning (05:00 - 07:00)">
                      Early Morning (05:00 - 07:00)
                    </option>
                    <option value="Morning (07:00 - 11:00)">
                      Morning (07:00 - 11:00)
                    </option>
                    <option value="Afternoon (12:00 - 16:00)">
                      Afternoon (12:00 - 16:00)
                    </option>
                    <option value="Evening (17:00 - 21:00)">
                      Evening (17:00 - 21:00)
                    </option>
                    <option value="Late Evening (21:00 - 23:00)">
                      Late Evening (21:00 - 23:00)
                    </option>
                  </select>
                  {errors.preferredTime && (
                    <p className="text-xs text-[#FF6B35] mt-1.5 font-medium">
                      {errors.preferredTime.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8E9BB0] font-semibold mb-2">
                    Message / Training History (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your fitness background, injuries, or specific objectives..."
                    {...register("message")}
                    className="w-full px-4 py-3 rounded-2xl bg-[#0A1220] border border-[rgba(142,155,176,0.2)] text-sm text-[#F5F6F8] placeholder:text-[#8E9BB0]/40 focus:border-[#FF6B35] focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#FF6B35] text-[#0A1220] font-bold text-sm uppercase tracking-wider hover:bg-[#e85e2b] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B35]/20 disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <span>Send request</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
