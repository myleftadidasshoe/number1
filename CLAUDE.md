# CLAUDE.md

This file provides guidance for AI assistants working with this repository.

## Repository Overview

**number1** is a high-end web design and motion graphics project built with a modern frontend stack optimized for premium, design-forward, motion-rich web experiences.

## Tech Stack

### Core
- **Next.js 16.2** — App Router, React Server Components, Turbopack
- **React 19.2** — Server Components, React Compiler support
- **TypeScript 6.0** — Strict mode enabled

### Styling & Components
- **Tailwind CSS 4.x** — CSS-first configuration via `@theme` directive in `globals.css`
- **shadcn/ui** — Copy-paste component primitives (Radix UI based)
- **class-variance-authority** — Component variant management
- **tailwind-merge + clsx** — Conditional class merging via `cn()` utility

### Animation & Motion
- **GSAP** — Timeline animations, ScrollTrigger, scroll-driven effects
- **@gsap/react** — React integration via `useGSAP` hook
- **Motion** (f.k.a. Framer Motion) — React component animations, layout transitions, gestures
- **Lenis** — Smooth scrolling

### Tooling
- **Biome** — Linting + formatting (replaces ESLint + Prettier)
- **npm** — Package manager
- **Turbopack** — Dev server bundler (built into Next.js)

## Commands

```bash
npm run dev       # Start dev server with Turbopack
npm run build     # Production build
npm start         # Start production server
npm run lint      # Check linting and formatting
npm run lint:fix  # Auto-fix lint and format issues
npm run format    # Format all source files
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── globals.css         # Tailwind theme tokens and global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── ui/                 # shadcn/ui components (Button, etc.)
│   ├── motion/             # Reusable animation components
│   │   ├── fade-in.tsx     # Motion-powered fade-in with direction
│   │   ├── scroll-reveal.tsx # GSAP ScrollTrigger reveal
│   │   └── smooth-scroll.tsx # Lenis smooth scroll provider
│   └── three/              # 3D scene components (React Three Fiber)
├── hooks/                  # Custom React hooks
│   └── use-lenis.tsx       # Lenis smooth scroll hook
└── lib/
    └── utils.ts            # cn() utility for class merging
```

## Development Setup

### Prerequisites
- Node.js 18+ (install via `brew install node` on macOS)
- Git

### Getting Started
```bash
git clone <repository-url>
cd number1
npm install
npm run dev
```

## Conventions

### Git Workflow
- Use descriptive commit messages that explain the "why" behind changes
- Keep commits focused and atomic — one logical change per commit
- Branch names should be descriptive of the feature or fix

### Code Style
- **Biome** handles all linting and formatting — run `npm run lint:fix` before committing
- Import order is enforced automatically by Biome
- Use double quotes, semicolons always
- Max line width: 100 characters

### Component Patterns
- **Server Components** by default — only add `"use client"` when needed for interactivity
- **Animation components** live in `src/components/motion/` and are always client components
- **UI primitives** in `src/components/ui/` follow shadcn/ui patterns
- Use `cn()` from `@/lib/utils` for conditional Tailwind classes

### Styling
- Theme tokens are defined in `src/app/globals.css` via Tailwind's `@theme` directive
- Use Tailwind utilities for layout and spacing
- Use CSS custom properties (from `@theme`) for colors, fonts, radii
- Custom animations use GSAP (scroll-driven) or Motion (component transitions)

### Animation Guidelines
- **GSAP** for: scroll-triggered animations, complex timelines, text splitting, morphing
- **Motion** for: component enter/exit, layout animations, gestures, spring physics
- **Lenis** for: smooth scrolling (wrap app in `<SmoothScroll>`)
- Always clean up GSAP animations in `useGSAP` (handles cleanup automatically)
- Use `viewport={{ once: true }}` on Motion components to avoid re-triggering

## Notes for AI Assistants

- This is a motion-first web project — animations and visual polish are first-class concerns
- When creating new components, consider whether they need animation and use the appropriate library
- shadcn/ui components can be customized freely — they are copied into the project, not imported from a package
- Tailwind v4 uses CSS-first config — do NOT create a `tailwind.config.js` file
- GSAP is free for all uses including commercial (acquired by Webflow)
- Always run `npm run lint:fix` after making changes to ensure consistent formatting
