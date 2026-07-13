import { render, screen } from '@testing-library/react';
import CommunitySection from './community-section';

describe('CommunitySection', () => {
  it('renders the section title and subtitle', () => {
    render(<CommunitySection />);
    expect(screen.getByText("You're Not Alone Here")).toBeInTheDocument();
    expect(screen.getByText(/Community events. Real people. Real progress./i)).toBeInTheDocument();
  });

  it('renders all community event cards', () => {
    render(<CommunitySection />);
    // There are 4 events
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(4);
    expect(screen.getByText('Fitness Challenge')).toBeInTheDocument();
    expect(screen.getByText('Yoga Sessions')).toBeInTheDocument();
    expect(screen.getByText('Community Workout')).toBeInTheDocument();
    expect(screen.getByText('Nutrition Workshops')).toBeInTheDocument();
  });
});
