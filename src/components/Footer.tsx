import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 border border-gold/60 rotate-45 flex items-center justify-center">
                <div className="w-4 h-4 border border-gold/30" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-playfair text-cream text-sm font-semibold tracking-[0.12em] uppercase">
                  Lenn Heida
                </span>
                <span className="font-dm text-muted text-[8px] tracking-widest uppercase mt-0.5">
                  Barbershop
                </span>
              </div>
            </div>
            <p className="font-dm text-muted text-sm leading-relaxed max-w-[220px]">
              Vakmanschap, precisie en aandacht voor elk detail. In het hart van Heerenveen.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-cream text-sm tracking-[0.1em] uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-3 font-dm text-muted text-sm">
              <li>
                <a href="tel:+31628971142" className="hover:text-cream transition-colors">
                  06-28971142
                </a>
              </li>
              <li>
                <a href="mailto:info@lennheidabarbershop.nl" className="hover:text-cream transition-colors">
                  info@lennheidabarbershop.nl
                </a>
              </li>
              <li className="leading-relaxed">
                Schans 5<br />8441 AB Heerenveen
              </li>
            </ul>
          </div>

          {/* Openingstijden */}
          <div>
            <h4 className="font-playfair text-cream text-sm tracking-[0.1em] uppercase mb-5">
              Openingstijden
            </h4>
            <ul className="space-y-2 font-dm text-muted text-sm">
              {[
                ["Maandag", "Gesloten"],
                ["Dinsdag", "09:00 – 18:00"],
                ["Woensdag", "09:00 – 18:00"],
                ["Donderdag", "09:00 – 18:00"],
                ["Vrijdag", "09:00 – 18:00"],
                ["Zaterdag", "09:00 – 16:00"],
              ].map(([dag, tijd]) => (
                <li key={dag} className="flex justify-between gap-4">
                  <span>{dag}</span>
                  <span className={tijd === "Gesloten" ? "text-muted-dark" : "text-cream/70"}>{tijd}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-dm text-muted text-xs tracking-wide">
            © {new Date().getFullYear()} Lenn Heida Barbershop. Alle rechten voorbehouden.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/lennheida_barbershop"
              target="_blank"
              rel="noopener noreferrer"
              className="font-dm text-muted text-xs tracking-[0.08em] uppercase hover:text-gold transition-colors duration-300"
            >
              Instagram
            </a>
            <Link href="/shop" className="font-dm text-muted text-xs tracking-[0.08em] uppercase hover:text-gold transition-colors duration-300">
              Shop
            </Link>
            <Link href="/account" className="font-dm text-muted text-xs tracking-[0.08em] uppercase hover:text-gold transition-colors duration-300">
              Account
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
