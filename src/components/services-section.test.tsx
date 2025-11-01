import { render, screen } from '@testing-library/react';
import ServicesSection from './services-section';

// Mock the AnimatedCard component as its animation is not relevant to this test
jest.mock('./animated-card', () => ({ children }) => <>{children}</>);

describe('ServicesSection', () => {
  it('renders the section title and subtitle', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByText(/Comprehensive fitness solutions designed to help you achieve your goals/i)).toBeInTheDocument();
  });

  it('renders all service cards', () => {
    render(<ServicesSection />);
    // There are 6 services defined in the component
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(6);
    expect(screen.getByText('General Gym')).toBeInTheDocument();
    expect(screen.getByText('Personal Training')).toBeInTheDocument();
    expect(screen.getByText('Group Classes')).toBeInTheDocument();
    expect(screen.getByText("Women's Fitness")).toBeInTheDocument();
    expect(screen.getByText('Nutrition')).toBeInTheDocument();
    expect(screen.getByText('Physiotherapy')).toBeInTheDocument();
  });

  it('renders the descriptions for the services', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Access to state-of-the-art equipment and facilities')).toBeInTheDocument();
    expect(screen.getByText('One-on-one coaching with certified trainers')).toBeInTheDocument();
  });
});
