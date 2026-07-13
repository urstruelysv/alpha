'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const communityEvents = [
  { eyebrow: 'MONTHLY', title: 'Fitness Challenge', image: '/fitness-challenge.png' },
  { eyebrow: 'GROUP CLASS', title: 'Yoga Sessions', image: '/yoga.jpg' },
  { eyebrow: 'TOGETHER', title: 'Community Workout', image: '/community-workout.png' },
  { eyebrow: 'LEARN', title: 'Nutrition Workshops', image: '/nutrition.png' },
];

export default function CommunitySection() {
  return (
    <section id="community" className="py-24">
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-light text-white mb-3 tracking-tight">
            You&apos;re Not Alone Here
          </h2>
          <p className="text-white/50 max-w-xl mx-auto font-light text-base md:text-lg">
            Community events. Real people. Real progress.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {communityEvents.map((event) => (
            <motion.div
              key={event.title}
              className="group relative rounded-[1.75rem] overflow-hidden aspect-[3/4]"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* glow */}
              <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute -inset-px rounded-[1.75rem] z-20"
                style={{
                  boxShadow:
                    '0 0 0 1px rgba(255,255,255,0.15), 0 20px 60px -10px rgba(255,255,255,0.15)',
                }}
              />

              {/* image, scales on hover */}
              <motion.div
                variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>

              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* text */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                <p className="text-white/60 text-[11px] font-medium tracking-[0.15em] uppercase mb-1">
                  {event.eyebrow}
                </p>
                <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                  {event.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}