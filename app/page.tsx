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
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionReveal } from "@/components/motion/SectionReveal";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Marquee ticker */}
      <SectionReveal>
        <Marquee />
      </SectionReveal>

      {/* 3. Programs */}
      <SectionReveal>
        <Programs />
      </SectionReveal>

      {/* 4. The GYM Method */}
      <SectionReveal>
        <Method />
      </SectionReveal>

      {/* 5. Trainers */}
      <SectionReveal>
        <Trainers />
      </SectionReveal>

      {/* 6. Facilities */}
      <SectionReveal>
        <Facilities />
      </SectionReveal>

      {/* 7. Interactive Timber Hover-Reveal Zones */}
      <SectionReveal>
        <FacilityZones />
      </SectionReveal>

      {/* 8. Class schedule */}
      <SectionReveal>
        <Schedule />
      </SectionReveal>

      {/* 9. Results */}
      <SectionReveal>
        <Results />
      </SectionReveal>

      {/* 10. Pricing */}
      <SectionReveal>
        <Pricing />
      </SectionReveal>

      {/* 11. Testimonials */}
      <SectionReveal>
        <Testimonials />
      </SectionReveal>

      {/* 12. FAQ */}
      <SectionReveal>
        <Faq />
      </SectionReveal>

      {/* 14. CTA banner */}
      <SectionReveal>
        <CtaBanner />
      </SectionReveal>

      {/* 15. Contact section */}
      <SectionReveal>
        <ContactSection />
      </SectionReveal>
    </>
  );
}
