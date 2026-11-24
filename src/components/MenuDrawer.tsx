"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import Cutout from "./Cutout";
import Drawer from "./Drawer";
import { useCart } from "@/context/CartContext";
import { collections, products } from "@/data/products";

const links = [
  { href: "/#shop", label: "All the spreads" },
  { href: "/#process", label: "How we make it" },
  { href: "/#use-everywhere", label: "Ways to use it" },
  { href: "/#stories", label: "Good moments" },
  { href: "/#secrets", label: "Kitchen notes" },
];

export default function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { addToCart } = useCart();
  const pathname = usePathname();

  const openQuiz = () => {
    onClose();
    if (pathname === "/") window.dispatchEvent(new CustomEvent("open-mood-quiz"));
    else window.location.href = "/?open-quiz=true";
  };

  return (
    <Drawer open={open} onClose={onClose} side="left" title="On the menu">
      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <nav aria-label="Main" className="grid gap-1 py-5 border-b-2 border-dashed border-ink/25">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={onClose} className="typed text-lg py-2 hover:text-pink-deep">
              {l.label}
            </Link>
          ))}
          <button type="button" onClick={openQuiz} className="typed text-lg py-2 text-left hover:text-pink-deep">
            Which spread are you?
          </button>
        </nav>

        {collections.map((c) => (
          <section key={c.id} className="pt-6">
            <h3 className="typed text-green">{c.label}</h3>
            <ul className="mt-3 grid gap-2.5">
              {products
                .filter((p) => p.tags.includes(c.tag))
                .map((p) => (
                  <li key={p.id} className="sheet flex items-center gap-3 p-2 pr-3">
                    <Link href={`/spreads/${p.id}`} onClick={onClose} className="flex flex-1 items-center gap-3 min-w-0 group">
                      <span className="grid place-items-center size-14 shrink-0 rounded-sm" style={{ background: p.color }}>
                        <Cutout name={`jars/${p.id}`} className="h-12 w-auto" sizes="48px" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold leading-tight group-hover:text-pink-deep">{p.name}</span>
                        <span className="typed text-sm">AED {p.price}</span>
                      </span>
                    </Link>
                    <button
                      type="button"
                      className="grid place-items-center size-11 rounded-full border-2 border-green text-green hover:bg-green hover:text-card transition-colors"
                      aria-label={`Add ${p.name} to basket`}
                      onClick={() => {
                        onClose();
                        addToCart(p);
                      }}
                    >
                      <Plus className="size-5" />
                    </button>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </Drawer>
  );
}
