"use client";

import Link from "next/link";
import Cutout from "./Cutout";
import { useCart } from "@/context/CartContext";
import { getProduct } from "@/data/products";

const stories = [
  { title: "Saffron honey drizzle", text: "Golden butter melting over croissants.", productId: "saffron-honey", art: ["croissant", "dipper"], bg: "#87d1cc", tilt: "-rotate-3" },
  { title: "Karak chai moment", text: "Cardamom, chai and warm toast.", productId: "karak-chai", art: ["toast", "chai"], bg: "#bdd39e", tilt: "rotate-2 lg:translate-y-6" },
  { title: "Smoked chilli sizzle", text: "A bold butter for eggs and noodles.", productId: "smoked-chilli", art: ["tomato", "chilli"], bg: "#f283ae", tilt: "-rotate-1" },
];

export default function VideoStories() {
  const { addToCart } = useCart();

  return (
    <section id="stories" className="overflow-x-clip">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12 py-20 md:py-32">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-green text-6xl md:text-8xl">Good moments</h2>
          <p className="hand text-4xl text-pink-deep md:pb-2">pinned to our fridge</p>
        </div>
        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stories.map((s) => {
            const product = getProduct(s.productId)!;
            return (
              <li key={s.productId} className={`relative flex flex-col bg-white p-4 pb-6 shadow-paper ${s.tilt} transition-transform duration-300 hover:rotate-0`}>
                <Link href={`/spreads/${s.productId}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden" style={{ background: s.bg }}>
                    <Cutout name={`art/${s.art[0]}`} className="absolute -bottom-[4%] -left-[6%] w-[70%] h-auto -rotate-6" sizes="240px" />
                    <Cutout name={`jars/${s.productId}`} alt={product.name} className="absolute right-[6%] top-[8%] h-[62%] w-auto rotate-6" sizes="220px" />
                    <Cutout name={`art/${s.art[1]}`} className="absolute bottom-[3%] right-[4%] max-h-[40%] max-w-[46%] w-auto h-auto rotate-12" sizes="160px" />
                  </div>
                  <h3 className="hand mt-4 text-4xl">{s.title}</h3>
                  <p className="mt-1 text-lg leading-snug">{s.text}</p>
                </Link>
                <button type="button" className="btn mt-auto w-full" onClick={() => addToCart(product)}>
                  Add {product.name.replace(" Butter", "")}
                </button>
              </li>
            );
          })}
          <li className="relative flex flex-col bg-white p-4 pb-6 shadow-paper rotate-3 lg:translate-y-6 transition-transform duration-300 hover:rotate-0">
            <div className="relative aspect-[4/5] overflow-hidden gingham">
              <Cutout name="jars/raspberry" className="absolute left-[4%] top-[16%] h-[52%] w-auto -rotate-6" sizes="200px" />
              <Cutout name="jars/herb-garlic" className="absolute right-[4%] top-[12%] h-[52%] w-auto rotate-6" sizes="200px" />
              <Cutout name="jars/bourbon" className="absolute bottom-[4%] left-[26%] h-[54%] w-auto" sizes="200px" />
            </div>
            <h3 className="hand mt-4 text-4xl">Unboxing the collection</h3>
            <p className="mt-1 mb-5 text-lg leading-snug">A gift box made for hampers.</p>
            <a className="btn btn-line mt-auto w-full" href="mailto:hello@thedailyspread.ae?subject=Gift%20boxes">
              Ask about gifting
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
