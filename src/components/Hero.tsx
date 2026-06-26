"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Heart, Award, Sparkles, Compass } from "lucide-react";
import Logo from "./Logo";

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tl.fromTo(
      ".hero-eyebrow",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.1 }
    )
    .fromTo(
      ".hero-title",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    )
    .fromTo(
      ".hero-desc",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7 },
      "-=0.5"
    )
    .fromTo(
      ".hero-actions",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.5"
    )
    .fromTo(
      ".hero-floating-left",
      { opacity: 0, x: -30, rotate: -3 },
      { opacity: 1, x: 0, rotate: -2, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(
      ".hero-floating-right",
      { opacity: 0, x: 30, rotate: 3 },
      { opacity: 1, x: 0, rotate: 2, duration: 0.8 },
      "-=0.8"
    );
  }, { scope: containerRef });

  const handleShopScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("shop");
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[90vh] flex flex-col justify-center px-6 md:px-12 py-16 md:py-28 bg-[#FAF6F2] overflow-hidden custom-hairline-grid border-b border-midnight-slate/5"
    >
      {/* Decorative luxury gradient highlights reflecting the custom shopping bag */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-blush/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-[20%] left-[10%] w-[450px] h-[450px] bg-bag-aqua/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] bg-bag-lime/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-brass-gold-light/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[5%] w-[350px] h-[350px] bg-brass-gold/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center space-y-12 relative z-10">
        
        {/* Typography Block */}
        <div className="space-y-6 max-w-4xl">
          <span className="hero-eyebrow inline-block text-[10px] font-mono font-bold text-brass-gold uppercase tracking-[0.35em] border border-brass-gold/30 px-4 py-1.5 rounded-full bg-champagne-silk/60">
            Artisanal Churned Spreads
          </span>
          
          <h1 className="hero-title font-serif-display text-5xl md:text-8xl font-normal text-midnight-slate leading-[1.05] tracking-tight">
            Butter, but make it <br />
            <span className="font-serif-display font-light italic text-brass-gold relative">
              cinematic.
              <span className="absolute left-0 bottom-2 w-full h-[1px] bg-rose-blush-dark/40" />
            </span>
          </h1>

          <p className="hero-desc text-midnight-slate/75 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
            A premium, video-first sensory experience for double-whipped flavored butters, sweet spreads, gifting frames, and curated hampers.
          </p>

          <div className="hero-actions flex justify-center gap-5 items-center pt-2">
            <button
              onClick={handleShopScroll}
              className="py-3.5 px-8 bg-midnight-slate hover:bg-brass-gold text-champagne-silk hover:text-midnight-slate font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-500 shadow-editorial hover:shadow-editorial-hover hover:scale-105 active:scale-95 cursor-pointer"
            >
              Shop the Collection
            </button>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="py-3.5 px-8 border border-midnight-slate/15 hover:border-brass-gold hover:bg-brass-gold/5 text-midnight-slate font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-500 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-midnight-slate text-midnight-slate" />
              Watch Concept Reel
            </button>
          </div>
        </div>

        {/* Floating Offset Showcase Grid */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-6">
          
          {/* Left panel: Apothecary details card */}
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="hero-floating-left w-full max-w-[280px] bg-white/40 backdrop-blur-md rounded-2xl border border-midnight-slate/5 p-6 shadow-editorial text-left -rotate-2 select-none">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-midnight-slate/10 pb-2.5">
                  <span className="text-[9px] font-mono text-midnight-slate/40 uppercase tracking-widest">
                    Apothecary Sheet
                  </span>
                  <span className="text-[9px] font-mono text-brass-gold font-bold">
                    ACTIVE
                  </span>
                </div>
                
                <div className="space-y-3 font-mono text-[10px] text-midnight-slate/80">
                  <div className="flex justify-between">
                    <span className="text-midnight-slate/40">BATCH:</span>
                    <span className="font-bold">#448A-LOCAL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-midnight-slate/40">ORIGIN:</span>
                    <span className="font-bold">DUBAI, UAE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-midnight-slate/40">CHURN RATE:</span>
                    <span className="font-bold">24 BATCH/DAY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-midnight-slate/40">EST. TEMP:</span>
                    <span className="font-bold">21°C COLD</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-midnight-slate/10 pt-3 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-brass-gold" />
                  <span className="text-[9px] font-mono text-midnight-slate/50">
                    Handmade daily since 2026.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Glassmorphic Video Preview Card with rotating Gold Seal badge */}
          <div className="md:col-span-8 flex justify-center md:justify-start">
            <div
              onClick={() => setIsVideoOpen(true)}
              className="hero-floating-right w-full max-w-xl aspect-[1.5] bg-white/20 backdrop-blur-md border border-midnight-slate/10 p-5 rounded-3xl shadow-editorial hover:shadow-editorial-hover transition-all duration-500 cursor-pointer overflow-hidden group rotate-2 relative"
            >
              <div className="w-full h-full bg-midnight-slate rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
                {/* Visual glow backdrop */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brass-gold/10 rounded-full blur-[50px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-blush/10 rounded-full blur-[40px] pointer-events-none" />

                <div className="flex justify-between items-center z-10">
                  <span className="text-champagne-silk/50 text-[9px] font-mono tracking-widest uppercase">
                    Culinary Sensory Reel
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-champagne-silk/10 text-champagne-silk/90 text-[9px] font-mono uppercase tracking-widest">
                    Concept
                  </span>
                </div>

                {/* Center: 3D Logo / Play Trigger */}
                <div className="flex flex-col items-center justify-center py-4 z-10 gap-4">
                  <Logo className="h-20 md:h-24 w-auto filter drop-shadow-md group-hover:scale-105 transition-transform duration-300 text-brass-gold" variant="3d" />
                  <div className="w-10 h-10 rounded-full bg-champagne-silk text-midnight-slate flex items-center justify-center shadow-md group-hover:bg-brass-gold group-hover:scale-110 transition-all duration-300">
                    <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Footer text */}
                <div className="flex justify-between items-end border-t border-champagne-silk/10 pt-4 z-10">
                  <div>
                    <h3 className="font-serif-display text-champagne-silk text-lg font-bold">
                      Butter on Warm Sourdough
                    </h3>
                    <p className="text-champagne-silk/60 text-xs mt-0.5 font-medium">
                      Sensor loop showing double-whipped butter application.
                    </p>
                  </div>
                </div>

                {/* Rotating Circular Gold Seal Badge overlay (Luxurious element) */}
                <div className="absolute top-4 right-4 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-16 h-16 relative flex items-center justify-center">
                    {/* Rotating Text Circle SVG */}
                    <svg
                      className="w-full h-full animate-badge-rotate"
                      viewBox="0 0 100 100"
                    >
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="transparent"
                      />
                      <text className="text-[8px] font-mono uppercase fill-brass-gold font-bold tracking-[0.2em]">
                        <textPath href="#circlePath">
                          • DUBAI SPREADS • HAND CRAFTED DAILY
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-midnight-slate/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white hover:text-midnight-slate transition-colors cursor-pointer"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-full max-w-4xl bg-champagne-silk rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-midnight-slate/10"
            >
              {/* Left Column: Interactive Butter Spread CSS Animation */}
              <div className="flex-1 bg-gradient-to-tr from-brass-gold/10 via-champagne-silk to-rose-blush/10 p-8 flex items-center justify-center min-h-[350px] relative overflow-hidden select-none border-b md:border-b-0 md:border-r border-midnight-slate/10">
                <div className="relative w-64 h-64 flex items-center justify-center">
                  <div className="absolute w-44 h-44 bg-midnight-slate/5 rounded-3xl translate-y-3 blur-md" />
                  
                  {/* Sourdough Slice */}
                  <div className="w-44 h-44 bg-[#DDB088] rounded-3xl border-8 border-[#A26D3F] flex items-center justify-center relative shadow-md overflow-hidden animate-[pulse_3s_infinite_ease-in-out]">
                    <div className="absolute inset-2 border-2 border-dashed border-[#B77F4E] opacity-30 rounded-2xl" />
                    <div className="w-3 h-3 rounded-full bg-[#8A5A30] opacity-20 absolute top-8 left-10" />
                    <div className="w-4 h-4 rounded-full bg-[#8A5A30] opacity-20 absolute bottom-12 right-12" />
                    
                    {/* Steam */}
                    <div className="absolute -top-4 left-1/4 w-1 bg-white/40 h-8 rounded-full blur-xs animate-[bounce_2s_infinite_delay-100]" />
                    <div className="absolute -top-6 left-1/2 w-1.5 bg-white/45 h-10 rounded-full blur-xs animate-[bounce_2.5s_infinite]" />

                    {/* Butter melting (delicious saffron honey butter color) */}
                    <div className="absolute w-24 h-20 bg-[#FFE5A3] rounded-full opacity-90 blur-xs animate-[pulse_2s_infinite_ease-in-out]">
                      <div className="absolute -right-2 top-2 w-8 h-6 bg-[#FFE5A3] rounded-full" />
                      <div className="absolute -left-1 bottom-1 w-6 h-5 bg-[#FFE5A3] rounded-full" />
                    </div>

                    {/* Butter Pat */}
                    <div className="absolute w-12 h-8 bg-[#FFE5A3] rounded-md rotate-12 shadow-sm border border-[#E9C369] flex items-center justify-center animate-[bounce_4s_infinite]">
                      <div className="w-8 h-4 bg-white/40 rounded-sm" />
                    </div>

                    {/* Spreading Knife */}
                    <div className="absolute w-28 h-6 bg-slate-300 rounded-full shadow-md border border-slate-400/50 flex items-center px-2 z-10 origin-right animate-[spin_3s_infinite_ease-in-out]"
                         style={{ 
                           animationName: "spreadKnife", 
                           animationIterationCount: "infinite", 
                           animationDuration: "4s",
                           right: "-10px",
                           top: "60px"
                         }}>
                      <div className="w-16 h-3 bg-slate-100 rounded-full shadow-inner" />
                      <div className="w-12 h-4 bg-[#121815] rounded-sm translate-x-8 shadow-sm border border-black/10" />
                    </div>
                  </div>
                </div>

                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes spreadKnife {
                    0% { transform: translate(-20px, -20px) rotate(-15deg); }
                    25% { transform: translate(10px, 10px) rotate(10deg); }
                    50% { transform: translate(-20px, 0px) rotate(-5deg); }
                    75% { transform: translate(15px, -15px) rotate(15deg); }
                    100% { transform: translate(-20px, -20px) rotate(-15deg); }
                  }
                `}} />
              </div>

              {/* Right Column: Apothecary Product Info */}
              <div className="md:w-[400px] bg-white p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] font-mono font-bold text-brass-gold uppercase tracking-widest">
                    Sensory Reel Block
                  </span>
                  <h2 className="font-serif-display text-3xl font-black text-midnight-slate mt-2 leading-tight">
                    Sourdough & Saffron Honey
                  </h2>
                  <p className="text-sm text-midnight-slate/80 mt-3 leading-relaxed">
                    Watch our double-whipped Saffron Honey Butter melt into fresh-out-of-the-oven, thick-sliced sourdough. 
                  </p>
                  <p className="text-xs text-midnight-slate/50 mt-2 font-mono">
                    Ingredients: Local Organic Cream, Clover Honey, Premium Iranian Saffron.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-midnight-slate/15">
                  <div className="flex items-center gap-3 text-sm font-semibold text-midnight-slate">
                    <Heart className="w-4 h-4 fill-rose-blush text-rose-blush" />
                    <span>Pure Organic Dairy (No Additives)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-midnight-slate">
                    <Award className="w-4 h-4 text-brass-gold fill-brass-gold" />
                    <span>Dubai Food Festival Best Gourmet Entry</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setIsVideoOpen(false);
                      const grid = document.getElementById("shop");
                      if (grid) grid.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex-1 py-3.5 bg-midnight-slate hover:bg-brass-gold text-champagne-silk hover:text-midnight-slate font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                  >
                    View Flavors
                  </button>
                  <button
                    onClick={() => setIsVideoOpen(false)}
                    className="py-3.5 px-6 border border-midnight-slate/15 hover:bg-midnight-slate/5 text-midnight-slate font-bold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
