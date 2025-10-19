'use client';

import { Heart } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya',
    quote: 'Alpha Fitness transformed my confidence. The women-only programs made all the difference!',
  },
  {
    name: 'Anjali',
    quote: 'Best decision ever. The trainers are supportive and the community is amazing.',
  },
  {
    name: 'Sneha',
    quote: 'Finally found a gym where I feel comfortable and motivated to achieve my goals.',
  },
];

export default function WomensSection() {
  return (
    <section id="womens-fitness" className="py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image */}
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="Women's fitness program"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-purple/40 to-transparent" />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-bright-purple" />
              <span className="text-bright-purple font-oswald text-sm uppercase tracking-wider">
                Women's Empowerment
              </span>
            </div>
            <h2 className="heading-lg text-white mb-6">
              Dedicated Programs for Women
            </h2>
            <p className="text-body text-white/70 mb-6">
              Our women-only fitness programs are designed to create a supportive, judgment-free environment where you can achieve your fitness goals with confidence. From strength training to yoga and cardio classes, we have everything you need.
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
                <p className="text-white/70 mb-4 italic">"{testimonial.quote}"</p>
                <p className="text-bright-purple font-oswald font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
