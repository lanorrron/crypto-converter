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
const domain = process.env.NEXT_PUBLIC_DOMAIN;

export const metadata: Metadata = {
  title: 'Sam Crypto',
  description: 'Crypto converter and top gainers, losers, and trending coins.',
  metadataBase: new URL(`${domain}`),
  openGraph: {
    type: 'website',
    url: domain,
    title: 'Sam Crypto',
    siteName: 'Sam Crypto',
    description: 'Crypto converter and prices: losers, gainers, and popular coins.',
    images: [
      {
        url: `${domain}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Sam crypto page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sam Crypto',
    description: 'Crypto converter and prices: losers, gainers, and popular coins.',
    images: `${domain}/og-image.png`,
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
