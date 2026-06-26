import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const serifFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "The Daily Spread | Dubai-Born Gourmet Flavored Butters & Spreads",
  description: "Butter, but make it cinematic. A fun, video-first shopping experience for flavored butters, sweet spreads, gifting boxes, and press hampers. Small batched with love.",
  keywords: ["gourmet butter", "flavored butter", "Dubai spreads", "saffron honey butter", "karak chai butter", "artisanal butter", "B2C food brand"],
  authors: [{ name: "The Daily Spread" }],
  openGraph: {
    title: "The Daily Spread | Gourmet Flavored Butters & Spreads",
    description: "Butter, but make it cinematic. A fun, video-first shopping experience for flavored butters, sweet spreads, gifting boxes, and press hampers.",
    type: "website",
    locale: "en_AE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-champagne-silk text-midnight-slate font-sans selection:bg-rose-blush selection:text-champagne-silk">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
