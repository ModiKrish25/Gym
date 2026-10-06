"use client";

export function HairlineGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Container-aligned vertical hairline columns */}
      <div className="w-full max-w-[1440px] h-full mx-auto px-4 sm:px-6 md:px-8 relative">
        {/* Left container hairline */}
        <div className="absolute top-0 bottom-0 left-4 sm:left-6 md:left-8 w-[1px] bg-[rgba(237,235,228,0.04)]" />

        {/* 25% column hairline */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/4 w-[1px] bg-[rgba(237,235,228,0.03)]" />

        {/* Centerline: the Barbell Spine Track guide */}
        <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[rgba(237,235,228,0.035)] border-r border-dashed border-[rgba(237,235,228,0.04)]" />

        {/* 75% column hairline */}
        <div className="hidden md:block absolute top-0 bottom-0 right-1/4 w-[1px] bg-[rgba(237,235,228,0.03)]" />

        {/* Right container hairline */}
        <div className="absolute top-0 bottom-0 right-4 sm:right-6 md:right-8 w-[1px] bg-[rgba(237,235,228,0.04)]" />

        {/* Corner registration crosshairs (+) */}
        <div className="absolute top-24 left-4 sm:left-6 md:left-8 -translate-x-1/2 text-[10px] font-mono text-chalk-muted/40">
          +
        </div>
        <div className="absolute top-24 right-4 sm:right-6 md:right-8 translate-x-1/2 text-[10px] font-mono text-chalk-muted/40">
          +
        </div>

        {/* Concept watermark in hairline margin */}
        <div className="hidden xl:flex items-center gap-3 absolute top-32 -left-2 rotate-90 origin-left text-[9px] font-mono uppercase tracking-[0.25em] text-[#8A8F98]/30">
          <span>SYS.OMR // 01</span>
          <span className="w-4 h-[1px] bg-[#8A8F98]/20" />
          <span>ONE MORE REP</span>
        </div>

        <div className="hidden xl:flex items-center gap-3 absolute bottom-32 -right-16 -rotate-90 origin-left text-[9px] font-mono uppercase tracking-[0.25em] text-[#8A8F98]/30">
          <span>SPEC 2026 // IRON SPINE</span>
        </div>
      </div>
    </div>
  );
}
