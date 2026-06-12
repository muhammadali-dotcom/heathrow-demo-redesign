# Tasks: UI Alignment & Booking Enhancements

## Task List

- [x] 1. Fix alignment across all content pages in src/app
  - [x] 1.1 Fix alignment in about/page.tsx — standardise container widths (max-w-4xl hero, max-w-7xl content, max-w-5xl narrow, max-w-3xl cta)
  - [x] 1.2 Fix alignment in services/page.tsx — standardise container widths
  - [x] 1.3 Fix alignment in contact/page.tsx — standardise container widths
  - [x] 1.4 Fix alignment in airport-transfers/page.tsx — standardise container widths
  - [x] 1.5 Fix alignment in local-rides/page.tsx — standardise container widths
  - [x] 1.6 Fix alignment in corporate-travel/page.tsx — standardise container widths
  - [x] 1.7 Fix alignment in school-runs/page.tsx — standardise container widths

- [x] 2. Add BookingWizard to home page after Hero
  - [x] 2.1 Import BookingWizard in src/app/page.tsx and insert it as the second child after <Hero /> and before <TrustBar />

- [x] 3. Add fleet vehicle selection to BookingWizard Step 2
  - [x] 3.1 Create VehicleSelector component at src/components/booking/VehicleSelector.tsx with vehicle cards, active/disabled states, and toggle selection
  - [x] 3.2 Extend WizardFields type with vehicle: string field and update initialState and wizardReducer in BookingWizard.tsx
  - [x] 3.3 Integrate VehicleSelector into Step 2 of BookingWizard below existing fields
  - [x] 3.4 Add conditional Vehicle row to Step 4 summary and Confirmation screen recap

- [x] 4. Fix bugs and remove lint warnings
  - [x] 4.1 Remove unused ShieldCheck import from Hero.tsx and fix any other lint warnings across changed files
