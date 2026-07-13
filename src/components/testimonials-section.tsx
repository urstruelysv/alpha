'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Akhil',
    role: 'Fitness Enthusiast',
    text: 'I\'ve tried so many gyms, but Alpha actually feels like home. The maintenance is top-tier, and the machines are constantly being upgraded and advanced.',
    rating: 5,
    image: '/testimonials/akhil.png',
  },
  {
    name: 'Akshara',
    role: 'Fitness Enthusiast',
    text: 'Being a woman in a gym used to feel awkward. Not here. The coaches push you hard AND make you feel supported.',
    rating: 5,
    image: '/testimonials/akshara.png',
  },
  {
    name: 'Durga',
    role: 'Fitness Enthusiast',
    text: 'Stopped doing bro-science, started following actual programming. Six months later, I look completely different. This place gets it.',
    rating: 5,
    image: '/testimonials/dhrga.png',
  },
  {
    name: 'Madhu',
    role: 'Fitness Enthusiast',
    text: 'Hands down the best gym I\'ve been to. The owners are incredible, and the entire atmosphere is so friendly. You feel welcomed the second you walk through the door.',
    rating: 5,
    image: '/testimonials/madhu.png',
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
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: i * 0.15,
                      ease: "easeOut"
                    }}
                  >
                    <Star className="w-5 h-5 text-bright-purple drop-shadow-[0_0_8px_rgba(166,124,61,0.5)]" />
                  </motion.div>
                ))}
              </div>
              <p className="text-lg md:text-xl text-white/80 mb-6 italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <Image
                  key={testimonials[current].image}
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
