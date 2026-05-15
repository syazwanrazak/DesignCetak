'use client';

import { useState } from 'react';
import { Product, ProductOption } from '@/types';
import { fileToBase64 } from '@/lib/storage';

interface Props {
  product: Product;
  onSave: (updated: Product) => Promise<void>;
  onClose: () => void;
  isNew?: boolean;
}

interface DraftOption {
  label: string;
  choices: string; // comma-separated for editing
}

function toDraft(opts: ProductOption[]): DraftOption[] {
  return opts.map(o => ({ label: o.label, choices: o.choices.join(', ') }));
}

function fromDraft(drafts: DraftOption[]): ProductOption[] {
  return drafts
    .filter(d => d.label.trim())
    .map(d => ({
      label: d.label.trim(),
      choices: d.choices.split(',').map(c => c.trim()).filter(Boolean),
    }));
}

export default function EditProductModal({ product, onSave, onClose, isNew }: Props) {
  const [name, setName] = useState(product.name);
  const [cat, setCat] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [desc, setDesc] = useState(product.desc);
  const [fullDesc, setFullDesc] = useState(product.fullDesc);
  const [icon, setIcon] = useState(product.icon);
  const [color, setColor] = useState(product.color);
  const [bg, setBg] = useState(product.bg ?? '');
  const [draftOpts, setDraftOpts] = useState<DraftOption[]>(() => toDraft(product.options));
  const [imageUrl, setImageUrl] = useState(product.image ?? null);
  const [choiceImages, setChoiceImages] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    product.options.forEach(o => {
      if (o.choiceImages) {
        Object.entries(o.choiceImages).forEach(([ch, img]) => {
          map[`${o.label}|||${ch}`] = img;
        });
      }
    });
    return map;
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function handleProductImage(file: File) {
    if (file.size > 2 * 1024 * 1024) { alert('Max 2MB'); return; }
    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setImageUrl(base64);
    } finally {
      setUploading(false);
    }
  }

  async function handleChoiceImg(optLabel: string, choice: string, file: File) {
    if (file.size > 2 * 1024 * 1024) { alert('Max 2MB'); return; }
    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setChoiceImages(prev => ({ ...prev, [`${optLabel}|||${choice}`]: base64 }));
    } finally {
      setUploading(false);
    }
  }

  function removeChoiceImg(optLabel: string, choice: string) {
    setChoiceImages(prev => {
      const next = { ...prev };
      delete next[`${optLabel}|||${choice}`];
      return next;
    });
  }

  function addOption() {
    setDraftOpts(prev => [...prev, { label: '', choices: '' }]);
  }

  function removeOption(i: number) {
    setDraftOpts(prev => prev.filter((_, idx) => idx !== i));
  }

  function updateOption(i: number, field: keyof DraftOption, val: string) {
    setDraftOpts(prev => prev.map((o, idx) => idx === i ? { ...o, [field]: val } : o));
  }

  async function handleSave() {
    if (!name.trim() || !cat.trim()) {
      setError('Nama dan Kategori diperlukan.');
      return;
    }
    setError('');
    setSaving(true);
    try {
      const options: ProductOption[] = fromDraft(draftOpts).map(o => {
        const imgs: Record<string, string> = {};
        o.choices.forEach(ch => {
          const k = `${o.label}|||${ch}`;
          if (choiceImages[k]) imgs[ch] = choiceImages[k];
        });
        return { ...o, ...(Object.keys(imgs).length ? { choiceImages: imgs } : {}) };
      });
      await onSave({
        ...product,
        name: name.trim(),
        category: cat.trim(),
        price,
        desc,
        fullDesc,
        icon,
        color,
        bg,
        options,
        image: imageUrl,
      });
    } catch {
      setError('Gagal menyimpan. Cuba lagi.');
      setSaving(false);
    }
  }

  const parsedOpts = fromDraft(draftOpts);

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-ink-100 sticky top-0 bg-white z-10">
          <h3 className="text-base font-black text-ink-900 flex items-center gap-2">
            <i className={`fa ${isNew ? 'fa-plus' : 'fa-edit'} text-brand-500`} />
            {isNew ? 'Tambah Produk' : 'Edit Produk'}
          </h3>
          <button onClick={onClose} className="text-ink-400 hover:text-ink-900 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-ink-100 transition-colors">
            <i className="fa fa-times" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Product image */}
          <div>
            <label className="text-xs font-bold text-ink-500 mb-2 block uppercase tracking-wide">Gambar Produk</label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl border-2 border-ink-200 flex items-center justify-center bg-ink-50 overflow-hidden flex-shrink-0">
                {imageUrl
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                  : <i className="fa fa-image text-ink-300 text-2xl" />}
              </div>
              <div>
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-ink-100 hover:bg-ink-200 text-ink-700 font-bold text-xs rounded-lg transition-colors">
                  <i className="fa fa-upload" /> {uploading ? 'Uploading…' : 'Upload Gambar'}
                  <input type="file" accept="image/*" className="hidden"
                    onChange={e => { if (e.target.files?.[0]) handleProductImage(e.target.files[0]); }} />
                </label>
                <p className="text-xs text-ink-400 mt-1">JPG, PNG — max 2MB</p>
                {imageUrl && (
                  <button onClick={() => setImageUrl(null)} className="text-xs text-red-400 hover:text-red-600 font-bold mt-1 block">
                    <i className="fa fa-trash mr-1" />Buang gambar
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Core fields */}
          <div>
            <label className="text-xs font-bold text-ink-500 mb-1 block uppercase tracking-wide">Nama Produk *</label>
            <input value={name} onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2.5 border border-ink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-ink-500 mb-1 block uppercase tracking-wide">Kategori *</label>
              <input value={cat} onChange={e => setCat(e.target.value)}
                className="w-full px-3 py-2.5 border border-ink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-500 mb-1 block uppercase tracking-wide">Harga</label>
              <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Dari RM 10"
                className="w-full px-3 py-2.5 border border-ink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-ink-500 mb-1 block uppercase tracking-wide">Penerangan Ringkas</label>
            <input value={desc} onChange={e => setDesc(e.target.value)}
              className="w-full px-3 py-2.5 border border-ink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
          </div>

          <div>
            <label className="text-xs font-bold text-ink-500 mb-1 block uppercase tracking-wide">Penerangan Penuh</label>
            <textarea value={fullDesc} onChange={e => setFullDesc(e.target.value)} rows={3}
              className="w-full px-3 py-2.5 border border-ink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold text-ink-500 mb-1 block uppercase tracking-wide">Ikon FA</label>
              <input value={icon} onChange={e => setIcon(e.target.value)} placeholder="fa-print"
                className="w-full px-3 py-2.5 border border-ink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-500 mb-1 block uppercase tracking-wide">Warna Ikon</label>
              <input value={color} onChange={e => setColor(e.target.value)} placeholder="text-blue-500"
                className="w-full px-3 py-2.5 border border-ink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
            </div>
            <div>
              <label className="text-xs font-bold text-ink-500 mb-1 block uppercase tracking-wide">Warna Latar</label>
              <input value={bg} onChange={e => setBg(e.target.value)} placeholder="bg-blue-50"
                className="w-full px-3 py-2.5 border border-ink-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
            </div>
          </div>

          {/* Options builder */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-ink-500 uppercase tracking-wide">Pilihan Produk</label>
              <button onClick={addOption} type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-ink-100 hover:bg-ink-200 text-ink-700 font-bold text-xs rounded-lg transition-colors">
                <i className="fa fa-plus text-xs" /> Tambah Pilihan
              </button>
            </div>

            {draftOpts.length === 0 && (
              <p className="text-xs text-ink-400 italic py-2">Tiada pilihan. Klik &quot;Tambah Pilihan&quot; untuk tambah.</p>
            )}

            <div className="space-y-3">
              {draftOpts.map((opt, i) => (
                <div key={i} className="border border-ink-200 rounded-xl p-3 bg-ink-50">
                  <div className="flex gap-2 mb-2">
                    <input
                      value={opt.label}
                      onChange={e => updateOption(i, 'label', e.target.value)}
                      placeholder="Nama pilihan (cth: Saiz)"
                      className="flex-1 px-3 py-2 border border-ink-200 rounded-lg text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"
                    />
                    <button onClick={() => removeOption(i)} type="button"
                      className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                      <i className="fa fa-trash text-xs" />
                    </button>
                  </div>
                  <input
                    value={opt.choices}
                    onChange={e => updateOption(i, 'choices', e.target.value)}
                    placeholder="Pilihan, pisah dengan koma (cth: A4, A5, A3)"
                    className="w-full px-3 py-2 border border-ink-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white"
                  />
                  {opt.choices.trim() && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {opt.choices.split(',').map(c => c.trim()).filter(Boolean).map(ch => (
                        <span key={ch} className="px-2 py-0.5 bg-white border border-brand-300 text-brand-700 text-xs rounded-full font-bold">{ch}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Choice image uploads */}
          {parsedOpts.some(o => o.choices.length > 0) && (
            <div>
              <label className="text-xs font-bold text-ink-500 mb-2 block uppercase tracking-wide">Gambar Per Pilihan (pilihan)</label>
              <div className="border border-ink-200 rounded-xl p-4 bg-ink-50 space-y-4">
                {parsedOpts.map(opt => opt.choices.length > 0 && (
                  <div key={opt.label}>
                    <p className="text-xs font-black text-ink-600 mb-2">{opt.label}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {opt.choices.map(ch => {
                        const key = `${opt.label}|||${ch}`;
                        const img = choiceImages[key];
                        return (
                          <div key={ch} className="bg-white border border-ink-200 rounded-lg p-2 flex flex-col items-center gap-1.5">
                            <div className="w-full h-16 rounded-lg overflow-hidden bg-ink-50 border border-ink-100 flex items-center justify-center">
                              {img
                                // eslint-disable-next-line @next/next/no-img-element
                                ? <img src={img} alt={ch} className="w-full h-full object-cover" />
                                : <i className="fa fa-image text-ink-300 text-lg" />}
                            </div>
                            <span className="text-xs font-bold text-ink-700 text-center">{ch}</span>
                            <div className="flex gap-1">
                              <label className="cursor-pointer px-2 py-1 bg-brand-400 hover:bg-brand-300 text-ink-900 text-xs font-bold rounded-lg transition-colors">
                                {uploading ? '…' : 'Upload'}
                                <input type="file" accept="image/*" className="hidden"
                                  onChange={e => { if (e.target.files?.[0]) handleChoiceImg(opt.label, ch, e.target.files[0]); }} />
                              </label>
                              {img && (
                                <button onClick={() => removeChoiceImg(opt.label, ch)} type="button"
                                  className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-400 text-xs font-bold rounded-lg transition-colors">
                                  <i className="fa fa-times" />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p className="text-red-500 text-xs font-bold text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3">{error}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-ink-100 sticky bottom-0 bg-white">
          <button onClick={onClose} disabled={saving}
            className="flex-1 py-2.5 rounded-xl border border-ink-200 text-ink-500 font-bold text-sm hover:bg-ink-50 transition-colors disabled:opacity-50">
            Batal
          </button>
          <button onClick={handleSave} disabled={saving || uploading}
            className="flex-1 py-2.5 rounded-xl bg-brand-400 hover:bg-brand-300 text-ink-900 font-black text-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
            {saving
              ? <><i className="fa fa-spinner fa-spin" /> Menyimpan…</>
              : isNew ? <><i className="fa fa-plus" /> Tambah Produk</> : <><i className="fa fa-check" /> Simpan Perubahan</>}
          </button>
        </div>
      </div>
    </div>
  );
}
