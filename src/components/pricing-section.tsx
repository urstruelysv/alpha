'use client';

import { Check } from 'lucide-react';
import AnimatedCard from './animated-card';

const pricingPlans = [
  {
    name: '1 Month',
    price: '₹2,999',
    period: '/month',
    description: 'Perfect for trying us out',
    features: [
      'Full gym access',
      'Locker facility',
      'Basic equipment training',
      'Community access',
    ],
    highlighted: false,
  },
  {
    name: '3 Months',
    price: '₹7,999',
    period: '/3 months',
    description: 'Most popular choice',
    features: [
      'Full gym access',
      'Locker facility',
      'Equipment training',
      'Community access',
      '2 free sessions with trainer',
      'Nutrition consultation',
    ],
    highlighted: true,
  },
  {
    name: '6 Months',
    price: '₹13,999',
    period: '/6 months',
    description: 'Best value',
    features: [
      'Full gym access',
      'Premium locker',
      'Equipment training',
      'Community access',
      '4 free sessions with trainer',
      'Monthly nutrition plans',
      'Progress tracking',
    ],
    highlighted: false,
  },
  {
    name: 'Personal Training',
    price: '₹5,999',
    period: '/month',
    description: 'Dedicated coaching',
    features: [
      'Full gym access',
      '4 sessions/month',
      'Custom workout plans',
      'Nutrition guidance',
      'Progress tracking',
      'Priority scheduling',
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  return (
    <section id="packages" className="py-20 bg-deep-purple/5">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-white mb-4 animate-slide-up">Pricing Plans</h2>
          <p className="text-body text-white/60 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
            Choose the perfect plan for your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <AnimatedCard key={index} delay={index * 100}>
              <div
                className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                  plan.highlighted
                    ? 'ring-2 ring-bright-purple scale-105 md:scale-110'
                    : 'border border-bright-purple/20'
                } ${plan.highlighted ? 'bg-bright-purple/10' : 'bg-deep-purple/10'} card-hover`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0 bg-bright-purple text-black py-2 text-center text-sm font-oswald font-bold animate-pulse-glow">
                    BEST VALUE
                  </div>
                )}

                <div className={`p-8 ${plan.highlighted ? 'pt-16' : ''}`}>
                  <h3 className="heading-md text-white mb-2">{plan.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-oswald font-bold text-bright-purple">
                      {plan.price}
                    </span>
                    <span className="text-white/60 text-sm">{plan.period}</span>
                  </div>

                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 mb-6 ${
                      plan.highlighted
                        ? 'bg-bright-purple text-black hover:bg-bright-purple/90'
                        : 'border-2 border-bright-purple text-bright-purple hover:bg-bright-purple hover:text-black'
                    }`}
                  >
                    Join Now
                  </button>

                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-bright-purple flex-shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
