# Requirements: UI Alignment & Booking Enhancements

## Introduction

This spec covers three focused improvements to the Bittacy Cars website: fixing inconsistent heading/text alignment across all content pages, adding a multi-step booking form immediately after the Hero on the home page, and adding fleet vehicle selection to Step 2 of the booking wizard.

## Requirements

### Requirement 1: Standardise Page Alignment

**User Story:** As a visitor, I want all pages to have consistent, well-centred headings and text so the site looks polished and professional.

#### Acceptance Criteria

1.1 WHEN viewing any page in `src/app/` THEN all hero section inner containers SHALL use `max-w-4xl mx-auto text-center`

1.2 WHEN viewing any feature grid or main content section THEN inner containers SHALL use `max-w-7xl mx-auto`

1.3 WHEN viewing coverage or steps sections THEN inner containers SHALL use `max-w-5xl mx-auto`

1.4 WHEN viewing CTA sections THEN inner containers SHALL use `max-w-3xl mx-auto text-center`

1.5 WHEN viewing any section THEN outer section padding SHALL be `px-4` (or `px-4 sm:px-6 lg:px-8` where responsive)

1.6 WHEN viewing any page THEN no inner container div SHALL lack `mx-auto`

### Requirement 2: Booking Form on Home Page

**User Story:** As a visitor on the home page, I want to see a booking form immediately after the hero section so I can start booking without navigating away.

#### Acceptance Criteria

2.1 WHEN visiting the home page THEN the full multi-step `BookingWizard` SHALL be rendered immediately after `<Hero />` and before `<TrustBar />`

2.2 WHEN the home page booking wizard is rendered THEN it SHALL display all 4 steps: Route → Details → Fare → Confirm

2.3 WHEN the home page wizard and the `/book` page wizard are both rendered THEN their states SHALL be completely independent

2.4 WHEN viewing the home page on mobile THEN the booking wizard SHALL be fully responsive

### Requirement 3: Fleet Vehicle Selection in Booking Wizard Step 2

**User Story:** As a customer, I want to see and select a vehicle type during the booking process so I can choose the car that fits my needs.

#### Acceptance Criteria

3.1 WHEN on Step 2 of the booking wizard THEN a "Choose Your Vehicle" section SHALL be displayed below the existing fields (name, phone, date, time, passengers, luggage)

3.2 WHEN the vehicle selector renders THEN it SHALL display all 4 fleet vehicles (Saloon, Estate, MPV, Executive) as visual cards with vehicle image, name, passenger count, and luggage count

3.3 WHEN a user clicks a vehicle card THEN that card SHALL become visually selected (red border, checkmark overlay)

3.4 WHEN a user clicks an already-selected vehicle card THEN it SHALL be deselected (toggle behaviour)

3.5 WHEN the selected passenger count exceeds a vehicle's capacity THEN that vehicle's card SHALL be visually disabled (reduced opacity) and unclickable

3.6 WHEN proceeding past Step 2 THEN vehicle selection SHALL be optional — the wizard SHALL advance with or without a vehicle chosen

3.7 WHEN on Step 4 (Confirm) AND a vehicle was selected THEN the booking summary SHALL include a "Vehicle" row showing the selected vehicle name, placed before the "Est. Fare" row

3.8 WHEN on the Confirmation screen AND a vehicle was selected THEN the recap SHALL include the selected vehicle name

3.9 WHEN the wizard is reset THEN the vehicle selection SHALL be cleared

### Requirement 4: Bug and Error Fixes

**User Story:** As a developer, I want all TypeScript errors, unused imports, and lint warnings resolved so the build is clean.

#### Acceptance Criteria

4.1 WHEN building the project THEN there SHALL be no TypeScript compile errors introduced by these changes

4.2 WHEN the Hero component is built THEN the unused `ShieldCheck` import SHALL be removed

4.3 WHEN running ESLint THEN no new lint warnings SHALL be introduced by these changes
