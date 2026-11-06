import type { Metadata, Viewport } from 'next';
import { Fraunces, Public_Sans } from 'next/font/google';
import './globals.css';
import EmergencyBanner from '@/components/EmergencyBanner';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MobileCallBar from '@/components/MobileCallBar';
import MotionProvider from '@/components/MotionProvider';
import SmoothScroll from '@/components/SmoothScroll';
import { CONTACTS, HOSPITAL } from '@/lib/data';

// PERF: next/font self-hosts the files (no third-party DNS lookup on 3G), preloads them,
// and applies size-adjusted fallbacks so text does not jump when the font arrives.
const display = Fraunces({ subsets: ['latin'], display: 'swap', variable: '--font-display' });
const body = Public_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-body' });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B2545',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: `${HOSPITAL.name}, ${HOSPITAL.town}`,
    template: `%s | ${HOSPITAL.name}, ${HOSPITAL.town}`,
  },
  description: `${HOSPITAL.name} is a ${HOSPITAL.beds}-bed faith-based hospital in ${HOSPITAL.town}, ${HOSPITAL.region}. See NHIS-covered services, call us, and find the hospital.`,
  openGraph: { title: HOSPITAL.name, description: 'Faith-based care in Nkwanta, Oti Region.', type: 'website', locale: 'en_GH' },
};

// Structured data helps Google show the hospital's phone number and address in search results.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Hospital',
  name: HOSPITAL.name,
  telephone: CONTACTS.main[0].href.replace('tel:', ''),
  address: {
    '@type': 'PostalAddress',
    streetAddress: HOSPITAL.address,
    addressLocality: HOSPITAL.town,
    addressRegion: 'Oti Region',
    addressCountry: 'GH',
  },
  parentOrganization: { '@type': 'Organization', name: 'National Catholic Health Service' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH">
      <body className={`${display.variable} ${body.variable} bg-white pb-24 font-sans text-slate-800 antialiased md:pb-0`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
          Skip to main content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MotionProvider>
          <SmoothScroll>
            <div id="top" />
            <EmergencyBanner />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <MobileCallBar />
          </SmoothScroll>
        </MotionProvider>
      </body>
    </html>
  );
}
