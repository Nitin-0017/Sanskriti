import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, MapPin, Calendar, Globe, Users, Flame, ChevronRight } from 'lucide-react';
import { SURAJKUND_EXPERIENCE } from '../data/folkArtsData';

/**
 * SurajkundMelaExperience
 * Dedicated celebration page for the Surajkund International Crafts Mela
 * "FROM TRADITION → TO LIVING CULTURE"
 * 8-stage curated journey of living craftsmanship, global exchange, and contemporary vitality.
 */
export default function SurajkundMelaExperience({
  onBackToFolkArts,
  onExploreArchive,
}) {
  const [activeStage, setActiveStage] = useState(0);
  const stages = SURAJKUND_EXPERIENCE.journeyStages;
  const current = stages[activeStage];

  return (
    <div className="space-y-16 pb-24">
      {/* Top Floating Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#c5a059]/25">
        <button
          onClick={onBackToFolkArts}
          className="group flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#c5a059]/40 bg-[#160c07]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel tracking-[0.2em] transition-all cursor-pointer shadow-[0_4px_18px_rgba(0,0,0,0.8)]"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>← RETURN TO LIVING TRADITION</span>
        </button>

        <div className="flex items-center gap-3 text-[11px] font-cinzel text-[#ffd27d]/90 tracking-widest">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40">
            <MapPin className="w-3 h-3 text-[#ffd27d]" />
            FARIDABAD, HARYANA
          </span>
          <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30">
            <Calendar className="w-3 h-3 text-[#ffd27d]" />
            ANNUALLY IN FEBRUARY
          </span>
        </div>
      </div>

      {/* Editorial Festival Header (Warmer, celebratory amber heritage mood) */}
      <div className="space-y-5 max-w-5xl">
        <div className="flex items-center gap-3">
          <span className="w-8 h-[1px] bg-[#e5a93c]" />
          <span className="text-xs font-cinzel text-[#ffd27d] tracking-[0.32em] uppercase font-semibold flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-[#e5a93c] animate-pulse" />
            LIVING FESTIVAL CELEBRATION · FROM TRADITION TO LIVING CULTURE
          </span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl text-[#ffd27d] font-normal tracking-wide leading-tight">
          {SURAJKUND_EXPERIENCE.title}
        </h1>

        <p className="font-cormorant italic text-2xl sm:text-3xl text-[#f5ebd7]">
          {SURAJKUND_EXPERIENCE.vernacular}
        </p>

        <p className="text-xs sm:text-sm font-cinzel text-[#e5b358] tracking-[0.24em] uppercase">
          {SURAJKUND_EXPERIENCE.subtitle}
        </p>

        <p className="font-cormorant italic text-lg sm:text-xl text-[#e8c87c] pt-2 border-l-2 border-[#e5a93c] pl-4 max-w-4xl">
          {SURAJKUND_EXPERIENCE.tagline}
        </p>
      </div>

      {/* Festival Introduction Card */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[#1a0e07]/90 border border-[#c5a059]/35 backdrop-blur-md shadow-[0_12px_45px_rgba(0,0,0,0.85)] space-y-4 max-w-5xl">
        <span className="text-xs font-cinzel text-[#ffd27d] tracking-[0.24em] uppercase font-semibold">
          THE LIVING AMBIENCE OF SURAJKUND
        </span>
        <p className="font-cormorant text-lg sm:text-xl text-[#f0e2ca] leading-relaxed">
          {SURAJKUND_EXPERIENCE.overview}
        </p>
      </div>

      {/* 8-Stage Journey Navigation Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-cinzel text-[#ffd27d] tracking-[0.25em] uppercase">
            THE 8 MILESTONES OF SURAJKUND
          </span>
          <span className="text-xs font-cinzel text-[#c5a059]">
            MILESTONE {current.num} OF 08
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {stages.map((st, idx) => (
            <button
              key={st.num}
              onClick={() => setActiveStage(idx)}
              className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                activeStage === idx
                  ? 'bg-[#c5a059] text-[#140b07] border-[#ffd27d] shadow-[0_0_20px_rgba(197,160,89,0.5)] font-bold'
                  : 'bg-[#180d07]/90 text-[#ffd27d]/80 border-[#c5a059]/25 hover:border-[#ffd27d]/60 hover:bg-[#c5a059]/15'
              }`}
            >
              <span className="text-[10px] font-cinzel tracking-wider block opacity-70">
                {st.num}
              </span>
              <span className="text-xs font-cinzel tracking-wide truncate block">
                {st.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Milestone Display Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.num}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="p-8 sm:p-12 rounded-3xl bg-[#160b06]/92 border border-[#c5a059]/40 backdrop-blur-md shadow-[0_16px_55px_rgba(0,0,0,0.9)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
        >
          {/* Left: Atmospheric Image Plate */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#c5a059]/35 shadow-[0_12px_45px_rgba(0,0,0,0.85)] aspect-[4/3] bg-[#140b07]">
            <img
              src={current.image}
              alt={current.heading}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080402] via-transparent to-transparent opacity-85" />
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[11px] font-cinzel text-[#ffd27d] tracking-widest uppercase">
              <span>SURAJKUND LIVING ARCHIVE</span>
              <span>STAGE {current.num}</span>
            </div>
          </div>

          {/* Right: Narrative Story & Quotes */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 text-[#ffd27d] text-[10px] font-cinzel tracking-widest uppercase">
                CHAPTER {current.num} · {current.title}
              </span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-4xl text-[#ffd27d] font-normal leading-snug">
              {current.heading}
            </h3>

            <p className="font-cormorant text-lg sm:text-xl text-[#f3e3c8] leading-relaxed">
              {current.desc}
            </p>

            <blockquote className="p-4 rounded-xl bg-[#1f1109]/90 border-l-2 border-[#e5a93c] font-cormorant italic text-lg sm:text-xl text-[#ffd27d]">
              {current.quote}
            </blockquote>

            {/* Next Milestone Interaction */}
            <div className="pt-2 flex items-center gap-4">
              {activeStage < stages.length - 1 ? (
                <button
                  onClick={() => setActiveStage(activeStage + 1)}
                  className="group px-6 py-2.5 rounded-full border border-[#c5a059]/60 bg-[#1c0f08]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel tracking-[0.2em] uppercase transition-all cursor-pointer flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
                >
                  <span>NEXT MILESTONE</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              ) : (
                <button
                  onClick={onExploreArchive}
                  className="group px-6 py-2.5 rounded-full border border-[#ffd27d]/80 bg-[#c5a059] text-[#120a05] text-xs font-cinzel font-bold tracking-[0.2em] uppercase transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_25px_rgba(197,160,89,0.5)]"
                >
                  <span>EXPLORE ALL 8 FOLK TRADITIONS</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom Pathway Actions */}
      <div className="pt-12 border-t border-[#c5a059]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          onClick={onBackToFolkArts}
          className="text-xs font-cinzel text-[#c5a059] hover:text-[#ffd27d] tracking-[0.22em] uppercase transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO FOLK ARTS GATEWAY</span>
        </button>

        <button
          onClick={onExploreArchive}
          className="group px-7 py-3 rounded-full border border-[#c5a059]/60 bg-[#1c0f08]/90 hover:bg-[#c5a059] text-[#ffd27d] hover:text-[#120a05] text-xs font-cinzel font-semibold tracking-[0.24em] transition-all cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.85)] flex items-center gap-2.5"
        >
          <span>ENTER FOLK ARTS ARCHIVE</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
