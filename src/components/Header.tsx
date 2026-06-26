"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Menu, X, ShoppingBag } from "lucide-react";
import CartDrawer from "./CartDrawer";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const { setIsCartOpen, cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerMoodQuiz = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === "/") {
      window.dispatchEvent(new CustomEvent("open-mood-quiz"));
    } else {
      window.location.href = "/?open-quiz=true";
    }
    setMobileMenuOpen(false);
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 90;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className={`w-full z-40 top-0 left-0 bg-transparent ${pathname === "/" ? "absolute" : "relative"}`}>
        {/* Top Marquee Banner - Primary Green background & White text */}
        <div className="w-full bg-brass-gold py-2.5 overflow-hidden border-b border-brass-gold-light/10 flex items-center select-none">
          <div className="animate-marquee-slow flex whitespace-nowrap text-[10px] font-mono uppercase tracking-[0.25em] text-champagne-silk/90 gap-16">
            <span>The Daily Spread • Dubai-Born Gourmet Spreads</span>
            <span>•</span>
            <span>Est. 2026 • Curated Ingredients Only</span>
            <span>•</span>
            <span>Free Express Shipping in UAE</span>
            <span>•</span>
            <span>Double-Whipped & Small-Batched</span>
            <span>•</span>
            <span>The Daily Spread • Dubai-Born Gourmet Spreads</span>
            <span>•</span>
            <span>Est. 2026 • Curated Ingredients Only</span>
            <span>•</span>
            <span>Free Express Shipping in UAE</span>
            <span>•</span>
            <span>Double-Whipped & Small-Batched</span>
          </div>
        </div>

        {/* Navbar - Floating Glassmorphic bar */}
        <div className="w-full px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300">
          <nav
            className={`w-full max-w-7xl mx-auto px-6 md:px-10 py-4 rounded-full flex justify-between items-center border transition-all duration-500 ${
              isScrolled
                ? "bg-[#F5F6F5]/80 backdrop-blur-md border-[#121815]/10 shadow-editorial"
                : "bg-transparent border-transparent"
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }
              }}
              className="flex select-none group py-1 items-center"
            >
              <Logo className="h-10 md:h-12 w-auto text-brass-gold" />
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-10 font-bold text-midnight-slate text-xs uppercase tracking-widest">
              <Link
                href="/#shop"
                onClick={(e) => scrollToSection(e, "shop")}
                className="hover:text-brass-gold transition-colors relative py-1 group flex flex-col items-center"
              >
                Shop
                <span className="w-1 h-1 rounded-full bg-brass-gold absolute bottom-[-4px] scale-0 group-hover:scale-100 transition-transform duration-300" />
              </Link>
              <Link
                href="/#stories"
                onClick={(e) => scrollToSection(e, "stories")}
                className="hover:text-brass-gold transition-colors relative py-1 group flex flex-col items-center"
              >
                Reels
                <span className="w-1 h-1 rounded-full bg-brass-gold absolute bottom-[-4px] scale-0 group-hover:scale-100 transition-transform duration-300" />
              </Link>
              <Link
                href="/#use-everywhere"
                onClick={(e) => scrollToSection(e, "use-everywhere")}
                className="hover:text-brass-gold transition-colors relative py-1 group flex flex-col items-center"
              >
                Applications
                <span className="w-1 h-1 rounded-full bg-brass-gold absolute bottom-[-4px] scale-0 group-hover:scale-100 transition-transform duration-300" />
              </Link>
              <Link
                href="#"
                onClick={triggerMoodQuiz}
                className="hover:text-brass-gold transition-colors relative py-1 group flex flex-col items-center"
              >
                Mood Quiz
                <span className="w-1 h-1 rounded-full bg-brass-gold absolute bottom-[-4px] scale-0 group-hover:scale-100 transition-transform duration-300" />
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="py-2.5 px-5 bg-brass-gold hover:bg-brass-gold-light text-champagne-silk hover:text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center gap-3 shadow-md active:scale-95 group cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Spread</span>
                <span className="w-5 h-5 rounded-full bg-bag-lime text-midnight-slate text-[10px] flex items-center justify-center font-extrabold transition-transform duration-300 group-hover:scale-110">
                  {cartCount}
                </span>
              </button>

              {/* Mobile Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-midnight-slate hover:bg-midnight-slate/5 rounded-full transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-30 bg-[#FAF6F2]/95 backdrop-blur-lg flex flex-col justify-center items-center gap-8 p-6 pt-24 font-serif-display text-2xl font-bold uppercase tracking-widest text-midnight-slate border-b border-midnight-slate/10 animate-fade-in">
            <Link
              href="/#shop"
              onClick={(e) => scrollToSection(e, "shop")}
              className="hover:text-brass-gold transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/#stories"
              onClick={(e) => scrollToSection(e, "stories")}
              className="hover:text-brass-gold transition-colors"
            >
              Reels
            </Link>
            <Link
              href="/#use-everywhere"
              onClick={(e) => scrollToSection(e, "use-everywhere")}
              className="hover:text-brass-gold transition-colors"
            >
              Applications
            </Link>
            <Link
              href="#"
              onClick={triggerMoodQuiz}
              className="hover:text-brass-gold transition-colors"
            >
              Mood Quiz
            </Link>
          </div>
        )}
      </header>

      {/* Cart Drawer component */}
      <CartDrawer />
    </>
  );
}
