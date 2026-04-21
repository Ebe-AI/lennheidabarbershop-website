import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-charcoal flex flex-col">
      <Navigation />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="font-playfair text-gold/20 text-[120px] md:text-[200px] font-black leading-none select-none mb-0">
            404
          </div>
          <div className="-mt-8 md:-mt-16">
            <h1 className="font-playfair text-cream text-3xl md:text-4xl font-bold mb-4">
              Pagina niet gevonden.
            </h1>
            <p className="font-dm text-muted text-[15px] mb-8 max-w-sm mx-auto">
              Deze pagina bestaat niet (meer). Ga terug naar de homepage of maak direct een afspraak.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gold hover:bg-gold-light text-charcoal font-dm font-bold text-[12px] tracking-[0.1em] uppercase transition-all duration-300"
              >
                ← Terug naar home
              </Link>
              <a
                href="https://www.salonized.com/nl/bookings/new?slug=lenn-heida-barbershop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-gold/30 text-gold hover:border-gold font-dm font-medium text-[12px] tracking-[0.1em] uppercase transition-all duration-300"
              >
                Afspraak maken
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
