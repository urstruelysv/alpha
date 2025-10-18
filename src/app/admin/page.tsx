'use client';

import { useState } from 'react';
import AdminHeader from '@/components/admin/admin-header';
import LeadsTab from '@/components/admin/leads-tab';
import PackagesTab from '@/components/admin/packages-tab';
import DiscountTab from '@/components/admin/discount-tab';
import GalleryTab from '@/components/admin/gallery-tab';
import TestimonialsTab from '@/components/admin/testimonials-tab';

type TabType = 'leads' | 'packages' | 'discount' | 'gallery' | 'testimonials';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('leads');

  const tabs = [
    { id: 'leads', label: 'Leads' },
    { id: 'packages', label: 'Packages' },
    { id: 'discount', label: 'Discount Timer' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Testimonials' },
  ];

  return (
    <div className="min-h-screen bg-black">
      <AdminHeader />

      <div className="container-custom py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-bright-purple/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-3 font-oswald font-semibold transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-bright-purple text-bright-purple'
                  : 'border-transparent text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'leads' && <LeadsTab />}
          {activeTab === 'packages' && <PackagesTab />}
          {activeTab === 'discount' && <DiscountTab />}
          {activeTab === 'gallery' && <GalleryTab />}
          {activeTab === 'testimonials' && <TestimonialsTab />}
        </div>
      </div>
    </div>
  );
}
