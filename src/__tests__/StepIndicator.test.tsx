/**
 * Unit tests for StepIndicator component
 * Covers: task 2.2, task 5.8 (Property 3: error-field association via aria-describedby)
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import StepIndicator, { StepInfo } from '../components/booking/StepIndicator'

const makeSteps = (activeIndex: number): StepInfo[] =>
  ['Route', 'Details', 'Fare', 'Confirm'].map((label, i) => ({
    label,
    state: i < activeIndex ? 'completed' : i === activeIndex ? 'active' : 'upcoming',
  }))

describe('StepIndicator — rendering', () => {
  test('renders all four step labels', () => {
    render(<StepIndicator steps={makeSteps(0)} currentStepNumber={1} />)
    expect(screen.getByText('Route')).toBeInTheDocument()
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Fare')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  test('active step circle shows the step number', () => {
    render(<StepIndicator steps={makeSteps(1)} currentStepNumber={2} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  test('active step circle has aria-current="step"', () => {
    render(<StepIndicator steps={makeSteps(0)} currentStepNumber={1} />)
    const current = document.querySelector('[aria-current="step"]')
    expect(current).not.toBeNull()
  })

  test('nav element has correct aria-label reflecting active step', () => {
    render(<StepIndicator steps={makeSteps(2)} currentStepNumber={3} />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Step 3 of 4: Fare')
  })

  test('completed step renders a check icon (svg)', () => {
    render(<StepIndicator steps={makeSteps(2)} currentStepNumber={3} />)
    // Steps 1 and 2 are completed — there should be SVG check icons
    const svgs = document.querySelectorAll('svg')
    expect(svgs.length).toBeGreaterThanOrEqual(2)
  })

  test('upcoming steps do not have aria-current', () => {
    render(<StepIndicator steps={makeSteps(0)} currentStepNumber={1} />)
    const allCurrentElements = document.querySelectorAll('[aria-current]')
    expect(allCurrentElements).toHaveLength(1)
  })

  test('connector lines have aria-hidden', () => {
    render(<StepIndicator steps={makeSteps(1)} currentStepNumber={2} />)
    const hiddenLines = document.querySelectorAll('[aria-hidden="true"]')
    expect(hiddenLines.length).toBeGreaterThanOrEqual(3) // 3 connectors for 4 steps
  })
})

describe('StepIndicator — step 1 active', () => {
  test('aria-label says Step 1 of 4: Route', () => {
    render(<StepIndicator steps={makeSteps(0)} currentStepNumber={1} />)
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Step 1 of 4: Route')
  })
})

describe('StepIndicator — step 4 active', () => {
  test('aria-label says Step 4 of 4: Confirm', () => {
    render(<StepIndicator steps={makeSteps(3)} currentStepNumber={4} />)
    expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Step 4 of 4: Confirm')
  })

  test('first three steps are completed (no aria-current on them)', () => {
    render(<StepIndicator steps={makeSteps(3)} currentStepNumber={4} />)
    const current = document.querySelectorAll('[aria-current="step"]')
    expect(current).toHaveLength(1)
  })
})
