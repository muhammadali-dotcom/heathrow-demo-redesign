# Requirements Document

## Introduction

This feature redesigns the existing single-page booking form on the Bittacy Cars website into a guided multi-step flow. The goal is to reduce cognitive load for users by progressively collecting journey details, surfacing a fare estimate before commitment, and closing with a clear call-to-action to complete the booking.

The form lives at `/book` and currently renders `HomeBooking.tsx` as a flat, single-screen form. The redesign replaces that with a four-step wizard rendered inside the same page shell, using the existing Tailwind CSS and custom UI component library.

## Glossary

- **Booking_Form**: The multi-step wizard component rendered on the `/book` page.
- **Step**: A single screen within the Booking_Form wizard. Steps are numbered 1–4.
- **Step_Indicator**: A visual component that shows the user's current position across the four steps.
- **Pickup_Field**: A text input for the journey's origin address.
- **Dropoff_Field**: A text input for the journey's destination address.
- **Passenger_Selector**: A numeric selector for the number of passengers (1–6).
- **Luggage_Selector**: A numeric selector for the number of luggage items (0–6).
- **Fare_Summary**: A read-only panel displaying the estimated fare, estimated distance, and estimated duration for the journey.
- **Book_a_Ride_Button**: The primary call-to-action button on Step 4 that submits the booking.
- **Confirmation_Screen**: The success state displayed after the booking is submitted.

---

## Requirements

### Requirement 1: Step Indicator

**User Story:** As a user, I want to see how many steps are in the booking flow and which step I am currently on, so that I understand my progress and how much is left.

#### Acceptance Criteria

1. THE Booking_Form SHALL display a Step_Indicator at the top of the wizard showing four steps labelled "Route", "Details", "Fare", and "Confirm".
2. WHEN the user is on a given step, THE Step_Indicator SHALL render that step in an active state that is visually distinct from both the completed state and the upcoming state.
3. WHEN the user advances from a step to the next step, THE Step_Indicator SHALL render the departed step in a completed state that is visually distinct from the active and upcoming states.
4. THE Step_Indicator SHALL convey the distinction between step states using a visual cue that is not colour alone (e.g., an icon, label change, or shape change), so that colour-blind users can also perceive progress.

---

### Requirement 2: Step 1 — Route Selection

**User Story:** As a user, I want to enter only my pickup and drop-off locations on the first screen, so that the form feels simple and unintimidating when I start.

#### Acceptance Criteria

1. WHEN the Booking_Form loads, THE Booking_Form SHALL display Step 1 containing only the Pickup_Field and the Dropoff_Field.
2. WHILE the user is on Step 1, THE Booking_Form SHALL display a "See Price" button as the primary call-to-action.
3. IF the user clicks "See Price" and the Pickup_Field is empty or contains only whitespace, THEN THE Booking_Form SHALL display an inline validation error on the Pickup_Field and SHALL NOT advance to Step 2.
4. IF the user clicks "See Price" and the Dropoff_Field is empty or contains only whitespace, THEN THE Booking_Form SHALL display an inline validation error on the Dropoff_Field and SHALL NOT advance to Step 2.
5. IF the user clicks "See Price" and both the Pickup_Field and the Dropoff_Field are empty or contain only whitespace, THEN THE Booking_Form SHALL display inline validation errors on both fields simultaneously and SHALL NOT advance to Step 2.
6. WHEN both the Pickup_Field and the Dropoff_Field contain non-whitespace values and the user clicks "See Price", THE Booking_Form SHALL advance to Step 2.

---

### Requirement 3: Step 2 — Journey Details

**User Story:** As a user, I want to provide my personal details, travel date, time, passenger count, and luggage count on the second screen, so that the operator has everything needed to prepare the right vehicle.

#### Acceptance Criteria

1. WHILE the Booking_Form is on Step 2, THE Booking_Form SHALL display input fields for: full name (max 100 characters), phone number, number of passengers, number of luggage items, date, and time.
2. THE Passenger_Selector SHALL allow selection of 1 to 6 passengers.
3. THE Luggage_Selector SHALL allow selection of 0 to 6 luggage items.
4. THE Booking_Form SHALL display a "Next" button as the primary call-to-action on Step 2.
5. THE Booking_Form SHALL display a "Back" button on Step 2 that returns the user to Step 1, retaining previously entered values in the Pickup_Field and Dropoff_Field.
6. IF the user clicks "Next" on Step 2 and the name field is empty or contains only whitespace, THEN THE Booking_Form SHALL display an inline validation error on the name field and SHALL NOT advance to Step 3.
7. IF the user clicks "Next" on Step 2 and the date field is empty, THEN THE Booking_Form SHALL display an inline validation error on the date field and SHALL NOT advance to Step 3.
8. IF the user clicks "Next" on Step 2 and the time field is empty, THEN THE Booking_Form SHALL display an inline validation error on the time field and SHALL NOT advance to Step 3.
9. WHEN all required fields on Step 2 (name, phone, date, time) are filled with valid values and the user clicks "Next", THE Booking_Form SHALL advance to Step 3.
10. IF the user selects a date in the past on Step 2 and clicks "Next", THEN THE Booking_Form SHALL display an inline validation error on the date field stating the date must be today or in the future and SHALL NOT advance to Step 3.
11. IF the name field value exceeds 100 characters, THEN THE Booking_Form SHALL display an inline validation error on the name field and SHALL NOT advance to Step 3.
12. IF the phone number field contains characters that are not digits, spaces, hyphens, or a leading plus sign, THEN THE Booking_Form SHALL display an inline validation error on the phone field and SHALL NOT advance to Step 3.

---

### Requirement 4: Step 3 — Fare Summary

**User Story:** As a user, I want to see an estimated fare, distance, and journey duration before I commit to booking, so that I can make an informed decision.

#### Acceptance Criteria

1. WHEN the Booking_Form advances to Step 3, THE Fare_Summary SHALL display an estimated fare amount formatted as "£X.XX" in GBP.
2. WHEN the Booking_Form advances to Step 3, THE Fare_Summary SHALL display an estimated distance formatted as "X.X miles".
3. WHEN the Booking_Form advances to Step 3, THE Fare_Summary SHALL display an estimated journey duration formatted as an integer number of minutes (e.g., "25 mins").
4. WHEN the Booking_Form is calculating fare values, THE Fare_Summary SHALL display a loading indicator in place of the fare, distance, and duration values.
5. IF fare calculation fails or produces no result, THE Fare_Summary SHALL display an error message and offer the user a "Retry" action.
6. WHEN the Booking_Form is on Step 3, THE Booking_Form SHALL display a "Continue to Book" button as the primary call-to-action that advances the user to Step 4.
7. WHEN the Booking_Form is on Step 3, THE Booking_Form SHALL display a "Back" button that returns the user to Step 2 without clearing previously entered data.
8. THE Fare_Summary SHALL display a visible textual notice stating that the fare, distance, and duration shown are estimates and may vary.

---

### Requirement 5: Step 4 — Booking Confirmation CTA

**User Story:** As a user, I want a prominent "Book a Ride" button on the final screen so that I know exactly what action completes my booking.

#### Acceptance Criteria

1. WHEN the Booking_Form is on Step 4, THE Booking_Form SHALL display a summary of the key journey details entered in Steps 1 and 2 (pickup, drop-off, name, date, time, passengers, luggage).
2. WHEN the Booking_Form is on Step 4, THE Booking_Form SHALL display the Book_a_Ride_Button styled distinctly from all other buttons on the page (e.g., larger size, high-contrast colour, or full-width layout) to make it the most visually prominent interactive element.
3. WHEN the Booking_Form is on Step 4, THE Booking_Form SHALL display a "Back" button that returns the user to Step 3 without clearing previously entered data.
4. WHEN the user clicks the Book_a_Ride_Button and the submission succeeds, THE Booking_Form SHALL transition to the Confirmation_Screen.
5. IF the user clicks the Book_a_Ride_Button and the submission fails, THE Booking_Form SHALL display an error message on Step 4 and SHALL NOT transition to the Confirmation_Screen, allowing the user to retry.

---

### Requirement 6: Confirmation Screen

**User Story:** As a user, I want to see a confirmation message after booking, so that I know my request was received.

#### Acceptance Criteria

1. WHEN the Book_a_Ride_Button is clicked and the submission succeeds, THE Booking_Form SHALL display the Confirmation_Screen showing a success heading (e.g., "Booking Confirmed!") and a message indicating that the operator will be in contact.
2. THE Confirmation_Screen SHALL display the submitted booking details (pickup, drop-off, name, date, time) so the user can verify what was booked.
3. THE Confirmation_Screen SHALL display a "Book Again" button that resets the Booking_Form to Step 1 with all fields across Steps 1–4 cleared and the Step_Indicator returned to step 1.

---

### Requirement 7: State Preservation on Back Navigation

**User Story:** As a user, I want my previously entered values to be preserved when I navigate back between steps, so that I do not have to re-enter information.

#### Acceptance Criteria

1. WHEN the user navigates from Step 2 back to Step 1 using the "Back" button, THE Booking_Form SHALL retain the exact values previously entered in the Pickup_Field and Dropoff_Field.
2. WHEN the user navigates from Step 3 back to Step 2 using the "Back" button, THE Booking_Form SHALL retain the exact values previously entered in the full name, phone number, Passenger_Selector, Luggage_Selector, date, and time fields.
3. WHEN the user navigates from Step 4 back to Step 3 using the "Back" button, THE Booking_Form SHALL retain the exact values previously entered in Steps 1 and 2.
4. WHEN the user navigates back one or more steps and then advances forward again, THE Booking_Form SHALL retain the exact values from the user's most recent entry in each field throughout the entire forward-and-back navigation sequence.

---

### Requirement 8: Accessibility

**User Story:** As a user relying on assistive technology, I want the booking form to be navigable and understandable, so that I can complete a booking independently.

#### Acceptance Criteria

1. THE Booking_Form SHALL associate every visible input field with a programmatic label using a `for`/`id` relationship or `aria-label`.
2. WHEN an inline validation error is displayed, THE Booking_Form SHALL associate the error message with its corresponding input field using `aria-describedby` at the moment the error becomes visible.
3. THE Step_Indicator SHALL expose the current step number and total step count to screen readers via an `aria-label` (e.g., "Step 2 of 4: Details").
4. THE Booking_Form SHALL mark all required input fields with the `required` attribute or `aria-required="true"` so that screen readers announce them as required.
5. WHEN the Booking_Form advances to a new step, THE Booking_Form SHALL move keyboard focus to the first interactive element or the step heading of the newly visible step.

### Gradient color Remove

Remove the gradient red color used in it and make simple without gradient in overall website or project
