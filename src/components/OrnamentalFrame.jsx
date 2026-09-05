import React from 'react';

/**
 * Traditional Indian Manuscript Borders, Corner Filigrees & Vintage Cartography Details
 */
export default function OrnamentalFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {/* Outer Manuscript Border Frame */}
      <div className="absolute inset-3 sm:inset-5 border border-[#c5a059]/30 rounded-xs pointer-events-none">
        <div className="absolute inset-1 border border-[#c5a059]/15 pointer-events-none" />
      </div>

      {/* Top Left Corner Filigree */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-16 h-16 sm:w-24 sm:h-24 opacity-60 text-[#c5a059]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <path d="M 5 5 L 80 5 M 5 5 L 5 80" strokeWidth="1.5" />
          <path d="M 12 12 L 65 12 M 12 12 L 12 65" strokeWidth="0.75" strokeDasharray="2,2" />
          {/* Floral Lotus Knot */}
          <path d="M 15 15 C 25 5, 40 15, 30 25 C 20 35, 15 25, 15 15 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="0.8" />
          <circle cx="5" cy="5" r="3" fill="currentColor" />
          <circle cx="35" cy="5" r="2" fill="currentColor" />
          <circle cx="5" cy="35" r="2" fill="currentColor" />
          <path d="M 5 5 Q 35 35 65 5" strokeWidth="0.5" />
          <path d="M 5 5 Q 35 35 5 65" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Top Right Corner Filigree */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-16 h-16 sm:w-24 sm:h-24 opacity-60 text-[#c5a059] scale-x-[-1]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <path d="M 5 5 L 80 5 M 5 5 L 5 80" strokeWidth="1.5" />
          <path d="M 12 12 L 65 12 M 12 12 L 12 65" strokeWidth="0.75" strokeDasharray="2,2" />
          <path d="M 15 15 C 25 5, 40 15, 30 25 C 20 35, 15 25, 15 15 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="0.8" />
          <circle cx="5" cy="5" r="3" fill="currentColor" />
          <circle cx="35" cy="5" r="2" fill="currentColor" />
          <circle cx="5" cy="35" r="2" fill="currentColor" />
          <path d="M 5 5 Q 35 35 65 5" strokeWidth="0.5" />
          <path d="M 5 5 Q 35 35 5 65" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Bottom Left Corner Filigree */}
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-16 h-16 sm:w-24 sm:h-24 opacity-60 text-[#c5a059] scale-y-[-1]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <path d="M 5 5 L 80 5 M 5 5 L 5 80" strokeWidth="1.5" />
          <path d="M 12 12 L 65 12 M 12 12 L 12 65" strokeWidth="0.75" strokeDasharray="2,2" />
          <path d="M 15 15 C 25 5, 40 15, 30 25 C 20 35, 15 25, 15 15 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="0.8" />
          <circle cx="5" cy="5" r="3" fill="currentColor" />
          <circle cx="35" cy="5" r="2" fill="currentColor" />
          <circle cx="5" cy="35" r="2" fill="currentColor" />
          <path d="M 5 5 Q 35 35 65 5" strokeWidth="0.5" />
          <path d="M 5 5 Q 35 35 5 65" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Bottom Right Corner Filigree */}
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-16 h-16 sm:w-24 sm:h-24 opacity-60 text-[#c5a059] scale-[-1]">
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <path d="M 5 5 L 80 5 M 5 5 L 5 80" strokeWidth="1.5" />
          <path d="M 12 12 L 65 12 M 12 12 L 12 65" strokeWidth="0.75" strokeDasharray="2,2" />
          <path d="M 15 15 C 25 5, 40 15, 30 25 C 20 35, 15 25, 15 15 Z" fill="currentColor" fillOpacity="0.3" strokeWidth="0.8" />
          <circle cx="5" cy="5" r="3" fill="currentColor" />
          <circle cx="35" cy="5" r="2" fill="currentColor" />
          <circle cx="5" cy="35" r="2" fill="currentColor" />
          <path d="M 5 5 Q 35 35 65 5" strokeWidth="0.5" />
          <path d="M 5 5 Q 35 35 5 65" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Cartographic Coordinate Annotations on Border Sides */}
      <div className="hidden lg:flex absolute bottom-8 left-8 items-center gap-3 text-[10px] tracking-[0.25em] font-marcellus text-[#c5a059]/60">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]/50" />
        <span>ARCHIVE REF: IND-SAN-2026</span>
        <span>•</span>
        <span>20.5937° N, 78.9629° E</span>
      </div>

      <div className="hidden lg:flex absolute bottom-8 right-8 items-center gap-3 text-[10px] tracking-[0.25em] font-marcellus text-[#c5a059]/60">
        <span>BHĀRATA VARSHA • ETERNAL HERITAGE</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]/50" />
      </div>

      {/* Vignette Shadow Overlay for Tactile Depth */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#120c08]/20 to-[#080503]/80 pointer-events-none" />
    </div>
  );
}
