'use client';

import { Edit2, Trash2, Plus, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
}

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rahul Verma',
    role: 'Software Engineer',
    text: 'Alpha Fitness completely transformed my fitness journey.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Meera Singh',
    role: 'Entrepreneur',
    text: 'Best gym experience ever. Highly recommended!',
    rating: 5,
  },
];

export default function TestimonialsTab() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="heading-md text-white">Manage Testimonials</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-bright-purple text-black font-semibold rounded-lg hover:bg-bright-purple/90 transition-colors">
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      <div className="space-y-4">
        {mockTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-deep-purple/20 border border-bright-purple/30 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-white font-oswald font-semibold">{testimonial.name}</h3>
                <p className="text-bright-purple text-sm">{testimonial.role}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-bright-purple hover:bg-bright-purple/20 rounded transition-colors">
                  <Edit2 size={18} />
                </button>
                <button className="p-2 text-red-500 hover:bg-red-500/20 rounded transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <p className="text-white/70 mb-3">{testimonial.text}</p>

            <div className="flex gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-bright-purple text-bright-purple" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
