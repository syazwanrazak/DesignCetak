import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { WHATSAPP_NUMBER } from '@/constants';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const BASE_URL = 'https://designcetak.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Kedai Printing Shah Alam | DesignCetak – Cetak Cepat & Murah',
    template: '%s | DesignCetak Shah Alam',
  },
  description: 'Kedai printing terbaik di Shah Alam, Selangor. Cop getah, banner, business card, flyers, baju, sticker & lebih — siap urgent, harga mampu milik. Hubungi kami via WhatsApp!',
  keywords: [
    'kedai printing Shah Alam',
    'kedai cetak Shah Alam',
    'printing Shah Alam murah',
    'banner printing Shah Alam',
    'business card Shah Alam',
    'cop getah Shah Alam',
    'cetak flyers Shah Alam',
    'printing same day Shah Alam',
    'kedai print Selangor',
    'DesignCetak',
  ],
  authors: [{ name: 'DesignCetak' }],
  creator: 'DesignCetak',
  openGraph: {
    type: 'website',
    locale: 'ms_MY',
    url: BASE_URL,
    siteName: 'DesignCetak',
    title: 'Kedai Printing Shah Alam | DesignCetak – Cetak Cepat & Murah',
    description: 'Kedai printing terbaik di Shah Alam, Selangor. Cop getah, banner, business card, flyers, baju, sticker & lebih — siap urgent, harga mampu milik.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kedai Printing Shah Alam | DesignCetak',
    description: 'Kedai printing terbaik di Shah Alam. Cop getah, banner, business card, flyers & lebih — siap urgent, harga mampu milik.',
  },
  alternates: { canonical: BASE_URL },
  robots: { index: true, follow: true },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'PrintShop',
  name: 'DesignCetak',
  description: 'Kedai printing terbaik di Shah Alam, Selangor. Cop getah, banner, business card, flyers, baju, sticker dan lebih.',
  url: BASE_URL,
  telephone: '+601110528685',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Shah Alam',
    addressRegion: 'Selangor',
    addressCountry: 'MY',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 3.0733, longitude: 101.5185 },
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '18:00',
  }],
  priceRange: '$$',
  areaServed: { '@type': 'City', name: 'Shah Alam' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Perkhidmatan Percetakan',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cop Getah Shah Alam' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Banner Printing Shah Alam' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Card Shah Alam' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'T-Shirt Printing Shah Alam' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Sticker Printing Shah Alam' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Flyers Printing Shah Alam' } },
    ],
  },
  sameAs: ['https://wa.me/601110528685'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />

        {/* Floating WhatsApp */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20DesignCetak%2C%20saya%20nak%20tanya%20pasal%20printing`}
          target="_blank"
          rel="noopener"
          className="wa-float"
          aria-label="Chat WhatsApp DesignCetak"
        >
          <i className="fab fa-whatsapp" />
        </a>
      </body>
    </html>
  );
}
