import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const services = [
  {
    number: "01",
    name: "Knippen",
    price: "€26,95",
    description:
      "Van skin fade tot klassiek, elke knip is maatwerk. We starten altijd met een consult over jouw stijl en haartype.",
    duration: "45 min",
    featured: false,
  },
  {
    number: "02",
    name: "Baard trimmen",
    price: "€18,—",
    description:
      "Contouring, lijnwerk en hydratatie. Je baard verdient net zoveel aandacht als je haar.",
    duration: "30 min",
    featured: false,
  },
  {
    number: "03",
    name: "Knip + Baard",
    price: "€42,—",
    description:
      "Het volledige pakket. Haar en baard in één sessie, voor wie er op z'n best wil staan.",
    duration: "75 min",
    featured: true,
  },
];

const galleryImages = [
  {
    src: "https://lennheidabarbershop.nl/wp-content/uploads/2022/04/4P9B7573-scaled.jpeg",
    alt: "Barbershop interieur",
  },
  {
    src: "https://lennheidabarbershop.nl/wp-content/uploads/2023/03/THomas-scaled.jpg",
    alt: "Knipbeurt resultaat",
  },
  {
    src: "https://lennheidabarbershop.nl/wp-content/uploads/2022/07/4P9B7596-scaled.jpeg",
    alt: "Lennard aan het werk",
  },
  {
    src: "https://lennheidabarbershop.nl/wp-content/uploads/2022/11/IMG_2126.jpg",
    alt: "Detailwerk",
  },
];

export default function HomePage() {
  return (
    <main className="page-transition">
      <Navigation />

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[700px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://lennheidabarbershop.nl/wp-content/uploads/2022/04/4P9B7573-scaled.jpeg"
            alt="Lenn Heida Barbershop interieur"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gold" />
              <span className="font-dm text-gold text-[11px] tracking-[0.3em] uppercase">
                Heerenveen
              </span>
            </div>

            <h1 className="font-playfair text-cream leading-[0.95] mb-6">
              <span className="block text-[clamp(52px,8vw,96px)] font-black">
                Vakmanschap
              </span>
              <span className="block text-[clamp(52px,8vw,96px)] font-normal italic text-gold">
                in elke knip.
              </span>
            </h1>

            <p className="font-dm text-cream/70 text-[17px] leading-relaxed mb-10 max-w-md">
              Precisie, ambacht en een persoonlijke aanpak. Lennard knipt niet zomaar. Hij luistert eerst.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.salonized.com/nl/bookings/new?slug=lenn-heida-barbershop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold hover:bg-gold-light text-charcoal font-dm font-bold text-[13px] tracking-[0.12em] uppercase transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.4)] group"
              >
                Afspraak maken
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link
                href="/#diensten"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-cream/25 hover:border-gold text-cream hover:text-gold font-dm font-medium text-[13px] tracking-[0.12em] uppercase transition-all duration-300"
              >
                Bekijk diensten
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 z-10 hidden lg:flex flex-col items-center gap-3">
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-gold/60" />
          <span className="font-dm text-muted/60 text-[9px] tracking-[0.3em] uppercase">
            Scroll
          </span>
        </div>
      </section>

      {/* ─── INTRO STRIP ──────────────────────────────────────────── */}
      <section className="py-10 bg-charcoal-light border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "5+", label: "Jaar ervaring" },
                { value: "3", label: "Diensten" },
                { value: "★ 4.9", label: "Klantbeoordeling" },
                { value: "100%", label: "Persoonlijk" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="font-playfair text-gold text-2xl font-bold mb-1">{value}</div>
                  <div className="font-dm text-muted text-[11px] tracking-[0.15em] uppercase">{label}</div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ─── DIENSTEN ─────────────────────────────────────────────── */}
      <section id="diensten" className="py-28 bg-charcoal-light scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-px bg-gold" />
                  <span className="font-dm text-gold text-[11px] tracking-[0.3em] uppercase">
                    Onze diensten
                  </span>
                </div>
                <h2 className="font-playfair text-cream text-[clamp(36px,4vw,52px)] font-bold leading-tight">
                  Elke dienst is een<br />
                  <em className="text-gold font-normal">kunstvorm.</em>
                </h2>
              </div>
              <p className="font-dm text-muted text-sm leading-relaxed max-w-xs">
                Geen gehaast, geen compromissen. Gewoon het beste resultaat.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <AnimateOnScroll key={service.number} delay={i * 100}>
                <div
                  className={`relative group p-8 border transition-all duration-500 h-full ${
                    service.featured
                      ? "border-gold/40 bg-surface-1 hover:border-gold hover:shadow-[0_0_40px_rgba(201,169,110,0.12)]"
                      : "border-white/[0.07] bg-surface-1 hover:border-gold/30 hover:bg-surface-2"
                  }`}
                >
                  {service.featured && (
                    <div className="absolute top-0 left-8 -translate-y-1/2">
                      <span className="bg-gold text-charcoal font-dm font-bold text-[10px] tracking-[0.15em] uppercase px-3 py-1">
                        Populair
                      </span>
                    </div>
                  )}

                  <div className="font-playfair text-gold/20 text-[64px] font-black leading-none mb-4 select-none group-hover:text-gold/30 transition-colors duration-300">
                    {service.number}
                  </div>

                  <h3 className="font-playfair text-cream text-2xl font-semibold mb-1">
                    {service.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-playfair text-gold text-2xl font-bold">
                      {service.price}
                    </span>
                    <span className="font-dm text-muted text-xs tracking-wide">
                      / {service.duration}
                    </span>
                  </div>
                  <p className="font-dm text-muted text-sm leading-relaxed mb-8">
                    {service.description}
                  </p>

                  <a
                    href="https://www.salonized.com/nl/bookings/new?slug=lenn-heida-barbershop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 font-dm text-[12px] tracking-[0.1em] uppercase transition-all duration-300 group/btn ${
                      service.featured
                        ? "text-gold hover:text-gold-light"
                        : "text-muted hover:text-cream"
                    }`}
                  >
                    Boek nu
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1 inline-block">→</span>
                  </a>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY STRIP ────────────────────────────────────────── */}
      <section className="overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 h-[280px] md:h-[400px]">
          {galleryImages.map((img, i) => (
            <div key={i} className="relative overflow-hidden group cursor-pointer">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-charcoal/40 group-hover:bg-charcoal/10 transition-all duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── OVER LENNARD ─────────────────────────────────────────── */}
      <section id="over" className="py-28 bg-charcoal overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll className="relative order-2 lg:order-1">
              <div className="relative h-[480px] lg:h-[600px] overflow-hidden">
                <Image
                  src="https://lennheidabarbershop.nl/wp-content/uploads/2022/07/4P9B7596-scaled.jpeg"
                  alt="Lennard Heida aan het werk"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/15 pointer-events-none" />

              <div className="absolute -bottom-6 left-8 bg-surface-2 border border-gold/30 px-6 py-4 shadow-xl">
                <div className="font-playfair text-gold text-3xl font-bold">5+</div>
                <div className="font-dm text-muted text-[11px] tracking-wide uppercase mt-1">
                  Jaar ervaring
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={150} className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-gold" />
                <span className="font-dm text-gold text-[11px] tracking-[0.3em] uppercase">
                  Over de barber
                </span>
              </div>

              <h2 className="font-playfair text-cream text-[clamp(32px,3.5vw,48px)] font-bold leading-tight mb-6">
                Lennard Heida,{" "}
                <em className="text-gold font-normal italic">vakman</em> en{" "}
                <em className="text-gold font-normal italic">perfectionist.</em>
              </h2>

              <div className="space-y-4 font-dm text-muted text-[15px] leading-relaxed">
                <p>
                  Lennard groeide op met de geur van haarproducten en het geluid van scharen. Zijn moeder Anneke runde dezelfde zaak al 35 jaar. Toen hij de kans kreeg om haar nalatenschap voort te zetten, greep hij die met beide handen aan.
                </p>
                <p>
                  Na zijn opleiding aan de Barberschool Amsterdam en jaren ervaring bij topzaken in de regio, opende hij Lenn Heida Barbershop. Zijn filosofie: elk hoofd is anders, elke klant verdient een gesprek en een kop koffie.
                </p>
                <p className="text-cream/75 border-l-2 border-gold/40 pl-4 italic">
                  &ldquo;Ik knip niet zomaar haar. Ik geef mensen het gevoel dat ze er op hun best uitzien. En dat begint met luisteren.&rdquo;
                </p>
              </div>

              <div className="my-8 h-px bg-gradient-to-r from-gold/30 to-transparent" />

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Opleiding", value: "Barberschool Amsterdam" },
                  { label: "Specialisatie", value: "Skin fade & textuur" },
                  { label: "Locatie", value: "Heerenveen Centrum" },
                  { label: "Aanpak", value: "Koffie en consult eerst" },
                ].map(({ label, value }) => (
                  <div key={label} className="border-l border-gold/25 pl-4">
                    <div className="font-dm text-muted text-[10px] tracking-[0.15em] uppercase mb-1">
                      {label}
                    </div>
                    <div className="font-dm text-cream text-sm">{value}</div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ──────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://lennheidabarbershop.nl/wp-content/uploads/2022/11/IMG_2126.jpg"
            alt="Barbershop sfeer"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-charcoal/[0.88]" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal opacity-60" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-gold" />
            <span className="font-dm text-gold text-[11px] tracking-[0.3em] uppercase">
              Klaar voor een nieuwe look?
            </span>
            <div className="w-8 h-px bg-gold" />
          </div>

          <h2 className="font-playfair text-cream text-[clamp(36px,5vw,62px)] font-bold leading-tight mb-6">
            Maak vandaag nog<br />
            <em className="text-gold font-normal italic">jouw afspraak.</em>
          </h2>

          <p className="font-dm text-cream/60 text-[16px] leading-relaxed mb-10 max-w-lg mx-auto">
            Boek online via Salonized. Geen wachtrijen, geen gedoe. Gewoon kiezen wat bij jou past.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.salonized.com/nl/bookings/new?slug=lenn-heida-barbershop"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gold hover:bg-gold-light text-charcoal font-dm font-bold text-[13px] tracking-[0.12em] uppercase transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.4)] group"
            >
              Afspraak maken
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="tel:+31628971142"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-cream/20 hover:border-gold text-cream hover:text-gold font-dm font-medium text-[13px] tracking-[0.12em] uppercase transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              Bel ons
            </a>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center">
            {[
              { label: "Adres", value: "Schans 5, Heerenveen" },
              { label: "Telefoon", value: "06-28971142" },
              { label: "Instagram", value: "@lennheida_barbershop" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="font-dm text-muted text-[9px] tracking-[0.2em] uppercase mb-1">{label}</div>
                <div className="font-dm text-cream/60 text-sm">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
