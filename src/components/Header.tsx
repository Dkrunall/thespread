"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";
import Logo from "./Logo";
import MenuDrawer from "./MenuDrawer";

export default function Header() {
  const { setIsCartOpen, cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 pointer-events-none">
        <div
          aria-hidden
          className={`absolute inset-x-0 top-0 h-28 backdrop-blur-md transition-opacity duration-300 [mask-image:linear-gradient(#000_55%,transparent)] ${scrolled ? "opacity-100" : "opacity-0"}`}
        />
        <div className="relative flex items-center justify-between px-4 md:px-12 pt-4">
          <button type="button" className="round-btn pointer-events-auto" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
            <Menu className="size-5" />
          </button>
          <Link href="/" aria-label="The Daily Spread, home" className="pointer-events-auto">
            <Logo eager className={`w-auto transition-[height] duration-300 ${scrolled ? "h-16" : "h-20 md:h-28"}`} />
          </Link>
          <button
            type="button"
            className="round-btn pointer-events-auto relative"
            aria-label={`Open basket, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="typed absolute -top-1 -right-1 grid place-items-center min-w-6 h-6 px-1 rounded-full bg-pink text-ink text-sm leading-none">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>
      <MenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer />
    </>
  );
}
