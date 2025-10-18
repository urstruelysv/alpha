'use client';

import { useState } from 'react';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo authentication
    if (credentials.email === 'admin@alphafitness.in' && credentials.password === 'admin123') {
      localStorage.setItem('admin-token', 'demo-token');
      window.location.href = '/admin';
    } else {
      setError('Invalid credentials. Use admin@alphafitness.in / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-bright-purple rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="font-oswald font-bold text-2xl text-black">AF</span>
          </div>
          <h1 className="heading-lg text-white">Admin Login</h1>
          <p className="text-white/60 mt-2">Alpha Fitness Management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white font-oswald font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-deep-purple/20 border border-bright-purple/30 text-white placeholder-white/40 focus:outline-none focus:border-bright-purple"
              placeholder="admin@alphafitness.in"
            />
          </div>

          <div>
            <label className="block text-white font-oswald font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-deep-purple/20 border border-bright-purple/30 text-white placeholder-white/40 focus:outline-none focus:border-bright-purple"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-bright-purple text-black font-semibold rounded-lg hover:bg-bright-purple/90 transition-colors flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            Login
          </button>
        </form>

        <p className="text-center text-white/60 text-sm mt-6">
          Demo credentials: admin@alphafitness.in / admin123
        </p>

        <div className="mt-8 pt-8 border-t border-bright-purple/20">
          <Link href="/" className="text-bright-purple hover:text-bright-purple/80 transition-colors text-center block">
            Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
