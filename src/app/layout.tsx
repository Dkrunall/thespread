import type { Metadata } from "next";
import { Courier_Prime, Fraunces, Reenie_Beanie } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--ff-serif",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const type = Courier_Prime({
  subsets: ["latin"],
  variable: "--ff-type",
  display: "swap",
  weight: ["400", "700"],
});

const hand = Reenie_Beanie({
  subsets: ["latin"],
  variable: "--ff-hand",
  display: "swap",
  weight: "400",
});

const description =
  "Butter, but make it cinematic. Double-whipped flavored butters and sweet spreads, made in small batches in Dubai.";

export const metadata: Metadata = {
  title: "The Daily Spread | Dubai-Born Gourmet Flavored Butters & Spreads",
  description,
  keywords: ["gourmet butter", "flavored butter", "Dubai spreads", "saffron honey butter", "karak chai butter", "artisanal butter", "B2C food brand"],
  authors: [{ name: "The Daily Spread" }],
  openGraph: {
    title: "The Daily Spread | Gourmet Flavored Butters & Spreads",
    description,
    type: "website",
    locale: "en_AE",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${serif.variable} ${type.variable} ${hand.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col selection:bg-pink selection:text-ink">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
