'use client';

import { Sparkles, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

const services = [
  {
    title: 'Private Personal Training',
    vibe: '1:1 coaching, zero guesswork',
    image: '/one-on-one.MOV',
    glow: '#d97b2e', // amber
  },
  {
    title: 'Strength & Performance',
    vibe: 'Train like an athlete',
    image: '/strength-performance.mov',
    glow: '#7c5cbf', // violet
  },
  {
    title: 'Body Transformation',
    vibe: 'Results you can see',
    image: '/transformation-final.png',
    glow: '#2e9678', // teal
  },
  {
    title: 'Nutrition Coaching',
    vibe: 'Real food, real results',
    image: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=800&auto=format&fit=crop',
    glow: '#c2542e', // rust
  },
];

function TransformationSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % transformationImages.length);
    }, 3000); // 3 seconds fast transition
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={transformationImages[index]}
            alt="Transformation"
            fill
            className="object-cover [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_15%)]"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#0a0a0a] py-14 md:py-16">
      {/* Radial Gradient Background behind content */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(circle at center, rgba(166, 124, 61, 0.15) 0%, transparent 70%)' 
        }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-brass-500/30 bg-brass-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brass-200">
            <Sparkles className="w-4 h-4" />
            Coaching That Actually Works
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Our Services
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0f0f] min-h-[360px] flex flex-col p-6"
            >
              {/* per-card animated glow */}
              <motion.div
                className="absolute z-0 w-[280px] h-[280px] rounded-full blur-[70px] opacity-40 pointer-events-none"
                style={{ background: service.glow, top: '-15%', left: '-10%' }}
                animate={{ x: [0, 30, -20, 0], y: [0, 20, -10, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* header */}
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white leading-tight">{service.title}</h3>
                  <p className="text-sm text-white/60 mt-1">{service.vibe}</p>
                </div>
                <button className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* image/video bleeds to card edges, only a thin top blend */}
              <div className="relative z-10 -mx-6 -mb-6 mt-4 flex-1 min-h-[180px]">
                {service.title === 'Private Personal Training' || service.title === 'Strength & Performance' ? (
                  <video
                    src={service.image}
                    data-testid="service-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 object-cover w-full h-full [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_15%)]"
                  />
                ) : (
                  <Image
                    src={service.image as string}
                    alt={service.title}
                    fill
                    className="object-cover [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_15%)]"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Wide Card */}
        <div className="relative mt-5 overflow-hidden rounded-[28px] border border-white/10 bg-[#0f0f0f]">
          <motion.div
            className="absolute z-0 w-[320px] h-[320px] rounded-full blur-[90px] opacity-30 pointer-events-none"
            style={{ background: '#7c5cbf', top: '-30%', right: '5%' }}
            animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-8">
            <div className="md:w-[38%]">
              <h3 className="text-2xl font-bold text-white">Explore Every Program</h3>
              <p className="text-sm text-white/60 mt-2">From mobility to community events — see the full lineup</p>
              <Button className="mt-5">Explore All</Button>
            </div>
            <div className="md:w-[62%] w-full h-56 md:h-64 relative overflow-hidden rounded-2xl">
              <video
                src="/explore-programs.MOV"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute top-4 right-4 grid grid-cols-2 gap-2">
                {['Functional & Mobility', 'Expert Coaches', 'Community Events', 'Free Trial'].map((label) => (
                  <div key={label} className="bg-black/40 border border-white/20 rounded-xl px-3 py-1.5 text-[13px] text-white whitespace-nowrap backdrop-blur-sm">
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
