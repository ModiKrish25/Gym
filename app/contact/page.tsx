import { ContactSection } from "@/components/sections/ContactSection";

export const metadata = {
  title: "Contact & Induction | GYM – Elite Fitness Club",
  description:
    "Schedule your movement assessment or speak directly with our performance staff at GYM Elite Fitness Club.",
};

export default function ContactPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#0A1220]">
      <ContactSection />
    </div>
  );
}
