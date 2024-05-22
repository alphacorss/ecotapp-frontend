import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <React.Fragment>
      <div className="card min-h-full flex flex-col h-auto lg:h-full">{children}</div>
    </React.Fragment>
  );
}
