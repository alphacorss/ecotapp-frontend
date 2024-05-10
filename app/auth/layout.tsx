import Head from 'next/head';
import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <Head>
        <link rel="icon" href="/headers/lock.svg" sizes="any" />
        <title>Ecotapp - Authentication</title>
      </Head>
      <div>{children}</div>
    </React.Fragment>
  );
}
