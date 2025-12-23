import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
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
    
    // Filter out framer-motion specific props
    const filterMotionProps = (props: any) => {
        const { whileHover, whileTap, animate, transition, exit, initial, ...rest } = props;
        return rest;
    };
    
    const motion = {
        div: forwardRef((props: any, ref: any) => <div ref={ref} {...filterMotionProps(props)} />),
        button: forwardRef((props: any, ref: any) => <button ref={ref} {...filterMotionProps(props)} />),
        h1: forwardRef((props: any, ref: any) => <h1 ref={ref} {...filterMotionProps(props)} />),
        p: forwardRef((props: any, ref: any) => <p ref={ref} {...filterMotionProps(props)} />),
        span: forwardRef((props: any, ref: any) => <span ref={ref} {...filterMotionProps(props)} />),
        img: forwardRef((props: any, ref: any) => <img ref={ref} {...filterMotionProps(props)} />),
    };
    return {
        motion,
        AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
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

    // Progress increments every 40ms from 0 to 100 (100 intervals = 4000ms)
    // Then 1000ms delay before step becomes 'finished'
    // Then 1200ms delay before onComplete is called
    // Total: 4000 + 1000 + 1200 = 6200ms
    // Use runAllTimers to execute all pending timers
    act(() => {
        jest.runAllTimers();
    });
    
    await waitFor(() => {
        expect(mockOnComplete).toHaveBeenCalledTimes(1);
    }, { timeout: 1000 });
  });
});
