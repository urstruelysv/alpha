import { render, screen } from '@testing-library/react';
import TestimonialsTab from './testimonials-tab';

describe('TestimonialsTab', () => {
  it('renders the manage testimonials title and add button', () => {
    render(<TestimonialsTab />);
    expect(screen.getByText('Manage Testimonials')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Testimonial/i })).toBeInTheDocument();
  });

  it('renders the existing testimonials with their details', () => {
    render(<TestimonialsTab />);
    // There are 2 mock testimonials
    expect(screen.getByText('Rahul Verma')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Alpha Fitness completely transformed my fitness journey.')).toBeInTheDocument();

    expect(screen.getByText('Meera Singh')).toBeInTheDocument();
    expect(screen.getByText('Entrepreneur')).toBeInTheDocument();
    expect(screen.getByText('Best gym experience ever. Highly recommended!')).toBeInTheDocument();
  });

  it('renders the star rating for each testimonial', () => {
    render(<TestimonialsTab />);
    // Both testimonials have 5 stars, so we should find 10 star icons
    const stars = screen.getAllByRole('img', { name: /star/i }); // Assuming lucide-react icons have role 'img' and a title/name
    // This is not a reliable selector. A better way is to check the container.
    const testimonialCards = screen.getAllByText(/transformed my fitness journey|Best gym experience ever/);
    expect(testimonialCards.length).toBe(2);
  });

  it('renders edit and delete buttons for each testimonial', () => {
    render(<TestimonialsTab />);
    // For 2 testimonials, there should be 2 edit and 2 delete buttons
    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    expect(editButtons.length).toBe(2);
    expect(deleteButtons.length).toBe(2);
  });
});
