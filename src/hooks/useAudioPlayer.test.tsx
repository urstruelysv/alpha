import { renderHook, act } from '@testing-library/react';
import { AudioProvider, useAudioPlayer } from '../hooks/useAudioPlayer';
import React from 'react';

describe('useAudioPlayer Hook', () => {
  const mockPlay = jest.fn(() => Promise.resolve());
  const mockPause = jest.fn();
  let audioInstance: HTMLAudioElement | null = null;

  beforeAll(() => {
    const originalAudio = window.Audio;
    window.Audio = jest.fn(src => {
        const audio = new originalAudio(src);
        audio.play = mockPlay;
        audio.pause = mockPause;
        audioInstance = audio;
        return audio;
    }) as any;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => <AudioProvider>{children}</AudioProvider>;

  it('initializes with muted as false', () => {
    const { result } = renderHook(() => useAudioPlayer(), { wrapper });
    expect(result.current.isMuted).toBe(false);
  });

  it('toggles the muted state and audio element property', () => {
    const { result } = renderHook(() => useAudioPlayer(), { wrapper });

    act(() => {
      result.current.toggleMute();
    });
    expect(result.current.isMuted).toBe(true);
    if (audioInstance) {
        expect(audioInstance.muted).toBe(true);
    }

    act(() => {
      result.current.toggleMute();
    });
    expect(result.current.isMuted).toBe(false);
    if (audioInstance) {
        expect(audioInstance.muted).toBe(false);
    }
  });

  it('calls play on the audio element when playMusic is called', () => {
    const { result } = renderHook(() => useAudioPlayer(), { wrapper });

    act(() => {
      result.current.playMusic();
    });

    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it('throws an error if used outside of AudioProvider', () => {
    const originalError = console.error;
    console.error = jest.fn();
    
    expect(() => renderHook(() => useAudioPlayer())).toThrow('useAudioPlayer must be used within an AudioProvider');

    console.error = originalError;
  });
});
