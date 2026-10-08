"use client";

// components/sections/Hero.tsx   (npm i gsap @gsap/react)
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LetterSwap } from "@/components/ui/LetterSwap";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const wrap = "mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8"; // same container as Navbar
const displayFont = "var(--font-display), Anton, Impact, sans-serif";
const display = "font-[family-name:var(--font-display)]";
const stats = [
  { n: 5000, s: "+", l: "Members" },
  { n: 40, s: "+", l: "Expert coaches" },
  { n: 120, s: "+", l: "Weekly classes" },
  { n: 12, s: " yrs", l: "Of excellence" },
];
const label = "text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.22em]";

// Barbell: the bar doubles as the divider above the stats. Plates are outer -> inner (largest next to the collar).
const plateH = ["h-7 sm:h-10", "h-10 sm:h-14", "h-14 sm:h-[4.5rem]"];
function PlateStack({ side }: { side: "l" | "r" }) {
  const order = side === "l" ? plateH : [...plateH].reverse();
  return (
    <div className="flex items-center gap-0.5 sm:gap-1">
      {order.map((h, i) => (
        <span
          key={i}
          className={`plate-${side} ${h} w-2 sm:w-3 rounded-sm border shrink-0 ${
            h === plateH[2] ? "border-[#D4FF3F] bg-[#D4FF3F]" : "border-white/40 bg-[#17181B]"
          }`}
        />
      ))}
    </div>
  );
}

function Barbell() {
  return (
    <div className="barbell flex h-14 sm:h-[4.5rem] items-center overflow-hidden" aria-hidden>
      <PlateStack side="l" />
      <span className="collar h-5 sm:h-7 w-1.5 sm:w-2 bg-[#EDEBE4] shrink-0" />
      <span className="bar-line h-[2px] sm:h-[3px] flex-1 origin-center bg-[#8A8F98]" />
      <span className="collar h-5 sm:h-7 w-1.5 sm:w-2 bg-[#EDEBE4] shrink-0" />
      <PlateStack side="r" />
    </div>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, paused: true });
        tl.from(".bg", { scale: 1.12, duration: 2.2 }, 0)
          .from(".inner", { yPercent: 115, duration: 1.1, stagger: 0.1 }, 0.15)
          .from(".pill", { scaleX: 0, transformOrigin: "left center", duration: 0.9 }, 0.9)
          .from(".fade", { y: 20, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.7)
          // Barbell: bar draws out from the center, plates slide on (innermost first), collars lock
          .from(".bar-line", { scaleX: 0, duration: 1.2 }, 0.9)
          .from(".plate-l", { x: -320, opacity: 0, duration: 1, stagger: { each: 0.12, from: "end" } }, 1.0)
          .from(".plate-r", { x: 320, opacity: 0, duration: 1, stagger: { each: 0.12, from: "start" } }, 1.0)
          .from(".collar", { scaleY: 0, duration: 0.5 }, 1.5);

        gsap.utils.toArray<HTMLElement>(".count").forEach((el) => {
          const o = { v: 0 };
          el.textContent = "0";
          tl.to(
            o,
            {
              v: Number(el.dataset.n),
              duration: 2,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = Math.round(o.v).toLocaleString("en-US");
              },
            },
            0.8,
          );
        });

        // Subtle parallax on the background while scrolling away
        gsap.to(".bg", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        // The bar "lifts" and tilts slightly as you scroll away
        gsap.to(".barbell", {
          y: -40,
          rotate: -1.2,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        // Wait for <Preloader />; play at once if it already ran this session
        const go = () => tl.play();
        if (sessionStorage.getItem("gym-preloaded")) {
          go();
        } else {
          window.addEventListener("preloader:done", go, { once: true });
          // Safety timeout ensures animation never hangs
          setTimeout(go, 5500);
        }
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0B0B0D] text-[#EDEBE4]">
      {/* Background: /public/hero.mp4 + /public/hero-poster.jpg */}
      <div className="bg absolute inset-0">
        <video
          className="h-full w-full object-cover grayscale contrast-125 brightness-[.55]"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop"
        >
          <source src="/hero.mp4" type="video/mp4" />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-male-athlete-doing-deadlifts-in-a-gym-43026-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0B0B0D_0%,rgba(11,11,13,.85)_38%,rgba(11,11,13,.15)_80%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0B0B0D] to-transparent" />
      </div>

      <div className={`${wrap} relative z-10 flex flex-1 flex-col pt-28`}>
        {/* Headline + CTAs */}
        <div className="flex flex-1 flex-col justify-center py-6 sm:py-8">
          <h1
            className={`${display} font-normal uppercase leading-[0.92] text-[clamp(2.75rem,min(12vw,14vh),13.5rem)]`}
            style={{ fontFamily: displayFont }}
          >
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="inner block">Forge your</span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span
                className="inner block"
                style={{ WebkitTextStroke: "clamp(1.5px, 0.4vw, 2.5px) #EDEBE4", color: "transparent", paintOrder: "stroke fill" }}
              >
                Strongest
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="inner flex items-center gap-[0.2em] text-[#D4FF3F]">
                <LetterSwap
                  label="Self."
                  className="hover:text-[#EDEBE4] transition-colors duration-300"
                  secondaryClassName="text-[#EDEBE4]"
                />
                <span
                  aria-hidden
                  className="pill inline-block h-[0.6em] w-[1.6em] rounded-full border border-white/30 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125 shrink-0"
                />
              </span>
            </span>
          </h1>

          <p className="fade mt-4 sm:mt-6 max-w-[52ch] text-sm sm:text-base text-[#EDEBE4]/75 md:text-lg">
            A private training experience built around your body, your goals, and your pace. Science-led coaching in a
            space designed for serious work.
          </p>
          <div className="fade mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 text-xs sm:text-[13px] font-bold uppercase tracking-[0.14em]">
            <a
              href="#pricing"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-[#D4FF3F] px-6 sm:px-7 py-3.5 sm:py-4 text-[#0B0B0D] text-center"
            >
              <span className="absolute inset-0 translate-y-full bg-[#EDEBE4] transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative z-10">Start your free trial</span>
              <AnimatedArrow type="right" size={15} className="relative z-10" />
            </a>
            <a
              href="/classes"
              className="inline-flex items-center justify-center border border-white/30 px-6 sm:px-7 py-3.5 sm:py-4 transition-colors hover:border-[#D4FF3F] hover:text-[#D4FF3F] text-center"
            >
              Explore classes
            </a>
          </div>
        </div>

        {/* Barbell divider + stats */}
        <Barbell />
        <div className="fade grid grid-cols-2 pt-3 sm:pt-4 md:grid-cols-4 gap-y-2 sm:gap-y-0 pb-6 sm:pb-0">
          {stats.map((s, i) => (
            <div
              key={s.l}
              className={`py-3 sm:py-5 ${
                i > 0 ? "md:border-l md:border-white/15 md:pl-4 lg:pl-8" : ""
              } ${i % 2 === 1 ? "pl-4 sm:pl-6 border-l border-white/10 md:border-l-0" : "pr-2"}`}
            >
              <div
                className={`${display} flex items-baseline whitespace-nowrap text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none tabular-nums`}
                style={{ fontFamily: displayFont }}
              >
                <span className="count" data-n={s.n}>
                  {s.n.toLocaleString("en-US")}
                </span>
                {s.s.trim() === "+" ? (
                  <span className="text-[#D4FF3F]">{s.s.trim()}</span>
                ) : (
                  <span className="text-[#D4FF3F] text-base sm:text-lg md:text-xl lg:text-2xl font-bold ml-1.5 tracking-normal">
                    {s.s.trim()}
                  </span>
                )}
              </div>
              <div className={`mt-1.5 sm:mt-2 text-[#EDEBE4]/60 ${label}`}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
