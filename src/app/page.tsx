import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfoBadges from "@/components/InfoBadges";
import ProductGrid from "@/components/ProductGrid";
import VideoStories from "@/components/VideoStories";
import UseItEverywhere from "@/components/UseItEverywhere";
import MoodQuiz from "@/components/MoodQuiz";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Sticky Navigation and Cart Drawer */}
      <Header />
      
      {/* Scrollable Sections */}
      <main className="flex-1 flex flex-col">
        {/* Animated Hero Section & Sourdough Video Modal */}
        <Hero />
        
        {/* Features badge row */}
        <InfoBadges />
        
        {/* Filterable Products Catalog */}
        <ProductGrid />
        
        {/* Horizontal scrollable Vertical Video Stories */}
        <VideoStories />
        
        {/* Application sections with GSAP ScrollTrigger timeline */}
        <UseItEverywhere />
      </main>
      
      {/* Footer block */}
      <Footer />
      
      {/* Popup Interactive Quiz overlay */}
      <MoodQuiz />
    </>
  );
}
