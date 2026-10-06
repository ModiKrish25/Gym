"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const LenisProvider = dynamic(() => import("./LenisProvider"), {
  ssr: false,
});

export function SmoothScroll({ children }: { children: ReactNode }) {
  return <LenisProvider>{children}</LenisProvider>;
}
