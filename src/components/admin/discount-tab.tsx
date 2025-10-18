'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function DiscountTab() {
  const [discount, setDiscount] = useState({
    percentage: 50,
    days: 2,
    hours: 14,
    minutes: 32,
  });

  const handleSave = () => {
    console.log('Discount updated:', discount);
    alert('Discount timer updated successfully!');
  };

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
            onChange={(e) => setDiscount({ ...discount, percentage: parseInt(e.target.value) })}
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
                value={discount[unit as keyof typeof discount]}
                onChange={(e) =>
                  setDiscount({ ...discount, [unit]: parseInt(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-lg bg-black border border-bright-purple/30 text-white focus:outline-none focus:border-bright-purple"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-bright-purple text-black font-semibold rounded-lg hover:bg-bright-purple/90 transition-colors"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
