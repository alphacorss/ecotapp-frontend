'use client';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import React from 'react';

import ProtectedRoutes from './ProtectedRoutes';
import Header from '../_components/nav/Header';
import SideNav from '../_components/nav/SideNav';
import { PageLoader } from '../_components/utils/Loader';
import User from '../_context/User';

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
        <div>
          {isLoading || isFetching ? (
            <PageLoader />
          ) : (
            <ProtectedRoutes>
              <div className="w-full h-[100svh] flex">
                <SideNav />
                <div className="w-full h-full">
                  <Header />
                  <main className="p-5 h-[calc(100svh-80px)] overflow-y-auto bg-[#fafafa] dark:dark-bg dark:dark-text">
                    {children}
                  </main>
                </div>
              </div>
            </ProtectedRoutes>
          )}
        </div>
      </PostHogProvider>
    </React.Fragment>
  );
}
