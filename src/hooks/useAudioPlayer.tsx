'use client';

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playMusic: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudioPlayer = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element on client
    if (!audioRef.current) {
        audioRef.current = new Audio('/bgMusic.mp3');
        audioRef.current.loop = true;
    }
  }, []);

  const toggleMute = () => {
    setIsMuted(prevMuted => {
      const newMuted = !prevMuted;
      if (audioRef.current) {
        audioRef.current.muted = newMuted;
      }
      return newMuted;
    });
  };

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        // Autoplay may be blocked by the browser.
        console.error("Audio play failed:", error);
      });
    }
  };

  const value = {
    isMuted,
    toggleMute,
    playMusic,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};
