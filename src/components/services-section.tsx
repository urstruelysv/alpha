'use client';

import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: 'Private Personal Training',
    vibe: '1:1 coaching, zero guesswork',
    image: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=800',
  },
  {
    title: 'Strength & Performance',
    vibe: 'Train like an athlete',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800',
  },
  {
    title: 'Body Transformation',
    vibe: 'Results you can see',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
  },
  {
    title: 'Nutrition Coaching',
    vibe: 'Real food, real results',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-b from-black via-zinc-950 to-black"
    >
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
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="rounded-3xl border-0 bg-[radial-gradient(circle_at_center,#1a1510,#0a0a0a)] min-h-[400px] flex flex-col"
            >
              <CardHeader className="p-8 pb-0">
                <CardTitle className="text-2xl font-bold text-[#ececec]">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-[15px] text-[#a3a3a3] mt-2">
                  {service.vibe}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 mt-auto">
                <div className="relative aspect-video overflow-hidden rounded-xl [mask-image:radial-gradient(circle,black_60%,transparent_100%)]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Wide Card */}
        <Card className="mt-6 overflow-hidden rounded-3xl border-0 bg-[radial-gradient(circle_at_center,#1a1510,#0a0a0a)]">
          <CardContent className="flex items-center p-10">
            <div className="w-[40%]">
              <CardTitle className="text-2xl font-bold text-[#ececec]">Explore Every Program</CardTitle>
              <CardDescription className="text-[15px] text-[#a3a3a3] mt-2">From mobility to community events — see the full lineup</CardDescription>
              <Button className="mt-6">Explore All</Button>
            </div>
            <div className="w-[60%] h-64 relative overflow-hidden rounded-2xl ml-8 [mask-image:radial-gradient(circle,black_60%,transparent_100%)]">
              <Image
                src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800"
                alt="Community Gym"
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
