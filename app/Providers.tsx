'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import React from 'react';
import { Provider } from 'react-redux';

import { MainCtxProvider } from './_context/Main';
import { UserCtxProvider } from './_context/User';
import { store } from './store';
import { ProvidersProps } from './types';

const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || '';

posthog.init(posthogKey, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
});

const Providers = ({ children }: ProvidersProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });

  return (
    <PostHogProvider client={posthog}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <UserCtxProvider>
            <MainCtxProvider>{children}</MainCtxProvider>
          </UserCtxProvider>
        </QueryClientProvider>
      </Provider>
    </PostHogProvider>
  );
};

const P = dynamic(() => Promise.resolve(Providers), {
  ssr: false,
});

export default P;
