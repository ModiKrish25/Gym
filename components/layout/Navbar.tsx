"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Menu, X, Dumbbell } from "lucide-react";
import { AnimatedArrow } from "@/components/ui/AnimatedArrow";
import { NAV_LINKS, BRAND } from "@/data/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll tracking with smooth spring physics
  const { scrollY } = useScroll();
  const smoothScroll = useSpring(scrollY, {
    stiffness: 180,
    damping: 26,
    mass: 0.5,
  });

  // Gradually decreases width as user scrolls down from Hero section
  // At Hero (scrollY = 0): max-width 1440px / width 100%
  // Scrolled down (scrollY >= 260): max-width 1060px / width 92%
  const dockMaxWidth = useTransform(smoothScroll, [0, 260], ["1440px", "1060px"]);
  const dockWidth = useTransform(smoothScroll, [0, 260], ["100%", "92%"]);
  const dockTop = useTransform(smoothScroll, [0, 260], ["1.4rem", "1.85rem"]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 30);
    });
  }, [scrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Bulletproof lock of background scroll when mobile menu is open
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (mobileMenuOpen) {
      // Pause Lenis smooth virtual scroll
      window.dispatchEvent(new CustomEvent("lenis:stop"));
      (window as any).lenis?.stop();

      // Mobile Safari / Chrome bulletproof scroll lock
      const currentScrollY = window.scrollY;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${currentScrollY}px`;
      document.body.style.width = "100%";
      document.body.style.touchAction = "none";
    } else {
      // Restore previous scroll position and styles
      const scrollYPos = document.body.style.top;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";

      if (scrollYPos) {
        window.scrollTo(0, parseInt(scrollYPos || "0", 10) * -1);
      }

      // Resume Lenis smooth scrolling
      window.dispatchEvent(new CustomEvent("lenis:start"));
      (window as any).lenis?.start();
    }

    return () => {
      const scrollYPos = document.body.style.top;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.touchAction = "";
      if (scrollYPos) {
        window.scrollTo(0, parseInt(scrollYPos || "0", 10) * -1);
      }
      window.dispatchEvent(new CustomEvent("lenis:start"));
      (window as any).lenis?.start();
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Floating Architectural Header Dock with gradual scroll width transition */}
      <motion.header
        style={{
          width: dockWidth,
          maxWidth: dockMaxWidth,
          top: dockTop,
        }}
        className="fixed inset-x-0 z-50 mx-auto px-2 sm:px-4 pointer-events-none flex items-center justify-center will-change-[width,max-width,top]"
      >
        <div
          className={cn(
            "w-full pointer-events-auto rounded-[6px] transition-all duration-300 px-2.5 sm:px-4 lg:px-5 py-2 sm:py-2.5 flex items-center justify-between border shadow-2xl",
            isScrolled
              ? "bg-[#0B0B0D]/95 border-[#D4FF3F]/25 backdrop-blur-2xl shadow-[0_16px_45px_rgba(0,0,0,0.9)]"
              : "bg-[#111215]/80 border-[rgba(237,235,228,0.12)] backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.65)]"
          )}
        >
          {/* Left: Brand Identity & Status */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group focus:outline-none"
              aria-label={`${BRAND.name} Home`}
            >
              {/* Geometric Brand Icon */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[3px] bg-[#17181B] border border-[rgba(237,235,228,0.15)] flex items-center justify-center text-[#D4FF3F] group-hover:border-[#D4FF3F] group-hover:bg-[#D4FF3F]/10 group-hover:shadow-[0_0_18px_rgba(212,255,63,0.35)] transition-all duration-300">
                <Dumbbell
                  size={17}
                  className="group-hover:-rotate-45 transition-transform duration-300"
                />
              </div>

              {/* Typography Brand Mark */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-display text-xl sm:text-2xl lg:text-3xl font-black tracking-tight uppercase text-[#EDEBE4] group-hover:text-[#D4FF3F] transition-colors">
                    {BRAND.name}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-[#D4FF3F]" />
                </div>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.28em] uppercase text-[#8A8F98]">
                  ONE MORE REP
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Segmented Navigation Dock */}
          <nav
            className="hidden md:flex items-center p-0.5 sm:p-1 rounded-[4px] bg-[#17181B]/80 border border-[rgba(237,235,228,0.08)] backdrop-blur-md shrink-0"
            aria-label="Main Navigation"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {NAV_LINKS.map((link, idx) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  className={cn(
                    "relative px-1.5 sm:px-2 lg:px-3 py-1.5 rounded-[3px] text-[11px] lg:text-xs font-semibold tracking-wide transition-colors focus:outline-none select-none flex items-center gap-1 lg:gap-1.5 whitespace-nowrap",
                    isActive
                      ? "text-[#D4FF3F]"
                      : "text-[#8A8F98] hover:text-[#EDEBE4]"
                  )}
                >
                  {/* Active Segment Pill Indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-[#222429] border border-[rgba(237,235,228,0.12)] rounded-[3px] shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}

                  {/* Hover Backdrop Glow */}
                  {!isActive && hoveredLink === link.label && (
                    <motion.span
                      layoutId="hover-nav-pill"
                      className="absolute inset-0 bg-white/5 rounded-[3px] -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}

                  {/* Micro Index Prefix (shown on xl+ screens) */}
                  <span className="hidden xl:inline font-mono text-[9px] text-[#8A8F98]/70">
                    0{idx + 1}
                  </span>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: High-Impact Action & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Redesigned Brutalist Join Button */}
            <Link
              href="/pricing"
              className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden px-3 sm:px-3.5 lg:px-4 h-9 rounded-[3px] bg-[#D4FF3F] text-[#0B0B0D] font-mono text-[11px] sm:text-xs font-extrabold uppercase tracking-wider shadow-[0_0_20px_rgba(212,255,63,0.25)] hover:shadow-[0_0_28px_rgba(212,255,63,0.45)] transition-all duration-300 focus:outline-none whitespace-nowrap shrink-0 leading-none"
            >
              {/* Hover Inverted Curtain */}
              <span className="absolute inset-0 translate-y-full bg-[#EDEBE4] transition-transform duration-300 ease-out group-hover:translate-y-0" />
              <span className="relative z-10 whitespace-nowrap">Join Now</span>
              <AnimatedArrow type="right" size={13} className="relative z-10 shrink-0" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-9 w-9 p-0 rounded-[3px] bg-[#17181B] text-[#EDEBE4] hover:text-[#D4FF3F] border border-[rgba(237,235,228,0.12)] transition-colors focus:outline-none flex items-center justify-center shrink-0"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen Industrial Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            data-lenis-prevent
            className="fixed inset-0 z-40 bg-[#0B0B0D]/98 backdrop-blur-2xl pt-28 sm:pt-32 px-5 sm:px-6 pb-32 flex flex-col justify-between md:hidden overflow-y-auto overscroll-contain touch-pan-y"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Header divider */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-[rgba(237,235,228,0.08)] pb-3">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4FF3F] font-mono">
                  // NAVIGATION DIRECTORY
                </span>
                <span className="text-[10px] font-mono text-[#8A8F98]">
                  OPEN 5AM – 11PM
                </span>
              </div>

              {/* Links list */}
              <div className="flex flex-col space-y-2 pt-2">
                {NAV_LINKS.map((link, idx) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "py-2.5 sm:py-3 px-3 rounded-[3px] border transition-all flex items-center justify-between group",
                          isActive
                            ? "bg-[#17181B] border-[#D4FF3F]/40 text-[#D4FF3F]"
                            : "border-transparent text-[#EDEBE4] hover:bg-[#17181B]/50 hover:border-[rgba(237,235,228,0.08)]"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[#8A8F98]">
                            0{idx + 1}
                          </span>
                          <span className="text-2xl font-display font-extrabold uppercase tracking-tight">
                            {link.label}
                          </span>
                        </div>
                        <AnimatedArrow
                          type="right"
                          size={18}
                          className="text-[#8A8F98] group-hover:text-[#D4FF3F]"
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Location & Support Details */}
              <div className="pt-6 border-t border-[rgba(237,235,228,0.08)] space-y-1.5">
                <p className="text-xs text-[#8A8F98] font-mono">{BRAND.hours.weekdays}</p>
                <p className="text-xs text-[#8A8F98] font-mono">{BRAND.hours.sunday}</p>
                <p className="text-xs text-[#D4FF3F] font-mono pt-1">{BRAND.phone}</p>
                <p className="text-[11px] text-[#8A8F98]/70 font-mono">{BRAND.address}</p>
              </div>
            </div>

            {/* Mobile Fixed CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-5 bg-[#17181B] border-t border-[rgba(237,235,228,0.12)]">
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="group w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-[3px] bg-[#D4FF3F] text-[#0B0B0D] font-mono font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,255,63,0.3)]"
              >
                <span>Join The Club Now</span>
                <AnimatedArrow type="right" size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
