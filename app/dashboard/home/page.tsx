'use client';
import React from 'react';

import FacilityManagerHomePage from './_components/admins/Facility/FacilityManagerHomePage';
import HomePageTenant from './_components/tenant/HomePageTenant';
import { high, low, mid } from './helpers';
import MainWrapper from '@/app/_components/layout/MainWrapper';
import User from '@/app/_context/User';
import HighAdminHomePage from '@/app/dashboard/home/_components/admins/HighAdminsHomePage';

const Home = () => {
  const role = React.useContext(User).role;

  return (
    <MainWrapper>
      {high.includes(role as string) ? (
        <HighAdminHomePage />
      ) : mid.includes(role as string) ? (
        <HighAdminHomePage />
      ) : low.includes(role as string) ? (
        <FacilityManagerHomePage />
      ) : (
        <HomePageTenant />
      )}
    </MainWrapper>
  );
};

export default Home;
