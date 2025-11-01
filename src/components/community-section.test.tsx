import { render, screen } from '@testing-library/react';
import CommunitySection from './community-section';

describe('CommunitySection', () => {
  it('renders the section title and subtitle', () => {
    render(<CommunitySection />);
    expect(screen.getByText('Join the Alpha Community')).toBeInTheDocument();
    expect(screen.getByText(/Be part of a supportive community of fitness enthusiasts/i)).toBeInTheDocument();
  });

  it('renders all community event cards', () => {
    render(<CommunitySection />);
    // There are 4 events defined in the component
    expect(screen.getAllByRole('heading', { level: 3 }).length).toBe(4);
    expect(screen.getByText('Monthly Fitness Challenge')).toBeInTheDocument();
    expect(screen.getByText('Group Yoga Sessions')).toBeInTheDocument();
    expect(screen.getByText('Community Workout')).toBeInTheDocument();
    expect(screen.getByText('Nutrition Workshops')).toBeInTheDocument();
  });

  it('renders event details correctly for each card', () => {
    render(<CommunitySection />);
    // Check details for the first event
    expect(screen.getByText('Every 1st Saturday')).toBeInTheDocument();
    expect(screen.getByText('150+ members')).toBeInTheDocument();
    
    // Check details for another event
    expect(screen.getByText('Weekdays 6 AM')).toBeInTheDocument();
    expect(screen.getByText('80+ members')).toBeInTheDocument();
  });
});
