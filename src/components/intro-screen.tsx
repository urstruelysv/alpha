'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';


interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [step, setStep] = useState('start'); // 'start', 'loading', 'finished'
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  const startLoading = () => {
    setStep('loading');
    // Ensure audio plays on user interaction
    if (audioRef) {
      audioRef.play().catch(() => {});
    }
  };

  useEffect(() => {
    // Create audio element and try to play
    const audio = new Audio('/bgMusic.mp3');
    audio.loop = true;
    audio.muted = isMuted;
    setAudioRef(audio);
    
    // Attempt autoplay
    audio.play().catch(() => {
      // If autoplay fails, it will play on button click
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioRef) {
      audioRef.muted = isMuted;
    }
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
      }, 40); // Faster loading simulation

      return () => clearInterval(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 'finished') {
      // Wait for exit animation to complete
      setTimeout(onComplete, 1200);
    }
  }, [step, onComplete]);

  const welcomeMessage = "FORGING ALPHAS";

  return (
    <AnimatePresence>
      {step !== 'finished' && (
        <motion.div
          className="fixed inset-0 bg-purple flex flex-col items-center justify-center z-50 overflow-hidden"
          exit={{ y: '-110%' }}
          transition={{ duration: 1.1, ease: [0.12, 1.12, 0.8, 0.81] }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-30">
            <motion.div
              className="absolute top-20 left-20 w-32 h-32 bg-bright-purple rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-40 h-40 bg-bright-purple rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.5, 0.3, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-bright-purple rounded-full blur-3xl"
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
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-bright-purple/50 transition-all z-20 backdrop-blur-sm"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
          </button>

          {/* START SCREEN */}
          <AnimatePresence>
            {step === 'start' && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                {/* Full-screen CAUTION text behind */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.25 }}
                  transition={{ delay: 0.3, duration: 1 }}
                >
                  <div 
                    className="text-[clamp(8rem,25vw,35rem)] font-oswald font-black tracking-tighter leading-none text-center"
                    style={{
                      WebkitTextStroke: '3px rgba(124, 58, 237, 0.8)',
                      color: 'transparent',
                      textShadow: '0 0 100px rgba(124, 58, 237, 0.3)',
                    }}
                  >
                    CAUTION
                  </div>
                  <div 
                    className="text-[clamp(8rem,25vw,35rem)] font-oswald font-black tracking-tighter leading-none text-center"
                    style={{
                      WebkitTextStroke: '3px rgba(124, 58, 237, 0.8)',
                      color: 'transparent',
                      textShadow: '0 0 100px rgba(124, 58, 237, 0.3)',
                    }}
                  >
                    CAUTION
                  </div>
                  <div 
                    className="text-[clamp(8rem,25vw,35rem)] font-oswald font-black tracking-tighter leading-none text-center"
                    style={{
                      WebkitTextStroke: '3px rgba(124, 58, 237, 0.8)',
                      color: 'transparent',
                      textShadow: '0 0 100px rgba(124, 58, 237, 0.3)',
                    }}
                  >
                    CAUTION
                  </div>
                </motion.div>

                {/* Main content */}
                <motion.div
                  className="text-center relative z-10 px-4 sm:px-6 md:px-8"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {/* Alpha Fitness Title */}
                  {/* <motion.div
                    className="mb-6 sm:mb-8"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-oswald font-black text-bright-purple drop-shadow-[0_0_30px_rgba(124,58,237,0.8)] tracking-tight">
                      ALPHA FITNESS
                    </h1>
                  </motion.div> */}

                  {/* Divider line */}
                  <motion.div
                    className="h-1 w-32 sm:w-48 md:w-64 mx-auto bg-gradient-to-r from-transparent via-bright-purple to-transparent mb-6 sm:mb-8"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Transformation warning text */}
                  <motion.div
                    className="mb-8 sm:mb-12 space-y-2 sm:space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    <p className="text-xl sm:text-xl md:text-2xl text-white/90 font-oswald font-bold tracking-wider">
                      IF YOU <>PRESS THIS BUTTON</>
                    </p>
                    {/* <p className="text-base sm:text-lg md:text-xl text-bright-purple font-oswald font-semibold tracking-wide">
                      
                    </p> */}
                    {/* <p className="text-sm sm:text-base text-white/70 font-oswald tracking-widest">
                      SHADNAGAR'S LARGEST GYM
                    </p> */}
                  </motion.div>

                  <motion.button
  onClick={startLoading}
  className="relative px-10 py-4 font-oswald font-black text-xl uppercase tracking-widest 
             text-white bg-black border border-purple-600/60 
             rounded-xl overflow-hidden group
             shadow-[inset_0_0_10px_rgba(168,85,247,0.5),0_0_30px_rgba(124,58,237,0.3)]
             transition-all duration-300"
  whileHover={{
    scale: 1.05,
    boxShadow: '0 0 40px rgba(168,85,247,0.8), inset 0 0 25px rgba(124,58,237,0.6)',
  }}
  whileTap={{ scale: 0.96 }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.5 }}
>
  {/* Abstract energy shapes */}
  <motion.div
    className="absolute inset-0"
    animate={{
      rotate: [0, 360],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    {/* Thin rotating abstract rings */}
    <div className="absolute -inset-4 border border-purple-700/40 rounded-[30%] blur-sm" />
    <div className="absolute -inset-8 border border-purple-800/30 rounded-[40%] blur-[2px]" />
  </motion.div>

  {/* Moving highlight sweep */}
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-600/20 to-transparent"
    animate={{ x: ['-100%', '100%'] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
  />

  {/* Button content */}
  <span className="relative z-10 text-white drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] group-hover:text-purple-300 transition-colors">
    YOUR BODY GETS TRANSFORMED
  </span>

  {/* Outer pulse aura */}
  <motion.div
    className="absolute -inset-[3px] rounded-xl border border-purple-500/50"
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
      ease: "easeInOut",
    }}
  />
</motion.button>



                  {/* Warning text below button */}
                  {/* <motion.p
                    className="mt-6 sm:mt-8 text-xs sm:text-sm text-bright-purple/60 font-oswald tracking-widest"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    TRANSFORMATION AWAITS
                  </motion.p> */}
                </motion.div>

                {/* Floating particles */}
                <motion.div
                  className="absolute top-1/4 left-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-bright-purple rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-bright-purple rounded-full"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute top-1/3 right-1/4 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-bright-purple rounded-full"
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* LOADING SCREEN */}
          <AnimatePresence>
            {step === 'loading' && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Background motivational text */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.08 }}
                >
                  <div className="text-[14rem] font-oswald font-black text-purple outline-purple-500 tracking-tighter leading-none whitespace-nowrap">
                    ALPHA FITNESS
                  </div>
                  {/* <div className="text-[14rem] font-oswald font-black text-white tracking-tighter leading-none whitespace-nowrap">
                    ALPHA FITNESS
                  </div>
                  <div className="text-[14rem] font-oswald font-black text-white tracking-tighter leading-none whitespace-nowrap">
                    ALPHA FITNESS
                  </div> */}
                </motion.div>
                

                {/* Main text animation */}
                <motion.div
                  className="relative z-10 mb-8"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-center text-white heading-md tracking-widest drop-shadow-[0_0_20px_rgba(124,58,237,0.6)]">
                    {welcomeMessage.split('').map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 50, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.8, ease: 'backOut' }}
                        className="inline-block"
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Glowing central orb */}
                <motion.div
                  className="relative z-10 mb-20"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-bright-purple to-purple-900 shadow-[0_0_60px_rgba(124,58,237,0.8)]" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-bright-purple"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-black/50">
                  <motion.div
                    className="h-full bg-gradient-to-r from-bright-purple via-purple-500 to-bright-purple"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                {/* Progress percentage */}
                <motion.span
                  className="absolute bottom-8 right-8 font-oswald text-6xl font-black bg-gradient-to-r from-bright-purple to-purple-400 bg-clip-text text-transparent"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {progress}%
                </motion.span>

                {/* Subtitle */}
                <motion.p
                  className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest font-oswald"
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