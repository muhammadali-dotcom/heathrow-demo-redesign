"use client";

import { useReducer, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  User,
  Phone,
  DollarSign,
  Route as RouteIcon,
} from "lucide-react";
import { StepInfo } from "./StepIndicator";
import VehicleSelector from "./VehicleSelector";
import AddressAutocomplete from "./AddressAutocomplete";
import { fleet } from "@/data/fleet";
import { SUGGESTED_ADDRESSES } from "@/data/suggestedAddresses";
import MapView, { type MapMarker } from "@/components/map/MapView";
import { geocodeAddress, type GeocodeResult } from "@/lib/geocode";
import { fetchDrivingRoute } from "@/lib/route";

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

interface Coords {
  lat: number;
  lon: number;
}

interface WizardState {
  currentStep: WizardStep;
  fields: WizardFields;
  fareData: FareData | null;
  fareStatus: FareStatus;
  stepErrors: Partial<Record<keyof WizardFields, string>>;
  submitError: string | null;
  submitting: boolean;
  pickupCoords: Coords | null;
  dropoffCoords: Coords | null;
  route: [number, number][] | null;
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
  | { type: "SET_PICKUP_COORDS"; coords: Coords | null }
  | { type: "SET_DROPOFF_COORDS"; coords: Coords | null }
  | { type: "SET_ROUTE"; route: [number, number][] | null }
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
  pickupCoords: null,
  dropoffCoords: null,
  route: null,
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
        ...(action.field === "pickup" ? { pickupCoords: null, route: null } : {}),
        ...(action.field === "dropoff" ? { dropoffCoords: null, route: null } : {}),
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
    case "SET_PICKUP_COORDS":
      return { ...state, pickupCoords: action.coords, route: null };
    case "SET_DROPOFF_COORDS":
      return { ...state, dropoffCoords: action.coords, route: null };
    case "SET_ROUTE":
      return { ...state, route: action.route };
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

function useCountUp(target: number, durationMs = 700) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    if (reduceMotion) return;

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs, reduceMotion]);

  return value;
}

function FareResult({
  fare,
  distance,
  duration,
  vehicleName,
}: {
  fare: string;
  distance: string;
  duration: string;
  vehicleName: string | null;
}) {
  const currencyMatch = fare.match(/^(\D*)([\d,.]+)/);
  const currencySymbol = currencyMatch?.[1] ?? "";
  const numericFare = currencyMatch ? parseFloat(currencyMatch[2].replace(/,/g, "")) : 0;
  const animatedFare = useCountUp(numericFare);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={fare}
      initial={reduceMotion ? {} : { opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hero fare card */}
      <motion.div
        initial={reduceMotion ? {} : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-4 overflow-hidden rounded-2xl p-6 text-center"
        style={{
          background: "rgba(229,9,20,0.1)",
          border: "1px solid rgba(229,9,20,0.3)",
          boxShadow: "0 12px 40px rgba(229,9,20,0.18)",
        }}
      >
        <div
          className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full"
          style={{ background: "rgba(229,9,20,0.2)", border: "1px solid rgba(229,9,20,0.4)" }}
        >
          <DollarSign size={20} style={{ color: RED }} />
        </div>
        <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-[#A1A1AA]">
          Estimated Fare
        </p>
        <p
          className="text-4xl font-black text-white"
          style={{ letterSpacing: "-0.03em", textShadow: "0 0 24px rgba(229,9,20,0.45)" }}
        >
          {currencySymbol}
          {animatedFare.toFixed(2)}
        </p>
      </motion.div>

      {/* Distance & duration */}
      <div className="mb-5 grid grid-cols-2 gap-3">
        {[
          { label: "Distance", value: distance, Icon: RouteIcon },
          { label: "Duration", value: duration, Icon: Clock },
        ].map(({ label, value, Icon }, i) => (
          <motion.div
            key={label}
            initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 rounded-xl p-4"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Icon size={16} style={{ color: RED }} />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#A1A1AA]">
                {label}
              </p>
              <p className="text-sm font-bold text-white">{value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {vehicleName && (
        <div
          className="mb-5 flex items-center gap-3 rounded-xl px-4 py-3"
          style={{
            background: "rgba(229,9,20,0.08)",
            border: "1px solid rgba(229,9,20,0.2)",
          }}
        >
          <CheckCircle size={14} style={{ color: RED, flexShrink: 0 }} />
          <p className="text-sm text-white">
            Vehicle: <span className="font-semibold">{vehicleName}</span>
          </p>
        </div>
      )}

      <p className="text-center text-xs text-[#71717A]">
        * Estimates are approximate and may vary based on actual route.
      </p>
    </motion.div>
  );
}

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

  useEffect(() => {
    const query = state.fields.pickup.trim();
    if (query.length < 3) return;

    const timer = setTimeout(() => {
      geocodeAddress(query).then((result: GeocodeResult | null) => {
        dispatch({
          type: "SET_PICKUP_COORDS",
          coords: result ? { lat: result.lat, lon: result.lon } : null,
        });
      });
    }, 600);

    return () => clearTimeout(timer);
  }, [state.fields.pickup]);

  useEffect(() => {
    const query = state.fields.dropoff.trim();
    if (query.length < 3) return;

    const timer = setTimeout(() => {
      geocodeAddress(query).then((result: GeocodeResult | null) => {
        dispatch({
          type: "SET_DROPOFF_COORDS",
          coords: result ? { lat: result.lat, lon: result.lon } : null,
        });
      });
    }, 600);

    return () => clearTimeout(timer);
  }, [state.fields.dropoff]);

  useEffect(() => {
    if (!state.pickupCoords || !state.dropoffCoords) return;

    let cancelled = false;
    fetchDrivingRoute(state.pickupCoords, state.dropoffCoords).then((route) => {
      if (!cancelled) dispatch({ type: "SET_ROUTE", route });
    });

    return () => {
      cancelled = true;
    };
  }, [state.pickupCoords, state.dropoffCoords]);

  const bothLocationsResolved = Boolean(state.pickupCoords && state.dropoffCoords);

  const routeMarkers: MapMarker[] = [
    ...(state.pickupCoords
      ? [
          {
            position: [state.pickupCoords.lat, state.pickupCoords.lon] as [
              number,
              number,
            ],
            label: "Pickup",
            color: "pickup" as const,
          },
        ]
      : []),
    ...(state.dropoffCoords
      ? [
          {
            position: [state.dropoffCoords.lat, state.dropoffCoords.lon] as [
              number,
              number,
            ],
            label: "Destination",
            color: "dropoff" as const,
          },
        ]
      : []),
  ];

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
                    <AddressAutocomplete
                      id="bw-pickup"
                      value={state.fields.pickup}
                      onChange={(value) =>
                        dispatch({ type: "SET_FIELD", field: "pickup", value })
                      }
                      suggestions={SUGGESTED_ADDRESSES}
                      placeholder="e.g. Mill Hill Broadway Station"
                      icon={
                        <MapPin
                          size={14}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-10"
                          style={{ color: RED }}
                        />
                      }
                      inputClassName={inputClass}
                      inputStyle={state.stepErrors.pickup ? inputErrorStyle : inputStyle}
                      errorId={state.stepErrors.pickup ? "pickup-error" : undefined}
                    />
                    {state.stepErrors.pickup && (
                      <p id="pickup-error" className="mt-1.5 text-xs text-red-400">{state.stepErrors.pickup}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="bw-dropoff" className={labelClass}>
                      Destination
                    </label>
                    <AddressAutocomplete
                      id="bw-dropoff"
                      value={state.fields.dropoff}
                      onChange={(value) =>
                        dispatch({ type: "SET_FIELD", field: "dropoff", value })
                      }
                      suggestions={SUGGESTED_ADDRESSES}
                      placeholder="e.g. Heathrow Terminal 5"
                      icon={
                        <Navigation
                          size={14}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-10"
                          style={{ color: RED }}
                        />
                      }
                      inputClassName={inputClass}
                      inputStyle={state.stepErrors.dropoff ? inputErrorStyle : inputStyle}
                      errorId={state.stepErrors.dropoff ? "dropoff-error" : undefined}
                    />
                    {state.stepErrors.dropoff && (
                      <p id="dropoff-error" className="mt-1.5 text-xs text-red-400">{state.stepErrors.dropoff}</p>
                    )}
                  </div>
                </div>

                {bothLocationsResolved && (
                  <div className="mt-4">
                    <MapView markers={routeMarkers} route={state.route ?? undefined} height={220} />
                  </div>
                )}

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


                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="bw-name" className={labelClass}>Full Name</label>
                    <input
                      id="bw-name"
                      type="text"
                      autoComplete="off"
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
                      autoComplete="off"
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
                  <div className="flex flex-col items-center justify-center gap-5 py-16">
                    <div className="relative flex h-16 w-16 items-center justify-center">
                      <span
                        className="absolute inset-0 animate-ping rounded-full"
                        style={{ background: "rgba(229,9,20,0.25)" }}
                      />
                      <Loader2 size={32} className="relative animate-spin" style={{ color: RED }} />
                    </div>
                    <p className="text-sm font-medium text-[#A1A1AA]">Calculating your fare…</p>
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
                  <FareResult
                    fare={state.fareData.fare}
                    distance={state.fareData.distance}
                    duration={state.fareData.duration}
                    vehicleName={selectedVehicleName}
                  />
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

                {/* Fare + vehicle highlight tiles */}
                <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div
                    className="rounded-xl p-4 text-center"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">
                      Est. Fare
                    </p>
                    <p className="text-xl font-black text-white" style={{ letterSpacing: "-0.03em" }}>
                      {state.fareData?.fare ?? "—"}
                    </p>
                  </div>

                  {selectedVehicleName ? (
                    <div
                      className="flex items-center justify-center gap-3 rounded-xl px-4 py-3"
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
                  ) : (
                    <div
                      className="rounded-xl p-4 text-center"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">
                        Vehicle
                      </p>
                      <p className="text-xl font-black text-white" style={{ letterSpacing: "-0.03em" }}>
                        Any
                      </p>
                    </div>
                  )}
                </div>

                {/* Journey */}
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#71717A]">
                  Journey
                </p>
                <div
                  className="mb-5 grid grid-cols-1 gap-x-8 gap-y-3 rounded-xl p-5 sm:grid-cols-2"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {[
                    { label: "Pickup", value: state.fields.pickup, Icon: MapPin },
                    { label: "Drop-off", value: state.fields.dropoff, Icon: Navigation },
                    { label: "Date", value: state.fields.date, Icon: Calendar },
                    { label: "Time", value: state.fields.time, Icon: Clock },
                  ].map(({ label, value, Icon }) => (
                    <div key={label} className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-2 flex-shrink-0 text-sm text-[#A1A1AA]">
                        <Icon size={14} style={{ color: RED }} />
                        {label}
                      </span>
                      <span className="text-right text-sm font-medium text-white">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Passenger & contact details */}
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#71717A]">
                  Passenger &amp; contact details
                </p>
                <div
                  className="grid grid-cols-1 gap-x-8 gap-y-3 rounded-xl p-5 sm:grid-cols-2"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {[
                    { label: "Name", value: state.fields.name, Icon: User },
                    { label: "Phone", value: state.fields.phone, Icon: Phone },
                    { label: "Passengers", value: String(state.fields.passengers), Icon: Users },
                    {
                      label: "Luggage",
                      value: `${state.fields.luggage} bag${state.fields.luggage !== 1 ? "s" : ""}`,
                      Icon: Luggage,
                    },
                  ].map(({ label, value, Icon }) => (
                    <div key={label} className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-2 flex-shrink-0 text-sm text-[#A1A1AA]">
                        <Icon size={14} style={{ color: RED }} />
                        {label}
                      </span>
                      <span className="text-right text-sm font-medium text-white">{value}</span>
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
              <div className="text-left">
                {/* Header */}
                <div className="relative mb-6 pr-20">
                  <h3
                    ref={confirmRef}
                    className={`mb-2 text-3xl font-black text-white ${headingFocusClass}`}
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    Confirmed and ready
                  </h3>
                  <p className="text-sm leading-relaxed text-[#A1A1AA]">
                    Your ride has been booked. We&apos;ll be in touch shortly to confirm the details.
                  </p>
                  <div
                    className="absolute right-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: RED, boxShadow: "0 12px 30px rgba(229,9,20,0.4)" }}
                  >
                    <CheckCircle size={26} className="text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Left column: route + trip tiles */}
                  <div className="flex flex-col gap-4">
                    <div
                      className="rounded-xl p-5"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      <div className="relative pl-6">
                        <span
                          className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full"
                          style={{ background: RED }}
                        />
                        <span
                          className="absolute bottom-4 left-[4px] top-4 w-px"
                          style={{ background: "rgba(229,9,20,0.35)" }}
                        />
                        <div className="mb-5">
                          <p className="mb-1 text-xs text-[#A1A1AA]">Pickup</p>
                          <p className="text-base font-bold text-white">{state.fields.pickup}</p>
                        </div>
                        <span
                          className="absolute bottom-1.5 left-0 h-2.5 w-2.5 rounded-full"
                          style={{ background: RED }}
                        />
                        <div>
                          <p className="mb-1 text-xs text-[#A1A1AA]">Drop-off</p>
                          <p className="text-base font-bold text-white">{state.fields.dropoff}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "Date", value: state.fields.date },
                        { label: "Time", value: state.fields.time },
                        { label: "Passengers", value: String(state.fields.passengers) },
                        {
                          label: "Luggage",
                          value: `${state.fields.luggage} bag${state.fields.luggage !== 1 ? "s" : ""}`,
                        },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="rounded-xl p-4"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                          <p className="mb-1 text-xs text-[#A1A1AA]">{label}</p>
                          <p className="text-base font-bold text-white">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right column: customer + fare details */}
                  <div
                    className="flex flex-col rounded-xl p-5"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="flex-1">
                      {[
                        { label: "Customer", value: state.fields.name, block: true },
                        { label: "Phone", value: state.fields.phone },
                        ...(selectedVehicleName ? [{ label: "Vehicle", value: selectedVehicleName, red: true }] : []),
                        { label: "Fare", value: state.fareData?.fare ?? "—" },
                      ].map(({ label, value, block, red }, i, arr) => (
                        <div
                          key={label}
                          className={`${i < arr.length - 1 ? "mb-3 border-b border-white/10 pb-3" : ""} ${
                            block ? "" : "flex items-center justify-between gap-4"
                          }`}
                        >
                          <p className={`text-xs text-[#A1A1AA] ${block ? "mb-1" : ""}`}>{label}</p>
                          <p
                            className={`font-bold text-white ${block ? "text-lg" : "text-base"}`}
                            style={red ? { color: RED } : undefined}
                          >
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => dispatch({ type: "RESET" })}
                      className="mt-4 w-full rounded-full px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
                      style={{ background: RED, boxShadow: "0 8px 24px rgba(229,9,20,0.35)" }}
                    >
                      Book another ride
                    </button>
                  </div>
                </div>
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
