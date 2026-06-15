# Implementation Plan: Scrolling Road Background

## Overview

Rewrite `ScrollingRoad.tsx` to use the moving-road / fixed-car pattern driven by GSAP ScrollTrigger, then mount it once in the global layout and remove the per-page usage from `airport-transfers/page.tsx`.

## Tasks

- [x] 1. Rewrite `ScrollingRoad.tsx` — road structure and static render
  - Replace the entire file content with the new component skeleton
  - Add `'use client'` directive at the top
  - Import `useRef`, `useEffect` from React; `Image` from `next/image`; `gsap`, `ScrollTrigger`, `MotionPathPlugin` from their packages
  - Call `gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)` at module scope
  - Define the `ROAD_PATH` constant (viewBox `0 0 400 3000`, S-curves from `M 200 0` to `200 3000`, X control points within `[40, 360]`)
  - Render the fixed outer container (`position: fixed, inset: 0, z-index: 1, pointer-events: none, overflow: hidden, aria-hidden: true`)
  - Render the ambient radial gradient glow overlay div inside the container
  - Render the Road_Wrapper div (`position: absolute, height: 500vh, width: 100%, will-change: transform`) with `roadRef`
  - Render the SVG inside Road_Wrapper (`viewBox="0 0 400 3000"`) with `<defs>` (linearGradient `roadFade`, mask `roadMask`, filter `roadGlow`) and the five road layer `<path>` elements all using `ROAD_PATH` as `d`, wrapped in a masked `<g>`
  - Render the Car_Div (`position: absolute, left: 50%, top: 55vh, transform: translateX(-50%)`) with `carRef` and the `next/image` element for `/images/fleet/hero-car.png`
  - Apply `will-change: transform` on Road_Wrapper and the drop-shadow filter on Car_Div
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 3.1, 3.4, 3.5, 4.1, 4.5, 5.3, 6.1, 6.2, 6.3_

- [x] 2. Add GSAP scroll animations to `ScrollingRoad.tsx`
  - [x] 2.1 Implement `computeRoadTranslation` helper
    - Export a pure function `computeRoadTranslation(scrollHeight: number, viewportHeight: number): number`
    - Returns `-(scrollHeight - viewportHeight)` when `scrollHeight > viewportHeight`, else `0`
    - _Requirements: 2.2, 2.5_

  - [ ]* 2.2 Write property test for `computeRoadTranslation`
    - **Property 1: Road translation is always non-positive and bounded**
    - Use `fast-check` to generate arbitrary `scrollHeight` and `viewportHeight` pairs
    - Verify: when `scrollHeight > viewportHeight`, result equals `-(scrollHeight - viewportHeight)` and is ≤ 0
    - Verify: when `scrollHeight ≤ viewportHeight`, result equals `0`
    - **Validates: Requirements 2.2, 2.5**

  - [x] 2.3 Implement `useEffect` scroll animation
    - Inside `useEffect`, guard with early return if `roadRef.current` or `carRef.current` is null
    - Create `gsap.context()` and register:
      1. `gsap.to(roadRef.current, { y: computeRoadTranslation(...), ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.2 } })`
      2. `gsap.fromTo(carRef.current, { rotate: -15 }, { rotate: 15, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.5 } })`
    - Return `() => ctx.revert()` as cleanup
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.2, 3.3, 6.4, 6.5_

  - [ ]* 2.4 Write property test for car rotation bounds
    - **Property 2: Car rotation is bounded within safe range**
    - Use `fast-check` to generate arbitrary progress values in `[0, 1]`
    - Verify: `interpolateCarRotation(p)` (linear interpolation `-15 + 30*p`) always falls within `[-15, +15]`
    - **Validates: Requirements 3.3**

- [x] 3. Checkpoint — Verify component renders correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Write structural tests for `ScrollingRoad`
  - [ ]* 4.1 Write property test for road layer path uniformity
    - **Property 4: All road layers share identical path geometry**
    - Render the component and collect all `<path>` elements' `d` attributes from the road SVG group
    - Verify every `d` attribute equals `ROAD_PATH`
    - **Validates: Requirements 1.3**

  - [ ]* 4.2 Write property test for ROAD_PATH control point bounds
    - **Property 3: Road path control points remain within viewport-visible bounds**
    - Parse `ROAD_PATH` and extract all numeric X values (including bezier control points)
    - Verify all X values fall within `[40, 360]`
    - **Validates: Requirements 1.2**

  - [ ]* 4.3 Write unit tests for static rendering
    - Verify SVG has `viewBox="0 0 400 3000"`
    - Verify outer container has `z-index: 1`, `pointer-events: none`, `aria-hidden="true"`
    - Verify Road_Wrapper has `will-change: transform` and `height: 500vh`
    - Verify Car_Div image `src` is `/images/fleet/hero-car.png`
    - Verify exactly one road path element has `filter="url(#roadGlow)"`
    - _Requirements: 1.1, 1.4, 1.5, 3.4, 4.1, 4.2, 6.1, 6.2_

- [-] 5. Update `src/app/layout.tsx` — mount `ScrollingRoad` globally
  - Import `ScrollingRoad` from `@/components/ui/ScrollingRoad`
  - Add `<ScrollingRoad />` inside `<body>`, after `<FuturisticBackground />` and before `<Header />`
  - Confirm `<main>` retains `className="flex-1 relative z-10"`
  - _Requirements: 4.2, 4.3, 4.4, 5.1_

- [ ] 6. Remove individual `ScrollingRoad` usage from `airport-transfers/page.tsx`
  - Delete the `import ScrollingRoad from '@/components/ui/ScrollingRoad'` line
  - Delete the `<ScrollingRoad />` JSX element from the page's return
  - _Requirements: 5.2_

- [~] 7. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- `computeRoadTranslation` must be exported from `ScrollingRoad.tsx` so it can be unit/property tested independently
- The GSAP animation runs only in the browser via `useEffect` — no SSR impact
- `MotionPathPlugin` is registered but used only for potential future car path-following; the current rotation-only approach uses a simple `fromTo` tween
- All page content already uses `z-index: 10` via the layout `<main className="flex-1 relative z-10">` — no per-page z-index changes needed

## Task Dependency Graph

```json
{
  "waves": [
    { "wave": 1, "tasks": ["1"] },
    { "wave": 2, "tasks": ["2.1", "2.3"] },
    { "wave": 3, "tasks": ["2.2", "2.4", "3"] },
    { "wave": 4, "tasks": ["4.1", "4.2", "4.3", "5"] },
    { "wave": 5, "tasks": ["6"] },
    { "wave": 6, "tasks": ["7"] }
  ]
}
```
