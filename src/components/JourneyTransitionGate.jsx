import React from 'react';
import { motion } from 'framer-motion';
import { Compass, BookOpen, Landmark, Sparkles, MapPin, Feather, ChevronUp } from 'lucide-react';

/**
 * JourneyTransitionGate Component
 * The cinematic threshold revealed when walking along the sacred stone pathway.
 * Seamlessly connects the Landing Page to the upcoming Interactive India Map milestone.
 */
export default function JourneyTransitionGate({ onScrollToTop }) {
  const heritagePillars = [
    { title: "Sacred Temples", icon: Landmark, desc: "Architectural wonders & sacred sanctums" },
    { title: "Folk Arts", icon: Sparkles, desc: "Living traditions, dances & crafts" },
    { title: "Ancient Scriptures", icon: BookOpen, desc: "Vedas, Upanishads & Epics" },
    { title: "Literature", icon: Feather, desc: "Poetry, dramas & timeless manuscripts" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-20 bg-gradient-to-b from-[#0e0a07] via-[#1a120b] to-[#0a0705] text-[#e8d8b8] overflow-hidden select-none">
      
      {/* Background Parchment Grain */}
      <div 
        className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/parchment_texture.jpg')` }}
      />

      {/* Radial Temple Sanctum Glow */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-radial from-[#d4af37]/15 via-[#5c1d24]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Main Arch Content Box */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center p-6 sm:p-12 rounded-xl border border-[#c5a059]/40 bg-[#160e09]/80 backdrop-blur-md shadow-[0_10px_50px_rgba(0,0,0,0.8)]">
        
        {/* Antique Compass Motif */}
        <div className="relative mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#c5a059]/60 flex items-center justify-center bg-[#23150d] shadow-[0_0_25px_rgba(212,175,55,0.3)]">
            <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-[#ffd27d] animate-spin-slow" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#d4af37] animate-ping opacity-60" />
        </div>

        {/* Sanskrit Benediction */}
        <p className="font-rozha text-sm sm:text-base text-[#ffd27d] tracking-widest mb-2">
          ॥ अयम् निजः परो वेति गणना लघुचेतसाम् । उदारचरितानां तु वसुधैव कुटुम्बकम् ॥
        </p>
        <p className="font-marcellus text-[10px] sm:text-xs text-[#b8a082] uppercase tracking-[0.25em] mb-6">
          "The world is one family — Welcome to the journey of Indian Heritage"
        </p>

        {/* Heading */}
        <h2 className="font-cinzel text-3xl sm:text-5xl font-bold tracking-[0.18em] text-[#fff6db] mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          THE JOURNEY HAS BEGUN
        </h2>

        {/* Storytelling Manuscript Narrative */}
        <p className="font-manuscript text-base sm:text-xl text-[#d4c3a3] max-w-2xl leading-relaxed italic mb-10">
          "You have stepped onto the stone pathway etched across five millennia of wisdom, devotion, and artistic splendor. Ahead lies the living tapestry of 28 states, thousands of ancient temples, and eternal epics."
        </p>

        {/* 4 Heritage Pillars Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full mb-10">
          {heritagePillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="group p-4 rounded-lg border border-[#c5a059]/30 bg-[#21150e]/60 hover:bg-[#2d1b11] hover:border-[#ffd27d] transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.4)] flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[#361f13] border border-[#c5a059]/40 flex items-center justify-center text-[#ffd27d] mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-cinzel text-sm font-bold text-[#f7e6c4] tracking-wider mb-1">
                  {item.title}
                </h3>
                <p className="font-manuscript text-xs text-[#a8957c] italic">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Milestone Indicator: Next Step Teaser */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full pt-6 border-t border-[#c5a059]/25 text-xs font-marcellus text-[#c5a059]/90">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#ffd27d]" />
            <span className="tracking-widest uppercase">Next Chapter: Interactive Heritage Map of India</span>
          </div>

          <button
            onClick={() => {
              if (window.playTempleChime) window.playTempleChime();
              if (onScrollToTop) onScrollToTop();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#c5a059]/40 bg-[#2a170f] hover:bg-[#382015] text-[#f7e6c4] transition-all duration-300 cursor-pointer group"
          >
            <ChevronUp className="w-4 h-4 text-[#ffd27d] group-hover:-translate-y-0.5 transition-transform" />
            <span className="tracking-wider">Return to Grand Pathway</span>
          </button>
        </div>

      </div>
    </section>
  );
}
