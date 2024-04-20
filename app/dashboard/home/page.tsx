'use client';
import React from 'react';

import MainWrapper from '@/app/components/layout/MainWrapper';
import FacilityManagerHomePage from '@/app/components/tiersPage/admins/FacilityManagerHomePage';
import HighAdminHomePage, { THomeData } from '@/app/components/tiersPage/admins/HighAdminsHomePage';
import HomePageTenant from '@/app/components/tiersPage/tenant/HomePageTenant';
import { barData, pieData, toggleData } from '@/app/constants/data';
import Queries from '@/app/context/Queries';
import Auth from '@/app/context/User';
import { TRole } from '@/app/types';

const Home = () => {
  const { orgs, facilities, tenants } = React.useContext(Queries);
  const orgsCount = orgs?.data?.data?.count;
  const facilitiesCount = facilities?.data?.data?.count;
  const tenantCount = tenants?.data?.data?.count;

  const data: THomeData = [
    {
      title: 'Total Organizations',
      allowedRoles: ['superadmin', 'psuedoadmin' as TRole],
      data: [
        {
          period: 'last_7_days',
          value: orgsCount,
          percentage: 20,
        },
        {
          period: 'last_30_days',
          value: 20000,
          percentage: 30,
        },
        {
          period: 'last_90_days',
          value: 30000,
          percentage: 40,
        },
      ],
    },
    {
      title: 'Total Facilities',
      allowedRoles: ['superadmin', 'psuedoadmin' as TRole, 'organizationadmin', 'organizationmanager'],
      data: [
        {
          period: 'last_7_days',
          value: facilitiesCount,
          percentage: 20,
        },
        {
          period: 'last_30_days',
          value: 20000,
          percentage: 30,
        },
        {
          period: 'last_90_days',
          value: 30000,
          percentage: 40,
        },
      ],
    },
    {
      title: 'Total Tenants',
      allowedRoles: ['superadmin', 'psuedoadmin' as TRole, 'organizationadmin', 'organizationmanager'],
      data: [
        {
          period: 'last_7_days',
          value: tenantCount,
          percentage: 20,
        },
        {
          period: 'last_30_days',
          value: 20000,
          percentage: 30,
        },
        {
          period: 'last_90_days',
          value: 30000,
          percentage: 40,
        },
      ],
    },
  ];

  const barChart = {
    data: [...barData],
    total: [...toggleData],
  };
  const pieChart = {
    data: [...pieData],
    total: [...toggleData],
  };

  const [total, setTotal] = React.useState(0.0);
  const [percentage, setPercentage] = React.useState(0.0);
  const [selected, setSelected] = React.useState('last_7_days');

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  React.useEffect(() => {
    const totalAmnt = barChart.total.find((item) => item.period === selected);
    const totalPercentage = barChart.total.find((item) => item.period === selected);
    setTotal(totalAmnt?.value || 0);
    setPercentage(totalPercentage?.percentage || 0);
  }, [barChart.total, selected]);

  const { role } = React.useContext(Auth);
  const allowedRoles = ['superadmin', 'psuedoadmin', 'organizationadmin', 'organizationmanager'];

  return (
    <MainWrapper>
      <div className="flex flex-col gap-5 min-h-full">
        {allowedRoles.includes(role as string) ? (
          <HighAdminHomePage
            data={data}
            total={total}
            percentage={percentage}
            barChart={barChart}
            pieChart={pieChart}
            handleSelect={handleSelect}
          />
        ) : role === 'facilitymanager' ? (
          <FacilityManagerHomePage
            data={data}
            total={total}
            percentage={percentage}
            barChart={barChart}
            pieChart={pieChart}
            handleSelect={handleSelect}
          />
        ) : (
          <HomePageTenant chart={barChart} handleSelect={handleSelect} />
        )}
      </div>
    </MainWrapper>
  );
};

export default Home;
