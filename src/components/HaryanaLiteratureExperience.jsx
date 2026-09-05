import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Volume2, 
  Play, 
  Pause, 
  BookOpen, 
  Feather, 
  Compass, 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { 
  LITERARY_EPOCHS, 
  VOICES_OF_HARYANA, 
  SCRIPT_VERSE_SPECIMEN, 
  ORAL_EPIC_JOURNEY, 
  ARCHIVAL_SPECIMENS 
} from '../data/literatureData';
import oralRecitationAudio from '../services/oralRecitationAudio';

// Vector Heritage Divider (Replaces unicode emojis with archival SVG)
function LitHeritageDivider({ className = "my-12" }) {
  return (
    <div className={`flex items-center justify-center gap-4 text-[#c5a059]/40 ${className}`}>
      <span className="w-16 sm:w-36 h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]/35" />
      <svg className="w-3.5 h-3.5 text-[#c5a059]/75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12,2 22,12 12,22 2,12" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
      <span className="w-16 sm:w-36 h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]/35" />
    </div>
  );
}

export default function HaryanaLiteratureExperience({
  onBackToGate,
  onNavigateToFolkArts,
  onNavigateToArtisans,
}) {
  // Navigation & Interactive States
  const [selectedEpochIndex, setSelectedEpochIndex] = useState(0);
  const [selectedScriptTab, setSelectedScriptTab] = useState('haryanvi');
  const [selectedEpicStage, setSelectedEpicStage] = useState(0);
  const [activeVoiceModal, setActiveVoiceModal] = useState(null);
  const [activeArchiveModal, setActiveArchiveModal] = useState(null);

  // Audio Recitation Player States
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 42,
  });
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Subscribe to Audio Engine
  useEffect(() => {
    const unsub = oralRecitationAudio.subscribe((state) => {
      setAudioState(state);
    });
    return () => {
      unsub();
      oralRecitationAudio.pause();
    };
  }, []);

  // Live Canvas Waveform Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const renderWaveform = () => {
      const data = oralRecitationAudio.getWaveformData();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 1.8;
      ctx.strokeStyle = audioState.isPlaying ? '#ffd27d' : 'rgba(197, 160, 89, 0.4)';
      ctx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / data.length;
      let x = 0;

      for (let i = 0; i < data.length; i++) {
        const v = data[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Golden glow when active
      if (audioState.isPlaying) {
        ctx.shadowColor = '#ffd27d';
        ctx.shadowBlur = 8;
      } else {
        ctx.shadowBlur = 0;
      }

      animationFrameRef.current = requestAnimationFrame(renderWaveform);
    };

    renderWaveform();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [audioState.isPlaying]);

  const currentEpoch = LITERARY_EPOCHS[selectedEpochIndex];
  const currentEpic = ORAL_EPIC_JOURNEY[selectedEpicStage];
  const currentScriptData = SCRIPT_VERSE_SPECIMEN.scripts[selectedScriptTab];

  return (
    <div className="relative min-h-screen w-full bg-[#0d0704] text-[#f5e9d2] font-manuscript select-none overflow-x-hidden">

      {/* ====================================================================
          FIXED HERITAGE BACKGROUND (Textured Aged Parchment & Sepia Vignette)
          ==================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Base dark brown fallback */}
        <div className="absolute inset-0 bg-[#0e0704]" />

        {/* Vintage Parchment Texture Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply"
          style={{ backgroundImage: `url('/assets/burnt_parchment.jpg')` }}
        />

        {/* Subtle Archival Warm Brown Halo Vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(45, 22, 11, 0.45) 0%, rgba(14, 7, 4, 0.85) 60%, #080402 100%)',
          }}
        />

        {/* Faint Devanagari Watermark in background */}
        <div className="absolute right-[-5%] top-[25%] text-[#c5a059]/[0.025] font-cormorant text-[36rem] leading-none pointer-events-none select-none font-bold">
          अ
        </div>
        <div className="absolute left-[-5%] bottom-[15%] text-[#c5a059]/[0.02] font-cormorant text-[32rem] leading-none pointer-events-none select-none font-bold">
          शब्द
        </div>
      </div>

      {/* ====================================================================
          STICKY TOP NAVIGATION BAR (Archival Manuscript Theme)
          ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-[#c5a059]/30 bg-[#140a05]/95 backdrop-blur-md shadow-[0_8px_35px_rgba(0,0,0,0.92)]">
        
        {/* Left: Return to Haryana Main Gate */}
        <button
          onClick={() => {
            if (onBackToGate) {
              onBackToGate();
            } else {
              window.history.pushState(null, '', '/haryana');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          }}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#c9a45a]/50 bg-[#1c0f08]/90 hover:bg-[#2d170d] text-[#ffd27d] text-[11px] sm:text-xs font-cinzel font-semibold tracking-[0.20em] transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.85)] hover:border-[#ffd27d]"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[#ffd27d]" />
          <span>← HARYANA HERITAGE</span>
        </button>

        {/* Center: Curatorial Jump Anchors */}
        <nav className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#c9a45a]/35 bg-[#170c07]/90 text-[11px] font-cinzel tracking-wider uppercase text-[#ffd27d]/80">
          <a href="#hero" className="px-3 py-1 hover:text-[#ffd27d] hover:bg-[#c5a059]/15 rounded-full transition-all">THE WORD</a>
          <span>·</span>
          <a href="#river" className="px-3 py-1 hover:text-[#ffd27d] hover:bg-[#c5a059]/15 rounded-full transition-all">LITERARY RIVER</a>
          <span>·</span>
          <a href="#listen" className="px-3 py-1 hover:text-[#ffd27d] hover:bg-[#c5a059]/15 rounded-full transition-all">ORAL RECITATION</a>
          <span>·</span>
          <a href="#voices" className="px-3 py-1 hover:text-[#ffd27d] hover:bg-[#c5a059]/15 rounded-full transition-all">VOICES</a>
          <span>·</span>
          <a href="#scripts" className="px-3 py-1 hover:text-[#ffd27d] hover:bg-[#c5a059]/15 rounded-full transition-all">SCRIPTS</a>
          <span>·</span>
          <a href="#epics" className="px-3 py-1 hover:text-[#ffd27d] hover:bg-[#c5a059]/15 rounded-full transition-all">EPICS</a>
          <span>·</span>
          <a href="#archive" className="px-3 py-1 hover:text-[#ffd27d] hover:bg-[#c5a059]/15 rounded-full transition-all">THE ARCHIVE</a>
        </nav>

        {/* Right: Audio Recitation Status Indicator */}
        <div 
          onClick={() => oralRecitationAudio.toggle()}
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#c9a45a]/40 bg-[#180d07]/90 backdrop-blur-md text-[#ffd27d] text-[11px] font-cinzel tracking-wider cursor-pointer hover:border-[#ffd27d] transition-all"
        >
          <span className={`w-2 h-2 rounded-full ${audioState.isPlaying ? 'bg-[#ffd27d] animate-ping' : 'bg-[#c5a059]/60'}`} />
          <span>{audioState.isPlaying ? 'RECITATION PLAYING' : 'ORAL ACOUSTICS'}</span>
          <Volume2 className="w-3.5 h-3.5 text-[#ffd27d]" />
        </div>
      </header>

      {/* ====================================================================
          MAIN WIDESCREEN EDITORIAL CONTAINER (88% Viewport Width)
          ==================================================================== */}
      <main className="relative z-10 min-h-screen pt-28 pb-32">
        <div className="w-[92%] sm:w-[88%] max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-36 sm:space-y-48">

          {/* ==================================================================
              SECTION 01: HERO — THE LIVING WORD
              A continuous archival composition (NOT a card)
              ================================================================== */}
          <section id="hero" className="space-y-12 border-b border-[#c5a059]/25 pb-28">
            <div className="space-y-6 max-w-5xl">
              <div className="flex items-center gap-3">
                <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent" />
                <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.34em] uppercase font-semibold">
                  ARCHIVAL LITERARY MONOGRAPH · HARYANA
                </span>
              </div>

              <h1 
                className="font-cinzel text-5xl sm:text-7xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7dca1] to-[#cf9e48] font-normal tracking-tight leading-[0.94]"
                style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.95))' }}
              >
                The Living Word
              </h1>

              <p className="font-cinzel text-xs sm:text-sm text-[#e8c46a] tracking-[0.28em] uppercase font-semibold">
                POETRY · ORAL TRADITION · EPIC · DEVOTION · MODERN VOICE
              </p>

              {/* Main Statement */}
              <blockquote className="border-l-2 border-[#c5a059] pl-6 sm:pl-8 py-3 my-6 font-cormorant italic text-3xl sm:text-4xl md:text-5xl text-[#fff0d0] leading-relaxed">
                “Before words were printed, they were remembered.”
              </blockquote>
            </div>

            {/* Immersive Archival Visual Composition */}
            <div className="relative rounded-3xl overflow-hidden border border-[#c5a059]/40 shadow-[0_30px_90px_rgba(0,0,0,0.98)] aspect-[16/9] sm:aspect-[21/9] bg-[#120804] group">
              <img
                src="/assets/literature_hero_manuscript.jpg"
                alt="Ancient handwritten Indian manuscript on parchment with kalam and inkpot"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080402] via-[#080402]/35 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 right-6 sm:right-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
                <span>ARCHIVAL MANUSCRIPT FOLIO · BIRCH BARK & CARBON INK</span>
                <span className="text-[#c5a059]">BAMBOO KALAM & BRASS INKPOT</span>
              </div>
            </div>

            {/* Curatorial Framing Narrative */}
            <div className="max-w-5xl space-y-6 pt-2">
              <p className="font-cormorant text-2xl sm:text-3xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
                In the fertile basin of the Saraswati and Yamuna rivers, literature was never merely ink dried upon cellulose. It was breath, sacred cadence, and communal memory. Long before paper was introduced, the farmer in his furrow, the weaver on his pit-loom, and the Jogi beneath the chaupal peepal carried encyclopedias of philosophy solely in unwritten metre.
              </p>
              <p className="font-cormorant text-xl sm:text-2xl text-[#e8d8b8] leading-relaxed sm:leading-loose">
                From the divine childhood lyrics of Sant Surdas in Sihi to the operatic Saang masterpieces of Pandit Lakhmi Chand, Haryana’s literary heritage represents a living continuum where wisdom is spoken, heard, and carried in the blood of generations.
              </p>
            </div>
          </section>

          {/* ==================================================================
              SECTION 02: A LITERARY JOURNEY ("THE LITERARY RIVER")
              Flowing timeline across 6 epochs (NOT six cards)
              ================================================================== */}
          <section id="river" className="space-y-16">
            <div className="space-y-4 max-w-5xl">
              <div className="flex items-center gap-3">
                <span className="w-10 sm:w-16 h-[1px] bg-[#c5a059]" />
                <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.32em] uppercase font-semibold">
                  CHRONOLOGICAL REVERBERATION
                </span>
              </div>
              <h2 className="font-cinzel text-4xl sm:text-6xl text-[#ffd27d] font-normal leading-tight">
                A Literary Journey Through Generations
              </h2>
              <p className="font-cormorant italic text-2xl text-[#f3e7ce]">
                Follow the unwritten golden thread as spoken verses transform through medieval devotion into modern agrarian consciousness.
              </p>
            </div>

            {/* Interactive Flowing Golden River Tracker */}
            <div className="relative pt-6">
              {/* Horizontal Connecting Gold Line */}
              <div className="relative h-[2px] w-full bg-[#c5a059]/25 mb-10 overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#c5a059] via-[#ffd27d] to-[#c5a059] shadow-[0_0_12px_#ffd27d]"
                  animate={{ width: `${((selectedEpochIndex + 1) / LITERARY_EPOCHS.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>

              {/* Epoch Station Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {LITERARY_EPOCHS.map((epoch, idx) => {
                  const isSelected = selectedEpochIndex === idx;
                  return (
                    <button
                      key={epoch.num}
                      onClick={() => setSelectedEpochIndex(idx)}
                      className={`group relative text-left p-4 rounded-2xl transition-all cursor-pointer border ${
                        isSelected 
                          ? 'bg-[#221208] border-[#ffd27d] shadow-[0_0_25px_rgba(201,164,90,0.35)] ring-1 ring-[#ffd27d]' 
                          : 'bg-[#140b06]/85 border-[#c5a059]/20 hover:border-[#ffd27d]/50 hover:bg-[#1a0e08]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-cinzel font-bold tracking-widest ${
                          isSelected ? 'text-[#ffd27d]' : 'text-[#c5a059]'
                        }`}>
                          STAGE {epoch.num}
                        </span>
                        <span className={`w-2.5 h-2.5 rounded-full border ${
                          isSelected ? 'bg-[#ffd27d] border-[#ffd27d] shadow-[0_0_8px_#ffd27d]' : 'border-[#c5a059]/40 bg-transparent'
                        }`} />
                      </div>
                      <h3 className={`font-cinzel text-sm sm:text-base font-semibold transition-colors ${
                        isSelected ? 'text-[#fff0d0]' : 'text-[#f5e9d2] group-hover:text-[#ffd27d]'
                      }`}>
                        {epoch.title}
                      </h3>
                      <p className="text-[11px] font-cormorant italic text-[#c5a059] pt-1">
                        {epoch.era}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Epoch Deep Dive (Open Editorial Display) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEpoch.num}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start pt-8 border-t border-[#c5a059]/20"
              >
                <div className="lg:col-span-5 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="font-cinzel text-4xl sm:text-5xl text-[#ffd27d] font-bold">
                      {currentEpoch.num}
                    </span>
                    <div>
                      <h3 className="font-cinzel text-2xl sm:text-3xl text-[#fff0d0] font-normal">
                        {currentEpoch.title}
                      </h3>
                      <span className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase block">
                        {currentEpoch.era}
                      </span>
                    </div>
                  </div>

                  <p className="font-cormorant italic text-2xl sm:text-3xl text-[#ffd27d] border-l-2 border-[#c5a059] pl-5 my-3">
                    “{currentEpoch.tagline}”
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase font-semibold block">
                      ARCHIVAL MEDIUM & TRANSMISSION
                    </span>
                    <p className="font-cormorant text-xl text-[#f3e7ce]">
                      {currentEpoch.medium}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
                    {currentEpoch.summary}
                  </p>

                  <div className="p-6 rounded-2xl bg-[#160c07] border border-[#c5a059]/30 space-y-3">
                    <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.24em] uppercase font-semibold block">
                      SIGNIFICANT GENRES & METRES
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {currentEpoch.keyForms.map((form) => (
                        <span key={form} className="px-3.5 py-1 rounded-full bg-[#201008] border border-[#c5a059]/40 text-xs font-cinzel text-[#ffd27d]">
                          {form}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="font-cormorant italic text-xl text-[#e8c46a]">
                    Cultural Resonance: {currentEpoch.resonance}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>

          <LitHeritageDivider />

          {/* ==================================================================
              SECTION 03: LISTEN TO THE WORD
              Real audio recitation player with dynamic live canvas waveform
              ================================================================== */}
          <section id="listen" className="space-y-12">
            <div className="space-y-4 max-w-5xl">
              <div className="flex items-center gap-3">
                <span className="w-10 sm:w-16 h-[1px] bg-[#c5a059]" />
                <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.32em] uppercase font-semibold">
                  ACOUSTIC LIVING TRADITION
                </span>
              </div>
              <h2 className="font-cinzel text-4xl sm:text-6xl text-[#ffd27d] font-normal leading-tight">
                Listen to the Word
              </h2>
              <blockquote className="font-cormorant italic text-2xl sm:text-3xl text-[#fff0d0] border-l-2 border-[#c5a059] pl-6 my-2 leading-relaxed">
                “A verse was not always read. It was sung, recited, remembered.”
              </blockquote>
            </div>

            {/* Immersive Audio Player Composition */}
            <div className="relative rounded-3xl overflow-hidden border border-[#c5a059]/40 shadow-[0_25px_80px_rgba(0,0,0,0.95)] bg-[#120804] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
              {/* Background Archival Night Chaupal Image */}
              <img
                src="/assets/literature_oral_recitation.jpg"
                alt="Nocturnal oral recitation under village peepal tree"
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.35] contrast-[1.1] pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d0704] via-[#0d0704]/80 to-[#0d0704]/90 pointer-events-none" />

              {/* Left: Player Controls & Live Waveform */}
              <div className="relative z-10 lg:col-span-6 space-y-6">
                <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.30em] uppercase font-semibold block">
                  ORAL FIELD RECORDING · HARVEST CHAUPAL
                </span>
                
                <h3 className="font-cinzel text-3xl sm:text-4xl text-[#fff0d0] font-normal leading-tight">
                  Recitation of the Immortal Ragini
                </h3>

                <p className="font-cormorant italic text-xl text-[#ffd27d]">
                  Bowed wooden Sarangi & modal Been drone echoing under night stars.
                </p>

                {/* Circular Play Button + Waveform Container */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                  <button
                    onClick={() => oralRecitationAudio.toggle()}
                    className="group relative flex items-center justify-center w-20 h-20 rounded-full border-2 border-[#ffd27d] bg-[#221008] hover:bg-[#ffd27d] text-[#ffd27d] hover:text-[#120804] transition-all cursor-pointer shadow-[0_0_30px_rgba(255,210,125,0.4)] shrink-0"
                    aria-label={audioState.isPlaying ? "Pause Recitation" : "Play Oral Recitation"}
                  >
                    {audioState.isPlaying ? (
                      <Pause className="w-8 h-8 fill-current" />
                    ) : (
                      <Play className="w-8 h-8 fill-current ml-1" />
                    )}
                  </button>

                  <div className="space-y-2 w-full">
                    <span className="text-[11px] font-cinzel text-[#c5a059] tracking-widest uppercase block">
                      {audioState.isPlaying ? 'LIVE HARMONIC DRONE RESONATING' : 'CLICK TO PLAY ORAL RECITATION'}
                    </span>
                    {/* Dynamic Canvas Waveform */}
                    <div className="w-full h-14 bg-[#140b06]/80 rounded-xl border border-[#c5a059]/30 p-2 flex items-center">
                      <canvas 
                        ref={canvasRef} 
                        width={360} 
                        height={48} 
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-cinzel text-[#c5a059]/80 tracking-widest">
                  <span>PANDIT LAKHMI CHAND LINEAGE</span>
                  <span>·</span>
                  <span>SONIPAT REPERTOIRE</span>
                </div>
              </div>

              {/* Right: Illuminated Verse Text Sync */}
              <div className="relative z-10 lg:col-span-6 space-y-6 p-8 rounded-2xl bg-[#160b06]/85 border border-[#c5a059]/35 backdrop-blur-md">
                <span className="text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase font-semibold block border-b border-[#c5a059]/25 pb-3">
                  SPOKEN STANZA TRANSMISSION
                </span>

                <div className="space-y-4">
                  <p className={`font-cormorant text-2xl sm:text-3xl leading-relaxed transition-all duration-700 ${
                    audioState.isPlaying ? 'text-[#fff0d0] drop-shadow-[0_0_12px_rgba(255,210,125,0.6)]' : 'text-[#f5e9d2]/90'
                  }`}>
                    मन का मैल धोए बिन मूरख, तीरथ न्हाणा बेकार सै।<br />
                    भीतर भरया कपट का कांदो, ऊपर लेप सिंगार सै।
                  </p>

                  <p className="font-cormorant italic text-xl text-[#ffd27d]/90 leading-relaxed border-t border-[#c5a059]/15 pt-3">
                    “Without cleansing the grime of ego within the soul, O fool, ablution in sacred waters is utterly futile.”
                  </p>
                </div>

                <div className="text-[11px] font-cinzel text-[#c5a059] tracking-widest uppercase pt-2">
                  MODAL SCALE: BHAIRAV-BILAWAL HYBRID · TIME: PRATHAM PRAHAR (DUSK)
                </div>
              </div>
            </div>
          </section>

          <LitHeritageDivider />

          {/* ==================================================================
              SECTION 04: VOICES OF HARYANA
              Archival arrangement resembling old portraits across a parchment table
              ================================================================== */}
          <section id="voices" className="space-y-16">
            <div className="space-y-4 max-w-5xl">
              <div className="flex items-center gap-3">
                <span className="w-10 sm:w-16 h-[1px] bg-[#c5a059]" />
                <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.32em] uppercase font-semibold">
                  THE LITERARY LINEAGES
                </span>
              </div>
              <h2 className="font-cinzel text-4xl sm:text-6xl text-[#ffd27d] font-normal leading-tight">
                Voices of Haryana
              </h2>
              <p className="font-cinzel text-xs sm:text-sm text-[#c5a059] tracking-[0.26em] uppercase font-semibold">
                POETS · SAINTS · STORYTELLERS
              </p>
              <p className="font-cormorant italic text-2xl text-[#f3e7ce]">
                The masters who inscribed their soul upon collective consciousness. Click any archival folio to explore their life and magnum opus.
              </p>
            </div>

            {/* Archival Portraits Layout Across Parchment Table Surface */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
              {VOICES_OF_HARYANA.map((voice) => (
                <div
                  key={voice.id}
                  onClick={() => setActiveVoiceModal(voice)}
                  className="group relative p-6 rounded-3xl bg-[#150a05]/90 border border-[#c5a059]/30 hover:border-[#ffd27d] transition-all duration-500 cursor-pointer shadow-[0_15px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_60px_rgba(201,164,90,0.25)] flex flex-col justify-between"
                >
                  {/* Subtle archival frame corners */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#ffd27d]/60 pointer-events-none" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#ffd27d]/60 pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#ffd27d]/60 pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#ffd27d]/60 pointer-events-none" />

                  <div className="space-y-5">
                    {/* Archival Plate Photo */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#0c0603] border border-[#c5a059]/40 group-hover:border-[#ffd27d] transition-all duration-500">
                      <img
                        src={voice.portrait}
                        alt={voice.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.82] contrast-[1.1]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0704] via-transparent to-transparent opacity-80" />
                      <span className="absolute bottom-3 left-4 right-4 text-[10px] font-cinzel text-[#ffd27d] tracking-widest uppercase">
                        {voice.region}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-cinzel text-[#c5a059] tracking-wider uppercase block">
                        {voice.era}
                      </span>
                      <h3 className="font-cinzel text-2xl text-[#fff0d0] group-hover:text-[#ffd27d] transition-colors font-semibold">
                        {voice.name}
                      </h3>
                      <p className="font-cormorant italic text-lg text-[#ffd27d]/90">
                        {voice.vernacular}
                      </p>
                      <p className="text-xs font-cinzel text-[#e8c46a] tracking-wide uppercase pt-1 font-semibold">
                        {voice.role}
                      </p>
                    </div>

                    <blockquote className="font-cormorant italic text-lg text-[#f3e7ce] border-l-2 border-[#c5a059]/50 pl-4 leading-relaxed line-clamp-3">
                      “{voice.quote}”
                    </blockquote>
                  </div>

                  <div className="pt-6 mt-4 border-t border-[#c5a059]/20 flex items-center justify-between text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase group-hover:text-[#fff0d0]">
                    <span>OPEN MONOGRAPH</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <LitHeritageDivider />

          {/* ==================================================================
              SECTION 05: WORDS IN THEIR OWN SCRIPT
              Interactive Multilingual Manuscript Page
              ================================================================== */}
          <section id="scripts" className="space-y-12">
            <div className="space-y-4 max-w-5xl">
              <div className="flex items-center gap-3">
                <span className="w-10 sm:w-16 h-[1px] bg-[#c5a059]" />
                <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.32em] uppercase font-semibold">
                  PALEOGRAPHY & LINGUISTIC ARCHIVE
                </span>
              </div>
              <h2 className="font-cinzel text-4xl sm:text-6xl text-[#ffd27d] font-normal leading-tight">
                Words in Their Own Script
              </h2>
              <p className="font-cinzel text-xs sm:text-sm text-[#c5a059] tracking-[0.26em] uppercase font-semibold">
                EXPLORE A VERSE ACROSS SCRIPTS
              </p>
              <p className="font-cormorant italic text-2xl text-[#f3e7ce]">
                Examine a classical Haryanvi verse across regional dialect, classical Devanagari, international phonetics, and philosophical commentary.
              </p>
            </div>

            {/* Manuscript Calligraphy Display Board */}
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#c5a059]/50 shadow-[0_25px_80px_rgba(0,0,0,0.95)] bg-[#120804] p-8 sm:p-14 lg:p-16">
              {/* Parchment & Botanical Border Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-40 mix-blend-multiply"
                style={{ backgroundImage: `url('/assets/burnt_parchment.jpg')` }}
              />

              {/* Decorative Archival Border Ring */}
              <div className="absolute inset-4 sm:inset-8 border border-[#c5a059]/30 rounded-2xl pointer-events-none" />

              <div className="relative z-10 max-w-4xl mx-auto space-y-10">
                {/* Script Selector Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {Object.keys(SCRIPT_VERSE_SPECIMEN.scripts).map((tabKey) => {
                    const tab = SCRIPT_VERSE_SPECIMEN.scripts[tabKey];
                    const isActive = selectedScriptTab === tabKey;
                    return (
                      <button
                        key={tabKey}
                        onClick={() => setSelectedScriptTab(tabKey)}
                        className={`px-6 py-2.5 rounded-full text-xs font-cinzel font-semibold tracking-[0.24em] uppercase transition-all cursor-pointer border ${
                          isActive
                            ? 'bg-[#c5a059] text-[#140b07] border-[#ffd27d] shadow-[0_0_20px_rgba(201,164,90,0.5)] font-bold'
                            : 'bg-[#180d07]/90 text-[#ffd27d]/80 border-[#c5a059]/30 hover:border-[#ffd27d] hover:bg-[#c5a059]/15'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Manuscript Header Info */}
                <div className="text-center space-y-2 border-b border-[#c5a059]/25 pb-6">
                  <span className="text-[11px] font-cinzel text-[#c5a059] tracking-[0.3em] uppercase block">
                    {SCRIPT_VERSE_SPECIMEN.metre}
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl text-[#ffd27d]">
                    {SCRIPT_VERSE_SPECIMEN.title}
                  </h3>
                  <p className="font-cormorant italic text-lg text-[#e8c46a]">
                    Composed by {SCRIPT_VERSE_SPECIMEN.poet}
                  </p>
                </div>

                {/* Illuminated Stanza Display */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedScriptTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 py-4 text-center"
                  >
                    <div className="space-y-4">
                      {currentScriptData.lines.map((line, idx) => (
                        <p 
                          key={idx}
                          className="font-cormorant text-2xl sm:text-4xl text-[#fff0d0] leading-relaxed tracking-wide"
                          style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.85))' }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>

                    <div className="pt-8 border-t border-[#c5a059]/20 max-w-2xl mx-auto text-center space-y-2">
                      <span className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase block">
                        SCHOLARLY ANNOTATION
                      </span>
                      <p className="font-cormorant italic text-lg text-[#f3e7ce]">
                        {currentScriptData.annotation}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="text-center pt-4 text-[11px] font-cinzel text-[#c5a059]/80 tracking-widest">
                  PROVENANCE: {SCRIPT_VERSE_SPECIMEN.provenance}
                </div>
              </div>
            </div>
          </section>

          <LitHeritageDivider />

          {/* ==================================================================
              SECTION 06: FOLK EPICS — STORY WITHOUT BOOKS
              Panoramic horizontal narrative journey across 5 oral phases
              ================================================================== */}
          <section id="epics" className="space-y-12">
            <div className="space-y-4 max-w-5xl">
              <div className="flex items-center gap-3">
                <span className="w-10 sm:w-16 h-[1px] bg-[#c5a059]" />
                <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.32em] uppercase font-semibold">
                  ORAL HEROIC SAGAS
                </span>
              </div>
              <h2 className="font-cinzel text-4xl sm:text-6xl text-[#ffd27d] font-normal leading-tight">
                The Epics: Stories That Travelled Without Books
              </h2>
              <p className="font-cormorant italic text-2xl text-[#f3e7ce]">
                How an entire heroic epic travels across sand and centuries through oral melody.
              </p>
            </div>

            {/* Large Panoramic Illustrated Scene with Parallax Navigation */}
            <div className="relative rounded-3xl overflow-hidden border border-[#c5a059]/45 shadow-[0_30px_90px_rgba(0,0,0,0.98)] aspect-[16/9] sm:aspect-[21/9] bg-[#120804] group">
              <img
                src="/assets/literature_epic_scene.jpg"
                alt="Panoramic miniature manuscript painting of Indian folk epic chariot and landscape"
                className="w-full h-full object-cover transition-all duration-700"
                style={{
                  objectPosition: `${selectedEpicStage * 25}% center`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-[#0a0503]/35 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 right-6 sm:right-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
                <span>STAGE {currentEpic.stage} · {currentEpic.title}</span>
                <span className="text-[#c5a059]">{currentEpic.subtitle}</span>
              </div>
            </div>

            {/* 5 Stages Navigation Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
              {ORAL_EPIC_JOURNEY.map((st, idx) => {
                const isSelected = selectedEpicStage === idx;
                return (
                  <button
                    key={st.stage}
                    onClick={() => setSelectedEpicStage(idx)}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#c5a059] text-[#120804] border-[#ffd27d] shadow-[0_0_20px_rgba(201,164,90,0.4)] font-bold'
                        : 'bg-[#150a05]/90 text-[#ffd27d]/80 border-[#c5a059]/25 hover:border-[#ffd27d] hover:bg-[#c5a059]/15'
                    }`}
                  >
                    <span className="text-[10px] font-cinzel tracking-widest block opacity-80">
                      STAGE {st.stage}
                    </span>
                    <span className="text-xs font-cinzel tracking-wide truncate block font-semibold mt-0.5">
                      {st.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Narration */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEpic.stage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-6 border-t border-[#c5a059]/20"
              >
                <div className="lg:col-span-4 space-y-3">
                  <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
                    {currentEpic.focus}
                  </span>
                  <h3 className="font-cinzel text-3xl text-[#fff0d0]">
                    {currentEpic.subtitle}
                  </h3>
                  <p className="font-cormorant italic text-lg text-[#ffd27d]">
                    Visual Cue: {currentEpic.visualCue}
                  </p>
                </div>

                <div className="lg:col-span-8">
                  <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
                    {currentEpic.narrative}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </section>

          <LitHeritageDivider />

          {/* ==================================================================
              SECTION 07: THE ARCHIVE
              Manuscripts, Books, Shellac Records, Rare Publications
              ================================================================== */}
          <section id="archive" className="space-y-16">
            <div className="space-y-4 max-w-5xl">
              <div className="flex items-center gap-3">
                <span className="w-10 sm:w-16 h-[1px] bg-[#c5a059]" />
                <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.32em] uppercase font-semibold">
                  PHYSICAL & RECORDED FOLIOS
                </span>
              </div>
              <h2 className="font-cinzel text-4xl sm:text-6xl text-[#ffd27d] font-normal leading-tight">
                The Archive
              </h2>
              <p className="font-cinzel text-xs sm:text-sm text-[#c5a059] tracking-[0.26em] uppercase font-semibold">
                MANUSCRIPTS · BOOKS · RECORDINGS · PUBLICATIONS
              </p>
              <p className="font-cormorant italic text-2xl text-[#f3e7ce]">
                Rare specimens from monastic chests, village takhts, and early printing presses. Click any object for deep folio inspection.
              </p>
            </div>

            {/* Archival Grid Across Dark Parchment Desk */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {ARCHIVAL_SPECIMENS.map((specimen) => (
                <div
                  key={specimen.id}
                  onClick={() => setActiveArchiveModal(specimen)}
                  className="group relative p-6 rounded-3xl bg-[#150a05]/90 border border-[#c5a059]/30 hover:border-[#ffd27d] transition-all duration-500 cursor-pointer shadow-[0_15px_50px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_60px_rgba(201,164,90,0.3)] space-y-4"
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#0d0704] border border-[#c5a059]/40 group-hover:border-[#ffd27d] transition-colors">
                    <img
                      src={specimen.image}
                      alt={specimen.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.80] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080402] via-transparent to-transparent opacity-75" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#160c07]/90 border border-[#c5a059]/40 text-[10px] font-cinzel text-[#ffd27d] tracking-widest">
                      {specimen.num}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-cinzel text-[#c5a059] tracking-wider uppercase block">
                      {specimen.era}
                    </span>
                    <h3 className="font-cinzel text-xl text-[#fff0d0] group-hover:text-[#ffd27d] transition-colors font-semibold leading-snug">
                      {specimen.title}
                    </h3>
                    <p className="text-xs font-cinzel text-[#e8c46a]/80 tracking-wide uppercase pt-1">
                      {specimen.medium}
                    </p>
                  </div>

                  <p className="font-cormorant text-lg text-[#f3e7ce] line-clamp-2 leading-relaxed">
                    {specimen.description}
                  </p>

                  <div className="pt-4 border-t border-[#c5a059]/20 flex items-center justify-between text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
                    <span>INSPECT FOLIO</span>
                    <Maximize2 className="w-3.5 h-3.5 text-[#ffd27d]" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <LitHeritageDivider />

          {/* ==================================================================
              SECTION 08: THE WORD CONTINUES
              Calm cinematic closing with elegant text-based navigation
              ================================================================== */}
          <section className="space-y-12 border-t border-[#c5a059]/25 pt-20 text-center max-w-4xl mx-auto">
            <div className="space-y-4">
              <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.36em] uppercase font-semibold block">
                CIVILIZATIONAL CONTINUUM
              </span>
              <h2 className="font-cinzel text-4xl sm:text-6xl text-[#ffd27d] font-normal leading-tight">
                The Word Continues
              </h2>
              <blockquote className="font-cormorant italic text-2xl sm:text-3xl text-[#fff0d0] leading-relaxed pt-2">
                “From voices remembered to words written,<br />Haryana’s literary tradition continues to evolve.”
              </blockquote>
            </div>

            {/* Elegant Cultural Navigation Controls */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#c5a059]/20">
              <button
                onClick={() => {
                  if (onNavigateToFolkArts) {
                    onNavigateToFolkArts();
                  } else {
                    window.history.pushState(null, '', '/haryana/folk-arts/journey');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }
                }}
                className="group inline-flex items-center gap-2.5 text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.24em] uppercase transition-colors cursor-pointer font-semibold"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>← FOLK ARTS JOURNEY</span>
              </button>

              <button
                onClick={() => {
                  if (onBackToGate) {
                    onBackToGate();
                  } else {
                    window.history.pushState(null, '', '/haryana');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }
                }}
                className="px-6 py-2 rounded-full border border-[#c5a059]/40 bg-[#160c07] hover:bg-[#2d170d] text-[#ffd27d] text-xs font-cinzel tracking-widest uppercase transition-all cursor-pointer"
              >
                RETURN TO HARYANA GATE
              </button>

              <button
                onClick={() => {
                  if (onNavigateToArtisans) {
                    onNavigateToArtisans();
                  } else {
                    window.history.pushState(null, '', '/haryana/folk-arts/artisans');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }
                }}
                className="group inline-flex items-center gap-2.5 text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.24em] uppercase transition-colors cursor-pointer font-semibold"
              >
                <span>02 ARTISANS: LIVING MASTERS →</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </section>

        </div>
      </main>

      {/* ====================================================================
          MODAL: VOICES OF HARYANA BIOGRAPHICAL MONOGRAPH
          ==================================================================== */}
      <AnimatePresence>
        {activeVoiceModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 bg-[#090402]/92 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#160c07] border-2 border-[#c5a059]/60 p-6 sm:p-10 text-[#f5e9d2] shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveVoiceModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-[#c5a059]/40 bg-[#221008] text-[#ffd27d] hover:bg-[#c5a059] hover:text-[#120804] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 text-xs font-cinzel text-[#c5a059] tracking-widest uppercase">
                <span>{activeVoiceModal.era}</span>
                <span>·</span>
                <span>{activeVoiceModal.region}</span>
              </div>

              <div className="space-y-2">
                <h2 className="font-cinzel text-3xl sm:text-4xl text-[#ffd27d] font-normal">
                  {activeVoiceModal.name}
                </h2>
                <p className="font-cormorant italic text-2xl text-[#fff0d0]">
                  {activeVoiceModal.vernacular}
                </p>
                <p className="text-xs font-cinzel text-[#e8c46a] tracking-wider uppercase font-semibold">
                  {activeVoiceModal.epithet}
                </p>
              </div>

              <blockquote className="font-cormorant italic text-2xl text-[#ffd27d] border-l-2 border-[#c5a059] pl-6 my-4 leading-relaxed">
                “{activeVoiceModal.quote}”
              </blockquote>

              <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed">
                {activeVoiceModal.summary}
              </p>

              <div className="space-y-3 pt-3 border-t border-[#c5a059]/25">
                <span className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase font-semibold block">
                  CELEBRATED COMPOSITIONS & TEXTS
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeVoiceModal.works.map((work) => (
                    <span key={work} className="px-3.5 py-1.5 rounded-full bg-[#201008] border border-[#c5a059]/40 text-xs font-cinzel text-[#ffd27d]">
                      {work}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase font-semibold block">
                  HISTORICAL CONTRIBUTION
                </span>
                <p className="font-cormorant text-xl text-[#e8d8b8]">
                  {activeVoiceModal.contribution}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ====================================================================
          MODAL: ARCHIVAL FOLIO INSPECTOR
          ==================================================================== */}
      <AnimatePresence>
        {activeArchiveModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 bg-[#090402]/92 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#160c07] border-2 border-[#c5a059]/60 p-6 sm:p-10 text-[#f5e9d2] shadow-[0_25px_80px_rgba(0,0,0,0.95)] space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveArchiveModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-[#c5a059]/40 bg-[#221008] text-[#ffd27d] hover:bg-[#c5a059] hover:text-[#120804] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 text-xs font-cinzel text-[#c5a059] tracking-widest uppercase">
                <span className="px-3 py-1 rounded-full bg-[#201008] border border-[#c5a059]/40 text-[#ffd27d]">
                  ACCESSION: {activeArchiveModal.accession}
                </span>
                <span>·</span>
                <span>{activeArchiveModal.era}</span>
              </div>

              <h2 className="font-cinzel text-3xl sm:text-4xl text-[#ffd27d] font-normal">
                {activeArchiveModal.title}
              </h2>

              {/* Large Specimen Preview */}
              <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-[#c5a059]/40 bg-[#0c0603]">
                <img
                  src={activeArchiveModal.image}
                  alt={activeArchiveModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-cinzel border-y border-[#c5a059]/25 py-4">
                <div>
                  <span className="text-[#c5a059] block">MEDIUM:</span>
                  <span className="text-[#fff0d0]">{activeArchiveModal.medium}</span>
                </div>
                <div>
                  <span className="text-[#c5a059] block">DIMENSIONS:</span>
                  <span className="text-[#fff0d0]">{activeArchiveModal.dimensions}</span>
                </div>
              </div>

              <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed">
                {activeArchiveModal.description}
              </p>

              <div className="p-4 rounded-2xl bg-[#201008] border border-[#c5a059]/30 space-y-1">
                <span className="text-[11px] font-cinzel text-[#ffd27d] tracking-wider uppercase block font-semibold">
                  CURATORIAL PROVENANCE RECORD
                </span>
                <p className="font-cormorant italic text-lg text-[#e8d8b8]">
                  {activeArchiveModal.provenance}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
