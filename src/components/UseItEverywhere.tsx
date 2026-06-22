"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Utensils, Flame, Sparkles, Gift } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepCard {
  num: string;
  title: string;
  desc: string;
  shadowColor: string;
  icon: React.ReactNode;
}

export default function UseItEverywhere() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const steps: StepCard[] = [
    {
      num: "01",
      title: "Spread",
      desc: "Toast, bagels, croissants, crackers.",
      shadowColor: "shadow-editorial",
      icon: <Utensils className="w-5 h-5" />,
    },
    {
      num: "02",
      title: "Melt",
      desc: "Pasta, noodles, rice, corn, eggs.",
      shadowColor: "shadow-editorial",
      icon: <Flame className="w-5 h-5" />,
    },
    {
      num: "03",
      title: "Finish",
      desc: "Salmon, steak, chicken, roasted veg.",
      shadowColor: "shadow-editorial",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      num: "04",
      title: "Gift",
      desc: "Butter boards, brunch boxes, press kits.",
      shadowColor: "shadow-editorial",
      icon: <Gift className="w-5 h-5" />,
    },
  ];

  useGSAP(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollRef.current;
    if (!section || !scrollContainer) return;

    const mm = gsap.matchMedia();

    // Only pin on desktop screen sizes
    mm.add("(min-width: 768px)", () => {
      const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;
      
      gsap.to(scrollContainer, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${scrollContainer.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => {
      mm.revert();
    };
  }, { scope: sectionRef });

  useEffect(() => {
    // Staggered refreshes to catch dynamic mounts, hydration, and image loads
    const refreshTimers = [
      setTimeout(() => ScrollTrigger.refresh(), 300),
      setTimeout(() => ScrollTrigger.refresh(), 800),
      setTimeout(() => ScrollTrigger.refresh(), 1500),
    ];

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    return () => {
      refreshTimers.forEach(clearTimeout);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <section
      id="use-everywhere"
      ref={sectionRef}
      className="w-full bg-[#FAF6F2] border-b border-midnight-slate/5 overflow-hidden md:min-h-screen py-16 md:py-24 md:flex md:flex-col md:justify-center relative"
    >
      {/* Background decorations */}
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] bg-brass-gold/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Header Titles */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-16 md:pt-0 mb-8 md:mb-12">
        <span className="text-[10px] font-mono font-bold text-brass-gold uppercase tracking-[0.3em] block mb-3 select-none">
          Product Versatility
        </span>
        <h2 className="font-serif-display text-4xl md:text-6xl font-normal text-midnight-slate tracking-tight">
          Use it everywhere
        </h2>
      </div>

      {/* Cards Scroll Container */}
      <div className="w-full px-6 md:px-12 pb-16 md:pb-0">
        <div
          ref={scrollRef}
          className="flex flex-col md:flex-row gap-6 md:gap-8 md:w-max w-full select-none"
        >
          {steps.map((step) => (
            <div
              key={step.num}
              className={`bg-white/45 backdrop-blur-md p-8 rounded-[2rem] border border-midnight-slate/10 hover:border-brass-gold/40 flex flex-col justify-between h-[280px] md:h-[350px] w-full md:w-[320px] transition-all duration-500 hover:-translate-y-1 hover:shadow-editorial-hover ${step.shadowColor}`}
            >
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-mono text-brass-gold font-bold">
                    {step.num}
                  </span>
                  <div className="p-3 bg-champagne-silk border border-brass-gold/10 text-brass-gold rounded-xl flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-serif-display text-2xl font-bold text-midnight-slate mt-6 md:mt-8">
                  {step.title}
                </h3>
              </div>

              <p className="text-midnight-slate/85 text-xs font-mono leading-relaxed mt-2 uppercase tracking-wide">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
