'use client';

import { Dumbbell, Users, Heart, Utensils, Zap, Activity } from 'lucide-react';
import AnimatedCard from './animated-card.tsx';

const services = [
  {
    icon: Dumbbell,
    title: 'General Gym',
    description: 'Access to state-of-the-art equipment and facilities',
  },
  {
    icon: Users,
    title: 'Personal Training',
    description: 'One-on-one coaching with certified trainers',
  },
  {
    icon: Activity,
    title: 'Group Classes',
    description: 'High-energy group fitness classes daily',
  },
  {
    icon: Heart,
    title: "Women's Fitness",
    description: 'Dedicated women-only training programs',
  },
  {
    icon: Utensils,
    title: 'Nutrition',
    description: 'Personalized nutrition plans and guidance',
  },
  {
    icon: Zap,
    title: 'Physiotherapy',
    description: 'Recovery and injury prevention services',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-black">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-white mb-4 animate-slide-up">Our Services</h2>
          <p className="text-body text-white/60 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
            Comprehensive fitness solutions designed to help you achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <AnimatedCard key={index} delay={index * 100}>
                <div className="group p-8 rounded-lg border border-bright-purple/20 bg-deep-purple/10 hover:bg-deep-purple/20 hover:border-bright-purple/50 transition-all duration-300 cursor-pointer card-hover">
                  <div className="mb-4 inline-block p-3 rounded-lg bg-bright-purple/20 group-hover:bg-bright-purple/30 transition-colors">
                    <Icon className="w-6 h-6 text-bright-purple" />
                  </div>
                  <h3 className="heading-md text-white mb-2">{service.title}</h3>
                  <p className="text-white/60">{service.description}</p>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
