import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Compass, Eye, Shield, Feather, BookOpen } from 'lucide-react';

/**
 * FolkArtsTraditionDetail
 * Dedicated chapter page for an individual Haryana Folk Art tradition
 * Displays tailored journey, contextual materials, "The Language of Motifs",
 * living masters, and community rituals.
 */
export default function FolkArtsTraditionDetail({
  tradition,
  onBackToArchive,
  onNavigateNextTradition,
}) {
  const [selectedMotif, setSelectedMotif] = useState(
    tradition.motifs && tradition.motifs.length > 0 ? tradition.motifs[0] : null
  );

  if (!tradition) return null;

  return (
    <div className="space-y-16 pb-20">
      {/* Top Floating Archival Dossier Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#c5a059]/25">
        <button
          onClick={onBackToArchive}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#c5a059]/40 bg-[#160c07]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel tracking-[0.2em] transition-all cursor-pointer shadow-[0_4px_18px_rgba(0,0,0,0.8)]"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>← RETURN TO FOLK ARTS ARCHIVE</span>
        </button>

        <div className="flex items-center gap-3 text-[11px] font-cinzel text-[#c5a059]/80 tracking-widest">
          <span className="px-2.5 py-1 rounded bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#ffd27d]">
            {tradition.accession}
          </span>
          <span>{tradition.region}</span>
        </div>
      </div>

      {/* Editorial Chapter Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-3">
          <span className="w-8 h-[1px] bg-[#c5a059]" />
          <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.3em] uppercase font-semibold">
            FOLK ART DOSSIER · {tradition.num}
          </span>
        </div>

        <h1 className="font-cinzel text-4xl sm:text-6xl text-[#ffd27d] font-normal tracking-wide leading-tight">
          {tradition.title}
        </h1>

        <p className="font-cormorant italic text-xl sm:text-2xl text-[#f3e7ce]">
          {tradition.vernacular}
        </p>

        <p className="text-xs sm:text-sm font-cinzel text-[#d4b068] tracking-[0.22em] uppercase">
          {tradition.subtitle}
        </p>

        <p className="font-cormorant italic text-lg sm:text-xl text-[#e8c87c] pt-2 border-l-2 border-[#c5a059]/40 pl-4">
          {tradition.tagline}
        </p>
      </div>

      {/* Main Archival Plate Split: Left Heroic Plate, Right Curated Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Large Museum Plate Display */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/35 shadow-[0_16px_50px_rgba(0,0,0,0.9)] aspect-[16/11] bg-[#140b07] group">
            <img
              src={tradition.image}
              alt={tradition.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080402] via-[#080402]/30 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-cinzel text-[#ffd27d] tracking-widest uppercase">
              <span>PROVENANCE: {tradition.region}</span>
              <span>{tradition.period}</span>
            </div>
          </div>

          {/* Plate Provenance Card */}
          <div className="p-5 rounded-xl bg-[#180e08]/90 border border-[#c5a059]/25 backdrop-blur-md grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-cinzel">
            <div>
              <span className="text-[#a0824b] text-[10px] uppercase tracking-wider block">MEDIUM</span>
              <span className="text-[#f7ebd4] font-medium">{tradition.medium}</span>
            </div>
            <div>
              <span className="text-[#a0824b] text-[10px] uppercase tracking-wider block">HISTORIC PERIOD</span>
              <span className="text-[#f7ebd4] font-medium">{tradition.period}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[#a0824b] text-[10px] uppercase tracking-wider block">CRAFT CENTRES</span>
              <span className="text-[#f7ebd4] font-medium">{tradition.region}</span>
            </div>
          </div>
        </div>

        {/* Right: Narrative Context & Cultural Essence */}
        <div className="lg:col-span-5 space-y-6 p-7 sm:p-9 rounded-2xl bg-[#140b07]/85 border border-[#c5a059]/30 backdrop-blur-md shadow-[0_8px_35px_rgba(0,0,0,0.85)]">
          <div className="flex items-center gap-2 text-xs font-cinzel text-[#c5a059] tracking-widest uppercase">
            <BookOpen className="w-4 h-4 text-[#ffd27d]" />
            <span>CURATORIAL OVERVIEW</span>
          </div>

          <h3 className="font-cormorant text-2xl sm:text-3xl text-[#fff0d0] font-medium leading-snug">
            {tradition.shortDesc}
          </h3>

          <p className="font-cormorant text-base sm:text-lg text-[#e8d8b8] leading-relaxed">
            {tradition.overview}
          </p>

          <div className="pt-3 border-t border-[#c5a059]/20 flex items-center justify-between text-xs font-cinzel text-[#ffd27d]">
            <span className="tracking-widest uppercase">HARYANA LIVING CANVAS</span>
            <span className="text-[#c5a059]">ARCHIVE PLATE {tradition.num}</span>
          </div>
        </div>
      </div>

      {/* Tailored Narrative Milestone Journey */}
      <div className="space-y-12 pt-6">
        {tradition.sections.map((sec, idx) => (
          <div
            key={sec.id || idx}
            className="p-8 sm:p-10 rounded-2xl bg-[#140b07]/80 border border-[#c5a059]/25 backdrop-blur-md shadow-[0_8px_35px_rgba(0,0,0,0.85)] space-y-6"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#c5a059]/20 pb-4">
              <span className="text-xs font-cinzel text-[#c5a059] tracking-[0.28em] uppercase font-semibold">
                {sec.title}
              </span>
              <span className="w-12 h-[1px] bg-gradient-to-r from-[#c5a059]/60 to-transparent" />
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl text-[#ffd27d] font-normal tracking-wide">
              {sec.heading}
            </h3>

            {sec.text && (
              <p className="font-cormorant text-lg sm:text-xl text-[#eeddc0] leading-relaxed max-w-4xl">
                {sec.text}
              </p>
            )}

            {/* Contextual Material Cards (Materials belonging INSIDE the art form!) */}
            {sec.items && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-3">
                {sec.items.map((item, iIndex) => (
                  <div
                    key={iIndex}
                    className="p-5 rounded-xl bg-[#1a0e08]/85 border border-[#c5a059]/25 hover:border-[#ffd27d]/60 transition-all space-y-2 shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
                      <h4 className="font-cinzel text-sm text-[#ffd27d] tracking-wider uppercase font-semibold">
                        {item.name}
                      </h4>
                    </div>
                    <p className="font-cormorant text-sm sm:text-base text-[#e0cfb0] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Master Artisan Spotlight */}
            {sec.masterArtisan && (
              <div className="p-6 sm:p-8 rounded-xl bg-[#1c0f08]/90 border border-[#c5a059]/40 space-y-4 shadow-[0_6px_25px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between text-xs font-cinzel text-[#c5a059] tracking-widest">
                  <span className="uppercase">LIVING MASTER SPOTLIGHT</span>
                  <span>{sec.masterArtisan.location}</span>
                </div>
                <h4 className="font-cinzel text-xl sm:text-2xl text-[#ffd27d]">
                  {sec.masterArtisan.name}
                </h4>
                <p className="font-cormorant italic text-lg text-[#f3e7ce] border-l-2 border-[#c5a059] pl-4">
                  {sec.masterArtisan.quote}
                </p>
                <p className="font-cormorant text-base text-[#e8d8b8] leading-relaxed">
                  {sec.masterArtisan.bio}
                </p>
              </div>
            )}

            {/* "THE LANGUAGE OF MOTIFS" - Dedicated Interactive Specimen Section */}
            {sec.hasMotifSpecimens && tradition.motifs && (
              <div className="pt-4 space-y-6">
                <div className="flex items-center gap-3">
                  <Feather className="w-4 h-4 text-[#ffd27d]" />
                  <span className="text-xs font-cinzel text-[#ffd27d] tracking-[0.24em] uppercase">
                    INTERACTIVE MOTIF SPECIMEN ARCHIVE
                  </span>
                </div>

                {/* Motif Specimen Selectors */}
                <div className="flex flex-wrap gap-2.5">
                  {tradition.motifs.map((motif, mIdx) => (
                    <button
                      key={mIdx}
                      onClick={() => setSelectedMotif(motif)}
                      className={`px-4 py-2 rounded-full text-xs font-cinzel tracking-wider uppercase transition-all cursor-pointer ${
                        selectedMotif?.name === motif.name
                          ? 'bg-[#c5a059] text-[#140b07] font-bold shadow-[0_0_18px_rgba(197,160,89,0.5)]'
                          : 'bg-[#1c0f08]/80 text-[#ffd27d]/80 border border-[#c5a059]/30 hover:bg-[#c5a059]/20 hover:text-[#ffd27d]'
                      }`}
                    >
                      {motif.name.split(' (')[0]}
                    </button>
                  ))}
                </div>

                {/* Selected Motif Specimen Inspection Card */}
                {selectedMotif && (
                  <motion.div
                    key={selectedMotif.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="p-7 sm:p-9 rounded-2xl bg-[#1c0f08]/95 border border-[#c5a059]/45 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.9)] grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                  >
                    {/* Left: Specimen Symbolic Motif Plate */}
                    <div className="md:col-span-4 p-6 rounded-xl bg-[#140b07] border border-[#c5a059]/30 flex flex-col items-center text-center space-y-3">
                      <div className="w-20 h-20 rounded-full border border-[#c5a059]/40 flex items-center justify-center bg-[#201109] shadow-[inset_0_0_20px_rgba(197,160,89,0.2)]">
                        <Sparkles className="w-8 h-8 text-[#ffd27d] animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-cinzel text-base text-[#ffd27d] font-semibold">
                          {selectedMotif.name}
                        </h5>
                        <p className="font-cormorant italic text-sm text-[#c5a059]">
                          {selectedMotif.vernacular}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-cinzel tracking-widest bg-[#c5a059]/15 border border-[#c5a059]/30 text-[#ffd27d] uppercase">
                        SACRED SPECIMEN
                      </span>
                    </div>

                    {/* Right: Curatorial Breakdown of Symbolism, Context & Execution */}
                    <div className="md:col-span-8 space-y-4">
                      <div>
                        <span className="text-[10px] font-cinzel text-[#a0824b] tracking-[0.2em] uppercase block">
                          SYMBOLISM & CULTURAL MEANING
                        </span>
                        <p className="font-cormorant text-lg text-[#fff0d0] font-medium leading-relaxed">
                          {selectedMotif.symbolism}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#c5a059]/20">
                        <div>
                          <span className="text-[10px] font-cinzel text-[#a0824b] tracking-[0.2em] uppercase block">
                            TRADITIONAL CONTEXT
                          </span>
                          <p className="font-cormorant text-sm sm:text-base text-[#e8d8b8] leading-relaxed">
                            {selectedMotif.context}
                          </p>
                        </div>
                        <div>
                          <span className="text-[10px] font-cinzel text-[#a0824b] tracking-[0.2em] uppercase block">
                            TECHNIQUE & EXECUTION
                          </span>
                          <p className="font-cormorant text-sm sm:text-base text-[#e8d8b8] leading-relaxed">
                            {selectedMotif.execution}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Pathway: Return to Archive or Proceed to Next Tradition */}
      <div className="pt-12 border-t border-[#c5a059]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          onClick={onBackToArchive}
          className="text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.22em] uppercase transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO FOLK ARTS ARCHIVE</span>
        </button>

        <button
          onClick={onNavigateNextTradition}
          className="group px-7 py-3 rounded-full border border-[#c5a059]/60 bg-[#1c0f08]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel font-semibold tracking-[0.24em] transition-all cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.85)] flex items-center gap-2.5"
        >
          <span>EXPLORE NEXT TRADITION</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
