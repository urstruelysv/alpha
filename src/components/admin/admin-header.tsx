'use client';

import { LogOut, Settings } from 'lucide-react';
import Link from 'next/link';

export default function AdminHeader() {
  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    window.location.href = '/admin/login';
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
            className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
