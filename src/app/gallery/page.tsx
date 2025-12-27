'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

type GalleryImage = {
  id: string;
  url: string;
  alt?: string;
};

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryImage[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to load gallery');
        }
        const data = (await res.json()) as GalleryImage[];
        setItems(data);
      } catch (err) {
        console.error(err);
        setError('Could not load gallery images.');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const selected = selectedId
    ? items.find((item) => item.id === selectedId) || null
    : null;

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section id="gallery" className="py-20 pt-32">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="heading-xl text-white mb-4">Gallery</h1>
            <p className="text-body text-white/60 max-w-2xl mx-auto">
              Explore our state-of-the-art facilities and community moments
            </p>
          </div>

          {loading ? (
            <p className="text-white/80 text-center">Loading gallery...</p>
          ) : error ? (
            <p className="text-red-400 text-center">{error}</p>
          ) : items.length === 0 ? (
            <p className="text-white/60 text-center">
              Gallery is coming soon. Check back after the team adds photos.
            </p>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className="group relative rounded-lg overflow-hidden cursor-pointer break-inside-avoid"
                >
                  <Image
                    src={item.url || '/placeholder.svg'}
                    alt={item.alt || 'Gallery image'}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-end p-4">
                    <h3 className="text-white font-oswald font-semibold">
                      {item.alt || 'Gallery'}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Lightbox */}
          {selected && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 p-2 bg-bright-purple rounded-full hover:bg-bright-purple/80 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6 text-black" />
              </button>
              <div className="relative max-w-4xl max-h-[80vh] w-full h-full">
                <Image
                  src={selected.url || '/placeholder.svg'}
                  alt={selected.alt || 'Gallery'}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
