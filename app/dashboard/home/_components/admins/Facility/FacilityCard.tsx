import { useQuery } from '@tanstack/react-query';
import { ArrowUp, Buliding, People } from 'iconsax-react';
import React from 'react';

import { HomeCardLoader } from '@/app/_components/utils/Loader';
import { SelectComponent } from '@/app/_components/utils/SelectComponent';
import { homeSelectOptions } from '@/app/_constants/data';
import useLocalStorage from '@/app/_hooks/useLocalStorage';
import { TRole } from '@/app/types';
import qry from '@/lib/queries';

const FacilityCard = ({
  facilityId,
  data,
}: {
  facilityId: string;
  data: {
    title: string;
    allowedRoles: TRole[];
    queryKey: string;
  };
}) => {
  const [selected, setSelected] = useLocalStorage(`@homeCard_facility`, 'last_30');

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const homeCards = useQuery({
    queryKey: ['homeCards_facility', selected, facilityId],
    queryFn: () => qry.homeCardsFacilityRq(selected, facilityId),
    retry: 0,
  });

  const cards = homeCards.data?.data?.data;

  if (homeCards.isLoading) return <HomeCardLoader />;
  if (homeCards.isError) return <div className="error-page flex-1 text-xs">Something went wrong loading this card</div>;

  const value = data.queryKey === 'unit' ? cards.facilityStat.units : cards.tenantStat.totalTenants;

  return (
    <div className="card p-[24px] min-h-[150px] justify-between flex flex-col">
      <div className="flex justify-between items-start flex-row lg:items-center mb-[16px]">
        <span className="text-xs font-[500] text-gray-500 border p-2 rounded-[var(--rounded)]">
          {data.title.includes('Units') && <Buliding size={20} className="text-gray-400" />}
          {data.title.includes('Tenants') && <People size={20} className="text-gray-400" />}
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
          <p className="text-xs lg:text-sm font-[400] text-gray-400">{data.title}</p>
          <p>{value}</p>
        </div>
        {data.queryKey !== 'unit' && (
          <span className="text-xs text-[#0B7041] border border-[#9EE1C2] bg-[#E7F8F0] rounded-[var(--rounded)] p-1 lg:p-2 font-[500] flex gap-1 items-center">
            {<ArrowUp size={15} />}
            {cards.tenantStat.percentageTenantChange ?? 0}%
          </span>
        )}
      </div>
    </div>
  );
};

export default FacilityCard;
