"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Compass, Sparkles, ShieldCheck, Check, ArrowRight } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  detailedText: string;
  color: string;
  accentClass: string;
  fact: string;
}

export default function ChurnProcess() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps: ProcessStep[] = [
    {
      number: "01",
      title: "Culturing & Sourcing",
      subtitle: "ORGANIC UAE DAIRY CREAM",
      description: "We source high-fat organic dairy cream from local UAE pasture farms, culturing it slowly for 24 hours.",
      detailedText: "Our culturing process develops a mild, pleasant acidity and rich lactic depth, providing a solid foundation before churning begins.",
      color: "#BCD49A", /* Lime Accent Alternative */
      accentClass: "bg-bag-lime-alt/10 border-bag-lime-alt/25 text-bag-lime-alt",
      fact: "FAT CONTENT: 82% PURE BUTTERFAT",
    },
    {
      number: "02",
      title: "Cold Double-Whipping",
      subtitle: "SIGNATURE CINEMATIC LIFT",
      description: "The butter is slow-churned and double-whipped at precise cold temperatures to trap microscopic air bubbles.",
      detailedText: "This physical lift creates a signature airy texture that allows the butter to melt instantly on warm sourdough.",
      color: "#8BD2CE", /* Light Aqua Alternative */
      accentClass: "bg-bag-aqua-alt/10 border-bag-aqua-alt/25 text-bag-aqua-alt",
      fact: "TEMP CONTROL: 14°C CHURN MAXIMUM",
    },
    {
      number: "03",
      title: "Gourmet Ingredient Folding",
      subtitle: "HAND-INFUSED FLAVOUR PROFILES",
      description: "Organic clover honey, premium Iranian saffron, or garlic cloves are gently folded into the whipped butter.",
      detailedText: "No artificial flavorings or powder chemical fillers. We fold real spices and fresh herbs in small culinary batches.",
      color: "#F587B2", /* Pink Accent Alternative */
      accentClass: "bg-rose-blush-alt/10 border-rose-blush-alt/25 text-rose-blush-alt",
      fact: "100% WHOLE FOOD INFUSIONS ONLY",
    },
    {
      number: "04",
      title: "Apothecary Glass Sealing",
      subtitle: "UV-FILTERED SMALL BATCH JARS",
      description: "Each gourmet spread is poured by hand into custom glass jars and sealed with handwritten batch labels.",
      detailedText: "Jars are batch-coded and dispatched in temperature-controlled boxes within hours of whipping.",
      color: "#04AE97", /* Accent Teal */
      accentClass: "bg-bag-teal/10 border-bag-teal/25 text-bag-teal",
      fact: "BATCH MAXIMUM: 24 JARS PER CHURN",
    },
  ];

  return (
    <section id="process" className="w-full py-20 md:py-28 bg-[#FAF6F2] border-b border-midnight-slate/5 relative custom-hairline-grid select-none">
      {/* Dynamic ambient background blobs mirroring the active step */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full blur-[130px] opacity-15 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: steps[activeStep].color }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-16 max-w-2xl">
          <span className="text-[10px] font-mono font-bold text-brass-gold uppercase tracking-[0.35em] block">
            Inside the Kitchen
          </span>
          <h2 className="font-serif-display text-4xl md:text-6xl font-normal text-midnight-slate tracking-tight">
            How we churn the spread
          </h2>
          <p className="text-xs font-mono text-midnight-slate/50 leading-relaxed uppercase">
            A small-batch double-whipping method designed for instant melting, aromatic infusion, and cinematic spreadability. Click steps to inspect.
          </p>
        </div>

        {/* Interactive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Inspector Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/45 backdrop-blur-md rounded-[2.5rem] border border-midnight-slate/10 p-8 shadow-editorial relative overflow-hidden flex flex-col justify-between min-h-[380px] md:min-h-[440px]">
              
              {/* Medallion Outline Graphic in Step Color */}
              <div className="absolute top-6 right-6 w-16 h-16 pointer-events-none opacity-20">
                <svg className="w-full h-full transition-colors duration-500" style={{ color: steps[activeStep].color }} viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="50" r="36" fill="transparent" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
                  <circle cx="50" cy="50" r="10" fill="currentColor" />
                </svg>
              </div>

              {/* Inspector Content */}
              <div className="space-y-6 text-left">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-brass-gold uppercase tracking-widest bg-brass-gold/10 px-3 py-1 rounded-full border border-brass-gold/20">
                    STAGE {steps[activeStep].number}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif-display text-3xl font-bold text-midnight-slate leading-none">
                    {steps[activeStep].title}
                  </h3>
                  <span className="text-[9px] font-mono text-midnight-slate/50 uppercase tracking-widest block font-black">
                    {steps[activeStep].subtitle}
                  </span>
                </div>

                <p className="text-xs text-midnight-slate/85 leading-relaxed font-medium">
                  {steps[activeStep].description}
                </p>

                <p className="text-xs text-midnight-slate/60 leading-relaxed italic border-l-2 border-brass-gold/20 pl-4 py-1">
                  {steps[activeStep].detailedText}
                </p>
              </div>

              {/* Bottom Spec Badge */}
              <div className="border-t border-midnight-slate/10 pt-6 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[9px] text-midnight-slate/60 font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-brass-gold" />
                  <span>{steps[activeStep].fact}</span>
                </div>
                <div className="flex items-center gap-1.5 text-brass-gold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>CRAFTED DAILY</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Step Cards Selector */}
          <div className="lg:col-span-7 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none ${
                    isActive
                      ? "bg-white border-brass-gold shadow-md translate-x-1.5"
                      : "bg-white/40 border-midnight-slate/10 hover:border-brass-gold/30 hover:bg-white/70"
                  }`}
                >
                  <div className="flex items-center gap-5 text-left">
                    <span
                      className={`font-mono text-xl font-bold px-3 py-1.5 rounded-xl border flex items-center justify-center transition-all ${
                        isActive
                          ? step.accentClass
                          : "bg-champagne-silk border-midnight-slate/10 text-midnight-slate/40"
                      }`}
                    >
                      {step.number}
                    </span>

                    <div>
                      <h4 className="font-serif-display text-lg font-bold text-midnight-slate leading-none">
                        {step.title}
                      </h4>
                      <p className="text-[10px] font-mono text-midnight-slate/50 uppercase tracking-widest mt-1.5 font-bold">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {isActive ? (
                      <span className="w-6 h-6 rounded-full bg-brass-gold text-champagne-silk flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-midnight-slate/30 group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
