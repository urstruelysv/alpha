'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [step, setStep] = useState('start');
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  const startLoading = () => {
    setStep('loading');
    if (audioRef) {
      audioRef.play().catch(() => {});
    }
  };

  useEffect(() => {
    const audio = new Audio('/bgMusic.mp3');
    audio.loop = true;
    audio.muted = isMuted;
    setAudioRef(audio);
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioRef) audioRef.muted = isMuted;
  }, [isMuted, audioRef]);

  useEffect(() => {
    if (step === 'loading') {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setStep('finished'), 1000);
            return 100;
          }
          return prev + 1;
        });
      }, 40);
      return () => clearInterval(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'finished') {
      setTimeout(onComplete, 1200);
    }
  }, [step, onComplete]);

  const welcomeMessage = 'FORGING ALPHAS';

  return (
    <AnimatePresence>
      {step !== 'finished' && (
        <motion.div
          className="fixed inset-0 bg-purple flex flex-col items-center justify-center z-50 overflow-hidden"
          exit={{ y: '-110%' }}
          transition={{ duration: 1.1, ease: [0.12, 1.12, 0.8, 0.81] }}
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-30">
            <motion.div
              className="absolute top-10 sm:top-20 left-10 sm:left-20 w-20 sm:w-32 h-20 sm:h-32 bg-bright-purple rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-24 sm:w-40 h-24 sm:h-40 bg-bright-purple rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-40 sm:w-64 h-40 sm:h-64 bg-bright-purple rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
          </div>

          {/* Mute button */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-bright-purple/50 transition-all z-20 backdrop-blur-sm"
          >
            {isMuted ? (
              <VolumeX size={18} className="sm:size-20 text-white" />
            ) : (
              <Volume2 size={18} className="sm:size-20 text-white" />
            )}
          </button>

          {/* START SCREEN */}
          <AnimatePresence>
            {step === 'start' && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-3 sm:px-6"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                {/* Background CAUTION text */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25 }}
                  transition={{ delay: 0.3, duration: 1 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="text-[clamp(3rem,15vw,10rem)] sm:text-[clamp(8rem,25vw,35rem)] font-oswald font-black tracking-tighter leading-none"
                      style={{
                        WebkitTextStroke: '2px rgba(124, 58, 237, 0.8)',
                        color: 'transparent',
                        textShadow: '0 0 50px rgba(124, 58, 237, 0.3)',
                      }}
                    >
                      CAUTION
                    </div>
                  ))}
                </motion.div>

                {/* Button & warning */}
                <motion.div
                  className="relative z-10 mt-8 sm:mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <motion.div
                    className="h-1 w-24 sm:w-64 mx-auto bg-gradient-to-r from-transparent via-bright-purple to-transparent mb-6 sm:mb-8"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <p className="text-lg sm:text-2xl text-white/90 font-oswald font-bold tracking-wider mb-6 sm:mb-8">
                    IF YOU PRESS THIS BUTTON
                  </p>

                  <motion.button
                    onClick={startLoading}
                    className="relative px-6 sm:px-10 py-3 sm:py-4 font-oswald font-black text-lg sm:text-xl uppercase tracking-widest 
                               text-white bg-black border border-purple-600/60 rounded-xl overflow-hidden group
                               shadow-[inset_0_0_10px_rgba(168,85,247,0.5),0_0_30px_rgba(124,58,237,0.3)]
                               transition-all duration-300"
                    whileHover={{
                      scale: 1.05,
                      boxShadow:
                        '0 0 40px rgba(168,85,247,0.8), inset 0 0 25px rgba(124,58,237,0.6)',
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    >
                      <div className="absolute -inset-3 sm:-inset-4 border border-purple-700/40 rounded-[30%] blur-sm" />
                      <div className="absolute -inset-6 sm:-inset-8 border border-purple-800/30 rounded-[40%] blur-[2px]" />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-600/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <span className="relative z-10 text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] group-hover:text-purple-300 transition-colors text-sm sm:text-base">
                      YOUR BODY GETS TRANSFORMED
                    </span>
                    <motion.div
                      className="absolute -inset-[2px] sm:-inset-[3px] rounded-xl border border-purple-500/50"
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                        boxShadow: [
                          '0 0 10px rgba(168,85,247,0.4)',
                          '0 0 20px rgba(168,85,247,0.8)',
                          '0 0 10px rgba(168,85,247,0.4)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LOADING SCREEN */}
          <AnimatePresence>
            {step === 'loading' && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.08 }}
                >
                  <div className="text-[clamp(3rem,15vw,8rem)] sm:text-[14rem] font-oswald text-purple-500 tracking-tighter leading-none whitespace-nowrap">
                    ALPHA FITNESS
                  </div>
                </motion.div>

                <motion.div
                  className="relative z-10 mb-6 sm:mb-8"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  <div className="flex items-center justify-center text-white text-2xl sm:text-5xl font-oswald tracking-widest drop-shadow-[0_0_20px_rgba(124,58,237,0.6)]">
                    {welcomeMessage.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 50, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: i * 0.05,
                          duration: 0.8,
                          ease: 'backOut',
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Orb */}
                <motion.div
                  className="relative z-10 mb-12 sm:mb-20 scale-75 sm:scale-100"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-16 sm:w-24 h-16 sm:h-24 rounded-full bg-gradient-to-br from-bright-purple to-purple-900 shadow-[0_0_60px_rgba(124,58,237,0.8)]" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-bright-purple"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Progress */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-black/50">
                  <motion.div
                    className="h-full bg-gradient-to-r from-bright-purple via-purple-500 to-bright-purple"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <motion.span
                  className="absolute bottom-8 right-4 sm:right-8 font-oswald text-3xl sm:text-6xl font-black bg-gradient-to-r from-bright-purple to-purple-400 bg-clip-text text-transparent"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {progress}%
                </motion.span>

                <motion.p
                  className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 text-white/60 text-sm sm:text-lg tracking-widest font-oswald"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  PREPARING YOUR TRANSFORMATION
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
