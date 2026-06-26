"use client";

import React, { useState } from "react";
import { useCart, products } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Sparkles, Flame, Coffee, Gift } from "lucide-react";

interface Story {
  id: string;
  title: string;
  description: string;
  productId: string;
  gradient: string;
  icon: React.ReactNode;
  animationType: "honey" | "chai" | "sizzle" | "unboxing";
  btnLabel: string;
}

export default function VideoStories() {
  const { addToCart } = useCart();
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  const stories: Story[] = [
    {
      id: "honey-drizzle",
      title: "Saffron Honey Drizzle",
      description: "Golden butter melting over croissants.",
      productId: "saffron-honey-butter",
      gradient: "from-[#C8A273]/20 via-[#D7B38C]/20 to-[#FAF6F2]",
      icon: <Sparkles className="w-5 h-5 text-brass-gold" />,
      animationType: "honey",
      btnLabel: "Add Saffron Honey",
    },
    {
      id: "chai-moment",
      title: "Karak Chai Moment",
      description: "Cardamom, chai, and warm toast energy.",
      productId: "karak-chai-butter",
      gradient: "from-[#C19A6B]/20 via-[#E9C369]/20 to-[#FAF6F2]",
      icon: <Coffee className="w-5 h-5 text-brass-gold" />,
      animationType: "chai",
      btnLabel: "Add Karak Chai",
    },
    {
      id: "chilli-sizzle",
      title: "Smoked Chilli Sizzle",
      description: "A bold cooking butter for eggs and noodles.",
      productId: "smoked-chilli",
      gradient: "from-[#B83A14]/10 via-[#D96B43]/15 to-[#FAF6F2]",
      icon: <Flame className="w-5 h-5 text-brass-gold" />,
      animationType: "sizzle",
      btnLabel: "Add Smoked Chilli",
    },
    {
      id: "unboxing-spread",
      title: "Unboxing The Collection",
      description: "A giftable carton made for press hampers.",
      productId: "saffron-honey-butter",
      gradient: "from-[#121815]/5 via-[#C8A273]/20 to-[#FAF6F2]",
      icon: <Gift className="w-5 h-5 text-brass-gold" />,
      animationType: "unboxing",
      btnLabel: "Shop Gift Set",
    },
  ];

  const handleStoryAddToCart = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      addToCart(prod, 1);
    }
  };

  return (
    <section id="stories" className="w-full py-20 md:py-28 bg-[#FAF6F2] border-b border-midnight-slate/5 custom-hairline-grid">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        
        {/* Editorial Sub/Title */}
        <span className="text-[10px] font-mono font-bold text-brass-gold uppercase tracking-[0.3em] block mb-3 select-none">
          Visual Editorial
        </span>
        <h2 className="font-serif-display text-4xl md:text-6xl font-normal text-midnight-slate tracking-tight">
          Shop through stories
        </h2>
        <p className="text-midnight-slate/60 max-w-lg mx-auto text-xs mt-3 mb-16 leading-relaxed font-mono">
          Replace these mock cards later with real MP4 videos or embedded Instagram/TikTok reels. Click cards to preview the cinematic concepts.
        </p>

        {/* Stories Horizontal Scrolling Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-center">
          {stories.map((story) => (
            <motion.div
              key={story.id}
              onClick={() => setActiveStory(story)}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="bg-white/40 backdrop-blur-md rounded-3xl border border-midnight-slate/10 p-5 flex flex-col justify-between text-left shadow-sm hover:shadow-editorial transition-all duration-300 cursor-pointer h-[380px] overflow-hidden relative group"
            >
              {/* Vertical Story Video Overlay Visual */}
              <div className={`w-full h-48 rounded-2xl bg-gradient-to-br ${story.gradient} p-4 flex flex-col justify-between border border-midnight-slate/5 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/[0.02]" />
                
                {/* Header Tag */}
                <div className="flex justify-between items-center z-10">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md">
                    {story.icon}
                  </div>
                  <span className="text-[8px] font-mono font-bold text-midnight-slate uppercase tracking-widest bg-white/70 px-2 py-0.5 rounded-full border border-midnight-slate/5">
                    Concept
                  </span>
                </div>

                {/* Big Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-brass-gold text-champagne-silk flex items-center justify-center shadow-lg group-hover:bg-brass-gold-light group-hover:scale-105 transition-all duration-300">
                    <Play className="w-4 h-4 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Video Info Indicator */}
                <div className="text-[8px] font-mono text-midnight-slate/40 font-bold tracking-widest uppercase z-10 pl-1">
                  15 SEC LOOP
                </div>
              </div>

              {/* Story Content & CTA */}
              <div className="mt-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif-display text-xl font-bold text-midnight-slate leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-midnight-slate/75 text-xs mt-1 leading-relaxed line-clamp-2">
                    {story.description}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStoryAddToCart(story.productId);
                  }}
                  className="w-full py-3 bg-brass-gold hover:bg-brass-gold-light text-champagne-silk hover:text-white border border-transparent font-bold rounded-xl text-center text-[10px] uppercase tracking-widest transition-colors shadow-sm cursor-pointer"
                >
                  {story.btnLabel}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Immersive Video Story Player Modal */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-midnight-slate/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setActiveStory(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white hover:text-midnight-slate transition-colors cursor-pointer"
              aria-label="Close story"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-full max-w-3xl bg-champagne-silk rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-midnight-slate/10 h-[480px]"
            >
              {/* Left Column: Customized SVG/CSS Food Animations */}
              <div className={`flex-1 bg-gradient-to-br ${activeStory.gradient} p-8 flex items-center justify-center relative overflow-hidden select-none border-b md:border-b-0 md:border-r border-midnight-slate/10`}>
                <div className="absolute inset-0 bg-champagne-silk/30 backdrop-blur-[1px]" />
                
                {/* Honey Drizzle Animation */}
                {activeStory.animationType === "honey" && (
                  <div className="relative w-64 h-64 flex items-center justify-center z-10">
                    <div className="absolute w-40 h-28 bg-[#E3A069] rounded-[2rem] border-4 border-[#8A5A30] rotate-[-12deg] shadow-md flex flex-col justify-between p-3">
                      <div className="w-20 h-6 bg-[#B57C48] rounded-full mx-auto shadow-inner" />
                      <div className="w-28 h-8 bg-[#C88A52] rounded-full mx-auto" />
                      <div className="w-36 h-10 bg-[#D8995C] rounded-full mx-auto" />
                    </div>
                    <div className="absolute top-12 left-1/2 w-4 h-32 bg-brass-gold rounded-full opacity-90 origin-top animate-[honeyDrip_3s_infinite_ease-in-out]" />
                  </div>
                )}

                {/* Karak Chai Animation */}
                {activeStory.animationType === "chai" && (
                  <div className="relative w-64 h-64 flex items-center justify-center z-10">
                    <div className="absolute w-36 h-32 bg-white border-4 border-midnight-slate rounded-b-[3rem] rounded-t-lg shadow-md flex items-center justify-center">
                      <div className="w-28 h-4 bg-[#C19A6B] rounded-full -translate-y-12" />
                      <Coffee className="w-12 h-12 text-midnight-slate" />
                    </div>
                    <div className="absolute w-12 h-16 border-4 border-l-0 border-midnight-slate rounded-r-3xl right-10 translate-y-1" />
                    <div className="absolute top-8 left-1/3 w-1.5 h-12 bg-midnight-slate/15 rounded-full blur-xs animate-[steamSwirl_2.5s_infinite_ease-in-out]" />
                  </div>
                )}

                {/* Smoked Chili Sizzle Animation */}
                {activeStory.animationType === "sizzle" && (
                  <div className="relative w-64 h-64 flex items-center justify-center z-10">
                    <div className="absolute w-44 h-44 bg-[#222] border-6 border-[#4A4A4A] rounded-full shadow-lg flex items-center justify-center">
                      <div className="absolute w-32 h-32 bg-[#B83A14]/20 rounded-full animate-ping opacity-60" />
                      <div className="w-20 h-16 bg-white rounded-[2rem] shadow-inner relative rotate-[-10deg] flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-brass-gold border border-orange-400 shadow-md animate-bounce" />
                      </div>
                    </div>
                    <div className="absolute w-24 h-6 bg-[#4A4A4A] rounded-full -rotate-45 origin-left -left-6 bottom-4" />
                  </div>
                )}

                {/* Unboxing Animation */}
                {activeStory.animationType === "unboxing" && (
                  <div className="relative w-64 h-64 flex items-center justify-center z-10">
                    <div className="absolute w-36 h-36 bg-[#EBD9C0] border-4 border-[#B89B72] rounded-2xl shadow-lg flex flex-col justify-between p-4 origin-bottom animate-[boxOpen_4s_infinite_ease-in-out]">
                      <span className="font-serif-display text-[8px] font-extrabold text-[#8A6D43] tracking-widest text-center border-b border-[#8A6D43]/20 pb-1">
                        THE SPREAD
                      </span>
                      <div className="flex justify-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-brass-gold border border-orange-300" />
                        <div className="w-6 h-6 rounded-full bg-rose-blush border border-red-300" />
                        <div className="w-6 h-6 rounded-full bg-midnight-slate border border-green-700" />
                      </div>
                    </div>
                    <div className="absolute w-4 h-40 bg-rose-blush opacity-75 animate-pulse" />
                    <div className="absolute w-40 h-4 bg-rose-blush opacity-75 animate-pulse" />
                  </div>
                )}

                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes honeyDrip {
                    0% { transform: scaleY(0); opacity: 0; }
                    50% { transform: scaleY(1); opacity: 0.9; }
                    100% { transform: scaleY(1.2) translateY(20px); opacity: 0; }
                  }
                  @keyframes steamSwirl {
                    0% { transform: translateY(0) scaleX(1); opacity: 0; }
                    50% { transform: translateY(-30px) scaleX(1.2); opacity: 0.8; }
                    100% { transform: translateY(-60px) scaleX(0.8); opacity: 0; }
                  }
                  @keyframes boxOpen {
                    0% { transform: scale(1) rotate(0); }
                    20% { transform: scale(1.05) rotate(-3deg); }
                    40% { transform: scale(1) rotate(0); }
                    60% { transform: scale(1.1) translateY(-10px); }
                    80% { transform: scale(1) translateY(0); }
                    100% { transform: scale(1) rotate(0); }
                  }
                `}} />
              </div>

              {/* Right Column: Audio visual & Product Feature */}
              <div className="md:w-[350px] bg-white p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] font-mono font-bold text-brass-gold uppercase tracking-wider bg-rose-blush/20 px-2 py-0.5 rounded-full">
                    Story Concept
                  </span>
                  <h2 className="font-serif-display text-3xl font-bold text-midnight-slate mt-3 leading-tight">
                    {activeStory.title}
                  </h2>
                  <p className="text-xs text-midnight-slate/80 mt-3 leading-relaxed">
                    A cinematic vertical reel showing the creation, texture, and application of {activeStory.title} in gourmet culinary setups. 
                  </p>
                  <p className="text-[10px] font-mono text-midnight-slate/40 mt-2">
                    In staging, this block contains looping vertical MP4 media files optimized for mobile-first views.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleStoryAddToCart(activeStory.productId);
                      setActiveStory(null);
                    }}
                    className="flex-1 py-3.5 bg-brass-gold hover:bg-brass-gold-light text-champagne-silk hover:text-white border border-transparent font-bold rounded-xl text-center text-[10px] uppercase tracking-widest shadow-sm transition-all cursor-pointer"
                  >
                    Add Product (AED {products.find(p=>p.id === activeStory.productId)?.price})
                  </button>
                  <button
                    onClick={() => setActiveStory(null)}
                    className="py-3.5 px-4 border border-brass-gold/30 hover:bg-brass-gold/5 text-brass-gold font-bold rounded-xl text-center text-xs transition-all cursor-pointer"
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
