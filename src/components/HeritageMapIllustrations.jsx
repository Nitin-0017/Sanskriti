import React from 'react';

/**
 * Hand-Drawn Heritage Miniature Illustrations (Delicate Cartographic Annotations)
 * Sized appropriately to sit neatly inside regions without covering state boundaries or labels.
 * All elements have pointerEvents="none" so they never intercept state hover/click events.
 */

// 1. Himalayan Mountains & Snow Peaks (Compact northern ridge)
export function HimalayanMountains({ x = 320, y = 215, scale = 0.65 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none">
      <g stroke="#26170d" strokeWidth="0.9" fill="#fcf9f2">
        {/* Peak 1 */}
        <polygon points="0,35 25,5 50,35" fill="#f8f5ee" />
        <path d="M 25,5 L 20,35 M 25,5 L 30,35" stroke="#7a5230" strokeWidth="0.6" strokeDasharray="1.5,1.5" />
        <polygon points="25,5 16,20 22,22 12,35" fill="#e2d4bc" stroke="#26170d" strokeWidth="0.6" />

        {/* Peak 2 (Center High) */}
        <polygon points="35,38 70,0 105,38" fill="#ffffff" />
        <path d="M 70,0 L 65,38 M 70,0 L 75,38" stroke="#7a5230" strokeWidth="0.7" strokeDasharray="1.5,1.5" />
        <polygon points="70,0 58,19 65,22 53,38" fill="#e2d4bc" stroke="#26170d" strokeWidth="0.7" />

        {/* Peak 3 */}
        <polygon points="90,36 120,6 150,36" fill="#f8f5ee" />
        <path d="M 120,6 L 114,36 M 120,6 L 126,36" stroke="#7a5230" strokeWidth="0.6" strokeDasharray="1.5,1.5" />
      </g>

      {/* Pine Trees */}
      {[-4, 20, 48, 76, 105, 130].map((tx, idx) => (
        <g key={idx} transform={`translate(${tx}, 30) scale(0.35)`}>
          <polygon points="5,0 0,10 10,10" fill="#3c5332" stroke="#1f140c" strokeWidth="0.7" />
          <polygon points="5,5 0,16 10,16" fill="#3c5332" stroke="#1f140c" strokeWidth="0.7" />
          <line x1="5" y1="16" x2="5" y2="20" stroke="#1f140c" strokeWidth="1" />
        </g>
      ))}

      <text x="75" y="-6" fontFamily="Cinzel, Georgia, serif" fontSize="8" fontWeight="bold" letterSpacing="3" fill="#2c1a0e" textAnchor="middle">
        HIMALAYAS
      </text>
    </g>
  );
}

// 2. Rajasthan: Desert Fortresses, Sand Dunes & Camels (Tucked in Thar desert)
export function DesertFortAndCamels({ x = 215, y = 435, scale = 0.68 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none">
      {/* Mehrangarh / Jaisalmer Desert Fort */}
      <g transform="translate(15, 0) scale(0.55)" stroke="#26170d" strokeWidth="0.9">
        <polygon points="0,40 10,15 60,15 70,40" fill="#dfb37c" />
        <rect x="15" y="5" width="10" height="18" fill="#c99b62" />
        <polygon points="15,5 20,-1 25,5" fill="#8f2d24" />
        <rect x="45" y="5" width="10" height="18" fill="#c99b62" />
        <polygon points="45,5 50,-1 55,5" fill="#8f2d24" />
        <rect x="28" y="8" width="14" height="20" fill="#edd0a4" />
        <path d="M 32,18 Q 35,14 38,18 Z" fill="#26170d" />
        <line x1="12" y1="15" x2="58" y2="15" strokeWidth="1.4" strokeDasharray="3,2" />
        {/* Saffron Flag */}
        <line x1="35" y1="8" x2="35" y2="-5" stroke="#8f2d24" strokeWidth="1" />
        <polygon points="35,-5 46,-2 35,1" fill="#e65100" />
      </g>

      {/* Camels Caravan */}
      <g transform="translate(-5, 20) scale(0.42)" stroke="#26170d" strokeWidth="0.8">
        <path d="M 10,25 Q 12,12 18,10 Q 22,8 24,14 Q 28,12 34,14 Q 38,18 36,25 L 34,35 L 31,35 L 33,27 L 24,27 L 22,35 L 19,35 L 22,25 Z" fill="#8f5b30" />
        <g transform="translate(26, 2) scale(0.85)">
          <path d="M 10,25 Q 12,12 18,10 Q 22,8 24,14 Q 28,12 34,14 Q 38,18 36,25 L 34,35 L 31,35 L 33,27 L 24,27 L 22,35 L 19,35 L 22,25 Z" fill="#8f5b30" />
        </g>
      </g>
    </g>
  );
}

// 3. Haryana: Sacred Kurukshetra Chariot & Banyan Tree
export function VedicChariotAndTree({ x = 335, y = 365, scale = 0.55 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none">
      {/* Sacred Banyan Tree */}
      <g transform="translate(-6, -4) scale(0.48)" stroke="#26170d" strokeWidth="0.9">
        <path d="M 20,40 Q 5,22 18,10 Q 35,-2 52,4 Q 68,-2 82,10 Q 95,22 78,40 Z" fill="#425c33" />
        <path d="M 42,40 L 42,56 M 54,40 L 54,56" stroke="#4a2816" strokeWidth="1.6" />
      </g>

      {/* Gita 16-Spoke Golden Chariot Wheel */}
      <g transform="translate(24, 4) scale(0.48)">
        <circle cx="16" cy="16" r="14" fill="#fefaf0" stroke="#8a2e22" strokeWidth="1.6" />
        <circle cx="16" cy="16" r="11" fill="none" stroke="#d4af37" strokeWidth="0.9" strokeDasharray="3,1" />
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={i}
            x1="16"
            y1="2"
            x2="16"
            y2="30"
            stroke="#8a2e22"
            strokeWidth="0.9"
            transform={`rotate(${i * 22.5} 16 16)`}
          />
        ))}
        <circle cx="16" cy="16" r="3" fill="#8a2e22" stroke="#d4af37" strokeWidth="0.8" />
      </g>
    </g>
  );
}

// 4. Uttar Pradesh: Taj & Kashi Vishwanath Shikhara
export function UttarPradeshMonuments({ x = 450, y = 410, scale = 0.65 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none" stroke="#26170d" strokeWidth="0.8">
      <g transform="translate(0, 0) scale(0.52)">
        <path d="M 10,40 L 10,25 Q 12,18 25,6 Q 38,18 40,25 L 40,40 Z" fill="#ffffff" />
        <line x1="25" y1="6" x2="25" y2="0" stroke="#d4af37" strokeWidth="1.2" />
        <rect x="0" y="10" width="4" height="30" fill="#f8f5ee" />
        <polygon points="0,10 2,6 4,10" fill="#d4af37" />
        <rect x="46" y="10" width="4" height="30" fill="#f8f5ee" />
        <polygon points="46,10 48,6 50,10" fill="#d4af37" />
        <path d="M 18,40 L 18,28 Q 25,22 32,28 L 32,40 Z" fill="#26170d" />
      </g>
    </g>
  );
}

// 5. Gujarat: Torana Gateway
export function GujaratHeritage({ x = 195, y = 520, scale = 0.62 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none" stroke="#26170d" strokeWidth="0.8">
      <g transform="translate(0, 0) scale(0.5)">
        <rect x="4" y="8" width="6" height="32" fill="#d8b284" />
        <rect x="30" y="8" width="6" height="32" fill="#d8b284" />
        <path d="M 4,14 Q 20,4 36,14" fill="none" stroke="#8a2e22" strokeWidth="1.6" />
        <path d="M 4,20 Q 20,10 36,20" fill="none" stroke="#d4af37" strokeWidth="1.2" />
        <polygon points="20,0 14,8 26,8" fill="#8a2e22" />
      </g>
    </g>
  );
}

// 6. Central India (MP): Royal Caparisoned Elephant & Khajuraho Shikhara
export function RoyalElephantAndTemple({ x = 380, y = 500, scale = 0.65 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none" stroke="#26170d" strokeWidth="0.8">
      <g transform="translate(0, 6) scale(0.48)">
        <path d="M 15,35 Q 10,20 20,12 Q 35,8 55,10 Q 68,14 70,25 L 72,40 L 65,40 L 66,28 L 52,28 L 53,40 L 46,40 L 48,27 L 30,27 L 31,40 L 24,40 L 26,24 Q 20,24 18,35 Z" fill="#54453b" />
        <path d="M 18,24 Q 12,24 10,32 Q 8,40 14,40 Q 16,36 14,32" fill="#ffffff" />
        <rect x="34" y="2" width="22" height="10" fill="#9e2a2b" stroke="#d4af37" strokeWidth="1" />
        <circle cx="45" cy="-2" r="2" fill="#d4af37" />
      </g>

      <g transform="translate(36, 0) scale(0.48)">
        <path d="M 15,40 L 15,25 Q 18,15 25,4 Q 32,15 35,25 L 35,40 Z" fill="#e2c8a2" />
        <ellipse cx="25" cy="4" rx="6" ry="2.5" fill="#c49a6c" />
        <line x1="25" y1="4" x2="25" y2="-2" stroke="#d4af37" strokeWidth="1.4" />
      </g>
    </g>
  );
}

// 7. Odisha: Colossal 24-Spoke Konark Sun Temple Chariot Wheel
export function KonarkWheelAndBoat({ x = 530, y = 595, scale = 0.65 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none">
      <g transform="translate(0, 0) scale(0.55)">
        <circle cx="20" cy="20" r="18" fill="#fdfbf5" stroke="#7a241b" strokeWidth="1.8" />
        <circle cx="20" cy="20" r="14" fill="none" stroke="#d4af37" strokeWidth="1" strokeDasharray="3,1" />
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="20"
            y1="2"
            x2="20"
            y2="38"
            stroke="#7a241b"
            strokeWidth="0.9"
            transform={`rotate(${i * 15} 20 20)`}
          />
        ))}
        <circle cx="20" cy="20" r="4.5" fill="#8a2e22" stroke="#d4af37" strokeWidth="0.9" />
      </g>
    </g>
  );
}

// 8. Karnataka: Hampi Stone Chariot (Vijayanagara)
export function KarnatakaHampiChariot({ x = 335, y = 735, scale = 0.65 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none" stroke="#26170d" strokeWidth="0.8">
      <g transform="translate(0, 0) scale(0.52)">
        <rect x="8" y="15" width="34" height="20" fill="#dfbe97" />
        <polygon points="12,15 25,2 38,15" fill="#c49a6c" />
        <circle cx="15" cy="35" r="8" fill="#fdfaf2" stroke="#8a2e22" strokeWidth="1.2" />
        <circle cx="35" cy="35" r="8" fill="#fdfaf2" stroke="#8a2e22" strokeWidth="1.2" />
      </g>
    </g>
  );
}

// 9. Tamil Nadu: Soaring Dravidian Gopuram
export function DravidianGopuram({ x = 385, y = 825, scale = 0.65 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none" stroke="#26170d" strokeWidth="0.8">
      <g transform="translate(0, 0) scale(0.55)">
        <polygon points="5,55 10,42 40,42 45,55" fill="#d9ad7c" />
        <polygon points="10,42 14,30 36,30 40,42" fill="#c49a6c" />
        <polygon points="14,30 18,18 32,18 36,30" fill="#b08358" />
        <polygon points="18,18 21,8 29,8 32,18" fill="#9e6e44" />
        <path d="M 18,8 Q 25,2 32,8 Z" fill="#8a2e22" />
        <line x1="25" y1="2" x2="25" y2="-3" stroke="#d4af37" strokeWidth="1.5" />
        <path d="M 20,55 L 20,47 Q 25,43 30,47 L 30,55 Z" fill="#26170d" />
      </g>
    </g>
  );
}

// 10. Kerala: Kathakali Mask & Coconut Palms
export function KeralaHeritage({ x = 335, y = 845, scale = 0.55 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none" stroke="#26170d" strokeWidth="0.8">
      <g transform="translate(0, 0) scale(0.45)">
        <path d="M 15,35 Q 22,20 18,0" fill="none" stroke="#5c381e" strokeWidth="2" />
        <path d="M 18,0 Q 8,-8 0,0 M 18,0 Q 28,-8 36,0 M 18,0 Q 20,-12 18,-18 M 18,0 Q 10,-12 4,-14 M 18,0 Q 26,-12 32,-14" fill="none" stroke="#2e682e" strokeWidth="1.5" />
      </g>
      <g transform="translate(16, 10) scale(0.4)">
        <circle cx="15" cy="15" r="13" fill="#2e7d32" />
        <polygon points="15,-4 5,8 25,8" fill="#d4af37" stroke="#8a2e22" strokeWidth="1" />
        <circle cx="15" cy="-4" r="2.5" fill="#8a2e22" />
      </g>
    </g>
  );
}

// 11. Northeast: Kaziranga Rhino & Tea Hills (Tucked in Assam)
export function NortheastHeritage({ x = 725, y = 440, scale = 0.62 }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none" stroke="#26170d" strokeWidth="0.8">
      <path d="M 0,22 Q 12,10 24,22 Q 36,10 48,22" fill="#4d6e3c" fillOpacity="0.4" />
      <g transform="translate(12, 5) scale(0.38)">
        <path d="M 10,22 Q 15,12 28,14 Q 40,15 45,22 L 44,32 L 39,32 L 40,25 L 26,25 L 27,32 L 22,32 L 24,24 L 14,24 L 10,28 Z" fill="#695d52" />
        <polygon points="10,22 5,16 12,18" fill="#d4af37" />
      </g>
    </g>
  );
}

// 12. Vintage 18th-Century Galleons & Whales (Delicate maritime accents)
export function VintageSailingShips({ x = 110, y = 660, scale = 0.7, isWhale = false }) {
  if (isWhale) {
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none" stroke="#26170d" strokeWidth="0.8">
        <path d="M 0,20 Q 15,5 30,20 Q 38,10 42,0 Q 40,15 48,15 Q 38,28 20,25 Z" fill="#4a6369" />
        <path d="M 42,0 Q 40,-10 35,-15 M 42,0 Q 45,-12 48,-16" fill="none" stroke="#3b6978" strokeWidth="1" strokeDasharray="1,1" />
      </g>
    );
  }

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} pointerEvents="none" stroke="#26170d" strokeWidth="0.9">
      <path d="M 0,32 Q 25,44 64,32 L 55,20 L 6,20 Z" fill="#542c16" strokeWidth="1.3" />
      <line x1="6" y1="25" x2="55" y2="25" stroke="#d4af37" strokeWidth="0.9" />
      
      <line x1="16" y1="20" x2="16" y2="0" strokeWidth="1.3" />
      <line x1="34" y1="20" x2="34" y2="-6" strokeWidth="1.5" />
      <line x1="48" y1="20" x2="48" y2="2" strokeWidth="1.2" />

      <path d="M 16,3 Q 27,6 25,18 L 16,16 Z" fill="#fdfbf5" />
      <path d="M 34,-2 Q 47,2 45,17 L 34,15 Z" fill="#fdfbf5" />
      <path d="M 48,4 Q 57,7 55,17 L 48,16 Z" fill="#fdfbf5" />

      <polygon points="34,-6 45,-3 34,-1" fill="#e65100" strokeWidth="0.5" />
      <path d="M -10,34 Q 0,38 15,34 M 52,34 Q 66,38 80,34" stroke="#3b6978" strokeWidth="0.7" strokeDasharray="2,2" fill="none" opacity="0.8" />
    </g>
  );
}

// 13. Sacred Meandering Rivers
export function SacredRivers() {
  return (
    <g stroke="#325a66" strokeWidth="0.9" fill="none" opacity="0.7" pointerEvents="none">
      {/* Ganga */}
      <path d="M 390,320 Q 460,370 510,430 T 590,480 T 630,520" strokeWidth="1.2" />
      <text x="490" y="415" fontFamily="Marcellus" fontSize="7" fill="#1b3f4a" fontStyle="italic">Ganga R.</text>

      {/* Yamuna */}
      <path d="M 380,330 Q 420,380 460,430 T 510,440" strokeWidth="0.8" strokeDasharray="3,1" />

      {/* Narmada */}
      <path d="M 450,540 Q 370,545 280,555" strokeWidth="0.9" />
      <text x="360" y="538" fontFamily="Marcellus" fontSize="6.5" fill="#1b3f4a" fontStyle="italic">Narmada R.</text>

      {/* Godavari */}
      <path d="M 320,630 Q 410,640 500,660" strokeWidth="0.9" />
      <text x="420" y="632" fontFamily="Marcellus" fontSize="6.5" fill="#1b3f4a" fontStyle="italic">Godavari R.</text>

      {/* Kaveri */}
      <path d="M 350,810 Q 380,820 420,830" strokeWidth="0.9" />
      <text x="380" y="812" fontFamily="Marcellus" fontSize="6.5" fill="#1b3f4a" fontStyle="italic">Kaveri R.</text>

      {/* Brahmaputra */}
      <path d="M 780,410 Q 740,430 700,470" strokeWidth="1.2" />
      <text x="730" y="425" fontFamily="Marcellus" fontSize="7" fill="#1b3f4a" fontStyle="italic">Brahmaputra R.</text>
    </g>
  );
}
