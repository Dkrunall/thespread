"use client";

import { useState } from "react";
import Quantity from "./Quantity";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function AddToBasket({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-7 flex flex-wrap items-center gap-4">
      <Quantity name={product.name} value={quantity} onChange={setQuantity} min={1} />
      <button
        type="button"
        className="btn flex-1 min-w-56"
        onClick={() => {
          addToCart(product, quantity);
          setQuantity(1);
        }}
      >
        Add to basket, AED {product.price * quantity}
      </button>
    </div>
  );
}
