"use client";

import { useState } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

type Category = "Alle" | "Pomade" | "Shampoo" | "Baard" | "Styling";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  tag?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Original Pomade",
    brand: "Reuzel",
    price: 17.95,
    category: "Pomade",
    image: "https://images.unsplash.com/photo-UZTrMwhqf0s?w=600&q=80",
    description: "Hoge glans, sterke hold. De klassieker die nooit teleurstelt.",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Sea Salt Spray",
    brand: "Baxter of California",
    price: 22.50,
    category: "Styling",
    image: "https://images.unsplash.com/photo-vHVEMgoc1zE?w=600&q=80",
    description: "Beachwave textuur met volume en een matte finish.",
  },
  {
    id: 3,
    name: "Beard Balm Cedar",
    brand: "Lenn Heida Co.",
    price: 19.95,
    category: "Baard",
    image: "https://images.unsplash.com/photo-3I_SlU4WldA?w=600&q=80",
    description: "Hydraterende baardbalsem met cederhout en argan olie.",
    tag: "Huismerk",
  },
  {
    id: 4,
    name: "Deep Clean Shampoo",
    brand: "American Crew",
    price: 15.00,
    category: "Shampoo",
    image: "https://images.unsplash.com/photo-GpFdYjNn7sE?w=600&q=80",
    description: "Reinigende shampoo voor dagelijks gebruik. Fris en licht.",
  },
  {
    id: 5,
    name: "Fiber Paste",
    brand: "Layrite",
    price: 24.95,
    category: "Pomade",
    image: "https://images.unsplash.com/photo-rsEJuk3OZe8?w=600&q=80",
    description: "Flexibele hold met matte finish. Perfect voor textuurlooks.",
  },
  {
    id: 6,
    name: "Beard Oil Black",
    brand: "Lenn Heida Co.",
    price: 21.50,
    category: "Baard",
    image: "https://images.unsplash.com/photo-OTwXMS66VBU?w=600&q=80",
    description: "Premium baardolie met houtachtige geur en intense voeding.",
    tag: "Huismerk",
  },
  {
    id: 7,
    name: "Volume Shampoo",
    brand: "Kevin Murphy",
    price: 27.95,
    category: "Shampoo",
    image: "https://images.unsplash.com/photo-i4r6_Khb_E0?w=600&q=80",
    description: "Geeft volume aan dun en fijn haar. Sulfaatvrij formule.",
  },
  {
    id: 8,
    name: "Clay Wax Matte",
    brand: "Uppercut Deluxe",
    price: 23.00,
    category: "Styling",
    image: "https://images.unsplash.com/photo-MgPwZiihh8s?w=600&q=80",
    description: "Sterke, matte hold. Geeft structuur en definitie.",
  },
];

const categories: Category[] = ["Alle", "Pomade", "Shampoo", "Baard", "Styling"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("Alle");
  const [addedId, setAddedId] = useState<number | null>(null);

  const { addItem, totalCount, openDrawer } = useCart();
  const { showToast } = useToast();

  const filtered = activeCategory === "Alle"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const addToCart = (product: Product) => {
    addItem({ id: product.id, name: product.name, brand: product.brand, price: product.price, image: product.image });
    showToast(`${product.name} toegevoegd aan winkelwagen`, "success");
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <main className="page-transition min-h-screen bg-charcoal">
      <Navigation />

      {/* ─── SHOP HEADER ──────────────────────────────────────────── */}
      <section className="pt-32 pb-16 bg-charcoal-light border-b border-white/[0.06] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 h-px bg-gold" />
                <span className="font-dm text-gold text-[11px] tracking-[0.3em] uppercase">
                  Lenn Heida Collection
                </span>
              </div>
              <h1 className="font-playfair text-cream text-[clamp(40px,5vw,64px)] font-bold leading-tight">
                De Shop.
              </h1>
              <p className="font-dm text-muted text-[15px] leading-relaxed mt-3 max-w-sm">
                Professionele producten voor thuis — dezelfde merken die Lennard gebruikt in de stoel.
              </p>
            </div>

            {/* Cart indicator button */}
            <button
              onClick={openDrawer}
              className="flex items-center gap-3 px-5 py-3 border border-white/[0.08] bg-surface-1 hover:border-gold/30 transition-colors duration-300 group"
            >
              <svg className="w-5 h-5 text-muted group-hover:text-gold transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span className="font-dm text-muted text-sm group-hover:text-cream transition-colors duration-300">
                Winkelwagen
              </span>
              <span className={`ml-1 font-dm font-bold text-sm min-w-[20px] text-center px-1.5 py-0.5 transition-all duration-300 ${
                totalCount > 0 ? "bg-gold text-charcoal" : "bg-surface-3 text-muted"
              }`}>
                {totalCount}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── FILTER BAR ───────────────────────────────────────────── */}
      <section className="sticky top-20 z-30 bg-charcoal/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-1 py-4 overflow-x-auto">
            <span className="font-dm text-muted text-[11px] tracking-[0.15em] uppercase mr-4 whitespace-nowrap">
              Categorie
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-dm text-[12px] tracking-[0.08em] uppercase transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-gold text-charcoal font-bold"
                    : "text-muted hover:text-cream border border-transparent hover:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
            <div className="ml-auto font-dm text-muted text-[12px] whitespace-nowrap pl-4">
              {filtered.length} {filtered.length === 1 ? "product" : "producten"}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT GRID ─────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="group bg-surface-1 border border-white/[0.07] hover:border-gold/30 transition-all duration-300 overflow-hidden hover:shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-surface-2">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[20%] group-hover:grayscale-0"
                  />
                  {product.tag && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-gold text-charcoal font-dm font-bold text-[9px] tracking-[0.15em] uppercase px-2 py-1">
                        {product.tag}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="bg-charcoal/70 text-muted font-dm text-[9px] tracking-[0.1em] uppercase px-2 py-1 backdrop-blur-sm">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="font-dm text-muted text-[10px] tracking-[0.15em] uppercase mb-1">
                    {product.brand}
                  </div>
                  <h3 className="font-playfair text-cream text-lg font-semibold mb-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="font-dm text-muted text-[13px] leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="font-playfair text-gold font-bold text-xl">
                      €{product.price.toFixed(2).replace(".", ",")}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className={`flex items-center gap-2 px-4 py-2 font-dm text-[11px] tracking-[0.1em] uppercase transition-all duration-300 ${
                        addedId === product.id
                          ? "bg-gold text-charcoal"
                          : "border border-gold/30 text-gold hover:bg-gold hover:text-charcoal"
                      }`}
                    >
                      {addedId === product.id ? (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          Toegevoegd
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          Toevoegen
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRAND STRIP ──────────────────────────────────────────── */}
      <section className="py-16 bg-charcoal-light border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center gap-3 mb-3 justify-center">
            <div className="w-6 h-px bg-gold" />
            <span className="font-dm text-muted text-[11px] tracking-[0.25em] uppercase">
              Geselecteerde merken
            </span>
            <div className="w-6 h-px bg-gold" />
          </div>
          <div className="flex flex-wrap gap-8 justify-center items-center mt-8">
            {["Reuzel", "American Crew", "Uppercut Deluxe", "Layrite", "Kevin Murphy", "Baxter of California"].map((brand) => (
              <span
                key={brand}
                className="font-playfair text-muted/50 text-lg italic tracking-wide hover:text-gold transition-colors duration-300 cursor-default"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
