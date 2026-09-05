import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Compass, Shield, Heart, Feather, Landmark, ArrowRight } from 'lucide-react';
import LivingAtmosphereCanvas from './LivingAtmosphereCanvas';

/**
 * About Sanskriti Page — Ancient Manuscript & Civilizational Chronicle
 * Describes the vision, historical journey timeline, preservation pillars,
 * and civilizational philosophy of the Sanskriti Heritage Atlas.
 */
export default function AboutPage({ onOpenMap }) {
  const timelineEras = [
    {
      period: 'c. 3000 BCE – 500 CE',
      title: 'Ancient India',
      subtitle: 'Dawn of Vedic Wisdom & Classical Empires',
      desc: 'The Indus-Saraswati town planning, the composition of the Rigveda on riverbanks, the Upanishadic dialogues on consciousness, and the classical golden age of Sanskrit drama and science.',
      milestones: ['Rigvedic Saraswati Suktas', 'Shrimad Bhagavad Gita', 'Ashokan Edicts', 'Aryabhata Mathematics'],
      glyph: '☸'
    },
    {
      period: 'c. 500 CE – 1500 CE',
      title: 'Medieval India',
      subtitle: 'Monumental Temples & The Bhakti Renaissance',
      desc: 'Tiered granite plinths reaching for the heavens, Chola ocean armadas mapping Southeast Asia, and egalitarian Bhakti saints singing divine love across regional vernaculars.',
      milestones: ['Brihadeeswarar Temple', 'Konark Sun Chariot', 'Surdas & Kabir Verses', 'Nalanda Mahavihara'],
      glyph: '🏛'
    },
    {
      period: 'c. 1500 – 1947 CE',
      title: 'Era of Resistance',
      subtitle: 'Chhatrapati Shivaji to the Freedom Awakening',
      desc: 'Defending civilizational identity through Maratha guerrilla bastions, Ahirwal valor in 1857, and the unyielding spiritual and cultural renaissance leading to national liberation.',
      milestones: ['Hindavi Swarajya Citadels', 'Rao Tula Ram Rewari', '1857 First War of Independence', 'Bande Mataram Awakening'],
      glyph: '⚔'
    },
    {
      period: '1947 – Present',
      title: 'Living Heritage',
      subtitle: 'Timeless Traditions in the Digital Epoch',
      desc: 'The unbroken chain of festival celebrations, sacred river baths, grandmother’s oral idioms, and folk performing arts — now safeguarded for global discovery.',
      milestones: ['Kumbha Mahaparva Gatherings', 'Living Folk Saang & Kathakali', 'Sacred Pilgrim Parikramas', 'Sanskriti Digital Archive'],
      glyph: '✦'
    }
  ];

  const preservationPillars = [
    { title: 'Architecture', desc: 'Monolithic rock sanctums, stepwells, and mountain citadels.', icon: '🏛' },
    { title: 'Folk Arts', desc: 'Open-air operatic dramas, earthen pottery, and heirloom textiles.', icon: '♫' },
    { title: 'Literature', desc: 'Ancient epics, devotional padavalis, and rural wisdom proverbs.', icon: '📜' },
    { title: 'Scriptures', desc: 'The eternal verses of the Vedas, Upanishads, and Bhagavad Gita.', icon: '☸' },
    { title: 'Traditions', desc: 'Seasonal harvests, river confluences, and community rites.', icon: '✿' },
    { title: 'People', desc: 'Sages, visionary monarchs, freedom stalwarts, and village bards.', icon: '👑' },
    { title: 'Stories', desc: 'Oral genealogies and moral parables whispered across millennia.', icon: '📖' }
  ];

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-[#140c07] text-[#2a170d] font-manuscript select-none pt-20">

      {/* Background Vintage Parchment Surface */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-90"
        style={{ backgroundImage: `url('/assets/map_background.png')` }}
      />
      <div className="fixed inset-0 parchment-vignette pointer-events-none opacity-50" />
      <LivingAtmosphereCanvas mousePos={{ x: 0, y: 0 }} progress={1} isArrival={true} />

      {/* ========================================================
          HERO: THE STORY BEHIND SANSKRITI
          ======================================================== */}
      <section className="relative z-20 pt-10 pb-8 px-4 sm:px-8 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-2 text-[#8a2e22]"
        >
          <Feather className="w-5 h-5 text-[#b89352]" />
          <span className="font-marcellus text-xs tracking-[0.3em] uppercase font-bold text-[#8a2e22]">
            The Sanskriti Chronicle
          </span>
          <Feather className="w-5 h-5 text-[#b89352]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-cinzel text-4xl sm:text-6xl font-bold tracking-[0.22em] text-[#3d1e11] uppercase drop-shadow-[0_2px_4px_rgba(255,255,255,0.7)]"
        >
          THE STORY BEHIND SANSKRITI
        </motion.h1>

        <p className="font-marcellus text-sm sm:text-lg text-[#704523] italic max-w-2xl mx-auto mt-2 leading-relaxed">
          “Preserving the stories of Bharat, one journey at a time.”
        </p>

        {/* Parchment Divider */}
        <div className="flex items-center justify-center gap-2 my-5 opacity-60">
          <div className="h-[1px] w-20 bg-[#754c29]" />
          <span className="text-xs text-[#754c29]">❖</span>
          <div className="h-[1px] w-20 bg-[#754c29]" />
        </div>
      </section>

      {/* ========================================================
          SECTION 1: OUR VISION
          ======================================================== */}
      <section className="relative z-20 px-4 sm:px-8 max-w-4xl mx-auto mb-16">
        <div className="p-6 sm:p-10 rounded-sm border border-[#754c29]/40 bg-[#f8f1de]/90 shadow-[0_8px_30px_rgba(60,35,15,0.18)] relative">
          {/* Corner Flourishes */}
          <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#754c29]/70" />
          <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#754c29]/70" />
          <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#754c29]/70" />
          <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#754c29]/70" />

          <div className="text-center mb-6">
            <span className="text-[10px] font-marcellus text-[#8a2e22] uppercase tracking-[0.25em] font-bold block mb-1">
              Civilizational Mission
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#341a0e] tracking-wider uppercase">
              OUR VISION
            </h2>
          </div>

          <div className="space-y-4 font-manuscript text-sm sm:text-base text-[#4a2e1b] leading-relaxed text-justify">
            <p>
              India is not simply a nation on a map; it is a five-thousand-year-old living civilizational matrix. Across every valley, mountain range, and river confluence, stories of profound spirituality, architectural audacity, folk poetry, and human courage have been passed down through generations.
            </p>
            <p>
              Yet, in the digital era, much of this magnificent legacy has been reduced to fragmented Wikipedia articles, dry textbook dates, or flat tourism brochures. The poetic soul of Bharat — the feeling of opening an antique explorer’s atlas and stepping physically into a state’s cultural heart — has been missing.
            </p>
            <p>
              <strong className="font-cinzel text-[#8a2e22]">Sanskriti</strong> was founded to bridge this divide. We combine rigorous historical research, museum-grade storytelling, antique royal cartography, and cutting-edge interactive technology to turn the heritage of Bharat into an unforgettable personal journey.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: THE CIVILIZATIONAL JOURNEY (TIMELINE)
          ======================================================== */}
      <section className="relative z-20 px-4 sm:px-8 max-w-5xl mx-auto mb-20">
        <div className="text-center mb-10">
          <span className="text-[10px] font-marcellus text-[#8a2e22] uppercase tracking-[0.25em] font-bold block mb-1">
            Unbroken Continuum
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#341a0e] tracking-wider uppercase">
            THE CIVILIZATIONAL JOURNEY
          </h2>
          <p className="font-marcellus text-xs sm:text-sm text-[#704523] italic mt-1">
            Five millennia of living memory flowing through time
          </p>
        </div>

        {/* Timeline Track */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-[#b89352]/40">
          {timelineEras.map((era, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col sm:flex-row items-center gap-6 ${isLeft ? 'sm:flex-row-reverse' : ''
                  }`}
              >
                {/* Center Node Icon */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-[#b89352] bg-[#fbf5e6] text-[#8a2e22] flex items-center justify-center text-sm shadow-[0_0_10px_rgba(184,147,82,0.5)] z-10">
                  {era.glyph}
                </div>

                {/* Content Card */}
                <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isLeft ? 'sm:pr-10 sm:text-right' : 'sm:pl-10'}`}>
                  <div className="p-5 sm:p-6 rounded-sm border border-[#754c29]/35 bg-[#f8f1de]/90 shadow-[0_4px_16px_rgba(60,35,15,0.12)]">
                    <span className="text-[10px] font-marcellus text-[#8a2e22] uppercase tracking-wider font-semibold block mb-0.5">
                      {era.period}
                    </span>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#341a0e] uppercase">
                      {era.title}
                    </h3>
                    <p className="font-marcellus text-xs text-[#7a4823] italic mb-2">
                      {era.subtitle}
                    </p>
                    <p className="font-manuscript text-xs sm:text-sm text-[#4a2e1b] leading-relaxed mb-3">
                      {era.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#754c29]/15">
                      {era.milestones.map((m, mIdx) => (
                        <span key={mIdx} className="text-[9px] font-marcellus px-2 py-0.5 rounded-full border border-[#b89352]/40 bg-[#ecdcb8]/60 text-[#523321]">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty Spacer for Balance */}
                <div className="hidden sm:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          SECTION 3: WHAT WE PRESERVE
          ======================================================== */}
      <section className="relative z-20 px-4 sm:px-8 max-w-5xl mx-auto mb-20">
        <div className="text-center mb-8">
          <span className="text-[10px] font-marcellus text-[#8a2e22] uppercase tracking-[0.25em] font-bold block mb-1">
            Living Archives
          </span>
          <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[#341a0e] tracking-wider uppercase">
            WHAT WE PRESERVE
          </h2>
          <p className="font-marcellus text-xs sm:text-sm text-[#704523] italic mt-1">
            The seven sacred custodians of the Indian civilizational spirit
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {preservationPillars.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              className="p-4 rounded-sm border border-[#754c29]/35 bg-[#f8f1de]/90 text-center shadow-[0_4px_12px_rgba(60,35,15,0.1)] hover:border-[#b89352] transition-colors"
            >
              <div className="w-10 h-10 mx-auto mb-2 rounded-full border border-[#b89352]/50 bg-[#ecdcb8]/70 flex items-center justify-center text-lg">
                {p.icon}
              </div>
              <h4 className="font-cinzel text-sm font-bold text-[#341a0e] tracking-wide uppercase mb-1">
                {p.title}
              </h4>
              <p className="font-manuscript text-xs text-[#523321] leading-snug">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================
          SECTION 4: OUR PHILOSOPHY (ROYAL QUOTE CARTOUCHE)
          ======================================================== */}
      <section className="relative z-20 px-4 sm:px-8 max-w-3xl mx-auto pb-24 text-center">
        <div className="p-8 sm:p-12 rounded-sm border-2 border-[#b89352] bg-[#fbf5e6] shadow-[0_15px_45px_rgba(60,35,15,0.25)] relative">
          {/* Antique Filigree Header */}
          <div className="flex items-center justify-center gap-2 mb-4 text-[#8a2e22]">
            <span className="text-base">❖</span>
            <span className="font-cinzel text-xs uppercase tracking-[0.3em] font-bold">
              The Guiding Light
            </span>
            <span className="text-base">❖</span>
          </div>

          <blockquote className="font-cinzel text-xl sm:text-3xl font-bold text-[#341a0e] leading-relaxed uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            “Heritage is not merely what we inherit.
            <br />
            It is what we choose to remember.”
          </blockquote>

          <p className="font-marcellus text-xs sm:text-sm text-[#7a4823] italic mt-4">
            — Sanskriti Heritage Foundation
          </p>

          <div className="mt-8">
            <button
              onClick={() => {
                if (window.playTempleChime) window.playTempleChime();
                onOpenMap();
              }}
              className="btn-antique-journey px-6 py-2.5 rounded-sm inline-flex items-center gap-2 text-xs font-cinzel font-bold text-[#fff4d0] tracking-[0.2em] uppercase cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#ffd27d]" />
              <span>Begin Exploring the Map</span>
              <ArrowRight className="w-4 h-4 text-[#ffd27d]" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
