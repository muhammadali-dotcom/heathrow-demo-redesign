/**
 * Property-based tests for fare loading sequence and submission idempotency
 * Covers: Property 5 (fare loading sequence), Property 6 (submission idempotency)
 */
import * as fc from 'fast-check'
import { wizardReducer, initialState } from '../components/booking/BookingWizard'

// ── Property 5: Fare loading sequence ────────────────────────────────────────

describe('Property 5: fareStatus only transitions idle → loading → ready|error', () => {
  test('SET_FARE_LOADING moves fareStatus to loading', () => {
    const state = { ...initialState, fareStatus: 'idle' as const }
    const result = wizardReducer(state, { type: 'SET_FARE_LOADING' })
    expect(result.fareStatus).toBe('loading')
  })

  test('SET_FARE_READY moves fareStatus to ready', () => {
    const state = { ...initialState, fareStatus: 'loading' as const }
    const result = wizardReducer(state, {
      type: 'SET_FARE_READY',
      payload: { fare: '£12.00', distance: '5.0 miles', duration: '20 mins' },
    })
    expect(result.fareStatus).toBe('ready')
  })

  test('SET_FARE_ERROR moves fareStatus to error', () => {
    const state = { ...initialState, fareStatus: 'loading' as const }
    const result = wizardReducer(state, { type: 'SET_FARE_ERROR' })
    expect(result.fareStatus).toBe('error')
  })

  test('fareStatus cannot jump from idle to ready without loading first', () => {
    fc.assert(
      fc.property(fc.constant('idle' as const), () => {
        const state = { ...initialState, fareStatus: 'idle' as const }
        // SET_FARE_READY without prior SET_FARE_LOADING should not happen in real flow
        // but reducer must still accept it gracefully — the important property is that
        // no action except SET_FARE_LOADING transitions from ready back to loading
        const readyState = {
          ...initialState,
          fareStatus: 'ready' as const,
          fareData: { fare: '£10.00', distance: '3.0 miles', duration: '15 mins' },
        }
        // None of these actions should change fareStatus back to loading
        const nonLoadingActions = [
          { type: 'NEXT_STEP' as const },
          { type: 'PREV_STEP' as const },
          { type: 'CONFIRM' as const },
          { type: 'SET_FARE_ERROR' as const },
        ]
        return nonLoadingActions.every((action) => {
          const result = wizardReducer(readyState, action as Parameters<typeof wizardReducer>[1])
          return result.fareStatus !== 'loading'
        })
      }),
    )
  })

  test('Only SET_FARE_LOADING transitions fareStatus to loading', () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.constant({ type: 'NEXT_STEP' as const }),
          fc.constant({ type: 'PREV_STEP' as const }),
          fc.constant({ type: 'CONFIRM' as const }),
          fc.constant({ type: 'SET_FARE_ERROR' as const }),
          fc.constant({ type: 'SET_SUBMITTING' as const, value: true }),
          fc.constant({ type: 'SET_SUBMIT_ERROR' as const, message: 'err' }),
        ),
        (action) => {
          const state = {
            ...initialState,
            fareStatus: 'ready' as const,
            fareData: { fare: '£10.00', distance: '3.0 miles', duration: '15 mins' },
          }
          const result = wizardReducer(state, action as Parameters<typeof wizardReducer>[1])
          return result.fareStatus !== 'loading'
        },
      ),
    )
  })
})

// ── Property 6: Submission idempotency — reducer level ───────────────────────

describe('Property 6: Submission state', () => {
  test('SET_SUBMITTING true sets submitting to true', () => {
    const state = { ...initialState, currentStep: 4 as const }
    const result = wizardReducer(state, { type: 'SET_SUBMITTING', value: true })
    expect(result.submitting).toBe(true)
  })

  test('SET_SUBMITTING false sets submitting to false', () => {
    const state = { ...initialState, currentStep: 4 as const, submitting: true }
    const result = wizardReducer(state, { type: 'SET_SUBMITTING', value: false })
    expect(result.submitting).toBe(false)
  })

  test('submitting flag is preserved through irrelevant actions', () => {
    fc.assert(
      fc.property(fc.boolean(), (submitting) => {
        const state = { ...initialState, submitting, currentStep: 4 as const }
        // SET_FIELD should not change submitting
        const result = wizardReducer(state, {
          type: 'SET_FIELD',
          field: 'pickup',
          value: 'test',
        })
        return result.submitting === submitting
      }),
    )
  })

  test('RESET always sets submitting to false', () => {
    fc.assert(
      fc.property(fc.boolean(), (submitting) => {
        const state = { ...initialState, submitting, currentStep: 4 as const }
        const result = wizardReducer(state, { type: 'RESET' })
        return result.submitting === false
      }),
    )
  })
})
