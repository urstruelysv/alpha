'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialIcons from './social-icons';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Packages', href: '#packages' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
];

export default function Footer() {
  return (
    <footer className="border-t border-bright-purple/20 py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-bright-purple rounded-lg flex items-center justify-center">
                <span className="font-oswald font-bold text-black">AF</span>
              </div>
              <span className="font-oswald font-bold text-lg text-white">Alpha Fitness</span>
            </Link>
            <p className="text-white/60 text-sm mb-6">
              Shadnagar's largest and most advanced fitness center. Join our community and transform your life.
            </p>
            <SocialIcons />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-oswald font-semibold text-white mb-4">Quick Links</h3>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-white/70 hover:text-bright-purple transition-colors text-sm">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-oswald font-semibold text-white mb-4">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-bright-purple mt-1 flex-shrink-0" />
                <p className="text-white/70">Shadnagar, Telangana, India</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-bright-purple mt-1 flex-shrink-0" />
                <p className="text-white/70">+91 9876 543 210</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-bright-purple mt-1 flex-shrink-0" />
                <p className="text-white/70">info @alphafitness.in</p>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-oswald font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-white/60 text-sm mb-4">Stay updated with our latest offers and news.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-bright-purple/30 text-white placeholder-white/40 focus:outline-none focus:border-bright-purple"
              />
              <button className="px-4 py-2 bg-bright-purple text-black font-semibold rounded-lg hover:bg-bright-purple/90">
                Go
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-bright-purple/20 pt-8 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Aethos vison labs. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
