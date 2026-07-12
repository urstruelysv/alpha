'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Arjun K.',
    role: 'Built 15kg muscle in 4 months',
    text: 'Tried a dozen gyms. Never found trainers who actually cared. Now I text my coach questions at 11 PM. He responds. That\'s the difference.',
    rating: 5,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Priya R.',
    role: 'Went from zero to deadlifting 60kg',
    text: 'Being a woman in a gym used to feel awkward. Not here. The coaches push you hard AND make you feel supported. No judgment, just gains.',
    rating: 5,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Vikram S.',
    role: 'Lost 18kg, kept the muscle',
    text: 'Stopped doing bro-science, started following actual programming. Six months later, I look completely different. This place gets it.',
    rating: 5,
    image: '/placeholder.svg?height=100&width=100',
  },
  {
    name: 'Sneha M.',
    role: 'Completed her first strength competition',
    text: 'Found a community of people who actually show up, who care about progress, who push without being toxic. This is home.',
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
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-white mb-4">Real Results. Real People.</h2>
          <p className="text-body text-white/60 max-w-2xl mx-auto">
            From zero experience to competition ready
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-zinc-900/80 to-black border border-bright-purple/20 rounded-2xl p-8 md:p-12 backdrop-blur shadow-[0_20px_60px_rgba(166,124,61,0.15)]">
            {/* Testimonial Content */}
            <div className="text-center mb-6">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-bright-purple text-bright-purple" />
                ))}
              </div>
              <p className="text-lg md:text-xl text-white/80 mb-6 italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <Image
                  src={testimonials[current].image || "/placeholder.svg"}
                  alt={testimonials[current].name}
                  width={48}
                  height={48}
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
