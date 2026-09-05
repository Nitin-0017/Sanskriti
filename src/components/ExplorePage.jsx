import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Map, ArrowRight, Sparkles, Landmark, BookOpen, Music, Crown, Calendar, Search } from 'lucide-react';
import LivingAtmosphereCanvas from './LivingAtmosphereCanvas';
import { REAL_INDIA_STATES } from '../data/realIndiaSvgPaths';

/**
 * Explore India Page — Geographical & Cultural Discovery
 * Styled like an illustrated royal atlas with curated categories,
 * regional directories, and direct portals into the interactive map and state journeys.
 */
export default function ExplorePage({
  onOpenMap,
  onSelectStateJourney
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const categories = [
    { id: 'all', label: 'All Portals' },
    { id: 'states', label: 'States & UTs' },
    { id: 'temples', label: 'Temples' },
    { id: 'folkArts', label: 'Folk Arts' },
    { id: 'literature', label: 'Literature' },
    { id: 'scriptures', label: 'Scriptures' },
    { id: 'persons', label: 'Key Persons' },
    { id: 'festivals', label: 'Festivals' },
    { id: 'places', label: 'Historical Places' },
  ];

  // Editorial Curated Exploration Portals
  const explorationPortals = [
    {
      id: 'haryana-state',
      category: 'states',
      title: 'Haryana',
      subtitle: 'Land of Folk Traditions & Vedic Chariots',
      region: 'North India',
      image: '/assets/haryana_countryside.jpg',
      icon: '☸',
      desc: 'Explore the cradle of Vedic civilization, the eternal battlefields of Kurukshetra, and vibrant folk opera traditions.',
      badge: 'Flagship Journey',
      actionType: 'journey',
      stateId: 'haryana'
    },
    {
      id: 'rajasthan-forts',
      category: 'places',
      title: 'Hill Forts of Rajasthan',
      subtitle: 'Citadels of Valor & Sandstone Splendor',
      region: 'Western Maru',
      image: '/assets/heritage_hero_bg.jpg',
      icon: '🏰',
      desc: 'UNESCO World Heritage forts including Chittorgarh, Kumbhalgarh, and Mehrangarh, towering over the Thar desert sands.',
      badge: 'Royal Citadels',
      actionType: 'modal'
    },
    {
      id: 'konark-sun-temple',
      category: 'temples',
      title: 'Konark Sun Temple',
      subtitle: 'The Colossal Cosmic Chariot of Surya',
      region: 'Odisha Coast',
      image: '/assets/pathway_start_closeup.jpg',
      icon: '☀️',
      desc: 'A 13th-century architectural triumph carved as a colossal 24-wheeled chariot dragged by seven celestial horses.',
      badge: 'Architectural Wonder',
      actionType: 'modal'
    },
    {
      id: 'bhagavad-gita',
      category: 'scriptures',
      title: 'Shrimad Bhagavad Gita',
      subtitle: 'The Cosmic Song of Duty & Transcendence',
      region: 'Kurukshetra, Haryana',
      image: '/assets/haryana_heritage_pavilion.jpg',
      icon: '📜',
      desc: 'The timeless 700-verse philosophical dialogue spoken by Bhagavan Krishna to warrior Arjuna at Jyotisar.',
      badge: 'Supreme Scripture',
      actionType: 'modal'
    },
    {
      id: 'kathakali-dance',
      category: 'folkArts',
      title: 'Kathakali Drama of Kerala',
      subtitle: 'Living Painted Mythological Theatre',
      region: 'Malabar Coast',
      image: '/assets/sacred_mandala.jpg',
      icon: '🎭',
      desc: 'Intricate facial makeup (Chutti), elaborate mudras, and epic stories of gods and demons dramatized with drumbeats.',
      badge: 'Living Classical Art',
      actionType: 'modal'
    },
    {
      id: 'sant-surdas',
      category: 'persons',
      title: 'Sant Surdas',
      subtitle: 'The Divine Bard of Sihi & Braj',
      region: 'Northern Plains',
      image: '/assets/parchment_texture.jpg',
      icon: '👑',
      desc: '16th-century blind Vaishnava poet whose ecstatic verses captured the divine childhood pastimes of Krishna.',
      badge: 'Bhakti Pioneer',
      actionType: 'modal'
    },
    {
      id: 'kumbha-mela',
      category: 'festivals',
      title: 'Kumbha Mahaparva',
      subtitle: 'The Sacred Confluence of Immortality',
      region: 'Prayagraj & Haridwar',
      image: '/assets/map_background.png',
      icon: '🌊',
      desc: 'The largest spiritual gathering on Earth celebrating the nectar of immortality at the sacred Sangam of holy rivers.',
      badge: 'Eternal Festival',
      actionType: 'modal'
    },
    {
      id: 'surdas-padavali',
      category: 'literature',
      title: 'Surdas Padavali & Sangam Verse',
      subtitle: 'Immortal Epics from North to South',
      region: 'Pan-Indian Legacy',
      image: '/assets/vintage_india_atlas_map.jpg',
      icon: '📖',
      desc: 'Classic poetic treatises combining devotional Brajbhasha hymns with classical Tamil Sangam romanticism.',
      badge: 'Classical Poetry',
      actionType: 'modal'
    }
  ];

  const filteredPortals = explorationPortals.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handlePortalClick = (portal) => {
    if (window.playTempleChime) window.playTempleChime();
    if (portal.actionType === 'journey') {
      const targetState = REAL_INDIA_STATES.find(s => s.id === portal.stateId) || { id: 'haryana', name: 'Haryana' };
      if (onSelectStateJourney) onSelectStateJourney(targetState);
    } else {
      setActiveModalItem(portal);
    }
  };

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
          EXPLORE HERO SECTION
          ======================================================== */}
      <section className="relative z-20 pt-10 pb-8 px-4 sm:px-8 max-w-6xl mx-auto text-center">
        {/* Cartographic Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-2 text-[#8a2e22]"
        >
          <Compass className="w-5 h-5 text-[#b89352] animate-spin-slow" />
          <span className="font-marcellus text-xs tracking-[0.3em] uppercase font-bold text-[#8a2e22]">
            Cartographic Portals of Bharat
          </span>
          <Compass className="w-5 h-5 text-[#b89352] animate-spin-slow" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-cinzel text-4xl sm:text-6xl font-bold tracking-[0.22em] text-[#3d1e11] uppercase drop-shadow-[0_2px_4px_rgba(255,255,255,0.7)]"
        >
          EXPLORE INDIA
        </motion.h1>

        {/* Subheading */}
        <p className="font-marcellus text-sm sm:text-lg text-[#704523] italic max-w-2xl mx-auto mt-2 leading-relaxed">
          “Walk through the stories, traditions and living heritage of Bharat.”
        </p>

        {/* Direct Map Gateway Banner */}
        <div className="mt-6 inline-flex items-center gap-3 p-1 rounded-full border border-[#b89352]/60 bg-[#ecdcb8]/75 backdrop-blur-xs shadow-[0_4px_20px_rgba(60,35,15,0.2)]">
          <span className="font-cinzel text-xs font-bold text-[#3d1e11] tracking-wider pl-4 pr-1 hidden sm:inline">
            Prefer Interactive Full-Screen Cartography?
          </span>
          <button
            onClick={() => {
              if (window.playTempleChime) window.playTempleChime();
              onOpenMap();
            }}
            className="btn-antique-journey flex items-center gap-2 px-5 py-2 rounded-full text-xs font-cinzel font-bold text-[#fff4d0] tracking-[0.18em] uppercase cursor-pointer"
          >
            <Map className="w-3.5 h-3.5 text-[#ffd27d]" />
            <span>Open Interactive Map</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#ffd27d]" />
          </button>
        </div>
      </section>

      {/* ========================================================
          EXPLORATION CATEGORIES & SEARCH BAR
          ======================================================== */}
      <section className="relative z-20 px-4 sm:px-8 max-w-6xl mx-auto mb-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-sm border border-[#754c29]/30 bg-[#ecdcb8]/65 backdrop-blur-xs shadow-[0_2px_10px_rgba(60,35,15,0.12)]">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (window.playTempleChime) window.playTempleChime();
                  setSelectedCategory(cat.id);
                }}
                className="px-3.5 py-1.5 rounded-[2px] font-cinzel text-xs font-bold tracking-[0.15em] uppercase transition-all cursor-pointer"
                style={{
                  backgroundColor: isActive ? '#f8f0dc' : 'transparent',
                  color: isActive ? '#341a0e' : '#6b4c34',
                  border: isActive ? '1px solid #b89352' : '1px solid transparent',
                  boxShadow: isActive ? '0 2px 5px rgba(60,35,15,0.15)' : 'none',
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="mt-4 flex items-center justify-between gap-3 max-w-md mx-auto">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#754c29]/60" />
            <input
              type="text"
              placeholder="Search traditions, monuments, states..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-sm border border-[#754c29]/30 bg-[#f7eed9]/90 text-xs font-manuscript text-[#341a0e] placeholder-[#8c6b4e] focus:outline-none focus:border-[#b89352] shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          EXPLORATION CARDS GRID (ILLUSTRATED ATLAS PAGES)
          ======================================================== */}
      <section className="relative z-20 px-4 sm:px-8 max-w-6xl mx-auto pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortals.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => handlePortalClick(item)}
              className="group rounded-sm border border-[#754c29]/45 bg-[#f8f1de]/90 hover:bg-[#fffbf0] transition-all duration-300 cursor-pointer shadow-[0_6px_20px_rgba(60,35,15,0.18)] hover:shadow-[0_12px_30px_rgba(197,160,89,0.35)] hover:border-[#b89352] relative overflow-hidden flex flex-col"
            >
              {/* Antique Corner Details */}
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-[#754c29] pointer-events-none opacity-70 group-hover:border-[#b89352] z-10" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-[#754c29] pointer-events-none opacity-70 group-hover:border-[#b89352] z-10" />

              {/* Image Preview Capsule */}
              <div className="relative h-44 w-full overflow-hidden border-b border-[#754c29]/30 bg-[#25160d]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160d07]/80 via-transparent to-transparent" />

                {/* Badge Tag */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full border border-[#c5a059]/60 bg-[#160d07]/85 backdrop-blur-xs text-[9px] font-cinzel font-bold text-[#ffd27d] uppercase tracking-wider">
                  {item.badge}
                </div>

                <div className="absolute bottom-2 left-3 text-[#fbf5e6] text-xs font-marcellus flex items-center gap-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  <span>📍 {item.region}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{item.icon}</span>
                    <h3 className="font-cinzel text-lg font-bold text-[#341a0e] tracking-wide group-hover:text-[#8a2e22] transition-colors">
                      {item.title}
                    </h3>
                  </div>

                  <p className="font-marcellus text-xs text-[#7a4823] italic mb-2">
                    {item.subtitle}
                  </p>

                  <p className="font-manuscript text-xs text-[#4a2e1b] leading-relaxed line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                {/* Footer Action Callout */}
                <div className="pt-3 mt-3 border-t border-[#754c29]/20 flex items-center justify-between text-xs font-cinzel font-bold text-[#8a2e22] tracking-wider uppercase">
                  <span>{item.actionType === 'journey' ? 'Travel into State' : 'Explore Heritage'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================
          ITEM DETAIL MODAL
          ======================================================== */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0604]/80 backdrop-blur-sm"
            onClick={() => setActiveModalItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full rounded-sm border-2 border-[#b89352] bg-[#fbf5e6] text-[#2a170d] shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <img src={activeModalItem.image} alt={activeModalItem.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160d07] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-white">
                  <span className="text-[10px] font-marcellus uppercase tracking-widest text-[#ffd27d] block">
                    {activeModalItem.badge} • {activeModalItem.region}
                  </span>
                  <h3 className="font-cinzel text-2xl font-bold tracking-wider text-[#fff5db]">
                    {activeModalItem.title}
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <p className="font-marcellus text-xs text-[#8a2e22] italic mb-2">
                  {activeModalItem.subtitle}
                </p>
                <p className="font-manuscript text-sm text-[#382012] leading-relaxed mb-4">
                  {activeModalItem.desc}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-[#754c29]/20">
                  <button
                    onClick={() => {
                      setActiveModalItem(null);
                      onOpenMap();
                    }}
                    className="btn-antique-journey px-4 py-2 rounded-sm text-xs font-cinzel font-bold text-[#fff4d0] tracking-wider uppercase cursor-pointer flex items-center gap-1.5"
                  >
                    <span>View on Map</span>
                    <Map className="w-3 h-3 text-[#ffd27d]" />
                  </button>

                  <button
                    onClick={() => setActiveModalItem(null)}
                    className="px-4 py-2 rounded-sm border border-[#754c29]/40 bg-[#ecdcb8] hover:bg-[#dfcca1] text-xs font-cinzel font-bold text-[#341a0e] tracking-wider uppercase cursor-pointer"
                  >
                    Close
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
