'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { Provider } from 'react-redux';

import { MainCtxProvider } from './_context/Main';
import { UserCtxProvider } from './_context/User';
import { store } from './store';
import { ProvidersProps } from './types';

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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <UserCtxProvider>
          <MainCtxProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              {children}
            </ThemeProvider>
          </MainCtxProvider>
        </UserCtxProvider>
      </QueryClientProvider>
    </Provider>
  );
};

const P = dynamic(() => Promise.resolve(Providers), {
  ssr: false,
});

export default P;
