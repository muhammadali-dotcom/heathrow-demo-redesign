import { Check } from 'lucide-react'

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface StepInfo {
  label: string
  state: 'upcoming' | 'active' | 'completed'
}

export interface StepIndicatorProps {
  steps: StepInfo[]
  currentStepNumber: number // 1-based
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function StepIndicator({ steps, currentStepNumber }: StepIndicatorProps) {
  const activeLabel = steps[currentStepNumber - 1]?.label ?? ''

  return (
    <nav aria-label={`Step ${currentStepNumber} of 4: ${activeLabel}`}>
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isLast = index === steps.length - 1

          return (
            <li key={stepNumber} className="flex items-center flex-1 last:flex-none">
              {/* Step circle + label */}
              <div className="flex flex-col items-center gap-2">
                {/* Circle */}
                {step.state === 'completed' ? (
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                ) : step.state === 'active' ? (
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-full"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                    aria-current="step"
                  >
                    <span className="text-white font-bold text-sm leading-none">
                      {stepNumber}
                    </span>
                  </div>
                ) : (
                  /* upcoming */
                  <div className="flex items-center justify-center w-9 h-9 rounded-full border-2 border-line">
                    <span className="text-muted text-sm leading-none">{stepNumber}</span>
                  </div>
                )}

                {/* Label */}
                <span
                  className={
                    step.state === 'active'
                      ? 'text-fg text-xs font-medium whitespace-nowrap'
                      : step.state === 'completed'
                      ? 'text-muted text-xs whitespace-nowrap'
                      : 'text-muted/60 text-xs whitespace-nowrap'
                  }
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line (not after last step) */}
              {!isLast && (
                <div
                  aria-hidden="true"
                  className="flex-1 h-0.5 mx-2 mb-5"
                  style={{
                    backgroundColor:
                      step.state === 'completed' ? 'var(--color-accent)' : 'var(--color-line)',
                  }}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
