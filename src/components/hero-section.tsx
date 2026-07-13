'use client';

import { useEffect, useRef } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Keep the hero video playing on loop even if autoplay is interrupted
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ensurePlaying = async () => {
      try {
        video.muted = true;
        video.defaultMuted = true;
        if (video.paused) {
          await video.play();
        }
      } catch {
        // Autoplay can fail until the next interaction; retry below
      }
    };

    void ensurePlaying();

    const onVisibility = () => {
      if (document.visibilityState === 'visible') {
        void ensurePlaying();
      }
    };

    const onEnded = () => {
      video.currentTime = 0;
      void ensurePlaying();
    };

    video.addEventListener('ended', onEnded);
    document.addEventListener('visibilitychange', onVisibility);

    // Retry once shortly after mount (helps after intro screen unmounts)
    const retry = window.setTimeout(() => {
      void ensurePlaying();
    }, 300);

    return () => {
      video.removeEventListener('ended', onEnded);
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearTimeout(retry);
    };
  }, []);

  return (
    <motion.section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#0a0a0a]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {/* Background Video — always visible, muted, looping */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/gym%20final.MP4" type="video/mp4" />
      </video>

      {/* Gradient over the video */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-deep-purple/40 via-black to-black" />

      {/* Animated Gradient Curves — brass to match site palette */}
      <motion.svg
        viewBox="0 0 1440 900"
        className="absolute inset-0 z-[2] w-full h-full pointer-events-none opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
      >
        <motion.path
          d="M-200 350 C300 50 700 600 1200 350 C1500 200 1700 300 1900 200"
          stroke="url(#brassGradient)"
          strokeWidth="130"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <defs>
          <linearGradient id="brassGradient" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a67c3d" stopOpacity="0" />
            <stop offset="50%" stopColor="#a67c3d" stopOpacity="1" />
            <stop offset="100%" stopColor="#a67c3d" stopOpacity="0" />
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
          className="font-cult-body text-sm tracking-[0.35em] text-brass-200/90 mb-4"
        >
          WE ARE
        </motion.p>

        <motion.h1
          custom={2}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-cult text-7xl md:text-9xl font-bold text-white lowercase mb-6"
        >
          alpha
        </motion.h1>

        <motion.p
          custom={3}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-cult-body text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A fitness movement in <span className="font-semibold text-brass-300">Shadnagar</span>
          <br />
          worth breaking a sweat for
        </motion.p>

        {/* CTA */}
        <motion.button
          custom={4}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToPricing}
          className="px-10 py-4 bg-brass-500 text-black font-cult-body text-sm font-semibold rounded-md tracking-wide shadow-xl shadow-brass-500/20 hover:bg-brass-400 transition"
        >
          EXPLORE MEMBERSHIPS
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="animate-bounce">
          <svg
            className="h-6 w-6 text-brass-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </motion.section>
  );
}
