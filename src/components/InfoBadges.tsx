"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Leaf, Award, Heart } from "lucide-react";

interface Badge {
  label: string;
  sub: string;
  icon: React.ReactNode;
}

export default function InfoBadges() {
  const badges: Badge[] = [
    {
      label: "Small Batched",
      sub: "BATCH NO. 01 TO 24 DAILY",
      icon: <Flame className="w-4 h-4" />,
    },
    {
      label: "Pure Crafting",
      sub: "ZERO PRESERVATIVES ADDED",
      icon: <Leaf className="w-4 h-4" />,
    },
    {
      label: "Real Ingredients",
      sub: "ORGANIC LOCAL DAIRY FARMING",
      icon: <Award className="w-4 h-4" />,
    },
    {
      label: "Whipped With Love",
      sub: "LOCAL DUBAI CONCIERGE CHURN",
      icon: <Heart className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full bg-[#FAF6F2] py-8 border-b border-midnight-slate/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, idx) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ 
                y: -3,
                borderColor: "rgba(200, 162, 115, 0.4)",
                backgroundColor: "rgba(255, 255, 255, 0.7)"
              }}
              className="flex items-center gap-4 p-4 bg-white/30 border border-midnight-slate/10 rounded-2xl transition-all duration-300 shadow-sm"
            >
              <div className="p-2.5 bg-champagne-silk border border-brass-gold/20 text-brass-gold rounded-xl flex items-center justify-center">
                {badge.icon}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-serif-display font-extrabold text-midnight-slate text-sm tracking-tight leading-none">
                  {badge.label}
                </span>
                <span className="text-[8px] font-mono text-midnight-slate/50 font-bold uppercase tracking-wider mt-1.5 leading-none">
                  {badge.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
