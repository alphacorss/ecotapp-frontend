import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <link rel="icon" href="/headers/lock.svg" sizes="any" />
        <title>Ecotapp - Authentication</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
