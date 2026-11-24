"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { collections, pairings, products } from "@/data/products";

export default function ProductGrid() {
  const [collection, setCollection] = useState("all");
  const [pairing, setPairing] = useState("anything");

  const tag = collections.find((c) => c.id === collection)?.tag;
  const pair = pairings.find((p) => p.id === pairing);
  const shown = products.filter((p) => (!tag || p.tags.includes(tag)) && (!pair || pair.pairsWith.includes(p.id)));
  const reset = () => {
    setCollection("all");
    setPairing("anything");
  };

  return (
    <section id="shop" className="bg-card border-y-2 border-dashed border-ink/20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-12 py-16 md:py-24">
        <h2 className="display text-green text-6xl md:text-8xl">The daily menu</h2>

        <div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by collection">
            {[{ id: "all", label: `All ${products.length}` }, ...collections].map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={collection === c.id}
                onClick={() => setCollection(c.id)}
                className="typed min-h-11 rounded-full border-2 border-green px-4 text-green transition-colors hover:bg-butter aria-pressed:bg-green aria-pressed:text-card"
              >
                {c.label}
              </button>
            ))}
          </div>
          <label className="flex flex-wrap items-baseline gap-x-3 text-xl md:text-2xl">
            <span>I’m having it on</span>
            <select
              value={pairing}
              onChange={(e) => setPairing(e.target.value)}
              className="hand min-h-11 cursor-pointer border-b-2 border-pink-deep bg-transparent pr-2 text-4xl text-pink-deep"
            >
              <option value="anything">anything</option>
              {pairings.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="sr-only" aria-live="polite">
          {shown.length} spreads shown
        </p>
        {shown.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-7">
            {shown.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="mt-10 py-16 text-center">
            <p className="hand text-4xl">Nothing in that corner of the fridge.</p>
            <button type="button" className="btn mt-6" onClick={reset}>
              Show all spreads
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
