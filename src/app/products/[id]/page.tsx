import { getAllProducts, getProductById } from '@/lib/firestore';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import OrderSection from '@/components/detail/OrderSection';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = false;
export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map(p => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProductById(Number(params.id));
  if (!product) return {};
  const title = `${product.name} Shah Alam – DesignCetak`;
  const description = `${product.desc} Dapatkan ${product.name} berkualiti di Shah Alam, Selangor. Harga dari ${product.price}. Order mudah via WhatsApp — siap pantas!`;
  return {
    title,
    description,
    alternates: { canonical: `https://designcetak.com/products/${params.id}` },
    openGraph: {
      title,
      description,
      url: `https://designcetak.com/products/${params.id}`,
      ...(product.image ? { images: [{ url: product.image, alt: product.name }] } : {}),
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(Number(params.id));
  if (!product) notFound();

  return (
    <div className="min-h-screen pt-6" style={{ background: '#f9f7f0' }}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/products" className="flex items-center gap-2 text-ink-400 hover:text-brand-500 text-sm mb-6 font-bold transition-colors">
          <i className="fa fa-arrow-left" /> Kembali ke Produk
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-ink-100 overflow-hidden">
          {/* Header */}
          <div className="bg-ink-900 p-6 border-b border-ink-800">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-ink-800 border border-ink-700 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                {product.image
                  ? <Image src={product.image} alt={product.name} width={64} height={64} className="w-full h-full object-cover rounded-2xl" />
                  : <i className={`fa ${product.icon} ${product.color} text-3xl`} />}
              </div>
              <div className="flex-1">
                <div className="text-xs font-black text-ink-400 uppercase tracking-widest mb-1">{product.category}</div>
                <h2 className="text-xl font-black text-white mb-1">{product.name}</h2>
                <p className="text-ink-300 text-sm leading-relaxed">{product.fullDesc || product.desc}</p>
                <div className="mt-3 inline-flex items-center gap-2 bg-brand-400/20 border border-brand-400/30 text-brand-300 text-sm font-black px-3 py-1.5 rounded-lg">
                  <i className="fa fa-tag text-brand-400" /> {product.price}
                </div>
              </div>
            </div>
          </div>

          {/* Order form — client component */}
          <OrderSection product={product} />
        </div>
      </div>
    </div>
  );
}
