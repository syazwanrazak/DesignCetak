import Link from 'next/link';
import Image from 'next/image';
import { WHATSAPP_NUMBER } from '@/constants';

const serviceLinks = [
  { label: 'Cop Getah Shah Alam', href: '/products/1' },
  { label: 'Business Card Shah Alam', href: '/products/4' },
  { label: 'T-Shirt Printing Shah Alam', href: '/products/5' },
  { label: 'Banner Printing Shah Alam', href: '/products/12' },
  { label: 'Sticker Printing Shah Alam', href: '/products/6' },
  { label: 'Flyers Shah Alam', href: '/products/8' },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 border-t border-ink-800 pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-12 mb-10">

          {/* Brand col */}
          <div>
            <div className="mb-3.5">
              <Image src="/images/designcetak.jpeg" alt="DesignCetak – Kedai Printing Shah Alam" width={108} height={36} className="rounded-xl object-cover" />
            </div>
            <p className="text-ink-400 text-[13px] leading-[1.65] max-w-[240px]">
              Kedai printing terbaik di Shah Alam, Selangor. Cop getah, banner, business card, t-shirt, sticker & flyers dengan harga murah dan servis cepat.
            </p>
            <div className="flex gap-2.5 mt-5">
              <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener"
                aria-label="WhatsApp DesignCetak"
                className="w-9 h-9 bg-ink-800 hover:bg-green-500 border border-ink-700 hover:border-green-500 rounded-[10px] flex items-center justify-center text-ink-400 hover:text-white transition-all text-sm">
                <i className="fab fa-whatsapp" />
              </Link>
              <Link href="#" aria-label="Facebook DesignCetak"
                className="w-9 h-9 bg-ink-800 hover:bg-blue-600 border border-ink-700 hover:border-blue-600 rounded-[10px] flex items-center justify-center text-ink-400 hover:text-white transition-all text-sm">
                <i className="fab fa-facebook-f" />
              </Link>
              <Link href="#" aria-label="Instagram DesignCetak"
                className="w-9 h-9 bg-ink-800 hover:bg-pink-600 border border-ink-700 hover:border-pink-600 rounded-[10px] flex items-center justify-center text-ink-400 hover:text-white transition-all text-sm">
                <i className="fab fa-instagram" />
              </Link>
            </div>
          </div>

          {/* Services col */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4">Perkhidmatan</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-[13px] text-ink-400 hover:text-brand-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4">Hubungi Kami</h4>
            <div className="space-y-3">
              {[
                { icon: 'fab fa-whatsapp text-green-400', content: <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener" className="hover:text-brand-400 transition-colors">+60 11-1052 8685</Link> },
                { icon: 'fa fa-clock text-brand-400', content: <span>Isnin – Sabtu, 9am – 6pm</span> },
                { icon: 'fa fa-map-marker-alt text-brand-400', content: <span>Shah Alam, Selangor, Malaysia</span> },
                { icon: 'fa fa-truck text-brand-400', content: <span>Penghantaran ke seluruh Malaysia</span> },
              ].map(({ icon, content }, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[13px] text-ink-400">
                  <i className={`${icon} w-4 text-center`} />
                  {content}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-ink-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-ink-500 text-xs">© {new Date().getFullYear()} DesignCetak. Hak cipta terpelihara. Kedai Printing Shah Alam.</p>
          <div className="flex gap-5 text-xs text-ink-500">
            <Link href="/about" className="hover:text-ink-300 transition-colors">Tentang Kami</Link>
            <Link href="/contact" className="hover:text-ink-300 transition-colors">Hubungi</Link>
            <Link href="/admin" className="hover:text-ink-300 transition-colors">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
