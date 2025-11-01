import { render, screen, fireEvent } from '@testing-library/react';
import GallerySection from './gallery-section';

describe('GallerySection', () => {
  it('renders the gallery title and all gallery items', () => {
    render(<GallerySection />);
    expect(screen.getByText('Gallery')).toBeInTheDocument();
    // There are 6 images in the gallery
    const galleryImages = screen.getAllByRole('img');
    expect(galleryImages.length).toBe(6);
    // Check for a specific item title
    expect(screen.getByText('Strength Training')).toBeInTheDocument();
  });

  it('opens the lightbox with the correct image when an item is clicked', () => {
    render(<GallerySection />);
    const firstItem = screen.getByText('Strength Training');
    
    // Before click, no lightbox
    expect(screen.queryByLabelText('Close lightbox')).not.toBeInTheDocument();

    fireEvent.click(firstItem);

    // After click, lightbox is visible
    expect(screen.getByLabelText('Close lightbox')).toBeInTheDocument();
    
    // The lightbox image is now visible. It's the 7th image in the DOM.
    const allImages = screen.getAllByRole('img');
    const lightboxImage = allImages[allImages.length - 1];
    expect(lightboxImage).toBeVisible();
    // Check if it has the correct alt text (or src)
    expect(lightboxImage).toHaveAttribute('alt', 'Gallery');
  });

  it('closes the lightbox when the close button is clicked', () => {
    render(<GallerySection />);
    const firstItem = screen.getByText('Strength Training');
    fireEvent.click(firstItem); // Open the lightbox

    // Ensure lightbox is open
    const closeButton = screen.getByLabelText('Close lightbox');
    expect(closeButton).toBeInTheDocument();

    // Click the close button
    fireEvent.click(closeButton);

    // Now the lightbox should be gone
    expect(screen.queryByLabelText('Close lightbox')).not.toBeInTheDocument();
  });
});
