"use client";

import React, { useState, useEffect } from "react";
import { useCart, products, Product } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, ShoppingCart } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    points: Record<string, number>;
  }[];
}

export default function MoodQuiz() {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); // 0 = start screen
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [recommendation, setRecommendation] = useState<Product | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStep(0);
      setAnswers({});
      setRecommendation(null);
      setIsAdded(false);
    };
    window.addEventListener("open-mood-quiz", handleOpen);

    // Check if query parameter requests opening the quiz
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("open-quiz") === "true") {
        handleOpen();
        // Remove the query parameter from the URL bar cleanly
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }

    return () => window.removeEventListener("open-mood-quiz", handleOpen);
  }, []);

  const quizQuestions: Question[] = [
    {
      id: 1,
      text: "What describes your current vibe?",
      options: [
        {
          text: "Cozy, wrapped in a blanket watching movies",
          points: { "karak-chai-butter": 3, "chocolate-hazelnut": 2 },
        },
        {
          text: "Bold, adventurous, and ready to experiment",
          points: { "date-miso-butter": 3, "spicy-thai": 2, "smoked-chilli": 2 },
        },
        {
          text: "Elegant, luxurious, and treat-yourself style",
          points: { "saffron-honey-butter": 3, "raspberry": 2 },
        },
        {
          text: "Clean, organic, and plant-powered",
          points: { "vegan-butter": 3, "herb-garlic": 2, "peanut-butter": 1 },
        },
      ],
    },
    {
      id: 2,
      text: "What are you planning to spread it on?",
      options: [
        {
          text: "A warm, crusty piece of sourdough toast",
          points: { "saffron-honey-butter": 2, "herb-garlic": 3, "date-miso-butter": 2 },
        },
        {
          text: "Freshly baked croissants or sweet pastries",
          points: { "karak-chai-butter": 2, "chocolate-hazelnut": 3, "raspberry": 2 },
        },
        {
          text: "Stir-fried noodles, rice, or pan-fried eggs",
          points: { "smoked-chilli": 3, "spicy-thai": 3, "herb-garlic": 1 },
        },
        {
          text: "Crackers, apples, or straight off the spoon!",
          points: { "peanut-butter": 3, "vegan-butter": 2, "saffron-honey-butter": 1 },
        },
      ],
    },
    {
      id: 3,
      text: "Choose a flavor profile that speaks to you:",
      options: [
        {
          text: "Sweet, spiced, and warm",
          points: { "karak-chai-butter": 3, "chocolate-hazelnut": 2 },
        },
        {
          text: "Zesty, hot, and savory",
          points: { "smoked-chilli": 3, "spicy-thai": 3 },
        },
        {
          text: "Salty-sweet, umami blend",
          points: { "date-miso-butter": 3, "peanut-butter": 1 },
        },
        {
          text: "Fresh herbs, garlic, and pure dairy goodness",
          points: { "herb-garlic": 3, "vegan-butter": 2 },
        },
      ],
    },
  ];

  const handleAnswer = (points: Record<string, number>) => {
    const newAnswers = { ...answers };
    Object.entries(points).forEach(([prodId, val]) => {
      newAnswers[prodId] = (newAnswers[prodId] || 0) + val;
    });
    setAnswers(newAnswers);

    if (step < quizQuestions.length) {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    if (step === quizQuestions.length + 1) {
      let bestProductId = "saffron-honey-butter";
      let maxPoints = -1;

      Object.entries(answers).forEach(([prodId, val]) => {
        if (val > maxPoints) {
          maxPoints = val;
          bestProductId = prodId;
        }
      });

      const recommendedProduct = products.find((p) => p.id === bestProductId) || products[0];
      setRecommendation(recommendedProduct);
    }
  }, [step]);

  const handleAddRecommendation = () => {
    if (recommendation) {
      addToCart(recommendation, 1);
      setIsAdded(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-midnight-slate/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 22 }}
            className="fixed inset-4 m-auto max-w-xl h-fit max-h-[90vh] bg-[#FAF6F2] rounded-[2rem] border border-midnight-slate/15 shadow-2xl p-6 md:p-8 flex flex-col z-50 overflow-hidden"
          >
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-midnight-slate/5 text-midnight-slate/60 hover:text-brass-gold transition-colors cursor-pointer"
              aria-label="Close quiz"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 py-4 flex flex-col justify-center">
              
              {/* Step 0: Welcome Screen */}
              {step === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-14 h-14 rounded-full bg-brass-gold/15 flex items-center justify-center text-brass-gold mx-auto">
                    <Sparkles className="w-6 h-6 fill-brass-gold" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold text-brass-gold uppercase tracking-widest block mb-2">
                      Sensory Matcher
                    </span>
                    <h2 className="font-serif-display text-3xl md:text-4xl font-normal text-midnight-slate leading-tight">
                      Find Your Spread Vibe
                    </h2>
                    <p className="text-xs text-midnight-slate/75 mt-2.5 max-w-sm mx-auto leading-relaxed">
                      Take our 3-question mood matcher quiz to find the perfect artisan spread for your next culinary occasion.
                    </p>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 py-3.5 bg-brass-gold hover:bg-brass-gold-light text-champagne-silk hover:text-white border border-transparent font-bold text-xs uppercase tracking-widest rounded-full shadow-sm transition-all duration-300"
                  >
                    Start the Assessment
                  </button>
                </motion.div>
              )}

              {/* Steps 1-3: Questions */}
              {step > 0 && step <= quizQuestions.length && (
                <div className="space-y-6">
                  {/* Progress */}
                  <div className="flex justify-between items-center text-[9px] font-mono text-midnight-slate/50 font-bold uppercase tracking-widest">
                    <span>STEP {step} OF {quizQuestions.length}</span>
                    <div className="w-24 h-1 bg-midnight-slate/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brass-gold transition-all duration-300"
                        style={{ width: `${(step / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <h3 className="font-serif-display text-2xl md:text-3xl font-normal text-midnight-slate leading-tight">
                    {quizQuestions[step - 1].text}
                  </h3>

                  <div className="flex flex-col gap-3">
                    {quizQuestions[step - 1].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.01, borderColor: "rgba(7, 116, 91, 0.5)" }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswer(option.points)}
                        className="w-full p-4 border border-midnight-slate/15 text-left rounded-xl text-xs font-bold text-midnight-slate bg-white/40 transition-colors cursor-pointer"
                      >
                        {option.text}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Loading */}
              {step === quizQuestions.length + 1 && !recommendation && (
                <div className="text-center py-12 space-y-4 font-mono text-xs">
                  <div className="w-10 h-10 border-2 border-brass-gold/20 border-t-brass-gold rounded-full animate-spin mx-auto" />
                  <p className="text-[10px] font-bold text-brass-gold uppercase tracking-widest">
                    Matching profiles...
                  </p>
                </div>
              )}

              {/* Result Screen */}
              {step === quizQuestions.length + 1 && recommendation && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-5"
                >
                  <span 
                    className="text-[8px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border transition-colors"
                    style={{ 
                      color: recommendation.color, 
                      backgroundColor: `${recommendation.color}15`, 
                      borderColor: `${recommendation.color}30` 
                    }}
                  >
                    MATCH CONFIRMED
                  </span>

                  <div className="flex flex-col items-center">
                    {/* SVG Gold medallion */}
                    <div className="w-20 h-20 relative flex items-center justify-center mb-3">
                      <svg className="w-full h-full transition-colors duration-300" style={{ color: recommendation.color }} viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="currentColor" strokeWidth="1" strokeDasharray="3,2" />
                        <circle cx="50" cy="50" r="28" fill="transparent" stroke="currentColor" strokeWidth="0.8" />
                        <circle cx="50" cy="50" r="14" fill={recommendation.color} />
                      </svg>
                    </div>

                    <h3 className="font-serif-display text-3xl font-bold text-midnight-slate leading-none">
                      {recommendation.name}
                    </h3>
                    <span className="text-[9px] font-mono text-midnight-slate/50 mt-1 uppercase tracking-widest">
                      AED {recommendation.price} • 200g Gourmet Collection
                    </span>
                  </div>

                  <p className="text-xs text-midnight-slate/75 leading-relaxed max-w-sm mx-auto">
                    We recommend adding **{recommendation.name}** to your table. {recommendation.description}
                  </p>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleAddRecommendation}
                      onMouseEnter={() => setBtnHovered(true)}
                      onMouseLeave={() => setBtnHovered(false)}
                      style={{
                        backgroundColor: isAdded ? recommendation.color : btnHovered ? recommendation.color : undefined,
                        color: isAdded ? '#121815' : btnHovered ? '#121815' : undefined,
                      }}
                      className={`flex-1 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isAdded
                          ? ""
                          : "bg-brass-gold text-champagne-silk hover:bg-brass-gold-light hover:text-white"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3px]" />
                          Added to collection
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          Add matching jar
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-3.5 border border-midnight-slate/15 hover:bg-midnight-slate/5 text-midnight-slate font-bold rounded-xl text-xs uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
