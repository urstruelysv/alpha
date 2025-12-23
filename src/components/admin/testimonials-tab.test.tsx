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
    const { container } = render(<TestimonialsTab />);
    // Both testimonials have 5 stars each
    // Check that testimonial cards are rendered (which contain the stars)
    const testimonialCards = screen.getAllByText(/transformed my fitness journey|Best gym experience ever/);
    expect(testimonialCards.length).toBe(2);
    // Verify stars are rendered by checking for Star SVG elements (lucide-react icons render as SVG)
    const starSvgs = container.querySelectorAll('svg.lucide-star');
    expect(starSvgs.length).toBe(10); // 5 stars × 2 testimonials
  });

  it('renders edit and delete buttons for each testimonial', () => {
    const { container } = render(<TestimonialsTab />);
    // For 2 testimonials, there should be 2 edit and 2 delete buttons
    // Edit buttons contain Edit2 icons, delete buttons contain Trash2 icons
    // Find buttons by their icon SVG elements
    const editIcons = container.querySelectorAll('svg.lucide-edit-2');
    const deleteIcons = container.querySelectorAll('svg.lucide-trash-2');
    expect(editIcons.length).toBe(2);
    expect(deleteIcons.length).toBe(2);
    // Verify they are inside buttons
    editIcons.forEach(icon => {
      expect(icon.closest('button')).toBeInTheDocument();
    });
    deleteIcons.forEach(icon => {
      expect(icon.closest('button')).toBeInTheDocument();
    });
  });
});
