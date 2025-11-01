import { render, screen } from '@testing-library/react';
import TrainersSection from './trainers-section';

describe('TrainersSection', () => {
  it('renders the section title and subtitle', () => {
    render(<TrainersSection />);
    expect(screen.getByText('Meet Our Expert Trainers')).toBeInTheDocument();
    expect(screen.getByText(/Certified professionals dedicated to helping you achieve your fitness goals/i)).toBeInTheDocument();
  });

  it('renders all trainer cards', () => {
    render(<TrainersSection />);
    // Based on the component's data, there are 2 trainers
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(2);
    expect(screen.getByText('Mahesh_fitness1')).toBeInTheDocument();
    expect(screen.getByText('Uday kumar')).toBeInTheDocument();
  });

  it('renders trainer details correctly', () => {
    render(<TrainersSection />);
    expect(screen.getByText(/Body building , strength training/i)).toBeInTheDocument();
    expect(screen.getByText('NASM, ACE')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Book Session' })[0]).toBeInTheDocument();
  });
});
