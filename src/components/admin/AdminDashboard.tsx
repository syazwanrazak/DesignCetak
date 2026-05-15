'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { getOrSeedProducts, saveProduct, deleteProduct as deleteFromFirestore } from '@/lib/firestore';
import EditProductModal from './EditProductModal';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    getOrSeedProducts()
      .then(p => setProducts(p.sort((a, b) => (a.order ?? 999) - (b.order ?? 999))))
      .finally(() => setLoading(false));
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  async function revalidatePages() {
    await fetch('/api/revalidate', { method: 'POST' });
  }

  function updateProducts(updated: Product[]) {
    setProducts(updated);
  }

  async function toggleFeatured(id: number) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    const updated = { ...p, featured: !p.featured };
    await saveProduct(updated);
    updateProducts(products.map(x => x.id === id ? updated : x));
    revalidatePages();
  }

  async function handleDelete(id: number) {
    if (!confirm('Padam produk ini?')) return;
    await deleteFromFirestore(id);
    updateProducts(products.filter(p => p.id !== id));
    revalidatePages();
    showToast('Produk dipadam');
  }

  async function handleSaveEdit(updated: Product) {
    await saveProduct(updated);
    updateProducts(products.map(p => p.id === updated.id ? updated : p));
    setEditingProduct(null);
    revalidatePages();
    showToast('Produk berjaya dikemas kini!');
  }

  function openAddProduct() {
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    setEditingProduct({
      id: newId,
      name: '',
      category: '',
      desc: '',
      fullDesc: '',
      icon: 'fa-print',
      color: 'text-brand-500',
      bg: 'bg-amber-50',
      price: '',
      featured: false,
      image: null,
      options: [],
    });
    setIsAddingProduct(true);
  }

  async function handleSaveNew(product: Product) {
    const withOrder = { ...product, order: products.length };
    await saveProduct(withOrder);
    updateProducts([...products, withOrder]);
    setEditingProduct(null);
    setIsAddingProduct(false);
    revalidatePages();
    showToast('Produk berjaya ditambah!');
  }

  async function moveProduct(index: number, direction: 'up' | 'down') {
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= products.length) return;
    const reordered = [...products];
    [reordered[index], reordered[swapIndex]] = [reordered[swapIndex], reordered[index]];
    const withOrder = reordered.map((p, i) => ({ ...p, order: i }));
    updateProducts(withOrder);
    try {
      await saveProduct(withOrder[index]);
      await saveProduct(withOrder[swapIndex]);
      revalidatePages();
      showToast('Susunan dikemas kini!');
    } catch (e) {
      console.error('Gagal simpan susunan:', e);
      showToast('Gagal simpan susunan. Cuba lagi.');
      updateProducts(products);
    }
  }

  const categories = new Set(products.map(p => p.category));

  return (
    <div className="min-h-screen bg-ink-900">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 bg-ink-800 text-white px-4 py-3 rounded-xl shadow-lg text-sm font-bold border border-ink-700">
          {toast}
        </div>
      )}

      <div className="page-header">
        <div className="max-w-6xl mx-auto px-4">
          <div className="yellow-rule" />
          <h1 className="text-3xl font-black text-white">Admin Panel</h1>
          <p className="text-ink-400 text-sm mt-1">Urus produk Design &amp; Cetak</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Jumlah Produk', value: products.length, icon: 'fa-box', color: 'text-brand-400' },
            { label: 'Kategori', value: categories.size, icon: 'fa-tags', color: 'text-blue-400' },
            { label: 'Featured', value: products.filter(p => p.featured).length, icon: 'fa-star', color: 'text-yellow-400' },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className="bg-ink-800 border border-ink-700 rounded-2xl p-4">
              <i className={`fa ${icon} ${color} text-xl mb-2`} />
              <div className="text-2xl font-black text-white">{value}</div>
              <div className="text-ink-400 text-xs mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Product list */}
        <div className="bg-ink-800 border border-ink-700 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-ink-700 flex items-center justify-between">
            <h2 className="text-white font-black">Senarai Produk</h2>
            <button onClick={openAddProduct}
              className="flex items-center gap-2 px-4 py-2 bg-brand-400 hover:bg-brand-300 text-ink-900 font-black text-xs rounded-xl transition-colors">
              <i className="fa fa-plus" /> Tambah Produk
            </button>
          </div>
          <div className="divide-y divide-ink-700">
            {loading && (
              <div className="px-6 py-8 text-center text-ink-400 text-sm">
                <i className="fa fa-spinner fa-spin mr-2" />Memuatkan produk…
              </div>
            )}
            {!loading && products.length === 0 && (
              <div className="px-6 py-8 text-center text-ink-400 text-sm">Tiada produk.</div>
            )}
            {products.map((p, index) => (
              <div key={p.id} className="px-6 py-4 flex items-center gap-4">
                {/* Order controls */}
                <div className="flex flex-col gap-0.5 flex-shrink-0">
                  <button onClick={() => moveProduct(index, 'up')} disabled={index === 0}
                    className="w-6 h-6 flex items-center justify-center text-ink-500 hover:text-white hover:bg-ink-600 rounded transition-colors disabled:opacity-20 disabled:cursor-not-allowed">
                    <i className="fa fa-chevron-up text-xs" />
                  </button>
                  <button onClick={() => moveProduct(index, 'down')} disabled={index === products.length - 1}
                    className="w-6 h-6 flex items-center justify-center text-ink-500 hover:text-white hover:bg-ink-600 rounded transition-colors disabled:opacity-20 disabled:cursor-not-allowed">
                    <i className="fa fa-chevron-down text-xs" />
                  </button>
                </div>
                <span className="text-ink-600 text-xs font-black w-4 text-center flex-shrink-0">{index + 1}</span>
                <div className={`w-10 h-10 ${p.bg || 'bg-gray-800'} rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                  {p.image
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-xl" />
                    : <i className={`fa ${p.icon} ${p.color} text-sm`} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-white text-sm">{p.name}</div>
                  <div className="text-xs text-ink-400">{p.category} · {p.price}</div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => toggleFeatured(p.id)}
                    className={`px-2 py-1 text-xs rounded-lg border transition-all font-black ${p.featured ? 'bg-brand-400 text-ink-900 border-brand-400' : 'text-ink-400 border-ink-600 hover:border-brand-400 hover:text-brand-400'}`}>
                    {p.featured ? '★ Featured' : 'Feature'}
                  </button>
                  <button onClick={() => setEditingProduct(p)}
                    className="w-8 h-8 flex items-center justify-center text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors">
                    <i className="fa fa-edit text-xs" />
                  </button>
                  <button onClick={() => handleDelete(p.id)}
                    className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors">
                    <i className="fa fa-trash text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          isNew={isAddingProduct}
          onSave={isAddingProduct ? handleSaveNew : handleSaveEdit}
          onClose={() => { setEditingProduct(null); setIsAddingProduct(false); }}
        />
      )}
    </div>
  );
}
