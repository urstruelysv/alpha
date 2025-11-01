import { render, screen } from '@testing-library/react';
import WomensSection from './womens-section';

describe('WomensSection', () => {
  it('renders the main heading and description', () => {
    render(<WomensSection />);
    expect(screen.getByText('Dedicated Programs for Women')).toBeInTheDocument();
    expect(screen.getByText(/Our women-only fitness programs are designed to create a supportive/i)).toBeInTheDocument();
  });

  it('renders the list of features for the women\'s program', () => {
    render(<WomensSection />);
    expect(screen.getByText('Expert female trainers')).toBeInTheDocument();
    expect(screen.getByText('Women-only training hours')).toBeInTheDocument();
    expect(screen.getByText('Personalized coaching')).toBeInTheDocument();
    expect(screen.getByText('Community support')).toBeInTheDocument();
  });

  it('renders the testimonials from female members', () => {
    render(<WomensSection />);
    expect(screen.getByText('What Our Members Say')).toBeInTheDocument();
    // Check for one of the testimonials
    expect(screen.getByText(/Alpha Fitness transformed my confidence/i)).toBeInTheDocument();
    expect(screen.getByText('Priya')).toBeInTheDocument();
    // Check for all testimonials
    expect(screen.getByText('Anjali')).toBeInTheDocument();
    expect(screen.getByText('Sneha')).toBeInTheDocument();
  });

  it('renders the "Learn More" button', () => {
    render(<WomensSection />);
    expect(screen.getByRole('button', { name: 'Learn More' })).toBeInTheDocument();
  });
});
