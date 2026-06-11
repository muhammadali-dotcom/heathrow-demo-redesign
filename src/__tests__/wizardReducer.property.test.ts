/**
 * Property-based tests for wizardReducer
 * Covers: Property 1 (field preservation), Property 4 (reset completeness), Property 7 (confirmation immutability)
 */
import * as fc from 'fast-check'
import { wizardReducer, initialState } from '../components/booking/BookingWizard'

// ── Arbitraries ──────────────────────────────────────────────────────────────

const wizardFieldsArb = fc.record({
  pickup: fc.string(),
  dropoff: fc.string(),
  name: fc.string(),
  phone: fc.string(),
  passengers: fc.integer({ min: 1, max: 6 }),
  luggage: fc.integer({ min: 0, max: 6 }),
  date: fc.string(),
  time: fc.string(),
})

const wizardStateArb = fc.record({
  currentStep: fc.oneof(
    fc.constant(1 as const),
    fc.constant(2 as const),
    fc.constant(3 as const),
    fc.constant(4 as const),
    fc.constant('confirmed' as const),
  ),
  fields: wizardFieldsArb,
  fareData: fc.option(
    fc.record({
      fare: fc.string(),
      distance: fc.string(),
      duration: fc.string(),
    }),
    { nil: null },
  ),
  fareStatus: fc.oneof(
    fc.constant('idle' as const),
    fc.constant('loading' as const),
    fc.constant('ready' as const),
    fc.constant('error' as const),
  ),
  stepErrors: fc.constant({}),
  submitError: fc.option(fc.string(), { nil: null }),
  submitting: fc.boolean(),
})

// ── Property 1: Back navigation never mutates field values ───────────────────

describe('Property 1: Back navigation preserves fields', () => {
  test('PREV_STEP on step 2 preserves all field values', () => {
    fc.assert(
      fc.property(wizardFieldsArb, (fields) => {
        const state = { ...initialState, fields, currentStep: 2 as const }
        const next = wizardReducer(state, { type: 'PREV_STEP' })
        return JSON.stringify(next.fields) === JSON.stringify(state.fields)
      }),
    )
  })

  test('PREV_STEP on step 3 preserves all field values', () => {
    fc.assert(
      fc.property(wizardFieldsArb, (fields) => {
        const state = { ...initialState, fields, currentStep: 3 as const }
        const next = wizardReducer(state, { type: 'PREV_STEP' })
        return JSON.stringify(next.fields) === JSON.stringify(state.fields)
      }),
    )
  })

  test('PREV_STEP on step 4 preserves all field values', () => {
    fc.assert(
      fc.property(wizardFieldsArb, (fields) => {
        const state = { ...initialState, fields, currentStep: 4 as const }
        const next = wizardReducer(state, { type: 'PREV_STEP' })
        return JSON.stringify(next.fields) === JSON.stringify(state.fields)
      }),
    )
  })

  test('Multiple PREV_STEP actions never mutate fields', () => {
    fc.assert(
      fc.property(wizardFieldsArb, (fields) => {
        let state: ReturnType<typeof wizardReducer> = { ...initialState, fields, currentStep: 4 as const }
        state = wizardReducer(state, { type: 'PREV_STEP' }) // → 3
        state = wizardReducer(state, { type: 'PREV_STEP' }) // → 2
        state = wizardReducer(state, { type: 'PREV_STEP' }) // → 1
        return JSON.stringify(state.fields) === JSON.stringify(fields)
      }),
    )
  })
})

// ── Property 4: RESET returns exact initialState ─────────────────────────────

describe('Property 4: State reset completeness', () => {
  test('RESET returns a state deeply equal to initialState for any arbitrary state', () => {
    fc.assert(
      fc.property(wizardStateArb, (anyState) => {
        const result = wizardReducer(anyState as Parameters<typeof wizardReducer>[0], { type: 'RESET' })
        return JSON.stringify(result) === JSON.stringify(initialState)
      }),
    )
  })

  test('RESET clears all field values to empty strings / defaults', () => {
    fc.assert(
      fc.property(wizardFieldsArb, (fields) => {
        const state = { ...initialState, fields, currentStep: 4 as const }
        const result = wizardReducer(state, { type: 'RESET' })
        return (
          result.fields.pickup === '' &&
          result.fields.dropoff === '' &&
          result.fields.name === '' &&
          result.fields.phone === '' &&
          result.fields.passengers === 1 &&
          result.fields.luggage === 0
        )
      }),
    )
  })
})

// ── Property 7: Confirmation immutability ────────────────────────────────────

describe('Property 7: Confirmation screen immutability', () => {
  const confirmedState = { ...initialState, currentStep: 'confirmed' as const }

  const nonResetActions = [
    { type: 'SET_FARE_LOADING' as const },
    { type: 'SET_FARE_ERROR' as const },
    { type: 'CONFIRM' as const },
    { type: 'SET_SUBMITTING' as const, value: true },
    { type: 'SET_SUBMITTING' as const, value: false },
    { type: 'SET_FIELD' as const, field: 'pickup' as const, value: 'test' },
  ]

  test('No action except RESET changes currentStep from confirmed', () => {
    for (const action of nonResetActions) {
      const result = wizardReducer(confirmedState, action as Parameters<typeof wizardReducer>[1])
      expect(result.currentStep).toBe('confirmed')
    }
  })

  test('RESET does change confirmed state back to step 1', () => {
    const result = wizardReducer(confirmedState, { type: 'RESET' })
    expect(result.currentStep).toBe(1)
  })
})
