/**
 * Unit + property-based tests for validateStep1 and validateStep2
 * Covers: task 3.7 (Property 2: validation gate), task 3.8 (validateStep2 unit tests)
 */
import * as fc from 'fast-check'
import { validateStep1, validateStep2 } from '../components/booking/BookingWizard'

// ── validateStep1 unit tests ─────────────────────────────────────────────────

describe('validateStep1 — unit tests', () => {
  test('returns empty errors when both fields are non-empty', () => {
    const errors = validateStep1({ pickup: '10 Mill Hill', dropoff: 'Heathrow T2' })
    expect(Object.keys(errors)).toHaveLength(0)
  })

  test('returns pickup error when pickup is empty', () => {
    const errors = validateStep1({ pickup: '', dropoff: 'Heathrow T2' })
    expect(errors.pickup).toBeDefined()
    expect(errors.dropoff).toBeUndefined()
  })

  test('returns dropoff error when dropoff is empty', () => {
    const errors = validateStep1({ pickup: '10 Mill Hill', dropoff: '' })
    expect(errors.dropoff).toBeDefined()
    expect(errors.pickup).toBeUndefined()
  })

  test('returns both errors when both fields are empty', () => {
    const errors = validateStep1({ pickup: '', dropoff: '' })
    expect(errors.pickup).toBeDefined()
    expect(errors.dropoff).toBeDefined()
  })

  test('treats whitespace-only pickup as empty', () => {
    const errors = validateStep1({ pickup: '   ', dropoff: 'Heathrow T2' })
    expect(errors.pickup).toBeDefined()
  })

  test('treats whitespace-only dropoff as empty', () => {
    const errors = validateStep1({ pickup: '10 Mill Hill', dropoff: '\t' })
    expect(errors.dropoff).toBeDefined()
  })
})

// ── Property 2: validation gate — validateStep1 ──────────────────────────────

describe('Property 2: validateStep1 validation gate', () => {
  test('returns no errors iff both fields are non-whitespace', () => {
    fc.assert(
      fc.property(
        fc.string().filter((s) => s.trim().length > 0),
        fc.string().filter((s) => s.trim().length > 0),
        (pickup, dropoff) => {
          const errors = validateStep1({ pickup, dropoff })
          return Object.keys(errors).length === 0
        },
      ),
    )
  })

  test('always returns pickup error for whitespace-only pickup', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 20 }).map((n) => ' '.repeat(n)),
        fc.string().filter((s) => s.trim().length > 0),
        (pickup, dropoff) => {
          const errors = validateStep1({ pickup, dropoff })
          return errors.pickup !== undefined
        },
      ),
    )
  })
})

// ── validateStep2 unit tests ─────────────────────────────────────────────────

const futureDate = (() => {
  const d = new Date()
  d.setFullYear(d.getFullYear() + 1)
  return d.toISOString().split('T')[0]
})()

const pastDate = (() => {
  const d = new Date()
  d.setFullYear(d.getFullYear() - 1)
  return d.toISOString().split('T')[0]
})()

const validFields = {
  name: 'Jane Smith',
  phone: '07700 123456',
  date: futureDate,
  time: '10:30',
}

describe('validateStep2 — name field', () => {
  test('returns no error for valid name', () => {
    const errors = validateStep2(validFields)
    expect(errors.name).toBeUndefined()
  })

  test('returns error for empty name', () => {
    const errors = validateStep2({ ...validFields, name: '' })
    expect(errors.name).toBeDefined()
  })

  test('returns error for whitespace-only name', () => {
    const errors = validateStep2({ ...validFields, name: '   ' })
    expect(errors.name).toBeDefined()
  })

  test('returns error for name exceeding 100 characters', () => {
    const errors = validateStep2({ ...validFields, name: 'A'.repeat(101) })
    expect(errors.name).toMatch(/100/)
  })

  test('accepts name of exactly 100 characters', () => {
    const errors = validateStep2({ ...validFields, name: 'A'.repeat(100) })
    expect(errors.name).toBeUndefined()
  })
})

describe('validateStep2 — phone field', () => {
  test('accepts valid UK mobile number', () => {
    const errors = validateStep2({ ...validFields, phone: '07700 123456' })
    expect(errors.phone).toBeUndefined()
  })

  test('accepts number with leading plus sign', () => {
    const errors = validateStep2({ ...validFields, phone: '+44 7700 123456' })
    expect(errors.phone).toBeUndefined()
  })

  test('accepts number with hyphens', () => {
    const errors = validateStep2({ ...validFields, phone: '07700-123-456' })
    expect(errors.phone).toBeUndefined()
  })

  test('returns error for phone with letters', () => {
    const errors = validateStep2({ ...validFields, phone: '07700abc456' })
    expect(errors.phone).toBeDefined()
  })

  test('returns error for empty phone', () => {
    const errors = validateStep2({ ...validFields, phone: '' })
    expect(errors.phone).toBeDefined()
  })
})

describe('validateStep2 — date field', () => {
  test('returns no error for future date', () => {
    const errors = validateStep2({ ...validFields, date: futureDate })
    expect(errors.date).toBeUndefined()
  })

  test('returns error for empty date', () => {
    const errors = validateStep2({ ...validFields, date: '' })
    expect(errors.date).toBeDefined()
  })

  test('returns error for past date with "today or in the future" message', () => {
    const errors = validateStep2({ ...validFields, date: pastDate })
    expect(errors.date).toMatch(/today or in the future/i)
  })
})

describe('validateStep2 — time field', () => {
  test('returns no error for valid time', () => {
    const errors = validateStep2({ ...validFields, time: '14:30' })
    expect(errors.time).toBeUndefined()
  })

  test('returns error for empty time', () => {
    const errors = validateStep2({ ...validFields, time: '' })
    expect(errors.time).toBeDefined()
  })
})

describe('validateStep2 — all valid', () => {
  test('returns zero errors when all fields are valid', () => {
    const errors = validateStep2(validFields)
    expect(Object.keys(errors)).toHaveLength(0)
  })
})
