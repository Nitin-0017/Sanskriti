import React from 'react';

/**
 * Pure Circular Vintage Compass Rose
 * Seamlessly integrates onto parchment without rectangular box edges.
 * Reacts with subtle mouse parallax and slow breathing animation.
 */
export default function VintageCompassRose({ mousePos = { x: 0, y: 0 } }) {
  const rot = mousePos.x * 7 + mousePos.y * 3;

  return (
    <div className="relative w-28 h-28 sm:w-36 sm:h-36 select-none pointer-events-none drop-shadow-[0_8px_25px_rgba(42,29,19,0.5)]">
      <svg 
        viewBox="0 0 160 160" 
        className="w-full h-full transition-transform duration-700 ease-out"
        style={{ transform: `rotate(${rot}deg)` }}
      >
        <defs>
          <radialGradient id="compass-parchment" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffbf2" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#f7ebd2" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ead8b8" stopOpacity="0.8" />
          </radialGradient>

          <linearGradient id="compass-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="50%" stopColor="#f3ddb6" />
            <stop offset="100%" stopColor="#8a5a36" />
          </linearGradient>
        </defs>

        {/* Circular Parchment Ground */}
        <circle cx="80" cy="80" r="74" fill="url(#compass-parchment)" stroke="#3a2517" strokeWidth="1.6" />
        <circle cx="80" cy="80" r="70" fill="none" stroke="#c5a059" strokeWidth="0.8" strokeDasharray="3,2" />
        <circle cx="80" cy="80" r="64" fill="none" stroke="#3a2517" strokeWidth="1" />

        {/* Degree Tick Ring */}
        {Array.from({ length: 32 }).map((_, i) => (
          <line
            key={i}
            x1="80"
            y1="64"
            x2="80"
            y2={i % 4 === 0 ? "70" : "67"}
            stroke="#5c381e"
            strokeWidth={i % 4 === 0 ? "1" : "0.5"}
            transform={`rotate(${i * 11.25} 80 80)`}
          />
        ))}

        {/* 16-Point Navigation Star (4 Principal Points) */}
        {/* North Pointer (Fleur-de-lis accented) */}
        <polygon points="80,18 85,80 80,80" fill="#8a2e22" stroke="#3a2517" strokeWidth="0.8" />
        <polygon points="80,18 75,80 80,80" fill="#d4af37" stroke="#3a2517" strokeWidth="0.8" />

        {/* South Pointer */}
        <polygon points="80,142 85,80 80,80" fill="#3a2517" stroke="#3a2517" strokeWidth="0.8" />
        <polygon points="80,142 75,80 80,80" fill="#fcf7e8" stroke="#3a2517" strokeWidth="0.8" />

        {/* East Pointer */}
        <polygon points="142,80 80,85 80,80" fill="#8a2e22" stroke="#3a2517" strokeWidth="0.8" />
        <polygon points="142,80 80,75 80,80" fill="#d4af37" stroke="#3a2517" strokeWidth="0.8" />

        {/* West Pointer */}
        <polygon points="18,80 80,85 80,80" fill="#3a2517" stroke="#3a2517" strokeWidth="0.8" />
        <polygon points="18,80 80,75 80,80" fill="#fcf7e8" stroke="#3a2517" strokeWidth="0.8" />

        {/* 4 Diagonal Points (NE, NW, SE, SW) */}
        {[-45, 45, 135, 225].map((angle, idx) => (
          <g key={idx} transform={`rotate(${angle} 80 80)`}>
            <polygon points="80,32 83,80 80,80" fill="#c49a6c" stroke="#3a2517" strokeWidth="0.6" />
            <polygon points="80,32 77,80 80,80" fill="#fcf7e8" stroke="#3a2517" strokeWidth="0.6" />
          </g>
        ))}

        {/* 8 Intermediate Sub-points */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, idx) => (
          <g key={idx} transform={`rotate(${angle} 80 80)`}>
            <polygon points="80,44 82,80 80,80" fill="#8a5a36" stroke="#3a2517" strokeWidth="0.5" />
            <polygon points="80,44 78,80 80,80" fill="#e8dcc4" stroke="#3a2517" strokeWidth="0.5" />
          </g>
        ))}

        {/* Center Brass Hub */}
        <circle cx="80" cy="80" r="14" fill="#d4af37" stroke="#3a2517" strokeWidth="1.2" />
        <circle cx="80" cy="80" r="10" fill="#8a2e22" />
        <circle cx="80" cy="80" r="5" fill="#fcf7e8" stroke="#3a2517" strokeWidth="0.8" />

        {/* Cardinal Direction Letters */}
        <text x="80" y="32" textAnchor="middle" fontFamily="Cinzel, Georgia, serif" fontSize="11" fontWeight="bold" fill="#8a2e22">N</text>
        <text x="80" y="136" textAnchor="middle" fontFamily="Cinzel, Georgia, serif" fontSize="11" fontWeight="bold" fill="#2a1d13">S</text>
        <text x="134" y="84" textAnchor="middle" fontFamily="Cinzel, Georgia, serif" fontSize="11" fontWeight="bold" fill="#2a1d13">E</text>
        <text x="26" y="84" textAnchor="middle" fontFamily="Cinzel, Georgia, serif" fontSize="11" fontWeight="bold" fill="#2a1d13">W</text>
      </svg>
    </div>
  );
}
