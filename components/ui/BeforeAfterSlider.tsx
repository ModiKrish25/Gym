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
  beforeLabel = "Week 1",
  afterLabel = "Week 16",
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
      className="relative w-full h-[380px] sm:h-[460px] rounded-3xl overflow-hidden select-none cursor-ew-resize border border-[rgba(142,155,176,0.22)] shadow-2xl"
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={afterImage}
          alt="After transformation"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0A1220]/30" />
        <span className="absolute top-4 right-4 z-10 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FF6B35] text-[#0A1220]">
          {afterLabel}
        </span>
      </div>

      {/* Before Image (Clipped with pixel-perfect responsive alignment) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt="Before transformation"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center filter grayscale"
        />
        <div className="absolute inset-0 bg-[#0A1220]/40" />
        <span className="absolute top-4 left-4 z-10 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#121C30]/90 border border-[rgba(142,155,176,0.3)] text-[#F5F6F8]">
          {beforeLabel}
        </span>
      </div>

      {/* Drag Divider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-[#FF6B35] shadow-lg pointer-events-none"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 rounded-full bg-[#FF6B35] text-[#0A1220] flex items-center justify-center font-bold text-xs shadow-xl border-2 border-[#0A1220]">
          ↔
        </div>
      </div>
    </div>
  );
}
