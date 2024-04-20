import Link from 'next/link';
import React from 'react';

const ErrorPage = () => {
  return (
    <div className="grid place-content-center gap-5 w-full h-[100svh]">
      <p>You&apos;ve stumbled on an inaccessible page 😐</p>
      <Link href="/">
        <p className="text-center bg-primary-100 p-2 rounded-lg text-white">Go home</p>
      </Link>
    </div>
  );
};

export default ErrorPage;
