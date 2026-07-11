'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Award } from 'lucide-react';

type Trainer = {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
};

export default function TrainersSection() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await fetch('/api/trainers', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to load trainers');
        }
        const data = (await res.json()) as Trainer[];
        setTrainers(data);
      } catch (err) {
        console.error(err);
        setError('Could not load trainers.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <section id="trainers" className="py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-white mb-4">Your Coaches Are Real Athletes</h2>
          <p className="text-body text-white/60 max-w-2xl mx-auto">
            Not just certified. Actually strong. They get it because they do it.
          </p>
        </div>

        {loading ? (
          <p className="text-white/80 text-center">Loading trainers...</p>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : trainers.length === 0 ? (
          <p className="text-white/60 text-center">
            Trainers will appear here once added from the admin portal.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                className="group rounded-lg overflow-hidden bg-gray-900 border border-bright-purple/20 hover:border-bright-purple/50 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={trainer.imageUrl || '/placeholder.svg'}
                    alt={trainer.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="heading-md text-white mb-1">{trainer.name}</h3>
                  <p className="text-bright-purple text-sm font-oswald uppercase tracking-wider mb-4">
                    {trainer.role || 'Trainer'}
                  </p>

                  <div className="flex items-center gap-2 mb-4 text-white/60 text-sm">
                    <Award className="w-4 h-4" />
                    <span>Certified Fitness Professional</span>
                  </div>

                  <button className="w-full py-2 rounded-lg border border-bright-purple text-bright-purple hover:bg-bright-purple hover:text-black transition-all duration-200 text-sm font-semibold">
                    Book Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
