'use client';

import { useState, Suspense } from 'react';
import { LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function AdminLoginForm() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || 'Login failed. Please check your credentials.');
        return;
      }

      const redirectTo = searchParams.get('redirect') || '/admin';
      router.push(redirectTo);
    } catch (err) {
      console.error('Admin login failed', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
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
            disabled={isSubmitting}
            className="w-full py-3 bg-bright-purple text-black font-semibold rounded-lg hover:bg-bright-purple/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-white/60 text-sm mt-6">
          Admin access is restricted. Contact the site owner if you need credentials.
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

export default function AdminLogin() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}
