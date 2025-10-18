'use client';

import { useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';

interface Package {
  id: number;
  name: string;
  price: string;
  duration: string;
  features: string[];
}

const mockPackages: Package[] = [
  {
    id: 1,
    name: '1 Month',
    price: '₹2,999',
    duration: '1 month',
    features: ['Full gym access', 'Locker facility', 'Basic equipment training'],
  },
  {
    id: 2,
    name: '3 Months',
    price: '₹7,999',
    duration: '3 months',
    features: ['Full gym access', 'Equipment training', '2 free sessions'],
  },
];

export default function PackagesTab() {
  const [packages, setPackages] = useState<Package[]>(mockPackages);
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="heading-md text-white">Manage Packages</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-bright-purple text-black font-semibold rounded-lg hover:bg-bright-purple/90 transition-colors">
          <Plus size={18} />
          Add Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-deep-purple/20 border border-bright-purple/30 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="heading-md text-white">{pkg.name}</h3>
                <p className="text-bright-purple font-oswald font-semibold">{pkg.price}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-bright-purple hover:bg-bright-purple/20 rounded transition-colors">
                  <Edit2 size={18} />
                </button>
                <button className="p-2 text-red-500 hover:bg-red-500/20 rounded transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <p className="text-white/60 text-sm mb-4">{pkg.duration}</p>

            <div className="space-y-2">
              {pkg.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-white/70 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-bright-purple" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
