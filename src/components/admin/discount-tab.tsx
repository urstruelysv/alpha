'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

type DiscountState = {
  percentage: number;
  days: number;
  hours: number;
  minutes: number;
};

export default function DiscountTab() {
  const [discount, setDiscount] = useState<DiscountState>({
    percentage: 50,
    days: 2,
    hours: 14,
    minutes: 32,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const res = await fetch('/api/admin/discount', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Failed to load discount settings');
        }
        const data = (await res.json()) as DiscountState;
        setDiscount(data);
      } catch (err) {
        console.error(err);
        setError('Could not load discount settings.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscount();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/admin/discount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discount),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to save');
      }

      setSuccess('Discount timer updated successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to save discount settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-white/80">Loading discount settings...</p>;
  }

  return (
    <div className="max-w-2xl">
      <h2 className="heading-md text-white mb-6">Edit Discount Timer</h2>

      <div className="bg-deep-purple/20 border border-bright-purple/30 rounded-lg p-8 space-y-6">
        <div>
          <label className="block text-white font-oswald font-semibold mb-2">
            Discount Percentage
          </label>
          <input
            type="number"
            value={discount.percentage}
            onChange={(e) =>
              setDiscount({ ...discount, percentage: parseInt(e.target.value || '0', 10) })
            }
            className="w-full px-4 py-3 rounded-lg bg-black border border-bright-purple/30 text-white focus:outline-none focus:border-bright-purple"
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {['days', 'hours', 'minutes'].map((unit) => (
            <div key={unit}>
              <label className="block text-white font-oswald font-semibold mb-2 capitalize">
                {unit}
              </label>
              <input
                type="number"
                value={discount[unit as keyof DiscountState]}
                onChange={(e) =>
                  setDiscount({
                    ...discount,
                    [unit]: parseInt(e.target.value || '0', 10),
                  })
                }
                className="w-full px-4 py-3 rounded-lg bg-black border border-bright-purple/30 text-white focus:outline-none focus:border-bright-purple"
              />
            </div>
          ))}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-emerald-400 text-sm">{success}</p>}

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
  );
}
