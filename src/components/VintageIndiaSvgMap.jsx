import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { REAL_INDIA_STATES, NORTHERN_TERRITORIES } from '../data/realIndiaSvgPaths';
import { STATE_LABEL_CONFIG } from '../data/stateLabelPositions';
import LivingAtmosphereCanvas from './LivingAtmosphereCanvas';
import AtlasLegend from './AtlasLegend';
import BharataVarsaPlaque from './BharataVarsaPlaque';
import VintageCompassRose from './VintageCompassRose';
import HeritageCategoryMarkers from './HeritageCategoryMarkers';
import {
  HimalayanMountains,
  DesertFortAndCamels,
  VedicChariotAndTree,
  UttarPradeshMonuments,
  GujaratHeritage,
  RoyalElephantAndTemple,
  KonarkWheelAndBoat,
  DravidianGopuram,
  KeralaHeritage,
  KarnatakaHampiChariot,
  NortheastHeritage,
  VintageSailingShips,
  SacredRivers
} from './HeritageMapIllustrations';

// Base coordinate system for India SVG Map
const DEFAULT_VIEWBOX = { x: 140, y: 130, w: 730, h: 800 };

/**
 * Calculates the exact geographic/SVG centroid and framed target scale
 * for any clicked Indian State, UT, or Northern Territory.
 * Uses exact path bounding-box midpoints for 100% accurate visual centering.
 */
function calculateStateCameraTarget(region) {
  if (!region) {
    return { cx: 505, cy: 530, scale: 1.0 };
  }

  let cx = region.cx || 505;
  let cy = region.cy || 530;
  let width = 100;
  let height = 100;

  if (region.bounds && Array.isArray(region.bounds) && region.bounds.length === 2) {
    const [[minX, minY], [maxX, maxY]] = region.bounds;
    cx = (minX + maxX) / 2;
    cy = (minY + maxY) / 2;
    width = Math.max(1, maxX - minX);
    height = Math.max(1, maxY - minY);
  }

  // Calculate target zoom scale based on bounding box so the state
  // occupies ~44-52% of the viewport, giving state prominence while framing surrounding context.
  const scaleX = (730 * 0.48) / Math.max(width, 45);
  const scaleY = (800 * 0.48) / Math.max(height, 45);
  // Clamp scale comfortably between 2.8x (for large states like Rajasthan/MP) and 3.9x (for smaller states like Haryana)
  const targetScale = Math.min(Math.max(Math.min(scaleX, scaleY), 2.8), 3.9);

  return { cx, cy, scale: targetScale };
}

/**
 * easeInOutCubic easing curve for smooth cinematic camera acceleration, cruise, and gentle deceleration
 */
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Pure SVG Interactive Royal Indian Heritage Atlas
 * Complete Map of India with:
 * - All 28 States + 8 Union Territories + Northern Territorial Geography
 * - Isolated, independent state-by-state hover with animated antique gold shimmer
 * - Compact, intelligent floating parchment cartographer's tooltip
 * - Seamless full-screen vintage parchment background
 */
export default function VintageIndiaSvgMap({ onReturnToLanding, onSelectState, onInitiateStateJourney }) {
  const [hoveredRegionId, setHoveredRegionId] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isDescentZooming, setIsDescentZooming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorScreenPos, setCursorScreenPos] = useState({ x: 0, y: 0 });
  const [viewBoxStr, setViewBoxStr] = useState("140 130 730 800");

  const svgRef = useRef(null);
  const cameraBoxRef = useRef({ ...DEFAULT_VIEWBOX });
  const animFrameRef = useRef(null);
  const settleTimerRef = useRef(null);

  // Functional Atlas Legend: Active Categories Set (all enabled by default)
  const [activeCategories, setActiveCategories] = useState(
    new Set(['temple', 'folkArts', 'literature', 'scriptures', 'keyPersons'])
  );

  const toggleCategory = (categoryId) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  // Spatial mouse tracking for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handlers for isolated state hover
  const handleStateMouseEnter = (e, region) => {
    e.stopPropagation();
    if (!selectedRegion && !isDescentZooming) {
      setHoveredRegionId(region.id);
      setCursorScreenPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleStateMouseMove = (e, region) => {
    e.stopPropagation();
    if (!selectedRegion && !isDescentZooming) {
      if (hoveredRegionId !== region.id) {
        setHoveredRegionId(region.id);
      }
      setCursorScreenPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleStateMouseLeave = (e) => {
    e.stopPropagation();
    if (!isDescentZooming) {
      setHoveredRegionId(null);
    }
  };

  // Initiates the cinematic camera descent zoom and seamless journey
  const handleBeginStateJourney = (region) => {
    if (window.playTempleChime) window.playTempleChime();
    if (isDescentZooming) return; // Prevent re-triggering during active camera flight

    setIsDescentZooming(true);
    setSelectedRegion(region);
    setHoveredRegionId(null); // Instantly dismiss tooltip to avoid distraction

    if (onSelectState) onSelectState(region);

    // Cancel any active animation frame or timers
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);

    // Compute exact geographic/SVG centroid and optimal framing
    const { cx, cy, scale } = calculateStateCameraTarget(region);
    const targetW = DEFAULT_VIEWBOX.w / scale;
    const targetH = DEFAULT_VIEWBOX.h / scale;
    const targetX = cx - targetW / 2;
    const targetY = cy - targetH / 2;

    const startBox = { ...cameraBoxRef.current };
    const duration = 1100; // 1100ms camera flight (within 900–1400ms target)
    const startTime = performance.now();

    const animateStep = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / duration);
      const ease = easeInOutCubic(progress);

      const curX = startBox.x + (targetX - startBox.x) * ease;
      const curY = startBox.y + (targetY - startBox.y) * ease;
      const curW = startBox.w + (targetW - startBox.w) * ease;
      const curH = startBox.h + (targetH - startBox.h) * ease;

      cameraBoxRef.current = { x: curX, y: curY, w: curW, h: curH };

      if (svgRef.current) {
        svgRef.current.setAttribute(
          'viewBox',
          `${curX.toFixed(2)} ${curY.toFixed(2)} ${curW.toFixed(2)} ${curH.toFixed(2)}`
        );
      }

      if (progress < 1.0) {
        animFrameRef.current = requestAnimationFrame(animateStep);
      } else {
        // Camera has arrived precisely at the state centroid!
        setViewBoxStr(`${targetX.toFixed(2)} ${targetY.toFixed(2)} ${targetW.toFixed(2)} ${targetH.toFixed(2)}`);

        // Peaceful settle period (~250ms) where state rests prominently centered
        // Total sequence time: 1100ms + 250ms = 1350ms (within 900–1400ms requirement)
        settleTimerRef.current = setTimeout(() => {
          if (onInitiateStateJourney) {
            onInitiateStateJourney(region);
          }
        }, 250);
      }
    };

    animFrameRef.current = requestAnimationFrame(animateStep);
  };

  const handleRegionClick = (region) => {
    handleBeginStateJourney(region);
  };

  const handleResetZoom = () => {
    if (window.playTempleChime) window.playTempleChime();
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);

    setSelectedRegion(null);
    setHoveredRegionId(null);

    const startBox = { ...cameraBoxRef.current };
    const targetBox = { ...DEFAULT_VIEWBOX };
    const duration = 750;
    const startTime = performance.now();

    const animateReset = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / duration);
      const ease = easeInOutCubic(progress);

      const curX = startBox.x + (targetBox.x - startBox.x) * ease;
      const curY = startBox.y + (targetBox.y - startBox.y) * ease;
      const curW = startBox.w + (targetBox.w - startBox.w) * ease;
      const curH = startBox.h + (targetBox.h - startBox.h) * ease;

      cameraBoxRef.current = { x: curX, y: curY, w: curW, h: curH };

      if (svgRef.current) {
        svgRef.current.setAttribute(
          'viewBox',
          `${curX.toFixed(2)} ${curY.toFixed(2)} ${curW.toFixed(2)} ${curH.toFixed(2)}`
        );
      }

      if (progress < 1.0) {
        animFrameRef.current = requestAnimationFrame(animateReset);
      } else {
        setIsDescentZooming(false);
        setViewBoxStr("140 130 730 800");
      }
    };

    animFrameRef.current = requestAnimationFrame(animateReset);
  };

  // Clean up animation frame and settle timers on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    };
  }, []);

  // Freeze parallax completely during descent zoom to eliminate any camera shaking or jitter
  const mx = isDescentZooming ? 0 : mousePos.x * 6;
  const my = isDescentZooming ? 0 : mousePos.y * 4;

  // Combined list for tooltip lookups
  const allMapEntities = [...REAL_INDIA_STATES, ...NORTHERN_TERRITORIES];
  const hoveredEntity = allMapEntities.find(s => s.id === hoveredRegionId);

  // Dynamic Intelligent Tooltip Placement
  const getTooltipPositionStyle = () => {
    if (!cursorScreenPos.x && !cursorScreenPos.y) {
      return { opacity: 0 };
    }

    const tooltipWidth = 240;
    const tooltipHeight = 150;
    const gap = 18;
    const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const winHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    // Prefer placing to the right of cursor
    let left = cursorScreenPos.x + gap;
    let top = cursorScreenPos.y - 45;

    // If placing on the right would overflow the right edge of viewport:
    if (left + tooltipWidth > winWidth - 18) {
      // Flip to the left of the cursor
      left = cursorScreenPos.x - tooltipWidth - gap;
    }

    // Ensure left does not overflow the left edge of viewport:
    if (left < 16) {
      left = 16;
    }

    // If placing below would overflow the bottom edge of viewport:
    if (top + tooltipHeight > winHeight - 18) {
      top = winHeight - tooltipHeight - 18;
    }

    // Ensure top does not overflow top of viewport:
    if (top < 16) {
      top = 16;
    }

    return {
      left: `${left}px`,
      top: `${top}px`,
    };
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#180f08] text-[#2a1d13] font-manuscript select-none">

      {/* ========================================================
          LAYER 1: FULL-SCREEN VINTAGE PARCHMENT BACKGROUND
          (assets/map_background.png - Cover, Center, No Repeat)
          ======================================================== */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('/assets/map_background.png')` }}
      />
      {/* Subtle edge vignette for antique depth */}
      <div className="absolute inset-0 parchment-vignette pointer-events-none opacity-60" />

      {/* Living Atmospheric Dust Particles & Soft Sunlight Motes */}
      <LivingAtmosphereCanvas mousePos={mousePos} progress={1} isArrival={true} />

      {/* ========================================================
          LAYER 2 TO 6: PURE SVG COMPLETE INDIA ATLAS
          ViewBox: 140 130 730 800 (Full India, all 36 States/UTs + Northern Geography)
          ======================================================== */}
      <div
        className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: `translate3d(${mx * 0.25}px, ${my * 0.25}px, 0)`,
        }}
      >
        <svg
          ref={svgRef}
          viewBox={viewBoxStr}
          className="w-full h-full max-h-[96vh] max-w-[96vw] drop-shadow-[0_12px_45px_rgba(40,25,15,0.6)]"
          style={{
            pointerEvents: isDescentZooming ? 'none' : 'auto',
          }}
        >
          <defs>
            {/* Antique Golden Ink Border Glow Filter (Applied strictly to individual hovered state path) */}
            <filter id="state-gold-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="3.0" floodColor="#D4A72C" floodOpacity="0.85" />
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#FFE388" floodOpacity="0.95" />
            </filter>

            {/* Antique Pattern for Disputed / Northern Territorial Extent */}
            <pattern id="territory-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#8b6540" strokeWidth="0.75" strokeOpacity="0.35" />
            </pattern>
          </defs>

          {/* =====================================================
              LAYER 2A: OCEAN GRATICULES & SEA TITLES (pointer-events: none)
              ===================================================== */}
          <g stroke="#4A2F1C" strokeWidth="0.5" strokeOpacity="0.22" strokeDasharray="4,4" pointerEvents="none">
            <line x1="120" y1="205" x2="880" y2="205" /> {/* 35° N */}
            <line x1="120" y1="460" x2="880" y2="460" /> {/* 25° N */}
            <line x1="120" y1="715" x2="880" y2="715" /> {/* 15° N */}
            <line x1="120" y1="940" x2="880" y2="940" /> {/* 5° N */}

            <line x1="230" y1="130" x2="230" y2="940" /> {/* 70° E */}
            <line x1="460" y1="130" x2="460" y2="940" /> {/* 80° E */}
            <line x1="690" y1="130" x2="690" y2="940" /> {/* 90° E */}
          </g>

          {/* Coordinate Annotations */}
          <g fontFamily="Marcellus, Georgia, serif" fontSize="9" fill="#4A2F1C" fillOpacity="0.6" pointerEvents="none">
            <text x="145" y="455">25° N — TROPIC OF CANCER</text>
            <text x="145" y="710">15° N — DECCAN PLATEAU</text>
            <text x="235" y="935">70° E</text>
            <text x="465" y="935">80° E</text>
            <text x="695" y="935">90° E</text>
          </g>

          {/* Sea Titles */}
          <g fontFamily="Cinzel Decorative, Georgia, serif" fill="#1b3f4a" fillOpacity="0.75" pointerEvents="none">
            <text x="150" y="750" fontSize="19" letterSpacing="3.5" fontStyle="italic">Arabian Sea</text>
            <text x="170" y="770" fontSize="8.5" fontFamily="Marcellus" letterSpacing="1.8">MARE ARABICUM</text>

            <text x="650" y="750" fontSize="19" letterSpacing="3.5" fontStyle="italic">Bay of Bengal</text>
            <text x="670" y="770" fontSize="8.5" fontFamily="Marcellus" letterSpacing="1.8">SINUS GANGETICUS</text>
          </g>

          {/* Sailing Ships & Whale (pointer-events: none) */}
          <VintageSailingShips x={155} y={640} scale={0.7} />
          <VintageSailingShips x={670} y={640} scale={0.7} />
          <VintageSailingShips x={630} y={850} scale={0.75} isWhale={true} />

          {/* =====================================================
              LAYER 2B: NORTHERN TERRITORIAL GEOGRAPHY (POK & AKSAI CHIN)
              Accurately representing the complete northern geographic extent
              with delicate dashed cartographic boundaries
              ===================================================== */}
          <g id="northern-territorial-layer">
            {NORTHERN_TERRITORIES.map((territory) => {
              const isHovered = hoveredRegionId === territory.id;
              const isSelected = selectedRegion?.id === territory.id;

              return (
                <path
                  key={territory.id}
                  id={`territory-${territory.id}`}
                  data-state={territory.id}
                  data-territory-id={territory.id}
                  className={`territory-path cursor-pointer transition-colors duration-200 ${isHovered ? 'state-path-hovered' : ''}`}
                  d={territory.d}
                  fill={
                    isSelected
                      ? "rgba(215, 166, 58, 0.35)"
                      : isHovered
                        ? "rgba(218, 170, 67, 0.15)"
                        : "url(#territory-hatch)"
                  }
                  stroke={
                    isSelected
                      ? "#D7A63A"
                      : isHovered
                        ? "#D4A72C"
                        : "#6A4E38"
                  }
                  strokeWidth={isHovered ? 2.5 : 1.3}
                  strokeDasharray={isHovered ? "none" : "4,3"}
                  strokeOpacity={isHovered ? 1 : 0.8}
                  filter={isHovered || isSelected ? "url(#state-gold-glow)" : "none"}
                  onMouseEnter={(e) => handleStateMouseEnter(e, territory)}
                  onMouseMove={(e) => handleStateMouseMove(e, territory)}
                  onMouseLeave={handleStateMouseLeave}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRegionClick(territory);
                  }}
                  style={{ pointerEvents: 'all' }}
                />
              );
            })}
          </g>

          {/* =====================================================
              LAYER 2C: PURE SVG INDEPENDENT STATES & UNION TERRITORIES (36 Total)
              Every state and UT is an independent interactive SVG region.
              Hover effect strictly targets ONLY the hovered state/UT boundary.
              Interior remains mostly transparent to let the map parchment shine.
              ===================================================== */}
          <g id="real-india-states-layer">
            {REAL_INDIA_STATES.map((region) => {
              const isHovered = hoveredRegionId === region.id;
              const isSelected = selectedRegion?.id === region.id;
              const isSpecial = region.id === 'haryana';
              const isIslandUT = region.id === 'lakshadweep' || region.id === 'andaman-nicobar';

              return (
                <path
                  key={region.id}
                  id={`india-${region.id}`}
                  data-state={region.id}
                  data-region-id={region.id}
                  className={`${region.type === 'state' ? 'state-path' : 'ut-path'} cursor-pointer transition-colors duration-200 ${isHovered ? 'state-path-hovered' : ''}`}
                  d={region.d}
                  fill={
                    isSelected
                      ? "rgba(215, 166, 58, 0.45)"
                      : isHovered
                        ? "rgba(247, 237, 218, 0.12)"
                        : (isSpecial ? "rgba(245, 230, 195, 0.25)" : "rgba(247, 237, 218, 0.10)")
                  }
                  stroke={
                    isSelected
                      ? "#D7A63A"
                      : isHovered
                        ? (isSpecial ? "#E5A020" : "#D4A72C")
                        : (isSpecial ? "#5c3319" : (region.isUT ? "#402615" : "#4A2F1C"))
                  }
                  strokeWidth={
                    isSelected
                      ? 3.2
                      : isHovered
                        ? 2.8
                        : (isIslandUT ? 2.2 : (isSpecial ? 2.0 : 1.7))
                  }
                  strokeOpacity={isHovered || isSelected ? 1 : 0.95}
                  filter={isHovered || isSelected ? "url(#state-gold-glow)" : "none"}
                  onMouseEnter={(e) => handleStateMouseEnter(e, region)}
                  onMouseMove={(e) => handleStateMouseMove(e, region)}
                  onMouseLeave={handleStateMouseLeave}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRegionClick(region);
                  }}
                  style={{ pointerEvents: 'all' }}
                />
              );
            })}
          </g>

          {/* =====================================================
              LAYER 3: SACRED RIVERS (pointer-events: none)
              ===================================================== */}
          <SacredRivers />

          {/* =====================================================
              LAYER 4: HERITAGE MINIATURE ILLUSTRATIONS (pointer-events: none)
              Small, delicate cartographic annotations tucked inside regions.
              ===================================================== */}
          {/* North: Himalayas */}
          <HimalayanMountains x={340} y={205} scale={0.65} />

          {/* West: Rajasthan Fort & Camels */}
          <DesertFortAndCamels x={240} y={445} scale={0.68} />

          {/* Haryana: Sacred Kurukshetra Chariot & Tree */}
          <VedicChariotAndTree x={355} y={375} scale={0.55} />

          {/* Uttar Pradesh: Taj & Kashi */}
          <UttarPradeshMonuments x={455} y={430} scale={0.65} />

          {/* Gujarat: Torana Gateway */}
          <GujaratHeritage x={215} y={535} scale={0.62} />

          {/* Central India: Royal Elephant & Khajuraho */}
          <RoyalElephantAndTemple x={400} y={515} scale={0.65} />

          {/* East: Odisha Konark Sun Wheel */}
          <KonarkWheelAndBoat x={540} y={600} scale={0.65} />

          {/* Karnataka: Hampi Stone Chariot */}
          <KarnatakaHampiChariot x={345} y={735} scale={0.65} />

          {/* South: Tamil Nadu Dravidian Gopuram */}
          <DravidianGopuram x={395} y={825} scale={0.65} />

          {/* Kerala: Kathakali & Palms */}
          <KeralaHeritage x={345} y={845} scale={0.55} />

          {/* Northeast: Rhino & Tea Hills */}
          <NortheastHeritage x={735} y={440} scale={0.62} />

          {/* =====================================================
              LAYER 5: DYNAMIC HERITAGE CATEGORY MARKERS
              (Toggled via Atlas Legend, sitting inside states)
              ===================================================== */}
          <HeritageCategoryMarkers
            activeCategories={activeCategories}
            onMarkerClick={(marker) => {
              if (window.playTempleChime) window.playTempleChime();
              alert(`Discovered ${marker.name} (${marker.category.toUpperCase()}) in ${marker.state}!`);
            }}
          />

          {/* =====================================================
              LAYER 6: INTELLIGENT NON-OVERLAPPING REGION LABELS
              (Uses STATE_LABEL_CONFIG with leader lines, pointer-events: none)
              ===================================================== */}
          <g id="state-labels-layer" pointerEvents="none">
            {allMapEntities.map((region) => {
              const cfg = STATE_LABEL_CONFIG[region.id];
              if (!cfg) return null;

              const isHovered = hoveredRegionId === region.id;
              const isSelected = selectedRegion?.id === region.id;
              const isSpecial = region.id === 'haryana';
              const isTerritory = region.isDisputed;

              return (
                <g key={`lbl-${region.id}`}>
                  {/* Leader Line for small/island states */}
                  {cfg.leader && (
                    <line
                      x1={cfg.leader.fromX}
                      y1={cfg.leader.fromY}
                      x2={cfg.leader.toX}
                      y2={cfg.leader.toY}
                      stroke="#4A2F1C"
                      strokeWidth="0.8"
                      strokeOpacity="0.75"
                    />
                  )}

                  {/* Clean Serif Label */}
                  <text
                    x={cfg.x}
                    y={cfg.y}
                    textAnchor={cfg.leader && cfg.leader.toX > cfg.leader.fromX ? "start" : "middle"}
                    fontFamily="Cinzel, Georgia, serif"
                    fontSize={cfg.size || (isSpecial ? 12 : 10)}
                    fontWeight={isHovered || isSpecial ? "bold" : "600"}
                    fontStyle={isTerritory ? "italic" : "normal"}
                    letterSpacing="1.2"
                    fill={isHovered || isSelected ? "#6a1b1a" : (isTerritory ? "#5c4331" : "#382012")}
                    className="drop-shadow-[0_1px_2px_rgba(255,255,255,0.92)] uppercase transition-colors"
                  >
                    {cfg.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* ========================================================
          COMPACT ANTIQUE PARCHMENT CARTOGRAPHER'S TOOLTIP
          - 230–250px compact width (replaces oversized modal completely)
          - Dynamically tracks cursor/state with viewport collision detection
          - Authentic aged parchment texture with cartographic hairline frame
          - pointer-events: none (zero obstruction to map interaction)
          ======================================================== */}
      <AnimatePresence>
        {hoveredEntity && !selectedRegion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="fixed z-50 w-56 sm:w-60 rounded-[2px] font-manuscript select-none pointer-events-none text-[#2a170d]"
            style={{
              ...getTooltipPositionStyle(),
              backgroundColor: '#ebdcb8',
              backgroundImage: `
                radial-gradient(ellipse at 50% 50%, #f5ecd9 0%, #ebdcb8 70%, #dfcb9f 100%),
                url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")
              `,
              border: '1.2px solid #754c29',
              boxShadow: `
                0 6px 20px rgba(50, 30, 15, 0.35),
                inset 0 0 14px rgba(115, 75, 35, 0.14),
                inset 0 0 2px rgba(70, 40, 18, 0.25)
              `
            }}
          >
            {/* Antique Inset Double Hairline Frame */}
            <div className="absolute inset-[2.5px] pointer-events-none rounded-[1px] border border-[rgba(120,78,43,0.35)]" />
            <div className="absolute inset-[4.5px] pointer-events-none rounded-[1px] border border-dashed border-[rgba(140,95,55,0.22)]" />

            {/* 4 Antique Brass L-Corner Accents */}
            <div className="absolute top-0.5 left-0.5 w-2 h-2 border-t border-l border-[#754c29] pointer-events-none opacity-85" />
            <div className="absolute top-0.5 right-0.5 w-2 h-2 border-t border-r border-[#754c29] pointer-events-none opacity-85" />
            <div className="absolute bottom-0.5 left-0.5 w-2 h-2 border-b border-l border-[#754c29] pointer-events-none opacity-85" />
            <div className="absolute bottom-0.5 right-0.5 w-2 h-2 border-b border-r border-[#754c29] pointer-events-none opacity-85" />

            {/* Tooltip Content Body */}
            <div className="text-center px-3 py-2.5 relative z-10">
              {/* Region Tag */}
              <span className="text-[7.5px] font-marcellus text-[#8a4e2a] uppercase tracking-widest block mb-0.5">
                {hoveredEntity.isDisputed
                  ? "Territory"
                  : (hoveredEntity.isUT ? "Union Territory" : "Indian State")}
              </span>

              {/* State Name */}
              <h4 className="font-cinzel text-xs sm:text-[12.5px] font-bold tracking-[0.2em] text-[#3e1e12] uppercase leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                {hoveredEntity.name}
              </h4>

              {/* Subtitle / Tagline */}
              <p className="font-marcellus text-[9px] text-[#784d2f] italic tracking-wide mt-0.5 leading-snug">
                {hoveredEntity.tagline}
              </p>

              {/* Fine Cartographic Divider */}
              <div className="my-1.5 flex items-center justify-center gap-1.5 opacity-40">
                <span className="h-[0.5px] w-6 bg-[#754c29]" />
                <span className="text-[5px] text-[#754c29]">❖</span>
                <span className="h-[0.5px] w-6 bg-[#754c29]" />
              </div>

              {/* Minimal Cultural Pillars */}
              <div className="text-[8.5px] font-marcellus text-[#523321] space-y-0.5 leading-tight tracking-tight">
                <p>Temples • Folk Arts • Literature</p>
                <p>Scriptures • Key Persons</p>
              </div>

              {/* Fine Cartographic Divider */}
              <div className="my-1.5 flex items-center justify-center gap-1.5 opacity-40">
                <span className="h-[0.5px] w-6 bg-[#754c29]" />
                <span className="text-[5px] text-[#754c29]">❖</span>
                <span className="h-[0.5px] w-6 bg-[#754c29]" />
              </div>

              {/* Minimal Explore CTA */}
              <div className="flex items-center justify-center gap-1 text-[8.5px] font-cinzel font-bold text-[#8a2e22] tracking-[0.2em] uppercase">
                <span>EXPLORE</span>
                <span className="text-[9px]">→</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          LAYER 7: TOP-LEFT SANSKRITI EMBLEM & RETURN CONTROL
          ======================================================== */}
      <div className="absolute top-5 left-5 sm:left-8 z-30 flex items-center gap-3">
        <div
          onClick={onReturnToLanding}
          className="flex items-center gap-3 px-3.5 py-2 rounded-full border border-[#c5a059]/50 bg-[#1e130b]/85 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.6)] cursor-pointer group hover:bg-[#2c1b10] transition-all"
        >
          <div className="w-7 h-7 rounded-full overflow-hidden border border-[#c5a059] group-hover:scale-110 transition-transform">
            <img src="/assets/sacred_mandala.jpg" alt="Sanskriti Emblem" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] text-[#fff2d1] group-hover:text-[#ffd27d] transition-colors">
              SANSKRITI
            </span>
            <span className="font-marcellus text-[8px] tracking-widest text-[#c5a059] uppercase hidden sm:block">
              Complete Heritage Atlas of India
            </span>
          </div>
        </div>

        <button
          onClick={onReturnToLanding}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#c5a059]/40 bg-[#1e130b]/75 hover:bg-[#2c1b10] text-[#ffd27d] text-xs font-marcellus tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Grand Pathway</span>
        </button>
      </div>

      {/* ========================================================
          LAYER 7: TOP-RIGHT PURE CIRCULAR VINTAGE COMPASS ROSE
          ======================================================== */}
      <div className="absolute top-4 right-4 sm:right-8 z-30">
        <VintageCompassRose mousePos={mousePos} />
      </div>

      {/* ========================================================
          LAYER 7: BOTTOM-LEFT BHARATA VARSA CARTOUCHE PLAQUE
          ======================================================== */}
      <div className="hidden sm:block absolute bottom-6 left-8 z-30">
        <BharataVarsaPlaque />
      </div>

      {/* ========================================================
          LAYER 7: BOTTOM-RIGHT FUNCTIONAL VINTAGE ATLAS LEGEND
          ======================================================== */}
      <div className="hidden sm:block absolute bottom-6 right-8 z-30">
        <AtlasLegend
          activeCategories={activeCategories}
          onToggleCategory={toggleCategory}
        />
      </div>

      {/* ========================================================
          CLICK STATE/UT SPOTLIGHT MODAL & STEP 3 GATEWAY
          (Only shown when a state is intentionally clicked)
          ======================================================== */}
      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="absolute bottom-6 left-6 right-6 sm:left-12 sm:right-12 lg:left-auto lg:right-12 lg:w-[490px] z-50 p-6 rounded-md border-2 border-[#c5a059] bg-[#1a110a]/95 text-[#f7e6c4] shadow-[0_20px_60px_rgba(0,0,0,0.95)] backdrop-blur-md font-manuscript"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#c5a059]/30 pb-3 mb-3">
              <div>
                <span className="text-[10px] font-marcellus tracking-[0.25em] text-[#ffd27d] uppercase">
                  {selectedRegion.isDisputed
                    ? "Territorial Geography Spotlight"
                    : (selectedRegion.isUT ? "Union Territory Heritage Spotlight" : "State Heritage Spotlight")}
                </span>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#fff4d0] tracking-wider">
                  {selectedRegion.name}
                </h2>
                <p className="font-rozha text-xs text-[#d4af37]">
                  {selectedRegion.devanagari} • {selectedRegion.tagline}
                </p>
              </div>

              <button
                onClick={handleResetZoom}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#c5a059]/40 bg-[#2b170f] hover:bg-[#3d2217] text-[#ffd27d] text-xs font-marcellus tracking-wider cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Map</span>
              </button>
            </div>

            {/* Description */}
            <p className="font-manuscript text-xs sm:text-sm text-[#d8c5a4] leading-relaxed italic mb-4">
              "{selectedRegion.desc || selectedRegion.tagline}"
            </p>

            {/* Heritage Highlights Details */}
            <div className="space-y-2 mb-4 text-xs font-manuscript">
              <div className="flex gap-2">
                <span className="font-marcellus text-[#c5a059] uppercase tracking-wider shrink-0">Landmarks:</span>
                <span className="text-[#f7e6c4]">{selectedRegion.monuments}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-marcellus text-[#c5a059] uppercase tracking-wider shrink-0">Folk Arts:</span>
                <span className="text-[#f7e6c4]">{selectedRegion.folkArts}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-marcellus text-[#c5a059] uppercase tracking-wider shrink-0">Scriptures:</span>
                <span className="text-[#f7e6c4]">{selectedRegion.scriptures}</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-[#c5a059]/30">
              <p className="text-[11px] font-manuscript text-[#c5a059] italic">
                {selectedRegion.id === 'haryana'
                  ? "✨ Haryana State Cultural World ready for Step 3."
                  : "✨ Heritage Chapter ready for upcoming exploration."}
              </p>

              <button
                onClick={() => handleBeginStateJourney(selectedRegion)}
                className="btn-antique-journey px-4 py-2 rounded-sm flex items-center gap-2 text-xs font-cinzel font-bold text-[#fff4d0] tracking-wider uppercase cursor-pointer"
              >
                <span>Begin Journey</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#ffd27d]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
