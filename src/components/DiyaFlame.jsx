import React from 'react';

/**
 * DiyaFlame Component
 * Creates an authentic flickering Indian oil lamp (Diya) with an ambient light aura.
 * Supports asynchronous timing delays so lamps don't flicker in unison.
 */
export default function DiyaFlame({ 
  className = '', 
  scale = 1, 
  showPedestalGlow = true,
  delay = 0,
  duration = 1.8 
}) {
  return (
    <div className={`relative flex flex-col items-center justify-center pointer-events-none ${className}`}>
      {/* Ambient Pulsating Radial Light Aura on Stone */}
      {showPedestalGlow && (
        <div 
          className="absolute -top-3 w-16 h-16 rounded-full bg-gradient-radial from-[#ff9e2c]/35 via-[#ff5500]/12 to-transparent blur-md pointer-events-none"
          style={{ 
            transform: `scale(${scale * 1.6})`,
            animation: `pulseHalo ${duration * 1.8}s ease-in-out infinite alternate ${delay}s`
          }}
        />
      )}

      {/* Outer Golden Corona Glow */}
      <div 
        className="absolute -top-1 w-6 h-8 rounded-full bg-[#ffaa00]/30 blur-[3px]"
        style={{ 
          transform: `scale(${scale * 1.2})`,
          animation: `diyaFlicker ${duration}s ease-in-out infinite alternate ${delay}s`
        }}
      />

      {/* Primary Tear-Drop Flame */}
      <div 
        className="relative w-3.5 h-6"
        style={{ 
          transform: `scale(${scale})`,
          animation: `diyaFlicker ${duration}s ease-in-out infinite alternate ${delay}s`,
          transformOrigin: 'bottom center',
        }}
      >
        {/* Flame Body with Saffron-Orange-Gold Gradient */}
        <div 
          className="w-full h-full rounded-[50%_50%_50%_50%_/_70%_70%_30%_30%] bg-gradient-to-t from-[#ff4500] via-[#ffaa00] to-[#fff6bd] shadow-[0_0_12px_#ff9900]"
          style={{
            clipPath: 'polygon(50% 0%, 100% 70%, 75% 100%, 25% 100%, 0% 70%)',
          }}
        />

        {/* Inner Hot White/Yellow Core */}
        <div 
          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-3 rounded-[50%_50%_40%_40%_/_60%_60%_30%_30%] bg-white/95 blur-[0.5px]"
        />

        {/* Tiny Cotton Wick */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-[#2d1a0e] rounded-full" />
      </div>
    </div>
  );
}
