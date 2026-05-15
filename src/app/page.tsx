import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts } from '@/lib/firestore';
import ProductCard from '@/components/products/ProductCard';
import { WHATSAPP_NUMBER } from '@/constants';

export const revalidate = false;

export const metadata: Metadata = {
  title: 'Kedai Printing Shah Alam | DesignCetak – Cetak Cepat & Murah',
  description: 'Kedai printing & percetakan terbaik di Shah Alam, Selangor. Cop getah urgent, banner, business card, flyers, baju T-shirt, sticker dan lebih — siap same day, harga mampu milik. Order via WhatsApp!',
  alternates: { canonical: 'https://designcetak.com' },
  openGraph: {
    title: 'Kedai Printing Shah Alam | DesignCetak – Cetak Cepat & Murah',
    description: 'Kedai printing terbaik di Shah Alam. Cop getah, banner, business card, flyers & lebih — siap urgent, harga mampu milik.',
    url: 'https://designcetak.com',
  },
};

const categories = [
  { icon: 'fa-stamp', label: 'Cop/Stamp' },
  { icon: 'fa-print', label: 'Print', featured: true },
  { icon: 'fa-id-card', label: 'Kad Bisnes' },
  { icon: 'fa-tshirt', label: 'T-Shirt' },
  { icon: 'fa-tags', label: 'Sticker' },
  { icon: 'fa-flag', label: 'Banner' },
  { icon: 'fa-heart', label: 'Kad Kahwin' },
  { icon: 'fa-scroll', label: 'Flyers' },
  { icon: 'fa-key', label: 'Keychain' },
];

const services = [
  { icon: 'fa-stamp', name: 'Cop Getah & Stamp', desc: 'Rubber stamp urgent, common seal, cop syarikat — siap dalam masa beberapa jam di Shah Alam.' },
  { icon: 'fa-id-card', name: 'Business Card Printing', desc: 'Kad bisnes matte, gloss, velvet. Standard 90×55mm. Dari 100 keping. Cetak murah Shah Alam.' },
  { icon: 'fa-tshirt', name: 'T-Shirt & Apparel', desc: 'Sublimation, screen print, DTF, embroidery. Uniform, family day, merchandise.' },
  { icon: 'fa-flag', name: 'Banner & Bunting', desc: 'Banner roll-up, bunting, backdrop untuk acara dan promosi. Urgent tersedia.' },
  { icon: 'fa-tags', name: 'Sticker & Label', desc: 'Stiker die-cut, bulat, segi empat. Bahan gloss, matte, chrome, transparent & kalis air.' },
  { icon: 'fa-scroll', name: 'Flyers & Brochure', desc: 'Flyers A4/A5/A6, brochure lipat, risalah promosi. Dari 100 pcs dengan harga terendah.' },
];

const whyUs = [
  { icon: 'fa-bolt', title: 'Proses Cepat & Urgent', text: 'Servis urgent tersedia. Cop getah boleh siap dalam masa beberapa jam sahaja. Kami faham keperluan last-minute anda.' },
  { icon: 'fa-star', title: 'Kualiti Terjamin', text: 'Menggunakan bahan dan mesin terbaik untuk hasil cetakan yang tajam, berwarna-warni dan tahan lama.' },
  { icon: 'fa-wallet', title: 'Harga Mampu Milik', text: 'Harga yang kompetitif tanpa mengorbankan kualiti. Sesuai untuk semua bajet — dari peniaga kecil hingga korporat.' },
  { icon: 'fa-headset', title: 'Khidmat Pelanggan 7 Hari', text: 'Balas WhatsApp dalam masa 1 jam. Kami sedia membantu dari konsultasi design hingga penghantaran.' },
  { icon: 'fa-truck', title: 'Penghantaran Seluruh Malaysia', text: 'Tidak perlu keluar — kami hantar terus ke pintu anda. Penghantaran ke seluruh Selangor & Malaysia.' },
  { icon: 'fa-map-marker-alt', title: 'Berlokasi di Shah Alam', text: 'Kedai fizikal di Shah Alam — boleh self-collect atau hubungi kami melalui WhatsApp untuk tempahan.' },
];

const steps = [
  { num: '1', title: 'Pilih Produk', text: 'Layari katalog kami dan pilih produk yang anda inginkan.' },
  { num: '2', title: 'WhatsApp Kami', text: 'Hantar design & spesifikasi melalui WhatsApp untuk sebut harga percuma.' },
  { num: '3', title: 'Bayaran & Cetak', text: 'Sahkan order dan kami mula proses cetakan segera.' },
  { num: '4', title: 'Terima Pesanan', text: 'Self-collect atau penghantaran ke seluruh Malaysia tersedia.' },
];

const reviews = [
  { text: '"Servis sangat cepat! Order cop getah urgent pagi, siap petang. Kualiti pun sangat memuaskan. Memang recommend DesignCetak!"', author: 'Ahmad Faiz', loc: 'Shah Alam, Selangor' },
  { text: '"Business card design cantik, harga pun berpatutan. Staff very helpful, bagi cadangan yang baik. Akan order lagi!"', author: 'Nurul Ain', loc: 'Petaling Jaya, Selangor' },
  { text: '"T-shirt printing untuk family day kami sangat cantik. Warna terang dan kain selesa. Delivery pun cepat. Terima kasih DesignCetak!"', author: 'Razif Hakim', loc: 'Klang, Selangor' },
];

export default async function HomePage() {
  const products = await getAllProducts();
  const featured = products.filter(p => p.featured).slice(0, 8);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-ink-900 min-h-screen flex items-center overflow-hidden" aria-label="Kedai Printing Shah Alam - DesignCetak">
        <div className="absolute inset-0 opacity-65" aria-hidden="true">
          <video autoPlay muted playsInline loop className="w-full h-full object-cover">
            <source src="https://res.cloudinary.com/dkzvaarij/video/upload/v1778828172/designcetak_tlcm3h.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-ink-900/30" aria-hidden="true" />

        <div className="relative max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-400/[0.12] border border-brand-400/30 rounded-full px-4 py-1.5 text-brand-400 text-[11px] font-bold tracking-widest uppercase mb-6">
              <span className="w-[7px] h-[7px] bg-brand-400 rounded-full animate-pulse" />
              Kedai Printing Shah Alam
            </div>
            <h1 className="font-display text-[clamp(36px,5vw,56px)] font-extrabold text-white leading-[1.1] mb-5">
              Cetak Cepat,<br /><span className="text-brand-400">Harga Mampu</span><br />Milik
            </h1>
            <p className="text-white/75 text-base max-w-[440px] mb-8 leading-[1.7]">
              Cop getah, banner, business card, baju, sticker dan lebih lagi — kami cetak semua dengan kualiti terbaik di Shah Alam. Servis urgent tersedia!
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products"
                className="px-7 py-3.5 bg-brand-400 hover:bg-brand-300 text-ink-900 font-extrabold rounded-xl flex items-center gap-2 transition-all shadow-xl shadow-brand-400/25 text-sm hover:-translate-y-px">
                Order Sekarang <i className="fa fa-arrow-right" />
              </Link>
              <Link href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20saya%20nak%20tanya%20pasal%20printing`} target="_blank" rel="noopener"
                className="px-7 py-3.5 bg-ink-800 hover:bg-ink-700 text-white font-extrabold rounded-xl flex items-center gap-2 transition-all border border-ink-700 text-sm">
                <i className="fab fa-whatsapp text-green-400 text-lg" /> Chat Kami
              </Link>
            </div>
            <div className="flex gap-8 mt-9">
              {[['500+', 'Happy Clients'], ['16+', 'Jenis Produk'], ['24h', 'Urgent Ready']].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-[26px] font-extrabold text-brand-400">{num}</div>
                  <div className="text-ink-400 text-[11px] mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:grid grid-cols-3 gap-[10px]" aria-hidden="true">
            {categories.map(({ icon, label, featured }) => (
              <Link key={label} href="/products"
                className={`rounded-2xl p-4 flex flex-col items-center gap-1.5 border transition-all opacity-70 hover:opacity-100 hover:-translate-y-0.5 ${
                  featured
                    ? 'bg-brand-400 border-brand-400 opacity-100'
                    : 'bg-ink-800 border-ink-700 hover:border-brand-400/50 hover:bg-ink-700'
                }`}>
                <i className={`fa ${icon} text-[22px] ${featured ? 'text-ink-900' : 'text-brand-400'}`} />
                <span className={`text-[11px] font-bold text-center ${featured ? 'text-ink-900' : 'text-ink-300'}`}>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="bg-brand-400 py-3.5 px-6" role="complementary" aria-label="Kenapa pilih kami">
        <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-10 flex-wrap">
          {[
            { icon: 'fa fa-bolt', text: 'Same-Day Urgent' },
            { icon: 'fa fa-map-marker-alt', text: 'Shah Alam' },
            { icon: 'fa fa-star', text: 'Kualiti Terjamin' },
            { icon: 'fab fa-whatsapp', text: 'Balas Dalam 1 Jam' },
            { icon: 'fa fa-truck', text: 'Penghantaran Seluruh Malaysia' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-[13px] font-bold text-ink-900">
              <i className={`${icon} text-base`} /> {text}
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-20 px-6" style={{ background: '#f9f7f0' }} aria-labelledby="products-heading">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <div className="yellow-rule" />
              <h2 className="font-display text-[clamp(24px,3vw,32px)] font-extrabold text-ink-900" id="products-heading">Produk Popular</h2>
              <p className="text-ink-400 text-[15px] mt-1.5">Perkhidmatan percetakan terlaris di Shah Alam</p>
            </div>
            <Link href="/products" className="text-brand-600 font-bold text-sm hover:text-brand-500 flex items-center gap-1 transition-colors">
              Lihat Semua <i className="fa fa-arrow-right text-brand-400" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 px-6 bg-ink-900" aria-labelledby="services-heading">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="yellow-rule mx-auto" />
            <h2 className="font-display text-[clamp(24px,3vw,32px)] font-extrabold text-white" id="services-heading">
              Semua Perkhidmatan Percetakan Shah Alam
            </h2>
            <p className="text-ink-400 text-[15px] mt-2">Kami menawarkan lebih 16 jenis produk percetakan berkualiti</p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-ink-700 rounded-2xl overflow-hidden">
            {services.map(({ icon, name, desc }) => (
              <div key={name} className="bg-ink-800 hover:bg-ink-700 p-8 transition-colors">
                <div className="w-12 h-12 bg-brand-400/[0.12] rounded-xl flex items-center justify-center mb-4">
                  <i className={`fa ${icon} text-brand-400 text-xl`} />
                </div>
                <h3 className="font-display font-bold text-white mb-2 text-base">{name}</h3>
                <p className="text-[13px] text-ink-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 px-6" style={{ background: '#f9f7f0' }} aria-labelledby="why-heading">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="yellow-rule mx-auto" />
            <h2 className="font-display text-[clamp(24px,3vw,32px)] font-extrabold text-ink-900" id="why-heading">
              Kenapa Pilih DesignCetak?
            </h2>
            <p className="text-ink-400 text-[15px] mt-1.5">Kedai printing Shah Alam yang anda boleh percaya</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {whyUs.map(({ icon, title, text }) => (
              <div key={title} className="bg-white border border-ink-100 rounded-2xl p-7 hover:border-brand-400/50 hover:shadow-[0_8px_24px_rgba(251,191,36,0.08)] transition-all">
                <div className="w-12 h-12 bg-brand-400/10 rounded-[14px] flex items-center justify-center mb-4">
                  <i className={`fa ${icon} text-brand-600 text-xl`} />
                </div>
                <h3 className="font-display font-bold text-ink-900 mb-2 text-base">{title}</h3>
                <p className="text-[13px] text-ink-500 leading-[1.65]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 px-6 bg-ink-900" aria-labelledby="process-heading">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="yellow-rule mx-auto" />
            <h2 className="font-display text-[clamp(24px,3vw,32px)] font-extrabold text-white" id="process-heading">
              Cara Order Semudah 1-2-3
            </h2>
            <p className="text-ink-400 text-[15px] mt-1.5">Proses order kami yang mudah dan pantas</p>
          </div>
          <div className="process-connector grid md:grid-cols-4 gap-6">
            {steps.map(({ num, title, text }) => (
              <div key={num} className="text-center relative z-[1]">
                <div className="w-12 h-12 bg-brand-400 rounded-full flex items-center justify-center font-display font-extrabold text-ink-900 text-lg mx-auto mb-4">
                  {num}
                </div>
                <h3 className="font-display font-bold text-white mb-2 text-[15px]">{title}</h3>
                <p className="text-[13px] text-ink-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-6" style={{ background: '#f9f7f0' }} aria-labelledby="reviews-heading">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="yellow-rule mx-auto" />
            <h2 className="font-display text-[clamp(24px,3vw,32px)] font-extrabold text-ink-900" id="reviews-heading">
              Apa Kata Pelanggan Kami
            </h2>
            <p className="text-ink-400 text-[15px] mt-1.5">500+ pelanggan berpuas hati di Shah Alam & seluruh Malaysia</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map(({ text, author, loc }) => (
              <div key={author} className="bg-white border border-ink-100 rounded-2xl p-6">
                <div className="text-brand-400 text-sm mb-3" aria-label="5 bintang">★★★★★</div>
                <p className="text-[14px] text-ink-600 leading-[1.65] mb-4 italic">{text}</p>
                <div className="font-bold text-[13px] text-ink-900">{author}</div>
                <div className="text-[12px] text-ink-400">{loc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-6" style={{ background: '#f9f7f0' }} aria-label="Hubungi DesignCetak sekarang">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-brand-400 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-[200px] h-[200px] bg-white/10 rounded-full pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-16 -left-8 w-[180px] h-[180px] bg-white/[0.08] rounded-full pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <h2 className="font-display text-[clamp(22px,3vw,30px)] font-extrabold text-ink-900 mb-2">Siap untuk order sekarang?</h2>
              <p className="text-[15px] text-ink-700">Hubungi kami melalui WhatsApp untuk sebut harga percuma dalam masa beberapa minit!</p>
            </div>
            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20DesignCetak%2C%20saya%20nak%20order%20printing%20di%20Shah%20Alam`}
              target="_blank" rel="noopener"
              className="relative px-8 py-4 bg-ink-900 text-brand-400 font-extrabold rounded-[14px] flex items-center gap-2.5 hover:bg-ink-700 transition-all shadow-xl text-[15px] whitespace-nowrap hover:-translate-y-0.5">
              <i className="fab fa-whatsapp text-green-400 text-[22px]" /> WhatsApp Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="pb-20 px-6 bg-ink-900" aria-labelledby="contact-heading">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center pt-20 mb-12">
            <div className="yellow-rule mx-auto" />
            <h2 className="font-display text-[clamp(24px,3vw,32px)] font-extrabold text-white" id="contact-heading">
              Lokasi & Hubungi Kami
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: 'fab fa-whatsapp text-green-500', title: 'WhatsApp', value: '+60 11-1052 8685', href: `https://wa.me/${WHATSAPP_NUMBER}`, sub: 'Balas dalam masa 1 jam' },
              { icon: 'fa fa-clock text-yellow-500', title: 'Waktu Operasi', value: 'Isnin – Sabtu', sub: '9:00 pagi – 6:00 petang' },
              { icon: 'fa fa-map-marker-alt text-red-500', title: 'Lokasi', value: 'Shah Alam, Selangor', sub: 'Penghantaran ke seluruh Malaysia' },
            ].map(({ icon, title, value, href, sub }) => (
              <div key={title} className="bg-white border border-ink-100 rounded-2xl p-7 text-center">
                <div className="w-14 h-14 bg-ink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className={`${icon} text-2xl`} />
                </div>
                <h3 className="font-bold text-ink-900 mb-1">{title}</h3>
                {href
                  ? <a href={href} target="_blank" rel="noopener" className="text-brand-600 font-bold text-sm hover:text-brand-500">{value}</a>
                  : <p className="text-ink-700 font-bold text-sm">{value}</p>}
                <p className="text-ink-400 text-xs mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
