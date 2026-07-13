'use client';

import Image from 'next/image';
import { Heart } from 'lucide-react';

const testimonials = [
  {
    name: 'Keerthana Reddy',
    quote:
      'I feel safe here. Staff are present, the floor is respectful, and I train without looking over my shoulder.',
  },
  {
    name: 'Lavanya Goud',
    quote:
      'Best coaches in Shadnagar. They correct your form, push you hard, and treat you like family.',
  },
  {
    name: 'Sruthi Yadav',
    quote:
      'The community keeps me coming back. Coaches know your name, and the energy is serious, not scary.',
  },
];

export default function WomensSection() {
  return (
    <section id="womens-fitness" className="py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image - portrait 3:4 */}
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(168,85,247,0.2)]">
            <Image
              src="/womens-fitness.jpg"
              alt="Women training safely with coaches at Alpha Fitness Shadnagar"
              fill
              sizes="(max-width: 1024px) 90vw, 28rem"
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-deep-purple/30 to-transparent" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-bright-purple" />
              <span className="text-bright-purple font-oswald text-sm uppercase tracking-wider">
                Best Gym in Shadnagar for Women
              </span>
            </div>
            <h2 className="heading-lg text-white mb-6">
              Space Where You Belong
            </h2>
            <p className="text-body text-white/70 mb-8">
              Alpha is the best gym in Shadnagar for women who want to feel safe
              and train hard. A respectful floor. Coaches and staff who look out
              for you. A community that shows up with you. Walk in with confidence.
              Leave stronger every time.
            </p>

            <button className="btn-primary">Start Your Journey</button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900/80 to-black rounded-2xl p-8 border border-bright-purple/20 shadow-[0_20px_60px_rgba(168,85,247,0.15)]">
          <h3 className="heading-md text-white mb-8 text-center">
            Real Women. Real Stories.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-stretch">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="h-full flex flex-col items-center text-center"
              >
                <p className="italic text-white/70 text-lg leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-auto pt-6 font-bold text-brass-400 font-oswald">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
