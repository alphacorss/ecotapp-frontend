import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Ecotapp - Authentication',
  description: 'Ecotapp Authentication',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gradient-to-b from-primary-75/60 to-accent-50 h-[100svh] w-full py-16 flex justify-center items-center">
      <div className="w-[min(90vw,550px)] mx-auto overflow-y-auto bg-white shadow-[0_1px_5px_rgb(0,0,0,0.2)] rounded-[var(--rounded)] flex flex-col items-center py-10 px-10 md:px-16 scroll-mr-10 mb-6 dark:dark-bg dark:dark-text">
        {children}
      </div>
    </div>
  );
}
