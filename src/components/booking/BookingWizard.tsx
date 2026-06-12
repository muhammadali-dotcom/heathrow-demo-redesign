'use client'

import { useReducer, useEffect, useRef } from 'react'
import {
  MapPin,
  Navigation,
  Users,
  Calendar,
  Clock,
  Loader2,
  CheckCircle,
  ArrowLeft,
  Luggage,
} from 'lucide-react'
import StepIndicator, { StepInfo } from './StepIndicator'

// ─── Types ───────────────────────────────────────────────────────────────────

type WizardStep = 1 | 2 | 3 | 4 | 'confirmed'

interface FareData {
  fare: string
  distance: string
  duration: string
}

interface WizardFields {
  pickup: string
  dropoff: string
  name: string
  phone: string
  passengers: number
  luggage: number
  date: string
  time: string
}

type FareStatus = 'idle' | 'loading' | 'ready' | 'error'

interface WizardState {
  currentStep: WizardStep
  fields: WizardFields
  fareData: FareData | null
  fareStatus: FareStatus
  stepErrors: Partial<Record<keyof WizardFields, string>>
  submitError: string | null
  submitting: boolean
}

type WizardAction =
  | { type: 'SET_FIELD'; field: keyof WizardFields; value: string | number }
  | { type: 'SET_STEP_ERRORS'; errors: WizardState['stepErrors'] }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_FARE_LOADING' }
  | { type: 'SET_FARE_READY'; payload: FareData }
  | { type: 'SET_FARE_ERROR' }
  | { type: 'SET_SUBMITTING'; value: boolean }
  | { type: 'SET_SUBMIT_ERROR'; message: string | null }
  | { type: 'CONFIRM' }
  | { type: 'RESET' }

// ─── Initial State ────────────────────────────────────────────────────────────

export const initialState: WizardState = {
  currentStep: 1,
  fields: {
    pickup: '',
    dropoff: '',
    name: '',
    phone: '',
    passengers: 1,
    luggage: 0,
    date: '',
    time: '',
  },
  fareData: null,
  fareStatus: 'idle',
  stepErrors: {},
  submitError: null,
  submitting: false,
}

// ─── Reducer ─────────────────────────────────────────────────────────────────

export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, fields: { ...state.fields, [action.field]: action.value } }
    case 'SET_STEP_ERRORS':
      return { ...state, stepErrors: action.errors }
    case 'NEXT_STEP':
      if (typeof state.currentStep !== 'number') return state
      return { ...state, currentStep: ((state.currentStep as number) + 1) as WizardStep, stepErrors: {} }
    case 'PREV_STEP':
      if (typeof state.currentStep !== 'number') return state
      return { ...state, currentStep: ((state.currentStep as number) - 1) as WizardStep, stepErrors: {} }
    case 'SET_FARE_LOADING':
      return { ...state, fareStatus: 'loading', fareData: null }
    case 'SET_FARE_READY':
      return { ...state, fareStatus: 'ready', fareData: action.payload }
    case 'SET_FARE_ERROR':
      return { ...state, fareStatus: 'error' }
    case 'SET_SUBMITTING':
      return { ...state, submitting: action.value }
    case 'SET_SUBMIT_ERROR':
      return { ...state, submitError: action.message }
    case 'CONFIRM':
      return { ...state, currentStep: 'confirmed' }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

// ─── Validation ───────────────────────────────────────────────────────────────

export function validateStep1(fields: Pick<WizardFields, 'pickup' | 'dropoff'>): Partial<Record<'pickup' | 'dropoff', string>> {
  const errors: Partial<Record<'pickup' | 'dropoff', string>> = {}
  if (!fields.pickup.trim()) errors.pickup = 'Please enter a pickup location'
  if (!fields.dropoff.trim()) errors.dropoff = 'Please enter a drop-off location'
  return errors
}

export function validateStep2(fields: Pick<WizardFields, 'name' | 'phone' | 'date' | 'time'>): Partial<Record<'name' | 'phone' | 'date' | 'time', string>> {
  const errors: Partial<Record<'name' | 'phone' | 'date' | 'time', string>> = {}
  const today = new Date().toISOString().split('T')[0]

  if (!fields.name.trim()) {
    errors.name = 'Please enter your full name'
  } else if (fields.name.length > 100) {
    errors.name = 'Name must be 100 characters or fewer'
  }

  if (!fields.phone.trim() || !/^[+\d\s-]+$/.test(fields.phone)) {
    errors.phone = 'Enter a valid phone number'
  }

  if (!fields.date) {
    errors.date = 'Please select a date'
  } else if (fields.date < today) {
    errors.date = 'Date must be today or in the future'
  }

  if (!fields.time) {
    errors.time = 'Please select a time'
  }

  return errors
}

// ─── Mock Async Procedures ───────────────────────────────────────────────────

function mockFareCalculation(dispatch: React.Dispatch<WizardAction>) {
  dispatch({ type: 'SET_FARE_LOADING' })
  setTimeout(() => {
    try {
      const fare = '£' + (8 + Math.random() * 42).toFixed(2)
      const distance = (1.5 + Math.random() * 28.5).toFixed(1) + ' miles'
      const duration = Math.floor(5 + Math.random() * 85) + ' mins'
      dispatch({ type: 'SET_FARE_READY', payload: { fare, distance, duration } })
    } catch {
      dispatch({ type: 'SET_FARE_ERROR' })
    }
  }, 800)
}

function mockBookingSubmit(dispatch: React.Dispatch<WizardAction>) {
  dispatch({ type: 'SET_SUBMITTING', value: true })
  dispatch({ type: 'SET_SUBMIT_ERROR', message: null })
  setTimeout(() => {
    if (Math.random() > 0.05) {
      dispatch({ type: 'CONFIRM' })
    } else {
      dispatch({ type: 'SET_SUBMIT_ERROR', message: 'Submission failed. Please try again.' })
    }
    dispatch({ type: 'SET_SUBMITTING', value: false })
  }, 1500)
}

// ─── Shared Styles ────────────────────────────────────────────────────────────

const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
}

const inputErrorStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(192,57,43,0.5)',
}

const labelClass = 'block text-xs font-bold uppercase tracking-widest text-[#A1A1AA] mb-2'
const inputClass = 'w-full pl-9 pr-4 py-3 text-sm text-white placeholder-[#71717A] rounded-xl outline-none'
const inputNoIconClass = 'w-full px-4 py-3 text-sm text-white placeholder-[#71717A] rounded-xl outline-none'

// ─── BookingWizard ────────────────────────────────────────────────────────────

export default function BookingWizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialState)

  const step1Ref = useRef<HTMLHeadingElement>(null)
  const step2Ref = useRef<HTMLHeadingElement>(null)
  const step3Ref = useRef<HTMLHeadingElement>(null)
  const step4Ref = useRef<HTMLHeadingElement>(null)
  const confirmRef = useRef<HTMLHeadingElement>(null)

  // Focus management on step change
  useEffect(() => {
    const refMap: Record<string, React.RefObject<HTMLHeadingElement | null>> = {
      '1': step1Ref,
      '2': step2Ref,
      '3': step3Ref,
      '4': step4Ref,
      'confirmed': confirmRef,
    }
    const ref = refMap[String(state.currentStep)]
    if (ref?.current) {
      ref.current.setAttribute('tabindex', '-1')
      ref.current.focus()
    }
  }, [state.currentStep])

  // Trigger fare calculation when entering step 3
  useEffect(() => {
    if (state.currentStep === 3 && state.fareStatus === 'idle') {
      mockFareCalculation(dispatch)
    }
  }, [state.currentStep, state.fareStatus])

  // Build steps array for StepIndicator
  const stepLabels = ['Route', 'Details', 'Fare', 'Confirm']
  const numericStep = typeof state.currentStep === 'number' ? state.currentStep : 5
  const steps: StepInfo[] = stepLabels.map((label, i) => {
    const n = i + 1
    if (n < numericStep) return { label, state: 'completed' }
    if (n === numericStep) return { label, state: 'active' }
    return { label, state: 'upcoming' }
  })

  const today = new Date().toISOString().split('T')[0]

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleStep1Next() {
    const errors = validateStep1(state.fields)
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_STEP_ERRORS', errors })
    } else {
      dispatch({ type: 'NEXT_STEP' })
    }
  }

  function handleStep2Next() {
    const errors = validateStep2(state.fields)
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_STEP_ERRORS', errors })
    } else {
      dispatch({ type: 'NEXT_STEP' })
    }
  }

  function handleBack() {
    dispatch({ type: 'PREV_STEP' })
  }

  function handleRetryFare() {
    mockFareCalculation(dispatch)
  }

  function handleSubmit() {
    mockBookingSubmit(dispatch)
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <section className="py-24 px-4" style={{ background: '#050505' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.3)', color: '#cc200e' }}
          >
            Book Now
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white" style={{ letterSpacing: '-0.04em' }}>
            Book Your Ride
          </h1>
          <p className="text-[#A1A1AA] mt-3 text-base max-w-md mx-auto leading-relaxed">
            Fast, fixed-price quotes. No hidden fees.
          </p>
        </div>

        {/* Step Indicator — hide on confirmation screen */}
        {state.currentStep !== 'confirmed' && (
          <div className="mb-8">
            <StepIndicator steps={steps} currentStepNumber={numericStep > 4 ? 4 : numericStep} />
          </div>
        )}

        {/* Card */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(18,18,20,0.98)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
          }}
        >
          <div className="p-8 sm:p-10">

            {/* ── Step 1: Route ───────────────────────────────────────────── */}
            {state.currentStep === 1 && (
              <div>
                <h2
                  ref={step1Ref}
                  className="text-2xl font-black text-white mb-2"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  Where are you going?
                </h2>
                <p className="text-[#A1A1AA] text-sm mb-8">Enter your pickup and drop-off to see a price.</p>

                <div className="space-y-5">
                  {/* Pickup */}
                  <div>
                    <label htmlFor="pickup" className={labelClass}>Pickup Location</label>
                    <div className="relative">
                      <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#cc200e' }} />
                      <input
                        id="pickup"
                        type="text"
                        required
                        aria-required="true"
                        aria-describedby={state.stepErrors.pickup ? 'pickup-error' : undefined}
                        value={state.fields.pickup}
                        onChange={e => dispatch({ type: 'SET_FIELD', field: 'pickup', value: e.target.value })}
                        placeholder="Enter pickup address"
                        className={inputClass}
                        style={state.stepErrors.pickup ? inputErrorStyle : inputStyle}
                      />
                    </div>
                    {state.stepErrors.pickup && (
                      <p id="pickup-error" role="alert" className="text-red-400 text-xs mt-1.5">
                        {state.stepErrors.pickup}
                      </p>
                    )}
                  </div>

                  {/* Dropoff */}
                  <div>
                    <label htmlFor="dropoff" className={labelClass}>Drop-off Location</label>
                    <div className="relative">
                      <Navigation size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#cc200e' }} />
                      <input
                        id="dropoff"
                        type="text"
                        required
                        aria-required="true"
                        aria-describedby={state.stepErrors.dropoff ? 'dropoff-error' : undefined}
                        value={state.fields.dropoff}
                        onChange={e => dispatch({ type: 'SET_FIELD', field: 'dropoff', value: e.target.value })}
                        placeholder="Enter destination"
                        className={inputClass}
                        style={state.stepErrors.dropoff ? inputErrorStyle : inputStyle}
                      />
                    </div>
                    {state.stepErrors.dropoff && (
                      <p id="dropoff-error" role="alert" className="text-red-400 text-xs mt-1.5">
                        {state.stepErrors.dropoff}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleStep1Next}
                  className="w-full mt-8 py-4 rounded-xl font-bold text-base text-white transition-all duration-200 hover:brightness-110"
                  style={{ background: '#cc200e', boxShadow: '0 8px 24px rgba(192,57,43,0.3)' }}
                >
                  See Price →
                </button>
              </div>
            )}

            {/* ── Step 2: Details ─────────────────────────────────────────── */}
            {state.currentStep === 2 && (
              <div>
                <h2
                  ref={step2Ref}
                  className="text-2xl font-black text-white mb-2"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  Your journey details
                </h2>
                <p className="text-[#A1A1AA] text-sm mb-8">Tell us about your trip so we can prepare the right vehicle.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className={labelClass}>Full Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      aria-required="true"
                      maxLength={100}
                      aria-describedby={state.stepErrors.name ? 'name-error' : undefined}
                      value={state.fields.name}
                      onChange={e => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
                      placeholder="Your full name"
                      className={inputNoIconClass}
                      style={state.stepErrors.name ? inputErrorStyle : inputStyle}
                    />
                    {state.stepErrors.name && (
                      <p id="name-error" role="alert" className="text-red-400 text-xs mt-1.5">{state.stepErrors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className={labelClass}>Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      aria-required="true"
                      aria-describedby={state.stepErrors.phone ? 'phone-error' : undefined}
                      value={state.fields.phone}
                      onChange={e => dispatch({ type: 'SET_FIELD', field: 'phone', value: e.target.value })}
                      placeholder="07700 000000"
                      className={inputNoIconClass}
                      style={state.stepErrors.phone ? inputErrorStyle : inputStyle}
                    />
                    {state.stepErrors.phone && (
                      <p id="phone-error" role="alert" className="text-red-400 text-xs mt-1.5">{state.stepErrors.phone}</p>
                    )}
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className={labelClass}>Date</label>
                    <div className="relative">
                      <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#cc200e' }} />
                      <input
                        id="date"
                        type="date"
                        required
                        aria-required="true"
                        min={today}
                        aria-describedby={state.stepErrors.date ? 'date-error' : undefined}
                        value={state.fields.date}
                        onChange={e => dispatch({ type: 'SET_FIELD', field: 'date', value: e.target.value })}
                        className={inputClass}
                        style={state.stepErrors.date ? inputErrorStyle : inputStyle}
                      />
                    </div>
                    {state.stepErrors.date && (
                      <p id="date-error" role="alert" className="text-red-400 text-xs mt-1.5">{state.stepErrors.date}</p>
                    )}
                  </div>

                  {/* Time */}
                  <div>
                    <label htmlFor="time" className={labelClass}>Time</label>
                    <div className="relative">
                      <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#cc200e' }} />
                      <input
                        id="time"
                        type="time"
                        required
                        aria-required="true"
                        aria-describedby={state.stepErrors.time ? 'time-error' : undefined}
                        value={state.fields.time}
                        onChange={e => dispatch({ type: 'SET_FIELD', field: 'time', value: e.target.value })}
                        className={inputClass}
                        style={state.stepErrors.time ? inputErrorStyle : inputStyle}
                      />
                    </div>
                    {state.stepErrors.time && (
                      <p id="time-error" role="alert" className="text-red-400 text-xs mt-1.5">{state.stepErrors.time}</p>
                    )}
                  </div>

                  {/* Passengers */}
                  <div>
                    <label htmlFor="passengers" className={labelClass}>Passengers</label>
                    <div className="relative">
                      <Users size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#cc200e' }} />
                      <select
                        id="passengers"
                        value={state.fields.passengers}
                        onChange={e => dispatch({ type: 'SET_FIELD', field: 'passengers', value: parseInt(e.target.value) })}
                        className="w-full pl-9 pr-4 py-3 text-sm text-white rounded-xl outline-none appearance-none"
                        style={inputStyle}
                      >
                        {[1,2,3,4,5,6].map(n => (
                          <option key={n} value={n} style={{ background: '#1a1a1a' }}>{n} Passenger{n>1?'s':''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Luggage */}
                  <div>
                    <label htmlFor="luggage" className={labelClass}>Luggage</label>
                    <div className="relative">
                      <Luggage size={15} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#cc200e' }} />
                      <select
                        id="luggage"
                        value={state.fields.luggage}
                        onChange={e => dispatch({ type: 'SET_FIELD', field: 'luggage', value: parseInt(e.target.value) })}
                        className="w-full pl-9 pr-4 py-3 text-sm text-white rounded-xl outline-none appearance-none"
                        style={inputStyle}
                      >
                        {[0,1,2,3,4,5,6].map(n => (
                          <option key={n} value={n} style={{ background: '#1a1a1a' }}>{n} {n===1?'Bag':'Bags'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-5 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:bg-white/10"
                    style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    <ArrowLeft size={15} /> Back
                  </button>
                  <button
                    onClick={handleStep2Next}
                    className="flex-1 py-3.5 rounded-xl font-bold text-base text-white transition-all duration-200 hover:brightness-110"
                    style={{ background: '#cc200e', boxShadow: '0 8px 24px rgba(192,57,43,0.3)' }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 3: Fare ─────────────────────────────────────────────── */}
            {state.currentStep === 3 && (
              <div>
                <h2
                  ref={step3Ref}
                  className="text-2xl font-black text-white mb-2"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  Your estimated fare
                </h2>
                <p className="text-[#A1A1AA] text-sm mb-8">
                  {state.fields.pickup} → {state.fields.dropoff}
                </p>

                {/* Loading */}
                {state.fareStatus === 'loading' && (
                  <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <Loader2 size={36} className="animate-spin" style={{ color: '#cc200e' }} />
                    <p className="text-[#A1A1AA] text-sm">Calculating your fare…</p>
                  </div>
                )}

                {/* Error */}
                {state.fareStatus === 'error' && (
                  <div className="text-center py-12">
                    <p className="text-[#A1A1AA] mb-4">Unable to calculate fare. Please try again.</p>
                    <button
                      onClick={handleRetryFare}
                      className="px-6 py-3 rounded-xl font-semibold text-sm text-white"
                      style={{ background: '#cc200e' }}
                    >
                      Retry
                    </button>
                  </div>
                )}

                {/* Ready */}
                {state.fareStatus === 'ready' && state.fareData && (
                  <div>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { label: 'Estimated Fare', value: state.fareData.fare },
                        { label: 'Distance', value: state.fareData.distance },
                        { label: 'Duration', value: state.fareData.duration },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="rounded-2xl p-5 text-center"
                          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          <p className="text-[#A1A1AA] text-xs mb-2 uppercase tracking-widest font-semibold">{label}</p>
                          <p className="text-white font-black text-xl" style={{ letterSpacing: '-0.03em' }}>{value}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-[#A1A1AA] text-xs text-center mb-8">
                      * Estimates shown are approximate and may vary based on actual route.
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-5 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:bg-white/10"
                    style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                  >
                    <ArrowLeft size={15} /> Back
                  </button>
                  {state.fareStatus === 'ready' && (
                    <button
                      onClick={() => dispatch({ type: 'NEXT_STEP' })}
                      className="flex-1 py-3.5 rounded-xl font-bold text-base text-white transition-all duration-200 hover:brightness-110"
                      style={{ background: '#cc200e', boxShadow: '0 8px 24px rgba(192,57,43,0.3)' }}
                    >
                      Continue to Book →
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ── Step 4: Confirm ──────────────────────────────────────────── */}
            {state.currentStep === 4 && (
              <div>
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-sm text-[#A1A1AA] hover:text-white transition-colors mb-6"
                >
                  <ArrowLeft size={15} /> Back
                </button>

                <h2
                  ref={step4Ref}
                  className="text-2xl font-black text-white mb-2"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  Confirm your booking
                </h2>
                <p className="text-[#A1A1AA] text-sm mb-8">Review your journey details below.</p>

                {/* Summary */}
                <div
                  className="rounded-2xl p-6 mb-8 space-y-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {[
                    { label: 'Pickup', value: state.fields.pickup },
                    { label: 'Drop-off', value: state.fields.dropoff },
                    { label: 'Name', value: state.fields.name },
                    { label: 'Phone', value: state.fields.phone },
                    { label: 'Date', value: state.fields.date },
                    { label: 'Time', value: state.fields.time },
                    { label: 'Passengers', value: String(state.fields.passengers) },
                    { label: 'Luggage', value: `${state.fields.luggage} bag${state.fields.luggage !== 1 ? 's' : ''}` },
                    { label: 'Est. Fare', value: state.fareData?.fare ?? '—' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start gap-4">
                      <span className="text-[#A1A1AA] text-sm flex-shrink-0">{label}</span>
                      <span className="text-white text-sm font-medium text-right">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Book a Ride button */}
                <button
                  onClick={handleSubmit}
                  disabled={state.submitting}
                  className="w-full py-5 rounded-xl font-black text-xl text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:brightness-110"
                  style={{ background: '#cc200e', boxShadow: '0 12px 32px rgba(192,57,43,0.4)' }}
                >
                  {state.submitting ? (
                    <>
                      <Loader2 size={22} className="animate-spin" />
                      Processing…
                    </>
                  ) : (
                    'Book a Ride'
                  )}
                </button>

                {state.submitError && (
                  <p role="alert" className="text-red-400 text-sm text-center mt-3">
                    {state.submitError}
                  </p>
                )}
              </div>
            )}

            {/* ── Confirmation Screen ─────────────────────────────────────── */}
            {state.currentStep === 'confirmed' && (
              <div className="text-center py-8">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: '#cc200e', boxShadow: '0 16px 40px rgba(192,57,43,0.35)' }}
                >
                  <CheckCircle size={36} className="text-white" />
                </div>

                <h2
                  ref={confirmRef}
                  className="text-3xl font-black text-white mb-3"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  Booking Confirmed!
                </h2>
                <p className="text-[#A1A1AA] mb-8 leading-relaxed max-w-sm mx-auto">
                  Your ride has been booked. We&apos;ll be in touch shortly to confirm the details.
                </p>

                {/* Booking recap */}
                <div
                  className="rounded-2xl p-6 mb-8 text-left space-y-3"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  {[
                    { label: 'Pickup', value: state.fields.pickup },
                    { label: 'Drop-off', value: state.fields.dropoff },
                    { label: 'Name', value: state.fields.name },
                    { label: 'Date', value: state.fields.date },
                    { label: 'Time', value: state.fields.time },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-4">
                      <span className="text-[#A1A1AA] text-sm">{label}</span>
                      <span className="text-white text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => dispatch({ type: 'RESET' })}
                  className="px-8 py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:bg-white/10"
                  style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  Book Again
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
