import React from 'react';

/**
 * Pure SVG/CSS Antique Baroque Cartouche Plaque
 * "BHĀRATA VARṢA - INCREDIBLE INDIA"
 * Handcrafted with ornate filigree, flourishes, and aged parchment center.
 * Blends onto the background without rectangular box cuts.
 */
export default function BharataVarsaPlaque() {
  return (
    <div className="relative w-48 sm:w-60 select-none pointer-events-none drop-shadow-[0_8px_25px_rgba(42,29,19,0.55)]">
      <svg viewBox="0 0 240 130" className="w-full h-auto">
        <defs>
          {/* Gold Gradient for Baroque Framing */}
          <linearGradient id="plaque-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8a5a36" />
            <stop offset="35%" stopColor="#d4af37" />
            <stop offset="60%" stopColor="#f3ddb6" />
            <stop offset="85%" stopColor="#c5a059" />
            <stop offset="100%" stopColor="#63391b" />
          </linearGradient>

          {/* Aged Parchment Inner Fill */}
          <radialGradient id="plaque-parchment" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffbf0" stopOpacity="0.95" />
            <stop offset="75%" stopColor="#f7ecd0" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#ebdac0" stopOpacity="0.95" />
          </radialGradient>
        </defs>

        {/* Outer Baroque Scrollwork Silhouette */}
        <g stroke="url(#plaque-gold)" strokeWidth="1.2" fill="none">
          {/* Top Crown Crest */}
          <path d="M 120,6 Q 112,0 120,-3 Q 128,0 120,6" fill="#d4af37" />
          <polygon points="115,6 120,0 125,6 120,4" fill="#8a2e22" />

          {/* Main Ornate Shield Border */}
          <path 
            d="M 40,25 
               Q 120,12 200,25 
               Q 225,50 215,80 
               Q 200,115 120,125 
               Q 40,115 25,80 
               Q 15,50 40,25 Z" 
            fill="url(#plaque-parchment)"
            stroke="url(#plaque-gold)"
            strokeWidth="2.2"
          />

          {/* Inner Inked Border */}
          <path 
            d="M 46,30 
               Q 120,19 194,30 
               Q 216,52 208,78 
               Q 194,108 120,118 
               Q 46,108 32,78 
               Q 24,52 46,30 Z" 
            stroke="#8a5a36"
            strokeWidth="0.8"
            strokeDasharray="3,2"
          />

          {/* Flourish Ears Left & Right */}
          <path d="M 25,50 Q 8,42 16,32 Q 26,38 28,48" strokeWidth="1.4" />
          <path d="M 215,50 Q 232,42 224,32 Q 214,38 212,48" strokeWidth="1.4" />
          <path d="M 20,80 Q 6,88 14,96 Q 24,90 24,80" strokeWidth="1.4" />
          <path d="M 220,80 Q 234,88 226,96 Q 216,90 216,80" strokeWidth="1.4" />

          {/* Bottom Lion Emblem Seal */}
          <circle cx="120" cy="115" r="8" fill="#8a5a36" stroke="#d4af37" strokeWidth="1.2" />
          <circle cx="120" cy="115" r="5" fill="#fcf7e8" />
          <polygon points="120,112 118,116 122,116" fill="#8a2e22" />
        </g>

        {/* Classical Typography */}
        <text 
          x="120" 
          y="48" 
          textAnchor="middle" 
          fontFamily="Cinzel Decorative, Georgia, serif" 
          fontSize="17" 
          fontWeight="bold" 
          letterSpacing="4" 
          fill="#5c181f"
        >
          BHĀRATA
        </text>

        <text 
          x="120" 
          y="70" 
          textAnchor="middle" 
          fontFamily="Cinzel, Georgia, serif" 
          fontSize="14" 
          fontWeight="bold" 
          letterSpacing="6" 
          fill="#2a1d13"
        >
          VARṢA
        </text>

        {/* Separator rule */}
        <g stroke="#8a5a36" strokeWidth="0.8">
          <line x1="75" y1="78" x2="112" y2="78" />
          <circle cx="120" cy="78" r="2" fill="#d4af37" />
          <line x1="128" y1="78" x2="165" y2="78" />
        </g>

        <text 
          x="120" 
          y="93" 
          textAnchor="middle" 
          fontFamily="Marcellus, Georgia, serif" 
          fontSize="9.5" 
          letterSpacing="3" 
          fill="#704423"
        >
          INCREDIBLE INDIA
        </text>

        <text 
          x="120" 
          y="105" 
          textAnchor="middle" 
          fontFamily="Marcellus, Georgia, serif" 
          fontSize="6.5" 
          letterSpacing="1.8" 
          fill="#8a5a36" 
          opacity="0.85"
        >
          ANNO DOMINI • MDCCLXVIII
        </text>
      </svg>
    </div>
  );
}
