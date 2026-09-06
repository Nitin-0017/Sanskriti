import React, { useState } from 'react';
import { User, Menu, X, Compass, Landmark, BookOpen, Shield, Sparkles } from 'lucide-react';
import AudioAmbiance from './AudioAmbiance';

/**
 * Global Antique Heritage Navbar
 * Designed like a royal parchment document header with antique gold accents.
 * Persistent across all pages (Home, Map, Explore, Heritage, About, Auth).
 */
export default function HeritageNavbar({
  currentView = 'landing',
  isMuted,
  setIsMuted,
  onNavigate,
  isVisible = true
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'heritage', label: 'Heritage', icon: Landmark },
    { id: 'about', label: 'About', icon: BookOpen },
  ];

  const handleNavClick = (viewId) => {
    if (window.playTempleChime) window.playTempleChime();
    setMobileMenuOpen(false);
    if (onNavigate) onNavigate(viewId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 sm:py-4 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : currentView === 'landing'
            ? 'translate-y-3 opacity-0 pointer-events-none'
            : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border border-[#c5a059]/35 bg-[#160f0a]/80 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.65)]">

        {/* Left: Brand Wordmark & Emblem */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group"
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#c5a059]/60 group-hover:border-[#ffd27d] transition-colors shadow-[0_0_10px_rgba(197,160,89,0.3)]">
            <img
              src="/assets/sacred_mandala.jpg"
              alt="Sanskriti Emblem"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-cinzel text-base sm:text-lg font-bold tracking-[0.25em] text-[#fff2d1] group-hover:text-[#ffd27d] transition-colors">
              SANSKRITI
            </span>
            <span className="font-marcellus text-[9px] tracking-[0.2em] text-[#c5a059]/80 uppercase hidden sm:block">
              Heritage Atlas of Bharat
            </span>
          </div>
        </div>

        {/* Center/Right: Desktop Navigation Links & Controls */}
        <div className="flex items-center gap-4 sm:gap-7">
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-marcellus tracking-[0.18em] text-[#d8c4a4]">
            {navItems.map((item) => {
              const isActive = currentView === item.id || (item.id === 'explore' && currentView === 'map');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`group relative py-1 cursor-pointer flex items-center gap-1.5 transition-colors duration-300 ${isActive
                      ? 'text-[#f5d794] font-semibold drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]'
                      : 'text-[#d8c4a4] hover:text-[#f7e6c4]'
                    }`}
                >
                  <span className="transition-colors duration-300">{item.label}</span>

                  {/* Refined vintage-gold underline: expands center -> outward in ~300ms on hover */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_8px_rgba(212,175,55,0.5)] transition-all duration-300 ease-out pointer-events-none ${isActive
                        ? 'w-full opacity-100'
                        : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                      }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Procedural Ambiance Audio Toggle */}
          <AudioAmbiance isMuted={isMuted} setIsMuted={setIsMuted} />

          {/* Login / Signup Button */}
          <button
            onClick={() => handleNavClick('auth')}
            className={`group relative flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full border text-xs font-marcellus tracking-wider transition-all duration-300 cursor-pointer ${currentView === 'auth'
                ? 'border-[#ffd27d] bg-[#4a1d22] text-[#fff2d1] shadow-[0_0_15px_rgba(212,175,55,0.5)]'
                : 'border-[#c5a059]/50 bg-gradient-to-b from-[#3d1a1f]/80 to-[#240c10]/90 text-[#f3e5ab] hover:border-[#ffd27d] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
              }`}
          >
            <User className="w-3.5 h-3.5 text-[#c5a059] group-hover:text-[#ffd27d] transition-colors" />
            <span className="hidden sm:inline">Login / Signup</span>
            <span className="sm:hidden">Login</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#ffd27d] p-1 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-sm px-6 py-4 rounded-2xl border border-[#c5a059]/40 bg-[#160f0a]/95 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = currentView === item.id || (item.id === 'explore' && currentView === 'map');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-2 text-left font-marcellus text-sm tracking-widest flex items-center gap-2.5 transition-colors cursor-pointer ${isActive ? 'text-[#ffd27d] font-bold' : 'text-[#d8c4a4] hover:text-[#fff2d1]'
                  }`}
              >
                <item.icon className="w-4 h-4 text-[#c5a059]" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
