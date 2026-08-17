import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactModal } from '@/components/features/ContactModal';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { GlobalVideoBackground } from '@/components/ui/GlobalVideoBackground';
import { IntroOverlay } from '@/components/ui/IntroOverlay';
import { client } from '@/lib/sanity';
import { globalSettingsQuery } from '@/lib/queries';

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });

const arboria = localFont({
  src: [
    { path: '../public/Opet Fonts/Arboria/fonnts.com-Arboria_Thin.otf', weight: '100', style: 'normal' },
    { path: '../public/Opet Fonts/Arboria/fonnts.com-Arboria_Light.otf', weight: '300', style: 'normal' },
    { path: '../public/Opet Fonts/Arboria/fonnts.com-Arboria_Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/Opet Fonts/Arboria/fonnts.com-Arboria_Bold.otf', weight: '700', style: 'normal' },
    { path: '../public/Opet Fonts/Arboria/fonnts.com-Arboria_Black.otf', weight: '900', style: 'normal' },
  ],
  variable: '--font-arboria'
});

const futura = localFont({
  src: [
    { path: '../public/Opet Fonts/Futura/futura light bt.ttf', weight: '300', style: 'normal' },
    { path: '../public/Opet Fonts/Futura/Futura Book font.ttf', weight: '400', style: 'normal' },
    { path: '../public/Opet Fonts/Futura/futura medium bt.ttf', weight: '500', style: 'normal' },
    { path: '../public/Opet Fonts/Futura/Futura Heavy font.ttf', weight: '700', style: 'normal' },
    { path: '../public/Opet Fonts/Futura/Futura XBlk BT.ttf', weight: '900', style: 'normal' },
  ],
  variable: '--font-futura'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.opetstudios.com'),
  title: {
    default: 'Opet Studios | Architectural Visualization & CGI',
    template: '%s | Opet Studios',
  },
  description: 'Specialized CGI and architectural visualization studio dedicated to transforming unbuilt architecture into vivid, immersive visual experiences.',
  keywords: ['Architectural Visualization', 'CGI', 'Rendering', 'Unreal Engine 5', 'Opet Studios', 'Cairo', '360 Tour', 'Interactive Sales'],
  authors: [{ name: 'Opet Studios' }],
  creator: 'Opet Studios',
  publisher: 'Opet Studios',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/icon.png' },
    ],
  },
  openGraph: {
    title: 'Opet Studios | Architectural Visualization & CGI',
    description: 'Transforming unbuilt architecture into vivid, immersive visual experiences through cutting-edge CGI and interactive technology.',
    url: 'https://www.opetstudios.com',
    siteName: 'Opet Studios',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opet Studios | Architectural Visualization & CGI',
    description: 'Specialized CGI and architectural visualization studio dedicated to transforming unbuilt architecture into vivid experiences.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '9sH9l8jgUPFRU5IREiJlZYRJwquuGqClJXTxkylPNqk',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let globalSettings: any = null;
  try {
    globalSettings = await client.fetch(globalSettingsQuery);
  } catch (e) {
    console.error(e);
  }

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta httpEquiv="content-language" content="en-us" />
        <meta name="google" content="notranslate" />
      </head>
      <body className={`${arboria.variable} ${futura.variable} ${jetbrainsMono.variable} font-sans bg-midnight text-accent antialiased selection:bg-electric selection:text-white`}>
        <CustomCursor />
        <IntroOverlay />
        <GlobalVideoBackground videoUrl={globalSettings?.heroVideoUrl} />
        <Navbar />
        <ContactModal />
        {children}
        <Footer />
      </body>
    </html>
  );
}
