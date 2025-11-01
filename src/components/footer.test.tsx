import { render, screen } from '@testing-library/react';
import Footer from './footer';

// Mock the SocialIcons component to isolate the Footer component for testing
jest.mock('./social-icons', () => () => <div data-testid="social-icons" />);

describe('Footer', () => {
  it('renders the company logo and name', () => {
    render(<Footer />);
    expect(screen.getByText('AF')).toBeInTheDocument();
    expect(screen.getByText('Alpha Fitness')).toBeInTheDocument();
  });

  it('renders all quick navigation links', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Packages' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Gallery' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'FAQ' })).toBeInTheDocument();
  });

  it('renders the contact information correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/Shadnagar, Telangana, India/i)).toBeInTheDocument();
    expect(screen.getByText(/\+91 9876 543 210/i)).toBeInTheDocument();
    expect(screen.getByText(/info @alphafitness.in/i)).toBeInTheDocument();
  });

  it('renders the newsletter subscription form', () => {
    render(<Footer />);
    expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });

  it('renders the copyright notice with the current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year} Aethos vison labs. All Rights Reserved.`)).toBeInTheDocument();
  });

  it('includes the SocialIcons component', () => {
    render(<Footer />);
    expect(screen.getByTestId('social-icons')).toBeInTheDocument();
  });
});
