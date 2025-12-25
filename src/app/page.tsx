'use client';

import { useState, useEffect } from 'react';
import IntroScreen from '@/components/intro-screen';
import DiscountBanner from '@/components/discount-banner';
import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import ServicesSection from '@/components/services-section';
import PricingSection from '@/components/pricing-section';
import WomensSection from '@/components/womens-section';
import TrainersSection from '@/components/trainers-section';
import CommunitySection from '@/components/community-section';
import TestimonialsSection from '@/components/testimonials-section';
import FAQSection from '@/components/faq-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  // Initialize state to true to avoid flash of content, useEffect will correct it.
  const [showIntro, setShowIntro] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (sessionStorage.getItem('introSeen') === 'true') {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('introSeen', 'true');
    setShowIntro(false);
  };

  // On the server or before hydration, we can show a loading state or the intro
  if (!isClient) {
    return <IntroScreen onComplete={() => {}} />;
  }

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <DiscountBanner />
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <WomensSection />
      <TrainersSection />
      <CommunitySection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}