"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Plus } from "lucide-react";
import Cutout from "./Cutout";
import { useCart } from "@/context/CartContext";
import { productArt, products, type Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [a, b] = productArt[product.id];
  const no = products.findIndex((p) => p.id === product.id) + 1;

  return (
    <article className="group relative">
      <Link href={`/spreads/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm" style={{ background: product.color }}>
          <Cutout
            name={`art/${a}`}
            sizes="(min-width: 1024px) 14vw, 26vw"
            className="absolute -left-[8%] bottom-[4%] w-[46%] h-auto -rotate-12 transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:-rotate-[20deg]"
          />
          <Cutout
            name={`art/${b}`}
            sizes="(min-width: 1024px) 14vw, 26vw"
            className="absolute -right-[10%] top-[6%] w-[42%] h-auto rotate-12 transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-[22deg]"
          />
          <Cutout
            name={`jars/${product.id}`}
            alt={`Jar of ${product.name}`}
            sizes="(min-width: 1024px) 18vw, 34vw"
            className="absolute left-1/2 top-1/2 h-[72%] w-auto max-w-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-[1.04]"
          />
          <span className="typed absolute left-3 top-3 bg-card px-2 py-0.5 text-sm">No. {String(no).padStart(2, "0")}</span>
        </div>
        <h3 className="mt-3 pr-12 text-lg md:text-xl font-semibold leading-tight group-hover:text-pink-deep">{product.name}</h3>
      </Link>
      <p className="typed mt-1 pr-12 min-h-8">AED {product.price}</p>
      <button
        type="button"
        className="absolute right-0 bottom-0 grid place-items-center size-11 rounded-full bg-green text-card hover:bg-green-deep transition-colors"
        aria-label={`Add ${product.name} to basket`}
        onClick={() => {
          addToCart(product);
          setAdded(true);
          setTimeout(() => setAdded(false), 1500);
        }}
      >
        {added ? <Check className="size-5" /> : <Plus className="size-5" />}
      </button>
    </article>
  );
}
