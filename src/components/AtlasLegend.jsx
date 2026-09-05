import React from 'react';
import { motion } from 'framer-motion';

/**
 * Functional Vintage Atlas Legend
 * Designed as an authentic piece of aged royal cartographer's parchment.
 * Features:
 * - Layered antique parchment background with organic paper fibers & subtle vignette
 * - Hand-inked double cartographic border with brass corner ornaments
 * - Warm antique sepia shadow blending into the atlas map
 * - Rich antique typography in deep espresso and muted walnut
 * - Tactile parchment buttons with warm gold illuminated borders on hover
 * - Full interactivity for toggling map cultural markers
 */
export default function AtlasLegend({ activeCategories, onToggleCategory }) {
  const categories = [
    {
      id: 'temple',
      label: 'TEMPLES',
      subtitle: 'Sacred Shikhara & Gopurams',
      color: '#d4af37',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor">
          <polygon points="12,1 9,8 15,8" fill="#c49a6c" stroke="#3a2517" strokeWidth="0.8" />
          <polygon points="12,1 12,-1" stroke="#d4af37" strokeWidth="1.2" />
          <rect x="7" y="8" width="10" height="5" fill="#b88b5c" stroke="#3a2517" strokeWidth="0.8" />
          <rect x="5" y="13" width="14" height="8" fill="#a47548" stroke="#3a2517" strokeWidth="0.8" />
          <path d="M 10,21 L 10,16 Q 12,14 14,16 L 14,21 Z" fill="#24160d" />
        </svg>
      ),
    },
    {
      id: 'folkArts',
      label: 'FOLK ARTS',
      subtitle: 'Living Dances & Traditions',
      color: '#4caf50',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor">
          <circle cx="12" cy="4" r="2.5" fill="#d4af37" stroke="#3a2517" strokeWidth="0.8" />
          <polygon points="12,0.5 10.5,3 13.5,3" fill="#8a2e22" />
          <path d="M 6,9 Q 12,7 18,9" fill="none" stroke="#3a2517" strokeWidth="1.2" />
          <circle cx="6" cy="9" r="1" fill="#d4af37" />
          <circle cx="18" cy="9" r="1" fill="#d4af37" />
          <polygon points="12,8 7,19 17,19" fill="#b85139" stroke="#3a2517" strokeWidth="0.8" />
          <line x1="12" y1="8" x2="9" y2="19" stroke="#ffd27d" strokeWidth="0.6" />
          <line x1="12" y1="8" x2="15" y2="19" stroke="#ffd27d" strokeWidth="0.6" />
          <path d="M 10,21 L 10,19 M 14,21 L 14,19" stroke="#8a2e22" strokeWidth="1" />
        </svg>
      ),
    },
    {
      id: 'literature',
      label: 'LITERATURE',
      subtitle: 'Poetry, Dramas & Epics',
      color: '#e57373',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor">
          <path d="M 2,6 Q 7,4 12,6 Q 17,4 22,6 L 22,18 Q 17,16 12,18 Q 7,16 2,18 Z" fill="#f4ecd9" stroke="#3a2517" strokeWidth="0.9" />
          <line x1="12" y1="6" x2="12" y2="18" stroke="#8a2e22" strokeWidth="1.2" />
          <path d="M 4,9 Q 7,8 10,9 M 4,12 Q 7,11 10,12 M 14,9 Q 17,8 20,9 M 14,12 Q 17,11 20,12" stroke="#4a3525" strokeWidth="0.7" strokeDasharray="1,1" fill="none" />
        </svg>
      ),
    },
    {
      id: 'scriptures',
      label: 'SCRIPTURES',
      subtitle: 'Vedas, Upanishads & Gita',
      color: '#ffb74d',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor">
          <rect x="6" y="4" width="12" height="16" rx="1" fill="#ede0c4" stroke="#3a2517" strokeWidth="0.9" />
          <ellipse cx="6" cy="12" rx="2" ry="8" fill="#d2af82" stroke="#3a2517" strokeWidth="0.8" />
          <ellipse cx="18" cy="12" rx="2" ry="8" fill="#d2af82" stroke="#3a2517" strokeWidth="0.8" />
          <circle cx="12" cy="12" r="3" fill="#8a2e22" fillOpacity="0.85" />
          <circle cx="12" cy="12" r="1.3" fill="#ffd27d" />
        </svg>
      ),
    },
    {
      id: 'keyPersons',
      label: 'KEY PERSONS',
      subtitle: 'Sages, Scholars & Monarchs',
      color: '#ba68c8',
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-4.5 sm:h-4.5" fill="currentColor">
          <circle cx="12" cy="5" r="2.2" fill="#d4af37" stroke="#3a2517" strokeWidth="0.8" />
          <ellipse cx="12" cy="14" rx="4" ry="5" fill="#3e2313" stroke="#3a2517" strokeWidth="0.8" />
          <path d="M 6,19 Q 12,16 18,19 Q 12,22 6,19 Z" fill="#7a4e2c" stroke="#3a2517" strokeWidth="0.8" />
          <circle cx="12" cy="19" r="1" fill="#ffd27d" />
        </svg>
      ),
    },
  ];

  return (
    <div 
      className="relative w-52 sm:w-60 p-3.5 sm:p-4 rounded-[2px] font-manuscript select-none text-[#2a170d]"
      style={{
        backgroundColor: '#e7d5ab',
        backgroundImage: `
          radial-gradient(circle at 20% 25%, rgba(180, 140, 95, 0.09) 0%, transparent 45%),
          radial-gradient(circle at 85% 75%, rgba(150, 110, 70, 0.11) 0%, transparent 50%),
          radial-gradient(circle at 50% 10%, rgba(200, 165, 120, 0.08) 0%, transparent 40%),
          radial-gradient(ellipse at 50% 50%, #f4e9d2 0%, #ebdcb9 65%, #dfcca1 100%),
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")
        `,
        border: '1.5px solid #754c29',
        boxShadow: `
          0 8px 25px rgba(60, 35, 15, 0.25),
          inset 0 0 20px rgba(115, 75, 35, 0.14),
          inset 0 0 3px rgba(70, 40, 18, 0.22)
        `
      }}
    >
      {/* Antique Inset Border with Cartographic Corner Brackets */}
      <div 
        className="absolute inset-[3px] pointer-events-none rounded-[1px]"
        style={{
          border: '1px solid rgba(120, 78, 43, 0.4)',
        }}
      />
      <div 
        className="absolute inset-[5px] pointer-events-none rounded-[1px]"
        style={{
          border: '0.5px dashed rgba(140, 95, 55, 0.3)',
        }}
      />

      {/* 4 Ornamental Brass Corner Flourishes */}
      <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#754c29] pointer-events-none opacity-85" />
      <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#754c29] pointer-events-none opacity-85" />
      <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#754c29] pointer-events-none opacity-85" />
      <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#754c29] pointer-events-none opacity-85" />

      {/* Tiny corner dots */}
      <div className="absolute top-2 left-2 w-0.5 h-0.5 rounded-full bg-[#754c29] opacity-70 pointer-events-none" />
      <div className="absolute top-2 right-2 w-0.5 h-0.5 rounded-full bg-[#754c29] opacity-70 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-0.5 h-0.5 rounded-full bg-[#754c29] opacity-70 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-0.5 h-0.5 rounded-full bg-[#754c29] opacity-70 pointer-events-none" />

      {/* Heading Header */}
      <div className="text-center pb-2 mb-2.5 border-b border-[#754c29]/30">
        <div className="flex items-center justify-center gap-1.5 mb-0.5">
          <span className="text-[#8c592e] text-[10px] opacity-75">❖</span>
          <h4 className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.28em] text-[#3d1e11] uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]">
            ATLAS LEGEND
          </h4>
          <span className="text-[#8c592e] text-[10px] opacity-75">❖</span>
        </div>
        <p className="font-marcellus text-[8.5px] text-[#6d492c] italic tracking-wider">
          Click category to toggle markers
        </p>
      </div>

      {/* Category Toggle Items */}
      <div className="space-y-1.5">
        {categories.map((cat) => {
          const isActive = activeCategories.has(cat.id);

          return (
            <motion.button
              key={cat.id}
              onClick={() => {
                if (window.playTempleChime) window.playTempleChime();
                onToggleCategory(cat.id);
              }}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[2px] transition-all cursor-pointer text-left relative overflow-hidden group"
              style={{
                backgroundColor: isActive ? 'rgba(247, 237, 215, 0.82)' : 'rgba(235, 222, 196, 0.35)',
                border: isActive ? '1px solid #b89352' : '1px solid rgba(138, 92, 54, 0.28)',
                boxShadow: isActive 
                  ? '0 1px 3px rgba(60, 35, 15, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.65), inset 0 -1px 2px rgba(120, 80, 40, 0.08)'
                  : 'none',
                opacity: isActive ? 1 : 0.6,
              }}
            >
              {/* Subtle hover highlight background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ffd27d]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="flex items-center gap-2.5 z-10">
                {/* Icon Capsule */}
                <div 
                  className="p-1 rounded-[2px] transition-all"
                  style={{
                    backgroundColor: isActive ? '#f8f0dc' : '#ece0c5',
                    border: isActive ? '1px solid #c29d5b' : '1px solid rgba(138, 92, 54, 0.3)',
                    boxShadow: isActive ? 'inset 0 1px 1px rgba(255,255,255,0.8)' : 'none'
                  }}
                >
                  {cat.icon}
                </div>

                {/* Text Labels */}
                <div className="flex flex-col">
                  <span 
                    className="font-cinzel text-[10.5px] sm:text-xs tracking-wider uppercase font-bold transition-colors"
                    style={{
                      color: isActive ? '#341a0e' : '#6b4c34',
                      textShadow: '0 1px 0 rgba(255, 255, 255, 0.5)'
                    }}
                  >
                    {cat.label}
                  </span>
                  <span 
                    className="font-marcellus text-[8px] tracking-tight hidden sm:block transition-colors"
                    style={{
                      color: isActive ? '#6d482c' : '#8d6d53'
                    }}
                  >
                    {cat.subtitle}
                  </span>
                </div>
              </div>

              {/* Status Indicator Pip */}
              <div 
                className="w-2 h-2 rounded-full transition-all z-10"
                style={{
                  backgroundColor: isActive ? '#d4af37' : 'transparent',
                  border: isActive ? '1px solid #fff2d1' : '1px solid rgba(138, 92, 54, 0.5)',
                  boxShadow: isActive ? '0 0 5px #e5b938' : 'none'
                }}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Footer Cartographic Note */}
      <div className="pt-2 mt-2 border-t border-[#754c29]/25 text-center flex items-center justify-center gap-1.5">
        <span className="text-[8px] text-[#8c592e] opacity-60">─</span>
        <span className="font-marcellus text-[8px] tracking-[0.2em] text-[#6d492c] uppercase font-semibold">
          Historical Atlas Cartography
        </span>
        <span className="text-[8px] text-[#8c592e] opacity-60">─</span>
      </div>
    </div>
  );
}
