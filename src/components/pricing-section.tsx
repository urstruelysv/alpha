'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Dumbbell, Calendar, Crown, User, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

// The Package type should ideally be shared from adminDataStore, but for simplicity in this component,
// we define it here. It must match the structure of the data being fetched.
interface Package {
  id: string;
  name: string;
  price: string;
  line?: string;
  features?: string[];
  popular?: boolean;
  icon?: string;
  type?: string;
}

// Map string names to actual Lucide components
const iconMap: { [key: string]: React.ElementType } = {
  Calendar,
  Dumbbell,
  Crown,
  User,
};

export default function PricingSection() {
  const [plans, setPlans] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        // The public API for packages should be at /api/packages
        const res = await fetch('/api/packages');
        if (!res.ok) {
          throw new Error(`Failed to fetch plans: ${res.statusText}`);
        }
        const data = (await res.json()) as Package[];
        // Assuming the API returns all packages, we might want to filter them if needed
        setPlans(data.filter(p => p.type === 'membership'));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Failed to fetch pricing plans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <div className="text-center text-white">Loading pricing...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!plans || plans.length === 0) {
      return <div className="text-center text-white">No pricing plans available at the moment.</div>;
    }

    return (
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, i) => {
          const Icon = plan.icon ? iconMap[plan.icon] || HelpCircle : HelpCircle;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              viewport={{ once: true }}
              className={`relative rounded-xl border p-6 bg-zinc-900 flex flex-col
                ${
                  plan.popular
                    ? 'border-purple-500'
                    : 'border-zinc-800'
                }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              )}

              <Icon className="w-6 h-6 text-purple-400 mb-4" />

              <h3 className="text-xl font-semibold text-white">
                {plan.name}
              </h3>
              
              {plan.line && (
                <p className="text-sm text-zinc-400 mt-1 min-h-[40px]">
                  {plan.line}
                </p>
              )}

              <p className="text-3xl font-bold text-white mt-4">
                {plan.price}
              </p>

              <div className="mt-6 space-y-3 flex-grow">
                {(plan.features || []).map((feature) => (
                  <div key={feature} className="flex gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={`mt-8 w-full rounded-lg py-3 font-medium transition
                  ${
                    plan.popular
                      ? 'bg-purple-500 text-white hover:bg-purple-600'
                      : 'bg-zinc-800 text-white hover:bg-zinc-700'
                  }`}
              >
                Start Training at Alpha
              </button>
            </motion.div>
          )
        })}
      </div>
    );
  }

  return (
    <section
      id="pricing"
      className="relative py-16 px-4 sm:px-6 bg-zinc-950"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center mb-14"
      >
        <p className="text-sm uppercase tracking-widest text-purple-400 mb-2">
          Alpha Fitness, Shadnagar
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Choose Your Path to Fitness
        </h2>
        <p className="text-zinc-400 text-base">
          Flexible membership plans designed to fit your fitness goals and lifestyle.
          </p>
      </motion.div>

      {renderContent()}

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-20 text-center"
      >
        <User className="w-8 h-8 text-purple-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-3">
          One-on-One Personal Training
        </h3>
        <p className="text-zinc-400 mb-4">
          For people who want focused attention, faster progress,
          and zero guesswork inside the gym.
        </p>
        <p className="text-sm text-zinc-500 mb-6">
          Pricing is discussed after understanding your body,
          goals, and availability.
        </p>
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg font-medium transition">
          Talk to a Trainer
        </button>
      </motion.div>
    </section>
  );
}
