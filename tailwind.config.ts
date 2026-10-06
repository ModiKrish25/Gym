import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        50: "12.5rem",
      },
      colors: {
        border: "rgba(237, 235, 228, 0.12)",
        background: "#0B0B0D",
        foreground: "#EDEBE4",
        card: {
          DEFAULT: "#17181B",
          foreground: "#EDEBE4",
        },
        popover: {
          DEFAULT: "#17181B",
          foreground: "#EDEBE4",
        },
        primary: {
          DEFAULT: "#D4FF3F",
          foreground: "#0B0B0D",
        },
        secondary: {
          DEFAULT: "#222429",
          foreground: "#EDEBE4",
        },
        bg: "#0B0B0D",
        iron: {
          DEFAULT: "#17181B",
          card: "#17181B",
          light: "#222429",
          line: "#2A2C31",
          dark: "#111215",
        },
        chalk: {
          DEFAULT: "#EDEBE4",
          muted: "#8A8F98",
          faint: "rgba(237, 235, 228, 0.15)",
          hairline: "rgba(237, 235, 228, 0.08)",
        },
        volt: {
          DEFAULT: "#D4FF3F",
          hover: "#BEE62F",
          dark: "#A3D11E",
          glow: "rgba(212, 255, 63, 0.3)",
          glowStrong: "rgba(212, 255, 63, 0.6)",
        },
        surface: "#17181B",
        line: "#2A2C31",
        text: "#EDEBE4",
        muted: {
          DEFAULT: "#222429",
          foreground: "#8A8F98",
        },
        // Backward-compat aliases mapped to the new industrial palette
        vyra: {
          navy: "#0B0B0D",
          "navy-alt": "#17181B",
          card: "#17181B",
          ember: "#D4FF3F",
          "ember-soft": "#EDEBE4",
          text: "#EDEBE4",
          muted: "#8A8F98",
          border: "#2A2C31",
          "border-hover": "rgba(212, 255, 63, 0.5)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Big Shoulders Display", "Impact", "sans-serif"],
        body: ["var(--font-body)", "Manrope", "sans-serif"],
        sans: ["var(--font-body)", "Manrope", "sans-serif"],
        heading: ["var(--font-display)", "Big Shoulders Display", "Impact", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        bebas: ["var(--font-display)", "Big Shoulders Display", "Impact", "sans-serif"],
      },
      fontSize: {
        "display-massive": ["clamp(4rem, 15vw, 18vw)", { lineHeight: "0.82", letterSpacing: "-0.03em" }],
        "display-hero": ["clamp(3.5rem, 14vw, 17vw)", { lineHeight: "0.84", letterSpacing: "-0.03em" }],
        "display-section": ["clamp(2.75rem, 11vw, 13vw)", { lineHeight: "0.86", letterSpacing: "-0.025em" }],
      },
      borderRadius: {
        DEFAULT: "2px",
        sm: "2px",
        md: "4px",
        lg: "4px",
        xl: "6px",
        "2xl": "8px",
        "3xl": "8px",
      },
      borderWidth: {
        hairline: "1px",
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.19, 1, 0.22, 1)",
        "industrial-ease": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        "marquee-reverse": "marquee-reverse 22s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      maxWidth: {
        container: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
