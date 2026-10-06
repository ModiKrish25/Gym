import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Please provide your full name (minimum 2 characters)" }),
  email: z
    .string()
    .email({ message: "Enter a valid email like name@example.com" }),
  phone: z
    .string()
    .min(10, { message: "Enter a valid 10-digit phone number" })
    .regex(/^[0-9+\s()-]+$/, { message: "Please enter a valid phone format" }),
  interest: z.enum(
    [
      "Strength Training",
      "Fat Loss Lab",
      "Functional Fitness",
      "Yoga & Mobility",
      "HIIT Ignite",
      "Personal Coaching",
    ],
    {
      required_error: "Please select a training program of interest",
    }
  ),
  preferredTime: z
    .string()
    .min(1, { message: "Please select your preferred training time" }),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Enter a valid email like name@example.com" }),
  phone: z.string().min(10, { message: "Enter a valid phone number" }),
  className: z.string().min(1, { message: "Class name is required" }),
  trainer: z.string().min(1, { message: "Trainer name is required" }),
  timeSlot: z.string().min(1, { message: "Time slot is required" }),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
