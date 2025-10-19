'use client';

import { Award, Dumbbell } from 'lucide-react';

const trainers = [
  {
    name: 'Rajesh Kumar',
    specialization: 'Strength & Conditioning',
    image: '/placeholder.svg?height=300&width=300',
    certifications: 'NASM, ACE',
  },
  {
    name: 'Priya Sharma',
    specialization: "Women's Fitness & Yoga",
    image: '/placeholder.svg?height=300&width=300',
    certifications: 'ISSA, RYT-200',
  },
  {
    name: 'Arjun Singh',
    specialization: 'Bodybuilding & Nutrition',
    image: '/placeholder.svg?height=300&width=300',
    certifications: 'IFBB, ISSN',
  },
  {
    name: 'Divya Patel',
    specialization: 'Cardio & Group Classes',
    image: '/placeholder.svg?height=300&width=300',
    certifications: 'ACE, NASM',
  },
  {
    name: 'Vikram Reddy',
    specialization: 'CrossFit & Functional Training',
    image: '/placeholder.svg?height=300&width=300',
    certifications: 'CrossFit L2, NASM',
  },
  {
    name: 'Neha Gupta',
    specialization: 'Rehabilitation & Physio',
    image: '/placeholder.svg?height=300&width=300',
    certifications: 'BPT, CSCS',
  },
];

export default function TrainersSection() {
  return (
    <section id="trainers" className="py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-white mb-4">Meet Our Expert Trainers</h2>
          <p className="text-body text-white/60 max-w-2xl mx-auto">
            Certified professionals dedicated to helping you achieve your fitness goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="group rounded-lg overflow-hidden bg-gray-900 border border-bright-purple/20 hover:border-bright-purple/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={trainer.image || "/placeholder.svg"}
                  alt={trainer.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="heading-md text-white mb-1">{trainer.name}</h3>
                <p className="text-bright-purple text-sm font-oswald uppercase tracking-wider mb-4">
                  {trainer.specialization}
                </p>

                <div className="flex items-center gap-2 mb-4 text-white/60 text-sm">
                  <Award className="w-4 h-4" />
                  <span>{trainer.certifications}</span>
                </div>

                <button className="w-full py-2 rounded-lg border border-bright-purple text-bright-purple hover:bg-bright-purple hover:text-black transition-all duration-200 text-sm font-semibold">
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
