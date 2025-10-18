'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What are your membership options?',
    answer: 'We offer flexible membership plans: 1 Month, 3 Months, 6 Months, and Personal Training packages. Each plan includes full gym access and varies in additional benefits.',
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes! We offer a free trial period for new members. You can experience our facilities and meet our trainers before committing to a membership.',
  },
  {
    question: 'What are your operating hours?',
    answer: 'Alpha Fitness is open 24/7 for all members. We have staff on-site during peak hours (6 AM - 10 PM) for assistance and guidance.',
  },
  {
    question: 'Do you have women-only training hours?',
    answer: 'Yes, we have dedicated women-only training hours from 6 AM - 8 AM and 6 PM - 8 PM on weekdays. Our female trainers are available during these times.',
  },
  {
    question: 'What equipment do you have?',
    answer: 'We have state-of-the-art equipment including free weights, cardio machines, strength training equipment, functional training area, and a dedicated yoga studio.',
  },
  {
    question: 'Can I cancel my membership anytime?',
    answer: 'Yes, you can cancel your membership with 30 days notice. No hidden charges or long-term contracts required.',
  },
  {
    question: 'Do you offer nutrition guidance?',
    answer: 'Yes, our certified nutritionists provide personalized nutrition plans and guidance. This is included in our 3-month and 6-month plans.',
  },
  {
    question: 'How do I book a session with a trainer?',
    answer: 'You can book sessions through our website, mobile app, or by visiting our reception desk. We offer flexible scheduling to fit your lifestyle.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-deep-purple/5">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-body text-white/60 max-w-2xl mx-auto">
            Find answers to common questions about Alpha Fitness
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-bright-purple/20 rounded-lg overflow-hidden bg-black hover:border-bright-purple/50 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-deep-purple/20 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="text-left font-oswald font-semibold text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-bright-purple flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-deep-purple/10 border-t border-bright-purple/20">
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
