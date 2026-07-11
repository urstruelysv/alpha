'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';

const testimonials = [
  {
    name: 'Isha T.',
    quote: 'I don\'t have to shrink myself here. Coaches see me as strong, not just "the girl in the gym".',
  },
  {
    name: 'Deepa N.',
    quote: 'Built real strength, real confidence. This program respects where you\'re starting from.',
  },
  {
    name: 'Neha K.',
    quote: 'Finally training without creepy stares or unwanted advice. Just smart programming and real results.',
  },
];

export default function WomensSection() {
  return (
    <section id="womens-fitness" className="py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Women's fitness program"
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-purple/40 to-transparent" />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-bright-purple" />
              <span className="text-bright-purple font-oswald text-sm uppercase tracking-wider">
                Built for Women
              </span>
            </div>
            <h2 className="heading-lg text-white mb-6">
              Space Where You Belong
            </h2>
            <p className="text-body text-white/70 mb-6">
              Dedicated hours. Female trainers. Programming designed for your body and goals—not copied from Instagram. You train serious here. No room for nonsense.
            </p>

            <div className="space-y-4 mb-8">
              {['Expert female trainers', 'Women-only training hours', 'Personalized coaching', 'Community support'].map(
                (feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-bright-purple" />
                    <span className="text-white/80">{feature}</span>
                  </div>
                )
              )}
            </div>

            <button className="btn-primary">Learn More</button>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-deep-purple/20 rounded-lg p-8 border border-bright-purple/20">
          <h3 className="heading-md text-white mb-8 text-center">What Our Members Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <p className="text-white/70 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="text-bright-purple font-oswald font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
