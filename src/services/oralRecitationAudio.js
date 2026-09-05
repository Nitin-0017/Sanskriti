/**
 * Oral Recitation Audio Engine
 * Provides an atmospheric harmonic drone, tanpura resonances, and acoustic vocal frequency
 * simulation using the Web Audio API, with real-time waveform analysis data.
 * Also supports seamless playback of a static file at `/audio/haryana_recitation.mp3` if present.
 */

class OralRecitationAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.analyser = null;
    this.droneNodes = [];
    this.subscribers = new Set();
    this.audioElement = null;
    this.useAudioElement = false;
    this.timeUpdateTimer = null;
    this.currentTime = 0;
    this.duration = 42; // seconds of stylized recitation cycle
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback({
      isPlaying: this.isPlaying,
      currentTime: this.currentTime,
      duration: this.duration,
    });
    return () => this.subscribers.delete(callback);
  }

  notify() {
    for (const cb of this.subscribers) {
      cb({
        isPlaying: this.isPlaying,
        currentTime: this.currentTime,
        duration: this.duration,
      });
    }
  }

  async play() {
    this.initContext();
    if (this.isPlaying) return;

    // Check if real audio file exists and works
    if (!this.audioElement) {
      this.audioElement = new Audio('/audio/haryana_recitation.mp3');
      this.audioElement.addEventListener('ended', () => this.pause());
      this.audioElement.addEventListener('timeupdate', () => {
        if (this.useAudioElement) {
          this.currentTime = this.audioElement.currentTime;
          this.duration = this.audioElement.duration || 42;
          this.notify();
        }
      });
    }

    try {
      await this.audioElement.play();
      this.useAudioElement = true;
      this.isPlaying = true;
      this.notify();
      return;
    } catch {
      // Fallback gracefully to Web Audio synthesized heritage acoustic drone
      this.useAudioElement = false;
      this.startSynthesizedRecitation();
    }
  }

  startSynthesizedRecitation() {
    if (!this.ctx) return;
    this.isPlaying = true;
    this.currentTime = 0;

    // Master Analyser Node for the dynamic waveform
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.8;

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.28, this.ctx.currentTime + 1.5);
    masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    // Harmonic Tanpura Frequencies (D fundamental: D2, A2, D3, F#3)
    const freqs = [73.42, 110.0, 146.83, 185.0, 220.0];
    this.droneNodes = [];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle pitch detuning for shimmering acoustic beating
      osc.detune.setValueAtTime((idx - 2) * 4, this.ctx.currentTime);

      // Lowpass warmth filter to emulate wooden resonating chambers
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320 + idx * 80, this.ctx.currentTime);
      filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

      // Slow amplitude oscillation for strumming cycle
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.22 + idx * 0.08, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      lfo.connect(lfoGain);

      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      lfoGain.connect(gain.gain);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc.start();
      lfo.start();

      this.droneNodes.push({ osc, lfo, gain, filter });
    });

    this.masterGainNode = masterGain;

    // Timeline progress simulation
    if (this.timeUpdateTimer) clearInterval(this.timeUpdateTimer);
    this.timeUpdateTimer = setInterval(() => {
      if (!this.isPlaying) return;
      this.currentTime += 0.25;
      if (this.currentTime >= this.duration) {
        this.currentTime = 0;
      }
      this.notify();
    }, 250);

    this.notify();
  }

  pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;

    if (this.useAudioElement && this.audioElement) {
      this.audioElement.pause();
    } else if (this.masterGainNode && this.ctx) {
      this.masterGainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        this.droneNodes.forEach(({ osc, lfo }) => {
          try {
            osc.stop();
            lfo.stop();
          } catch {}
        });
        this.droneNodes = [];
      }, 550);
    }

    if (this.timeUpdateTimer) {
      clearInterval(this.timeUpdateTimer);
      this.timeUpdateTimer = null;
    }

    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  getWaveformData() {
    if (!this.analyser) {
      // Stylized idle waveform when paused
      return new Uint8Array(64).fill(128);
    }
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteTimeDomainData(dataArray);
    return dataArray;
  }
}

const oralRecitationAudio = new OralRecitationAudioEngine();
export default oralRecitationAudio;
