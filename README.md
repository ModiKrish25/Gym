# VYRA – Elite Fitness Club

A high-performance, dark, cinematic, disciplined private fitness club website built with Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Lenis, and GSAP ScrollTrigger.

## Design System

- **Background:** `#0A1220` (Midnight Navy)
- **Alternate Section:** `#0D1627`
- **Surface / Cards:** `#121C30`
- **Accent:** `#FF6B35` (Ember Orange)
- **Soft Accent:** `#FFB38A`
- **Text:** `#F5F6F8`
- **Muted Text:** `#8E9BB0`
- **Border:** `rgba(142, 155, 176, 0.18)`
- **Headings:** Fraunces (Editorial Serif)
- **Body:** Plus Jakarta Sans
- **Radius System:** `rounded-3xl` (24px) for cards, `rounded-full` for chips and buttons

## Features

- **Lenis Smooth Scroll:** Dynamically loaded, with respect for `prefers-reduced-motion`
- **Smart Navbar:** Transparent on top, solid blurred navy on scroll, hides on scroll-down, reveals on scroll-up
- **Scroll Progress:** Thin ember progress bar fixed at the top
- **Duotone Imagery:** Navy overlay system for athletic photography
- **Full Form Validation:** Zod + React Hook Form with actionable error messaging
- **Responsive & Accessible:** Strict semantic markup, WCAG AA contrast, custom keyboard focus rings

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
npm run build
npm start
```
