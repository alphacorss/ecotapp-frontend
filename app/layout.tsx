import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';
import Providers from './Providers';
import { Toaster } from '@/components/ui/sonner';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Ecotapp - Dashboard',
  description:
    'Ecotapp - A platform for environmentalists and nature lovers.To manage you energy consumption and carbon footprint.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossOrigin=""
        />
      </head>
      <body className={poppins.className}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
