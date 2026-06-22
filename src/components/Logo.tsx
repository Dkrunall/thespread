"use client";

import React, { useState, useEffect } from "react";

interface LogoProps {
  className?: string;
  variant?: "flat" | "3d";
}

export default function Logo({ className = "h-10 md:h-12 w-auto", variant = "flat" }: LogoProps) {
  const [showImage, setShowImage] = useState(false);
  const [mounted, setMounted] = useState(false);

  const imgSrc = variant === "3d" ? "/logo-3d.png" : "/logo-flat.png";

  useEffect(() => {
    setMounted(true);
    
    // Pre-load the image client-side to test if it exists
    const img = new window.Image();
    img.src = imgSrc;
    img.onload = () => setShowImage(true);
    img.onerror = () => setShowImage(false);
  }, [imgSrc]);

  // Render SVG fallback immediately on SSR and until image confirms loading
  if (!mounted || !showImage) {
    return (
      <svg
        viewBox="0 0 240 80"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sans-serif "THE" */}
        <text
          x="120"
          y="18"
          textAnchor="middle"
          className="font-sans font-black text-[9px] tracking-[0.45em] fill-current"
        >
          THE
        </text>

        {/* Elegant Cursive Script style fallback for "Daily" */}
        <text
          x="120"
          y="50"
          textAnchor="middle"
          className="font-serif-display italic font-black text-3xl fill-current tracking-tight"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          Daily
        </text>

        {/* The swoosh underline path resembling the custom script logo */}
        <path
          d="M 60,53 Q 120,68 180,53"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Bold tracking-spaced "SPREAD" */}
        <text
          x="120"
          y="72"
          textAnchor="middle"
          className="font-sans font-black text-[10px] tracking-[0.55em] fill-current"
        >
          SPREAD
        </text>
      </svg>
    );
  }

  return (
    <img
      src={imgSrc}
      alt="The Daily Spread Logo"
      className={`${className} object-contain select-none`}
    />
  );
}
