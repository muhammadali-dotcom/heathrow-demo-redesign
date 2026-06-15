"use client";

import { useReducer, useEffect, useRef } from "react";
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
} from "lucide-react";
import { StepInfo } from "./StepIndicator";
import VehicleSelector from "./VehicleSelector";
import { fleet } from "@/data/fleet";

type WizardStep = 1 | 2 | 3 | 4 | "confirmed";

interface FareData {
  fare: string;
  distance: string;
  duration: string;
}

interface WizardFields {
  pickup: string;
  dropoff: string;
  name: string;
  phone: string;
  passengers: number;
  luggage: number;
  date: string;
  time: string;
  vehicle: string;
}

type FareStatus = "idle" | "loading" | "ready" | "error";

interface WizardState {
  currentStep: WizardStep;
  fields: WizardFields;
  fareData: FareData | null;
  fareStatus: FareStatus;
  stepErrors: Partial<Record<keyof WizardFields, string>>;
  submitError: string | null;
  submitting: boolean;
}

type WizardAction =
  | { type: "SET_FIELD"; field: keyof WizardFields; value: string | number }
  | { type: "SET_STEP_ERRORS"; errors: WizardState["stepErrors"] }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_FARE_LOADING" }
  | { type: "SET_FARE_READY"; payload: FareData }
  | { type: "SET_FARE_ERROR" }
  | { type: "SET_SUBMITTING"; value: boolean }
  | { type: "SET_SUBMIT_ERROR"; message: string | null }
  | { type: "CONFIRM" }
  | { type: "RESET" };

export const initialState: WizardState = {
  currentStep: 1,
  fields: {
    pickup: "",
    dropoff: "",
    name: "",
    phone: "",
    passengers: 1,
    luggage: 0,
    date: "",
    time: "",
    vehicle: "",
  },
  fareData: null,
  fareStatus: "idle",
  stepErrors: {},
  submitError: null,
  submitting: false,
};

export function wizardReducer(
  state: WizardState,
  action: WizardAction,
): WizardState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        fields: { ...state.fields, [action.field]: action.value },
      };
    case "SET_STEP_ERRORS":
      return { ...state, stepErrors: action.errors };
    case "NEXT_STEP":
      if (typeof state.currentStep !== "number") return state;
      return {
        ...state,
        currentStep: ((state.currentStep as number) + 1) as WizardStep,
        stepErrors: {},
      };
    case "PREV_STEP":
      if (typeof state.currentStep !== "number") return state;
      return {
        ...state,
        currentStep: ((state.currentStep as number) - 1) as WizardStep,
        stepErrors: {},
      };
    case "SET_FARE_LOADING":
      return { ...state, fareStatus: "loading", fareData: null };
    case "SET_FARE_READY":
      return { ...state, fareStatus: "ready", fareData: action.payload };
    case "SET_FARE_ERROR":
      return { ...state, fareStatus: "error" };
    case "SET_SUBMITTING":
      return { ...state, submitting: action.value };
    case "SET_SUBMIT_ERROR":
      return { ...state, submitError: action.message };
    case "CONFIRM":
      return { ...state, currentStep: "confirmed" };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function validateStep1(
  fields: Pick<WizardFields, "pickup" | "dropoff">,
): Partial<Record<"pickup" | "dropoff", string>> {
  const errors: Partial<Record<"pickup" | "dropoff", string>> = {};
  if (!fields.pickup.trim()) errors.pickup = "Please enter a pickup location";
  if (!fields.dropoff.trim())
    errors.dropoff = "Please enter a drop-off location";
  return errors;
}

export function validateStep2(
  fields: Pick<WizardFields, "name" | "phone" | "date" | "time">,
): Partial<Record<"name" | "phone" | "date" | "time", string>> {
  const errors: Partial<Record<"name" | "phone" | "date" | "time", string>> =
    {};
  const today = new Date().toISOString().split("T")[0];

  if (!fields.name.trim()) errors.name = "Please enter your full name";
  else if (fields.name.length > 100)
    errors.name = "Name must be 100 characters or fewer";

  if (!fields.phone.trim() || !/^[+\d\s-]+$/.test(fields.phone)) {
    errors.phone = "Enter a valid phone number";
  }

  if (!fields.date) errors.date = "Please select a date";
  else if (fields.date < today)
    errors.date = "Date must be today or in the future";

  if (!fields.time) errors.time = "Please select a time";

  return errors;
}

function mockFareCalculation(dispatch: React.Dispatch<WizardAction>) {
  dispatch({ type: "SET_FARE_LOADING" });

  setTimeout(() => {
    try {
      const fare = "£" + (8 + Math.random() * 42).toFixed(2);
      const distance = (1.5 + Math.random() * 28.5).toFixed(1) + " miles";
      const duration = Math.floor(5 + Math.random() * 85) + " mins";

      dispatch({
        type: "SET_FARE_READY",
        payload: { fare, distance, duration },
      });
    } catch {
      dispatch({ type: "SET_FARE_ERROR" });
    }
  }, 800);
}

function mockBookingSubmit(dispatch: React.Dispatch<WizardAction>) {
  dispatch({ type: "SET_SUBMITTING", value: true });
  dispatch({ type: "SET_SUBMIT_ERROR", message: null });

  setTimeout(() => {
    if (Math.random() > 0.05) {
      dispatch({ type: "CONFIRM" });
    } else {
      dispatch({
        type: "SET_SUBMIT_ERROR",
        message: "Submission failed. Please try again.",
      });
    }

    dispatch({ type: "SET_SUBMITTING", value: false });
  }, 1500);
}

const RED = "#e50914";

const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const inputErrorStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(229,9,20,0.5)",
};

const labelClass =
  "mb-2 block text-xs font-bold uppercase tracking-widest text-[#A1A1AA]";
const inputClass =
  "w-full rounded-xl py-3 pl-9 pr-4 text-sm text-white placeholder-[#71717A] outline-none";
const inputNoIconClass =
  "w-full rounded-xl px-4 py-3 text-sm text-white placeholder-[#71717A] outline-none";
const headingFocusClass =
  "outline-none focus:outline-none focus-visible:outline-none";

export default function BookingWizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  const step1Ref = useRef<HTMLHeadingElement>(null);
  const step2Ref = useRef<HTMLHeadingElement>(null);
  const step3Ref = useRef<HTMLHeadingElement>(null);
  const step4Ref = useRef<HTMLHeadingElement>(null);
  const confirmRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const refMap: Record<string, React.RefObject<HTMLHeadingElement | null>> = {
      "1": step1Ref,
      "2": step2Ref,
      "3": step3Ref,
      "4": step4Ref,
      confirmed: confirmRef,
    };

    const ref = refMap[String(state.currentStep)];

    if (ref?.current) {
      ref.current.setAttribute("tabindex", "-1");
      ref.current.focus({ preventScroll: true });
    }
  }, [state.currentStep]);

  useEffect(() => {
    if (state.currentStep === 3 && state.fareStatus === "idle") {
      mockFareCalculation(dispatch);
    }
  }, [state.currentStep, state.fareStatus]);

  const stepLabels = ["Route", "Details", "Fare", "Confirm"];
  const numericStep =
    typeof state.currentStep === "number" ? state.currentStep : 5;

  const steps: StepInfo[] = stepLabels.map((label, i) => {
    const n = i + 1;
    if (n < numericStep) return { label, state: "completed" };
    if (n === numericStep) return { label, state: "active" };
    return { label, state: "upcoming" };
  });

  const today = new Date().toISOString().split("T")[0];

  const selectedVehicleName = state.fields.vehicle
    ? (fleet.find((v) => v.id === state.fields.vehicle)?.name ?? "")
    : "";

  function handleStep1Next() {
    const errors = validateStep1(state.fields);

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_STEP_ERRORS", errors });
    } else {
      dispatch({ type: "NEXT_STEP" });
    }
  }

  function handleStep2Next() {
    const errors = validateStep2(state.fields);

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_STEP_ERRORS", errors });
    } else {
      dispatch({ type: "NEXT_STEP" });
    }
  }

  function handleBack() {
    dispatch({ type: "PREV_STEP" });
  }

  function handleRetryFare() {
    mockFareCalculation(dispatch);
  }

  function handleSubmit() {
    mockBookingSubmit(dispatch);
  }

  function handleVehicleSelect(id: string) {
    dispatch({ type: "SET_FIELD", field: "vehicle", value: id });
  }

  const stepDescriptions = [
    "Where are we going?",
    "Journey details",
    "Your estimated fare",
    "Confirm booking",
  ];
  const stepDesc =
    state.currentStep !== "confirmed"
      ? stepDescriptions[numericStep - 1]
      : "Booking confirmed";

  return (
    <section
      className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8"
      style={{
        background: "#050505",
        minHeight: "calc(100vh - 80px)",
      }}
    >
      <div className="w-full max-w-4xl">

        {/* Title above frame */}
        <div className="mb-6 text-center">
          <h2
            className="text-3xl font-black text-white sm:text-4xl"
            style={{ letterSpacing: "-0.04em" }}
          >
            Book Your Ride
          </h2>
          <p className="mt-2 text-sm text-[#A1A1AA]">
            Fast, fixed-price quotes. No hidden fees.
          </p>
        </div>

        {/* Fixed frame */}
        <div
          className="flex flex-col rounded-2xl overflow-hidden"
          style={{
            background: "#111113",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
            minHeight: "520px",
          }}
        >
          {/* ── Top bar: step indicator + step label ── */}
          {state.currentStep !== "confirmed" && (
            <div
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Inline step pills */}
              <nav aria-label={`Step ${numericStep} of 4`}>
                <ol className="flex items-center gap-2">
                  {steps.map((step, i) => {
                    const n = i + 1;
                    const isCompleted = step.state === "completed";
                    const isActive = step.state === "active";
                    return (
                      <li key={n} className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold flex-shrink-0"
                            style={{
                              background: isCompleted || isActive ? RED : "rgba(255,255,255,0.08)",
                              color: isCompleted || isActive ? "#fff" : "rgba(255,255,255,0.3)",
                            }}
                          >
                            {isCompleted ? (
                              <CheckCircle size={13} strokeWidth={2.5} />
                            ) : (
                              n
                            )}
                          </div>
                          <span
                            className="hidden sm:block text-xs font-semibold uppercase tracking-widest"
                            style={{
                              color: isActive
                                ? "#fff"
                                : isCompleted
                                  ? "rgba(255,255,255,0.45)"
                                  : "rgba(255,255,255,0.2)",
                            }}
                          >
                            {step.label}
                          </span>
                        </div>
                        {i < steps.length - 1 && (
                          <div
                            className="hidden sm:block w-8 h-px"
                            style={{
                              background: isCompleted
                                ? RED
                                : "rgba(255,255,255,0.12)",
                            }}
                          />
                        )}
                      </li>
                    );
                  })}
                </ol>
              </nav>

              {/* Step label right side */}
              <span className="hidden md:block text-xs text-[#A1A1AA] flex-shrink-0 ml-4">
                Step {numericStep} of 4 — {stepDesc}
              </span>
            </div>
          )}

          {/* ── Scrollable content area ── */}
          <div className="flex-1 overflow-y-auto px-6 py-6">

            {/* STEP 1 */}
            {state.currentStep === 1 && (
              <div>
                <h3
                  ref={step1Ref}
                  className={`mb-1 text-lg font-black text-white ${headingFocusClass}`}
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Where are you going?
                </h3>
                <p className="mb-6 text-sm text-[#A1A1AA]">
                  Enter your pickup and drop-off to see a price.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bw-pickup" className={labelClass}>
                      Pickup
                    </label>
                    <div className="relative">
                      <MapPin
                        size={14}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: RED }}
                      />
                      <input
                        id="bw-pickup"
                        type="text"
                        required
                        value={state.fields.pickup}
                        onChange={(e) =>
                          dispatch({ type: "SET_FIELD", field: "pickup", value: e.target.value })
                        }
                        placeholder="e.g. Mill Hill Broadway Station"
                        className={inputClass}
                        style={state.stepErrors.pickup ? inputErrorStyle : inputStyle}
                      />
                    </div>
                    {state.stepErrors.pickup && (
                      <p className="mt-1.5 text-xs text-red-400">{state.stepErrors.pickup}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bw-dropoff" className={labelClass}>
                      Destination
                    </label>
                    <div className="relative">
                      <Navigation
                        size={14}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: RED }}
                      />
                      <input
                        id="bw-dropoff"
                        type="text"
                        required
                        value={state.fields.dropoff}
                        onChange={(e) =>
                          dispatch({ type: "SET_FIELD", field: "dropoff", value: e.target.value })
                        }
                        placeholder="e.g. Heathrow Terminal 5"
                        className={inputClass}
                        style={state.stepErrors.dropoff ? inputErrorStyle : inputStyle}
                      />
                    </div>
                    {state.stepErrors.dropoff && (
                      <p className="mt-1.5 text-xs text-red-400">{state.stepErrors.dropoff}</p>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-xs text-[#71717A]">
                  Popular:{" "}
                  <span style={{ color: RED }}>NW7 → Heathrow T5</span>
                  {" · "}
                  <span style={{ color: RED }}>N3 → Luton</span>
                  {" · "}
                  <span style={{ color: RED }}>NW4 → Gatwick</span>
                </p>
              </div>
            )}

            {/* STEP 2 */}
            {state.currentStep === 2 && (
              <div>
                <h3
                  ref={step2Ref}
                  className={`mb-1 text-lg font-black text-white ${headingFocusClass}`}
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Your journey details
                </h3>
                <p className="mb-6 text-sm text-[#A1A1AA]">
                  Tell us about your trip so we can prepare the right vehicle.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="bw-name" className={labelClass}>Full Name</label>
                    <input
                      id="bw-name"
                      type="text"
                      maxLength={100}
                      value={state.fields.name}
                      onChange={(e) =>
                        dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })
                      }
                      placeholder="Your full name"
                      className={inputNoIconClass}
                      style={state.stepErrors.name ? inputErrorStyle : inputStyle}
                    />
                    {state.stepErrors.name && (
                      <p className="mt-1.5 text-xs text-red-400">{state.stepErrors.name}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="bw-phone" className={labelClass}>Phone Number</label>
                    <input
                      id="bw-phone"
                      type="tel"
                      value={state.fields.phone}
                      onChange={(e) =>
                        dispatch({ type: "SET_FIELD", field: "phone", value: e.target.value })
                      }
                      placeholder="07700 000000"
                      className={inputNoIconClass}
                      style={state.stepErrors.phone ? inputErrorStyle : inputStyle}
                    />
                    {state.stepErrors.phone && (
                      <p className="mt-1.5 text-xs text-red-400">{state.stepErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bw-date" className={labelClass}>Date</label>
                    <div className="relative">
                      <Calendar size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: RED }} />
                      <input
                        id="bw-date"
                        type="date"
                        min={today}
                        value={state.fields.date}
                        onChange={(e) =>
                          dispatch({ type: "SET_FIELD", field: "date", value: e.target.value })
                        }
                        className={inputClass}
                        style={{ ...(state.stepErrors.date ? inputErrorStyle : inputStyle), colorScheme: 'white' }}
                      />
                    </div>
                    {state.stepErrors.date && (
                      <p className="mt-1.5 text-xs text-red-400">{state.stepErrors.date}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bw-time" className={labelClass}>Time</label>
                    <div className="relative">
                      <Clock size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: RED }} />
                      <input
                        id="bw-time"
                        type="time"
                        value={state.fields.time}
                        onChange={(e) =>
                          dispatch({ type: "SET_FIELD", field: "time", value: e.target.value })
                        }
                        className={inputClass}
                        style={{ ...(state.stepErrors.time ? inputErrorStyle : inputStyle), colorScheme: 'white' }}
                      />
                    </div>
                    {state.stepErrors.time && (
                      <p className="mt-1.5 text-xs text-red-400">{state.stepErrors.time}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bw-passengers" className={labelClass}>Passengers</label>
                    <div className="relative">
                      <Users size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: RED }} />
                      <select
                        id="bw-passengers"
                        value={state.fields.passengers}
                        onChange={(e) =>
                          dispatch({ type: "SET_FIELD", field: "passengers", value: parseInt(e.target.value) })
                        }
                        className="w-full appearance-none rounded-xl py-3 pl-9 pr-4 text-sm text-white outline-none"
                        style={inputStyle}
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n} style={{ background: "#1a1a1a" }}>
                            {n} Passenger{n > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bw-luggage" className={labelClass}>Luggage</label>
                    <div className="relative">
                      <Luggage size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" style={{ color: RED }} />
                      <select
                        id="bw-luggage"
                        value={state.fields.luggage}
                        onChange={(e) =>
                          dispatch({ type: "SET_FIELD", field: "luggage", value: parseInt(e.target.value) })
                        }
                        className="w-full appearance-none rounded-xl py-3 pl-9 pr-4 text-sm text-white outline-none"
                        style={inputStyle}
                      >
                        {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n} style={{ background: "#1a1a1a" }}>
                            {n} {n === 1 ? "Bag" : "Bags"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <VehicleSelector
                    vehicles={fleet}
                    selectedId={state.fields.vehicle}
                    passengers={state.fields.passengers}
                    onSelect={handleVehicleSelect}
                  />
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {state.currentStep === 3 && (
              <div>
                <h3
                  ref={step3Ref}
                  className={`mb-1 text-lg font-black text-white ${headingFocusClass}`}
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Your estimated fare
                </h3>
                <p className="mb-6 text-sm text-[#A1A1AA]">
                  {state.fields.pickup} → {state.fields.dropoff}
                </p>

                {state.fareStatus === "loading" && (
                  <div className="flex flex-col items-center justify-center gap-4 py-16">
                    <Loader2 size={36} className="animate-spin" style={{ color: RED }} />
                    <p className="text-sm text-[#A1A1AA]">Calculating your fare…</p>
                  </div>
                )}

                {state.fareStatus === "error" && (
                  <div className="py-12 text-center">
                    <p className="mb-4 text-[#A1A1AA]">Unable to calculate fare. Please try again.</p>
                    <button
                      onClick={handleRetryFare}
                      className="rounded-xl px-6 py-3 text-sm font-semibold text-white"
                      style={{ background: RED }}
                    >
                      Retry
                    </button>
                  </div>
                )}

                {state.fareStatus === "ready" && state.fareData && (
                  <div>
                    <div className="mb-5 grid grid-cols-3 gap-4">
                      {[
                        { label: "Estimated Fare", value: state.fareData.fare },
                        { label: "Distance", value: state.fareData.distance },
                        { label: "Duration", value: state.fareData.duration },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="rounded-xl p-4 text-center"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">
                            {label}
                          </p>
                          <p className="text-xl font-black text-white" style={{ letterSpacing: "-0.03em" }}>
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {selectedVehicleName && (
                      <div
                        className="mb-5 flex items-center gap-3 rounded-xl px-4 py-3"
                        style={{
                          background: "rgba(229,9,20,0.08)",
                          border: "1px solid rgba(229,9,20,0.2)",
                        }}
                      >
                        <CheckCircle size={14} style={{ color: RED, flexShrink: 0 }} />
                        <p className="text-sm text-white">
                          Vehicle: <span className="font-semibold">{selectedVehicleName}</span>
                        </p>
                      </div>
                    )}

                    <p className="text-center text-xs text-[#71717A]">
                      * Estimates are approximate and may vary based on actual route.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4 */}
            {state.currentStep === 4 && (
              <div>
                <h3
                  ref={step4Ref}
                  className={`mb-1 text-lg font-black text-white ${headingFocusClass}`}
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Confirm your booking
                </h3>
                <p className="mb-5 text-sm text-[#A1A1AA]">
                  Review your journey details below.
                </p>

                <div
                  className="grid grid-cols-1 gap-x-8 gap-y-3 rounded-xl p-5 sm:grid-cols-2"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {[
                    { label: "Pickup", value: state.fields.pickup },
                    { label: "Drop-off", value: state.fields.dropoff },
                    { label: "Name", value: state.fields.name },
                    { label: "Phone", value: state.fields.phone },
                    { label: "Date", value: state.fields.date },
                    { label: "Time", value: state.fields.time },
                    { label: "Passengers", value: String(state.fields.passengers) },
                    {
                      label: "Luggage",
                      value: `${state.fields.luggage} bag${state.fields.luggage !== 1 ? "s" : ""}`,
                    },
                    ...(selectedVehicleName ? [{ label: "Vehicle", value: selectedVehicleName }] : []),
                    { label: "Est. Fare", value: state.fareData?.fare ?? "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-4">
                      <span className="flex-shrink-0 text-sm text-[#A1A1AA]">{label}</span>
                      <span
                        className="text-right text-sm font-medium"
                        style={{ color: label === "Vehicle" ? RED : "white" }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                {state.submitError && (
                  <p className="mt-3 text-center text-sm text-red-400">{state.submitError}</p>
                )}
              </div>
            )}

            {/* CONFIRMED */}
            {state.currentStep === "confirmed" && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                  style={{ background: RED, boxShadow: "0 16px 40px rgba(229,9,20,0.35)" }}
                >
                  <CheckCircle size={36} className="text-white" />
                </div>

                <h3
                  ref={confirmRef}
                  className={`mb-3 text-3xl font-black text-white ${headingFocusClass}`}
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Booking Confirmed!
                </h3>

                <p className="mx-auto mb-8 max-w-sm leading-relaxed text-[#A1A1AA]">
                  Your ride has been booked. We&apos;ll be in touch shortly to confirm the details.
                </p>

                <div
                  className="mb-6 w-full grid grid-cols-1 gap-x-8 gap-y-3 rounded-xl p-5 text-left sm:grid-cols-2"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {[
                    { label: "Pickup", value: state.fields.pickup },
                    { label: "Drop-off", value: state.fields.dropoff },
                    { label: "Name", value: state.fields.name },
                    { label: "Phone", value: state.fields.phone },
                    { label: "Date", value: state.fields.date },
                    { label: "Time", value: state.fields.time },
                    { label: "Passengers", value: String(state.fields.passengers) },
                    {
                      label: "Luggage",
                      value: `${state.fields.luggage} bag${state.fields.luggage !== 1 ? "s" : ""}`,
                    },
                    ...(selectedVehicleName ? [{ label: "Vehicle", value: selectedVehicleName }] : []),
                    { label: "Est. Fare", value: state.fareData?.fare ?? "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start justify-between gap-4">
                      <span className="flex-shrink-0 text-sm text-[#A1A1AA]">{label}</span>
                      <span
                        className="text-right text-sm font-medium"
                        style={{ color: label === "Vehicle" ? RED : "white" }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => dispatch({ type: "RESET" })}
                  className="text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: RED }}
                >
                  Book another ride →
                </button>
              </div>
            )}
          </div>

          {/* ── Bottom action bar — pinned inside frame ── */}
          {state.currentStep !== "confirmed" && (
            <div
              className="flex items-center justify-between gap-3 px-6 py-4 flex-shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              {/* Back button (hidden on step 1) */}
              {typeof state.currentStep === "number" && state.currentStep > 1 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <ArrowLeft size={14} /> Back
                </button>
              ) : (
                <div />
              )}

              {/* Continue / Submit button */}
              {state.currentStep === 1 && (
                <button
                  onClick={handleStep1Next}
                  className="flex items-center gap-2 rounded-xl px-7 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:brightness-110"
                  style={{
                    background: RED,
                    boxShadow: "0 6px 20px rgba(229,9,20,0.35)",
                  }}
                >
                  Continue →
                </button>
              )}

              {state.currentStep === 2 && (
                <button
                  onClick={handleStep2Next}
                  className="flex items-center gap-2 rounded-xl px-7 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:brightness-110"
                  style={{
                    background: RED,
                    boxShadow: "0 6px 20px rgba(229,9,20,0.35)",
                  }}
                >
                  Continue →
                </button>
              )}

              {state.currentStep === 3 && state.fareStatus === "ready" && (
                <button
                  onClick={() => dispatch({ type: "NEXT_STEP" })}
                  className="flex items-center gap-2 rounded-xl px-7 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:brightness-110"
                  style={{
                    background: RED,
                    boxShadow: "0 6px 20px rgba(229,9,20,0.35)",
                  }}
                >
                  Continue to Book →
                </button>
              )}

              {state.currentStep === 3 && state.fareStatus !== "ready" && (
                <div />
              )}

              {state.currentStep === 4 && (
                <button
                  onClick={handleSubmit}
                  disabled={state.submitting}
                  className="flex items-center gap-2 rounded-xl px-7 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    background: RED,
                    boxShadow: "0 6px 20px rgba(229,9,20,0.35)",
                  }}
                >
                  {state.submitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Processing…
                    </>
                  ) : (
                    "Book a Ride →"
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
