import React, { useState, useEffect, useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ChevronLeft, X, Check } from "lucide-react";
import { SERVICE_CONFIG } from "@/config/services";
import {
  format,
  isSameDay,
  isBefore,
  startOfDay,
  addMonths,
  subMonths,
  type Locale,
} from "date-fns";
import { de as deLocale, enUS as enLocale } from "date-fns/locale";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations, t } from "@/i18n/translations";

/* ─── Constants ─────────────────────────────────────────────────────────── */

const SEAT_OPTIONS = ["2", "4", "5", "7", "8+"];

function getAllowedHours(dateStr: string): string[] {
  if (!dateStr) return [];
  const date = new Date(dateStr + "T00:00:00");
  const dow = date.getDay();
  if (dow === 0) return [];
  if (dow === 6) return ["15", "16", "17"].map((h) => h.padStart(2, "0"));
  return Array.from({ length: 8 }, (_, i) => (10 + i).toString().padStart(2, "0"));
}
const MINUTES = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];
const DOW_LABELS_DE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const DOW_LABELS_EN = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const TOTAL_STEPS = 8;

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface BookingData {
  name: string;
  carBrand: string;
  carModel: string;
  bodyType: string;
  seats: string;
  offer: string | null;
  lastAppliedOffer: string | null | undefined;
  services: string[];
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:MM"
}

const EMPTY_DATA: BookingData = {
  name: "",
  carBrand: "",
  carModel: "",
  bodyType: "",
  seats: "",
  offer: null,
  lastAppliedOffer: undefined,
  services: [],
  date: "",
  time: "",
};

/* ─── Offer pre-selection mapping ────────────────────────────────────────── */

const OFFER_SERVICE_MAP: Record<string, string[]> = {
  "Interior & Exterior Cleaning Package": [
    "Car Washing",
    "Interior Cleaning",
    "Wheel Cleaning",
    "Tire Service",
  ],
  "Premium 3-Layer Car Polishing": ["Scratch Removal", "Waxing & Polishing"],
};

/* ─── Calendar sub-component ─────────────────────────────────────────────── */

function CalendarPicker({
  value,
  onChange,
  dowLabels,
  dateLocale,
}: {
  value: string;
  onChange: (v: string) => void;
  dowLabels: string[];
  dateLocale: Locale;
}) {
  const today = startOfDay(new Date());
  const selectedDate = value ? startOfDay(new Date(value + "T00:00:00")) : null;

  const [viewDate, setViewDate] = useState<Date>(() => selectedDate ?? today);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array(firstDow).fill(null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(year, month, i + 1),
    ),
  ];

  return (
    <div className="w-full" data-testid="calendar-picker">
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => setViewDate((d) => subMonths(d, 1))}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <span className="text-sm font-bold uppercase tracking-widest text-white">
          {format(viewDate, "MMMM yyyy", { locale: dateLocale })}
        </span>
        <button
          type="button"
          onClick={() => setViewDate((d) => addMonths(d, 1))}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {dowLabels.map((d) => (
          <div
            key={d}
            className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-600 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />;

          const isPast = isBefore(date, today);
          const isSunday = date.getDay() === 0;
          const isDisabled = isPast || isSunday;
          const isSelected = selectedDate
            ? isSameDay(date, selectedDate)
            : false;
          const isTodayDate = isSameDay(date, today);
          const dateStr = format(date, "yyyy-MM-dd");

          return (
            <button
              key={dateStr}
              type="button"
              disabled={isDisabled}
              onClick={() => !isDisabled && onChange(dateStr)}
              className={`
                mx-auto w-8 h-8 flex items-center justify-center text-sm font-bold
                transition-all duration-150 select-none
                ${isDisabled ? "text-gray-700 cursor-not-allowed" : "cursor-pointer"}
                ${
                  isSelected
                    ? "bg-primary text-black"
                    : isTodayDate
                      ? "border border-primary/50 text-primary"
                      : !isDisabled
                        ? "text-gray-200 hover:bg-white/10 hover:text-white"
                        : ""
                }
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Time sub-component ─────────────────────────────────────────────────── */

function TimePicker({
  value,
  onChange,
  hourLabel,
  minuteLabel,
  selectedDate,
}: {
  value: string;
  onChange: (v: string) => void;
  hourLabel: string;
  minuteLabel: string;
  selectedDate: string;
}) {
  const parts = value ? value.split(":") : ["", ""];
  const hour = parts[0] ?? "";
  const minute = parts[1] ?? "";

  const allowedHours = getAllowedHours(selectedDate);

  const setHour = (h: string) => onChange(`${h}:${minute || "00"}`);
  const setMinute = (m: string) => onChange(`${hour || "10"}:${m}`);

  const triggerClass =
    "bg-[#111] border-white/15 text-white h-11 text-base font-bold tracking-wider focus:ring-primary focus:ring-offset-[#0d0d0d]";
  const contentClass = "bg-[#111] border-white/10 text-white max-h-56";
  const itemClass =
    "font-bold focus:bg-primary focus:text-black cursor-pointer";

  return (
    <div className="flex gap-3 items-center" data-testid="time-picker">
      <div className="flex-1 flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
          {hourLabel}
        </label>
        <Select value={allowedHours.includes(hour) ? hour : ""} onValueChange={setHour} disabled={allowedHours.length === 0}>
          <SelectTrigger className={triggerClass} data-testid="time-hour">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent className={contentClass}>
            {allowedHours.map((h) => (
              <SelectItem key={h} value={h} className={itemClass}>
                {h}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <span className="text-2xl font-bold text-gray-600 mt-5">:</span>

      <div className="flex-1 flex flex-col gap-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
          {minuteLabel}
        </label>
        <Select value={minute} onValueChange={setMinute}>
          <SelectTrigger className={triggerClass} data-testid="time-minute">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent className={contentClass}>
            {MINUTES.map((m) => (
              <SelectItem key={m} value={m} className={itemClass}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

/* ─── Service card ───────────────────────────────────────────────────────── */

interface ServiceCardProps {
  label: string;
  enKey: string;
  selected: boolean;
  cfg: import("@/config/services").ServiceConfig | undefined;
  onClick: () => void;
}

function ServiceCard({ label, enKey, selected, cfg, onClick }: ServiceCardProps) {
  const [imgError, setImgError] = React.useState(false);
  const Icon = cfg?.icon;
  const testId = `service-${enKey.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <button
      type="button"
      onClick={onClick}
      data-testid={testId}
      className={`group relative overflow-hidden text-left transition-all duration-300 ${
        selected
          ? "ring-2 ring-primary ring-offset-2 ring-offset-black"
          : "ring-1 ring-white/10 hover:ring-primary/60"
      }`}
      style={{ paddingBottom: "75%" }}
    >
      {/* Full-bleed image */}
      {cfg && !imgError ? (
        <img
          src={cfg.imagePath}
          alt={label}
          onError={() => setImgError(true)}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
          {Icon && <Icon size={32} className="text-zinc-600" />}
        </div>
      )}

      {/* Dark scrim — stronger when selected */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          selected
            ? "bg-black/30"
            : "bg-black/20 group-hover:bg-black/10"
        }`}
      />

      {/* Bottom gradient + label */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-8 pb-2.5 px-2.5">
        <span className={`block text-[10px] font-bold uppercase tracking-widest leading-tight transition-colors duration-200 ${selected ? "text-primary" : "text-white"}`}>
          {label}
        </span>
      </div>

      {/* Selected check badge */}
      {selected && (
        <div className="absolute top-2 right-2 bg-primary rounded-full p-1 shadow-lg">
          <Check size={9} className="text-black" strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

/* ─── Main modal ─────────────────────────────────────────────────────────── */

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  /** When provided the modal pre-selects this offer (English key) on the offer
   *  step and pre-populates the matching services when the user reaches step 6.
   *  The flow always starts from step 1. */
  initialOffer?: string | null;
  /** When provided the modal pre-selects this service (English key) in the
   *  services step. The user can add or remove services freely after that. */
  initialService?: string | null;
}

export default function BookingModal({ open, onClose, initialOffer, initialService }: BookingModalProps) {
  const getInitialState = () => {
    const services = initialService ? [initialService] : [];
    if (initialOffer && OFFER_SERVICE_MAP[initialOffer]) {
      return {
        data: {
          ...EMPTY_DATA,
          offer: initialOffer,
          services,
        },
        step: 1,
      };
    }
    return {
      data: {
        ...EMPTY_DATA,
        services,
        // Mark offer as already-applied (null) so advancing past step 5
        // with no offer doesn't clear any pre-selected services.
        lastAppliedOffer: services.length > 0 ? null : undefined,
      },
      step: 1,
    };
  };

  const [step, setStep] = useState(() => getInitialState().step);
  const [data, setData] = useState<BookingData>(() => getInitialState().data);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { lang } = useLanguage();

  const bk = translations.booking;
  const STEP_TITLES = t(bk.stepTitles, lang);
  const SERVICES = t(bk.services, lang);
  const EXTRA_SERVICES = t(bk.extraServices, lang);
  const BODY_TYPES = t(bk.bodyTypes, lang);
  const SEAT_OPTIONS = ["2", "4", "5", "7", "8+"];
  const dateLocale = lang === "de" ? deLocale : enLocale;

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (open) {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
      const { data: initialData, step: initialStep } = getInitialState();
      setStep(initialStep);
      setData(initialData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleNextStepRef = React.useRef<() => void>(() => {});

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      if (step < TOTAL_STEPS && isNextEnabled()) {
        e.preventDefault();
        handleNextStepRef.current();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, step, data]);

  const progress = ((step - 1) / (TOTAL_STEPS - 1)) * 100;

  const handleClose = () => {
    onClose();
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      const { data: initialData, step: initialStep } = getInitialState();
      setStep(initialStep);
      setData(initialData);
    }, 300);
  };

  const isNextEnabled = () => {
    switch (step) {
      case 1:
        return data.name.trim() !== "";
      case 2:
        return data.carBrand.trim() !== "" && data.carModel.trim() !== "";
      case 3:
        return data.bodyType !== "";
      case 4:
        return data.seats !== "";
      case 5:
        return true;
      case 6:
        return data.services.length > 0;
      case 7: {
        if (!data.date || !data.time || data.time.startsWith(":")) return false;
        const [hourStr] = data.time.split(":");
        const allowed = getAllowedHours(data.date);
        return allowed.includes(hourStr);
      }
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (!isNextEnabled()) return;
    if (step === 5 && data.offer !== data.lastAppliedOffer) {
      const services =
        data.offer && OFFER_SERVICE_MAP[data.offer]
          ? OFFER_SERVICE_MAP[data.offer]
          : [];
      setData((prev) => ({ ...prev, services, lastAppliedOffer: prev.offer }));
    }
    setStep((s) => s + 1);
  };

  handleNextStepRef.current = handleNextStep;

  const handleSendWhatsApp = () => {
    const displayDate = data.date
      ? format(new Date(data.date + "T00:00:00"), "MMMM d, yyyy", { locale: dateLocale })
      : data.date;

    const localizedServices = data.services.map((enKey) => {
      const idx = translations.booking.services.en.indexOf(enKey);
      if (idx >= 0) return t(bk.services, lang)[idx];
      const extraIdx = translations.booking.extraServices.en.indexOf(enKey);
      if (extraIdx >= 0) return t(bk.extraServices, lang)[extraIdx];
      return enKey;
    });

    const bodyTypeIdx = translations.booking.bodyTypes.en.indexOf(data.bodyType);
    const localizedBodyType =
      bodyTypeIdx >= 0 ? t(bk.bodyTypes, lang)[bodyTypeIdx] : data.bodyType;

    const localizedOffer = (() => {
      if (!data.offer) return null;
      const offerCards = [
        translations.offers.card1.title,
        translations.offers.card2.title,
      ];
      const card = offerCards.find((c) => c.en === data.offer);
      return card ? t(card, lang) : data.offer;
    })();

    const messageData = {
      name: data.name,
      carBrand: data.carBrand,
      carModel: data.carModel,
      bodyType: localizedBodyType,
      seats: data.seats,
      offer: localizedOffer,
      services: localizedServices,
      date: displayDate,
      time: data.time,
    };

    const message = bk.whatsappMessage[lang](messageData);
    const encodedMsg = encodeURIComponent(message);
    window.open(
      `https://wa.me/491792170895?text=${encodedMsg}`,
      "_blank",
      "noopener,noreferrer",
    );
    handleClose();
  };

  const inputClass =
    "w-full bg-[#111] border border-white/10 text-white font-semibold px-4 py-3 focus:outline-none focus:border-primary transition-colors placeholder:text-gray-600 text-lg";

  const summaryLabels = bk.summaryLabels;

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(v) => {
        if (!v) handleClose();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-[#0d0d0d] border border-white/10 text-white shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] flex flex-col max-h-[90vh]"
          data-testid="booking-modal"
        >
          <DialogPrimitive.Close
            className="absolute right-4 top-4 z-50 text-gray-400 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#0d0d0d]"
            data-testid="booking-modal-close"
            onClick={handleClose}
          >
            <X size={20} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>

          {/* Header */}
          <div className="px-8 pt-8 pb-4 border-b border-white/5 shrink-0">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-2">
              {t(bk.stepOf, lang)} {step} {t(bk.of, lang)} {TOTAL_STEPS}
            </div>
            <DialogPrimitive.Title className="text-2xl font-bold uppercase tracking-wide text-white">
              {STEP_TITLES[step - 1]}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              {t(bk.stepOf, lang)} {step} {t(bk.of, lang)} {TOTAL_STEPS}:{" "}
              {STEP_TITLES[step - 1]}
            </DialogPrimitive.Description>
            <div className="mt-4">
              <Progress
                value={progress}
                className="h-[3px] bg-white/5"
                data-testid="booking-progress"
              />
            </div>
          </div>

          {/* Scrollable step content */}
          <div className="px-8 py-8 overflow-y-auto flex-1">
            {/* Step 1: Name */}
            {step === 1 && (
              <div className="flex flex-col space-y-3">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                  {t(bk.fullName, lang)}
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder={t(bk.placeholderName, lang)}
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  data-testid="input-name"
                  autoFocus
                />
              </div>
            )}

            {/* Step 2: Car brand & model */}
            {step === 2 && (
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                    {t(bk.carBrand, lang)}
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder={t(bk.placeholderBrand, lang)}
                    value={data.carBrand}
                    onChange={(e) =>
                      setData({ ...data, carBrand: e.target.value })
                    }
                    data-testid="input-car-brand"
                    autoFocus
                  />
                </div>
                <div className="flex flex-col space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                    {t(bk.carModel, lang)}
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder={t(bk.placeholderModel, lang)}
                    value={data.carModel}
                    onChange={(e) =>
                      setData({ ...data, carModel: e.target.value })
                    }
                    data-testid="input-car-model"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Body type */}
            {step === 3 && (
              <div className="flex flex-col space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                  {t(bk.bodyType, lang)}
                </label>
                <div
                  className="grid grid-cols-2 gap-3"
                  data-testid="body-type-options"
                >
                  {BODY_TYPES.map((type, idx) => {
                    const enKey = translations.booking.bodyTypes.en[idx];
                    return (
                      <button
                        key={enKey}
                        type="button"
                        onClick={() => setData({ ...data, bodyType: enKey })}
                        data-testid={`body-type-${enKey.toLowerCase()}`}
                        className={`py-3 px-4 border text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                          data.bodyType === enKey
                            ? "bg-primary text-black border-primary"
                            : "bg-transparent text-gray-300 border-white/10 hover:border-primary/50 hover:text-white"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Seats */}
            {step === 4 && (
              <div className="flex flex-col space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                  {t(bk.seats, lang)}
                </label>
                <div
                  className="flex flex-wrap gap-3"
                  data-testid="seats-options"
                >
                  {SEAT_OPTIONS.map((seat) => (
                    <button
                      key={seat}
                      type="button"
                      onClick={() => setData({ ...data, seats: seat })}
                      data-testid={`seat-${seat}`}
                      className={`py-3 px-6 border text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                        data.seats === seat
                          ? "bg-primary text-black border-primary"
                          : "bg-transparent text-gray-300 border-white/10 hover:border-primary/50 hover:text-white"
                      }`}
                    >
                      {seat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Offer selection */}
            {step === 5 && (() => {
              const offerCards = [
                translations.offers.card1.title,
                translations.offers.card2.title,
              ];
              const prices = t(bk.offerPrices, lang);
              return (
                <div className="flex flex-col space-y-3" data-testid="offer-options">
                  {offerCards.map((cardTitle, idx) => {
                    const enLabel = cardTitle.en;
                    const displayLabel = t(cardTitle, lang);
                    const selected = data.offer === enLabel;
                    return (
                      <button
                        key={enLabel}
                        type="button"
                        data-testid={`offer-${idx + 1}`}
                        onClick={() =>
                          setData((prev) => ({
                            ...prev,
                            offer: prev.offer === enLabel ? null : enLabel,
                          }))
                        }
                        className={`relative flex items-center justify-between px-5 py-4 border text-left transition-all duration-200 ${
                          selected
                            ? "bg-primary/10 border-primary"
                            : "bg-transparent border-white/10 hover:border-primary/50"
                        }`}
                      >
                        <span
                          className={`font-bold text-sm uppercase tracking-wider ${
                            selected ? "text-primary" : "text-gray-200"
                          }`}
                        >
                          {displayLabel}
                        </span>
                        <span
                          className={`ml-4 shrink-0 text-xs font-bold px-2 py-1 ${
                            selected
                              ? "bg-primary text-black"
                              : "bg-white/10 text-gray-400"
                          }`}
                        >
                          {prices[idx]}
                        </span>
                        {selected && (
                          <Check
                            size={14}
                            className="absolute top-2 right-2 text-primary"
                          />
                        )}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    data-testid="offer-none"
                    onClick={() =>
                      setData((prev) => ({ ...prev, offer: null }))
                    }
                    className={`flex items-center justify-between px-5 py-4 border text-left transition-all duration-200 ${
                      data.offer === null
                        ? "border-primary/50 bg-white/5"
                        : "border-white/5 hover:border-white/20"
                    }`}
                  >
                    <span
                      className={`font-bold text-sm uppercase tracking-wider ${
                        data.offer === null ? "text-gray-200" : "text-gray-500"
                      }`}
                    >
                      {t(bk.offerNoOffer, lang)}
                    </span>
                    {data.offer === null && (
                      <Check size={14} className="shrink-0 ml-4 text-gray-400" />
                    )}
                  </button>
                </div>
              );
            })()}

            {/* Step 6: Services */}
            {step === 6 && (
              <div className="flex flex-col space-y-4">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                  {t(bk.selectServices, lang)}
                </label>
                <div
                  className="grid grid-cols-2 gap-3"
                  data-testid="service-options"
                >
                  {SERVICES.map((svc, idx) => {
                    const enKey = translations.booking.services.en[idx];
                    const selected = data.services.includes(enKey);
                    const cfg = SERVICE_CONFIG[enKey];
                    const toggle = () => {
                      const updated = selected
                        ? data.services.filter((s) => s !== enKey)
                        : [...data.services, enKey];
                      setData({ ...data, services: updated });
                    };
                    return (
                      <ServiceCard
                        key={enKey}
                        label={svc}
                        enKey={enKey}
                        selected={selected}
                        cfg={cfg}
                        onClick={toggle}
                      />
                    );
                  })}
                </div>

                {/* Extra Services divider */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {t(bk.extraServices.label, lang)}
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Extra Services grid */}
                <div
                  className="grid grid-cols-2 gap-3"
                  data-testid="extra-service-options"
                >
                  {EXTRA_SERVICES.map((svc, idx) => {
                    const enKey = translations.booking.extraServices.en[idx];
                    const selected = data.services.includes(enKey);
                    const cfg = SERVICE_CONFIG[enKey];
                    const toggle = () => {
                      const updated = selected
                        ? data.services.filter((s) => s !== enKey)
                        : [...data.services, enKey];
                      setData({ ...data, services: updated });
                    };
                    return (
                      <ServiceCard
                        key={enKey}
                        label={svc}
                        enKey={enKey}
                        selected={selected}
                        cfg={cfg}
                        onClick={toggle}
                      />
                    );
                  })}
                </div>

                {data.services.length > 0 && (
                  <p className="text-xs text-primary font-semibold">
                    {data.services.length} {t(bk.servicesSelected, lang)}
                  </p>
                )}
              </div>
            )}

            {/* Step 7: Date & Time */}
            {step === 7 && (
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                    {t(bk.preferredDate, lang)}
                  </label>
                  <div className="bg-[#111] border border-white/10 p-4">
                    <CalendarPicker
                      value={data.date}
                      onChange={(v) => setData({ ...data, date: v })}
                      dowLabels={lang === "de" ? DOW_LABELS_DE : DOW_LABELS_EN}
                      dateLocale={dateLocale}
                    />
                  </div>
                  {data.date && (
                    <p className="text-xs text-primary font-semibold tracking-wide">
                      {t(bk.selected, lang)}:{" "}
                      {format(
                        new Date(data.date + "T00:00:00"),
                        "EEEE, MMMM d, yyyy",
                        { locale: dateLocale },
                      )}
                    </p>
                  )}
                </div>

                <div className="flex flex-col space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-400">
                    {t(bk.preferredTime, lang)}
                  </label>
                  <TimePicker
                    value={data.time}
                    onChange={(v) => setData({ ...data, time: v })}
                    hourLabel={t(bk.hour, lang)}
                    minuteLabel={t(bk.minute, lang)}
                    selectedDate={data.date}
                  />
                  {data.time && !data.time.startsWith(":") && (() => {
                    const [hourStr] = data.time.split(":");
                    const allowed = getAllowedHours(data.date);
                    const isValid = allowed.includes(hourStr);
                    if (isValid) {
                      return (
                        <p className="text-xs text-primary font-semibold tracking-wide">
                          {t(bk.selected, lang)}: {data.time}
                        </p>
                      );
                    }
                    const dow = data.date ? new Date(data.date + "T00:00:00").getDay() : -1;
                    const hoursHint =
                      dow === 6
                        ? "15:00 – 18:00"
                        : dow === 0
                          ? lang === "de" ? "Sonntags geschlossen" : "Closed on Sundays"
                          : "10:00 – 18:00";
                    return (
                      <p className="text-xs text-red-400 font-semibold tracking-wide">
                        {lang === "de"
                          ? `Bitte wähle eine Uhrzeit innerhalb der Geschäftszeiten: ${hoursHint}`
                          : `Please select a time within business hours: ${hoursHint}`}
                      </p>
                    );
                  })()}
                </div>
              </div>
            )}

            {/* Step 8: Summary */}
            {step === 8 && (
              <div
                className="flex flex-col space-y-4"
                data-testid="booking-summary"
              >
                <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">
                  {t(bk.reviewDetails, lang)}
                </p>
                <div className="bg-[#111] border border-white/5 divide-y divide-white/5">
                  {[
                    {
                      label: t(summaryLabels.name, lang),
                      value: data.name,
                    },
                    {
                      label: t(summaryLabels.car, lang),
                      value: `${data.carBrand} ${data.carModel}`,
                    },
                    {
                      label: t(summaryLabels.bodyType, lang),
                      value: (() => {
                        const idx = translations.booking.bodyTypes.en.indexOf(data.bodyType);
                        return idx >= 0 ? t(bk.bodyTypes, lang)[idx] : data.bodyType;
                      })(),
                    },
                    { label: t(summaryLabels.seats, lang), value: data.seats },
                    {
                      label: t(summaryLabels.date, lang),
                      value: data.date
                        ? format(
                            new Date(data.date + "T00:00:00"),
                            "EEEE, MMMM d, yyyy",
                            { locale: dateLocale },
                          )
                        : "",
                    },
                    { label: t(summaryLabels.time, lang), value: data.time },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between px-4 py-3">
                      <span className="text-gray-500 font-semibold uppercase tracking-wider text-xs">
                        {label}
                      </span>
                      <span className="text-white font-bold text-sm text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                  {data.offer && (() => {
                    const offerCards = [
                      translations.offers.card1.title,
                      translations.offers.card2.title,
                    ];
                    const card = offerCards.find((c) => c.en === data.offer);
                    const displayOffer = card ? t(card, lang) : data.offer;
                    return (
                      <div className="flex justify-between px-4 py-3">
                        <span className="text-gray-500 font-semibold uppercase tracking-wider text-xs">
                          {t(summaryLabels.offer, lang)}
                        </span>
                        <span className="text-primary font-bold text-sm text-right">
                          {displayOffer}
                        </span>
                      </div>
                    );
                  })()}
                  <div className="flex flex-col px-4 py-3 gap-1">
                    <span className="text-gray-500 font-semibold uppercase tracking-wider text-xs mb-1">
                      {t(summaryLabels.services, lang)}
                    </span>
                    {data.services.map((svcKey) => {
                      const enIdx =
                        translations.booking.services.en.indexOf(svcKey);
                      const displaySvc =
                        enIdx >= 0
                          ? t(bk.services, lang)[enIdx]
                          : svcKey;
                      return (
                        <span key={svcKey} className="text-white font-bold text-sm">
                          {displaySvc}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer navigation */}
          <div className="px-8 pb-8 pt-6 flex items-center justify-between border-t border-white/5 shrink-0">
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 1}
              data-testid="booking-back"
              className={`flex items-center space-x-2 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                step === 1
                  ? "text-gray-700 cursor-not-allowed"
                  : "text-gray-400 hover:text-primary"
              }`}
            >
              <ChevronLeft size={18} />
              <span>{t(bk.back, lang)}</span>
            </button>

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handleNextStep}
                disabled={!isNextEnabled()}
                data-testid="booking-next"
                className={`flex items-center space-x-2 px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  isNextEnabled()
                    ? "bg-primary text-black hover:bg-yellow-400"
                    : "bg-white/5 text-gray-600 cursor-not-allowed"
                }`}
              >
                <span>{t(bk.next, lang)}</span>
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendWhatsApp}
                data-testid="booking-send-whatsapp"
                className="flex items-center space-x-2 px-8 py-3 bg-primary text-black text-sm font-bold uppercase tracking-wider hover:bg-yellow-400 transition-all duration-200 shadow-[0_0_30px_rgba(255,215,0,0.3)]"
              >
                <span>{t(bk.sendWhatsApp, lang)}</span>
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
