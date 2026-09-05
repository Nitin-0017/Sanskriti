import React from 'react';
import AudioControl from './AudioControl';

/**
 * AudioAmbiance wrapper connecting to the centralized HeritageAudioManager.
 * Preserves prop interface for existing components while delivering natural audio.
 */
export default function AudioAmbiance({ isMuted, setIsMuted, className = "" }) {
  return <AudioControl className={className} />;
}
