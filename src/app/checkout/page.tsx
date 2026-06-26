"use client";

import React, { useState } from "react";
import { useCart, products } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle, CreditCard, ShieldCheck, ShoppingBag, Truck, Gift } from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1); // 1: Info, 2: Delivery, 3: Payment

  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  // Form States
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [emirate, setEmirate] = useState("Dubai");
  const [shippingMethod, setShippingMethod] = useState<"express" | "vip">("express");
  
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [orderPlaced, setOrderPlaced] = useState(false);

  const validateStep1 = () => {
    return email.trim() !== "" && phone.trim() !== "" && fullName.trim() !== "" && address.trim() !== "";
  };

  if (!mounted) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-[#FAF6F2] py-24 px-6 md:px-12 custom-hairline-grid min-h-[75vh] flex flex-col items-center justify-center">
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full border border-brass-gold/30 border-t-brass-gold animate-spin mx-auto" />
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-brass-gold uppercase tracking-[0.3em] block">
                Loading Gateway
              </span>
              <h2 className="font-serif-display text-2xl font-light text-midnight-slate tracking-tight">
                Authenticating Session...
              </h2>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Input Formatters
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedValue.substring(0, 19)); // Max 16 digits + 3 spaces
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
    setCardExpiry(formattedValue.substring(0, 5)); // MM/YY
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCardCvv(value.substring(0, 4));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d+]/g, "");
    setPhone(value.substring(0, 15));
  };

  const shippingCost = shippingMethod === "vip" ? 15 : 0;
  const finalTotal = cartTotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !address || !cardNumber || !cardCvv) {
      alert("Please complete shipping and payment details.");
      return;
    }
    // Trigger unboxing success modal
    setOrderPlaced(true);
  };

  const handleSuccessClose = () => {
    clearCart();
    window.location.href = "/";
  };

  return (
    <>
      <Header />

      <main className="flex-1 bg-[#FAF6F2] py-12 px-6 md:px-12 custom-hairline-grid min-h-[75vh]">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Back Nav */}
          <div className="text-left">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 font-mono text-[10px] font-bold text-midnight-slate/60 hover:text-brass-gold uppercase tracking-widest transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              Return to Cart
            </Link>
          </div>

          {/* Title */}
          <div className="text-left border-b border-midnight-slate/10 pb-6">
            <span className="text-[10px] font-mono font-bold text-brass-gold uppercase tracking-[0.3em] block mb-2">
              Purchase Gateway
            </span>
            <h1 className="font-serif-display text-4xl md:text-5xl font-normal text-midnight-slate tracking-tight">
              Checkout Session
            </h1>
          </div>

          {cart.length === 0 && !orderPlaced ? (
            <div className="py-16 text-center">
              <p className="text-sm text-midnight-slate/60 font-mono uppercase">
                No active selection to checkout.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Fields (Col Span 7) */}
              <div className="lg:col-span-7 space-y-6 text-left">
                
                {/* Step Progress Tracker */}
                <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-midnight-slate/10 shadow-sm flex items-center justify-between font-mono text-[9px] font-bold text-midnight-slate/40 uppercase tracking-widest select-none">
                  <div className={`flex items-center gap-2 ${step >= 1 ? "text-brass-gold font-extrabold" : ""}`}>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[8px] ${step === 1 ? "border-brass-gold bg-brass-gold/10" : "border-current"}`}>1</span>
                    <span>Info</span>
                  </div>
                  <div className={`flex-1 h-[1px] mx-4 ${step >= 2 ? "bg-brass-gold" : "bg-midnight-slate/10"}`} />
                  <div className={`flex items-center gap-2 ${step >= 2 ? "text-brass-gold font-extrabold" : ""}`}>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[8px] ${step === 2 ? "border-brass-gold bg-brass-gold/10" : "border-current"}`}>2</span>
                    <span>Delivery</span>
                  </div>
                  <div className={`flex-1 h-[1px] mx-4 ${step >= 3 ? "bg-brass-gold" : "bg-midnight-slate/10"}`} />
                  <div className={`flex items-center gap-2 ${step >= 3 ? "text-brass-gold font-extrabold" : ""}`}>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[8px] ${step === 3 ? "border-brass-gold bg-brass-gold/10" : "border-current"}`}>3</span>
                    <span>Payment</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      {/* 1. Contact Information */}
                      <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-midnight-slate/10 shadow-sm space-y-5">
                        <h3 className="font-serif-display text-lg font-bold text-midnight-slate border-b border-midnight-slate/10 pb-3 uppercase tracking-wider">
                          01. Contact Details
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono font-bold text-midnight-slate/50 uppercase tracking-widest block">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="chef@thedailyspread.ae"
                              className="w-full p-3 bg-white/60 border border-midnight-slate/15 rounded-xl font-bold text-xs text-midnight-slate focus:border-brass-gold focus:outline-hidden transition-colors"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono font-bold text-midnight-slate/50 uppercase tracking-widest block">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={handlePhoneChange}
                              placeholder="+971 50 123 4567"
                              className="w-full p-3 bg-white/60 border border-midnight-slate/15 rounded-xl font-bold text-xs text-midnight-slate focus:border-brass-gold focus:outline-hidden transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* 2. Shipping Address */}
                      <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-midnight-slate/10 shadow-sm space-y-5">
                        <h3 className="font-serif-display text-lg font-bold text-midnight-slate border-b border-midnight-slate/10 pb-3 uppercase tracking-wider">
                          02. Shipping Address
                        </h3>
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono font-bold text-midnight-slate/50 uppercase tracking-widest block">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              placeholder="Fatma Al Maktoum"
                              className="w-full p-3 bg-white/60 border border-midnight-slate/15 rounded-xl font-bold text-xs text-midnight-slate focus:border-brass-gold focus:outline-hidden transition-colors"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-mono font-bold text-midnight-slate/50 uppercase tracking-widest block">
                                Street Address *
                              </label>
                              <input
                                type="text"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Villa 24, Al Wasl Road"
                                className="w-full p-3 bg-white/60 border border-midnight-slate/15 rounded-xl font-bold text-xs text-midnight-slate focus:border-brass-gold focus:outline-hidden transition-colors"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-mono font-bold text-midnight-slate/50 uppercase tracking-widest block">
                                Apartment / Suite / Unit
                              </label>
                              <input
                                type="text"
                                value={apartment}
                                onChange={(e) => setApartment(e.target.value)}
                                placeholder="Jumeirah 1"
                                className="w-full p-3 bg-white/60 border border-midnight-slate/15 rounded-xl font-bold text-xs text-midnight-slate focus:border-brass-gold focus:outline-hidden transition-colors"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-mono font-bold text-midnight-slate/50 uppercase tracking-widest block">
                                Emirate *
                              </label>
                              <select
                                value={emirate}
                                onChange={(e) => setEmirate(e.target.value)}
                                className="w-full p-3 bg-white/60 border border-midnight-slate/15 rounded-xl font-bold text-xs text-midnight-slate focus:border-brass-gold focus:outline-hidden transition-colors appearance-none cursor-pointer"
                              >
                                <option>Dubai</option>
                                <option>Abu Dhabi</option>
                                <option>Sharjah</option>
                                <option>Ajman</option>
                                <option>Umm Al Quwain</option>
                                <option>Ras Al Khaimah</option>
                                <option>Fujairah</option>
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-mono font-bold text-midnight-slate/50 uppercase tracking-widest block">
                                Country
                              </label>
                              <input
                                type="text"
                                disabled
                                value="United Arab Emirates"
                                className="w-full p-3 bg-midnight-slate/5 border border-midnight-slate/10 rounded-xl font-bold text-xs text-midnight-slate/50"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (validateStep1()) setStep(2);
                          else alert("Please fill in all required contact and shipping details.");
                        }}
                        className="w-full py-4 bg-brass-gold hover:bg-brass-gold-light text-champagne-silk hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        Continue to Delivery
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      {/* 3. Shipping Options */}
                      <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-midnight-slate/10 shadow-sm space-y-5">
                        <h3 className="font-serif-display text-lg font-bold text-midnight-slate border-b border-midnight-slate/10 pb-3 uppercase tracking-wider">
                          03. Shipping Speed
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono select-none">
                          {/* Express */}
                          <div
                            onClick={() => setShippingMethod("express")}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between h-28 ${
                              shippingMethod === "express"
                                ? "border-brass-gold bg-white/70"
                                : "border-brass-gold/20 hover:border-brass-gold"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <Truck className="w-4 h-4 text-brass-gold" />
                              <span className="text-[9px] font-bold text-brass-gold">FREE</span>
                            </div>
                            <div>
                              <span className="text-xs font-bold text-midnight-slate block">DUBAI EXPRESS</span>
                              <span className="text-[8px] text-midnight-slate/50 mt-1 block">DELIVERED IN 24-48 HRS</span>
                            </div>
                          </div>

                          {/* Same Day */}
                          <div
                            onClick={() => setShippingMethod("vip")}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between h-28 ${
                              shippingMethod === "vip"
                                ? "border-brass-gold bg-white/70"
                                : "border-brass-gold/20 hover:border-brass-gold"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <Gift className="w-4 h-4 text-brass-gold" />
                              <span className="text-[9px] font-bold text-midnight-slate">AED 15</span>
                            </div>
                            <div>
                              <span className="text-xs font-bold text-midnight-slate block">VIP SAME-DAY</span>
                              <span className="text-[8px] text-midnight-slate/50 mt-1 block">FRESHLY CHURNED TO ORDER</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-6 py-4 border border-brass-gold/30 hover:bg-brass-gold/5 text-brass-gold font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(3)}
                          className="flex-1 py-4 bg-brass-gold hover:bg-brass-gold-light text-champagne-silk hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-6"
                    >
                      {/* 4. Payment Details */}
                      <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-midnight-slate/10 shadow-sm space-y-5">
                        <div className="flex justify-between items-center border-b border-midnight-slate/10 pb-3">
                          <h3 className="font-serif-display text-lg font-bold text-midnight-slate uppercase tracking-wider">
                            04. Payment Details
                          </h3>
                          <div className="flex gap-2 text-midnight-slate/50">
                            <CreditCard className="w-4 h-4" />
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono font-bold text-midnight-slate/50 uppercase tracking-widest block">
                              Cardholder Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value.toUpperCase())}
                              placeholder="FATMA AL MAKTOUM"
                              className="w-full p-3 bg-white/60 border border-midnight-slate/15 rounded-xl font-bold text-xs text-midnight-slate focus:border-brass-gold focus:outline-hidden transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[9px] font-mono font-bold text-midnight-slate/50 uppercase tracking-widest block">
                              Credit Card Number *
                            </label>
                            <input
                              type="text"
                              required
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              placeholder="•••• •••• •••• ••••"
                              className="w-full p-3 bg-white/60 border border-midnight-slate/15 rounded-xl font-bold text-xs text-midnight-slate focus:border-brass-gold focus:outline-hidden transition-colors font-mono"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-mono font-bold text-midnight-slate/50 uppercase tracking-widest block">
                                Expiry Date *
                              </label>
                              <input
                                type="text"
                                required
                                value={cardExpiry}
                                onChange={handleExpiryChange}
                                placeholder="MM/YY"
                                className="w-full p-3 bg-white/60 border border-midnight-slate/15 rounded-xl font-bold text-xs text-midnight-slate focus:border-brass-gold focus:outline-hidden transition-colors font-mono"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[9px] font-mono font-bold text-midnight-slate/50 uppercase tracking-widest block">
                                CVV *
                              </label>
                              <input
                                type="password"
                                required
                                value={cardCvv}
                                onChange={handleCvvChange}
                                placeholder="•••"
                                className="w-full p-3 bg-white/60 border border-midnight-slate/15 rounded-xl font-bold text-xs text-midnight-slate focus:border-brass-gold focus:outline-hidden transition-colors font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-6 py-4 border border-brass-gold/30 hover:bg-brass-gold/5 text-brass-gold font-bold text-xs uppercase tracking-widest rounded-xl transition-colors cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-4 bg-brass-gold hover:bg-brass-gold-light text-champagne-silk hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                        >
                          Place Order & Churn
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Right Column: Checkout Summary (Col Span 5) styled as a premium register receipt */}
              <div className="lg:col-span-5 space-y-6">
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
                        <span>ITEMS TOTAL:</span>
                        <span>AED {cartTotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SHIPPING FEE:</span>
                        <span>{shippingCost === 0 ? "FREE" : `AED ${shippingCost}`}</span>
                      </div>
                    </div>

                    <div className="border-t-2 border-dashed border-midnight-slate/30 my-2 pt-3 flex justify-between text-[11px] font-black text-midnight-slate">
                      <span>TOTAL DUE</span>
                      <span className="text-sm font-black">AED {finalTotal}</span>
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

                  {/* Action Submit Button */}
                  <div className="pt-2 border-t border-dashed border-midnight-slate/20">
                    <button
                      type={step === 3 ? "submit" : "button"}
                      onClick={(e) => {
                        if (step === 1) {
                          e.preventDefault();
                          if (validateStep1()) setStep(2);
                          else alert("Please fill in all required contact and shipping details.");
                        } else if (step === 2) {
                          e.preventDefault();
                          setStep(3);
                        }
                      }}
                      className="w-full py-4 bg-brass-gold hover:bg-brass-gold-light text-champagne-silk hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      {step === 1 && "Continue to Delivery"}
                      {step === 2 && "Continue to Payment"}
                      {step === 3 && "Place Order & Churn"}
                    </button>
                  </div>
                </div>

                <div className="p-4 border border-midnight-slate/10 rounded-2xl flex items-center gap-3 text-left">
                  <ShieldCheck className="w-5 h-5 text-brass-gold flex-shrink-0" />
                  <p className="text-[9px] font-mono text-midnight-slate/50 leading-relaxed uppercase">
                    Stripe Secure • 256-bit SSL data encryption • Satisfaction churn guarantee.
                  </p>
                </div>
              </div>

            </form>
          )}

        </div>
      </main>

      {/* Checkout Success Modal Overlay */}
      <AnimatePresence>
        {orderPlaced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-midnight-slate/95 backdrop-blur-lg flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-full max-w-md bg-champagne-silk rounded-[2.5rem] border border-midnight-slate/20 shadow-2xl p-8 text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-brass-gold/15 text-brass-gold flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-8 h-8 text-brass-gold" />
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-mono font-bold text-brass-gold uppercase tracking-[0.3em] block">
                  Success Confirmation
                </span>
                <h2 className="font-serif-display text-3xl font-normal text-midnight-slate tracking-tight">
                  Order Confirmed!
                </h2>
                <p className="text-xs text-midnight-slate/75 leading-relaxed max-w-xs mx-auto">
                  Thank you, **{fullName}**! Your order is being double-whipped at our Dubai kitchen and will be dispatched to:
                </p>
                <div className="p-3 bg-white/40 border border-midnight-slate/5 rounded-xl text-[10px] font-mono text-midnight-slate/60 max-w-xs mx-auto">
                  {address}, {apartment ? `${apartment}, ` : ""}{emirate}, UAE
                </div>
              </div>

              {/* Delivery Box Animation Mockup */}
              <div className="w-40 h-28 bg-[#EBD9C0] border-4 border-[#B89B72] rounded-xl shadow-md mx-auto relative flex flex-col justify-between p-3 overflow-hidden select-none">
                <span className="text-[7px] font-mono font-bold text-[#8A6D43] text-center border-b border-[#8A6D43]/20 pb-1 uppercase tracking-widest">
                  The Daily Spread
                </span>
                <div className="flex justify-center gap-1.5 py-1">
                  <div className="w-5 h-5 rounded-full bg-brass-gold" />
                  <div className="w-5 h-5 rounded-full bg-rose-blush-alt" />
                  <div className="w-5 h-5 rounded-full bg-bag-teal" />
                </div>
                <div className="w-full h-2 bg-[#8A6D43]/20 rounded-full animate-pulse" />
              </div>

              <div className="space-y-3">
                <p className="text-[9px] font-mono text-midnight-slate/40 uppercase tracking-wide leading-relaxed">
                  A receipt and delivery tracking code have been dispatched to **{email}**.
                </p>
                <button
                  onClick={handleSuccessClose}
                  className="w-full py-4 bg-brass-gold hover:bg-brass-gold-light text-champagne-silk hover:text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Return to Home
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
