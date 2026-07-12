'use client';

import { Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: 'Private Personal Training',
    vibe: '1:1 coaching, zero guesswork',
  },
  {
    title: 'Strength & Performance',
    vibe: 'Train like an athlete',
  },
  {
    title: 'Body Transformation',
    vibe: 'Results you can see',
  },
  {
    title: 'Nutrition Coaching',
    vibe: 'Real food, real results',
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
            <Card key={service.title}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.vibe}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Wide Card */}
        <Card className="mt-6">
          <CardContent className="flex items-center p-6">
            <div className="w-[40%]">
              <CardTitle>Explore Every Program</CardTitle>
              <CardDescription>From mobility to community events — see the full lineup</CardDescription>
            </div>
            <div className="w-[60%] flex justify-end">
              <Button>Explore All</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
