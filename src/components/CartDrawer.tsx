"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-midnight-slate/60 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#FAF6F2] shadow-2xl flex flex-col border-l border-midnight-slate/10"
          >
            {/* Header */}
            <div className="p-6 border-b border-midnight-slate/10 flex items-center justify-between bg-white/30 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-brass-gold" />
                <h2 className="font-serif-display text-2xl font-bold text-midnight-slate uppercase tracking-wider">
                  Your Spread
                </h2>
                <span className="bg-brass-gold/15 text-brass-gold border border-brass-gold/20 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-midnight-slate/5 text-midnight-slate transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-5">
                  <div className="w-14 h-14 rounded-full bg-brass-gold/10 flex items-center justify-center text-brass-gold">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-midnight-slate">
                      Your selection is empty!
                    </h3>
                    <p className="text-midnight-slate/60 text-xs mt-1.5 leading-relaxed max-w-xs mx-auto">
                      Add some double-whipped artisan spreads or sweet collections to begin.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 bg-midnight-slate hover:bg-brass-gold text-champagne-silk hover:text-midnight-slate border border-transparent font-bold text-xs uppercase tracking-widest rounded-full transition-colors shadow-sm cursor-pointer"
                  >
                    Explore Collections
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-midnight-slate/10 flex gap-4 shadow-sm"
                    >
                      {/* Product Visual Jar stamp */}
                      <div className="relative w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden bg-champagne-silk border border-midnight-slate/5">
                        <div className="w-10 h-10 relative flex items-center justify-center">
                          <svg className="w-full h-full text-brass-gold" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="2.5" />
                            <circle cx="50" cy="50" r="30" fill="transparent" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="50" cy="50" r="14" fill={item.product.color} />
                          </svg>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="font-serif-display font-bold text-midnight-slate leading-tight line-clamp-1">
                              {item.product.name}
                            </h4>
                            <span className="font-bold text-midnight-slate text-xs flex-shrink-0 font-mono">
                              AED {item.product.price * item.quantity}
                            </span>
                          </div>
                          <p className="text-[9px] font-mono text-midnight-slate/40 uppercase tracking-widest mt-0.5">
                            200g Jar • LOT: {item.product.id.substring(0, 4).toUpperCase()}
                          </p>
                        </div>

                        {/* Controls */}
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center border border-midnight-slate/15 rounded-full bg-champagne-silk overflow-hidden scale-90 origin-left">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="p-1 px-2.5 text-midnight-slate hover:bg-midnight-slate/5 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-1.5 text-xs font-mono font-bold text-midnight-slate min-w-[15px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-1 px-2.5 text-midnight-slate hover:bg-midnight-slate/5 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1 text-rose-blush-dark hover:text-rose-blush transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-midnight-slate/10 bg-white/30 backdrop-blur-md space-y-4">
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-midnight-slate/70">
                    <span>SUBTOTAL</span>
                    <span>AED {cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-midnight-slate/70">
                    <span>DUBAI EXPRESS SHP</span>
                    <span className="text-brass-gold font-bold">FREE</span>
                  </div>
                  <div className="border-t border-midnight-slate/10 my-2 pt-2 flex justify-between text-sm font-bold text-midnight-slate">
                    <span>ESTIMATED TOTAL</span>
                    <span>AED {cartTotal}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-4 bg-midnight-slate hover:bg-brass-gold text-champagne-silk hover:text-midnight-slate font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    Proceed to Checkout
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </Link>
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-3 border border-midnight-slate/15 hover:bg-midnight-slate/5 text-midnight-slate font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center"
                  >
                    View Shopping Cart
                  </Link>
                </div>
                <p className="text-center text-[8px] font-mono text-midnight-slate/40 uppercase tracking-widest">
                  Secure Checkout • Stripe payment • Dubai Deliveries Daily
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
