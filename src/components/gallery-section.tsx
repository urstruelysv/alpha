'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

const galleryItems = [
  { id: 1, title: 'Strength Training', image: '/placeholder.svg?height=300&width=300' },
  { id: 2, title: 'Group Classes', image: '/placeholder.svg?height=300&width=600' },
  { id: 3, title: 'Cardio Zone', image: '/placeholder.svg?height=600&width=300' },
  { id: 4, title: 'Yoga Studio', image: '/placeholder.svg?height=300&width=300' },
  { id: 5, title: 'Personal Training', image: '/placeholder.svg?height=300&width=300' },
  { id: 6, title: 'Community Events', image: '/placeholder.svg?height=300&width=600' },
];

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-white mb-4">Gallery</h2>
          <p className="text-body text-white/60 max-w-2xl mx-auto">
            Explore our state-of-the-art facilities and community moments
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-max">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.id)}
              className={`group relative rounded-lg overflow-hidden cursor-pointer ${
                item.id === 2 || item.id === 6 ? 'md:col-span-2' : ''
              } ${item.id === 3 ? 'md:row-span-2' : ''}`}
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-end p-4">
                <h3 className="text-white font-oswald font-semibold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-bright-purple rounded-full hover:bg-bright-purple/80 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6 text-black" />
            </button>
            <img
              src={galleryItems.find((item) => item.id === selectedImage)?.image || "/placeholder.svg"}
              alt="Gallery"
              className="max-w-4xl max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
