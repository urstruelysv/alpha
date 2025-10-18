'use client';

import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Youtube, href: '#' },
];

export default function SocialIcons() {
  return (
    <div className="flex gap-4">
      {socialLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <a
            key={index}
            href={link.href}
            className="p-3 bg-deep-purple/20 rounded-full hover:bg-bright-purple/30 transition-colors"
            aria-label={`Follow us on ${Icon.displayName}`}
          >
            <Icon className="w-5 h-5 text-bright-purple" />
          </a>
        );
      })}
    </div>
  );
}
