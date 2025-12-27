import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeroSection from './hero-section';
import '@testing-library/jest-dom';

// Mock framer-motion to render the underlying elements without animation
// and filter out motion-specific props to avoid React warnings.
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  
  const motion = (Component: React.ElementType) => {
    const MockComponent = ({ children, ...props }: Record<string, unknown> & { children?: React.ReactNode }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { variants, initial, animate, whileInView, viewport, custom, ...restProps } = props;
      return <Component {...restProps}>{children}</Component>;
    };
    MockComponent.displayName = `MockMotion${Component}`;
    return MockComponent;
  };

  const proxy = new Proxy(motion, {
    get: (target, prop) => {
      return motion(prop as React.ElementType);
    },
  });

  return {
    ...actual,
    motion: proxy,
  };
});

describe('HeroSection', () => {
  it('renders the main heading and subheading', () => {
    render(<HeroSection />);
    expect(screen.getByText(/WE ARE/i)).toBeInTheDocument();
    expect(screen.getByText(/alpha/i)).toBeInTheDocument();
    expect(screen.getByText(/A fitness movement in/i)).toBeInTheDocument();
  });

  it('renders the call-to-action button', () => {
    render(<HeroSection />);
    expect(screen.getByRole('button', { name: /EXPLORE MEMBERSHIPS/i })).toBeInTheDocument();
  });

  it('scrolls to the pricing section when the CTA button is clicked', () => {
    // Mock scrollIntoView
    const scrollIntoViewMock = jest.fn();
    const mockElement = { scrollIntoView: scrollIntoViewMock };
    jest.spyOn(document, 'getElementById').mockImplementation((id) => {
      if (id === 'pricing') {
        return mockElement as unknown as HTMLElement;
      }
      return null;
    });

    render(<HeroSection />);
    
    const ctaButton = screen.getByRole('button', { name: /EXPLORE MEMBERSHIPS/i });
    fireEvent.click(ctaButton);

    expect(document.getElementById).toHaveBeenCalledWith('pricing');
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
