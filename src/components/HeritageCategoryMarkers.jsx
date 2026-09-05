import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Illustrated Heritage Category Markers
 * Placed inside states, away from state labels.
 * Toggled via Atlas Legend.
 */
export default function HeritageCategoryMarkers({ activeCategories, onMarkerClick }) {
  const [hoveredMarker, setHoveredMarker] = useState(null);

  const markers = [
    // --- 1. TEMPLES ---
    { id: 't1', category: 'temple', name: 'Kedarnath Sanctum', state: 'Uttarakhand', x: 415, y: 320 },
    { id: 't2', category: 'temple', name: 'Kashi Vishwanath', state: 'Uttar Pradesh', x: 495, y: 450 },
    { id: 't3', category: 'temple', name: 'Somnath Coastal Shrine', state: 'Gujarat', x: 200, y: 575 },
    { id: 't4', category: 'temple', name: 'Khajuraho Shikhara', state: 'Madhya Pradesh', x: 430, y: 505 },
    { id: 't5', category: 'temple', name: 'Puri Jagannath Temple', state: 'Odisha', x: 565, y: 620 },
    { id: 't6', category: 'temple', name: 'Brihadeeswara Gopuram', state: 'Tamil Nadu', x: 395, y: 870 },
    { id: 't7', category: 'temple', name: 'Tirupati Venkateswara', state: 'Andhra Pradesh', x: 415, y: 735 },
    { id: 't8', category: 'temple', name: 'Kamakhya Nilachal', state: 'Assam', x: 745, y: 470 },

    // --- 2. FOLK ARTS ---
    { id: 'f1', category: 'folkArts', name: 'Saang & Dhamal', state: 'Haryana', x: 330, y: 390 },
    { id: 'f2', category: 'folkArts', name: 'Ghoomar & Kalbelia', state: 'Rajasthan', x: 250, y: 465 },
    { id: 'f3', category: 'folkArts', name: 'Garba & Bhavai', state: 'Gujarat', x: 255, y: 560 },
    { id: 'f4', category: 'folkArts', name: 'Classical Kathak', state: 'Uttar Pradesh', x: 475, y: 415 },
    { id: 'f5', category: 'folkArts', name: 'Warli Painting', state: 'Maharashtra', x: 305, y: 615 },
    { id: 'f6', category: 'folkArts', name: 'Classical Odissi', state: 'Odisha', x: 520, y: 585 },
    { id: 'f7', category: 'folkArts', name: 'Yakshagana Theatre', state: 'Karnataka', x: 330, y: 715 },
    { id: 'f8', category: 'folkArts', name: 'Bharatanatyam', state: 'Tamil Nadu', x: 415, y: 825 },
    { id: 'f9', category: 'folkArts', name: 'Kathakali Dance-Drama', state: 'Kerala', x: 340, y: 880 },
    { id: 'f10', category: 'folkArts', name: 'Bihu Folk Rhythms', state: 'Assam', x: 760, y: 440 },

    // --- 3. LITERATURE ---
    { id: 'l1', category: 'literature', name: 'Kalidasa (Meghaduta)', state: 'Madhya Pradesh', x: 370, y: 540 },
    { id: 'l2', category: 'literature', name: 'Tulsidas (Ramcharitmanas)', state: 'Uttar Pradesh', x: 435, y: 460 },
    { id: 'l3', category: 'literature', name: 'Rabindranath Tagore', state: 'West Bengal', x: 610, y: 540 },
    { id: 'l4', category: 'literature', name: 'Tirukkural of Valluvar', state: 'Tamil Nadu', x: 380, y: 885 },
    { id: 'l5', category: 'literature', name: 'Basavanna Vachanas', state: 'Karnataka', x: 360, y: 765 },

    // --- 4. SCRIPTURES ---
    { id: 's1', category: 'scriptures', name: 'Bhagavad Gita (Kurukshetra)', state: 'Haryana', x: 355, y: 360 },
    { id: 's2', category: 'scriptures', name: 'Upanishadic Dialogues', state: 'Uttar Pradesh', x: 470, y: 445 },
    { id: 's3', category: 'scriptures', name: 'Sangam Tamil Canons', state: 'Tamil Nadu', x: 410, y: 860 },
    { id: 's4', category: 'scriptures', name: 'Rigvedic Saraswati Hymns', state: 'Punjab', x: 320, y: 310 },

    // --- 5. KEY PERSONS ---
    { id: 'k1', category: 'keyPersons', name: 'Sri Krishna & Arjuna', state: 'Haryana', x: 345, y: 355 },
    { id: 'k2', category: 'keyPersons', name: 'Gautama Buddha (Bodh Gaya)', state: 'Bihar', x: 575, y: 485 },
    { id: 'k3', category: 'keyPersons', name: 'Adi Shankaracharya', state: 'Kerala', x: 350, y: 835 },
    { id: 'k4', category: 'keyPersons', name: 'Chhatrapati Shivaji Maharaj', state: 'Maharashtra', x: 325, y: 655 },
    { id: 'k5', category: 'keyPersons', name: 'Guru Nanak Dev', state: 'Punjab', x: 335, y: 340 },
  ];

  const visibleMarkers = markers.filter((m) => activeCategories.has(m.category));

  return (
    <g id="heritage-category-markers-layer">
      {visibleMarkers.map((marker) => {
        const isHovered = hoveredMarker?.id === marker.id;

        return (
          <g
            key={marker.id}
            transform={`translate(${marker.x}, ${marker.y})`}
            className="cursor-pointer transition-transform duration-200"
            onMouseEnter={() => setHoveredMarker(marker)}
            onMouseLeave={() => setHoveredMarker(null)}
            onClick={() => onMarkerClick && onMarkerClick(marker)}
          >
            {/* Subtle Pulse */}
            <circle
              cx="0"
              cy="0"
              r={isHovered ? "9" : "6"}
              fill="rgba(212, 175, 55, 0.3)"
              className="animate-ping"
              style={{ animationDuration: '3.2s' }}
            />

            {/* Marker Icon Rendering */}
            {marker.category === 'temple' && (
              <g transform="translate(-5, -6) scale(0.55)">
                <polygon points="9,0 3,8 15,8" fill="#d4af37" stroke="#3b2314" strokeWidth="1" />
                <rect x="5" y="8" width="8" height="8" fill="#f8eed9" stroke="#3b2314" strokeWidth="0.8" />
                <path d="M 7,16 L 7,12 Q 9,10 11,12 L 11,16 Z" fill="#3b2314" />
              </g>
            )}

            {marker.category === 'folkArts' && (
              <g transform="translate(-4, -6) scale(0.55)">
                <circle cx="8" cy="3" r="2" fill="#d4af37" stroke="#3b2314" strokeWidth="0.8" />
                <polygon points="8,5 4,14 12,14" fill="#c2593f" stroke="#3b2314" strokeWidth="0.8" />
                <path d="M 3,8 Q 8,6 13,8" fill="none" stroke="#3b2314" strokeWidth="1" />
              </g>
            )}

            {marker.category === 'literature' && (
              <g transform="translate(-5, -5) scale(0.55)">
                <path d="M 1,4 Q 5,2 9,4 Q 13,2 17,4 L 17,14 Q 13,12 9,14 Q 5,12 1,14 Z" fill="#fffcf4" stroke="#3b2314" strokeWidth="0.9" />
                <line x1="9" y1="4" x2="9" y2="14" stroke="#8a2e22" strokeWidth="1" />
              </g>
            )}

            {marker.category === 'scriptures' && (
              <g transform="translate(-5, -5) scale(0.55)">
                <rect x="3" y="2" width="12" height="14" rx="1" fill="#fef5dd" stroke="#3b2314" strokeWidth="0.9" />
                <circle cx="9" cy="9" r="2.5" fill="#8a2e22" />
                <circle cx="9" cy="9" r="1" fill="#ffd27d" />
              </g>
            )}

            {marker.category === 'keyPersons' && (
              <g transform="translate(-4, -6) scale(0.55)">
                <circle cx="8" cy="3" r="2" fill="#d4af37" stroke="#3b2314" strokeWidth="0.8" />
                <polygon points="8,5 5,13 11,13" fill="#4a2e1b" stroke="#3b2314" strokeWidth="0.8" />
                <circle cx="8" cy="1" r="1" fill="#8a2e22" />
              </g>
            )}

            {/* Hover Tooltip Callout */}
            {isHovered && (
              <g transform="translate(0, -12)" className="pointer-events-none">
                <rect
                  x="-60"
                  y="-18"
                  width="120"
                  height="18"
                  rx="2"
                  fill="#fcf6e8"
                  stroke="#4A2F1C"
                  strokeWidth="1"
                  className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                />
                <polygon points="0,0 -3,-3 3,-3" fill="#fcf6e8" stroke="#4A2F1C" strokeWidth="1" />
                <text
                  x="0"
                  y="-6"
                  textAnchor="middle"
                  fontFamily="Cinzel, Georgia, serif"
                  fontSize="7.5"
                  fontWeight="bold"
                  fill="#4A2F1C"
                  letterSpacing="0.6"
                >
                  {marker.name}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}
