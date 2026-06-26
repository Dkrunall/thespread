"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle, Sparkles } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function ServingSecrets() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: "TEMPERATURE SECRETS",
      question: "Why should double-whipped butter be served at 21°C room temperature?",
      answer: "Whipped butter contains microscopic air pockets. When chilled, these fats contract and tighten. Leaving the jar at room temperature (21°C) for 15-20 minutes allows the air bubbles to expand, releasing aromatic flavor molecules and creating an effortless, creamy spreadability.",
    },
    {
      category: "SHELF LIFE",
      question: "How long do the artisanal spreads remain fresh?",
      answer: "We churn in small batches and add zero chemical preservatives. Sealed jars stay fresh for up to 90 days refrigerated, or up to 6 months frozen. Once opened, we recommend enjoying within 3 weeks for peak sensory flavor.",
    },
    {
      category: "INGREDIENTS & SUSTAINABILITY",
      question: "Are the butterfat and ingredients sourced locally in the UAE?",
      answer: "Yes! Our high-fat organic dairy base is sourced from premium pasture-fed cows here in the UAE. For flavor infusions, we source organic local herbs, while specialty items like our premium saffron are imported directly from artisan growers in Iran.",
    },
    {
      category: "DIETARY CHOICES",
      question: "Do you offer plant-based or dairy-free spread options?",
      answer: "Absolutely. We offer custom plant-based options including our 'Vegan Butter' (made from cold-pressed olive oils, organic coconut butter, and cashew milk) and 'Vegan Garlic Butter'. Look for the Vegan section on our Daily Menu.",
    },
    {
      category: "UAE EXPRESS SHIPPING",
      question: "How are delivery temperature constraints managed during UAE shipping?",
      answer: "All orders are hand-batched, labeled, and packed inside custom insulated thermal bags with cold gel packs. Our express delivery courier vehicles are fully temperature-controlled, guaranteeing your jars arrive chilled and ready.",
    },
  ];

  return (
    <section id="secrets" className="w-full py-20 md:py-28 bg-[#FAF6F2] border-b border-midnight-slate/5 relative custom-hairline-grid select-none">
      {/* Decorative accent background glows */}
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-bag-lime-alt/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-rose-blush-alt/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] font-mono font-bold text-brass-gold uppercase tracking-[0.35em] block">
            Gourmet Knowledge
          </span>
          <h2 className="font-serif-display text-4xl md:text-5xl font-normal text-midnight-slate tracking-tight">
            Serving secrets & FAQ
          </h2>
          <p className="text-xs font-mono text-midnight-slate/50 max-w-md mx-auto leading-relaxed">
            Everything you need to know about double-whipped storage, local dairy sourcing, and express shipping across the UAE.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white/45 backdrop-blur-md rounded-2xl border border-midnight-slate/10 overflow-hidden shadow-sm transition-all duration-300 hover:border-brass-gold/30"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 md:p-6 flex items-center justify-between gap-6 cursor-pointer text-left focus:outline-hidden"
                >
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[8px] font-mono text-brass-gold font-bold uppercase tracking-widest block">
                      {faq.category}
                    </span>
                    <h3 className="font-serif-display text-base md:text-lg font-bold text-midnight-slate leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isOpen 
                      ? "bg-brass-gold text-champagne-silk rotate-180" 
                      : "bg-champagne-silk text-midnight-slate/60 hover:bg-brass-gold/10 hover:text-brass-gold"
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {/* Accordion Expandable Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-7 text-xs text-midnight-slate/75 leading-relaxed font-medium border-t border-midnight-slate/5 pt-4 space-y-4">
                        <p>{faq.answer}</p>
                        
                        <div className="flex items-center gap-2 font-mono text-[9px] text-brass-gold/80 font-bold uppercase tracking-wider bg-brass-gold/5 border border-brass-gold/10 px-3 py-1.5 rounded-lg w-fit">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>CULINARY NOTE: SERVE AT ROOM TEMP</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
