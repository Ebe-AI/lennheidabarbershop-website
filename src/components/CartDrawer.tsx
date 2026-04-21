"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity, subtotal, totalCount, clearCart } =
    useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 z-[55] bg-charcoal/80 backdrop-blur-sm transition-opacity duration-500 ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] z-[56] bg-charcoal-light border-l border-white/[0.07] flex flex-col transition-transform duration-500 ease-out ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07] flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="font-playfair text-cream text-lg font-semibold">Winkelwagen</h2>
            {totalCount > 0 && (
              <span className="bg-gold text-charcoal font-dm font-bold text-[10px] px-1.5 py-0.5 min-w-[20px] text-center">
                {totalCount}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            className="w-9 h-9 flex items-center justify-center text-muted hover:text-cream transition-colors duration-200"
            aria-label="Sluit winkelwagen"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full px-8 text-center">
              <div className="w-16 h-16 border border-white/[0.08] flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <p className="font-playfair text-cream text-lg font-semibold mb-2">
                Je winkelwagen is leeg
              </p>
              <p className="font-dm text-muted text-sm mb-6">
                Voeg producten toe vanuit de shop.
              </p>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="px-6 py-3 bg-gold hover:bg-gold-light text-charcoal font-dm font-bold text-[12px] tracking-[0.1em] uppercase transition-all duration-300"
              >
                Naar de shop
              </Link>
            </div>
          ) : (
            <div className="px-6 py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-4 border-b border-white/[0.06] last:border-0"
                >
                  {/* Image */}
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden bg-surface-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-dm text-muted text-[10px] tracking-[0.12em] uppercase mb-0.5">
                      {item.brand}
                    </div>
                    <div className="font-playfair text-cream text-sm font-semibold truncate mb-2">
                      {item.name}
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Qty stepper */}
                      <div className="flex items-center border border-white/[0.1]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-muted hover:text-cream hover:bg-white/[0.05] transition-colors duration-150"
                          aria-label="Minder"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="w-8 text-center font-dm text-cream text-[13px]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-muted hover:text-cream hover:bg-white/[0.05] transition-colors duration-150"
                          aria-label="Meer"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </button>
                      </div>

                      {/* Price + remove */}
                      <div className="flex items-center gap-3">
                        <span className="font-playfair text-gold font-bold text-sm">
                          €{(item.price * item.quantity).toFixed(2).replace(".", ",")}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted hover:text-red-400 transition-colors duration-200"
                          aria-label="Verwijder"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="font-dm text-muted-dark hover:text-muted text-[11px] tracking-[0.1em] uppercase transition-colors duration-200"
              >
                Winkelwagen leegmaken
              </button>
            </div>
          )}
        </div>

        {/* Footer — only when items present */}
        {items.length > 0 && (
          <div className="flex-shrink-0 border-t border-white/[0.07] px-6 py-5 space-y-4">
            {/* Subtotaal */}
            <div className="flex items-center justify-between">
              <span className="font-dm text-muted text-sm">Subtotaal</span>
              <span className="font-playfair text-cream font-bold text-lg">
                €{subtotal.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <p className="font-dm text-muted text-[11px]">
              Verzendkosten worden berekend bij het afrekenen.
            </p>

            {/* CTA */}
            <button
              onClick={() => {
                closeDrawer();
                alert("Checkout komt binnenkort! 🛒");
              }}
              className="w-full py-4 bg-gold hover:bg-gold-light text-charcoal font-dm font-bold text-[13px] tracking-[0.12em] uppercase transition-all duration-300 hover:shadow-[0_4px_20px_rgba(201,169,110,0.35)]"
            >
              Afrekenen
            </button>
            <Link
              href="/shop"
              onClick={closeDrawer}
              className="block text-center font-dm text-muted hover:text-cream text-[12px] tracking-[0.08em] uppercase transition-colors duration-200"
            >
              Verder winkelen
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
