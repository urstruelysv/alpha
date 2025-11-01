import { render, screen } from '@testing-library/react';
import GalleryTab from './gallery-tab';

describe('GalleryTab', () => {
  it('renders the gallery management title', () => {
    render(<GalleryTab />);
    expect(screen.getByText('Manage Gallery')).toBeInTheDocument();
  });

  it('renders the drag and drop upload area', () => {
    render(<GalleryTab />);
    expect(screen.getByText(/Drag and drop images here/i)).toBeInTheDocument();
    expect(screen.getByText(/or click to select files/i)).toBeInTheDocument();
  });

  it('renders the grid of existing gallery images', () => {
    render(<GalleryTab />);
    // The component renders 6 placeholder images
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(6);
  });

  it('shows a delete button on hover for each image', () => {
    render(<GalleryTab />);
    // The delete button is present for each image, though it may be visually hidden
    const deleteButtons = screen.getAllByRole('button');
    expect(deleteButtons.length).toBe(6);
  });
});
