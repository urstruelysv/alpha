'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

type DiscountConfig = {
  active: boolean;
  percentage: number;
  endTime: string | null;
  bannerText: string;
};

type Duration = {
  days: number;
  hours: number;
  minutes: number;
};

const pluralize = (count: number, singular: string) => (count === 1 ? singular : `${singular}s`);

const formatRemainingTime = (endTime: string | null): string => {
  if (!endTime) return 'Not set';

  const totalSeconds = Math.max(0, Math.floor((new Date(endTime).getTime() - Date.now()) / 1000));
  
  if (totalSeconds === 0) return 'Expired';

  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} ${pluralize(days, 'day')}`);
  if (hours > 0) parts.push(`${hours} ${pluralize(hours, 'hr')}`);
  if (minutes > 0) parts.push(`${minutes} ${pluralize(minutes, 'min')}`);
  if (seconds > 0 && parts.length < 2) parts.push(`${seconds} ${pluralize(seconds, 'sec')}`);

  return parts.join(' ');
};

export default function DiscountTab() {
  const [discount, setDiscount] = useState<DiscountConfig | null>(null);
  const [duration, setDuration] = useState<Duration>({ days: 0, hours: 0, minutes: 0 });
  const [percentage, setPercentage] = useState(10);
  const [bannerText, setBannerText] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState('');

  const fetchDiscount = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/discount', { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to load discount settings');
      const data = (await res.json()) as DiscountConfig;
      setDiscount(data);
      setPercentage(data.percentage);
      setBannerText(data.bannerText);
    } catch (err) {
      console.error(err);
      setError('Could not load discount settings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscount();
  }, []);

  useEffect(() => {
    if (discount?.active && discount.endTime) {
      const interval = setInterval(() => {
        setRemainingTime(formatRemainingTime(discount.endTime));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setRemainingTime(formatRemainingTime(discount?.endTime || null));
    }
  }, [discount]);

  const handleSave = async () => {
    if (!discount) return;

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/admin/discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          active: discount.active,
          percentage,
          bannerText,
          ...duration,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to save');
      }
      
      setSuccess('Discount timer updated successfully! The new timer has started.');
      await fetchDiscount(); // Re-fetch to get the new endTime
    } catch (err) {
      console.error(err);
      setError('Failed to save discount settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = () => {
    if (discount) {
      const newDiscount = { ...discount, active: !discount.active };
      setDiscount(newDiscount);
      saveActiveState(newDiscount);
    }
  };

  const saveActiveState = async (currentDiscount: DiscountConfig) => {
    try {
      await fetch('/api/admin/discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...currentDiscount,
          percentage,
          bannerText,
          days: 0, hours: 0, minutes: 0,
        }),
      });
    } catch (err) {
      setError('Failed to update status.');
    }
  };

  if (loading) return <p className="text-white/80">Loading discount settings...</p>;
  if (!discount) return <p className="text-red-500">Could not load discount settings.</p>;

  return (
    <div className="max-w-2xl">
      <h2 className="heading-md text-white mb-6">Edit Discount Timer</h2>

      <div className="bg-deep-purple/20 border border-bright-purple/30 rounded-lg p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-oswald font-semibold">Discount Timer Status</h3>
            <p className={`text-sm ${discount.active ? 'text-emerald-400' : 'text-white/60'}`}>
              {discount.active ? `Active - Time Remaining: ${remainingTime}` : 'Inactive'}
            </p>
          </div>
          <button
            onClick={handleToggleActive}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-bright-purple focus:ring-offset-2 focus:ring-offset-deep-purple ${discount.active ? 'bg-bright-purple' : 'bg-zinc-700'}`}
          >
            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${discount.active ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-white font-oswald font-semibold mb-2">Banner Text</label>
            <input
              type="text"
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black border border-bright-purple/30 text-white focus:outline-none focus:border-bright-purple"
              placeholder="e.g. {percentage}% OFF for new members!"
            />
            <p className="text-sm text-white/60 mt-1">Use {'{percentage}'} as a placeholder for the discount percentage.</p>
          </div>

          <div>
            <label className="block text-white font-oswald font-semibold mb-2">Discount Percentage</label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(parseInt(e.target.value || '0', 10))}
              className="w-full px-4 py-3 rounded-lg bg-black border border-bright-purple/30 text-white focus:outline-none focus:border-bright-purple"
            />
          </div>

          <div>
            <label className="block text-white font-oswald font-semibold mb-2">Set New Timer Duration</label>
            <p className="text-sm text-white/60 mb-2">Set a duration and click "Save Changes" to start a new countdown. This will override the current timer.</p>
            <div className="grid grid-cols-3 gap-4">
              {(Object.keys(duration) as Array<keyof Duration>).map((unit) => (
                <div key={unit}>
                  <label className="block text-white font-oswald font-semibold mb-1 capitalize text-sm">{unit}</label>
                  <input
                    type="number"
                    value={duration[unit]}
                    onChange={(e) => setDuration({ ...duration, [unit]: parseInt(e.target.value || '0', 10) })}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-bright-purple/30 text-white focus:outline-none focus:border-bright-purple"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-emerald-400 text-sm">{success}</p>}

        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-bright-purple text-black font-semibold rounded-lg hover:bg-bright-purple/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
