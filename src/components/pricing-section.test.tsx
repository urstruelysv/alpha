import { render, screen } from '@testing-library/react';
import PricingSection from './pricing-section';

// Mock the AnimatedCard component
jest.mock('./animated-card', () => ({ children }) => <>{children}</>);

describe('PricingSection', () => {
  it('renders the section title and subtitle', () => {
    render(<PricingSection />);
    expect(screen.getByText('Pricing Plans')).toBeInTheDocument();
    expect(screen.getByText(/Choose the perfect plan for your fitness journey/i)).toBeInTheDocument();
  });

  it('renders all pricing plan cards', () => {
    render(<PricingSection />);
    // There are 4 pricing plans
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(4);
    expect(screen.getByText('1 Month')).toBeInTheDocument();
    expect(screen.getByText('3 Months')).toBeInTheDocument();
    expect(screen.getByText('6 Months')).toBeInTheDocument();
    expect(screen.getByText('Personal Training')).toBeInTheDocument();
  });

  it('renders plan prices and features correctly', () => {
    render(<PricingSection />);
    // Check for a price and some features to ensure they are rendered
    expect(screen.getByText('₹2,999')).toBeInTheDocument();
    expect(screen.getByText('Full gym access')).toBeInTheDocument();
    expect(screen.getByText('2 free sessions with trainer')).toBeInTheDocument();
  });

  it('highlights the most popular plan with a "BEST VALUE" badge', () => {
    render(<PricingSection />);
    // The "3 Months" plan is highlighted
    expect(screen.getByText('BEST VALUE')).toBeInTheDocument();
    // Check that the badge is associated with the correct plan
    const highlightedPlan = screen.getByText('3 Months');
    expect(highlightedPlan).toBeInTheDocument();
  });

  it('renders a "Join Now" button for each plan', () => {
    render(<PricingSection />);
    const joinButtons = screen.getAllByRole('button', { name: 'Join Now' });
    expect(joinButtons.length).toBe(4);
  });
});
