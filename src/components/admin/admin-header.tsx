'use client';

import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
 
export default function AdminHeader() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      setLoading(false);
      window.location.href = '/admin/login';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-bright-purple/20">
      <div className="container-custom flex items-center justify-between h-16">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-bright-purple rounded-lg flex items-center justify-center">
            <span className="font-oswald font-bold text-black">AF</span>
          </div>
          <span className="font-oswald font-bold text-lg text-white">Admin</span>
        </Link>

        <div className="flex items-center gap-4">
          <button className="p-2 text-white/60 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            <LogOut size={18} />
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </header>
  );
}
