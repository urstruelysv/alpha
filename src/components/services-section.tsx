'use client';

import { Dumbbell, Zap, Target, Activity, Utensils, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Dumbbell,
    title: 'Private Personal Training',
    vibe: '1:1 coaching, zero guesswork',
    description: 'Fully tailored coaching for your body, goals, and schedule.',
    perks: ['Form corrections', 'WhatsApp support', 'Session recaps'],
  },
  {
    icon: Zap,
    title: 'Strength & Performance',
    vibe: 'Train like an athlete',
    description: 'Build serious muscle, strength, and athletic conditioning.',
    perks: ['Strength blocks', 'Power + speed work', 'Monthly testing'],
  },
  {
    icon: Target,
    title: 'Body Transformation',
    vibe: 'Results you can see',
    description: 'Structured fat loss and muscle building programs.',
    perks: ['Progress tracking', 'Flexible meal plans', 'Weekly check-ins'],
  },
  {
    icon: Activity,
    title: 'Functional & Mobility',
    vibe: 'Move well, stay healthy',
    description: 'Train safer and prevent injuries with smart programming.',
    perks: ['Mobility drills', 'Stability work', 'Injury prevention'],
  },
  {
    icon: Utensils,
    title: 'Nutrition Coaching',
    vibe: 'Real food, real life',
    description: 'Personalized nutrition guidance that fits your lifestyle.',
    perks: ['Simple macros', 'Weekly reviews', 'Dining-out tips'],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-b from-black via-zinc-950 to-black"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.15),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(56,189,248,0.15),transparent_50%),radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.08),transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-brass-500/30 bg-brass-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brass-200">
            <Sparkles className="w-4 h-4" />
            Coaching That Actually Works
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Our Services
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-base px-4">
            Programs that fit busy schedules, deliver measurable progress, and still leave room for the foods and routines you actually enjoy.
          </p>
        </div>

        {/* Services Grid with Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {/* Motivational Image Card */}
          <div className="relative rounded-2xl overflow-hidden h-full min-h-[280px] md:min-h-0 group">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
              alt="Gym Training"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-end p-6 md:p-8 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Train Hard.<br />Stay Consistent.
              </h3>
              <p className="text-white/80 text-sm md:text-base">
                Your results start here
              </p>
            </div>
          </div>

          {/* Service Cards */}
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative rounded-2xl border border-brass-500/20 bg-gradient-to-br from-zinc-900/90 to-black/80 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-bright-purple/50 hover:shadow-[0_25px_70px_rgba(168,85,247,0.35)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brass-500 via-sky-400 to-brass-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="p-5 md:p-6 space-y-3 md:space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="inline-flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-xl bg-brass-500/15 border border-brass-500/30">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-brass-300" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base md:text-lg font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="text-xs md:text-sm text-brass-100/80">
                      {service.vibe}
                    </p>
                  </div>

                  <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-1.5 md:space-y-2">
                    {service.perks.map((perk) => (
                      <div
                        key={perk}
                        className="flex items-center gap-2 text-xs md:text-sm text-white/80"
                      >
                        <span className="inline-flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-gradient-to-br from-brass-400 to-sky-300 flex-shrink-0" />
                        {perk}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1 md:pt-2">
                    <span className="text-[10px] md:text-[11px] font-semibold text-brass-100 bg-brass-500/15 border border-brass-400/30 rounded-full px-2.5 md:px-3 py-0.5 md:py-1">
                      Human coaching
                    </span>
                    <span className="text-[10px] md:text-[11px] font-semibold text-white/80 bg-white/5 border border-white/10 rounded-full px-2.5 md:px-3 py-0.5 md:py-1">
                      Weekly tracking
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 md:mt-10 text-center text-xs md:text-sm text-white/60 px-4">
          Need something custom? Drop a message and we&apos;ll build a plan around your schedule.
        </div>
      </div>
    </section>
  );
}
