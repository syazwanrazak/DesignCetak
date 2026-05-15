'use client';

import { useState, useEffect } from 'react';
import { ADMIN_PASSWORD } from '@/constants';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('dc_admin') === '1') setIsLoggedIn(true);
  }, []);

  function login() {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('dc_admin', '1');
      setIsLoggedIn(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink-900 px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-brand-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <i className="fa fa-lock text-ink-900 text-2xl" />
            </div>
            <h1 className="text-xl font-black text-ink-900">Admin Panel</h1>
            <p className="text-ink-400 text-sm mt-1">Design &amp; Cetak</p>
          </div>
          <input
            type="password"
            placeholder="Kata laluan"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            className="w-full px-4 py-3 border border-ink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 mb-3"
          />
          {error && <p className="text-red-500 text-xs mb-3 text-center font-bold">Kata laluan salah!</p>}
          <button onClick={login}
            className="w-full py-3 bg-brand-400 hover:bg-brand-300 text-ink-900 font-black rounded-xl transition-colors">
            Log Masuk
          </button>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}
