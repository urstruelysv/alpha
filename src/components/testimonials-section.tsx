'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Rahul Verma',
    role: 'Software Engineer',
    text: 'Alpha Fitness completely transformed my fitness journey. The trainers are knowledgeable and the community is incredibly supportive!',
    rating: 5,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Meera Singh',
    role: 'Entrepreneur',
    text: 'Best gym experience ever. The facilities are top-notch and the staff is always helpful. Highly recommended!',
    rating: 5,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Aditya Patel',
    role: 'Student',
    text: 'I joined 6 months ago and the results speak for themselves. Great equipment, amazing trainers, and a welcoming community.',
    rating: 5,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Kavya Sharma',
    role: 'Marketing Manager',
    text: 'The women-only programs gave me the confidence I needed. The trainers understand our needs perfectly.',
    rating: 5,
    image: '/placeholder.svg?height=100&width=100',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoPlay]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setAutoPlay(false);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoPlay(false);
  };

  return (
    <section className="py-20 bg-black">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-white mb-4">Member Testimonials</h2>
          <p className="text-body text-white/60 max-w-2xl mx-auto">
            Hear from our satisfied members
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-deep-purple/20 border border-bright-purple/30 rounded-lg p-8 md:p-12">
            {/* Testimonial Content */}
            <div className="text-center mb-6">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-bright-purple text-bright-purple" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-white/80 mb-6 italic">
                "{testimonials[current].text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[current].image || "/placeholder.svg"}
                  alt={testimonials[current].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-oswald font-semibold text-white">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-bright-purple">
                    {testimonials[current].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="p-2 rounded-full bg-bright-purple/20 hover:bg-bright-purple/40 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-bright-purple" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrent(index);
                      setAutoPlay(false);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === current ? 'bg-bright-purple w-6' : 'bg-bright-purple/40'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2 rounded-full bg-bright-purple/20 hover:bg-bright-purple/40 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-bright-purple" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
