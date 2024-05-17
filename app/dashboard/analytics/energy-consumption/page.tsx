'use client';
import { useQuery } from '@tanstack/react-query';
import { DocumentDownload, Trash } from 'iconsax-react';
import { MoreVertical, Plus } from 'lucide-react';
import React, { memo } from 'react';

import DataPage from './DataPage';
import EnergyFilter from '../../../_components/forms/EnergyFilter';
import { DropdownMenuComponent } from '@/app/_components/utils/DropDowns';
import FilterBtn from '@/app/_components/utils/FilterBtn';
import { BoxLoader, ChartLoader } from '@/app/_components/utils/Loader';
import { ModalComponent } from '@/app/_components/utils/Modals';
import SectionHeader, { FacilityHeader, OrganizationHeader, TenantHeader } from '@/app/_components/utils/SectionHeader';
import ToggleSwitch from '@/app/_components/utils/ToggleSwitch';
import { energyToggle } from '@/app/_constants/data';
import Queries from '@/app/_context/Queries';
import usePathParams from '@/app/_hooks/usePathParams';
import { TFacility, TFacilityUser, TOrg } from '@/app/types';
import qry from '@/lib/queries';
import { capitalizeFirstLetter, getDateIndexes, setUrlParams } from '@/lib/utils';

const { year, monthIndex, dayIndex } = getDateIndexes();

const EnergyConsumption = () => {
  const { viewType, energy_type, refreshTime, orgId, facilityId, tenantId } = usePathParams();

  const { orgs, facilities, tenants } = React.useContext(Queries);
  const [showFilterModal, setShowFilterModal] = React.useState(false);

  const today = `${year}-${monthIndex}-${dayIndex}`;

  const q = `unit=${201}&date=${today}&energy_type=${energy_type}`;

  const analytics = useQuery({
    queryKey: ['analytics', energy_type, orgId, facilityId, tenantId],
    queryFn: () => qry.analyticsRq(q),
  });

  const isLoading = analytics.isLoading;
  const consumption = analytics.data?.data.data.stat;
  const total = consumption?.total_energy_consumed;

  const organization: TOrg | undefined = orgs.data?.data?.organization?.find((org: TOrg) => org._id === orgId);

  const facility = facilities.data?.data?.facilities?.find((f: TFacility) => f._id === facilityId);

  const tenant = tenants.data?.data?.users?.find((t: TFacilityUser) => t._id === tenantId);

  const analyticsOptionsArry = [
    <button key={'manage'} className="more font-[500] font-poppins" onClick={() => {}}>
      <Plus className="h-4 w-4" />
      Add to report
    </button>,
    <button key={'delete'} className="more font-[500] font-poppins" onClick={() => {}}>
      <DocumentDownload className="h-4 w-4" />
      Download report
    </button>,
    <button key={'delete'} className="more font-[500] font-poppins text-error-300" onClick={() => {}}>
      <Trash className="h-4 w-4" />
      Clear report
    </button>,
  ];

  return (
    <div className="card min-h-full flex flex-col h-full overflow-y-auto whitespace-nowrap">
      <ModalComponent
        open={showFilterModal}
        setOpen={() => setShowFilterModal(false)}
        contentClass="min-w-[min(90vw,500px)] max-h-[90svh] overflow-y-auto"
        content={<EnergyFilter setShowFilterModal={setShowFilterModal} showRefreshTime={viewType === 'real-time'} />}
      />

      <div className="flex justify-between items-start mb-5 lg:mb-8 flex-row gap-3 lg:gap-0 border-b-[1px] border-gray-200 pb-5 relative">
        {tenant ? (
          <div>
            <TenantHeader extendedUser={tenant} />
          </div>
        ) : facility ? (
          <div>
            <FacilityHeader facilityData={facility} />
          </div>
        ) : organization ? (
          <OrganizationHeader organization={organization} />
        ) : (
          <SectionHeader title="Energy Consumption" description="View Analytics and Real time energy consumption" />
        )}
        <div>
          <DropdownMenuComponent
            trigger={<MoreVertical size={20} className="text-gray-500" />}
            triggerClassName="border-none size-[30px]"
            array={analyticsOptionsArry}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <div className="flex w-full justify-between mb-8">
          <ToggleSwitch
            arrayOptions={energyToggle}
            option={viewType}
            onClick={() => {
              const newViewType = viewType === 'analytics' ? 'real-time' : 'analytics';
              setUrlParams({
                energy_type,
                vt: newViewType,
                ...(viewType !== 'real-time' ? { refreshtime: '5m' } : {}),
              });
            }}
          />

          <div className="flex items-center gap-4">
            {isLoading ? (
              <BoxLoader />
            ) : (
              <>
                {energy_type && (
                  <span className="border text-sm h-[45px] px-2 grid place-content-center rounded-[var(--rounded)] text-gray-500">
                    <>{capitalizeFirstLetter(energy_type)}</>
                  </span>
                )}
                {refreshTime && (
                  <span className="border text-sm h-[45px] px-2 grid place-content-center rounded-[var(--rounded)] text-gray-500">
                    <>{capitalizeFirstLetter(refreshTime)}</>
                  </span>
                )}
              </>
            )}

            <span className="h-[45px]" onClick={() => setShowFilterModal(!showFilterModal)}>
              <FilterBtn />
            </span>
          </div>
        </div>
        {isLoading ? (
          <ChartLoader showTop showBottom />
        ) : (
          <div className="flex flex-col h-full w-full">
            <div className="flex flex-col justify-center mb-10">
              <h2 className="text-3xl text-primary-300/90 font-[700]">{total} kWh</h2>
              <p className="text-sm text-gray-500 font-[500]">Energy consumed</p>
            </div>
            <DataPage viewType={viewType} consumption={consumption} />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(EnergyConsumption);
