/**
 * SANSKRITI GLOBAL HERITAGE AUDIO ARCHITECTURE
 * 
 * Centralized persistent singleton audio manager initialized at application root.
 * 
 * AUDIO ARCHITECTURE SPECIFICATION:
 * 
 * 1. BASE LAYER (ALWAYS ON ACROSS ENTIRE WEBSITE):
 *    - Flute (/audio/flute.mp3) -> continuous loop (volume: 0.18, 15–20%)
 *    - Birds (/audio/birds.mp3) -> continuous loop (volume: 0.05, 4–7%)
 *    - NEVER pause, stop, restart, or fade out when navigating or entering temples.
 *    - Unbroken, soothing musical identity of Sanskriti.
 * 
 * 2. TEMPLE LAYER (DYNAMIC AMBIENT LAYERS):
 *    - Temple Ambience (/audio/temple ambience.mp3) -> loop softly (volume: 0.10, 8–12%)
 *    - Diya crackle (/audio/diya.mp3) -> ambient loop (volume: 0.04, 3–5%)
 *    - Added ON TOP of the flute and birds when inside temple, explore more, or research.
 * 
 * 3. RITUAL EVENTS (ONE-SHOT SACRED ACCENTS):
 *    - Deep Temple Bell (/audio/deep temple bell.mp3) -> one-shot (volume: 0.30)
 *    - Shankh (/audio/Shankh.mp3) -> one-shot (volume: 0.20)
 *    - Pooja Bell (/audio/pooja temple bell.mp3) -> one-shot on ritual interaction (volume: 0.18)
 * 
 * 4. AUTOPLAY & PERSISTENCE:
 *    - Immediate playback attempt on load & refresh.
 *    - Single persistent Audio instances; no recreated objects on React re-renders.
 *    - User preference stored in localStorage key: "audio-enabled".
 */

const STORAGE_KEY_ENABLED = 'audio-enabled';
const STORAGE_KEY_VOLUME = 'sanskriti_audio_volume';

const SOUND_PATHS = {
  flute: '/audio/flute.mp3',
  birds: '/audio/birds.mp3',
  templeAmbience: encodeURI('/audio/temple ambience.mp3'),
  diya: '/audio/diya.mp3',
  deepBell: encodeURI('/audio/deep temple bell.mp3'),
  shankh: encodeURI('/audio/Shankh.mp3'),
  poojaBell: encodeURI('/audio/pooja temple bell.mp3'),
};

class GlobalHeritageAudioManager {
  constructor() {
    this.isInitialized = false;
    this.isMuted = false;
    this.isPlaying = false;
    this.masterVolume = 1.0;
    this.currentMode = 'general'; // 'general' | 'temple' | 'explore-more' | 'research'
    this.inTemple = false;
    this.listeners = new Set();

    // Persistent Audio Elements
    this.tracks = {};

    // Current ramped volumes
    this.trackVolumes = {
      flute: 0.18,
      birds: 0.05,
      templeAmbience: 0,
      diya: 0,
    };

    // Target volumes:
    // Base layer (flute 0.18, birds 0.05) is ALWAYS active across all pages & temple experiences
    this.targetVolumes = {
      flute: 0.18,
      birds: 0.05,
      templeAmbience: 0,
      diya: 0,
    };

    if (typeof window !== 'undefined') {
      // Clean legacy storage keys
      try {
        localStorage.removeItem('templeAudioMuted');
        localStorage.removeItem('sanskriti_audio_muted');
        localStorage.removeItem('sanskriti_user_explicit_mute');
      } catch (e) {}

      // Read "audio-enabled" preference (Default: ENABLED / true)
      const savedEnabled = localStorage.getItem(STORAGE_KEY_ENABLED);
      if (savedEnabled !== null) {
        this.isMuted = savedEnabled === 'false';
      } else {
        this.isMuted = false;
        try {
          localStorage.setItem(STORAGE_KEY_ENABLED, 'true');
        } catch (e) {}
      }

      const savedVol = localStorage.getItem(STORAGE_KEY_VOLUME);
      if (savedVol !== null) {
        const parsed = parseFloat(savedVol);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
          this.masterVolume = parsed;
        }
      }

      // 1. Initialize audio element instances immediately
      this.init();

      // 2. Immediately attempt unmuted playback on load & refresh
      this._attemptImmediateStart();

      // 3. Re-attempt on lifecycle events (e.g. pageshow, visibility change, first user gesture)
      this._setupLifecycleListeners();

      // 4. Start smooth volume crossfade loop
      this._startRampLoop();
    }
  }

  /**
   * Root Audio Setup: Single persistent Audio instances for flute, birds, ambience, diya
   */
  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    try {
      // 1. Hook to preloaded DOM flute element or instantiate
      let fluteEl = typeof document !== 'undefined' ? document.getElementById('sanskriti-flute-audio') : null;
      if (!fluteEl) {
        fluteEl = new Audio(SOUND_PATHS.flute);
      }
      fluteEl.loop = true;
      fluteEl.preload = 'auto';
      this.tracks.flute = fluteEl;

      // 2. Hook to preloaded DOM birds element or instantiate
      let birdsEl = typeof document !== 'undefined' ? document.getElementById('sanskriti-birds-audio') : null;
      if (!birdsEl) {
        birdsEl = new Audio(SOUND_PATHS.birds);
      }
      birdsEl.loop = true;
      birdsEl.preload = 'auto';
      this.tracks.birds = birdsEl;

      // Track playback state
      fluteEl.addEventListener('play', () => {
        this.isPlaying = true;
        this._notify();
      });
      fluteEl.addEventListener('pause', () => {
        if (!this.tracks.birds || this.tracks.birds.paused) {
          this.isPlaying = false;
          this._notify();
        }
      });

      // 3. Preload temple ambience
      const ambEl = new Audio(SOUND_PATHS.templeAmbience);
      ambEl.loop = true;
      ambEl.volume = 0;
      ambEl.preload = 'auto';
      this.tracks.templeAmbience = ambEl;

      // 4. Preload subtle diya crackle
      const diyaEl = new Audio(SOUND_PATHS.diya);
      diyaEl.loop = true;
      diyaEl.volume = 0;
      diyaEl.preload = 'auto';
      this.tracks.diya = diyaEl;

      // Apply initial target volumes
      if (!this.isMuted) {
        this.targetVolumes.flute = 0.18;
        this.targetVolumes.birds = 0.05;

        if (this.currentMode === 'temple' || this.currentMode === 'explore-more') {
          this.targetVolumes.templeAmbience = 0.10;
          this.targetVolumes.diya = 0.04;
        } else if (this.currentMode === 'research') {
          this.targetVolumes.templeAmbience = 0.08;
          this.targetVolumes.diya = 0.02;
        } else {
          this.targetVolumes.templeAmbience = 0.0;
          this.targetVolumes.diya = 0.0;
        }
      }

      this._notify();
    } catch (e) {
      console.warn('Audio initialization notice:', e);
    }
  }

  /**
   * Immediate Playback Attempt on Page Load & Refresh:
   * Starts flute + birds right away without waiting for a click.
   */
  _attemptImmediateStart() {
    if (this.isMuted) return;

    ['flute', 'birds'].forEach((key) => {
      const audio = this.tracks[key];
      if (audio) {
        audio.volume = this.targetVolumes[key] * this.masterVolume;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              this.isPlaying = true;
              this.trackVolumes[key] = this.targetVolumes[key];
              this._notify();
            })
            .catch(() => {
              // Silently catch browser autoplay policy if user hasn't interacted yet
            });
        }
      }
    });
  }

  /**
   * Lifecycle & Natural Interaction Listeners:
   * Retries on page show, visibility changes, or first legitimate user gesture.
   */
  _setupLifecycleListeners() {
    const tryResume = () => {
      if (!this.isMuted) {
        ['flute', 'birds'].forEach((key) => {
          const audio = this.tracks[key];
          if (audio && audio.paused && this.targetVolumes[key] > 0) {
            audio.volume = this.targetVolumes[key] * this.masterVolume;
            audio.play().then(() => {
              this.isPlaying = true;
              this._notify();
            }).catch(() => {});
          }
        });

        if (this.inTemple) {
          const amb = this.tracks.templeAmbience;
          if (amb && amb.paused && this.targetVolumes.templeAmbience > 0) {
            amb.play().catch(() => {});
          }
        }
      }
    };

    window.addEventListener('pageshow', tryResume);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        tryResume();
      }
    });

    const onNaturalInteraction = () => {
      tryResume();
      ['click', 'pointerdown', 'keydown', 'touchstart'].forEach((evt) => {
        window.removeEventListener(evt, onNaturalInteraction, true);
      });
    };

    ['click', 'pointerdown', 'keydown', 'touchstart'].forEach((evt) => {
      window.addEventListener(evt, onNaturalInteraction, { capture: true, passive: true });
    });
  }

  /**
   * Smooth Volume Ramp Crossfade Loop (no audio clicks or pops)
   */
  _startRampLoop() {
    const step = () => {
      const isMuted = this.isMuted;
      const master = this.masterVolume;

      ['flute', 'birds', 'templeAmbience', 'diya'].forEach((trackKey) => {
        const target = isMuted ? 0 : (this.targetVolumes[trackKey] || 0) * master;
        const current = this.trackVolumes[trackKey] || 0;
        const diff = target - current;

        // Smooth interpolation rate
        const rate = diff < 0 ? 0.035 : 0.025;

        if (Math.abs(diff) > 0.001) {
          const next = current + diff * rate;
          this.trackVolumes[trackKey] = Math.max(0, Math.min(1, next));
        } else {
          this.trackVolumes[trackKey] = target;
        }

        const audio = this.tracks[trackKey];
        if (audio) {
          const vol = this.trackVolumes[trackKey];
          audio.volume = Math.max(0, Math.min(1, vol));

          if (vol > 0.002) {
            if (audio.paused && !isMuted) {
              audio.play().catch(() => {});
            }
          } else if (vol <= 0.002 && target === 0 && !audio.paused) {
            audio.pause();
          }
        }
      });

      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  // ==========================================================================
  // STATE 1 — GENERAL WEBSITE (Landing, Map, State Selection, Normal Pages)
  // ==========================================================================

  /**
   * Normal Pages / Map / State Selection:
   * Continuous base layer: Flute (0.18) + Birds (0.05).
   * Secondary temple layers fade out smoothly.
   * Flute & Birds are NEVER restarted or interrupted.
   */
  setGeneralWebsite() {
    this.inTemple = false;
    this.currentMode = 'general';

    // 1. BASE LAYER: Always playing
    this.targetVolumes.flute = 0.18;
    this.targetVolumes.birds = 0.05;

    // 2. TEMPLE LAYER: Fades out
    this.targetVolumes.templeAmbience = 0.0;
    this.targetVolumes.diya = 0.0;

    // Ensure base layer is actively playing if not muted
    if (!this.isMuted) {
      ['flute', 'birds'].forEach((key) => {
        const audio = this.tracks[key];
        if (audio && audio.paused) {
          audio.play().catch(() => {});
        }
      });
    }

    this._notify();
  }

  /**
   * Leaving Temple: Restores general website mode (flute + birds continue seamlessly)
   */
  leaveTemple() {
    this.setGeneralWebsite();
  }

  // ==========================================================================
  // STATE 2 — TEMPLE EXPERIENCE (Temple Entry Transition, Temple Page)
  // ==========================================================================

  /**
   * Entering a Specific Temple:
   * 1. FLUTE CONTINUES PLAYING (volume 0.18, NEVER stopped or faded out!).
   * 2. BIRDS CONTINUE PLAYING (volume 0.05, NEVER stopped!).
   * 3. ONE-SHOT deep temple bell (volume 0.30) immediately at 0.0s.
   * 4. ONE-SHOT subtle shankh (volume 0.20) at ~1.8s.
   * 5. TEMPLE LAYER: temple ambience (0.10) + diya (0.04) fade in softly on loop.
   */
  enterTemple(options = {}) {
    this.inTemple = true;
    this.currentMode = 'temple';

    // 1. BASE LAYER: UNTOUCHED & CONTINUOUS
    this.targetVolumes.flute = 0.18;
    this.targetVolumes.birds = 0.05;

    // Ensure flute and birds are playing
    if (!this.isMuted) {
      ['flute', 'birds'].forEach((key) => {
        const audio = this.tracks[key];
        if (audio && audio.paused) {
          audio.play().catch(() => {});
        }
      });
    }

    // 2. ONE-SHOT RITUAL EVENTS
    if (!this.isMuted && !options.skipOneShots) {
      // Deep temple bell strikes once immediately
      this._playOneShot(SOUND_PATHS.deepBell, 0.30);

      // Subtle shankh sounds once as flame ignites (~1.8s)
      setTimeout(() => {
        if (this.inTemple && !this.isMuted) {
          this._playOneShot(SOUND_PATHS.shankh, 0.20);
        }
      }, 1800);
    }

    // 3. TEMPLE LAYER FADES IN SOFTLY
    // Fades in around 4.0s (during Phase 5 Temple Reveal) or immediately if requested
    const delay = options.immediate ? 0 : 4000;
    setTimeout(() => {
      if (this.inTemple) {
        this.targetVolumes.templeAmbience = 0.10;
        this.targetVolumes.diya = 0.04;
        const amb = this.tracks.templeAmbience;
        if (amb && amb.paused && !this.isMuted) {
          amb.play().catch(() => {});
        }
        const diya = this.tracks.diya;
        if (diya && diya.paused && !this.isMuted) {
          diya.play().catch(() => {});
        }
      }
    }, delay);

    this._notify();
  }

  // ==========================================================================
  // STATE 3 — EXPLORE MORE / THE SACRED CHRONICLE
  // ==========================================================================

  /**
   * Explore More / Temple Story:
   * Seamless continuation of:
   * - Flute (0.18)
   * - Birds (0.05)
   * - Temple Ambience (0.10)
   * - Diya (0.04)
   * NO audio restart, NO repeated bells, NO Om Namah Shivaya!
   */
  setExploreMoreMode() {
    this.inTemple = true;
    this.currentMode = 'explore-more';

    this.targetVolumes.flute = 0.18;
    this.targetVolumes.birds = 0.05;
    this.targetVolumes.templeAmbience = 0.10;
    this.targetVolumes.diya = 0.04;

    if (!this.isMuted) {
      ['flute', 'birds', 'templeAmbience', 'diya'].forEach((key) => {
        const audio = this.tracks[key];
        if (audio && audio.paused) {
          audio.play().catch(() => {});
        }
      });
    }

    this._notify();
  }

  // ==========================================================================
  // STATE 4 — RESEARCH / DEEPER INTO THE RECORDS
  // ==========================================================================

  /**
   * Deep Research / Deeper Into The Records:
   * Quiet archival atmosphere with flute + birds continuing:
   * - Flute (0.18)
   * - Birds (0.05)
   * - Temple Ambience (0.08)
   * - Diya (0.02)
   */
  setResearchMode() {
    this.inTemple = true;
    this.currentMode = 'research';

    this.targetVolumes.flute = 0.18;
    this.targetVolumes.birds = 0.05;
    this.targetVolumes.templeAmbience = 0.08;
    this.targetVolumes.diya = 0.02;

    this._notify();
  }

  // ==========================================================================
  // STATE 5 — FOLK ARTS OF HARYANA (Living Culture, Handcraft & Rural Life)
  // ==========================================================================

  /**
   * Folk Arts Experience:
   * Continuous peaceful pastoral soundscape:
   * - Flute (0.18)
   * - Birds (0.05)
   * Temple layers are faded out.
   * NO temple bells, NO shankh, NO ritual temple ambience.
   */
  setFolkArtsMode() {
    this.inTemple = false;
    this.currentMode = 'folk-arts';

    this.targetVolumes.flute = 0.18;
    this.targetVolumes.birds = 0.05;
    this.targetVolumes.templeAmbience = 0.0;
    this.targetVolumes.diya = 0.0;

    if (!this.isMuted) {
      ['flute', 'birds'].forEach((key) => {
        const audio = this.tracks[key];
        if (audio && audio.paused) {
          audio.play().catch(() => {});
        }
      });
    }

    this._notify();
  }

  // ==========================================================================
  // RITUAL SOUND EFFECTS (ONE-SHOTS)
  // ==========================================================================

  /**
   * Traditional brass pooja bell ring on ritual user action
   */
  playPoojaBell(volume = 0.18) {
    this._playOneShot(SOUND_PATHS.poojaBell, volume);
  }

  /**
   * Deep sacred temple bell one-shot
   */
  playDeepBell(volume = 0.30) {
    this._playOneShot(SOUND_PATHS.deepBell, volume);
  }

  /**
   * Sacred Shankh one-shot
   */
  playShankh(volume = 0.20) {
    this._playOneShot(SOUND_PATHS.shankh, volume);
  }

  /**
   * Play one-shot ceremonial sound effect (non-looping)
   */
  _playOneShot(soundSrc, volume = 0.20) {
    if (this.isMuted) return;
    try {
      const audio = new Audio(soundSrc);
      audio.loop = false;
      audio.volume = Math.max(0, Math.min(1, volume * this.masterVolume));
      audio.play().catch(() => {});
    } catch (e) {
      console.warn('One-shot audio notice:', e);
    }
  }

  // Silenced legacy dummy methods
  playSoftBell() {}
  setSarovarMode() {}

  // ==========================================================================
  // CONTROLS & STATE
  // ==========================================================================

  toggleMute() {
    this.setMuted(!this.isMuted);
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_ENABLED, muted ? 'false' : 'true');
      } catch (e) {}
    }

    if (!muted) {
      this.init();
      // Restore appropriate target volumes
      this.targetVolumes.flute = 0.18;
      this.targetVolumes.birds = 0.05;

      if (this.currentMode === 'temple' || this.currentMode === 'explore-more') {
        this.targetVolumes.templeAmbience = 0.10;
        this.targetVolumes.diya = 0.04;
      } else if (this.currentMode === 'research') {
        this.targetVolumes.templeAmbience = 0.08;
        this.targetVolumes.diya = 0.02;
      } else {
        this.targetVolumes.templeAmbience = 0.0;
        this.targetVolumes.diya = 0.0;
      }

      ['flute', 'birds'].forEach((key) => {
        const audio = this.tracks[key];
        if (audio && audio.paused) audio.play().catch(() => {});
      });

      if (this.inTemple) {
        const amb = this.tracks.templeAmbience;
        if (amb && amb.paused) amb.play().catch(() => {});
      }
    }

    this._notify();
  }

  setMasterVolume(vol) {
    const clamped = Math.max(0, Math.min(1, vol));
    this.masterVolume = clamped;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY_VOLUME, String(clamped));
      } catch (e) {}
    }
    this._notify();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback({
      isMuted: this.isMuted,
      isPlaying: this.isPlaying,
      masterVolume: this.masterVolume,
      currentMode: this.currentMode,
      inTemple: this.inTemple,
    });
    return () => this.listeners.delete(callback);
  }

  _notify() {
    const state = {
      isMuted: this.isMuted,
      isPlaying: this.isPlaying,
      masterVolume: this.masterVolume,
      currentMode: this.currentMode,
      inTemple: this.inTemple,
    };
    this.listeners.forEach((cb) => cb(state));
  }
}

// Global Singleton Instance at Application Root
const audioManager = new GlobalHeritageAudioManager();

if (typeof window !== 'undefined') {
  window.audioManager = audioManager;
  window.playTempleChime = () => {};
}

export default audioManager;
