import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './styles/globals.css';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Sam Crypto',
  description: 'Crypto converter and top gainers, losers, and trending coins.',
  metadataBase: new URL('https://main.d24t33tp1v461d.amplifyapp.com'),
  openGraph: {
    type: 'website',
    url: 'https://main.d24t33tp1v461d.amplifyapp.com',
    title: 'Sam Crypto',
    siteName: 'Sam Crypto',
    description: 'Crypto converter and prices: losers, gainers, and popular coins.',
    images: [
      {
        url: 'https://main.d24t33tp1v461d.amplifyapp.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'San crypto page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sam Crypto',
    description: 'Crypto converter and prices: losers, gainers, and popular coins.',
    images: 'https://main.d24t33tp1v461d.amplifyapp.com/og-image.png',
  },
  other: {
    'og:image:secure_url': 'https://main.d24t33tp1v461d.amplifyapp.com/og-image.png',
    'og:image:type': 'image/png',
    'og:image:alt': 'Portada de Sam Crypto',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
