import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import IntroScreen from './intro-screen';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

// Mock the hook
jest.mock('@/hooks/useAudioPlayer', () => ({
  useAudioPlayer: jest.fn(),
}));

// Mock framer-motion
jest.mock('framer-motion', () => {
    const React = require('react');
    const { forwardRef } = React;
    const motion = {
        div: forwardRef((props, ref) => <div ref={ref} {...props} />),
        button: forwardRef((props, ref) => <button ref={ref} {...props} />),
        h1: forwardRef((props, ref) => <h1 ref={ref} {...props} />),
        p: forwardRef((props, ref) => <p ref={ref} {...props} />),
        span: forwardRef((props, ref) => <span ref={ref} {...props} />),
        img: forwardRef((props, ref) => <img ref={ref} {...props} />),
    };
    return {
        motion,
        AnimatePresence: ({ children }) => <>{children}</>,
    };
});

describe('IntroScreen', () => {
  const mockToggleMute = jest.fn();
  const mockPlayMusic = jest.fn();
  const mockOnComplete = jest.fn();

  beforeEach(() => {
    (useAudioPlayer as jest.Mock).mockReturnValue({
      isMuted: false,
      toggleMute: mockToggleMute,
      playMusic: mockPlayMusic,
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders the start screen initially', () => {
    render(<IntroScreen onComplete={mockOnComplete} />);
    expect(screen.getByText(/IF YOU PRESS THIS BUTTON/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /YOUR BODY GETS TRANSFORMED/i })).toBeInTheDocument();
  });

  it('calls playMusic and transitions to loading screen on button click', () => {
    render(<IntroScreen onComplete={mockOnComplete} />);
    const startButton = screen.getByRole('button', { name: /YOUR BODY GETS TRANSFORMED/i });
    fireEvent.click(startButton);

    expect(mockPlayMusic).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/FORGING ALPHAS/i)).toBeInTheDocument();
    expect(screen.getByText(/PREPARING YOUR TRANSFORMATION/i)).toBeInTheDocument();
  });

  it('calls toggleMute when mute button is clicked', () => {
    render(<IntroScreen onComplete={mockOnComplete} />);
    const muteButton = screen.getByLabelText(/Mute/i);
    fireEvent.click(muteButton);
    expect(mockToggleMute).toHaveBeenCalledTimes(1);
  });

  it('calls onComplete after loading finishes', async () => {
    render(<IntroScreen onComplete={mockOnComplete} />);
    const startButton = screen.getByRole('button', { name: /YOUR BODY GETS TRANSFORMED/i });
    fireEvent.click(startButton);

    // Fast-forward timers to complete the loading progress
    act(() => {
        jest.advanceTimersByTime(40 * 100 + 1000 + 1200);
    });
    
    await waitFor(() => {
        expect(mockOnComplete).toHaveBeenCalledTimes(1);
    });
  });
});
