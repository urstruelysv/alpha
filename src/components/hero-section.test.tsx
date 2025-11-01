
import { render, screen } from '@testing-library/react';
import HeroSection from './hero-section';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
  },
}));

describe('HeroSection', () => {
  it('renders the background video with correct attributes', () => {
    const { container } = render(<HeroSection />);
    const videoElement = container.querySelector('video');
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute('autoPlay');
    expect(videoElement).toHaveAttribute('loop');
    expect(videoElement).toHaveAttribute('muted');
    expect(videoElement).toHaveAttribute('playsInline');

    const sourceElement = container.querySelector('source');
    expect(sourceElement).toBeInTheDocument();
    expect(sourceElement).toHaveAttribute('src', '/gym%20final.MP4');
    expect(sourceElement).toHaveAttribute('type', 'video/mp4');
  });

  it('renders the main heading and subheading', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Alpha Fitness/i)).toBeInTheDocument();
    expect(screen.getByText(/Shadnagar's biggest premium Gym/i)).toBeInTheDocument();
  });

  it('renders the call-to-action buttons', () => {
    render(<HeroSection />);
    expect(screen.getByRole('button', { name: /Start Free Trial/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View Packages/i })).toBeInTheDocument();
  });

  it('renders the stats section', () => {
    render(<HeroSection />);
    expect(screen.getByText(/Active Members/i)).toBeInTheDocument();
    expect(screen.getByText(/Expert Trainers/i)).toBeInTheDocument();
    expect(screen.getByText(/Access/i)).toBeInTheDocument();
  });
});
