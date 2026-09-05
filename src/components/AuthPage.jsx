import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import LivingAtmosphereCanvas from './LivingAtmosphereCanvas';

/**
 * Premium Antique Manuscript Authentication Portal (Login / Signup)
 * Built with classical serif typography, etched gold framing,
 * and warm parchment atmosphere.
 */
export default function AuthPage({ onReturnToLanding, onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.playTempleChime) window.playTempleChime();
    setIsSuccess(true);
    setTimeout(() => {
      if (onLoginSuccess) onLoginSuccess();
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-[#140c07] text-[#2a170d] font-manuscript select-none flex items-center justify-center p-4 sm:p-6 pt-20">
      
      {/* Background Vintage Parchment Surface */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-90"
        style={{ backgroundImage: `url('/assets/map_background.png')` }}
      />
      <div className="fixed inset-0 parchment-vignette pointer-events-none opacity-60" />
      <LivingAtmosphereCanvas mousePos={{ x: 0, y: 0 }} progress={1} isArrival={true} />

      {/* Return Button in Corner */}
      <div className="absolute top-20 left-6 sm:left-12 z-30">
        <button
          onClick={onReturnToLanding}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#c5a059]/40 bg-[#1e120a]/80 hover:bg-[#2e1b10] text-[#ffd27d] text-xs font-marcellus tracking-wider transition-colors cursor-pointer backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return</span>
        </button>
      </div>

      {/* ========================================================
          CENTRAL ANTIQUE MANUSCRIPT AUTHENTICATION PANEL
          ======================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 w-full max-w-md p-6 sm:p-8 rounded-sm border-2 border-[#b89352] bg-[#fbf5e6]/95 text-[#2a170d] shadow-[0_20px_60px_rgba(40,20,10,0.45)] backdrop-blur-md"
        style={{
          boxShadow: `
            0 20px 60px rgba(40, 20, 10, 0.45),
            inset 0 0 25px rgba(115, 75, 35, 0.12),
            inset 0 0 4px rgba(70, 40, 18, 0.25)
          `
        }}
      >
        {/* Double Inset Hairline Cartographic Border */}
        <div className="absolute inset-[3.5px] pointer-events-none rounded-[1px] border border-[rgba(120,78,43,0.4)]" />
        <div className="absolute inset-[6px] pointer-events-none rounded-[1px] border border-dashed border-[rgba(140,95,55,0.25)]" />

        {/* 4 Antique Brass L-Corner Accents */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#754c29] pointer-events-none opacity-85" />
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#754c29] pointer-events-none opacity-85" />
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#754c29] pointer-events-none opacity-85" />
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#754c29] pointer-events-none opacity-85" />

        {/* Header Wax Seal & Title */}
        <div className="text-center pb-4 mb-4 border-b border-[#754c29]/25 relative z-10">
          <div className="w-12 h-12 mx-auto mb-2.5 rounded-full border border-[#b89352] p-1 flex items-center justify-center shadow-[0_0_15px_rgba(184,147,82,0.4)] bg-[#f5ecda]">
            <img src="/assets/sacred_mandala.jpg" alt="Seal" className="w-full h-full object-cover rounded-full" />
          </div>

          <span className="font-marcellus text-[9px] text-[#8a2e22] uppercase tracking-[0.3em] font-bold block mb-0.5">
            Royal Atlas Portal
          </span>

          <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#341a0e] uppercase leading-tight">
            {mode === 'login' ? 'WELCOME BACK TO SANSKRITI' : 'JOIN SANSKRITI'}
          </h2>

          <p className="font-marcellus text-xs text-[#784d2f] italic mt-1">
            {mode === 'login' 
              ? '“Continue your journey through the heritage of Bharat.”'
              : '“Begin your personal expedition across the living heritage of Bharat.”'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex rounded-[2px] border border-[#754c29]/30 bg-[#ebdcb8]/50 p-1 mb-5 relative z-10">
          <button
            type="button"
            onClick={() => { setMode('login'); setIsSuccess(false); }}
            className={`w-1/2 py-1.5 text-center font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer rounded-[1px] ${
              mode === 'login'
                ? 'bg-[#fbf5e6] text-[#341a0e] shadow-xs border border-[#b89352]/60'
                : 'text-[#7a4823] hover:text-[#341a0e]'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setIsSuccess(false); }}
            className={`w-1/2 py-1.5 text-center font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer rounded-[1px] ${
              mode === 'signup'
                ? 'bg-[#fbf5e6] text-[#341a0e] shadow-xs border border-[#b89352]/60'
                : 'text-[#7a4823] hover:text-[#341a0e]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Success Notice */}
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-sm border border-[#b89352] bg-[#f5ebd6] text-center my-4 relative z-10"
          >
            <ShieldCheck className="w-8 h-8 text-[#8a2e22] mx-auto mb-2" />
            <h4 className="font-cinzel text-base font-bold text-[#341a0e] uppercase">
              Passport Authenticated
            </h4>
            <p className="font-marcellus text-xs text-[#704523] italic mt-1">
              Entering the royal archives of Bhārata Varṣa...
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 relative z-10">
            {mode === 'signup' && (
              <div>
                <label className="block text-[10px] font-marcellus text-[#6d482c] uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c6b4e]" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-sm border border-[#754c29]/35 bg-[#f7eed9]/95 text-xs font-manuscript text-[#341a0e] placeholder-[#9a7e63] focus:outline-none focus:border-[#b89352] shadow-inner"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-marcellus text-[#6d482c] uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c6b4e]" />
                <input
                  type="email"
                  required
                  placeholder="name@heritage.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-sm border border-[#754c29]/35 bg-[#f7eed9]/95 text-xs font-manuscript text-[#341a0e] placeholder-[#9a7e63] focus:outline-none focus:border-[#b89352] shadow-inner"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] font-marcellus text-[#6d482c] uppercase tracking-wider">
                  Password
                </label>
                {mode === 'login' && (
                  <button 
                    type="button" 
                    onClick={() => alert("Password recovery scroll will be dispatched to your email address.")}
                    className="text-[9px] font-marcellus text-[#8a2e22] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c6b4e]" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-sm border border-[#754c29]/35 bg-[#f7eed9]/95 text-xs font-manuscript text-[#341a0e] placeholder-[#9a7e63] focus:outline-none focus:border-[#b89352] shadow-inner"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-[10px] font-marcellus text-[#6d482c] uppercase tracking-wider mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c6b4e]" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-sm border border-[#754c29]/35 bg-[#f7eed9]/95 text-xs font-manuscript text-[#341a0e] placeholder-[#9a7e63] focus:outline-none focus:border-[#b89352] shadow-inner"
                  />
                </div>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              type="submit"
              className="btn-antique-journey w-full py-2.5 rounded-sm flex items-center justify-center gap-2 text-xs font-cinzel font-bold text-[#fff4d0] tracking-[0.2em] uppercase mt-4 cursor-pointer shadow-md"
            >
              <span>{mode === 'login' ? 'LOGIN TO ARCHIVE' : 'BEGIN YOUR JOURNEY'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ffd27d]" />
            </button>

            {/* Google Authentication Alternative */}
            <div className="pt-2 text-center">
              <div className="flex items-center gap-2 my-2.5 opacity-60">
                <div className="h-[0.5px] flex-1 bg-[#754c29]" />
                <span className="text-[9px] font-marcellus text-[#754c29] uppercase">OR</span>
                <div className="h-[0.5px] flex-1 bg-[#754c29]" />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (window.playTempleChime) window.playTempleChime();
                  setIsSuccess(true);
                  setTimeout(() => {
                    if (onLoginSuccess) onLoginSuccess();
                  }, 1200);
                }}
                className="w-full py-2 rounded-sm border border-[#754c29]/40 bg-[#ebdcb8]/70 hover:bg-[#ebdcb8] text-[#341a0e] text-xs font-cinzel font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span className="text-xs">❖</span>
                <span>CONTINUE WITH GOOGLE</span>
              </button>
            </div>

            {/* Toggle Switch Prompt */}
            <div className="text-center pt-2">
              {mode === 'login' ? (
                <p className="text-xs font-marcellus text-[#6d482c]">
                  New to Sanskriti?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-[#8a2e22] font-bold hover:underline cursor-pointer"
                  >
                    Create an account
                  </button>
                </p>
              ) : (
                <p className="text-xs font-marcellus text-[#6d482c]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[#8a2e22] font-bold hover:underline cursor-pointer"
                  >
                    Sign in here
                  </button>
                </p>
              )}
            </div>
          </form>
        )}
      </motion.div>

    </div>
  );
}
