'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import { PageLoader } from './_components/utils/Loader';

const Landing = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.replace('/dashboard/home');
  }, [router]);

  return (
    <div className="flex gap-3 flex-wrap p-5">
      <PageLoader />
    </div>
  );
};

export default Landing;
