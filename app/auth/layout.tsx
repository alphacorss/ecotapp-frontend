import type { Metadata } from 'next';
import React from 'react';

export const meta: Metadata = {
  title: 'Ecotapp - Authentication',
  icons: [
    {
      rel: 'icon',
      href: '/headers/lock.svg',
      sizes: 'any',
      url: '/headers/lock.svg',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
