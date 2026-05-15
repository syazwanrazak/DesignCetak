import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Semua Produk Printing Shah Alam',
  description: 'Lihat semua produk printing DesignCetak di Shah Alam, Selangor — cop getah, banner, business card, flyers, baju T-shirt, sticker, keychain & lebih. Harga mampu milik, siap urgent!',
  alternates: { canonical: 'https://designcetak.com/products' },
  openGraph: {
    title: 'Semua Produk Printing Shah Alam – DesignCetak',
    description: 'Cop getah, banner, business card, flyers, baju T-shirt, sticker & lebih di Shah Alam. Harga mampu milik, siap urgent!',
    url: 'https://designcetak.com/products',
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
