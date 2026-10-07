import type { Metadata, Viewport } from "next";
import { Big_Shoulders_Display, Manrope, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressBar } from "@/components/motion/ScrollProgressBar";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

import { HairlineGrid } from "@/components/layout/HairlineGrid";
import { BarbellPreloader } from "@/components/motion/BarbellPreloader";
import { PageTransition } from "@/components/motion/PageTransition";

const displayFont = Big_Shoulders_Display({
  weight: ["800", "900"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GYM – Elite Fitness Club | One More Rep",
  description:
    "A private training experience built around your body, your goals, and your pace. Science-led coaching, Olympic platforms, and recovery lounge.",
  keywords: [
    "fitness club",
    "private gym",
    "elite strength training",
    "personal coaching",
    "recovery lounge",
    "GYM fitness club",
    "Surat fitness club",
  ],
  authors: [{ name: "GYM Elite Fitness Club" }],
  creator: "GYM",
  openGraph: {
    title: "GYM – Elite Fitness Club | One More Rep",
    description:
      "A private training sanctuary built around your body, your goals, and your pace. Science-led coaching in a space designed for serious work.",
    url: "https://gymfitness.com",
    siteName: "GYM Elite Fitness Club",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GYM – Elite Fitness Club | One More Rep",
    description:
      "A private training sanctuary built around your body, your goals, and your pace.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} scroll-smooth`}
    >
      <body className="font-body bg-[#0B0B0D] text-[#EDEBE4] min-h-screen selection:bg-[#D4FF3F] selection:text-[#0B0B0D] antialiased relative">
        <BarbellPreloader />
        <HairlineGrid />
        <PageTransition />
        <SmoothScroll>
          <ScrollProgressBar />
          <Navbar />
          <div className="flex flex-col min-h-screen relative z-10">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
