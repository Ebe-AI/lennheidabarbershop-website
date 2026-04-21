import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ToastProvider } from "@/context/ToastContext";
import CartDrawer from "@/components/CartDrawer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lenn Heida Barbershop - Heerenveen",
  description:
    "Premium barbershop in Heerenveen. Vakmanschap in elke knip. Knippen, baard trimmen en meer door Lennard Heida.",
  keywords: "barbershop, Heerenveen, knippen, baard, Lennard Heida",
  openGraph: {
    title: "Lenn Heida Barbershop",
    description: "Premium barbershop in Heerenveen. Vakmanschap in elke knip.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-charcoal text-cream antialiased font-dm">
        <CartProvider>
          <ToastProvider>
            <CartDrawer />
            {children}
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
