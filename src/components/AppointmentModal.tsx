"use client";

import { useState, useEffect, useCallback } from "react";

interface Appointment {
  date: string;
  time: string;
  service: string;
  duration: string;
}

interface AppointmentModalProps {
  mode: "reschedule" | "cancel" | null;
  appointment: Appointment;
  onClose: () => void;
  onConfirm: (mode: "reschedule" | "cancel", newDate?: string) => void;
}

const DAYS_NL = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];
const MONTHS_NL = [
  "Januari", "Februari", "Maart", "April", "Mei", "Juni",
  "Juli", "Augustus", "September", "Oktober", "November", "December",
];

const TIMES = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

function buildCalendarDays(baseDate: Date): (Date | null)[] {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const firstDay = new Date(year, month, 1);
  // Convert to Mon-first index (0=Mon … 6=Sun)
  const startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  return cells;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function formatSelectedDate(d: Date, time: string): string {
  return `${d.getDate()} ${MONTHS_NL[d.getMonth()]} ${d.getFullYear()} om ${time}`;
}

export default function AppointmentModal({ mode, appointment, onClose, onConfirm }: AppointmentModalProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [calMonth, setCalMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("10:00");

  // Reset selections when modal reopens
  useEffect(() => {
    if (mode) {
      setSelectedDate(null);
      setSelectedTime("10:00");
      setCalMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (mode) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, onClose]);

  const prevMonth = useCallback(() => {
    setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  }, []);

  const nextMonth = useCallback(() => {
    setCalMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }, []);

  const canGoPrev = calMonth > new Date(today.getFullYear(), today.getMonth(), 1);
  const cells = buildCalendarDays(calMonth);

  if (!mode) return null;

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/85 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative bg-surface-1 border border-white/[0.09] w-full max-w-lg shadow-[0_24px_80px_rgba(0,0,0,0.7)] animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <div className="w-3 h-px bg-gold" />
              <span className="font-dm text-gold text-[10px] tracking-[0.2em] uppercase">
                {mode === "reschedule" ? "Afspraak verzetten" : "Afspraak annuleren"}
              </span>
            </div>
            <h2 className="font-playfair text-cream text-lg font-semibold">
              {mode === "reschedule" ? "Kies een nieuwe datum" : "Weet je het zeker?"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-cream transition-colors duration-200"
            aria-label="Sluiten"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Current appointment summary */}
        <div className="mx-6 mt-5 px-4 py-3 bg-surface-2 border border-white/[0.06] flex items-center gap-3">
          <svg className="w-4 h-4 text-gold/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
          </svg>
          <div>
            <div className="font-dm text-cream text-[13px] font-medium">{appointment.service}</div>
            <div className="font-dm text-muted text-[11px]">{appointment.date} · {appointment.time} · {appointment.duration}</div>
          </div>
        </div>

        {mode === "cancel" ? (
          /* ── CANCEL VIEW ── */
          <div className="px-6 py-5">
            <p className="font-dm text-muted text-[14px] leading-relaxed mb-6">
              Je afspraak bij Lenn Heida Barbershop wordt geannuleerd. Je ontvangt een bevestiging via e-mail.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 border border-white/10 text-muted hover:text-cream hover:border-white/20 font-dm text-[12px] tracking-[0.1em] uppercase transition-all duration-200"
              >
                Toch bewaren
              </button>
              <button
                onClick={() => onConfirm("cancel")}
                className="flex-1 py-3 bg-red-900/40 hover:bg-red-900/60 border border-red-900/40 text-red-300 hover:text-red-200 font-dm font-semibold text-[12px] tracking-[0.1em] uppercase transition-all duration-200"
              >
                Ja, annuleren
              </button>
            </div>
          </div>
        ) : (
          /* ── RESCHEDULE VIEW ── */
          <div className="px-6 py-5 space-y-5">
            {/* Month nav */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevMonth}
                disabled={!canGoPrev}
                className="w-8 h-8 flex items-center justify-center text-muted hover:text-cream disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                aria-label="Vorige maand"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <span className="font-playfair text-cream text-sm font-semibold">
                {MONTHS_NL[calMonth.getMonth()]} {calMonth.getFullYear()}
              </span>
              <button
                onClick={nextMonth}
                className="w-8 h-8 flex items-center justify-center text-muted hover:text-cream transition-colors duration-200"
                aria-label="Volgende maand"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1">
              {DAYS_NL.map((d) => (
                <div key={d} className="text-center font-dm text-muted text-[10px] tracking-[0.1em] uppercase py-1">
                  {d}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((date, i) => {
                if (!date) return <div key={`empty-${i}`} />;
                const isPast = date < today;
                const isSunday = date.getDay() === 0;
                const isDisabled = isPast || isSunday;
                const isSelected = selectedDate && isSameDay(date, selectedDate);
                const isToday = isSameDay(date, today);
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => !isDisabled && setSelectedDate(date)}
                    disabled={isDisabled}
                    className={`h-8 w-full text-center font-dm text-[12px] transition-all duration-150 ${
                      isSelected
                        ? "bg-gold text-charcoal font-bold"
                        : isDisabled
                        ? "text-muted/30 cursor-not-allowed"
                        : isToday
                        ? "border border-gold/50 text-cream hover:bg-gold/20"
                        : "text-muted hover:bg-white/[0.07] hover:text-cream"
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Time selector */}
            {selectedDate && (
              <div>
                <div className="font-dm text-muted text-[10px] tracking-[0.15em] uppercase mb-2">
                  Kies een tijd
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 font-dm text-[12px] transition-all duration-150 ${
                        selectedTime === t
                          ? "bg-gold text-charcoal font-bold"
                          : "border border-white/[0.08] text-muted hover:text-cream hover:border-white/20"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Confirm */}
            <div className="pt-2 border-t border-white/[0.06]">
              {selectedDate && (
                <p className="font-dm text-muted text-[12px] mb-3">
                  Nieuw: <span className="text-cream">{formatSelectedDate(selectedDate, selectedTime)}</span>
                </p>
              )}
              <button
                onClick={() => selectedDate && onConfirm("reschedule", formatSelectedDate(selectedDate, selectedTime))}
                disabled={!selectedDate}
                className="w-full py-3.5 bg-gold hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed text-charcoal font-dm font-bold text-[12px] tracking-[0.12em] uppercase transition-all duration-300 hover:shadow-[0_4px_20px_rgba(201,169,110,0.35)]"
              >
                Afspraak bevestigen
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
