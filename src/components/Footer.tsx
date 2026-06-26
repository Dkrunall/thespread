"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full bg-brass-gold text-champagne-silk py-16 md:py-24 relative overflow-hidden select-none border-t border-brass-gold-light/10">
      {/* Decorative blurred background blobs */}
      <div className="absolute top-[20%] left-[-5%] w-[350px] h-[350px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[300px] h-[300px] bg-rose-blush/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center space-y-8 md:space-y-12 relative z-10">
        
        {/* Scroll To Top Button */}
        <button
          onClick={handleScrollToTop}
          className="p-3.5 bg-champagne-silk text-brass-gold hover:bg-bag-lime hover:text-midnight-slate rounded-full transition-all duration-300 shadow-lg hover:-translate-y-1 cursor-pointer active:scale-95 group border border-brass-gold/20"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
        </button>

        {/* Brand Logo */}
        <div className="space-y-4 flex flex-col items-center">
          <Logo className="h-12 md:h-16 w-auto text-champagne-silk" variant="flat" />
          
          <p className="text-champagne-silk/75 text-xs md:text-sm font-mono tracking-widest uppercase max-w-3xl leading-relaxed">
            Launching soon in Dubai • Video-first shopping • Gifting • Retail • Online
          </p>
        </div>

        {/* Email with Gold decoration */}
        <div className="space-y-2 pt-4">
          <span className="text-[9px] font-mono text-champagne-silk/40 uppercase tracking-widest block font-bold">
            Got questions? Drop us a line
          </span>
          <a
            href="mailto:hello@thedailyspread.ae"
            className="font-serif-display text-xl md:text-3xl font-black text-bag-lime hover:text-bag-aqua transition-colors underline decoration-1 decoration-bag-lime/30 underline-offset-8"
          >
            hello@thedailyspread.ae
          </a>
        </div>

        {/* Social Icons & Legal Footer */}
        <div className="w-full border-t border-champagne-silk/10 pt-8 md:pt-12 flex flex-col sm:flex-row justify-between items-center gap-6 text-[9px] font-mono text-champagne-silk/40 font-bold uppercase tracking-widest">
          
          {/* Social icons */}
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-champagne-silk/15 hover:border-bag-lime hover:text-bag-lime flex items-center justify-center transition-colors"
              aria-label="Follow on Instagram"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-champagne-silk/15 hover:border-bag-lime hover:text-bag-lime flex items-center justify-center transition-colors"
              aria-label="Follow on TikTok"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.59 4.23.95 1.2 2.27 2.04 3.74 2.41V9.9c-1.24-.07-2.47-.46-3.54-1.14-.94-.59-1.72-1.42-2.26-2.41v8.52c-.03 1.21-.36 2.4-.98 3.44a6.6 6.6 0 0 1-2.67 2.65c-1.21.66-2.58.98-3.96.93a6.83 6.83 0 0 1-5.11-2.48c-.76-.89-1.28-1.97-1.52-3.11a7.1 7.1 0 0 1 .46-4.52c.6-1.34 1.63-2.46 2.92-3.18 1.15-.65 2.46-.98 3.78-.96.02 1.4-.01 2.8.01 4.2-.67-.04-1.35.09-1.95.42a2.82 2.82 0 0 0-1.34 1.76c-.22.76-.14 1.57.22 2.27.37.7 1.01 1.23 1.76 1.48.68.22 1.42.16 2.06-.18.66-.35 1.18-.94 1.46-1.64.08-.28.12-.57.12-.86v-14.8h.01Z" />
              </svg>
            </a>
          </div>

          <div>
            © {new Date().getFullYear()} The Spread Ltd. All rights reserved.
          </div>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-bag-lime transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-bag-lime transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
