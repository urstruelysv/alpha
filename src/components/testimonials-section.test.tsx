import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import TestimonialsSection from './testimonials-section';

describe('TestimonialsSection', () => {
  beforeEach(() => {
    // Use fake timers to control setInterval for autoplay
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Restore real timers
    jest.useRealTimers();
  });

  it('renders the first testimonial by default', () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('Rahul Verma')).toBeInTheDocument();
    expect(screen.getByText(/Alpha Fitness completely transformed my fitness journey/i)).toBeInTheDocument();
  });

  it('navigates to the next testimonial when the next button is clicked', () => {
    render(<TestimonialsSection />);
    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);
    expect(screen.getByText('Meera Singh')).toBeInTheDocument();
  });

  it('navigates to the previous testimonial when the previous button is clicked', () => {
    render(<TestimonialsSection />);
    const prevButton = screen.getByLabelText('Previous testimonial');
    fireEvent.click(prevButton);
    // It should wrap around to the last testimonial
    expect(screen.getByText('Kavya Sharma')).toBeInTheDocument();
  });

  it('navigates to a specific testimonial when a dot is clicked', () => {
    render(<TestimonialsSection />);
    const thirdDot = screen.getByLabelText('Go to testimonial 3');
    fireEvent.click(thirdDot);
    expect(screen.getByText('Aditya Patel')).toBeInTheDocument();
  });

  it('autoplays to the next testimonial after 5 seconds', async () => {
    render(<TestimonialsSection />);
    expect(screen.getByText('Rahul Verma')).toBeInTheDocument();
    
    // Advance timers by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Wait for the state update and re-render
    await waitFor(() => {
      expect(screen.getByText('Meera Singh')).toBeInTheDocument();
    });
  });

  it('stops autoplaying when a navigation control is clicked', async () => {
    render(<TestimonialsSection />);
    const nextButton = screen.getByLabelText('Next testimonial');
    fireEvent.click(nextButton);
    expect(screen.getByText('Meera Singh')).toBeInTheDocument();

    // Advance timers by 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // The testimonial should still be the one we navigated to, not the next one in sequence
    await waitFor(() => {
      expect(screen.getByText('Meera Singh')).toBeInTheDocument();
      expect(screen.queryByText('Aditya Patel')).not.toBeInTheDocument();
    });
  });
});
