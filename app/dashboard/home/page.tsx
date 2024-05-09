'use client';
import React, { memo } from 'react';

import FacilityManagerHomePage from './_components/admins/Facility/FacilityManagerHomePage';
import HomePageTenant from './_components/tenant/HomePageTenant';
import { high, low, mid } from './helpers';
import User from '@/app/_context/User';
import HighAdminHomePage from '@/app/dashboard/home/_components/admins/HighAdminsHomePage';

const Home = () => {
  const role = React.useContext(User).role;

  return (
    <React.Fragment>
      {high.includes(role as string) ? (
        <HighAdminHomePage />
      ) : mid.includes(role as string) ? (
        <HighAdminHomePage />
      ) : low.includes(role as string) ? (
        <FacilityManagerHomePage />
      ) : (
        <HomePageTenant />
      )}
    </React.Fragment>
  );
};

export default memo(Home);
