import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EntranceSequence from './components/EntranceSequence';
import OrnamentalFrame from './components/OrnamentalFrame';
import HeritageNavbar from './components/HeritageNavbar';
import CinematicJourneyHero from './components/CinematicJourneyHero';
import VintageIndiaSvgMap from './components/VintageIndiaSvgMap';
import StateCinematicJourney from './components/StateCinematicJourney';
import StateHeritageAtlasPage from './components/StateHeritageAtlasPage';
import ExplorePage from './components/ExplorePage';
import HeritagePage from './components/HeritagePage';
import AboutPage from './components/AboutPage';
import AuthPage from './components/AuthPage';
import { getStateExperience } from './data/stateExperienceData';
import audioManager from './services/audioManager';

export default function App() {
  const [showEntrance, setShowEntrance] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('/haryana') || path.includes('/folk-arts') || path.includes('/literature') || path.includes('/scriptures') || path === '/explore' || path === '/heritage' || path === '/about' || path === '/auth' || path === '/map') {
        return false;
      }
    }
    return true;
  });
  const [isMuted, setIsMuted] = useState(audioManager.isMuted);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  // Sync with centralized audioManager
  useEffect(() => {
    const unsub = audioManager.subscribe((state) => {
      setIsMuted(state.isMuted);
    });
    audioManager.setGeneralWebsite();
    return unsub;
  }, []);

  // Views: 'landing' | 'map' | 'state-journey' | 'state-archive' | 'explore' | 'heritage' | 'about' | 'auth' | 'transitioning'
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('/haryana') || path.includes('/folk-arts') || path.includes('/literature') || path.includes('/scriptures')) return 'state-archive';
      if (path === '/explore') return 'explore';
      if (path === '/heritage') return 'heritage';
      if (path === '/about') return 'about';
      if (path === '/auth') return 'auth';
      if (path === '/map') return 'map';
    }
    return 'landing';
  });
  const [selectedState, setSelectedState] = useState(null);

  const handleEntranceComplete = () => {
    setShowEntrance(false);
  };

  // Called when user clicks "BEGIN JOURNEY" button on landing or map CTA
  const handleBeginJourney = () => {
    if (window.playTempleChime) window.playTempleChime();
    setCurrentView('transitioning');

    setTimeout(() => {
      setCurrentView('map');
    }, 850);
  };

  // Called when user clicks "← Grand Pathway" from the map or Return
  const handleReturnToLanding = () => {
    if (window.playTempleChime) window.playTempleChime();
    setCurrentView('transitioning');
    setTimeout(() => {
      setCurrentView('landing');
    }, 650);
  };

  // Triggered when a state (such as Haryana) is clicked on the interactive India map
  const handleInitiateStateJourney = (stateObj) => {
    setSelectedState(stateObj);
    setCurrentView('state-journey');
  };

  // Triggered when cinematic countryside journey completes or user clicks "Skip Journey"
  const handleJourneyComplete = () => {
    if (window.playTempleChime) window.playTempleChime();
    setCurrentView('state-archive');
  };

  // Return to the India map from the journey or heritage archive
  const handleReturnToMap = () => {
    if (window.playTempleChime) window.playTempleChime();
    setCurrentView('map');
  };

  // Relive the cinematic state journey from the archive
  const handleReliveJourney = () => {
    if (window.playTempleChime) window.playTempleChime();
    setCurrentView('state-journey');
  };

  // Global Navigation Dispatcher
  const handleNavigate = (targetView) => {
    if (window.playTempleChime) window.playTempleChime();
    if (targetView === 'home') {
      handleReturnToLanding();
    } else if (targetView === 'explore') {
      setCurrentView('explore');
    } else if (targetView === 'heritage') {
      setCurrentView('heritage');
    } else if (targetView === 'about') {
      setCurrentView('about');
    } else if (targetView === 'auth') {
      setCurrentView('auth');
    } else if (targetView === 'map') {
      handleBeginJourney();
    }
  };

  const activeStateExperience = getStateExperience(
    selectedState?.id || 'haryana',
    selectedState
  );

  // Whether the global navbar should be rendered
  const showGlobalNavbar = ['landing', 'explore', 'heritage', 'about', 'auth'].includes(currentView);

  return (
    <div className="relative min-h-screen bg-[#0d0906] text-[#e8d8b8] selection:bg-[#7a2832] selection:text-[#f7e6c4] font-manuscript overflow-x-hidden select-none">

      {/* 1. CINEMATIC SACRED MANDALA ENTRANCE SEQUENCE (Phase 1) */}
      <AnimatePresence>
        {showEntrance && (
          <EntranceSequence onComplete={handleEntranceComplete} />
        )}
      </AnimatePresence>

      {/* 2. GLOBAL HERITAGE NAVBAR (Consistent across Explore, Heritage, About, Auth, Landing) */}
      {showGlobalNavbar && (
        <HeritageNavbar
          currentView={currentView}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          onNavigate={handleNavigate}
          isVisible={currentView !== 'landing' ? true : (!showEntrance && isNavbarVisible)}
        />
      )}

      {/* 3. CINEMATIC TRANSITION PORTAL OVERLAY */}
      <AnimatePresence>
        {currentView === 'transitioning' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 pointer-events-none bg-[#0a0604] flex flex-col items-center justify-center"
          >
            <div
              className="absolute inset-0 opacity-40 bg-cover bg-center mix-blend-multiply"
              style={{ backgroundImage: `url('/assets/burnt_parchment.jpg')` }}
            />
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full border-2 border-[#d4af37]/60 flex items-center justify-center p-1 mb-4 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
              >
                <img src="/assets/sacred_mandala.jpg" alt="Loading Atlas" className="w-full h-full object-cover rounded-full" />
              </motion.div>
              <p className="font-cinzel text-base tracking-[0.3em] text-[#ffd27d] uppercase">
                Opening Royal Heritage Atlas
              </p>
              <p className="font-marcellus text-xs text-[#c5a059]/80 italic mt-1">
                Entering Bhārata Varṣa...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. VIEW: LANDING PAGE */}
      {currentView === 'landing' && (
        <div
          key="landing-page"
          className="relative w-full h-screen overflow-hidden"
        >
          <OrnamentalFrame isVisible={!showEntrance && isNavbarVisible} />
          <CinematicJourneyHero
            isActive={!showEntrance}
            onBeginJourneyNext={handleBeginJourney}
            isNavbarVisible={isNavbarVisible}
            setIsNavbarVisible={setIsNavbarVisible}
          />
        </div>
      )}

      {/* 5. VIEW: EXPLORE INDIA PAGE */}
      {currentView === 'explore' && (
        <motion.div
          key="explore-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ExplorePage
            onOpenMap={handleBeginJourney}
            onSelectStateJourney={handleInitiateStateJourney}
          />
        </motion.div>
      )}

      {/* 6. VIEW: INDIA'S LIVING HERITAGE PAGE */}
      {currentView === 'heritage' && (
        <motion.div
          key="heritage-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeritagePage
            onOpenMap={handleBeginJourney}
            onSelectStateJourney={handleInitiateStateJourney}
          />
        </motion.div>
      )}

      {/* 7. VIEW: ABOUT SANSKRITI PAGE */}
      {currentView === 'about' && (
        <motion.div
          key="about-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AboutPage
            onOpenMap={handleBeginJourney}
          />
        </motion.div>
      )}

      {/* 8. VIEW: AUTHENTICATION (LOGIN / SIGNUP) PAGE */}
      {currentView === 'auth' && (
        <motion.div
          key="auth-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AuthPage
            onReturnToLanding={() => setCurrentView('landing')}
            onLoginSuccess={handleBeginJourney}
          />
        </motion.div>
      )}

      {/* 9. VIEW: MASTERPIECE FULLSCREEN VINTAGE INDIA HERITAGE ATLAS */}
      {currentView === 'map' && (
        <motion.div
          key="vintage-india-atlas"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-screen h-screen overflow-hidden"
        >
          <VintageIndiaSvgMap
            onReturnToLanding={handleReturnToLanding}
            onSelectState={(st) => setSelectedState(st)}
            onInitiateStateJourney={handleInitiateStateJourney}
          />
        </motion.div>
      )}

      {/* 10. VIEW: IMMERSIVE CINEMATIC STATE JOURNEY */}
      {currentView === 'state-journey' && (
        <motion.div
          key="state-cinematic-journey"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="relative w-screen h-screen overflow-hidden"
        >
          <StateCinematicJourney
            stateExperience={activeStateExperience}
            onJourneyComplete={handleJourneyComplete}
            onCancelReturnToMap={handleReturnToMap}
          />
        </motion.div>
      )}

      {/* 11. VIEW: STATE HERITAGE ATLAS DESTINATION PAGE */}
      {currentView === 'state-archive' && (
        <motion.div
          key="state-heritage-archive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="relative min-h-screen w-screen overflow-x-hidden"
        >
          <StateHeritageAtlasPage
            stateExperience={activeStateExperience}
            onReturnToMap={handleReturnToMap}
            onReliveJourney={handleReliveJourney}
          />
        </motion.div>
      )}

    </div>
  );
}
