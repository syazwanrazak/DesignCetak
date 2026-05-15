import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';

export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link href={`/products/${p.id}`}
      className="hp-card bg-white border border-ink-100 rounded-2xl overflow-hidden flex flex-col hover:border-brand-400/40 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all group">
      <div className={`${p.bg || 'bg-gray-50'} flex items-center justify-center h-28 overflow-hidden`}>
        {p.image
          ? <Image src={p.image} alt={p.name} width={200} height={112} className="w-full h-full object-cover" />
          : <i className={`fa ${p.icon} ${p.color} text-5xl`} />}
      </div>
      <div className="p-4 flex flex-col flex-1">
      <div className="text-[11px] font-bold text-ink-300 uppercase tracking-wider mb-1">{p.category}</div>
      <h3 className="font-display font-bold text-ink-900 text-[15px] mb-1.5 leading-tight">{p.name}</h3>
      <p className="text-[12px] text-ink-400 leading-relaxed mb-4 flex-1 line-clamp-2">{p.desc}</p>
      <div className="flex items-center justify-between gap-2">
        <div>
          {(() => {
            const sep = p.price.includes(',') ? ',' : p.price.toLowerCase().includes('promotion') ? /promotion/i : null;
            if (!sep) return <div className="text-[13px] font-bold text-brand-600">{p.price}</div>;
            const [main, promo] = typeof sep === 'string'
              ? p.price.split(sep).map(s => s.trim())
              : p.price.split(/(?=promotion)/i).map(s => s.trim());
            return (
              <>
                <div className="text-[13px] font-bold text-brand-600">{main}</div>
                <div className="inline-flex items-center gap-1 mt-1.5 bg-green-50 border border-green-200 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <i className="fa fa-tag text-[9px]" /> {promo}
                </div>
              </>
            );
          })()}
        </div>
        <div className="w-7 h-7 bg-brand-400 group-hover:bg-brand-300 rounded-lg flex items-center justify-center text-ink-900 text-[11px] transition-colors flex-shrink-0">
          <i className="fa fa-arrow-right" />
        </div>
      </div>
      </div>
    </Link>
  );
}
