"use client";

import Link from "next/link";
import Cutout from "./Cutout";
import Drawer from "./Drawer";
import Quantity from "./Quantity";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();
  const close = () => setIsCartOpen(false);

  return (
    <Drawer open={isCartOpen} onClose={close} side="right" title="Your basket">
      {cart.length === 0 ? (
        <div className="flex-1 grid place-content-center justify-items-center text-center gap-5 px-8">
          <Cutout name="art/toast" className="w-44 h-auto -rotate-6" sizes="180px" />
          <p className="hand text-4xl">Nothing on your toast yet.</p>
          <button type="button" className="btn" onClick={close}>
            Keep browsing
          </button>
        </div>
      ) : (
        <>
          <ul className="flex-1 overflow-y-auto p-5 grid gap-3 content-start">
            {cart.map(({ product, quantity }) => (
              <li key={product.id} className="sheet flex gap-4 p-3">
                <span className="grid place-items-center w-20 shrink-0 rounded-sm" style={{ background: product.color }}>
                  <Cutout name={`jars/${product.id}`} className="h-20 w-auto" sizes="70px" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-3">
                    <Link href={`/spreads/${product.id}`} onClick={close} className="font-semibold leading-tight hover:text-pink-deep">
                      {product.name}
                    </Link>
                    <span className="typed whitespace-nowrap">AED {product.price * quantity}</span>
                  </div>
                  <p className="font-mono text-sm text-ink/75">200g jar</p>
                  <div className="mt-2 flex items-center justify-between">
                    <Quantity name={product.name} value={quantity} onChange={(n) => updateQuantity(product.id, n)} />
                    <button
                      type="button"
                      className="font-mono text-sm underline underline-offset-4 py-2 hover:text-pink-deep"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => removeFromCart(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-5 border-t-2 border-dashed border-ink/25 font-mono">
            <div className="flex justify-between">
              <span>Dubai express delivery</span>
              <span>Free</span>
            </div>
            <div className="typed flex justify-between text-xl mt-1 mb-4">
              <span>Total</span>
              <span>AED {cartTotal}</span>
            </div>
            <div className="grid gap-2.5">
              <Link href="/checkout" onClick={close} className="btn">
                Check out
              </Link>
              <Link href="/cart" onClick={close} className="btn btn-line">
                View basket
              </Link>
            </div>
          </div>
        </>
      )}
    </Drawer>
  );
}
