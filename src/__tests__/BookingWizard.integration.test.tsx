/**
 * Integration tests for the BookingWizard component
 * Covers: task 7.3 (full wizard flow), task 5.8 (Property 3: error-field aria-describedby)
 */
import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import BookingWizard from '../components/booking/BookingWizard'

// Mock lucide-react to avoid SVG rendering issues in test env
jest.mock('lucide-react', () => {
  const MockIcon = ({ size, className, style }: { size?: number; className?: string; style?: React.CSSProperties }) => (
    <svg data-testid="icon" className={className} style={style} width={size} height={size} />
  )
  return new Proxy({}, { get: () => MockIcon })
})

// Mock framer-motion if present
jest.mock('framer-motion', () => ({
  motion: new Proxy({}, { get: (_, tag) => function MockMotion(props: Record<string, unknown>) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createElement } = require('react')
    return createElement(tag as string, props)
  }}),
  useReducedMotion: () => false,
}), { virtual: true })

beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

const futureDate = (() => {
  const d = new Date()
  d.setFullYear(d.getFullYear() + 1)
  return d.toISOString().split('T')[0]
})()

describe('BookingWizard — Step 1: Route Selection', () => {
  test('renders pickup and dropoff inputs on load', () => {
    render(<BookingWizard />)
    expect(screen.getByLabelText(/pickup location/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/drop-off location/i)).toBeInTheDocument()
  })

  test('shows "See Price" button on step 1', () => {
    render(<BookingWizard />)
    expect(screen.getByRole('button', { name: /see price/i })).toBeInTheDocument()
  })

  test('shows validation errors when clicking See Price with empty fields', () => {
    render(<BookingWizard />)
    fireEvent.click(screen.getByRole('button', { name: /see price/i }))
    expect(screen.getByText(/please enter a pickup location/i)).toBeInTheDocument()
    expect(screen.getByText(/please enter a drop-off location/i)).toBeInTheDocument()
  })

  test('does NOT advance when only pickup is filled', () => {
    render(<BookingWizard />)
    fireEvent.change(screen.getByLabelText(/pickup location/i), { target: { value: 'Mill Hill' } })
    fireEvent.click(screen.getByRole('button', { name: /see price/i }))
    expect(screen.getByText(/please enter a drop-off location/i)).toBeInTheDocument()
    expect(screen.queryByText(/journey details/i)).not.toBeInTheDocument()
  })

  test('advances to step 2 when both fields are filled', () => {
    render(<BookingWizard />)
    fireEvent.change(screen.getByLabelText(/pickup location/i), { target: { value: 'Mill Hill' } })
    fireEvent.change(screen.getByLabelText(/drop-off location/i), { target: { value: 'Heathrow T2' } })
    fireEvent.click(screen.getByRole('button', { name: /see price/i }))
    expect(screen.getByText(/your journey details/i)).toBeInTheDocument()
  })

  test('pickup input has aria-describedby pointing to error element when error shown', () => {
    render(<BookingWizard />)
    fireEvent.click(screen.getByRole('button', { name: /see price/i }))
    const pickupInput = screen.getByLabelText(/pickup location/i)
    expect(pickupInput).toHaveAttribute('aria-describedby', 'pickup-error')
    expect(document.getElementById('pickup-error')).toBeInTheDocument()
  })
})

describe('BookingWizard — Back navigation preserves values', () => {
  test('pickup and dropoff values are preserved when navigating back from step 2', () => {
    render(<BookingWizard />)

    // Fill step 1
    fireEvent.change(screen.getByLabelText(/pickup location/i), { target: { value: 'Mill Hill Broadway' } })
    fireEvent.change(screen.getByLabelText(/drop-off location/i), { target: { value: 'Heathrow T2' } })
    fireEvent.click(screen.getByRole('button', { name: /see price/i }))

    // Now on step 2 — click Back
    fireEvent.click(screen.getByRole('button', { name: /back/i }))

    // Back on step 1 — values should be preserved
    expect(screen.getByLabelText(/pickup location/i)).toHaveValue('Mill Hill Broadway')
    expect(screen.getByLabelText(/drop-off location/i)).toHaveValue('Heathrow T2')
  })
})

describe('BookingWizard — Step 2: Journey Details', () => {
  function fillAndAdvanceStep1() {
    render(<BookingWizard />)
    fireEvent.change(screen.getByLabelText(/pickup location/i), { target: { value: 'Mill Hill' } })
    fireEvent.change(screen.getByLabelText(/drop-off location/i), { target: { value: 'Heathrow T2' } })
    fireEvent.click(screen.getByRole('button', { name: /see price/i }))
  }

  test('renders all step 2 fields', () => {
    fillAndAdvanceStep1()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^date$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^time$/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/passengers/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/luggage/i)).toBeInTheDocument()
  })

  test('shows validation errors for empty required fields', () => {
    fillAndAdvanceStep1()
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText(/please enter your full name/i)).toBeInTheDocument()
  })

  test('advances to step 3 (fare) when all fields valid', async () => {
    fillAndAdvanceStep1()
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Smith' } })
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '07700 123456' } })
    fireEvent.change(screen.getByLabelText(/^date$/i), { target: { value: futureDate } })
    fireEvent.change(screen.getByLabelText(/^time$/i), { target: { value: '10:30' } })
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByText(/your estimated fare/i)).toBeInTheDocument()
  })
})

describe('BookingWizard — Step 3: Fare Summary', () => {
  async function advanceToStep3() {
    render(<BookingWizard />)
    fireEvent.change(screen.getByLabelText(/pickup location/i), { target: { value: 'Mill Hill' } })
    fireEvent.change(screen.getByLabelText(/drop-off location/i), { target: { value: 'Heathrow T2' } })
    fireEvent.click(screen.getByRole('button', { name: /see price/i }))
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Smith' } })
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '07700 123456' } })
    fireEvent.change(screen.getByLabelText(/^date$/i), { target: { value: futureDate } })
    fireEvent.change(screen.getByLabelText(/^time$/i), { target: { value: '10:30' } })
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
  }

  test('shows loading state immediately on entering step 3', async () => {
    await advanceToStep3()
    expect(screen.getByText(/calculating your fare/i)).toBeInTheDocument()
  })

  test('shows fare cards after 800ms', async () => {
    await advanceToStep3()
    act(() => { jest.advanceTimersByTime(800) })
    await waitFor(() => {
      expect(screen.getAllByText(/estimated fare/i).length).toBeGreaterThanOrEqual(1)
    })
  })

  test('shows "Continue to Book" button after fare loads', async () => {
    await advanceToStep3()
    act(() => { jest.advanceTimersByTime(800) })
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /continue to book/i })).toBeInTheDocument()
    })
  })

  test('step 2 fields are preserved when navigating back from step 3', async () => {
    await advanceToStep3()
    act(() => { jest.advanceTimersByTime(800) })
    await waitFor(() => screen.getByRole('button', { name: /back/i }))
    fireEvent.click(screen.getByRole('button', { name: /back/i }))
    expect(screen.getByLabelText(/full name/i)).toHaveValue('Jane Smith')
    expect(screen.getByLabelText(/phone number/i)).toHaveValue('07700 123456')
  })
})

describe('BookingWizard — Step 4: Confirm', () => {
  async function advanceToStep4() {
    render(<BookingWizard />)
    fireEvent.change(screen.getByLabelText(/pickup location/i), { target: { value: 'Mill Hill' } })
    fireEvent.change(screen.getByLabelText(/drop-off location/i), { target: { value: 'Heathrow T2' } })
    fireEvent.click(screen.getByRole('button', { name: /see price/i }))
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Smith' } })
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '07700 123456' } })
    fireEvent.change(screen.getByLabelText(/^date$/i), { target: { value: futureDate } })
    fireEvent.change(screen.getByLabelText(/^time$/i), { target: { value: '10:30' } })
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    act(() => { jest.advanceTimersByTime(800) })
    await waitFor(() => screen.getByRole('button', { name: /continue to book/i }))
    fireEvent.click(screen.getByRole('button', { name: /continue to book/i }))
  }

  test('shows "Book a Ride" button prominently on step 4', async () => {
    await advanceToStep4()
    expect(screen.getByRole('button', { name: /book a ride/i })).toBeInTheDocument()
  })

  test('displays journey summary on step 4', async () => {
    await advanceToStep4()
    expect(screen.getByText('Mill Hill')).toBeInTheDocument()
    expect(screen.getByText('Heathrow T2')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })
})

describe('BookingWizard — Confirmation Screen', () => {
  async function completeBooking() {
    render(<BookingWizard />)
    // Mock Math.random to always succeed (> 0.05)
    jest.spyOn(Math, 'random').mockReturnValue(0.5)

    fireEvent.change(screen.getByLabelText(/pickup location/i), { target: { value: 'Mill Hill' } })
    fireEvent.change(screen.getByLabelText(/drop-off location/i), { target: { value: 'Heathrow T2' } })
    fireEvent.click(screen.getByRole('button', { name: /see price/i }))
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: 'Jane Smith' } })
    fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: '07700 123456' } })
    fireEvent.change(screen.getByLabelText(/^date$/i), { target: { value: futureDate } })
    fireEvent.change(screen.getByLabelText(/^time$/i), { target: { value: '10:30' } })
    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    act(() => { jest.advanceTimersByTime(800) })
    await waitFor(() => screen.getByRole('button', { name: /continue to book/i }))
    fireEvent.click(screen.getByRole('button', { name: /continue to book/i }))
    fireEvent.click(screen.getByRole('button', { name: /book a ride/i }))
    act(() => { jest.advanceTimersByTime(1500) })
    await waitFor(() => screen.getByText(/booking confirmed/i))
  }

  test('shows confirmation screen with "Booking Confirmed!" heading', async () => {
    await completeBooking()
    expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument()
  })

  test('confirmation screen shows submitted booking details', async () => {
    await completeBooking()
    expect(screen.getByText('Mill Hill')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  test('"Book Again" button resets wizard to step 1 with empty fields', async () => {
    await completeBooking()
    fireEvent.click(screen.getByRole('button', { name: /book again/i }))
    expect(screen.getByLabelText(/pickup location/i)).toHaveValue('')
    expect(screen.getByLabelText(/drop-off location/i)).toHaveValue('')
    expect(screen.getByRole('button', { name: /see price/i })).toBeInTheDocument()
  })
})
