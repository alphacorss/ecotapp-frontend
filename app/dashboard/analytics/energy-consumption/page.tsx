'use client';
import { MoreVertical } from 'lucide-react';
import React, { memo } from 'react';

import DataPage from './_components/DataPage';
import useAnalytics from './page.hook';
import EnergyFilter from '../../../_components/forms/EnergyFilter';
import { DropdownMenuComponent } from '@/app/_components/utils/DropDowns';
import FilterBtn from '@/app/_components/utils/FilterBtn';
import { BoxLoader, ChartLoader } from '@/app/_components/utils/Loader';
import { ModalComponent } from '@/app/_components/utils/Modals';
import SectionHeader, { FacilityHeader, OrganizationHeader, TenantHeader } from '@/app/_components/utils/SectionHeader';
import ToggleSwitch from '@/app/_components/utils/ToggleSwitch';
import { analyticsOptionsArry, energyToggle } from '@/app/_constants/data';
import { capitalizeFirstLetter, setUrlParams } from '@/lib/utils';

const EnergyConsumption = () => {
  const {
    viewType,
    energy_type,
    refreshTime,
    consumption,
    facility,
    isLoading,
    organization,
    setShowFilterModal,
    showFilterModal,
    tenant,
    total,
  } = useAnalytics();

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
            array={analyticsOptionsArry(
              () => {},
              () => {},
              () => {},
            )}
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
                ...(viewType !== 'real-time' ? { refreshtime: '1h' } : {}),
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
