'use client';
import { Poppins } from 'next/font/google';
import React from 'react';

import ProtectedRoutes from './ProtectedRoutes';
import Header from '../_components/nav/Header';
import SideNav from '../_components/nav/SideNav';
import { PageLoader } from '../_components/utils/Loader';
import User from '../_context/User';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, isFetching } = React.useContext(User);

  return (
    <html>
      <head>
        <title>Ecotapp - Dashboard</title>
      </head>
      <body className={poppins.className}>
        {isLoading || isFetching ? (
          <PageLoader />
        ) : (
          <ProtectedRoutes>
            <div className="w-full h-[100svh] flex">
              <SideNav />
              <div className="w-full h-full">
                <Header />
                <main className="p-5 h-[calc(100svh-80px)] overflow-y-auto bg-[#fafafa]">{children}</main>
              </div>
            </div>
          </ProtectedRoutes>
        )}
      </body>
    </html>
  );
}
