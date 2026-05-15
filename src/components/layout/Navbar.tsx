'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { WHATSAPP_NUMBER } from '@/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Produk' },
    { href: '/about', label: 'Tentang Kami' },
    { href: '/contact', label: 'Hubungi' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all ${scrolled ? 'bg-ink-900/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-ink-900'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 focus:outline-none group">
            <Image src="/images/designcetak.jpeg" alt="Design & Cetak logo" width={108} height={36} className="rounded-xl object-cover shadow-lg shadow-brand-400/25" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${pathname === href ? 'text-brand-400 bg-ink-800' : 'text-ink-300 hover:text-brand-400 hover:bg-ink-800'}`}>
                {label}
              </Link>
            ))}
            <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank"
              className="ml-2 px-4 py-2 bg-green-500 hover:bg-green-400 text-white font-black rounded-lg text-sm flex items-center gap-2 transition-colors">
              <i className="fab fa-whatsapp" /> WhatsApp
            </Link>
            <Link href="/admin" className="px-3 py-2 rounded-lg text-xs font-semibold text-ink-500 hover:text-ink-300 hover:bg-ink-800 transition-colors">
              <i className="fa fa-lock text-xs mr-1" />Admin
            </Link>
          </div>

          <button onClick={() => setMobileOpen(o => !o)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-ink-300 hover:text-brand-400 rounded-lg hover:bg-ink-800 transition-colors">
            <i className={`fa ${mobileOpen ? 'fa-times' : 'fa-bars'} text-lg`} />
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-ink-800 pt-3">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}
                className="block px-4 py-2.5 text-sm font-semibold text-ink-300 hover:bg-ink-800 hover:text-brand-400 rounded-lg">
                {label}
              </Link>
            ))}
            <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-black text-green-400 hover:bg-ink-800 rounded-lg">
              <i className="fab fa-whatsapp" /> WhatsApp Kami
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
