import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  RotateCcw, 
  BookOpen, 
  ChevronRight, 
  X, 
  Sparkles,
  Compass,
  Scroll,
  Quote,
  Layers,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import AudioControl from './AudioControl';
import { 
  KEEPERS_HERO_DATA, 
  KEEPERS_TIMELINE_ERAS, 
  KEY_PERSONS_COLLECTION, 
  TRANSMISSION_NETWORK_DATA 
} from '../data/scripturesKeepersData';

export default function ScripturesKeyPersonsExperience({
  onReturnToScriptures,
  onReturnToMap,
  onReliveJourney
}) {
  // Navigation & Interactive States
  const [selectedEra, setSelectedEra] = useState('all');
  const [activeModalPerson, setActiveModalPerson] = useState(null);
  const [featuredPersonId, setFeaturedPersonId] = useState('vyasa');
  const [activeStreamId, setActiveStreamId] = useState('epic-stream');

  // Section Refs for smooth scrolling
  const galleryRef = useRef(null);
  const transmissionRef = useRef(null);
  const featuredRef = useRef(null);

  // Subtle ancient bell sound
  const playBellChime = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 2.2);
    } catch {
      // Audio fallback
    }
  };

  // Open modal & set featured person
  const handleOpenPerson = (person) => {
    playBellChime();
    setActiveModalPerson(person);
    setFeaturedPersonId(person.id);
  };

  // Trace lineage from modal or card
  const handleTraceLineage = (personId) => {
    setActiveModalPerson(null);
    setFeaturedPersonId(personId);
    
    // Find matching stream in transmission network
    const stream = TRANSMISSION_NETWORK_DATA.branches.find(
      b => b.personId === personId || b.secondaryPersonId === personId
    );
    if (stream) {
      setActiveStreamId(stream.id);
    }

    setTimeout(() => {
      transmissionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Filtered persons
  const displayedPersons = selectedEra === 'all'
    ? KEY_PERSONS_COLLECTION
    : KEY_PERSONS_COLLECTION.filter(p => p.eraId === selectedEra);

  // Active featured person for "The Voice Behind The Text"
  const featuredPerson = KEY_PERSONS_COLLECTION.find(p => p.id === featuredPersonId) || KEY_PERSONS_COLLECTION[0];

  // Active transmission stream
  const activeStream = TRANSMISSION_NETWORK_DATA.branches.find(b => b.id === activeStreamId) || TRANSMISSION_NETWORK_DATA.branches[1];

  return (
    <div className="w-full min-h-screen bg-[#070503] text-[#fcf5e5] select-none font-sans overflow-x-hidden relative">

      {/* ====================================================================
          CINEMATIC DARK ARCHIVE BACKGROUND TEXTURE & VIGNETTE
          ==================================================================== */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 bg-cover bg-center mix-blend-luminosity"
        style={{ backgroundImage: `url('/assets/scriptures_temple_vault_bg.jpg')` }}
      />
      {/* Warm golden atmospheric ambient glow */}
      <div className="fixed inset-0 pointer-events-none bg-radial-[circle_at_50%_25%_rgba(197,160,89,0.08),transparent_70%]" />
      {/* Deep cinematic black edge vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_180px_rgba(3,2,1,0.95)]" />

      {/* ====================================================================
          TOP NAVIGATION HEADER (DARK TRANSLUCENT WITH THIN GOLD BORDERS)
          ==================================================================== */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#070503]/90 border-b border-[#c5a059]/30 px-4 sm:px-6 md:px-8 py-3 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.85)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          
          {/* LEFT: Sequential non-overlapping navigation controls */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center md:justify-start">
            <button
              onClick={onReturnToScriptures}
              className="group flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a059]/50 bg-[#160b06]/95 hover:border-[#ffd27d] hover:bg-[#261309] text-[#ffd27d] text-xs tracking-[0.16em] font-cinzel font-semibold uppercase transition-all cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.8)] shrink-0"
              title="Return to The Sacred Word Archive"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#c5a059]" />
              <span>RETURN TO SCRIPTURES</span>
            </button>

            {onReturnToMap && (
              <button
                onClick={onReturnToMap}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#c5a059]/35 bg-[#140c07]/80 hover:bg-[#23120b] hover:border-[#ffd27d]/60 text-[#deb881] hover:text-[#ffd27d] text-xs font-marcellus tracking-wider transition-all cursor-pointer backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.6)] shrink-0"
                title="Return to Bhārata Varṣa Map"
              >
                <ArrowLeft className="w-3 h-3 text-[#c5a059]" />
                <span className="hidden sm:inline">Bhārata Varṣa Map</span>
                <span className="sm:hidden">Map</span>
              </button>
            )}

            {onReliveJourney && (
              <button
                onClick={onReliveJourney}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c5a059]/30 bg-[#140c07]/70 hover:bg-[#23120b] hover:border-[#ffd27d]/50 text-[#c5a059] hover:text-[#ffd27d] text-xs font-marcellus tracking-wider transition-all cursor-pointer backdrop-blur-md shrink-0"
                title="Relive Journey"
              >
                <RotateCcw className="w-3 h-3 text-[#c5a059]" />
                <span>Relive</span>
              </button>
            )}
          </div>

          {/* CENTER: Chapter title & Devanagari seal */}
          <div className="text-center space-y-0.5 select-none shrink-0 px-2">
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] animate-pulse" />
              <span className="text-xs sm:text-sm font-cinzel font-bold text-[#ffd27d] tracking-[0.24em] uppercase">
                THE KEEPERS OF KNOWLEDGE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] animate-pulse" />
            </div>
            <p className="text-[10px] sm:text-xs font-devanagari text-[#c5a059] tracking-wider">
              {KEEPERS_HERO_DATA.sanskritMotto}
            </p>
          </div>

          {/* RIGHT: Audio & Haryana Heritage Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <AudioControl />

            <div className="bg-[#140b07]/95 px-3.5 py-1.5 rounded-full border border-[#c9a45a]/40 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.8)] flex items-center gap-2">
              <div className="w-4 h-4 rounded-full overflow-hidden border border-[#c5a059]">
                <img src="/assets/sacred_mandala.jpg" alt="Sanskriti" className="w-full h-full object-cover" />
              </div>
              <span className="font-cinzel text-[11px] font-bold tracking-[0.18em] text-[#fff2d1]">
                HARYANA
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================================
          SECTION 1: HERO — THE KEEPERS OF KNOWLEDGE (CINEMATIC 100VH)
          ==================================================================== */}
      <section className="relative min-h-[92vh] sm:min-h-[96vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12 overflow-hidden border-b border-[#c5a059]/25">
        
        {/* Cinematic Archival Temple / Vault Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-40 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url('/assets/monastic_libraries_corridor.jpg')` }}
        />
        {/* Darkening gradient layers for readability & dramatic atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070503] via-[#070503]/75 to-[#070503]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_50%_40%_rgba(197,160,89,0.12),transparent_65%] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center space-y-5">
          
          {/* Small Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#c5a059]/50 bg-[#160b06]/85 backdrop-blur-sm shadow-[0_0_15px_rgba(197,160,89,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffd27d] animate-ping" />
            <span className="text-[11px] font-cinzel font-semibold tracking-[0.25em] text-[#ffd27d] uppercase">
              {KEEPERS_HERO_DATA.eyebrow}
            </span>
          </div>

          {/* Large Dramatic Headline: THE KEEPERS OF KNOWLEDGE */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-cinzel font-bold text-[#fcf5e5] tracking-[0.14em] uppercase leading-[1.05] drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
              THE<br />
              <span className="bg-gradient-to-r from-[#ffd27d] via-[#fcf5e5] to-[#c5a059] bg-clip-text text-transparent">
                KEEPERS
              </span><br />
              OF KNOWLEDGE
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-xl md:text-2xl font-marcellus text-[#ded0b8] italic max-w-2xl leading-relaxed drop-shadow-md">
            {KEEPERS_HERO_DATA.subtitle}
          </p>

          {/* Subtle Horizontal Divider with Diamond */}
          <div className="w-full max-w-xs flex items-center justify-center gap-3 my-2">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c5a059]" />
            <span className="text-xs text-[#ffd27d] select-none filter drop-shadow-[0_0_4px_#ffd27d]">❖</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c5a059]" />
          </div>

          {/* Small Supporting Line */}
          <p className="text-xs sm:text-sm font-cinzel font-semibold tracking-[0.28em] text-[#c5a059] uppercase">
            {KEEPERS_HERO_DATA.supportingLine}
          </p>

          {/* Scroll Prompt Button */}
          <div className="pt-6">
            <button
              onClick={() => galleryRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex flex-col items-center gap-2 text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.2em] uppercase transition-colors cursor-pointer"
            >
              <span>ENTER THE ARCHIVE</span>
              <ChevronDown className="w-4 h-4 animate-bounce text-[#ffd27d]" />
            </button>
          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 2: “THE LIVING LINEAGE” — ARCHIVAL PORTRAIT GALLERY
          ==================================================================== */}
      <section ref={galleryRef} className="py-20 md:py-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-14 pb-6 border-b border-[#c5a059]/25">
          <div className="text-center md:text-left space-y-2">
            <span className="text-[11px] font-cinzel font-bold tracking-[0.26em] text-[#c5a059] uppercase">
              ARCHIVAL PORTRAIT GALLERY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-[#fcf5e5] tracking-[0.08em]">
              THE LIVING LINEAGE
            </h2>
            <p className="text-sm sm:text-base font-marcellus text-[#ded0b8] max-w-xl">
              “Meet the voices through whom knowledge travelled across generations.”
            </p>
          </div>

          {/* Minimal Era Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#140b06]/90 border border-[#c5a059]/40 shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex-wrap justify-center">
            {KEEPERS_TIMELINE_ERAS.map((era) => {
              const isSelected = selectedEra === era.id;
              return (
                <button
                  key={era.id}
                  onClick={() => {
                    playBellChime();
                    setSelectedEra(era.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-cinzel tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#c5a059] to-[#916922] text-[#070503] font-bold shadow-[0_0_12px_rgba(197,160,89,0.5)]'
                      : 'text-[#c5a059] hover:text-[#ffd27d] hover:bg-[#23120b]'
                  }`}
                >
                  {era.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Large Portrait Cards: 3 per row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedPersons.map((person) => (
            <motion.div
              key={person.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              onClick={() => handleOpenPerson(person)}
              className="group relative rounded-2xl bg-[#0f0a06] border border-[#c5a059]/35 hover:border-[#ffd27d] hover:shadow-[0_12px_36px_rgba(197,160,89,0.18)] -translate-y-0 hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-end min-h-[440px] sm:min-h-[480px]"
            >
              {/* Full-bleed Portrait with Sepia tone & Slow Zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={person.portrait}
                  alt={person.name}
                  className="w-full h-full object-cover object-center filter sepia-[0.3] contrast-[1.08] brightness-[0.85] group-hover:scale-108 group-hover:brightness-[0.98] group-hover:sepia-[0.1] transition-all duration-700"
                  loading="lazy"
                />
                {/* Subtle dark gradient overlay from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070503] via-[#070503]/75 to-transparent z-10" />
                <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] z-10 pointer-events-none" />
              </div>

              {/* Corner Plate Stamp */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#070503]/85 backdrop-blur-md border border-[#c5a059]/40 text-[10px] font-cinzel text-[#ffd27d] tracking-widest uppercase">
                {person.plateNo}
              </div>

              {/* Card Content (ONLY NAME, ROLE, TRADITION, EXPLORE) */}
              <div className="relative z-20 p-6 sm:p-7 space-y-2.5">
                
                {/* Tradition Label in Gold */}
                <span className="text-xs font-cinzel font-bold tracking-[0.22em] text-[#ffd27d] uppercase drop-shadow">
                  {person.tradition}
                </span>

                {/* Name in Ivory Serif */}
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#fcf5e5] group-hover:text-[#ffd27d] tracking-[0.08em] transition-colors leading-tight">
                  {person.name}
                </h3>

                {/* Sanskrit name */}
                <p className="text-xs font-devanagari text-[#c5a059] tracking-wide">
                  {person.sanskritName}
                </p>

                {/* Short Role Tagline */}
                <p className="text-xs sm:text-sm font-manuscript text-[#ded0b8] italic">
                  “{person.shortTagline}”
                </p>

                {/* Bottom Action: EXPLORE → */}
                <div className="pt-3 flex items-center justify-between border-t border-[#c5a059]/25 text-xs font-cinzel tracking-[0.2em]">
                  <span className="text-[#c5a059] group-hover:text-[#ffd27d] font-semibold transition-colors">
                    EXPLORE RECORD
                  </span>
                  <span className="flex items-center gap-1 text-[#ffd27d] group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </section>

      {/* ====================================================================
          SECTION 3: “THREADS OF TRANSMISSION” — INTERACTIVE VISUAL NETWORK
          ==================================================================== */}
      <section ref={transmissionRef} className="py-20 md:py-28 px-4 sm:px-6 md:px-12 bg-[#090604] border-y border-[#c5a059]/25 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <span className="text-[11px] font-cinzel font-bold tracking-[0.28em] text-[#c5a059] uppercase">
              INTERACTIVE LINEAGE NETWORK
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-[#fcf5e5] tracking-[0.08em]">
              THREADS OF TRANSMISSION
            </h2>
            <p className="text-sm sm:text-base font-marcellus text-[#ded0b8]">
              Witness how India’s primordial revelation branched through specific custodians into epics, poetics, grammar, and yogic science. Click any stream to illuminate its pathway.
            </p>
          </div>

          {/* Transmission Tree Network Visualization */}
          <div className="p-6 sm:p-10 rounded-3xl bg-[#0c0805] border border-[#c5a059]/35 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
            
            {/* Top Root Node: VEDIC KNOWLEDGE */}
            <div className="flex flex-col items-center text-center mb-10">
              <div className="px-6 py-3 rounded-2xl bg-[#160e08] border-2 border-[#ffd27d] shadow-[0_0_25px_rgba(197,160,89,0.3)] space-y-1">
                <span className="text-[10px] font-cinzel font-bold tracking-[0.25em] text-[#c5a059] uppercase">
                  PRIMORDIAL REVELATION
                </span>
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-[#ffd27d] tracking-[0.16em]">
                  {TRANSMISSION_NETWORK_DATA.root.title}
                </h3>
                <p className="text-xs font-devanagari text-[#ded0b8]">
                  {TRANSMISSION_NETWORK_DATA.root.sanskrit}
                </p>
              </div>

              {/* Vertical Branching Trunk Line */}
              <div className="w-0.5 h-10 bg-gradient-to-b from-[#ffd27d] to-[#c5a059]/50 my-1" />
            </div>

            {/* 4 Interactive Branch Streams */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {TRANSMISSION_NETWORK_DATA.branches.map((stream) => {
                const isActive = activeStreamId === stream.id;
                return (
                  <div
                    key={stream.id}
                    onClick={() => {
                      playBellChime();
                      setActiveStreamId(stream.id);
                      setFeaturedPersonId(stream.personId);
                    }}
                    className={`rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#1a100a] border-[#ffd27d] shadow-[0_0_30px_rgba(197,160,89,0.3)] scale-[1.02]'
                        : 'bg-[#100b07] border-[#c5a059]/25 hover:border-[#c5a059]/60 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Branch Category */}
                      <span className={`text-[10px] font-cinzel font-bold tracking-[0.2em] uppercase ${
                        isActive ? 'text-[#ffd27d]' : 'text-[#c5a059]'
                      }`}>
                        {stream.traditionTag}
                      </span>

                      {/* Branch Name */}
                      <h4 className="text-base font-cinzel font-bold text-[#fcf5e5] leading-snug">
                        {stream.name}
                      </h4>

                      {/* Custodian Nodes */}
                      <div className="pt-2 space-y-1.5 border-t border-[#c5a059]/20">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#ffd27d] shadow-[0_0_8px_#ffd27d]' : 'bg-[#c5a059]'}`} />
                          <span className="text-xs font-cinzel font-bold text-[#fcf5e5]">
                            {stream.personName}
                          </span>
                        </div>
                        {stream.secondaryPersonName && (
                          <div className="flex items-center gap-2 pl-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]/70" />
                            <span className="text-xs font-cinzel text-[#ded0b8]">
                              {stream.secondaryPersonName}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Text & Outcome */}
                      <div className="space-y-1 text-xs font-manuscript text-[#ded0b8] pt-2 border-t border-[#c5a059]/15">
                        <p><strong className="text-[#ffd27d] font-cinzel text-[10px] tracking-wider uppercase">TEXT:</strong> {stream.coreText}</p>
                        <p><strong className="text-[#c5a059] font-cinzel text-[10px] tracking-wider uppercase">RESULT:</strong> {stream.outcome}</p>
                      </div>
                    </div>

                    {/* Active Indicator Prompt */}
                    <div className="pt-4 mt-3 border-t border-[#c5a059]/20 flex items-center justify-between text-[11px] font-cinzel">
                      <span className={isActive ? 'text-[#ffd27d] font-bold' : 'text-[#c5a059]'}>
                        {isActive ? '● ILLUMINATED' : 'CLICK TO TRACE'}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1 text-[#ffd27d]' : 'text-[#c5a059]'}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contextual Deep Dive for Selected Stream */}
            <div className="mt-8 p-6 rounded-2xl bg-[#140c07] border border-[#c5a059]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ffd27d] animate-ping" />
                  <span className="text-xs font-cinzel font-bold text-[#ffd27d] tracking-[0.2em] uppercase">
                    ACTIVE LINEAGE PATHWAY · {activeStream.traditionTag}
                  </span>
                </div>
                <p className="text-sm font-manuscript text-[#ded0b8] max-w-2xl leading-relaxed">
                  {activeStream.details} Transmitted through unbroken Guru-Śiṣya lineages, metric memorization, and classical commentary.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => {
                    const person = KEY_PERSONS_COLLECTION.find(p => p.id === activeStream.personId);
                    if (person) handleOpenPerson(person);
                  }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c5a059] to-[#916922] hover:from-[#ffd27d] hover:to-[#c5a059] text-[#070503] text-xs font-cinzel font-bold tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                >
                  EXPLORE {activeStream.personName} RECORD →
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 4: “THE VOICE BEHIND THE TEXT” — FEATURED KEEPER PROFILE
          ==================================================================== */}
      <section ref={featuredRef} className="py-20 md:py-28 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[11px] font-cinzel font-bold tracking-[0.28em] text-[#c5a059] uppercase">
            INDIVIDUAL SPOTLIGHT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-[#fcf5e5] tracking-[0.08em]">
            THE VOICE BEHIND THE TEXT
          </h2>
          <p className="text-sm sm:text-base font-marcellus text-[#ded0b8]">
            Behind every sacred verse was a living sage who contemplated, codified, and carried truth forward.
          </p>
        </div>

        {/* Split Layout: Left Large Portrait / Right Concise Story & Quote */}
        <div className="rounded-3xl bg-[#0c0805] border border-[#c5a059]/35 p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT: Large Artistic Portrait with Gold Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#c5a059] shadow-[0_0_35px_rgba(197,160,89,0.2)] bg-[#140b06]">
                <img 
                  src={featuredPerson.portrait} 
                  alt={featuredPerson.name}
                  className="w-full h-full object-cover filter sepia-[0.25] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070503] via-transparent to-transparent pointer-events-none" />
                
                {/* Plate Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#070503]/90 backdrop-blur-xs border border-[#c5a059] text-[10px] font-cinzel font-bold text-[#ffd27d] tracking-widest">
                  {featuredPerson.plateNo}
                </div>
              </div>

              {/* Sanskrit Quote Plaque under image */}
              <div className="w-full max-w-md mt-4 p-3 rounded-xl bg-[#140c07] border border-[#c5a059]/30 text-center">
                <p className="text-xs sm:text-sm font-devanagari text-[#ffd27d] font-semibold leading-relaxed">
                  {featuredPerson.sanskritQuote}
                </p>
              </div>
            </div>

            {/* RIGHT: Name, Tradition, Associated Text, Story & Action */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              
              {/* Header Info */}
              <div className="space-y-1.5">
                <span className="text-xs font-cinzel font-bold tracking-[0.22em] text-[#ffd27d] uppercase">
                  {featuredPerson.tradition}
                </span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-cinzel font-bold text-[#fcf5e5] tracking-wide">
                  {featuredPerson.name}
                </h3>
                <p className="text-sm sm:text-base font-devanagari text-[#c5a059]">
                  {featuredPerson.sanskritName}
                </p>
                <p className="text-xs font-cinzel text-[#a8864b] tracking-widest uppercase">
                  {featuredPerson.period}
                </p>
              </div>

              {/* Classical Quote in Italic Garamond */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#160e08]/90 border-l-4 border-[#ffd27d] space-y-1">
                <p className="text-sm sm:text-base font-manuscript text-[#ffd27d] italic leading-relaxed">
                  {featuredPerson.quote}
                </p>
              </div>

              {/* 2-3 Sentence Story */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-cinzel font-bold tracking-[0.2em] text-[#c5a059] uppercase">
                  HISTORICAL CONTRIBUTION
                </h4>
                <p className="text-sm sm:text-base font-manuscript text-[#ded0b8] leading-relaxed">
                  {featuredPerson.shortDescription}
                </p>
              </div>

              {/* Associated Text & Tags */}
              <div className="space-y-2">
                <h4 className="text-xs font-cinzel font-bold tracking-[0.2em] text-[#c5a059] uppercase">
                  ASSOCIATED CANONICAL TEXTS
                </h4>
                <p className="text-sm font-cinzel text-[#fcf5e5] font-semibold">
                  {featuredPerson.associatedTexts}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {featuredPerson.visualTags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-0.5 rounded-full bg-[#1b1109] border border-[#c5a059]/40 text-[10px] font-cinzel font-bold text-[#ffd27d] tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => handleOpenPerson(featuredPerson)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#c5a059] to-[#916922] hover:from-[#ffd27d] hover:to-[#c5a059] text-[#070503] text-xs font-cinzel font-bold tracking-[0.2em] uppercase transition-all cursor-pointer shadow-[0_0_20px_rgba(197,160,89,0.3)]"
                >
                  <span>EXPLORE THEIR RECORD</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* Quick Keeper Switcher Carousel at Bottom */}
          <div className="mt-10 pt-6 border-t border-[#c5a059]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-cinzel font-bold tracking-[0.2em] text-[#c5a059] uppercase">
              SWITCH SPOTLIGHT KEEPER:
            </span>
            <div className="flex items-center gap-2.5 overflow-x-auto max-w-full pb-2 sm:pb-0">
              {KEY_PERSONS_COLLECTION.map((k) => (
                <button
                  key={k.id}
                  onClick={() => {
                    playBellChime();
                    setFeaturedPersonId(k.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-cinzel transition-all cursor-pointer shrink-0 ${
                    featuredPersonId === k.id
                      ? 'bg-[#ffd27d] text-[#070503] border-[#ffd27d] font-bold shadow-[0_0_12px_rgba(255,210,125,0.4)]'
                      : 'bg-[#140b06] text-[#c5a059] border-[#c5a059]/35 hover:border-[#ffd27d]'
                  }`}
                >
                  <img src={k.portrait} alt={k.name} className="w-4 h-4 rounded-full object-cover" />
                  <span>{k.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* ====================================================================
          SECTION 5: MINIMAL TIMELINE (VEDIC → EPIC → CLASSICAL → PHILOSOPHICAL)
          ==================================================================== */}
      <section className="py-16 px-4 sm:px-6 md:px-12 bg-[#090604] border-t border-[#c5a059]/25">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <div className="space-y-1">
            <span className="text-[10px] font-cinzel font-bold tracking-[0.28em] text-[#c5a059] uppercase">
              HISTORICAL SEQUENCE
            </span>
            <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-[#fcf5e5] tracking-wide">
              CHRONOLOGY OF TRANSMISSION
            </h3>
          </div>

          {/* Minimal visual line */}
          <div className="relative py-4">
            {/* Connecting golden line */}
            <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#c5a059]/20 via-[#c5a059] to-[#c5a059]/20 hidden sm:block" />

            <div className="relative z-10 flex items-center justify-between gap-3 overflow-x-auto px-4">
              {KEEPERS_TIMELINE_ERAS.filter(e => e.id !== 'all').map((era) => {
                const isSelected = selectedEra === era.id;
                return (
                  <button
                    key={era.id}
                    onClick={() => {
                      playBellChime();
                      setSelectedEra(era.id);
                      galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex flex-col items-center group cursor-pointer px-2"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-[#ffd27d] text-[#070503] font-bold shadow-[0_0_15px_#ffd27d] scale-110'
                        : 'bg-[#160b06] text-[#c5a059] border border-[#c5a059]/50 group-hover:border-[#ffd27d]'
                    }`}>
                      <span className="text-xs">{era.number}</span>
                    </div>
                    <span className={`mt-2 text-xs font-cinzel font-bold tracking-wider ${
                      isSelected ? 'text-[#ffd27d]' : 'text-[#ded0b8] group-hover:text-[#fcf5e5]'
                    }`}>
                      {era.label}
                    </span>
                    <span className="text-[10px] font-manuscript text-[#a8864b]">
                      {era.period}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================================
          SECTION 6: EPILOGUE & RETURN
          ==================================================================== */}
      <section className="py-20 px-4 sm:px-6 md:px-12 text-center max-w-4xl mx-auto space-y-6">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#160b06] border border-[#c5a059] flex items-center justify-center text-[#ffd27d] shadow-[0_0_18px_rgba(197,160,89,0.2)]">
          <BookOpen className="w-5 h-5" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-[#fcf5e5] tracking-wide">
          CONTINUE TO THE SACRED MANUSCRIPTS
        </h3>
        <p className="text-sm sm:text-base font-manuscript text-[#ded0b8] max-w-xl mx-auto leading-relaxed">
          The minds of these keepers gave birth to the physical birch-bark and palm-leaf manuscripts preserved in the archive vaults.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap pt-3">
          <button
            onClick={onReturnToScriptures}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#c5a059] to-[#916922] hover:from-[#ffd27d] hover:to-[#c5a059] text-[#070503] text-xs font-cinzel font-bold tracking-[0.2em] transition-all cursor-pointer shadow-[0_0_20px_rgba(197,160,89,0.35)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO SCRIPTURES ARCHIVE</span>
          </button>
          {onReturnToMap && (
            <button
              onClick={onReturnToMap}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#c5a059]/50 bg-[#160b06] hover:bg-[#23120b] hover:border-[#ffd27d] text-[#ffd27d] text-xs font-cinzel font-semibold tracking-[0.18em] transition-all cursor-pointer shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
            >
              <Compass className="w-4 h-4 text-[#c5a059]" />
              <span>BHĀRATA VARṢA MAP</span>
            </button>
          )}
        </div>
      </section>

      {/* ====================================================================
          MODAL: LARGE CINEMATIC ARCHIVAL DETAIL PANEL
          ==================================================================== */}
      <AnimatePresence>
        {activeModalPerson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={() => setActiveModalPerson(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-[#0c0805] border-2 border-[#c5a059]/70 shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-y-auto p-6 sm:p-8 md:p-10 my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalPerson(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-[#160b06] hover:bg-[#281409] border border-[#c5a059] text-[#ffd27d] flex items-center justify-center transition-colors cursor-pointer z-20"
                title="Close Record"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
                
                {/* LEFT: Large Portrait with Plate Badge */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-[#c5a059] shadow-[0_0_30px_rgba(197,160,89,0.2)] bg-[#140b06]">
                    <img 
                      src={activeModalPerson.portrait} 
                      alt={activeModalPerson.name} 
                      className="w-full h-full object-cover filter sepia-[0.25] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0805] via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#070503]/90 backdrop-blur-xs border border-[#c5a059] text-[10px] font-cinzel font-bold text-[#ffd27d] tracking-widest">
                      {activeModalPerson.plateNo}
                    </div>
                  </div>

                  <div className="w-full mt-3 p-2.5 rounded-lg bg-[#160e08] border border-[#c5a059]/30 text-center">
                    <p className="text-xs font-devanagari text-[#ffd27d] font-bold">
                      {activeModalPerson.sanskritQuote}
                    </p>
                  </div>
                </div>

                {/* RIGHT: Exhibition Information */}
                <div className="md:col-span-7 flex flex-col space-y-4">
                  
                  {/* Name, Sanskrit Name, Tradition */}
                  <div className="space-y-1">
                    <span className="text-xs font-cinzel font-bold tracking-[0.22em] text-[#ffd27d] uppercase">
                      {activeModalPerson.tradition}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-[#fcf5e5]">
                      {activeModalPerson.name}
                    </h3>
                    <p className="text-sm font-devanagari text-[#c5a059] font-medium">
                      {activeModalPerson.sanskritName}
                    </p>
                  </div>

                  {/* Associated Texts */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-cinzel font-bold text-[#ffd27d] tracking-wider uppercase">
                      ASSOCIATED CANONICAL TEXTS
                    </h4>
                    <p className="text-sm font-cinzel text-[#fcf5e5]">
                      {activeModalPerson.associatedTexts}
                    </p>
                  </div>

                  {/* Concise 2-3 sentence description */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-cinzel font-bold text-[#c5a059] tracking-wider uppercase">
                      ARCHIVAL SUMMARY
                    </h4>
                    <p className="text-sm font-manuscript text-[#ded0b8] leading-relaxed">
                      {activeModalPerson.shortDescription}
                    </p>
                  </div>

                  {/* Visual Tags */}
                  <div className="space-y-1.5 pt-1">
                    <h4 className="text-xs font-cinzel font-bold text-[#c5a059] tracking-wider uppercase">
                      TRADITION CLASSIFICATION
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeModalPerson.visualTags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 rounded-md bg-[#180f08] border border-[#c5a059]/40 text-xs font-cinzel font-bold text-[#ffd27d] tracking-wider uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex items-center gap-3 flex-wrap">
                    <button
                      onClick={onReturnToScriptures}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c5a059] to-[#916922] hover:from-[#ffd27d] hover:to-[#c5a059] text-[#070503] text-xs font-cinzel font-bold tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>VIEW ASSOCIATED MANUSCRIPTS →</span>
                    </button>
                    <button
                      onClick={() => handleTraceLineage(activeModalPerson.id)}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-[#c5a059]/60 bg-[#160b06] hover:bg-[#24130a] text-[#ffd27d] text-xs font-cinzel font-semibold tracking-wider transition-all cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>TRACE LINEAGE →</span>
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
