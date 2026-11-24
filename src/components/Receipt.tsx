"use client";

import { useCart } from "@/context/CartContext";

/** Till-receipt summary shared by the basket and checkout pages. */
export default function Receipt({
  lines,
  total,
  children,
}: {
  lines: [label: string, value: string][];
  total: number;
  children: React.ReactNode;
}) {
  const { cart } = useCart();

  return (
    <aside aria-label="Order summary" className="sheet p-6 md:p-7 font-mono lg:sticky lg:top-32">
      <p className="typed text-center text-lg">THE DAILY SPREAD</p>
      <p className="text-center text-sm">Dubai gourmet kitchen, UAE</p>
      <ul className="mt-5 grid gap-2 border-t-2 border-dashed border-ink/30 pt-5">
        {cart.map(({ product, quantity }) => (
          <li key={product.id} className="flex items-baseline gap-2">
            <span className="min-w-0">
              {quantity} x {product.name}
            </span>
            <span aria-hidden className="flex-1 border-b-2 border-dotted border-ink/25" />
            <span className="whitespace-nowrap">AED {product.price * quantity}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-5 grid gap-2 border-t-2 border-dashed border-ink/30 pt-5">
        {lines.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4">
            <dt>{label}</dt>
            <dd className="whitespace-nowrap">{value}</dd>
          </div>
        ))}
        <div className="typed flex justify-between gap-4 text-2xl pt-2">
          <dt>Total</dt>
          <dd className="whitespace-nowrap">AED {total}</dd>
        </div>
      </dl>
      <div className="mt-6 grid gap-3">{children}</div>
    </aside>
  );
}
