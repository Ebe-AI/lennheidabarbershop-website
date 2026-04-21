"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AppointmentModal from "@/components/AppointmentModal";
import { useToast } from "@/context/ToastContext";

const LOYALTY_POINTS = 340;
const LOYALTY_GOAL = 500;
const LOYALTY_PROGRESS = (LOYALTY_POINTS / LOYALTY_GOAL) * 100;

const lastVisit = {
  date: "Dinsdag 15 april 2026",
  service: "Knip + Baard",
  detail: "Skin fade op de zijkanten, textuur met massa bovenkant, baard bijgewerkt en geolied.",
  barber: "Lennard Heida",
  rating: 5,
};

const nextAppointment = {
  date: "Dinsdag 13 mei 2026",
  time: "10:30",
  service: "Knip + Baard",
  duration: "75 min",
};

const recommendations = [
  {
    id: 1,
    name: "Fiber Paste",
    brand: "Layrite",
    reason: "Perfect voor jouw skin fade — houdt de textuur boven heel de dag.",
    price: 24.95,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&q=80",
  },
  {
    id: 2,
    name: "Beard Oil Black",
    brand: "Lenn Heida Co.",
    reason: "Voedend voor je baard. Lennard gebruikt dit zelf ook.",
    price: 21.50,
    image: "https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=300&q=80",
  },
  {
    id: 3,
    name: "Sea Salt Spray",
    brand: "Baxter of California",
    reason: "Geeft extra volume aan je textuurlook tussen knipbeurten door.",
    price: 22.50,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&q=80",
  },
];

const aiSuggestions = [
  "Hey Lenn, ik wil dezelfde fade als vorige keer, maar misschien iets strakker aan de zijkant — en mijn baard mag iets korter.",
  "Lenn, de skin fade was perfect. Mijn haar groeit snel, dus de zijkanten steken al iets meer uit. Kun je die weer aanscherpen?",
  "Ik wil de textuur bovenkant dit keer iets voller houden — niet te kort. De fade mag hetzelfde als vorig keer.",
  "Hey Lenn, kun je de bovenkant wat langer laten? Ik wil proberen om wat meer volume te krijgen. De zijkanten mogen kort.",
  "Zelfde als altijd — skin fade, iets bijgewerkt boven. Oh, en mijn baard mag ook even netjes gemaakt worden.",
  "Lenn, ik wil eigenlijk iets nieuws proberen. Iets meer textuur boven, minder fade aan de zijkant. Wat denk jij?",
];

export default function AccountPage() {
  const [aiIndex, setAiIndex] = useState(0);
  const [aiVisible, setAiVisible] = useState(true);
  const [progressWidth, setProgressWidth] = useState(0);
  const [modalMode, setModalMode] = useState<"reschedule" | "cancel" | null>(null);
  const [copied, setCopied] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setProgressWidth(LOYALTY_PROGRESS), 300);
    return () => clearTimeout(timer);
  }, []);

  const cycleAi = () => {
    setAiVisible(false);
    setTimeout(() => {
      setAiIndex((i) => (i + 1) % aiSuggestions.length);
      setAiVisible(true);
    }, 300);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(aiSuggestions[aiIndex]);
      setCopied(true);
      showToast("Gekopieerd naar klembord!", "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("Kopiëren mislukt. Probeer handmatig.", "error");
    }
  };

  const handleModalConfirm = (mode: "reschedule" | "cancel", newDate?: string) => {
    if (mode === "reschedule" && newDate) {
      showToast(`Afspraak verzet naar ${newDate}`, "success");
    } else if (mode === "cancel") {
      showToast("Afspraak geannuleerd. Je ontvangt een bevestiging.", "info");
    }
    setModalMode(null);
  };

  return (
    <main className="page-transition min-h-screen bg-charcoal">
      <Navigation />

      {/* ─── ACCOUNT HEADER ───────────────────────────────────────── */}
      <section className="pt-32 pb-12 bg-charcoal-light border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-surface-3 border border-gold/30 flex items-center justify-center">
                <span className="font-playfair text-gold text-xl font-bold">JV</span>
              </div>
              <div>
                <div className="font-dm text-muted text-[11px] tracking-[0.2em] uppercase mb-1">
                  Welkom terug
                </div>
                <h1 className="font-playfair text-cream text-2xl font-bold">
                  Joost de Vries
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 py-2 border border-gold/20 bg-surface-1">
                <div className="font-dm text-muted text-[9px] tracking-[0.2em] uppercase mb-0.5">Loyaliteitsstatus</div>
                <div className="font-playfair text-gold font-bold text-sm">Gold Member</div>
              </div>
              <a
                href="https://www.salonized.com/nl/bookings/new?slug=lenn-heida-barbershop"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-gold hover:bg-gold-light text-charcoal font-dm font-bold text-[12px] tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-[0_4px_20px_rgba(201,169,110,0.3)]"
              >
                Boek afspraak
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DASHBOARD GRID ───────────────────────────────────────── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── LEFT COLUMN ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Volgende afspraak */}
              <div className="bg-surface-1 border border-white/[0.07] p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-4 h-px bg-gold" />
                  <span className="font-dm text-gold text-[11px] tracking-[0.2em] uppercase">
                    Volgende afspraak
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-playfair text-cream text-2xl font-bold mb-1">
                      {nextAppointment.date}
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-dm text-muted text-sm">{nextAppointment.time}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-dark" />
                      <span className="font-dm text-muted text-sm">{nextAppointment.service}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-dark" />
                      <span className="font-dm text-muted text-sm">{nextAppointment.duration}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setModalMode("reschedule")}
                      className="px-4 py-2 border border-white/10 text-muted hover:text-cream hover:border-white/20 font-dm text-[11px] tracking-[0.1em] uppercase transition-all duration-200"
                    >
                      Wijzigen
                    </button>
                    <button
                      onClick={() => setModalMode("cancel")}
                      className="px-4 py-2 border border-red-900/30 text-red-400/60 hover:border-red-900/60 hover:text-red-400 font-dm text-[11px] tracking-[0.1em] uppercase transition-all duration-200"
                    >
                      Annuleren
                    </button>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-white/[0.06] flex items-center gap-3">
                  <svg className="w-4 h-4 text-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
                  </svg>
                  <span className="font-dm text-muted text-[12px]">
                    Over <strong className="text-cream">22 dagen</strong> is jouw volgende knipbeurt
                  </span>
                </div>
              </div>

              {/* Laatste knipbeurt */}
              <div className="bg-surface-1 border border-white/[0.07] p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-4 h-px bg-gold" />
                  <span className="font-dm text-gold text-[11px] tracking-[0.2em] uppercase">
                    Laatste knipbeurt
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative w-full sm:w-32 h-32 sm:h-auto flex-shrink-0 overflow-hidden bg-surface-2">
                    <Image
                      src="https://lennheidabarbershop.nl/wp-content/uploads/2022/12/IMG_2626-scaled.jpg"
                      alt="Laatste knipbeurt resultaat"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-playfair text-cream text-xl font-semibold">
                          {lastVisit.service}
                        </h3>
                        <div className="font-dm text-muted text-sm mt-0.5">{lastVisit.date}</div>
                      </div>
                      <div className="flex gap-0.5 flex-shrink-0">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3.5 h-3.5 ${i < lastVisit.rating ? "text-gold" : "text-muted-dark"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    <p className="font-dm text-muted text-[13px] leading-relaxed mb-4">
                      {lastVisit.detail}
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-surface-3 border border-gold/20 flex items-center justify-center">
                        <span className="font-playfair text-gold text-[8px] font-bold">LH</span>
                      </div>
                      <span className="font-dm text-muted text-[11px]">
                        Door <span className="text-cream">{lastVisit.barber}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Blok ✦ */}
              <div className="relative">
                <div className="absolute inset-0 p-px overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 shimmer-border" />
                </div>
                <div className="relative bg-surface-1 p-6">
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gold/10 border border-gold/30 flex items-center justify-center">
                        <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.315-.6a32.17 32.17 0 003.043-2.493.75.75 0 10-1.04-1.08 32.923 32.923 0 01-2.951 2.334v-.786a.75.75 0 00-.43-.677A41.052 41.052 0 011.17 2.028.75.75 0 01.496.743a41.059 41.059 0 019.168.576zm-.53 2.424L5.97 5.937a.75.75 0 01-.84 0L1.5 3.743a39.558 39.558 0 018.164-2v2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-dm text-gold text-[11px] tracking-[0.2em] uppercase">
                        AI Barber Assistent
                      </span>
                    </div>
                    <button
                      onClick={cycleAi}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-white/10 text-muted hover:text-cream hover:border-white/20 font-dm text-[10px] tracking-[0.1em] uppercase transition-all duration-200"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                      Nieuwe suggestie
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="font-dm text-muted text-[11px] tracking-[0.15em] uppercase mb-3">
                      Wat zeg ik vandaag tegen Lenn?
                    </div>
                    <div
                      className={`transition-all duration-300 ${
                        aiVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                      }`}
                    >
                      <p className="font-playfair text-cream/90 text-[15px] leading-relaxed italic border-l-2 border-gold/40 pl-4">
                        &ldquo;{aiSuggestions[aiIndex]}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="font-dm text-muted text-[11px]">
                      Gebaseerd op je laatste bezoek · {lastVisit.date}
                    </div>
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-1.5 px-3 py-1.5 border font-dm text-[10px] tracking-[0.1em] uppercase transition-all duration-200 ${
                        copied
                          ? "bg-gold/20 border-gold/40 text-gold"
                          : "bg-gold/10 border-gold/20 text-gold hover:bg-gold/20"
                      }`}
                    >
                      {copied ? (
                        <>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          Gekopieerd
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                          </svg>
                          Kopieer
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="space-y-6">

              {/* Loyaliteitspunten */}
              <div className="bg-surface-1 border border-gold/20 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-4 h-px bg-gold" />
                  <span className="font-dm text-gold text-[11px] tracking-[0.2em] uppercase">
                    Loyaliteit
                  </span>
                </div>

                <div className="text-center mb-5">
                  <div className="font-playfair text-gold text-5xl font-bold mb-1">
                    {LOYALTY_POINTS}
                  </div>
                  <div className="font-dm text-muted text-[12px]">punten verzameld</div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between mb-2">
                    <span className="font-dm text-muted text-[10px]">0</span>
                    <span className="font-dm text-muted text-[10px]">{LOYALTY_GOAL}</span>
                  </div>
                  <div className="h-1.5 bg-surface-3 relative overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-gold transition-all duration-1000 ease-out"
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                </div>

                <p className="font-dm text-muted text-[12px] text-center leading-relaxed">
                  Nog <strong className="text-gold">{LOYALTY_GOAL - LOYALTY_POINTS}</strong> punten tot jouw volgende{" "}
                  <span className="text-cream">gratis product</span>
                </p>

                <div className="mt-5 pt-5 border-t border-white/[0.06]">
                  <div className="font-dm text-muted text-[10px] tracking-[0.12em] uppercase mb-3">
                    Punten verdienen
                  </div>
                  {[
                    { action: "Knipbeurt", pts: "+25 pts" },
                    { action: "Productaankoop", pts: "+10 pts" },
                    { action: "Review plaatsen", pts: "+15 pts" },
                  ].map(({ action, pts }) => (
                    <div key={action} className="flex justify-between items-center py-1.5">
                      <span className="font-dm text-muted text-[12px]">{action}</span>
                      <span className="font-dm text-gold text-[12px] font-semibold">{pts}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Snelle links */}
              <div className="bg-surface-1 border border-white/[0.07] p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-4 h-px bg-gold" />
                  <span className="font-dm text-gold text-[11px] tracking-[0.2em] uppercase">
                    Snelle links
                  </span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "Afspraakhistorie", icon: "🗓", action: () => showToast("Afspraakhistorie komt binnenkort", "info") },
                    { label: "Aankoophistorie", icon: "🛍", action: () => showToast("Aankoophistorie komt binnenkort", "info") },
                    { label: "Instellingen", icon: "⚙️", action: () => showToast("Instellingen komen binnenkort", "info") },
                  ].map(({ label, icon, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className="w-full flex items-center gap-3 px-3 py-2.5 font-dm text-[12px] tracking-[0.05em] transition-all duration-200 text-left text-muted hover:text-cream hover:bg-surface-3"
                    >
                      <span className="text-sm">{icon}</span>
                      {label}
                    </button>
                  ))}
                  <button
                    onClick={() => showToast("Je bent uitgelogd", "info")}
                    className="w-full flex items-center gap-3 px-3 py-2.5 font-dm text-[12px] tracking-[0.05em] transition-all duration-200 text-left text-muted-dark hover:text-red-400 hover:bg-red-950/20"
                  >
                    <span className="text-sm">→</span>
                    Uitloggen
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ─── PRODUCTAANBEVELINGEN ──────────────────────────────── */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-gold" />
                <span className="font-dm text-gold text-[11px] tracking-[0.2em] uppercase">
                  Aanbevolen voor jou
                </span>
              </div>
              <Link
                href="/shop"
                className="font-dm text-muted text-[11px] tracking-[0.1em] uppercase hover:text-cream transition-colors duration-200"
              >
                Bekijk alles →
              </Link>
            </div>

            {/* Fixed: was sm:grid-cols-3, now lg:grid-cols-3 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {recommendations.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 bg-surface-1 border border-white/[0.07] hover:border-gold/25 p-4 transition-all duration-300 group"
                >
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-surface-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-dm text-muted text-[9px] tracking-[0.15em] uppercase mb-0.5">
                      {product.brand}
                    </div>
                    <div className="font-playfair text-cream text-sm font-semibold mb-1 truncate">
                      {product.name}
                    </div>
                    <div className="font-dm text-muted text-[11px] leading-relaxed mb-2 line-clamp-2">
                      {product.reason}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-playfair text-gold font-bold text-sm">
                        €{product.price.toFixed(2).replace(".", ",")}
                      </span>
                      <Link
                        href="/shop"
                        className="font-dm text-muted text-[10px] tracking-[0.1em] uppercase hover:text-gold transition-colors duration-200"
                      >
                        Bekijk →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 px-5 py-4 bg-surface-1 border border-white/[0.06] flex items-center gap-3">
              <div className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <span className="font-dm text-muted text-[11px]">
                Aanbevelingen zijn gebaseerd op jouw haartype:{" "}
                <strong className="text-cream">Dik, donker haar · Skin fade voorkeur</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment modal */}
      <AppointmentModal
        mode={modalMode}
        appointment={nextAppointment}
        onClose={() => setModalMode(null)}
        onConfirm={handleModalConfirm}
      />

      <Footer />
    </main>
  );
}
