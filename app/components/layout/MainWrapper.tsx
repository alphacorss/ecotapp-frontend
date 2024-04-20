'use client';
import React from 'react';

import Header from '../nav/Header';
import SideNav from '../nav/SideNav';
import { PageLoader } from '../utils/Loader';
import ProtectedRoutes from '@/app/components/layout/ProtectedRoutes';
import Auth from '@/app/context/User';

const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, isFetching } = React.useContext(Auth);

  return (
    <>
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
    </>
  );
};

export default MainWrapper;
