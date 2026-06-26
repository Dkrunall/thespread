"use client";

import React, { useState } from "react";
import { useCart, products, Product } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, ShoppingCart, Info } from "lucide-react";

interface Pairing {
  id: string;
  label: string;
  icon: string;
  pairsWith: string[];
}

export default function ProductGrid() {
  const { addToCart } = useCart();
  const [selectedPairing, setSelectedPairing] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const pairings: Pairing[] = [
    {
      id: "toast",
      label: "ON TOAST",
      icon: "🍞",
      pairsWith: ["herb-garlic", "raspberry", "saffron-honey", "karak-chai", "vegan-butter", "peanut-butter"],
    },
    {
      id: "pancakes",
      label: "ON PANCAKES",
      icon: "🥞",
      pairsWith: ["saffron-honey", "chocolate-hazelnut", "raspberry", "karak-chai"],
    },
    {
      id: "pasta",
      label: "IN PASTA",
      icon: "🍝",
      pairsWith: ["herb-garlic", "vegan-garlic-butter", "smoked-chilli"],
    },
    {
      id: "crackers",
      label: "WITH CRACKERS",
      icon: "🍪",
      pairsWith: ["sundried-tomatoes", "date-miso", "herb-garlic", "smoked-chilli"],
    },
    {
      id: "veg",
      label: "ON ROASTED VEG",
      icon: "🥦",
      pairsWith: ["curry-cumin", "herb-garlic", "smoked-chilli", "vegan-garlic-butter"],
    },
  ];

  // Group products by menu categories
  const herbSavory = products.filter((p) => 
    p.id === "herb-garlic" || p.id === "spicy-thai" || p.id === "sundried-tomatoes" || p.id === "curry-cumin"
  );
  
  const sweetIndulgent = products.filter((p) => 
    p.id === "raspberry" || p.id === "chocolate-hazelnut" || p.id === "peanut-butter" || p.id === "date-miso"
  );

  const specialtyCollection = products.filter((p) => 
    p.id === "saffron-honey" || p.id === "karak-chai" || p.id === "vegan-butter" || p.id === "vegan-garlic-butter"
  );

  const saltSmoke = products.filter((p) => 
    p.id === "smoked-chilli" || p.id === "bourbon"
  );

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const isHighlighted = (productId: string) => {
    if (!selectedPairing) return true; // Show normal if no pairing is selected
    const pairing = pairings.find((p) => p.id === selectedPairing);
    return pairing ? pairing.pairsWith.includes(productId) : false;
  };

  return (
    <section id="shop" className="w-full py-20 md:py-28 bg-[#FAF6F2] border-b border-midnight-slate/5 relative custom-hairline-grid">
      
      {/* Slogan Flower Badge "spread a little happiness" (Top Left) */}
      <div className="absolute top-8 left-4 md:left-12 z-20 hidden sm:block rotate-[-12deg]">
        <div className="w-24 h-24 relative flex items-center justify-center text-center">
          <svg className="absolute w-full h-full text-rose-blush/80 drop-shadow-sm" viewBox="0 0 100 100">
            <path
              d="M 50,20 C 45,5 35,5 30,20 C 15,15 15,25 30,35 C 10,40 10,50 30,55 C 15,65 15,75 30,70 C 35,85 45,85 50,70 C 55,85 65,85 70,70 C 85,75 85,65 70,55 C 90,50 90,40 70,35 C 85,25 85,15 70,20 C 65,5 55,5 50,20 Z"
              fill="currentColor"
            />
          </svg>
          <div className="z-10 font-serif-display italic text-[9px] font-extrabold text-midnight-slate leading-tight p-2 select-none">
            spread a <br /> little <br /> happiness ❤️
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-20">
        
        {/* Editorial Title */}
        <div className="text-center space-y-3">
          <span className="text-[10px] font-mono font-bold text-brass-gold uppercase tracking-[0.35em] block">
            Gourmet Catalog
          </span>
          <h2 className="font-serif-display text-4xl md:text-6xl font-normal text-midnight-slate tracking-tight">
            The Daily Menu
          </h2>
          <p className="text-xs font-mono text-midnight-slate/50 max-w-md mx-auto">
            Double-whipped artisan spreads churned daily. Select pairings at the bottom of the menu to highlight matching collections.
          </p>
        </div>

        {/* Collection Section 1: Herb & Savory */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-midnight-slate/10 pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#7E9F65]" />
            <h3 className="font-serif-display text-2xl md:text-3xl font-extrabold text-midnight-slate tracking-tight uppercase">
              Herb & Savory
            </h3>
            <span className="text-[9px] font-mono text-midnight-slate/40 uppercase tracking-widest pl-2">
              Fresh & Fragrant infusions
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {herbSavory.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                idx={idx}
                isDimmed={selectedPairing !== null && !isHighlighted(product.id)}
                isAdded={addedItems[product.id] || false}
                onAdd={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Collection Section 2: Sweet & Indulgent */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-midnight-slate/10 pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-blush" />
            <h3 className="font-serif-display text-2xl md:text-3xl font-extrabold text-midnight-slate tracking-tight uppercase">
              Sweet & Indulgent
            </h3>
            <span className="text-[9px] font-mono text-midnight-slate/40 uppercase tracking-widest pl-2">
              Sweetened naturally
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {sweetIndulgent.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                idx={idx + 4}
                isDimmed={selectedPairing !== null && !isHighlighted(product.id)}
                isAdded={addedItems[product.id] || false}
                onAdd={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Collection Section 3: Specialty Collection */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-midnight-slate/10 pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-brass-gold" />
            <h3 className="font-serif-display text-2xl md:text-3xl font-extrabold text-midnight-slate tracking-tight uppercase">
              Specialty Collection
            </h3>
            <span className="text-[9px] font-mono text-midnight-slate/40 uppercase tracking-widest pl-2">
              Luxurious & Crafted spreads
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {specialtyCollection.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                idx={idx + 8}
                isDimmed={selectedPairing !== null && !isHighlighted(product.id)}
                isAdded={addedItems[product.id] || false}
                onAdd={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Collection Section 4: Salt & Smoke */}
        <div className="space-y-8">
          <div className="flex items-center gap-4 border-b border-midnight-slate/10 pb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-midnight-slate" />
            <h3 className="font-serif-display text-2xl md:text-3xl font-extrabold text-midnight-slate tracking-tight uppercase">
              Salt & Smoke
            </h3>
            <span className="text-[9px] font-mono text-midnight-slate/40 uppercase tracking-widest pl-2">
              Bold & smoky accents
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {saltSmoke.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                idx={idx + 12}
                isDimmed={selectedPairing !== null && !isHighlighted(product.id)}
                isAdded={addedItems[product.id] || false}
                onAdd={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* Pairings & Sticky Note Bottom Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-midnight-slate/10 pt-16">
          
          {/* Pairings (Col Span 8) */}
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-brass-gold font-bold uppercase tracking-widest block">
                Gastronomy Pairings
              </span>
              <h3 className="font-serif-display text-2xl font-bold text-midnight-slate">
                The Perfect Pairings
              </h3>
            </div>

            <div className="flex flex-wrap gap-4">
              {pairings.map((pairing) => {
                const isActive = selectedPairing === pairing.id;
                return (
                  <button
                    key={pairing.id}
                    onClick={() => setSelectedPairing(isActive ? null : pairing.id)}
                    className={`py-3 px-5 rounded-2xl border font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? "bg-brass-gold text-champagne-silk border-transparent shadow-md"
                        : "bg-white/40 border-brass-gold/15 text-midnight-slate/70 hover:border-brass-gold hover:text-brass-gold"
                    }`}
                  >
                    <span>{pairing.icon}</span>
                    <span>{pairing.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sticky Post-it Note (Col Span 4) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              whileHover={{ scale: 1.03, rotate: -1 }}
              className="bg-[#FFFCE8] border border-brass-gold/30 p-6 shadow-md -rotate-3 w-64 text-left relative overflow-hidden flex flex-col justify-between h-40 select-none"
            >
              {/* Pin representation */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-rose-blush-dark/50" />
              
              <div className="space-y-1 text-midnight-slate/85 font-mono text-[9px] font-bold uppercase tracking-wider">
                <span>OUR BELIEF</span>
                <span className="h-[1px] bg-midnight-slate/10 block w-10 mt-1" />
              </div>

              <div className="my-auto py-2 text-center">
                <span className="font-serif-display text-midnight-slate font-extrabold text-base leading-snug">
                  WE BELIEVE <br />
                  <span className="font-serif-display font-light italic text-brass-gold text-lg pl-1">
                    butter
                  </span>{" "}
                  MAKES <br />
                  EVERYTHING BETTER ❤️
                </span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

// Product Card Component
interface CardProps {
  product: Product;
  idx: number;
  isDimmed: boolean;
  isAdded: boolean;
  onAdd: (product: Product) => void;
}

function ProductCard({ product, idx, isDimmed, isAdded, onAdd }: CardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const calculatedX = ((y - centerY) / centerY) * -6;
    const calculatedY = ((x - centerX) / centerX) * 6;
    setRotateX(calculatedX);
    setRotateY(calculatedY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setShowInfo(false);
  };

  return (
    <motion.div
      layout
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`,
        transition: "transform 0.15s ease-out, box-shadow 0.3s ease, opacity 0.4s ease, border-color 0.4s ease",
        opacity: isDimmed ? 0.35 : 1,
        borderColor: isHovered && !isDimmed ? product.color : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bg-white/40 backdrop-blur-md rounded-3xl p-6 flex flex-col justify-between text-left shadow-sm hover:shadow-editorial-hover relative overflow-hidden group select-none h-[420px] border ${
        !isDimmed && !isDimmed
          ? "border-midnight-slate/10"
          : "border-brass-gold/50 shadow-[0_0_15px_rgba(7, 116, 91, 0.25)]"
      }`}
    >
      {/* Subtle product-colored ambient blur blob inside the card */}
      <div 
        className="absolute bottom-[-15%] right-[-10%] w-40 h-40 rounded-full blur-[45px] pointer-events-none opacity-15 transition-all duration-500 group-hover:scale-120 group-hover:opacity-30"
        style={{ backgroundColor: product.color }}
      />

      {/* Glowing corner line when highlighted by pairing */}
      {!isDimmed && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brass-gold/15 to-transparent rounded-bl-full pointer-events-none" />
      )}

      {/* Header Stamp SVG */}
      <div className="flex justify-between items-start mb-6 z-10 relative">
        <div className="w-12 h-12 relative flex items-center justify-center">
          <svg className="w-full h-full transition-colors duration-300" style={{ color: product.color }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="38" fill="transparent" stroke="currentColor" strokeWidth="1" strokeDasharray="4,3" />
            <circle cx="50" cy="50" r="30" fill="transparent" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="12" fill={product.color} opacity="0.85" />
            <circle cx="50" cy="50" r="4" fill="#121815" />
          </svg>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[8px] font-mono text-midnight-slate/40 uppercase tracking-widest leading-none">
            LOT: {idx + 101}
          </span>
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="p-1 hover:bg-midnight-slate/5 rounded-full text-midnight-slate/40 hover:text-brass-gold transition-colors cursor-pointer"
            aria-label="Product info"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-4 flex-1 flex flex-col justify-between z-10 relative">
        <div className="relative overflow-hidden flex-1">
          {/* Main Info */}
          <div className={`transition-opacity duration-300 ${showInfo ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <h4 className="font-serif-display text-2xl font-bold text-midnight-slate leading-snug">
              {product.name}
            </h4>
            <p className="text-midnight-slate/80 text-xs mt-2 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-3">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full font-bold transition-all duration-300"
                  style={{
                    backgroundColor: `${product.color}15`,
                    borderColor: `${product.color}35`,
                    color: product.color,
                    borderWidth: '1px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Specs Sheet */}
          <div className={`absolute inset-0 transition-opacity duration-300 flex flex-col justify-center bg-[#FAF6F2]/10 backdrop-blur-xs font-mono text-[9px] text-midnight-slate/75 space-y-2.5 ${showInfo ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div className="flex justify-between border-b border-midnight-slate/5 pb-1">
              <span>CATEGORY:</span>
              <span className="font-bold font-mono" style={{ color: product.color }}>{product.category.toUpperCase()}</span>
            </div>
            <div className="flex justify-between border-b border-midnight-slate/5 pb-1">
              <span>WEIGHT:</span>
              <span className="font-bold">200G (7.05 OZ)</span>
            </div>
            <div className="flex justify-between border-b border-midnight-slate/5 pb-1">
              <span>SHELF LIFE:</span>
              <span className="font-bold">90 DAYS REFRIGERATED</span>
            </div>
            <div className="flex justify-between border-b border-midnight-slate/5 pb-1">
              <span>FAT CONTENT:</span>
              <span className="font-bold">82% BUTTER FAT</span>
            </div>
          </div>
        </div>

        {/* Footer info: Price & Weight */}
        <div className="flex justify-between items-end pt-3 border-t border-midnight-slate/10 mt-2">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-midnight-slate/40 uppercase tracking-widest leading-none">
              NET CONTENT
            </span>
            <span className="text-xs font-bold text-midnight-slate/70 mt-1 leading-none">
              200g Jar
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[8px] font-mono text-midnight-slate/40 uppercase tracking-widest leading-none">
              RETAIL PRICE
            </span>
            <span className="text-lg font-black text-midnight-slate mt-1 leading-none font-sans">
              AED {product.price}
            </span>
          </div>
        </div>

        {/* Add to Cart button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd(product);
          }}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            backgroundColor: isAdded ? product.color : btnHovered ? product.color : undefined,
            borderColor: isAdded ? `${product.color}60` : undefined,
            color: isAdded ? '#121815' : btnHovered ? '#121815' : undefined,
          }}
          className={`w-full py-3 rounded-full font-bold text-xs uppercase tracking-widest mt-2 flex items-center justify-center gap-2 cursor-pointer transition-all duration-500 ${
            isAdded
              ? "animate-pulse"
              : "bg-midnight-slate text-champagne-silk border border-transparent shadow-sm hover:scale-102 active:scale-98"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3px]" />
              Added to collection
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              Add to selection
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
