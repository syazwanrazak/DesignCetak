import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Kami – Kedai Printing Shah Alam',
  description: 'DesignCetak ialah kedai printing terpercaya di Shah Alam, Selangor. Kami menyediakan perkhidmatan percetakan pantas dan berkualiti — cop getah, banner, kad bisnes, flyers & lebih.',
  alternates: { canonical: 'https://designcetak.com/about' },
  openGraph: {
    title: 'Tentang Kami – DesignCetak Shah Alam',
    description: 'Kenali DesignCetak — kedai printing terpercaya di Shah Alam, Selangor. Kualiti terjamin, harga mampu milik, siap pantas.',
    url: 'https://designcetak.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f9f7f0' }}>
      <div className="page-header">
        <div className="max-w-6xl mx-auto px-4">
          <div className="yellow-rule" />
          <h1 className="text-3xl font-black text-white">Tentang Kami</h1>
          <p className="text-ink-400 text-sm mt-1">Kenali lebih lanjut tentang Design &amp; Cetak</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="bg-white rounded-2xl p-8 border border-ink-100 shadow-sm">
          <h2 className="text-2xl font-black text-ink-900 mb-4">Cerita Kami</h2>
          <p className="text-ink-500 leading-relaxed mb-4">Design &amp; Cetak telah berkhidmat kepada pelanggan di seluruh Malaysia dengan perkhidmatan percetakan berkualiti tinggi. Dari permulaan yang sederhana, kami telah berkembang menjadi rakan percetakan yang dipercayai oleh ratusan pelanggan — dari peniaga kecil hingga syarikat besar.</p>
          <p className="text-ink-500 leading-relaxed">Kami pakar dalam masa pemprosesan yang pantas tanpa mengorbankan kualiti. Sama ada anda perlukan cop getah secara urgent, batch kad bisnes, atau banner besar untuk acara — kami sedia membantu.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            { icon: 'fa-bullseye', title: 'Misi Kami', desc: 'Menyediakan perkhidmatan percetakan yang pantas, berkualiti dan mampu milik untuk membantu idea pelanggan menjadi kenyataan.' },
            { icon: 'fa-eye', title: 'Visi Kami', desc: 'Menjadi syarikat percetakan pilihan utama di Malaysia yang dikenali dengan kualiti, kelajuan dan perkhidmatan pelanggan yang cemerlang.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-ink-100 shadow-sm">
              <div className="w-10 h-10 bg-brand-400/20 rounded-xl flex items-center justify-center mb-4">
                <i className={`fa ${icon} text-brand-600`} />
              </div>
              <h3 className="font-black text-ink-900 mb-2">{title}</h3>
              <p className="text-ink-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 border border-ink-100 shadow-sm">
          <h2 className="text-xl font-black text-ink-900 mb-6">Mengapa Pilih Kami</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: 'fa-bolt text-yellow-500', text: 'Masa pemprosesan pantas — urgent order dialu-alukan' },
              { icon: 'fa-medal text-brand-500', text: 'Bahan berkualiti tinggi untuk hasil cetakan yang tahan lama' },
              { icon: 'fa-headset text-blue-500', text: 'Khidmat pelanggan mesra melalui WhatsApp 24/7' },
              { icon: 'fa-wallet text-green-500', text: 'Harga kompetitif dengan tiada caj tersembunyi' },
              { icon: 'fa-truck text-purple-500', text: 'Penghantaran ke seluruh Malaysia tersedia' },
              { icon: 'fa-recycle text-teal-500', text: 'Pilihan bahan mesra alam tersedia atas permintaan' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <i className={`fa ${icon} mt-0.5`} />
                <span className="text-ink-600 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
