import type { Metadata } from 'next';
import Link from 'next/link';
import { WHATSAPP_NUMBER } from '@/constants';

export const metadata: Metadata = {
  title: 'Hubungi Kami – Kedai Printing Shah Alam',
  description: 'Hubungi DesignCetak di Shah Alam, Selangor melalui WhatsApp untuk sebut harga percuma. Buka Isnin–Sabtu, 9 pagi–6 petang. Respons dalam masa 1 jam!',
  alternates: { canonical: 'https://designcetak.com/contact' },
  openGraph: {
    title: 'Hubungi DesignCetak – Printing Shah Alam',
    description: 'WhatsApp kami untuk sebut harga percuma. Kedai printing di Shah Alam, Selangor. Buka Isnin–Sabtu 9am–6pm.',
    url: 'https://designcetak.com/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f9f7f0' }}>
      <div className="page-header">
        <div className="max-w-6xl mx-auto px-4">
          <div className="yellow-rule" />
          <h1 className="text-3xl font-black text-white">Hubungi Kami</h1>
          <p className="text-ink-400 text-sm mt-1">Kami sedia membantu anda</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: 'fab fa-whatsapp text-green-500', title: 'WhatsApp', value: '+60 11-1052 8685', href: `https://wa.me/${WHATSAPP_NUMBER}`, sub: 'Balas dalam masa 1 jam' },
            { icon: 'fa fa-clock text-brand-500', title: 'Waktu Operasi', value: 'Isnin – Sabtu', sub: '9:00 pagi – 6:00 petang' },
            { icon: 'fa fa-map-marker-alt text-red-500', title: 'Lokasi', value: 'Shah Alam, Selangor', sub: 'Penghantaran ke seluruh Malaysia' },
          ].map(({ icon, title, value, href, sub }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-ink-100 shadow-sm text-center">
              <div className="w-14 h-14 bg-ink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className={`${icon} text-2xl`} />
              </div>
              <h3 className="font-black text-ink-900 mb-1">{title}</h3>
              {href
                ? <Link href={href} target="_blank" className="text-brand-600 font-bold text-sm hover:text-brand-500">{value}</Link>
                : <p className="text-ink-700 font-bold text-sm">{value}</p>}
              <p className="text-ink-400 text-xs mt-1">{sub}</p>
            </div>
          ))}
        </div>

        <div className="bg-ink-900 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Hubungi Kami Sekarang</h2>
          <p className="text-ink-400 text-sm mb-6 max-w-md mx-auto">Dapatkan sebut harga percuma dalam masa beberapa minit. Kami sedia membantu menjadikan idea anda kenyataan.</p>
          <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank"
            className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-black rounded-xl transition-all shadow-lg text-sm">
            <i className="fab fa-whatsapp text-2xl" /> Mula Chat WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
}
