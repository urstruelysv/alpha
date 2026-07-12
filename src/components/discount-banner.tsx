'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

type DiscountConfig = {
  active: boolean;
  percentage: number;
  endTime: string | null;
  bannerText: string;
};


const formatRemainingTime = (endTime: string | null): string => {
  if (!endTime) return '';

  const totalSeconds = Math.max(0, Math.floor((new Date(endTime).getTime() - Date.now()) / 1000));

  if (totalSeconds === 0) return 'Offer expired!';

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
};

export default function DiscountBanner() {
  const [discount, setDiscount] = useState<DiscountConfig | null>(null);
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const res = await fetch('/api/discount', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.active) {
            setDiscount(data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch discount:', err);
      }
    };

    fetchDiscount();
  }, []);

  useEffect(() => {
    if (discount?.active && discount.endTime) {
      const interval = setInterval(() => {
        const timeLeft = formatRemainingTime(discount.endTime);
        setRemainingTime(timeLeft);
        if (timeLeft === 'Offer expired!') {
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [discount]);

  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!discount) {
    return null;
  }

  const bannerText = discount.bannerText.replace('{percentage}', discount.percentage.toString());

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
      className="bg-gradient-to-r from-bright-purple to-purple-600 text-white py-4 px-4 text-center shadow-[0_10px_30px_rgba(168,85,247,0.3)] cursor-pointer hover:from-bright-purple/90 hover:to-purple-600/90 transition-all duration-300"
      onClick={handleClick}
    >
      <div className="container mx-auto flex items-center justify-center gap-4">
        <Tag className="w-6 h-6 flex-shrink-0" />
        <p className="font-semibold">
          {bannerText}
        </p>
        <p className="text-sm opacity-90 hidden sm:block">
          Offer ends in: <span className="font-mono font-bold tracking-wider">{remainingTime}</span>
        </p>
      </div>
    </motion.div>
  );
}
