import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Feather, Compass, BookOpen, Layers } from 'lucide-react';
import { HARYANA_FOLK_CHAPTERS } from '../data/folkArtsData';

/**
 * FolkArtsTraditionDetail
 * Dedicated Editorial Monograph Page for an individual Haryana Folk Art.
 *
 * Organized strictly as a cinematic heritage journey:
 * 1. Origin / Story (Historical roots, oral continuum, agrarian memory)
 * 2. Materials (Tactile ingredients from the soil, no boxed cards)
 * 3. Motifs (Specimen archive with visual analysis, sacred geometry)
 * 4. Technique (Master methodology, tactile craftsmanship)
 * 5. Tradition / Cultural Meaning (Ritual context, bridal & seasonal settings, community transmission)
 * 6. Artisans / Practitioners (Living master documentary portrait, quote, narrative)
 * 7. Present Day / Preservation (GI status, design academy revivals, living continuum)
 *
 * Editorial & Museum Aesthetics:
 * - Large typography (18–22px body text, 32–56px section titles)
 * - Generous vertical whitespace (space-y-32 sm:space-y-40)
 * - Open layouts without boxy cards or cluttering borders
 * - Warm antique gold, dark parchment, and muted amber palette
 */
// Clean Heritage Vector Divider (Archival SVG replacement for unicode glyphs)
function FolkHeritageDivider({ className = "my-10" }) {
  return (
    <div className={`flex items-center justify-center gap-4 text-[#c5a059]/40 ${className}`}>
      <span className="w-16 sm:w-32 h-[1px] bg-gradient-to-r from-transparent to-[#c5a059]/35" />
      <svg className="w-3 h-3 text-[#c5a059]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12,3 21,12 12,21 3,12" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
      <span className="w-16 sm:w-32 h-[1px] bg-gradient-to-l from-transparent to-[#c5a059]/35" />
    </div>
  );
}

export default function FolkArtsTraditionDetail({
  tradition,
  onBackToArchive,
  onNavigateTradition,
}) {
  const [selectedMotifIndex, setSelectedMotifIndex] = useState(0);

  if (!tradition) return null;

  const currentMotif = tradition.motifs && tradition.motifs.length > 0 
    ? tradition.motifs[selectedMotifIndex] || tradition.motifs[0]
    : null;

  // Find index in HARYANA_FOLK_CHAPTERS for previous/next navigation
  const currentIndex = HARYANA_FOLK_CHAPTERS.findIndex((item) => item.id === tradition.id);
  const prevTradition = currentIndex > 0 ? HARYANA_FOLK_CHAPTERS[currentIndex - 1] : null;
  const nextTradition = currentIndex < HARYANA_FOLK_CHAPTERS.length - 1 ? HARYANA_FOLK_CHAPTERS[currentIndex + 1] : null;

  // Find related tradition objects
  const relatedTraditionObjs = (tradition.relatedArts || []).map((id) => 
    HARYANA_FOLK_CHAPTERS.find((item) => item.id === id)
  ).filter(Boolean);

  return (
    <div className="space-y-32 sm:space-y-40 pb-36 text-[#f7e6c4]">
      
      {/* ====================================================================
          TOP ARCHIVAL BREADCRUMB & PROVENANCE BAR
          ==================================================================== */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#c5a059]/25">
        <button
          onClick={onBackToArchive}
          className="group inline-flex items-center gap-2.5 text-xs font-cinzel text-[#ffd27d] hover:text-[#fff0d0] tracking-[0.24em] uppercase transition-colors cursor-pointer font-semibold"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#c5a059]" />
          <span>← BACK TO FOLK ARTS JOURNEY</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-cinzel text-[#c5a059] tracking-widest uppercase">
          <span className="px-3 py-1 rounded-full bg-[#1c0f08] border border-[#c5a059]/40 text-[#ffd27d]">
            {tradition.accession}
          </span>
          <span className="hidden sm:inline">·</span>
          <span>{tradition.region}</span>
          <span className="hidden sm:inline">·</span>
          <span className="text-[#ffd27d]">{tradition.period}</span>
        </div>
      </div>

      {/* ====================================================================
          HERO SECTION
          Monumental editorial serif typography, vernacular script, wide plate
          ==================================================================== */}
      <section className="space-y-10">
        <div className="space-y-5 max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent" />
            <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.32em] uppercase font-semibold">
              CHAPTER {tradition.num} · {tradition.archetype}
            </span>
          </div>

          <h1 
            className="font-cinzel text-5xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#f7dca1] to-[#cf9e48] font-normal tracking-tight leading-[0.95]"
            style={{ filter: 'drop-shadow(0 4px 18px rgba(0,0,0,0.95))' }}
          >
            {tradition.title}
          </h1>

          <p className="font-cormorant italic text-2xl sm:text-3xl lg:text-4xl text-[#ffd27d]">
            {tradition.vernacular}
          </p>

          <p className="text-xs sm:text-sm font-cinzel text-[#e8c46a] tracking-[0.24em] uppercase pt-1 font-semibold">
            {tradition.subtitle}
          </p>

          {/* Curatorial Pull Quote */}
          <blockquote className="border-l-2 border-[#c5a059] pl-6 sm:pl-8 py-2 my-6 font-cormorant italic text-2xl sm:text-3xl md:text-4xl text-[#fff0d0] leading-relaxed max-w-5xl">
            {tradition.tagline}
          </blockquote>
        </div>

        {/* Full-Width Panoramic Archival Plate with subtle golden framing */}
        <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/40 shadow-[0_25px_70px_rgba(0,0,0,0.95)] aspect-[16/9] sm:aspect-[21/9] bg-[#140b07] group">
          <img
            src={tradition.image}
            alt={tradition.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0503] via-[#0a0503]/30 to-transparent" />
          <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 right-6 sm:right-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
            <span>PROVENANCE: {tradition.region}</span>
            <span className="text-[#c5a059]">MEDIUM: {tradition.medium}</span>
          </div>
        </div>

        {/* Curatorial Overview Narrative */}
        <div className="max-w-5xl pt-4">
          <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
            {tradition.overview}
          </p>
        </div>
      </section>

      {/* Decorative Golden Divider */}
      <FolkHeritageDivider />

      {/* ====================================================================
          JOURNEY STAGE 1: ORIGIN / STORY
          Ancient lineage, historical context, oral continuity
          ==================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
            STAGE 01 · ORIGIN & ANCIENT STORY
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#ffd27d] font-normal leading-tight">
            An Unbroken Lineage of Agrarian Devotion
          </h2>
          <p className="text-xs font-cinzel text-[#c5a059]/80 tracking-widest uppercase">
            DOCUMENTED RECORD: {tradition.period}
          </p>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
            {tradition.originHistory}
          </p>
        </div>
      </section>

      {/* Decorative Golden Divider */}
      <FolkHeritageDivider />

      {/* ====================================================================
          JOURNEY STAGE 2: MATERIALS
          Earth-harvested raw elements (NO boxy cards, generous open flow)
          ==================================================================== */}
      <section className="space-y-12">
        <div className="space-y-4 max-w-4xl">
          <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
            STAGE 02 · TRADITIONAL MATERIALS
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#ffd27d] font-normal leading-tight">
            Harvested Directly from the Agrarian Soil
          </h2>
          <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce]/90 leading-relaxed">
            Every material in this tradition connects directly to the surrounding countryside—canal silt, home-spun cotton, wild silk filaments, and tree resins:
          </p>
        </div>

        {/* Three Open Material Columns with large text and generous spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-14 pt-4 border-t border-[#c5a059]/20">
          {tradition.materials.map((mat, i) => (
            <div key={mat.name} className="space-y-4">
              <span className="font-cinzel text-3xl sm:text-4xl text-[#c5a059] font-bold block">
                0{i + 1}
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl text-[#fff0d0] font-semibold">
                {mat.name}
              </h3>
              <p className="font-cormorant text-xl text-[#e8d8b8] leading-relaxed">
                {mat.desc}
              </p>
              <div className="pt-2 text-xs font-cinzel text-[#ffd27d] tracking-wider uppercase border-t border-[#c5a059]/20">
                PROVENANCE: {mat.source}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative Golden Divider */}
      <FolkHeritageDivider />

      {/* ====================================================================
          JOURNEY STAGE 3: MOTIFS
          Hierarchy: Folk Art → its Motifs → individual Motif details
          Large visual focus on the left, rich cultural storytelling on the right
          ==================================================================== */}
      <section className="space-y-12">
        <div className="space-y-4 max-w-5xl">
          <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
            STAGE 03 · SACRED MOTIFS & SYMBOLS
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl text-[#ffd27d] font-normal leading-tight">
            The Living Visual Lexicon: Sacred Motifs
          </h2>
          <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce]/95 leading-relaxed">
            Every motif in this tradition was born out of agrarian necessity, cosmic observation, and ancestral blessing. Select a motif below to examine its geometry, ritual placement, and execution:
          </p>
        </div>

        {/* Visually Meaningful Motif Selector Badges (Thumbnails + Labels) */}
        {tradition.motifs && tradition.motifs.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-b border-[#c5a059]/20 pb-6">
            {tradition.motifs.map((motif, idx) => {
              const isSelected = selectedMotifIndex === idx;
              return (
                <button
                  key={motif.name}
                  onClick={() => setSelectedMotifIndex(idx)}
                  className={`group flex items-center gap-3.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#221209] border-[#ffd27d] shadow-[0_0_25px_rgba(201,164,90,0.4)] ring-1 ring-[#ffd27d]'
                      : 'bg-[#150a05]/90 border-[#c5a059]/25 hover:border-[#ffd27d]/60 hover:bg-[#1f0e07]'
                  }`}
                >
                  {/* Miniature Archival Thumbnail */}
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#c5a059]/40 bg-[#0d0704] shrink-0 relative">
                    <img
                      src={motif.image || tradition.image}
                      alt={motif.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#ffd27d]/15 border-2 border-[#ffd27d] rounded-xl pointer-events-none" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-cinzel text-[#c5a059] tracking-wider block">
                      MOTIF 0{idx + 1}
                    </span>
                    <h4 className={`text-xs font-cinzel tracking-wide truncate font-semibold transition-colors ${
                      isSelected ? 'text-[#ffd27d]' : 'text-[#f3e7ce] group-hover:text-[#ffd27d]'
                    }`}>
                      {motif.name.split('(')[0]}
                    </h4>
                    <span className="text-[11px] font-cormorant italic text-[#e8c87c] truncate block">
                      {motif.vernacular.split('•')[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Active Motif Specimen Exhibition (Large Visual on Left, Deep Story on Right) */}
        {currentMotif && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start pt-4">
            
            {/* Left: Large Beautiful Visual of the Actual Motif (Main Visual Focus) */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/45 shadow-[0_25px_70px_rgba(0,0,0,0.95)] aspect-[4/3] bg-[#120804] group">
                <img
                  src={currentMotif.image || tradition.image}
                  alt={currentMotif.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090402] via-transparent to-transparent opacity-75" />
                
                {/* Provenance & Specimen Badge Overlay */}
                <div className="absolute top-4 left-5 px-3 py-1 rounded-full bg-[#180b06]/90 border border-[#c5a059]/40 text-[#ffd27d] text-[10px] font-cinzel tracking-widest uppercase">
                  SPECIMEN NO. HR-MOTIF-0{selectedMotifIndex + 1} · ARCHIVAL RECORD
                </div>

                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
                  <span className="font-cormorant italic text-lg text-[#f7e6c4] normal-case">
                    {currentMotif.vernacular}
                  </span>
                  <span className="text-[#c5a059]">{tradition.region.split(',')[0]}</span>
                </div>
              </div>

              {/* Caption beneath visual */}
              <div className="pt-3 flex items-center justify-between text-[11px] font-cinzel text-[#c5a059]/80 tracking-wider">
                <span>AUTHENTIC HARYANA FOLK ICONOGRAPHY</span>
                <span>MOTIF 0{selectedMotifIndex + 1} OF 0{tradition.motifs.length}</span>
              </div>
            </div>

            {/* Right: Detailed Cultural Information & Meanings */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2 border-b border-[#c5a059]/20 pb-4">
                <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
                  MOTIF SPECIMEN 0{selectedMotifIndex + 1}
                </span>
                <h3 className="font-cinzel text-3xl sm:text-4xl text-[#fff0d0] font-normal leading-tight">
                  {currentMotif.name}
                </h3>
                <p className="font-cormorant italic text-2xl sm:text-3xl text-[#ffd27d]">
                  {currentMotif.vernacular}
                </p>
              </div>

              {/* Symbolic Meaning (Pull Quote) */}
              <div className="space-y-2">
                <span className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase font-semibold block">
                  SYMBOLIC MEANING & PHILOSOPHY
                </span>
                <blockquote className="font-cormorant italic text-2xl sm:text-3xl text-[#ffe196] border-l-2 border-[#e5a93c] pl-5 my-2 leading-relaxed">
                  “{currentMotif.symbolism}”
                </blockquote>
              </div>

              {/* Cultural Significance */}
              {currentMotif.significance && (
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase font-semibold block">
                    CULTURAL SIGNIFICANCE
                  </span>
                  <p className="font-cormorant text-xl text-[#f3e7ce] leading-relaxed">
                    {currentMotif.significance}
                  </p>
                </div>
              )}

              {/* Where it is traditionally used */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase font-semibold block">
                  WHERE IT IS TRADITIONALLY USED
                </span>
                <p className="font-cormorant text-xl text-[#f3e7ce] leading-relaxed">
                  {currentMotif.context}
                </p>
              </div>

              {/* How it is created */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase font-semibold block">
                  HOW IT IS CREATED · METHODOLOGY
                </span>
                <p className="font-cormorant text-xl text-[#e8d8b8] leading-relaxed">
                  {currentMotif.execution}
                </p>
              </div>

              {/* Traditional colours / materials */}
              {(currentMotif.materials || tradition.medium) && (
                <div className="space-y-2 pt-1 border-t border-[#c5a059]/20 pt-4">
                  <span className="text-xs font-cinzel text-[#c5a059] tracking-widest uppercase font-semibold block">
                    TRADITIONAL COLOURS & MATERIALS
                  </span>
                  <p className="font-cormorant text-xl text-[#ffd27d] leading-relaxed">
                    {currentMotif.materials || tradition.medium}
                  </p>
                </div>
              )}
            </div>

          </div>
        )}
      </section>

      {/* Decorative Golden Divider */}
      <FolkHeritageDivider />

      {/* ====================================================================
          JOURNEY STAGE 4: TECHNIQUE
          Step-by-step master methodology & tactile craftsmanship
          ==================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
            STAGE 04 · THE TECHNIQUE
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#ffd27d] font-normal leading-tight">
            Methodology of Tactile Precision
          </h2>
          <p className="text-xs font-cinzel text-[#c5a059]/80 tracking-widest uppercase">
            PASSED DOWN UNWRITTEN ACROSS GENERATIONS
          </p>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
            {tradition.techniqueProcess}
          </p>
        </div>
      </section>

      {/* Decorative Golden Divider */}
      <FolkHeritageDivider />

      {/* ====================================================================
          JOURNEY STAGE 5: TRADITION / CULTURAL MEANING
          Where it was used, ceremonial context & community circles
          ==================================================================== */}
      <section className="space-y-12">
        <div className="space-y-4 max-w-5xl">
          <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
            STAGE 05 · TRADITION & CULTURAL MEANING
          </span>
          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#ffd27d] font-normal leading-tight">
            The Living Matrix of Rural Ceremony
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
              SETTING & CEREMONIAL USE
            </span>
            <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
              {tradition.usageSetting}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
              COMMUNITY CIRCLES & TRANSMISSION
            </span>
            <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
              {tradition.communityContext}
            </p>
          </div>
        </div>

        {tradition.culturalMeaning && (
          <div className="max-w-5xl pt-4">
            <p className="font-cormorant text-xl sm:text-2xl text-[#ffd27d]/95 italic leading-relaxed sm:leading-loose border-l-2 border-[#c5a059] pl-6">
              {tradition.culturalMeaning}
            </p>
          </div>
        )}
      </section>

      {/* Decorative Golden Divider */}
      <FolkHeritageDivider />

      {/* ====================================================================
          JOURNEY STAGE 6: ARTISANS / PRACTITIONERS
          Large documentary portrait, lineage quote, lived experience
          ==================================================================== */}
      {tradition.artisan && (
        <section className="space-y-10">
          <div className="space-y-3 max-w-4xl">
            <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
              STAGE 06 · THE LIVING PRACTITIONERS
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#ffd27d] font-normal leading-tight">
              Hands That Guard the Ancestral Flame
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center pt-4">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] aspect-[4/3] bg-[#140b07] group">
                <img
                  src={tradition.secondaryImage || tradition.image}
                  alt={tradition.artisan.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080402] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-5 right-5 text-xs font-cinzel text-[#ffd27d] tracking-widest uppercase">
                  {tradition.artisan.role} · {tradition.artisan.location}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
                {tradition.artisan.location}
              </span>
              <h3 className="font-cinzel text-3xl sm:text-4xl text-[#fff0d0] font-normal leading-tight">
                {tradition.artisan.name}
              </h3>
              <blockquote className="font-cormorant italic text-2xl sm:text-3xl text-[#ffd27d] border-l-2 border-[#c5a059] pl-5 my-3 leading-relaxed">
                {tradition.artisan.quote}
              </blockquote>
              <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed sm:leading-loose">
                {tradition.artisan.narrative}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Decorative Golden Divider */}
      <FolkHeritageDivider />

      {/* ====================================================================
          JOURNEY STAGE 7: PRESENT DAY / PRESERVATION
          Statutory GI, contemporary design revivals & living continuum
          ==================================================================== */}
      <section className="space-y-6 max-w-5xl">
        <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
          STAGE 07 · PRESENT DAY & PRESERVATION
        </span>
        <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#ffd27d] font-normal leading-tight">
          Contemporary Practice & Revitalization
        </h2>
        <p className="font-cormorant text-xl sm:text-2xl text-[#f3e7ce] leading-relaxed sm:leading-loose pt-2">
          {tradition.todayPractice}
        </p>
      </section>

      {/* ====================================================================
          BOTTOM EDITORIAL TRANSITION & SEQUENTIAL NAVIGATOR
          ==================================================================== */}
      <section className="pt-12 border-t border-[#c5a059]/25 space-y-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {prevTradition ? (
            <button
              onClick={() => onNavigateTradition && onNavigateTradition(prevTradition.id)}
              className="group inline-flex items-center gap-3 text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.22em] uppercase transition-colors cursor-pointer font-semibold"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>← PREVIOUS: {prevTradition.title}</span>
            </button>
          ) : (
            <button
              onClick={onBackToArchive}
              className="inline-flex items-center gap-2 text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.22em] uppercase transition-colors cursor-pointer font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← RETURN TO ALL TRADITIONS</span>
            </button>
          )}

          {nextTradition ? (
            <button
              onClick={() => onNavigateTradition && onNavigateTradition(nextTradition.id)}
              className="group px-8 py-3.5 rounded-full border border-[#c5a059]/60 bg-[#1c0f08]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel font-semibold tracking-[0.24em] uppercase transition-all cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.85)] flex items-center gap-3"
            >
              <span>CONTINUE TO {nextTradition.title}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              onClick={onBackToArchive}
              className="group px-8 py-3.5 rounded-full border border-[#c5a059]/60 bg-[#c5a059] hover:bg-[#ffd27d] text-[#120a05] text-xs font-cinzel font-bold tracking-[0.24em] uppercase transition-all cursor-pointer shadow-[0_4px_25px_rgba(201,164,90,0.5)] flex items-center gap-3"
            >
              <span>COMPLETED ALL CHAPTERS · RETURN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Connected Adjacent Traditions */}
        {relatedTraditionObjs.length > 0 && (
          <div className="pt-8 border-t border-[#c5a059]/15 space-y-6">
            <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold block">
              INTERCONNECTED FOLK DISCIPLINES
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedTraditionObjs.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onNavigateTradition && onNavigateTradition(rel.id)}
                  className="space-y-2 cursor-pointer group/rel"
                >
                  <span className="text-xs font-cinzel text-[#c5a059] block">
                    CHAPTER {rel.num} · {rel.archetype}
                  </span>
                  <h4 className="font-cinzel text-xl text-[#ffd27d] group-hover/rel:text-[#fff0d0] transition-colors flex items-center gap-2">
                    <span>{rel.title}</span>
                    <span className="text-xs transition-transform group-hover/rel:translate-x-1">→</span>
                  </h4>
                  <p className="font-cormorant text-lg text-[#e8d8b8] line-clamp-2">
                    {rel.shortDesc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
