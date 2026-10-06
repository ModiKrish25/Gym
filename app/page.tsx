import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Programs } from "@/components/sections/Programs";
import { Method } from "@/components/sections/Method";
import { Trainers } from "@/components/sections/Trainers";
import { Facilities } from "@/components/sections/Facilities";
import { FacilityZones } from "@/components/sections/FacilityZones";
import { Schedule } from "@/components/sections/Schedule";
import { Results } from "@/components/sections/Results";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { NutritionRecovery } from "@/components/sections/NutritionRecovery";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Marquee ticker */}
      <Marquee />

      {/* 3. Programs */}
      <Programs />

      {/* 5. The GYM Method */}
      <Method />

      {/* 6. Trainers */}
      <Trainers />

      {/* 7. Facilities */}
      <Facilities />

      {/* 7a. Interactive Timber Hover-Reveal Zones */}
      <FacilityZones />

      {/* 8. Class schedule */}
      <Schedule />

      {/* 9. Results */}
      <Results />

      {/* 10. Pricing */}
      <Pricing />

      {/* 11. Testimonials */}
      <Testimonials />

      {/* 12. Nutrition & Recovery */}
      <NutritionRecovery />

      {/* 13. FAQ */}
      <Faq />

      {/* 14. CTA banner */}
      <CtaBanner />

      {/* 15. Contact section */}
      <ContactSection />
    </>
  );
}
