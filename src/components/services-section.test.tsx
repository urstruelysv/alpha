import { render, screen } from '@testing-library/react';
import ServicesSection from './services-section';

describe('ServicesSection', () => {
  it('renders the section title and subtitle', () => {
    render(<ServicesSection />);
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByText(/Coaching That Actually Works/i)).toBeInTheDocument();
  });

  it('renders all service cards', () => {
    render(<ServicesSection />);
    // There are 4 services defined in the component array + 1 wide card = 5
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(5);
    expect(screen.getByText('Private Personal Training')).toBeInTheDocument();
    expect(screen.getByText('Strength & Performance')).toBeInTheDocument();
    expect(screen.getByText('Body Transformation')).toBeInTheDocument();
    expect(screen.getByText('Nutrition Coaching')).toBeInTheDocument();
    expect(screen.getByText('Explore Every Program')).toBeInTheDocument();
  });

  it('renders videos for Private Personal Training and Strength & Performance', () => {
    render(<ServicesSection />);
    const videos = screen.getAllByTestId('service-video');
    expect(videos.length).toBe(2);
    expect(videos[0]).toHaveAttribute('src', '/one-on-one.MOV');
    expect(videos[1]).toHaveAttribute('src', '/strength-performance.mov');
  });
});
