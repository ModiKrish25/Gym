"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Day 01",
  afterLabel = "Day 90",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => (isDragging.current = true)}
      onMouseUp={() => (isDragging.current = false)}
      onMouseLeave={() => (isDragging.current = false)}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-[rgba(237,235,228,0.12)] bg-[#17181B] shadow-2xl"
    >
      {/* After Image (Day 90 Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top sm:object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/50 via-transparent to-transparent pointer-events-none" />
        <span className="absolute top-4 right-4 z-10 text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#D4FF3F] text-[#0B0B0D] shadow-lg">
          {afterLabel}
        </span>
      </div>

      {/* Before Image (Day 01 Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top sm:object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D]/50 via-transparent to-transparent pointer-events-none" />
        <span className="absolute top-4 left-4 z-10 text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#17181B]/95 border border-[rgba(237,235,228,0.2)] text-[#EDEBE4] shadow-lg backdrop-blur-md">
          {beforeLabel}
        </span>
      </div>

      {/* Drag Divider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-[#D4FF3F] shadow-[0_0_12px_rgba(212,255,63,0.5)] pointer-events-none"
        style={{ left: `calc(${sliderPosition}% - 1px)` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-8 h-8 rounded-full bg-[#D4FF3F] text-[#0B0B0D] flex items-center justify-center font-bold text-xs shadow-xl border-2 border-[#0B0B0D] transition-transform duration-150">
          ↔
        </div>
      </div>
    </div>
  );
}

export default BeforeAfterSlider;
