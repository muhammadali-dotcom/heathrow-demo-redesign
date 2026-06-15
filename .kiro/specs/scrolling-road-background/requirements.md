# Requirements Document

## Introduction

This document specifies requirements for the **Scrolling Road Background** feature. The feature replaces the existing `ScrollingRoad` component (car moves along fixed road) with an inverted animation where a tall winding SVG road scrolls vertically while the car remains pinned at a fixed screen position. GSAP ScrollTrigger drives the road Y-translation and car rotation in sync with the user's page scroll. The component is mounted once in the global layout so the effect applies to all pages.

## Glossary

- **ScrollingRoad**: The React client component at `src/components/ui/ScrollingRoad.tsx` that renders the animated road background
- **Road_Wrapper**: The `position: absolute; height: 500vh` `<div>` that contains the road SVG and is animated vertically by GSAP
- **Car_Div**: The `position: absolute` `<div>` inside the fixed container that holds the car image and is pinned on screen
- **GSAP_Context**: The `gsap.context()` scope used to register and clean up all tweens and ScrollTrigger instances
- **ScrollTrigger**: The GSAP plugin that ties animation progress to the page scroll position
- **ROAD_PATH**: The single SVG path string shared by all road layers (shadow, surface, kerblines, centre dash)
- **Road_Layer**: One `<path>` element in the SVG road stack; multiple layers share the same `d` attribute
- **Fade_Mask**: The SVG `<linearGradient>` + `<mask>` that fades the road in at the top and out at the bottom edges
- **RootLayout**: The Next.js root layout at `src/app/layout.tsx` where `ScrollingRoad` is mounted globally

---

## Requirements

### Requirement 1: SVG Road Visual Design

**User Story:** As a site visitor, I want to see a winding road rendered in the background of every page, so that the driving theme of the brand is consistently reinforced.

#### Acceptance Criteria

1. THE ScrollingRoad SHALL render an SVG with `viewBox="0 0 400 3000"` and a height of `500vh` to span at least five viewport heights
2. THE ScrollingRoad SHALL define `ROAD_PATH` as a single SVG path string starting at `M 200 0` and ending at approximately `(200, 3000)` with S-curve cubic bezier segments that wind left and right
3. THE ScrollingRoad SHALL render five road layers sharing the identical `ROAD_PATH` `d` attribute: a wide dark shadow stroke, a medium semi-transparent surface stroke, a left kerb glow stroke with `filter: url(#roadGlow)`, a right kerb stroke, and a dashed centre line stroke
4. THE ScrollingRoad SHALL apply a `Fade_Mask` using a `linearGradient` that fades road opacity to `0` at the top `0%–12%` and bottom `88%–100%` of the SVG, with full opacity between
5. THE ScrollingRoad SHALL apply a `roadGlow` SVG filter (Gaussian blur + merge) to the left kerb layer only
6. THE ScrollingRoad SHALL render an ambient radial gradient glow overlay positioned at the horizontal and vertical centre of the fixed container

### Requirement 2: Scroll-Driven Road Animation

**User Story:** As a site visitor, I want the road to scroll upward as I scroll down the page, so that the car appears to drive forward along the winding road.

#### Acceptance Criteria

1. WHEN the user scrolls down, THE ScrollingRoad SHALL translate the Road_Wrapper upward (negative Y) such that the road moves at a rate proportional to scroll progress from `top top` to `bottom bottom`
2. WHEN `document.body.scrollHeight` is greater than `window.innerHeight`, THE ScrollingRoad SHALL compute the road Y translation end value as `-(document.body.scrollHeight - window.innerHeight)` pixels
3. WHEN the user scrolls up, THE ScrollingRoad SHALL reverse the Road_Wrapper Y translation so the road moves back downward proportionally
4. THE ScrollingRoad SHALL use GSAP ScrollTrigger with `scrub: 1.2` for the road Y animation, so the road lags slightly behind the scroll for a driving feel
5. WHEN `document.body.scrollHeight` is less than or equal to `window.innerHeight`, THE ScrollingRoad SHALL apply a Y translation of `0` (road does not animate on pages that do not scroll)

### Requirement 3: Fixed Car with Rotation

**User Story:** As a site visitor, I want the car image to stay fixed on screen and rotate gently to match road curves, so that the illusion of driving is convincing.

#### Acceptance Criteria

1. THE ScrollingRoad SHALL position Car_Div at `position: absolute` inside the fixed container, horizontally centred, at approximately `55%` of viewport height
2. THE Car_Div SHALL NOT animate position — only rotation changes
3. THE ScrollingRoad SHALL animate Car_Div rotation from `-15deg` to `+15deg` over the full page scroll range using a GSAP tween with `scrub: 1.5` tied to the same `document.body` scroll trigger
4. THE Car_Div SHALL display the image at `src="/images/fleet/hero-car.png"` with a width of `min(72px, 13vw)`
5. THE Car_Div SHALL apply a CSS filter of `drop-shadow(0 6px 18px rgba(204,32,14,0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.8))` for visual depth

### Requirement 4: Layout and Z-index Stack

**User Story:** As a developer, I want the scrolling road to appear behind all page content on every page, so that it never obscures readable content.

#### Acceptance Criteria

1. THE ScrollingRoad SHALL render its outermost container with `position: fixed; inset: 0; z-index: 1; pointer-events: none; overflow: hidden`
2. THE ScrollingRoad SHALL be rendered with `z-index: 1`, above the `FuturisticBackground` at `z-index: 0` and below all page content at `z-index: 10`
3. THE RootLayout SHALL render `<ScrollingRoad />` inside the `<body>` tag, after `<FuturisticBackground />` and before `<Header />`
4. THE RootLayout `<main>` element SHALL retain `position: relative; z-index: 10` so page content renders above the road
5. THE ScrollingRoad container SHALL have `pointer-events: none` so it never intercepts user clicks or touch events

### Requirement 5: Global Layout Integration

**User Story:** As a developer, I want the scrolling road mounted once in the root layout, so that it renders on all pages without per-page imports.

#### Acceptance Criteria

1. THE RootLayout SHALL import and render `<ScrollingRoad />` once in `src/app/layout.tsx`, making the animation available on all pages automatically
2. WHEN `<ScrollingRoad />` is added to `src/app/layout.tsx`, THE airport-transfers page (`src/app/airport-transfers/page.tsx`) SHALL have the `ScrollingRoad` import and its JSX usage removed to avoid duplicate instances
3. THE ScrollingRoad component SHALL include the `'use client'` directive so GSAP and DOM APIs are only accessed in the browser

### Requirement 6: Performance and Accessibility

**User Story:** As a site visitor, I want the background animation to be smooth and non-intrusive, so that it enhances the experience without degrading performance or accessibility.

#### Acceptance Criteria

1. THE Road_Wrapper SHALL have `will-change: transform` applied to enable GPU compositing and prevent main-thread repaints during scroll
2. THE ScrollingRoad outermost container SHALL have `aria-hidden="true"` so screen readers skip the decorative animation
3. THE ScrollingRoad SHALL register GSAP plugins (`ScrollTrigger`, `MotionPathPlugin`) at module scope using `gsap.registerPlugin()` before any component mounts
4. THE ScrollingRoad SHALL use `gsap.context()` to scope all animation registration, and SHALL call `ctx.revert()` in the `useEffect` cleanup function to destroy all tweens and ScrollTrigger instances on unmount
5. IF the component refs (`roadRef`, `carRef`) are null when `useEffect` fires, THEN THE ScrollingRoad SHALL return early without registering any animations
