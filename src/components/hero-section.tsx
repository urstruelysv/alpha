'use client';

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 32, seconds: 18 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;

        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 0;
          hours = 0;
          minutes = 0;
          seconds = 0;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
        <motion.section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src="/gym%20final.MP4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-deep-purple/40 via-black to-black" />

      {/* Discount Badge */}
      <div className="absolute top-24 right-4 md:right-8 z-20 bg-bright-purple/20 border border-bright-purple rounded-lg p-4 backdrop-blur-sm animate-scale-in card-hover">
        <div className="text-xs font-oswald text-bright-purple uppercase tracking-wider mb-2">Limited Offer</div>
        <div className="text-2xl font-oswald font-bold text-white mb-2">50% OFF</div>
        <div className="text-xs text-white/70">
          {String(timeLeft.days).padStart(2, '0')}:{String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <div className="animate-slide-up">
          <h1 className="heading-xl mb-6 text-white">
            Alpha Fitness
            <br />
            <span className="text-bright-purple">Shadnagar's biggest premium Gym</span>
          </h1>

          <p className="text-body text-white/70 max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Advanced equipment, expert trainers, a community that transforms. Join thousands of members achieving their fitness goals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <button className="btn-primary flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-bright-purple/50">
              Start Free Trial
              <ChevronRight size={18} />
            </button>
            <button className="btn-secondary">View Packages</button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="group">
              <div className="text-3xl md:text-4xl font-oswald font-bold text-bright-purple group-hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-sm text-white/60">Active Members</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl font-oswald font-bold text-bright-purple group-hover:scale-110 transition-transform duration-300">10+</div>
              <div className="text-sm text-white/60">Expert Trainers</div>
            </div>
          
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-bright-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </motion.section>
  );
}
