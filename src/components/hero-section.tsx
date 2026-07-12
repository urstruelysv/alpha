'use client';

import { motion, type Easing } from 'framer-motion';

const reveal = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: 'easeOut' as Easing,
    },
  }),
};

export default function HeroSection() {
  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

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
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />

      {/* Animated Gradient Curves */}
      <motion.svg
        viewBox="0 0 1440 900"
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
      >
        <motion.path
          d="M-200 350 C300 50 700 600 1200 350 C1500 200 1700 300 1900 200"
          stroke="url(#purpleGradient)"
          strokeWidth="130"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="purpleGradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.p
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-cult-body text-sm tracking-[0.35em] text-bright-purple mb-4 uppercase"
        >
          FORGED IN
        </motion.p>

        <motion.h1
          custom={2}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-cult text-7xl md:text-9xl font-bold text-white lowercase mb-6"
        >
          Shadnagar
        </motion.h1>

        <motion.p
          custom={3}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-cult-body text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Where serious athletes come to transform.<br/>
          No excuses. No egos. Just results.
        </motion.p>

        {/* CTA */}
        <motion.button
          custom={4}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToPricing}
          className="px-10 py-4 bg-bright-purple text-white font-cult-body text-sm font-semibold rounded-lg tracking-wide shadow-[0_20px_50px_rgba(168,85,247,0.4)] hover:shadow-[0_30px_60px_rgba(168,85,247,0.6)] hover:bg-bright-purple/90 transition-all duration-300"
        >
          START YOUR JOURNEY
        </motion.button>
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
