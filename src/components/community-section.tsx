'use client';

import { Users, Calendar, MapPin } from 'lucide-react';

const communityEvents = [
  {
    title: 'Monthly Fitness Challenge',
    date: 'Every 1st Saturday',
    attendees: '150+',
    image: '/placeholder.svg?height=250&width=300',
  },
  {
    title: 'Group Yoga Sessions',
    date: 'Weekdays 6 AM',
    attendees: '80+',
    image: '/placeholder.svg?height=250&width=300',
  },
  {
    title: 'Community Workout',
    date: 'Sundays 7 AM',
    attendees: '200+',
    image: '/placeholder.svg?height=250&width=300',
  },
  {
    title: 'Nutrition Workshops',
    date: 'Monthly',
    attendees: '60+',
    image: '/placeholder.svg?height=250&width=300',
  },
];

export default function CommunitySection() {
  return (
    <section id="community" className="py-20 bg-black">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-white mb-4">Join the Alpha Community</h2>
          <p className="text-body text-white/60 max-w-2xl mx-auto">
            Be part of a supportive community of fitness enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communityEvents.map((event, index) => (
            <div
              key={index}
              className="group rounded-lg overflow-hidden bg-deep-purple/10 border border-bright-purple/20 hover:border-bright-purple/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="heading-md text-white mb-3 text-lg">{event.title}</h3>

                <div className="space-y-2 text-sm text-white/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-bright-purple" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-bright-purple" />
                    <span>{event.attendees} members</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
