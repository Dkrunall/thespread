"use client";

import React from "react";
import { useCart, products } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Find pairing ideas for items currently in cart
  const getCartPairings = () => {
    const pairingsList: string[] = [];
    cart.forEach((item) => {
      if (item.product.id === "saffron-honey" && !pairingsList.includes("Pancakes")) pairingsList.push("Pancakes");
      if (item.product.id === "herb-garlic" && !pairingsList.includes("Fresh Pasta")) pairingsList.push("Fresh Pasta");
      if (item.product.id === "smoked-chilli" && !pairingsList.includes("Frying Eggs")) pairingsList.push("Frying Eggs");
      if (item.product.id === "raspberry" && !pairingsList.includes("Pastries")) pairingsList.push("Pastries");
    });
    return pairingsList;
  };

  const pairings = getCartPairings();

  if (!mounted) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-[#FAF6F2] py-24 px-6 md:px-12 custom-hairline-grid min-h-[70vh] flex flex-col items-center justify-center">
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full border border-brass-gold/30 border-t-brass-gold animate-spin mx-auto" />
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-brass-gold uppercase tracking-[0.3em] block">
                Loading Registry
              </span>
              <h2 className="font-serif-display text-2xl font-light text-midnight-slate tracking-tight">
                Preparing Selection...
              </h2>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <main className="flex-1 bg-[#FAF6F2] py-12 px-6 md:px-12 custom-hairline-grid min-h-[70vh]">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Back Navigation */}
          <div className="text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-[10px] font-bold text-midnight-slate/60 hover:text-brass-gold uppercase tracking-widest transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Back to Collections
            </Link>
          </div>

          {/* Heading */}
          <div className="text-left border-b border-midnight-slate/10 pb-6">
            <span className="text-[10px] font-mono font-bold text-brass-gold uppercase tracking-[0.3em] block mb-2">
              Cart Directory
            </span>
            <h1 className="font-serif-display text-4xl md:text-5xl font-normal text-midnight-slate tracking-tight">
              Review Selection
            </h1>
          </div>

          {cart.length === 0 ? (
            /* Empty State */
            <div className="py-20 text-center space-y-6 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-midnight-slate/10 p-8">
              <div className="w-16 h-16 rounded-full bg-brass-gold/15 flex items-center justify-center text-brass-gold mx-auto">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif-display text-2xl font-bold text-midnight-slate">
                  Your jar is empty
                </h3>
                <p className="text-xs text-midnight-slate/60 max-w-xs mx-auto leading-relaxed">
                  Browse our collections and select some double-whipped gourmet spreads to begin your culinary session.
                </p>
              </div>
              <Link
                href="/"
                className="inline-block px-8 py-3.5 bg-midnight-slate hover:bg-brass-gold text-champagne-silk hover:text-midnight-slate font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300"
              >
                Browse Flavors
              </Link>
            </div>
          ) : (
            /* Cart Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Cart items table (Col Span 8) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white/45 backdrop-blur-md rounded-3xl border border-midnight-slate/10 overflow-hidden shadow-sm">
                  {/* Table Header - Desktop */}
                  <div className="hidden sm:grid grid-cols-12 gap-4 p-6 bg-white/20 border-b border-midnight-slate/10 font-mono text-[9px] text-midnight-slate/50 font-bold uppercase tracking-widest">
                    <div className="col-span-6">Spread product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-right">Total</div>
                  </div>

                  {/* Table Rows */}
                  <div className="divide-y divide-midnight-slate/10">
                    {cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-4 p-6 items-center"
                      >
                        {/* Product info (Col Span 6) */}
                        <div className="col-span-6 flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-xl bg-champagne-silk border border-midnight-slate/5 flex items-center justify-center flex-shrink-0">
                            <svg className="w-8 h-8 text-brass-gold" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="2.5" />
                              <circle cx="50" cy="50" r="14" fill={item.product.color} />
                            </svg>
                          </div>
                          <div className="text-left">
                            <h4 className="font-serif-display font-bold text-midnight-slate text-base leading-tight">
                              {item.product.name}
                            </h4>
                            <span className="text-[9px] font-mono text-midnight-slate/40 uppercase tracking-wider block mt-0.5">
                              200g Jar • LOT: {item.product.id.substring(0, 4).toUpperCase()}
                            </span>
                          </div>
                        </div>

                        {/* Unit Price (Col Span 2) */}
                        <div className="col-span-2 text-left sm:text-center">
                          <span className="sm:hidden text-[9px] font-mono text-midnight-slate/40 uppercase block mb-1">Price:</span>
                          <span className="font-mono text-xs text-midnight-slate/85 font-bold">AED {item.product.price}</span>
                        </div>

                        {/* Quantity controls (Col Span 2) */}
                        <div className="col-span-2 flex justify-start sm:justify-center">
                          <div className="flex items-center border border-midnight-slate/15 rounded-full bg-champagne-silk overflow-hidden scale-90">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 px-2.5 text-midnight-slate hover:bg-midnight-slate/5 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-1.5 text-xs font-mono font-bold text-midnight-slate min-w-[15px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 px-2.5 text-midnight-slate hover:bg-midnight-slate/5 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Total Price & Delete (Col Span 2) */}
                        <div className="col-span-2 flex justify-between sm:justify-end items-center gap-4">
                          <div className="text-right sm:w-full">
                            <span className="sm:hidden text-[9px] font-mono text-midnight-slate/40 uppercase block mb-1">Total:</span>
                            <span className="font-mono text-xs text-midnight-slate font-extrabold">AED {item.product.price * item.quantity}</span>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-1.5 text-rose-blush-dark hover:text-rose-blush transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>

                {/* Gastronomy Pairing Notes (Interactive Cross-sells) */}
                {pairings.length > 0 && (
                  <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 border border-brass-gold/20 flex gap-4 text-left items-start">
                    <div className="p-2.5 bg-brass-gold/15 text-brass-gold rounded-xl flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 fill-brass-gold" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif-display font-bold text-midnight-slate text-sm">
                        Table Recommendations
                      </h4>
                      <p className="text-[11px] text-midnight-slate/75 leading-relaxed">
                        Your selection pairs beautifully with **{pairings.join(" & ")}**. Add a fresh bakery item or pastry to complete the tasting session.
                      </p>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column: Checkout Summary (Col Span 4) styled as a premium register receipt */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#FAF8F5] border border-dashed border-midnight-slate/30 p-6 md:p-8 shadow-md relative overflow-hidden flex flex-col space-y-6 text-left rounded-sm">
                  {/* Jagged top edge design effect */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-midnight-slate/10 via-transparent to-transparent bg-[length:10px_4px] bg-repeat-x" />
                  
                  {/* Receipt Header */}
                  <div className="text-center space-y-2 border-b border-dashed border-midnight-slate/20 pb-4 font-mono">
                    <span className="text-[11px] font-black tracking-widest text-midnight-slate block">
                      THE DAILY SPREAD
                    </span>
                    <span className="text-[8px] text-midnight-slate/50 block">
                      DUBAI GOURMET KITCHEN • UAE
                    </span>
                    <div className="flex justify-between text-[8px] text-midnight-slate/40 pt-2 uppercase">
                      <span>ORD-NO: #8824102</span>
                      <span>{new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Receipt Line Items (Dotted spacer invoice layout) */}
                  <div className="space-y-3 font-mono text-[9px] text-midnight-slate/85">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-end gap-2">
                        <span className="truncate max-w-[150px]">{item.product.name} (x{item.quantity})</span>
                        <div className="flex-1 border-b border-dotted border-midnight-slate/20 h-1.5" />
                        <span className="font-bold flex-shrink-0">AED {item.product.price * item.quantity}</span>
                      </div>
                    ))}

                    <div className="border-t border-dashed border-midnight-slate/20 my-3 pt-3 space-y-2">
                      <div className="flex justify-between">
                        <span>EST. WEIGHT:</span>
                        <span>{(cartCount * 0.2).toFixed(1)} KG</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DUBAI EXPRESS SHP:</span>
                        <span className="text-brass-gold font-bold">FREE</span>
                      </div>
                    </div>

                    <div className="border-t-2 border-dashed border-midnight-slate/30 my-2 pt-3 flex justify-between text-[11px] font-black text-midnight-slate">
                      <span>TOTAL DUE</span>
                      <span className="text-sm font-black">AED {cartTotal}</span>
                    </div>
                  </div>

                  {/* Barcode Mockup */}
                  <div className="flex flex-col items-center gap-1 border-t border-dashed border-midnight-slate/20 pt-4">
                    <div className="h-8 flex gap-[1.5px] items-center text-midnight-slate/80 select-none">
                      <div className="w-[1px] h-full bg-current" />
                      <div className="w-[2px] h-full bg-current" />
                      <div className="w-[1px] h-full bg-current" />
                      <div className="w-[3px] h-full bg-current" />
                      <div className="w-[1px] h-full bg-current" />
                      <div className="w-[1.5px] h-full bg-current" />
                      <div className="w-[2px] h-full bg-current" />
                      <div className="w-[1px] h-full bg-current" />
                      <div className="w-[3px] h-full bg-current" />
                      <div className="w-[1px] h-full bg-current" />
                      <div className="w-[1px] h-full bg-current" />
                      <div className="w-[2px] h-full bg-current" />
                      <div className="w-[1px] h-full bg-current" />
                    </div>
                    <span className="text-[7px] font-mono tracking-[0.2em] text-midnight-slate/40">
                      * SPREAD THE HAPPINESS *
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2 border-t border-dashed border-midnight-slate/20">
                    <Link
                      href="/checkout"
                      className="w-full py-4 bg-midnight-slate hover:bg-brass-gold text-champagne-silk hover:text-midnight-slate font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/"
                      className="w-full py-3.5 border border-midnight-slate/15 hover:bg-midnight-slate/5 text-midnight-slate font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center"
                    >
                      Keep Shopping
                    </Link>
                  </div>
                </div>

                <div className="bg-[#FFFCE8]/60 p-4 border border-brass-gold/20 rounded-2xl text-[9px] font-mono text-midnight-slate/50 leading-relaxed uppercase text-center">
                  🚚 Daily dispatch across Dubai. Orders before 2 PM delivered same-day.
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
