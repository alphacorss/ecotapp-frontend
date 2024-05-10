'use client';
import { useQuery } from '@tanstack/react-query';
import { Buliding, People } from 'iconsax-react';
import { NetworkIcon } from 'lucide-react';
import React from 'react';

import { high } from '../helpers';
import { HomeCardLoader } from '@/app/_components/utils/Loader';
import { SelectComponent } from '@/app/_components/utils/SelectComponent';
import { homeSelectOptions } from '@/app/_constants/data';
import User from '@/app/_context/User';
import useLocalStorage from '@/app/_hooks/useLocalStorage';
import { TOrgUser } from '@/app/types';
import qry from '@/lib/queries';

type TCardProps = {
  data: {
    title: string;
    allowedRoles: string[];
    queryKey: string;
  };
};

const HomeCards = ({ data }: TCardProps) => {
  const userCtx = React.useContext(User);
  const role = userCtx.role;
  const user = userCtx.user as TOrgUser;
  const [selected, setSelected] = useLocalStorage(`@homeCard_${data.queryKey}`, 'last_30');

  const orgId = user?.organization?._id;

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const q = `${selected}&${data.queryKey}`;

  const homeCard = useQuery({
    queryKey: ['homeCards', selected, data.queryKey],
    queryFn: () => (high.includes(role as string) ? qry.homeCardsRq(q) : qry.homeCardsLowAdmisnRq(q, orgId)),
    retry: 0,
    staleTime: Infinity,
    refetchOnMount: false,
  });

  const isLoading = homeCard.isLoading;
  const isError = homeCard.isError;
  const cards = homeCard.data?.data?.data;

  if (isLoading) return <HomeCardLoader />;

  if (isError) return <div className="error-page flex-1 text-xs">Something went wrong loading this card</div>;

  let cardData = {
    title: '',
    total: 0,
    percentage: 0,
  };

  if (cards.organizationStat) {
    cardData = {
      title: 'Organization',
      total: cards.organizationStat.totalOrganizations,
      percentage: cards.organizationStat.percentageOrganizationChange,
    };
  } else if (cards.facilityStat) {
    cardData = {
      title: 'Facilities',
      total: cards.facilityStat.totalFacilities,
      percentage: cards.facilityStat.percentageFacilityChange,
    };
  } else if (cards.tenantStat) {
    cardData = {
      title: 'Tenants',
      total: cards.tenantStat.totalTenants,
      percentage: cards.tenantStat.percentageTenantChange,
    };
  }

  return (
    <div className="card p-[24px] min-h-[150px] justify-between flex flex-col">
      <div className="flex justify-between items-start flex-row lg:items-center mb-[16px]">
        <span className="text-xs font-[500] text-gray-500 border p-2 rounded-[var(--rounded)]">
          {cardData.title.includes('Facilities') && <Buliding size={20} className="text-gray-400" />}
          {cardData.title.includes('Tenants') && <People size={20} className="text-gray-400" />}
          {cardData.title.includes('Organization') && <NetworkIcon size={20} className="text-gray-400" />}
        </span>
        <p className="text-xs font-[500] text-gray-500 whitespace-nowrap">
          <SelectComponent
            variant="ghost"
            size="auto"
            className="h-[100px]"
            title="Filter"
            defaultValue={selected}
            array={homeSelectOptions}
            handleSelect={handleSelect}
          />
        </p>
      </div>
      <div className="flex gap-3 justify-between items-end">
        <div className="flex flex-col lg:text-3xl font-[600] text-gray-700 gap-[8px]">
          <p className="text-xs lg:text-sm font-[400] text-gray-400">Total {cardData.title}</p>
          <p>{cardData?.total}</p>
        </div>
      </div>
    </div>
  );
};

export default HomeCards;
