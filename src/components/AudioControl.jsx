import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';
import audioManager from '../services/audioManager';

/**
 * Elegant, understated audio control for the Sanskriti Indian Heritage Experience.
 * Fits seamlessly into existing headers and navbars without visual disruption.
 */
export default function AudioControl({ className = "" }) {
  const [audioState, setAudioState] = useState({
    isMuted: audioManager.isMuted,
    masterVolume: audioManager.masterVolume,
    currentEnvironment: audioManager.currentEnvironment,
  });
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((state) => {
      setAudioState(state);
    });
    return unsubscribe;
  }, []);

  // Close slider on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsSliderOpen(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  const handleToggleMute = (e) => {
    e.stopPropagation();
    audioManager.toggleMute();
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    audioManager.setMasterVolume(newVol);
    if (audioManager.isMuted && newVol > 0) {
      audioManager.setMuted(false);
    }
  };

  const { isMuted, masterVolume } = audioState;

  return (
    <div ref={containerRef} className={`relative inline-flex items-center ${className}`}>
      <div className="flex items-center gap-1.5 bg-[#160b06]/90 border border-[#c5a059]/40 hover:border-[#ffd27d]/70 rounded-full px-2.5 sm:px-3 py-1.5 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.85)] transition-all duration-300">
        {/* Mute/Unmute Toggle Button */}
        <button
          onClick={handleToggleMute}
          title={isMuted ? "Awaken Temple Ambiance" : "Silence Temple Ambiance"}
          className="relative flex items-center justify-center text-[#ffd27d] hover:text-[#fffdf7] cursor-pointer transition-colors p-0.5"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-[#9e8568]" />
          ) : masterVolume < 0.25 ? (
            <Volume1 className="w-3.5 h-3.5 text-[#ffd27d]" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#ffd27d] animate-pulse" />
          )}

          {!isMuted && (
            <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffd27d] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ffd27d]"></span>
            </span>
          )}
        </button>

        {/* Text Label & Slider Toggle */}
        <button
          onClick={() => setIsSliderOpen(!isSliderOpen)}
          className="text-[10px] font-cinzel font-semibold tracking-wider text-[#d6b278] hover:text-[#fffdf7] cursor-pointer transition-colors hidden sm:inline"
        >
          {isMuted ? "SOUND OFF" : audioState.inTemple ? "TEMPLE AMBIANCE" : "HERITAGE AMBIANCE"}
        </button>

        {/* Volume Level Indicator / Slider Opener */}
        <button
          onClick={() => setIsSliderOpen(!isSliderOpen)}
          title="Adjust Volume"
          className="w-2.5 h-2.5 flex items-center justify-center text-[#c5a059] hover:text-[#ffd27d] cursor-pointer ml-0.5"
        >
          <span className="text-[9px] leading-none">⚙</span>
        </button>
      </div>

      {/* Subtle Volume Slider Popup */}
      {isSliderOpen && (
        <div 
          className="absolute top-full right-0 mt-2 p-3 rounded-xl bg-[#140a06]/95 border border-[#c5a059]/50 shadow-[0_10px_30px_rgba(0,0,0,0.95)] backdrop-blur-xl z-50 min-w-[150px] animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-center justify-between text-[9px] font-cinzel tracking-wider text-[#ffd27d] mb-2 uppercase">
            <span>VOLUME</span>
            <span>{isMuted ? 'MUTED' : `${Math.round(masterVolume * 100)}%`}</span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : masterVolume}
            onChange={handleVolumeChange}
            className="w-full h-1 bg-[#2e1a10] rounded-lg appearance-none cursor-pointer accent-[#ffd27d]"
          />

          <div className="flex justify-between items-center mt-2.5 pt-2 border-t border-[#c5a059]/20 text-[9px] font-marcellus text-[#e5c58e]">
            <span className="text-[#a38b6d]">Level</span>
            <span className="text-[#ffd27d]">{masterVolume < 0.25 ? 'Low (Restrained)' : masterVolume < 0.5 ? 'Gentle' : 'Loud'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
