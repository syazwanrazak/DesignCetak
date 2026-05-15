'use client';

import { Product, SelectedOptions, OrderFormValues } from '@/types';

interface Props {
  product: Product;
  selected: SelectedOptions;
  form: OrderFormValues;
  uploadedFileName: string;
  waUrl: string;
  onClose: () => void;
}

export default function OrderSummaryModal({ product, selected, form, uploadedFileName, waUrl, onClose }: Props) {
  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="bg-ink-900 px-6 py-4 flex items-center justify-between">
          <h3 className="text-white font-black flex items-center gap-2">
            <i className="fa fa-clipboard-check text-brand-400" /> Ringkasan Order
          </h3>
          <button onClick={onClose} className="text-ink-400 hover:text-white transition-colors">
            <i className="fa fa-times" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="bg-ink-50 rounded-xl p-4 border border-ink-100">
            <p className="text-xs font-black text-ink-400 uppercase tracking-wider mb-1">Produk</p>
            <p className="font-black text-ink-900">{product.name}</p>
            <p className="text-brand-600 font-black text-sm mt-1">{product.price}</p>
          </div>

          {Object.entries(selected).length > 0 && (
            <div className="bg-ink-50 rounded-xl p-4 border border-ink-100">
              <p className="text-xs font-black text-ink-400 uppercase tracking-wider mb-2">Pilihan</p>
              {Object.entries(selected).map(([k, v]) => (
                <div key={k} className="flex justify-between text-sm py-1">
                  <span className="text-ink-500">{k}</span>
                  <span className="font-bold text-ink-800">{v}</span>
                </div>
              ))}
            </div>
          )}

          <div className="bg-ink-50 rounded-xl p-4 border border-ink-100 space-y-2">
            <p className="text-xs font-black text-ink-400 uppercase tracking-wider mb-2">Maklumat</p>
            {[
              { label: 'Nama', value: form.name || '-' },
              { label: 'No. Tel', value: form.phone || '-' },
              { label: 'Kuantiti', value: form.quantity || '-' },
              { label: 'Nota', value: form.notes || '-' },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-ink-500">{label}</span>
                <span className="font-bold text-ink-800 text-right max-w-[60%]">{value}</span>
              </div>
            ))}
            {uploadedFileName && (
              <div className="flex justify-between text-sm">
                <span className="text-ink-500">Fail Design</span>
                <span className="font-bold text-ink-800 truncate max-w-[60%]">{uploadedFileName}</span>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-ink-200 text-ink-500 font-bold text-sm hover:bg-ink-50 transition-colors">
            Semak Semula
          </button>
          <a href={waUrl} target="_blank" rel="noreferrer" onClick={onClose}
            className="flex-1 py-3 bg-green-500 hover:bg-green-400 text-white font-black rounded-xl flex items-center justify-center gap-2 transition-all text-sm">
            <i className="fab fa-whatsapp text-lg" /> Hantar Order
          </a>
        </div>
      </div>
    </div>
  );
}
