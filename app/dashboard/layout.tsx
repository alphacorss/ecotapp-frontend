'use client';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
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

export const meta: Metadata = {
  title: 'Ecotapp - Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, isFetching } = React.useContext(User);

  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: '/ingest',
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false,
    });
  }

  return (
    <React.Fragment>
      <PostHogProvider client={posthog}>
        <div className={poppins.className}>
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
        </div>
      </PostHogProvider>
    </React.Fragment>
  );
}
