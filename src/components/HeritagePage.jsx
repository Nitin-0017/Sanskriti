import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, ArrowRight, BookOpen, Sparkles, MapPin, Calendar, Award, Shield, Compass } from 'lucide-react';
import LivingAtmosphereCanvas from './LivingAtmosphereCanvas';

/**
 * India's Living Heritage Page — Digital Museum & Historical Archive
 * Large editorial-style visual sections showcasing the monumental pillars
 * of Indian civilizational history.
 */
export default function HeritagePage({ onOpenMap, onSelectStateJourney }) {
  const [activeCollection, setActiveCollection] = useState('all');
  const [selectedExhibit, setSelectedExhibit] = useState(null);

  const collections = [
    { id: 'all', label: 'All Collections' },
    { id: 'temples', label: 'Ancient Temples' },
    { id: 'forts', label: 'Forts & Palaces' },
    { id: 'arts', label: 'Classical Arts' },
    { id: 'folk', label: 'Folk Traditions' },
    { id: 'literature', label: 'Literature' },
    { id: 'texts', label: 'Sacred Texts' },
    { id: 'festivals', label: 'Festivals' },
    { id: 'icons', label: 'Cultural Icons' },
  ];

  const editorialExhibits = [
    {
      id: 'exhibit-hampi',
      category: 'temples',
      title: 'Hampi & Vijayanagara Stone Architecture',
      subtitle: 'The Granite Metropolis of the Tungabhadra',
      location: 'Bellary, Karnataka',
      period: '14th–16th Century CE',
      image: '/assets/pathway_start_closeup.jpg',
      leadQuote: '“The city is such that eye has not seen nor ear heard of any place resembling it upon the whole earth.” — Abdur Razzaq',
      desc: 'The monolithic Stone Chariot of Vittala Temple, musical pillars, and grand royal gopurams stand as a testament to the greatest southern empire of medieval India.',
      significance: 'UNESCO World Heritage Site; pinnacle of Dravidian architectural engineering.'
    },
    {
      id: 'exhibit-rajasthan',
      category: 'forts',
      title: 'Chittorgarh & Kumbhalgarh Hill Fortresses',
      subtitle: 'Bastions of Unbroken Rajput Sovereignty',
      location: 'Mewar, Rajasthan',
      period: '7th–15th Century CE',
      image: '/assets/heritage_hero_bg.jpg',
      leadQuote: '“Kumbhalgarh wall extends 36 kilometers — the second longest continuous wall in the world.”',
      desc: 'Perched upon 500-foot sheer cliffs, Chittorgarh contains the Vijay Stambha (Tower of Victory), massive water reservoirs, and heroic lore of Maharana Pratap.',
      significance: 'Symbol of immortal resistance and architectural military fortification.'
    },
    {
      id: 'exhibit-bharatanatyam',
      category: 'arts',
      title: 'Bharatanatyam of Tamilakam',
      subtitle: 'The Geometry of Sacred Devotion & Mudras',
      location: 'Thanjavur, Tamil Nadu',
      period: 'Ancient Natya Shastra Tradition',
      image: '/assets/sacred_mandala.jpg',
      leadQuote: '“Where the hand goes, the eyes follow; where the eyes go, the mind follows; where the mind goes, expression is born.”',
      desc: 'Derived from the sage Bharata Muni’s Natya Shastra, this classical dance embodies sacred temple devotion through intricate rhythmic footwork (Adavus) and expressive storytelling.',
      significance: 'Oldest classical dance tradition of India; living spiritual yoga.'
    },
    {
      id: 'exhibit-saang',
      category: 'folk',
      title: 'Saang & Folk Opera of Haryana',
      subtitle: 'Open-Air Ballads of Chivalry & Village Lore',
      location: 'Kurukshetra & Rohtak, Haryana',
      period: 'Bhakti & Medieval Era to Present',
      image: '/assets/haryana_countryside.jpg',
      leadQuote: '“Under the canopy of the village banyan, the singers summon the gods before the village council.”',
      desc: 'Performed without curtains on raised wooden platforms, Saang weaves Dohas, classical ragas, and historical heroism under the guidance of visionary bards like Pt. Lakhmi Chand.',
      significance: 'Living folk theater preserving oral memory without written scripts.',
      stateId: 'haryana'
    },
    {
      id: 'exhibit-gita',
      category: 'texts',
      title: 'Shrimad Bhagavad Gita',
      subtitle: 'The Universal Song Divine on Cosmic Duty',
      location: 'Jyotisar, Kurukshetra',
      period: 'Vedic Mahabharata Antiquity',
      image: '/assets/haryana_heritage_pavilion.jpg',
      leadQuote: '“You have a right to your duty, but not to the fruits thereof.”',
      desc: 'Spoken on the battlefield of Kurukshetra, the 700 verses synthesize Karma Yoga, Bhakti Yoga, and Jnana Yoga into a supreme philosophical guide for human existence.',
      significance: 'Foundational scripture of Indian thought revered across global civilizations.'
    },
    {
      id: 'exhibit-surdas',
      category: 'literature',
      title: 'Surdas & The Bhakti Poetic Renaissance',
      subtitle: 'Transcendental Melody of Sihi Village',
      location: 'Sihi (Faridabad) & Vrindavan',
      period: '16th Century CE',
      image: '/assets/parchment_texture.jpg',
      leadQuote: '“His sightless eyes saw deeper into the divine beauty than all the eyes of mortals.”',
      desc: 'Over 100,000 verses in the Sur Sagar celebrated divine grace, revolutionizing North Indian musical meters and vernacular poetry.',
      significance: 'Master of Braj dialect and Vaishnava devotional philosophy.'
    },
    {
      id: 'exhibit-kumbh',
      category: 'festivals',
      title: 'Kumbha Mahaparva & River Pilgrimages',
      subtitle: 'The Cosmic Alignment of Planetary Waters',
      location: 'Prayagraj, Haridwar, Ujjain, Nashik',
      period: 'Vedic Antiquity to Present',
      image: '/assets/map_background.png',
      leadQuote: '“Where the drops of Amrita fell from the divine urn into the sacred rivers of Bharat.”',
      desc: 'Every twelve years, tens of millions assemble at the confluence of the Ganga, Yamuna, and Saraswati to take the sacred dip for inner purification.',
      significance: 'Recognized by UNESCO as Intangible Cultural Heritage of Humanity.'
    },
    {
      id: 'exhibit-shivaji',
      category: 'icons',
      title: 'Chhatrapati Shivaji Maharaj',
      subtitle: 'The Architect of Hindavi Swarajya & Naval Bastions',
      location: 'Raigad & Sindhudurg, Maharashtra',
      period: '1630–1680 CE',
      image: '/assets/bharata_badge.jpg',
      leadQuote: '“A visionary king who established self-rule grounded in justice, naval warfare, and religious liberty.”',
      desc: 'Built the first indigenous ocean navy with impregnable sea forts like Sindhudurg and Vijaydurg, reviving ancient Sanskrit administrative manuals.',
      significance: 'Icon of civilizational renewal, guerrilla warfare, and upright governance.'
    }
  ];

  const filteredExhibits = editorialExhibits.filter(item => {
    return activeCollection === 'all' || item.category === activeCollection;
  });

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
          MUSEUM HERO SECTION
          ======================================================== */}
      <section className="relative z-20 pt-10 pb-8 px-4 sm:px-8 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-2 text-[#8a2e22]"
        >
          <Landmark className="w-5 h-5 text-[#b89352]" />
          <span className="font-marcellus text-xs tracking-[0.3em] uppercase font-bold text-[#8a2e22]">
            The National Heritage Archives
          </span>
          <Landmark className="w-5 h-5 text-[#b89352]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-cinzel text-4xl sm:text-6xl font-bold tracking-[0.22em] text-[#3d1e11] uppercase drop-shadow-[0_2px_4px_rgba(255,255,255,0.7)]"
        >
          INDIA'S LIVING HERITAGE
        </motion.h1>

        <p className="font-marcellus text-sm sm:text-lg text-[#704523] italic max-w-2xl mx-auto mt-2 leading-relaxed">
          “Discover the monuments, traditions, arts and stories that shaped Bharat.”
        </p>

        {/* Subtle Ornamental Divider */}
        <div className="flex items-center justify-center gap-2 my-5 opacity-60">
          <div className="h-[1px] w-16 bg-[#754c29]" />
          <span className="text-xs text-[#754c29]">❖</span>
          <div className="h-[1px] w-16 bg-[#754c29]" />
        </div>
      </section>

      {/* ========================================================
          HERITAGE COLLECTIONS SELECTOR
          ======================================================== */}
      <section className="relative z-20 px-4 sm:px-8 max-w-5xl mx-auto mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-sm border border-[#754c29]/30 bg-[#ecdcb8]/65 backdrop-blur-xs shadow-[0_2px_10px_rgba(60,35,15,0.12)]">
          {collections.map((col) => {
            const isActive = activeCollection === col.id;
            return (
              <button
                key={col.id}
                onClick={() => {
                  if (window.playTempleChime) window.playTempleChime();
                  setActiveCollection(col.id);
                }}
                className="px-3.5 py-1.5 rounded-[2px] font-cinzel text-xs font-bold tracking-[0.16em] uppercase transition-all cursor-pointer"
                style={{
                  backgroundColor: isActive ? '#f8f0dc' : 'transparent',
                  color: isActive ? '#341a0e' : '#6b4c34',
                  border: isActive ? '1px solid #b89352' : '1px solid transparent',
                  boxShadow: isActive ? '0 2px 5px rgba(60,35,15,0.15)' : 'none',
                }}
              >
                {col.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          LARGE EDITORIAL EXHIBITION TILES
          ======================================================== */}
      <section className="relative z-20 px-4 sm:px-8 max-w-6xl mx-auto pb-24 space-y-10">
        {filteredExhibits.map((exhibit, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={exhibit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              onClick={() => {
                if (window.playTempleChime) window.playTempleChime();
                if (exhibit.stateId && onSelectStateJourney) {
                  onSelectStateJourney({ id: exhibit.stateId, name: 'Haryana' });
                } else {
                  setSelectedExhibit(exhibit);
                }
              }}
              className={`rounded-sm border border-[#754c29]/40 bg-[#f8f1de]/90 hover:bg-[#fffbf0] transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(60,35,15,0.2)] hover:shadow-[0_16px_40px_rgba(197,160,89,0.35)] hover:border-[#b89352] overflow-hidden flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } group`}
            >
              {/* Editorial Image Side */}
              <div className="lg:w-1/2 h-64 lg:h-auto min-h-[260px] relative overflow-hidden bg-[#24150c]">
                <img
                  src={exhibit.image}
                  alt={exhibit.title}
                  className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160d07]/80 via-transparent to-transparent" />

                {/* Period & Location Badge */}
                <div className="absolute bottom-3 left-4 text-white text-xs font-marcellus drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  <span className="text-[#ffd27d] font-bold block mb-0.5">📍 {exhibit.location}</span>
                  <span className="text-[10px] text-[#e8d5b5]">⏳ {exhibit.period}</span>
                </div>
              </div>

              {/* Editorial Manuscript Text Side */}
              <div className="lg:w-1/2 p-6 sm:p-8 flex flex-col justify-between relative">
                {/* Antique Inset Border */}
                <div className="absolute inset-2 border border-[#754c29]/15 pointer-events-none rounded-[1px]" />

                <div>
                  <span className="text-[9px] font-marcellus text-[#8a2e22] uppercase tracking-[0.25em] font-bold block mb-1">
                    Imperial Archive Exhibit
                  </span>

                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#341a0e] tracking-wide group-hover:text-[#8a2e22] transition-colors">
                    {exhibit.title}
                  </h3>

                  <p className="font-marcellus text-xs sm:text-sm text-[#7a4823] italic mt-1 mb-3">
                    {exhibit.subtitle}
                  </p>

                  <p className="font-manuscript text-xs sm:text-sm text-[#4a2e1b] leading-relaxed mb-4">
                    {exhibit.desc}
                  </p>

                  {/* Lead Chronicle Quote */}
                  <div className="p-3 rounded-sm border-l-2 border-[#b89352] bg-[#eddcb4]/50 my-2 font-manuscript text-xs italic text-[#382012]">
                    {exhibit.leadQuote}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-[#754c29]/20 flex items-center justify-between text-xs font-cinzel font-bold text-[#8a2e22] tracking-wider uppercase">
                  <span>{exhibit.stateId ? 'Begin State Journey' : 'Examine Chronicle'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#8a2e22]" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* ========================================================
          EXHIBIT CHRONICLE DETAIL MODAL
          ======================================================== */}
      <AnimatePresence>
        {selectedExhibit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0604]/80 backdrop-blur-sm"
            onClick={() => setSelectedExhibit(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-xl w-full rounded-sm border-2 border-[#b89352] bg-[#fbf5e6] text-[#2a170d] shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              <div className="relative h-56 w-full">
                <img src={selectedExhibit.image} alt={selectedExhibit.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160d07] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 text-white">
                  <span className="text-[10px] font-marcellus uppercase tracking-widest text-[#ffd27d] block mb-0.5">
                    {selectedExhibit.location} • {selectedExhibit.period}
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold tracking-wider text-[#fff5db]">
                    {selectedExhibit.title}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <p className="font-marcellus text-xs text-[#8a2e22] italic mb-3">
                  {selectedExhibit.subtitle}
                </p>

                <p className="font-manuscript text-sm text-[#382012] leading-relaxed mb-4">
                  {selectedExhibit.desc}
                </p>

                <div className="p-3.5 rounded-sm border-l-3 border-[#8a2e22] bg-[#eddcb4]/60 my-3 font-manuscript text-xs italic text-[#5c181f]">
                  {selectedExhibit.leadQuote}
                </div>

                <div className="text-[11px] font-marcellus text-[#7a4823] italic mb-4">
                  ❖ Civilizational Impact: {selectedExhibit.significance}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#754c29]/20">
                  <button
                    onClick={() => {
                      setSelectedExhibit(null);
                      onOpenMap();
                    }}
                    className="btn-antique-journey px-4 py-2 rounded-sm text-xs font-cinzel font-bold text-[#fff4d0] tracking-wider uppercase cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Locate on Map</span>
                    <Compass className="w-3.5 h-3.5 text-[#ffd27d]" />
                  </button>

                  <button
                    onClick={() => setSelectedExhibit(null)}
                    className="px-4 py-2 rounded-sm border border-[#754c29]/40 bg-[#ecdcb8] hover:bg-[#dfcca1] text-xs font-cinzel font-bold text-[#341a0e] tracking-wider uppercase cursor-pointer"
                  >
                    Close Chronicle
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
