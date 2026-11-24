"use client";

import Link from "next/link";
import Cutout from "@/components/Cutout";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Quantity from "@/components/Quantity";
import Receipt from "@/components/Receipt";
import { useCart } from "@/context/CartContext";

const pairingIdeas: Record<string, string> = {
  "saffron-honey": "pancakes",
  "herb-garlic": "fresh pasta",
  "smoked-chilli": "fried eggs",
  raspberry: "pastries",
};

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const ideas = cart.map((i) => pairingIdeas[i.product.id]).filter(Boolean);

  return (
    <>
      <Header />
      <main className="flex-1 px-5 pt-36 pb-20 md:px-12 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <h1 className="display text-green text-6xl md:text-8xl">Your basket</h1>

          {cart.length === 0 ? (
            <div className="grid justify-items-center gap-6 py-20 text-center">
              <Cutout name="art/toast" className="w-56 h-auto -rotate-6" sizes="224px" />
              <p className="hand text-5xl">Nothing on your toast yet.</p>
              <Link href="/#shop" className="btn">
                See the menu
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_380px]">
              <div>
                <ul className="grid gap-4">
                  {cart.map(({ product, quantity }) => (
                    <li key={product.id} className="sheet flex gap-5 p-4">
                      <Link
                        href={`/spreads/${product.id}`}
                        aria-hidden
                        tabIndex={-1}
                        className="grid w-24 md:w-32 shrink-0 place-items-center rounded-sm py-3"
                        style={{ background: product.color }}
                      >
                        <Cutout name={`jars/${product.id}`} className="h-24 md:h-28 w-auto" sizes="100px" />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                        <div className="flex flex-wrap justify-between gap-x-4">
                          <div>
                            <Link href={`/spreads/${product.id}`} className="text-2xl font-semibold leading-tight hover:text-pink-deep">
                              {product.name}
                            </Link>
                            <p className="font-mono text-ink/75">200g jar, AED {product.price}</p>
                          </div>
                          <p className="typed text-xl whitespace-nowrap">AED {product.price * quantity}</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                          <Quantity name={product.name} value={quantity} onChange={(n) => updateQuantity(product.id, n)} />
                          <button
                            type="button"
                            className="font-mono underline underline-offset-4 py-2 hover:text-pink-deep"
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
                {ideas.length > 0 && (
                  <p className="hand mt-8 text-4xl text-pink-deep">Goes beautifully with {ideas.join(" & ")}.</p>
                )}
              </div>

              <Receipt
                lines={[
                  ["Weight", `${(cartCount * 0.2).toFixed(1)} kg`],
                  ["Dubai express delivery", "Free"],
                ]}
                total={cartTotal}
              >
                <Link href="/checkout" className="btn">
                  Check out
                </Link>
                <Link href="/#shop" className="btn btn-line">
                  Keep shopping
                </Link>
                <p className="text-center text-sm leading-relaxed">Daily dispatch across Dubai. Orders before 2 PM delivered same day.</p>
              </Receipt>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
