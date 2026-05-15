'use client';

import { useState, useEffect } from 'react';
import { getAllProducts } from '@/lib/firestore';
import { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const q = query.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  return (
    <div className="min-h-screen" style={{ background: '#f9f7f0' }}>
      <div className="page-header">
        <div className="max-w-6xl mx-auto px-4">
          <div className="yellow-rule" />
          <h1 className="text-3xl font-black text-white">Semua Produk</h1>
          <p className="text-ink-400 text-sm mt-1">Pilih produk yang anda perlukan</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <i className="fa fa-search absolute left-4 top-1/2 -translate-y-1/2 text-ink-300" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-ink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeCategory === cat ? 'bg-brand-400 text-ink-900 shadow-lg shadow-brand-400/25' : 'bg-white text-ink-500 border border-ink-200 hover:border-brand-400 hover:text-brand-600'}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <i className="fa fa-search text-4xl text-ink-200 mb-4" />
            <p className="text-ink-400 font-bold">Tiada produk dijumpai</p>
            <p className="text-ink-300 text-sm mt-1">Cuba kata kunci atau kategori yang lain</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
