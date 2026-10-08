"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/3d-testimonails";

// Athlete community reviews
const testimonials = [
  {
    name: "Ava Green",
    username: "@ava_lifts",
    body: "The calibrated Olympic bars and movement screen completely transformed my snatch technique!",
    img: "https://cdn.21st.dev/assets/mirror/55/55cf6231499bcdc496f15ff1d28d4170ac9b99e9279495caa44fca70886d8b2e.jpg",
    country: "🇦🇺 Australia",
  },
  {
    name: "Ana Miller",
    username: "@ana.power",
    body: "Cleanest, most serious facility I have ever stepped into. Coaching feedback is second to none.",
    img: "https://cdn.21st.dev/assets/mirror/f0/f07b84f12ef125cbb837a7bd64da401992f5f62bd55fee10d01cd3dcc8abae80.jpg",
    country: "🇩🇪 Germany",
  },
  {
    name: "Mateo Rossi",
    username: "@mat_strength",
    body: "Added 45kg to my squat total in 16 weeks following the calibrated overload program.",
    img: "https://cdn.21st.dev/assets/mirror/7c/7c0d2aa99715b15c218385f5679347782843c02f939d8eee6f9cb1cad6ba6ed0.jpg",
    country: "🇮🇹 Italy",
  },
  {
    name: "Maya Patel",
    username: "@maya_fit",
    body: "The atmosphere pushes you to break PRs every session. Pure focus, zero fluff.",
    img: "https://cdn.21st.dev/assets/mirror/f8/f8f2ddc445b6b2318430260bdebb665c9415865827230565aa42f57c9c794baf.jpg",
    country: "🇮🇳 India",
  },
  {
    name: "Noah Smith",
    username: "@noah_rep",
    body: "Machined billet steel plates, dedicated chalk stations, and true athletes only.",
    img: "https://cdn.21st.dev/assets/mirror/ae/ae1d49872fdd6f8d9aa933f6ca8bce8cb1ba7e87dfb9d2926661184cb7bfe26d.jpg",
    country: "🇺🇸 USA",
  },
  {
    name: "Lucas Stone",
    username: "@luc_iron",
    body: "Movement screen caught my hip mobility limits before I loaded heavy. Essential protocol.",
    img: "https://cdn.21st.dev/assets/mirror/9a/9aac54d62e727561f6958213b8a3649230a3bba61ba5ddf63c69d3c6e4aecb0a.jpg",
    country: "🇫🇷 France",
  },
  {
    name: "Haruto Sato",
    username: "@haru_cross",
    body: "The infrared suites and contrast baths keep my central nervous system ready every dawn.",
    img: "https://cdn.21st.dev/assets/mirror/e5/e55f3cdab57eb4084f7006cfe9f7f047e638e1b257a53498aaed14b83087152a.jpg",
    country: "🇯🇵 Japan",
  },
  {
    name: "Emma Lee",
    username: "@emma_coach",
    body: "Every repetition is held to strict competition standard. No false reps, no shortcuts.",
    img: "https://cdn.21st.dev/assets/mirror/03/03410c155320ba33ecb8d798807c6c9610f33b2b2acdd4ed961a68185806df79.jpg",
    country: "🇨🇦 Canada",
  },
  {
    name: "Carlos Ray",
    username: "@carl_beast",
    body: "One more rep isn't a slogan here — it is the culture on every platform.",
    img: "https://cdn.21st.dev/assets/mirror/b5/b58616f0d669595c9a42d60a0b9803364c9859f1c3db93a5e3dc408b603e03e8.jpg",
    country: "🇪🇸 Spain",
  },
];

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
  return (
    <Card className="w-52 sm:w-56 shrink-0 bg-[#17181B] border border-[rgba(237,235,228,0.1)] text-[#EDEBE4] shadow-2xl rounded-[4px] p-4 hover:border-[#D4FF3F]/50 transition-colors select-none">
      <CardContent className="p-0">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9 rounded-full border border-[rgba(237,235,228,0.15)] shrink-0">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback className="bg-[#222429] text-[#EDEBE4] text-xs font-bold font-mono">
              {name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <figcaption className="text-sm font-semibold text-[#EDEBE4] flex items-center gap-1.5 leading-tight truncate">
              <span className="truncate">{name}</span>
              <span className="text-[11px] shrink-0 opacity-80">{country}</span>
            </figcaption>
            <p className="text-xs font-mono text-[#8A8F98] truncate">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-xs sm:text-sm text-[#8A8F98] leading-relaxed">
          &ldquo;{body}&rdquo;
        </blockquote>
      </CardContent>
    </Card>
  );
}

// Staggered datasets for visual variety across columns
const col1 = testimonials;
const col2 = [...testimonials.slice(3), ...testimonials.slice(0, 3)];
const col3 = [...testimonials.slice(6), ...testimonials.slice(0, 6)];
const col4 = [...testimonials.slice(2), ...testimonials.slice(0, 2)];
const col5 = [...testimonials.slice(5), ...testimonials.slice(0, 5)];
const col6 = [...testimonials.slice(1), ...testimonials.slice(0, 1)];
const col7 = [...testimonials.slice(4), ...testimonials.slice(0, 4)];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-14 sm:py-16 md:py-20 bg-[#0B0B0D] border-b border-[rgba(237,235,228,0.08)] relative overflow-hidden w-full"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 mb-10 md:mb-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(237,235,228,0.08)] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-[1px] bg-[#D4FF3F]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D4FF3F]">
                VOICES FROM THE FLOOR
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase text-[#EDEBE4] leading-[0.88] tracking-tight">
              Athlete Verified
            </h2>
          </div>
        </div>
      </div>

      {/* Responsive 3D Perspective Marquee Stage (bound to full width without window scrollbars) */}
      <div className="relative w-full max-w-full h-[520px] sm:h-[680px] md:h-[780px] lg:h-[840px] flex items-center justify-center overflow-hidden [perspective:700px] md:[perspective:900px] lg:[perspective:1100px]">
        {/* Angled 3D Isometric Wall */}
        <div
          className="flex flex-row items-center gap-3 sm:gap-5 md:gap-6 scale-95 sm:scale-105 md:scale-110 lg:scale-120"
          style={{
            transform:
              "translateX(10px) translateY(0px) translateZ(-40px) rotateX(18deg) rotateY(-10deg) rotateZ(14deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Column 1: Top to Bottom */}
          <Marquee
            vertical
            reverse
            pauseOnHover
            repeat={4}
            style={{ ["--duration" as any]: "32s" }}
            className="[--duration:32s]"
          >
            {col1.map((review, idx) => (
              <TestimonialCard key={`c1-${review.username}-${idx}`} {...review} />
            ))}
          </Marquee>

          {/* Column 2: Bottom to Top */}
          <Marquee
            vertical
            pauseOnHover
            repeat={4}
            style={{ ["--duration" as any]: "40s" }}
            className="[--duration:40s]"
          >
            {col2.map((review, idx) => (
              <TestimonialCard key={`c2-${review.username}-${idx}`} {...review} />
            ))}
          </Marquee>

          {/* Column 3: Top to Bottom */}
          <Marquee
            vertical
            reverse
            pauseOnHover
            repeat={4}
            style={{ ["--duration" as any]: "35s" }}
            className="[--duration:35s]"
          >
            {col3.map((review, idx) => (
              <TestimonialCard key={`c3-${review.username}-${idx}`} {...review} />
            ))}
          </Marquee>

          {/* Column 4: Bottom to Top (Hidden on small mobile) */}
          <Marquee
            vertical
            pauseOnHover
            repeat={4}
            style={{ ["--duration" as any]: "44s" }}
            className="[--duration:44s] hidden sm:flex"
          >
            {col4.map((review, idx) => (
              <TestimonialCard key={`c4-${review.username}-${idx}`} {...review} />
            ))}
          </Marquee>

          {/* Column 5: Top to Bottom (Hidden on mobile) */}
          <Marquee
            vertical
            reverse
            pauseOnHover
            repeat={4}
            style={{ ["--duration" as any]: "30s" }}
            className="[--duration:30s] hidden md:flex"
          >
            {col5.map((review, idx) => (
              <TestimonialCard key={`c5-${review.username}-${idx}`} {...review} />
            ))}
          </Marquee>

          {/* Column 6: Bottom to Top (Hidden on tablet and below) */}
          <Marquee
            vertical
            pauseOnHover
            repeat={4}
            style={{ ["--duration" as any]: "38s" }}
            className="[--duration:38s] hidden lg:flex"
          >
            {col6.map((review, idx) => (
              <TestimonialCard key={`c6-${review.username}-${idx}`} {...review} />
            ))}
          </Marquee>

          {/* Column 7: Top to Bottom (Hidden on small laptop and below) */}
          <Marquee
            vertical
            reverse
            pauseOnHover
            repeat={4}
            style={{ ["--duration" as any]: "34s" }}
            className="[--duration:34s] hidden xl:flex"
          >
            {col7.map((review, idx) => (
              <TestimonialCard key={`c7-${review.username}-${idx}`} {...review} />
            ))}
          </Marquee>
        </div>

        {/* Full-bleed Gradient overlays fading seamlessly into background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#0B0B0D] via-[#0B0B0D]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-36 md:w-64 bg-gradient-to-r from-[#0B0B0D] via-[#0B0B0D]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-36 md:w-64 bg-gradient-to-l from-[#0B0B0D] via-[#0B0B0D]/80 to-transparent z-20" />
      </div>
    </section>
  );
}

export default Testimonials;
