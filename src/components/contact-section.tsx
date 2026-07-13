'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  package: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
    package: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // Optionally, you can read the error message from the response
        console.error('Failed to submit contact form', await res.text());
        return;
      }

      setSubmitSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
        package: '',
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-white mb-4">Ready to Start?</h2>
          <p className="text-body text-white/60 max-w-2xl mx-auto">
            Hit us up. First consultation is free. No commitment, just a real conversation about your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-bright-purple/20">
                  <Phone className="h-6 w-6 text-bright-purple" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-oswald font-semibold mb-1">Phone</h3>
                <p className="text-white/60">+91 91822 35921 / 86885 75759</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-bright-purple/20">
                  <Mail className="h-6 w-6 text-bright-purple" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-oswald font-semibold mb-1">Email</h3>
                <p className="text-white/60">alphafintness@gmail.com</p>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/8L7jPDTeRge4eF139?g_st=iw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 hover:opacity-80 transition-opacity"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-bright-purple/20">
                  <MapPin className="h-6 w-6 text-bright-purple" />
                </div>
              </div>
              <div>
                <h3 className="text-white font-oswald font-semibold mb-1">Location</h3>
                <p className="text-white/60">Alpha fitness center, Mahaboobnagar road, Shadnagar, Telangana</p>
              </div>
            </a>

            {/* WhatsApp Link */}
            <a
              href="https://wa.me/919182235921"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-zinc-900/50 border ${
                    errors.name ? 'border-red-500' : 'border-bright-purple/30'
                  } text-white placeholder-white/40 focus:outline-none focus:border-bright-purple focus:ring-2 focus:ring-bright-purple/30 transition-all duration-300`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-white font-semibold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-zinc-900/50 border ${
                      errors.phone ? 'border-red-500' : 'border-bright-purple/30'
                    } text-white placeholder-white/40 focus:outline-none focus:border-bright-purple focus:ring-2 focus:ring-bright-purple/30 transition-all duration-300`}
                    placeholder="10-digit number"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-zinc-900/50 border ${
                      errors.email ? 'border-red-500' : 'border-bright-purple/30'
                    } text-white placeholder-white/40 focus:outline-none focus:border-bright-purple focus:ring-2 focus:ring-bright-purple/30 transition-all duration-300`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="package" className="block text-white font-semibold mb-2">
                  Interested Package
                </label>
                <select
                  id="package"
                  name="package"
                  value={formData.package}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-900/50 border border-bright-purple/30 text-white focus:outline-none focus:border-bright-purple focus:ring-2 focus:ring-bright-purple/30 transition-all duration-300"
                >
                  <option value="">Select a package</option>
                  <option value="1-month">1 Month</option>
                  <option value="3-months">3 Months</option>
                  <option value="6-months">6 Months</option>
                  <option value="personal-training">Personal Training</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg bg-zinc-900/50 border ${
                    errors.message ? 'border-red-500' : 'border-bright-purple/30'
                  } text-white placeholder-white/40 focus:outline-none focus:border-bright-purple focus:ring-2 focus:ring-bright-purple/30 transition-all duration-300 resize-none`}
                  placeholder="Tell us about your fitness goals..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-bright-purple hover:bg-bright-purple/90 disabled:bg-bright-purple/50 text-black font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-[0_15px_40px_rgba(166,124,61,0.3)] flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitSuccess && (
                <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center">
                  Thank you! We&apos;ll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Location Link */}
        <div className="rounded-lg overflow-hidden h-96 border border-bright-purple/20 flex items-center justify-center bg-zinc-900/50">
          <a
            href="https://maps.app.goo.gl/8L7jPDTeRge4eF139?g_st=iw"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-4 text-bright-purple hover:text-white transition-colors"
          >
            <MapPin className="w-16 h-16" />
            <span className="text-xl font-semibold">View on Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  );
}
