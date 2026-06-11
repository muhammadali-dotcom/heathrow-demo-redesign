# Implementation Plan: Booking Form Multi-Step Wizard

## Overview

Replace the single-screen `HomeBooking.tsx` on `/book` with a four-step `BookingWizard` component, add a `StepIndicator`, strip gradient red colours from seven existing files, wire up the `/book` page, and confirm the build compiles cleanly.

---

## Tasks

- [x] 1. Remove gradient colours from existing site components
  - [x] 1.1 Remove gradient from `Button.tsx`
    - In `src/components/ui/Button.tsx`, change the `primary` variant class from `bg-gradient-to-r from-[#FF1D25] to-[#D90012]` to `bg-[#FF1D25]`; keep shadow and hover classes intact
    - _Requirements: Gradient color Remove_

  - [x] 1.2 Remove gradient from `Header.tsx`
    - In `src/components/layout/Header.tsx`, change the "Contact Now" link inline `background` style from `linear-gradient(135deg, #FF1D25, #D90012)` to `#FF1D25`
    - _Requirements: Gradient color Remove_

  - [x] 1.3 Remove gradient from `MobileMenu.tsx`
    - In `src/components/layout/MobileMenu.tsx`, change the "Contact Now" link inline `background` style from `linear-gradient(135deg, #FF1D25, #D90012)` to `#FF1D25`
    - _Requirements: Gradient color Remove_

  - [x] 1.4 Remove gradients and decorative orbs from `Hero.tsx`
    - In `src/components/home/Hero.tsx`:
      - Replace the section's two-layer `linear-gradient` background with `#050505`
      - Delete the red glow orb `<div>` (the one with `radial-gradient(circle, ...)` + blur)
      - Delete the road streaks `<div>` block (the `linear-gradient(90deg, transparent, #FF1D25, transparent)` items)
      - Delete the car image soft-glow `<div>` (the `radial-gradient(ellipse ..., rgba(255,29,37,0.2), transparent)` wrapper)
      - Keep layout, typography, trust points, motion animations, and the car image
    - _Requirements: Gradient color Remove_

  - [x] 1.5 Remove gradients and decorative overlays from `CTA.tsx`
    - In `src/components/home/CTA.tsx`:
      - Change card `background` style from `linear-gradient(135deg, #FF1D25 0%, #D90012 50%, #8B0000 100%)` to `#D90012`
      - Delete the dot-pattern `<div>` (`radial-gradient(circle, white 1px, transparent 1px)`)
    - _Requirements: Gradient color Remove_

  - [x] 1.6 Remove gradients from `Services.tsx`
    - In `src/components/home/Services.tsx`:
      - Change service card `background` style from `linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))` to `rgba(255,255,255,0.04)`
      - Change icon box `background` style from `linear-gradient(135deg, #FF1D25, #D90012)` to `#FF1D25`
    - _Requirements: Gradient color Remove_

  - [x] 1.7 Remove gradients from `HomeBooking.tsx`
    - In `src/components/home/HomeBooking.tsx`:
      - Change submit button `background` style from `linear-gradient(135deg, #FF1D25, #D90012)` to `#FF1D25`
      - Change confirmation icon circle `background` style from `linear-gradient(135deg, #FF1D25, #D90012)` to `#FF1D25`
    - _Requirements: Gradient color Remove_

- [x] 2. Create `StepIndicator` component
  - [x] 2.1 Implement `StepIndicator.tsx`
    - Create `src/components/booking/StepIndicator.tsx`
    - Define and export the `StepInfo` interface (`label`, `state: 'upcoming' | 'active' | 'completed'`) and `StepIndicatorProps` interface
    - Render four step items in a horizontal row with connecting lines
    - `completed` state: filled circle + Lucide `Check` icon + label
    - `active` state: filled circle + bold step number + label (white)
    - `upcoming` state: outlined circle + muted step number + muted label
    - Completed connector segments use red (`#FF1D25`), upcoming use muted white
    - Wrap in `<nav aria-label="Step {n} of 4: {label}">` where `{n}` and `{label}` reflect the active step
    - Add `aria-current="step"` on the active step circle; mark purely decorative elements `aria-hidden`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 8.3_

  - [x]* 2.2 Write unit tests for `StepIndicator`
    - Test that the `completed` step renders a check icon
    - Test that the active step circle shows the step number and has `aria-current="step"`
    - Test that the `<nav>` `aria-label` reflects the current step number and label
    - _Requirements: 1.2, 1.3, 1.4, 8.3_

- [x] 3. Implement `BookingWizard` — data layer (types, reducer, validators)
  - [x] 3.1 Define types and `initialState`
    - Create `src/components/booking/BookingWizard.tsx` with `'use client'` directive
    - Define `WizardStep`, `FareData`, `WizardFields`, `FareStatus`, `WizardState`, and `WizardAction` types exactly as specified in the design
    - Export `initialState` constant (all string fields empty, passengers=1, luggage=0, step=1, fareStatus='idle')
    - _Requirements: 2.1, 3.1, 7.1_

  - [x] 3.2 Implement `wizardReducer`
    - Implement the pure `wizardReducer(state, action)` function handling all `WizardAction` types: `SET_FIELD`, `SET_STEP_ERRORS`, `NEXT_STEP`, `PREV_STEP`, `SET_FARE_LOADING`, `SET_FARE_READY`, `SET_FARE_ERROR`, `SET_SUBMITTING`, `SET_SUBMIT_ERROR`, `CONFIRM`, `RESET`
    - `NEXT_STEP` increments step and clears `stepErrors`; `PREV_STEP` decrements step and clears `stepErrors` without touching `fields`
    - `RESET` returns `initialState` exactly
    - Never mutate state; always return new objects
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 6.3_

  - [x]* 3.3 Write property test for `wizardReducer` — Property 1: step field preservation
    - **Property 1: Back navigation never mutates field values**
    - Use fast-check: for any `WizardState` with `currentStep` ∈ {2, 3, 4}, assert `wizardReducer(state, PREV_STEP).fields` deep-equals `state.fields`
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4**

  - [x]* 3.4 Write property test for `wizardReducer` — Property 4: state reset completeness
    - **Property 4: After RESET the state deeply equals `initialState`**
    - Use fast-check: for any arbitrary `WizardState`, assert `wizardReducer(anyState, { type: 'RESET' })` deepEquals `initialState`
    - **Validates: Requirements 6.3**

  - [x]* 3.5 Write property test for `wizardReducer` — Property 7: confirmation immutability
    - **Property 7: Once `currentStep === "confirmed"`, only `RESET` changes state**
    - Use fast-check: for any action other than `RESET`, assert the confirmed state is unchanged
    - **Validates: Requirements 6.1, 6.2**

  - [x] 3.6 Implement `validateStep1` and `validateStep2` pure functions
    - `validateStep1`: return `{ pickup?: string; dropoff?: string }` — error if field is empty or whitespace-only
    - `validateStep2`: validate name (non-empty, ≤100 chars), phone (`/^[+\d\s-]+$/`), date (non-empty, not before today), time (non-empty)
    - Export both functions so they can be tested independently
    - _Requirements: 2.3, 2.4, 2.5, 2.6, 3.6, 3.7, 3.8, 3.10, 3.11, 3.12_

  - [x]* 3.7 Write property test for validators — Property 2: validation gate
    - **Property 2: `validateStep1` returns no errors iff both fields are non-whitespace strings**
    - Use fast-check: generate non-empty strings → assert zero errors; generate empty/whitespace strings → assert errors present
    - **Validates: Requirements 2.3, 2.4, 2.5**

  - [x]* 3.8 Write unit tests for `validateStep2`
    - Empty name → error; name > 100 chars → error; valid name → no error
    - Phone with letters → error; valid phone with `+` and spaces → no error
    - Past date → error with "today or in the future" message; future date → no error; empty date → error
    - Empty time → error
    - _Requirements: 3.6, 3.7, 3.8, 3.10, 3.11, 3.12_

- [x] 4. Implement mock async procedures and `BookingWizard` shell
  - [x] 4.1 Implement `mockFareCalculation` and `mockBookingSubmit`
    - `mockFareCalculation(dispatch)`: dispatch `SET_FARE_LOADING`, wait 800 ms, compute random fare/distance/duration, dispatch `SET_FARE_READY`; catch any error and dispatch `SET_FARE_ERROR`
    - `mockBookingSubmit(dispatch)`: dispatch `SET_SUBMITTING true`, wait 1500 ms, 95% path → dispatch `CONFIRM`, 5% path → dispatch `SET_SUBMIT_ERROR`; always dispatch `SET_SUBMITTING false` after
    - Fare format: `"£X.XX"` (toFixed 2); distance: `"X.X miles"` (toFixed 1); duration: `"X mins"` (integer)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 5.4, 5.5_

  - [x] 4.2 Build `BookingWizard` shell with `useReducer`, focus management, and step routing
    - Wire `useReducer(wizardReducer, initialState)` as the state root
    - Implement `useRef` per step heading and a `useEffect` on `state.currentStep` that calls `moveFocusToStepHeading` — sets `tabindex="-1"` then `.focus()` on the heading ref
    - Trigger `mockFareCalculation` in a `useEffect` whenever `state.currentStep === 3` and `state.fareStatus === 'idle'`
    - Render `<StepIndicator>` with a derived `steps` array mapping `currentStep` to `upcoming / active / completed` per step
    - Render the active step panel (`Step1Route`, `Step2Details`, `Step3Fare`, `Step4Confirm`) or `ConfirmationScreen` based on `state.currentStep`
    - _Requirements: 1.1, 1.2, 1.3, 8.5_

- [x] 5. Implement step panels inside `BookingWizard`
  - [x] 5.1 Implement `Step1Route` panel
    - Render `<h2 ref={headingRef}>` for focus management
    - Two labelled `<input type="text">` fields: Pickup and Drop-off, each with `id`/`for`, `required`, `aria-required="true"`, and `aria-describedby="{field}-error"` when an error exists
    - Inline `<p id="{field}-error" role="alert">` beneath each field, visible only when `stepErrors[field]` is set
    - Full-width "See Price" `<button>` at the bottom; clicking dispatches validation via `handleStep1Next`
    - `handleStep1Next`: run `validateStep1` → if errors, dispatch `SET_STEP_ERRORS` and stop; if clean, dispatch `NEXT_STEP`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 8.1, 8.2, 8.4_

  - [x] 5.2 Implement `Step2Details` panel
    - Render `<h2 ref={headingRef}>` for focus management
    - Name: `<input type="text" maxLength={100}>` with `required`
    - Phone: `<input type="tel">` with `required`
    - Passengers: `<select>` options 1–6, default 1
    - Luggage: `<select>` options 0–6, default 0
    - Date: `<input type="date">` with `required` and `min` set dynamically to today's ISO date
    - Time: `<input type="time">` with `required`
    - All fields use `id`/`for` pairs and `aria-describedby` pointing to error `<p>` when errors exist
    - "Back" and "Next" buttons side by side
    - `handleStep2Next`: run `validateStep2` → if errors, dispatch `SET_STEP_ERRORS` and stop; if clean, dispatch `NEXT_STEP`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12, 7.1, 8.1, 8.2, 8.4_

  - [x] 5.3 Implement `Step3Fare` panel
    - Render `<h2 ref={headingRef}>` for focus management
    - `fareStatus === 'loading'`: animated Lucide `Loader2` spinner + "Calculating your fare…" text
    - `fareStatus === 'error'`: error message + "Retry" `<button>` (retry dispatches `SET_FARE_LOADING` then re-runs `mockFareCalculation`)
    - `fareStatus === 'ready'`: three metric cards for fare, distance, duration; disclaimer text "Estimates shown may vary"
    - Fare formatted `"£X.XX"`, distance `"X.X miles"`, duration `"X mins"`
    - "Back" and "Continue to Book" buttons
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 7.2_

  - [x] 5.4 Implement `Step4Confirm` panel
    - Render `<h2 ref={headingRef}>` for focus management
    - Journey summary list: labelled rows for pickup, drop-off, name, date, time, passengers, luggage, and estimated fare
    - "Book a Ride" button: full-width, `py-5`, larger text (`text-xl` or `text-2xl`), high-contrast colour — must be the most visually prominent element
    - Disable the button and show Lucide `Loader2` spinner while `state.submitting === true`
    - Inline `<p role="alert">` error message below the button when `state.submitError` is set
    - Clicking "Book a Ride" calls `mockBookingSubmit(dispatch)`
    - "Back" button above or alongside summary
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 5.5 Implement `ConfirmationScreen` panel
    - Render "Booking Confirmed!" heading with a Lucide `CheckCircle` icon
    - Booking detail recap rows: pickup, drop-off, name, date, time
    - "Book Again" button that dispatches `RESET`
    - _Requirements: 6.1, 6.2, 6.3_

  - [x]* 5.6 Write property test for `wizardReducer` — Property 6: submission idempotency
    - **Property 6: While `submitting === true`, the Book a Ride button is disabled**
    - Render `BookingWizard` at step 4 with `submitting: true`; assert the "Book a Ride" button has `disabled` attribute
    - **Validates: Requirements 5.4, 5.5**

  - [x]* 5.7 Write property test for `wizardReducer` — Property 5: fare loading sequence
    - **Property 5: `fareStatus` only transitions `idle → loading → (ready | error)`**
    - Use fast-check: verify no action moves `fareStatus` from `ready` back to `loading` without an intermediate `SET_FARE_LOADING` action
    - **Validates: Requirements 4.4, 4.5**

  - [x]* 5.8 Write property test for `wizardReducer` — Property 3: error-field association
    - **Property 3: Every key in `stepErrors` maps to an input with `aria-describedby="{key}-error"` and a rendered `<p id="{key}-error">`**
    - Render step 1 or step 2 with pre-populated `stepErrors`; assert DOM associations with React Testing Library
    - **Validates: Requirements 8.2**

- [x] 6. Checkpoint — core wizard complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Wire up `/book` page and confirm no regressions
  - [x] 7.1 Update `src/app/book/page.tsx` to use `BookingWizard`
    - Replace `import HomeBooking from '@/components/home/HomeBooking'` with `import BookingWizard from '@/components/booking/BookingWizard'`
    - Replace `<HomeBooking />` with `<BookingWizard />`
    - Keep the `metadata` export and `<main>` wrapper unchanged
    - _Requirements: 2.1_

  - [x] 7.2 Run TypeScript build and fix all type errors
    - Run `npx tsc --noEmit` (or `next build`) and resolve any TypeScript errors introduced by new components or gradient removals
    - Verify no type errors in `BookingWizard.tsx`, `StepIndicator.tsx`, or the modified gradient files
    - _Requirements: all_

  - [x]* 7.3 Write integration tests for the full wizard flow
    - Using React Testing Library:
      - Fill Step 1 and click "See Price" → assert `StepIndicator` shows step 2 active
      - Click "Back" from step 2 → assert pickup/dropoff values preserved
      - Advance to step 3 using fake timers → assert fare values appear (not loading state)
      - Complete all steps → assert confirmation screen with submitted data visible
      - Click "Book Again" → assert wizard resets to step 1 with all fields empty
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [x] 8. Final checkpoint — full build passes
  - Run `next build` (or `npx tsc --noEmit`) and confirm zero TypeScript errors and zero build failures. Ask the user if anything needs clarification.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- All components use existing Tailwind CSS, Lucide React icons, and React hooks — no new npm dependencies
- `BookingWizard.tsx` must include `'use client'` at the top; `/book/page.tsx` can remain a Server Component
- `HomeBooking.tsx` gradient is still removed even though `/book` will no longer render it (it may be embedded elsewhere on the site)
- Property tests use `fast-check` (already available in most Next.js/React projects); add it via `npm install --save-dev fast-check` if not present
- Each task references specific requirements for traceability

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "3.1"] },
    { "id": 1, "tasks": ["2.1", "3.2"] },
    { "id": 2, "tasks": ["2.2", "3.3", "3.4", "3.5", "3.6", "4.1"] },
    { "id": 3, "tasks": ["3.7", "3.8", "4.2"] },
    { "id": 4, "tasks": ["5.1", "5.2", "5.3", "5.4", "5.5"] },
    { "id": 5, "tasks": ["5.6", "5.7", "5.8", "7.1"] },
    { "id": 6, "tasks": ["7.2"] },
    { "id": 7, "tasks": ["7.3"] }
  ]
}
```
