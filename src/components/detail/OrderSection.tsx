'use client';

import { useState, useRef } from 'react';
import { Product, SelectedOptions, OrderFormValues } from '@/types';
import { buildWaUrl } from '@/lib/whatsapp';
import OrderSummaryModal from './OrderSummaryModal';

export default function OrderSection({ product }: { product: Product }) {
  const [selected, setSelected] = useState<SelectedOptions>(() => {
    const init: SelectedOptions = {};
    product.options.forEach(o => { if (o.choices[0]) init[o.label] = o.choices[0]; });
    return init;
  });
  const [form, setForm] = useState<OrderFormValues>({ name: '', phone: '', quantity: '', notes: '' });
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const waUrl = buildWaUrl(product, selected, form, uploadedFile?.name ?? '');

  function selectOption(label: string, choice: string) {
    setSelected(s => ({ ...s, [label]: choice }));
  }

  function handleFile(file: File) {
    if (file.size > 50 * 1024 * 1024) { alert('Fail terlalu besar! Max 50MB'); return; }
    setUploadedFile(file);
  }

  return (
    <div className="p-6">
      <h3 className="font-black text-ink-900 mb-5 text-base flex items-center gap-2">
        <span className="w-6 h-6 bg-brand-400 rounded-lg flex items-center justify-center">
          <i className="fa fa-clipboard-list text-ink-900 text-xs" />
        </span>
        Butiran Order
      </h3>

      {/* Options */}
      {product.options.map(opt => (
        <div key={opt.label} className="mb-5">
          <label className="block text-sm font-black text-ink-700 mb-2">{opt.label}</label>
          <div className="flex flex-wrap gap-2">
            {opt.choices.map(ch => {
              const img = opt.choiceImages?.[ch];
              const isActive = selected[opt.label] === ch;
              if (img) {
                return (
                  <button key={ch} type="button" onClick={() => selectOption(opt.label, ch)}
                    className={`border rounded-xl overflow-hidden flex flex-col items-center transition-all ${isActive ? 'border-brand-400 ring-2 ring-brand-400' : 'border-ink-200 hover:border-brand-400'}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={ch} className="w-40 h-32 object-cover" />
                    <span className={`px-2 py-1.5 w-full text-center text-xs font-bold ${isActive ? 'bg-brand-400 text-ink-900' : 'bg-white text-ink-500'}`}>{ch}</span>
                  </button>
                );
              }
              return (
                <button key={ch} type="button" onClick={() => selectOption(opt.label, ch)}
                  className={`px-3 py-1.5 border rounded-lg text-xs font-bold transition-all ${isActive ? 'bg-brand-400 text-ink-900 border-brand-400' : 'bg-white text-ink-500 border-ink-200 hover:border-brand-400'}`}>
                  {ch}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Form fields */}
      <div className="space-y-4">
        {[
          { id: 'name', label: 'Nama Penuh', placeholder: 'cth. Ahmad bin Ali', type: 'text', required: true },
          { id: 'phone', label: 'No. Telefon', placeholder: 'cth. 011-10528685', type: 'tel', required: true },
          { id: 'quantity', label: 'Kuantiti', placeholder: 'cth. 100', type: 'number', required: true },
        ].map(({ id, label, placeholder, type, required }) => (
          <div key={id}>
            <label className="block text-sm font-bold text-ink-700 mb-1.5">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input type={type} placeholder={placeholder}
              value={form[id as keyof OrderFormValues]}
              onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
              className="w-full px-4 py-2.5 border border-ink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
          </div>
        ))}

        <div>
          <label className="block text-sm font-bold text-ink-700 mb-1.5">Nota / Arahan Khas</label>
          <textarea rows={3} placeholder="cth. finish matte, saiz tertentu, warna khusus…"
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            className="w-full px-4 py-2.5 border border-ink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none" />
        </div>

        {/* File upload */}
        <div>
          <label className="block text-sm font-bold text-ink-700 mb-1.5">Muat Naik Fail Design (optional)</label>
          <div
            className={`upload-zone rounded-xl p-6 text-center cursor-pointer ${isDragging ? 'dragover' : ''}`}
            onClick={() => fileRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}>
            <i className="fa fa-cloud-upload-alt text-3xl text-ink-300 mb-2" />
            <p className="text-sm text-ink-500 font-semibold">Klik atau drag fail ke sini</p>
            <p className="text-xs text-ink-300 mt-1">JPG, PNG, PDF, AI, CDR sehingga 50MB</p>
            <input ref={fileRef} type="file" className="hidden"
              accept=".jpg,.jpeg,.png,.pdf,.ai,.cdr,.eps,.svg"
              onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
          </div>
          {uploadedFile && (
            <div className="mt-3 flex items-center gap-3 bg-ink-50 rounded-xl p-3 border border-ink-100">
              <i className="fa fa-file-alt text-3xl text-ink-300" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-ink-700 truncate">{uploadedFile.name}</p>
                <p className="text-xs text-ink-400">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button onClick={() => { setUploadedFile(null); if (fileRef.current) fileRef.current.value = ''; }}
                className="text-red-400 hover:text-red-600 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors">
                <i className="fa fa-times text-sm" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button onClick={() => setShowModal(true)}
          className="flex-1 py-3 bg-brand-400 hover:bg-brand-300 text-ink-900 font-black rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-400/20 text-sm">
          <i className="fa fa-eye" /> Preview Order
        </button>
        <a href={waUrl} target="_blank" rel="noreferrer"
          className="px-5 py-3 bg-green-500 hover:bg-green-400 text-white rounded-xl flex items-center justify-center gap-2 transition-all text-sm font-black">
          <i className="fab fa-whatsapp text-xl" />
        </a>
      </div>

      {showModal && (
        <OrderSummaryModal
          product={product}
          selected={selected}
          form={form}
          uploadedFileName={uploadedFile?.name ?? ''}
          waUrl={waUrl}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
