'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Monthly',
    price: '₹1,500',
    note: 'Good if you’re just starting or getting back after a break.',
    points: [
      'Use the gym freely during working hours',
      'Get basic help when you’re unsure',
      'Figure out your routine and timing',
    ],
  },
  {
    name: '3 Months',
    price: '₹3,500',
    note: 'This is where most people stop skipping workouts.',
    points: [
      'Train regularly without thinking about renewals',
      'Exercises adjusted as your body improves',
      'Better understanding of form and pace',
    ],
  },
  {
    name: '6 Months',
    price: '₹6,999',
    note: 'You’ll start seeing real physical change here.',
    points: [
      'Strength and fat loss become noticeable',
      'Your routine evolves as you grow stronger',
      'Training starts feeling natural, not forced',
    ],
  },
  {
    name: '12 Months',
    price: '₹13,999',
    highlight: true,
    note: 'For people who are serious about staying fit long-term.',
    points: [
      'One full year of consistent training',
      'Your body actually adapts and settles',
      '1 Month of personal training included',
      'Less guessing, more direction',
    ],
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative py-16 px-4 sm:px-6 bg-zinc-950"
    >
      {/* Subtle purple depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />

      {/* Intro */}
      <div className="relative max-w-3xl mx-auto text-center mb-14">
        <p className="text-sm text-purple-400 mb-2">
          Alpha Fitness, Shadnagar
        </p>

        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
          Choose how long you want to stay consistent.
        </h2>

        <p className="text-zinc-400">
          No complicated plans. No fake promises.  
          Just pick how long you’re willing to show up.
        </p>
      </div>

      {/* Plans */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <motion.div
            key={plan.name}
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.15 }}
            className={`rounded-xl border p-6 bg-zinc-900/80 backdrop-blur
              ${
                plan.highlight
                  ? 'border-purple-500'
                  : 'border-zinc-800'
              }`}
          >
            {plan.highlight && (
              <p className="text-xs text-purple-400 mb-2">
                Most long-term members choose this
              </p>
            )}

            <h3 className="text-xl font-medium text-white">
              {plan.name}
            </h3>

            <p className="text-3xl font-semibold text-white mt-3">
              {plan.price}
            </p>

            <p className="text-sm text-zinc-400 mt-3">
              {plan.note}
            </p>

            <div className="mt-6 space-y-3">
              {plan.points.map((point) => (
                <div key={point} className="flex gap-2">
                  <Check className="w-4 h-4 text-purple-400 mt-1" />
                  <span className="text-sm text-zinc-300">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <button
              className={`mt-8 w-full py-3 rounded-lg text-sm font-medium transition
                ${
                  plan.highlight
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                }`}
            >
              Join Alpha Fitness
            </button>
          </motion.div>
        ))}
      </div>

      {/* Personal Training */}
      <div className="relative max-w-4xl mx-auto mt-20 text-center">
        <h3 className="text-2xl font-semibold text-white mb-4">
          Personal Training (One-on-One)
        </h3>

        <p className="text-zinc-400 max-w-2xl mx-auto mb-4">
          This is for people who don’t want to figure things out alone.
          You train with a coach, follow a clear plan, and stay accountable.
        </p>

        <p className="text-sm text-zinc-500 mb-6">
          Pricing depends on your goals, schedule, and starting point.
        </p>

        <button className="px-6 py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition">
          Talk to a Trainer
        </button>
      </div>
    </section>
  );
}
