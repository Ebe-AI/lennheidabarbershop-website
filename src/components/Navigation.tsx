"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalCount, openDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/#diensten", label: "Diensten" },
    { href: "/shop", label: "Shop" },
    { href: "/account", label: "Mijn Account" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-9 h-9 border border-gold/60 rotate-45 flex items-center justify-center group-hover:border-gold transition-colors duration-300">
              <div className="w-5 h-5 border border-gold/40 rotate-0 group-hover:border-gold/70 transition-colors duration-300" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-playfair text-cream text-[15px] font-semibold tracking-[0.12em] uppercase group-hover:text-gold transition-colors duration-300">
              Lenn Heida
            </span>
            <span className="font-dm text-muted text-[9px] tracking-widest uppercase mt-0.5">
              Barbershop
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-dm text-[13px] tracking-[0.08em] uppercase transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 ${
                pathname === href || (href === "/shop" && pathname.startsWith("/shop")) || (href === "/account" && pathname.startsWith("/account"))
                  ? "text-gold after:w-full"
                  : "text-muted hover:text-cream after:w-0 hover:after:w-full"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Cart + CTA + Mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            onClick={openDrawer}
            className="relative flex items-center justify-center w-10 h-10 text-muted hover:text-cream transition-colors duration-300"
            aria-label="Winkelwagen openen"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-gold text-charcoal font-dm font-bold text-[9px] flex items-center justify-center px-1">
                {totalCount > 9 ? "9+" : totalCount}
              </span>
            )}
          </button>

          <a
            href="https://www.salonized.com/nl/bookings/new?slug=lenn-heida-barbershop"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-gold hover:bg-gold-light text-charcoal font-dm font-semibold text-[12px] tracking-[0.1em] uppercase transition-all duration-300 hover:shadow-[0_4px_20px_rgba(201,169,110,0.35)]"
          >
            Afspraak maken
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5"
            aria-label="Menu"
          >
            <span
              className={`block h-px bg-cream transition-all duration-300 ${
                menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
              }`}
            />
            <span
              className={`block h-px bg-cream transition-all duration-300 ${
                menuOpen ? "w-0 opacity-0" : "w-4"
              }`}
            />
            <span
              className={`block h-px bg-cream transition-all duration-300 ${
                menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-charcoal/[0.98] backdrop-blur-md border-t border-white/[0.06] px-6 py-6 flex flex-col gap-5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-dm text-[13px] tracking-[0.12em] uppercase text-muted hover:text-cream transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => { setMenuOpen(false); openDrawer(); }}
            className="flex items-center gap-2 font-dm text-[13px] tracking-[0.12em] uppercase text-muted hover:text-cream transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            Winkelwagen
            {totalCount > 0 && (
              <span className="bg-gold text-charcoal font-bold text-[9px] px-1.5 py-0.5">
                {totalCount}
              </span>
            )}
          </button>
          <a
            href="https://www.salonized.com/nl/bookings/new?slug=lenn-heida-barbershop"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gold text-charcoal font-dm font-semibold text-[12px] tracking-[0.1em] uppercase mt-2"
          >
            Afspraak maken
          </a>
        </div>
      </div>
    </header>
  );
}
