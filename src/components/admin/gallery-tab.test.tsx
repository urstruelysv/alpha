import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import GalleryTab from './gallery-tab';
import '@testing-library/jest-dom';

const mockImages = [
  { id: '1', url: '/image1.jpg', alt: 'Image 1' },
  { id: '2', url: '/image2.jpg', alt: 'Image 2' },
];

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url === '/api/admin/gallery') {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockImages),
      });
    }
    if (String(url).startsWith('/api/admin/gallery?id=')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      });
    }
    return Promise.resolve({ ok: false, status: 404 });
  }) as jest.Mock;
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('GalleryTab', () => {
  it('renders the gallery management title', () => {
    render(<GalleryTab />);
    expect(screen.getByText('Manage Gallery')).toBeInTheDocument();
  });

  it('renders the upload UI', () => {
    render(<GalleryTab />);
    expect(screen.getByText(/Upload images/i)).toBeInTheDocument();
  });

  it('fetches and renders existing gallery images', async () => {
    render(<GalleryTab />);
    
    expect(screen.getByText(/Loading gallery.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(mockImages.length);
    });

    expect(screen.getByAltText('Image 1')).toBeInTheDocument();
    expect(screen.getByAltText('Image 2')).toBeInTheDocument();
  });

  it('deletes an image when the delete button is clicked', async () => {
    render(<GalleryTab />);

    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(mockImages.length);
    });

    // The delete button is visually hidden until hover, but it's in the DOM.
    // We need to find it by its accessible name or role.
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    expect(deleteButtons).toHaveLength(mockImages.length);

    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByAltText('Image 1')).not.toBeInTheDocument();
    });

    expect(screen.getAllByRole('img')).toHaveLength(mockImages.length - 1);
  });
});