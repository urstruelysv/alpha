import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PricingSection from './pricing-section';
import '@testing-library/jest-dom';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  const motion = {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  };
  const proxy = new Proxy(motion, {
    get: (target, prop) => {
      if (prop in target) return target[prop as keyof typeof motion];
      const Element = prop as React.ElementType;
      return ({ children, ...props }) => <Element {...props}>{children}</Element>;
    },
  });
  return { ...actual, motion: proxy };
});

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: '1', name: 'Monthly', price: '1500', line: 'Test line 1', features: ['Feature 1'], popular: false },
      { id: '2', name: '3 Months', price: '3500', line: 'Test line 2', features: ['Feature 2'], popular: true },
    ]),
  })
) as jest.Mock;

describe('PricingSection', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders loading state initially, then fetches and renders plans', async () => {
    render(<PricingSection />);

    // It should show a loading state first
    expect(screen.getByText(/Loading pricing.../i)).toBeInTheDocument();

    // Then, wait for the plans to be rendered
    await waitFor(() => {
      expect(screen.getByText('Monthly')).toBeInTheDocument();
      expect(screen.getByText('₹1500')).toBeInTheDocument();
    });

    expect(screen.getByText('3 Months')).toBeInTheDocument();
    expect(screen.getByText('₹3500')).toBeInTheDocument();
    
    // The loading text should be gone
    expect(screen.queryByText(/Loading pricing.../i)).not.toBeInTheDocument();
  });

  it('highlights the popular plan', async () => {
    render(<PricingSection />);

    await waitFor(() => {
      expect(screen.getByText('MOST POPULAR')).toBeInTheDocument();
    });
  });

  it('renders the personal training section', async () => {
    render(<PricingSection />);
    // Wait for the main content to load
    await waitFor(() => {
      expect(screen.getByText('One-on-One Personal Training')).toBeInTheDocument();
    });
  });

  it('displays an error message if fetching plans fails', async () => {
    // Override the fetch mock for this specific test
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false, status: 500, statusText: 'Internal Server Error' })
    );

    render(<PricingSection />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch plans/i)).toBeInTheDocument();
    });
  });
});
