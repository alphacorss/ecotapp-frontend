'use client';
import { MoreVertical } from 'lucide-react';
import React, { memo } from 'react';

import DataPage from './_components/DataPage';
import ThresholdForm from './_components/ThresholdForm';
import useAnalytics from './page.hook';
import EnergyFilter from '../../../_components/forms/EnergyFilter';
import { DropdownMenuComponent } from '@/app/_components/utils/DropDowns';
import FilterBtn from '@/app/_components/utils/FilterBtn';
import { BoxLoader, ChartLoader } from '@/app/_components/utils/Loader';
import { ModalComponent, SuccessModalContent } from '@/app/_components/utils/Modals';
import SectionHeader, { FacilityHeader, OrganizationHeader, TenantHeader } from '@/app/_components/utils/SectionHeader';
import ToggleSwitch from '@/app/_components/utils/ToggleSwitch';
import { analyticsOptionsArry, energyToggle } from '@/app/_constants/data';
import { capitalizeFirstLetter, cleanNumber } from '@/lib/utils';

const EnergyConsumption = () => {
  const {
    activeToggle,
    setActiveToggle,
    role,
    addToReport,
    clearReport,
    downloadReport,
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
    realTimeData,
    realTimeIsLoading,
    setThresholdModal,
    thresholdModal,
    setThresholdSet,
    thresholdSet,
    threshold,
  } = useAnalytics();

  const reportData = activeToggle === 'analytics' ? consumption : realTimeData;

  return (
    <div className="card min-h-full flex flex-col h-full overflow-y-auto whitespace-nowrap">
      <ModalComponent
        open={showFilterModal}
        setOpen={() => setShowFilterModal(false)}
        contentClass="min-w-[min(90vw,500px)] max-h-[90svh] overflow-y-auto"
        content={
          <EnergyFilter setShowFilterModal={setShowFilterModal} showRefreshTime={activeToggle === 'real-time'} />
        }
      />

      <ModalComponent
        open={thresholdModal}
        setOpen={() => setThresholdModal(false)}
        contentClass="min-w-[min(90vw,500px)] max-h-[90svh] overflow-y-auto"
        content={<ThresholdForm setThresholdModal={setThresholdModal} setThresholdSet={setThresholdSet} />}
      />

      <ModalComponent
        open={thresholdSet}
        setOpen={() => setThresholdSet(false)}
        content={
          <SuccessModalContent
            actionBtnText="Go to Energy Consumption"
            title="Threshold Set Successfully"
            message="You will receive instant notifications when your energy consumption surpasses the set threshold."
            onConfirm={() => {
              setThresholdSet(false);
              setThresholdModal(false);
            }}
          />
        }
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
              role,
              () => setThresholdModal(true),
              () =>
                addToReport({
                  title: activeToggle as string,
                  energyType: energy_type as string,
                  data: reportData,
                  ...(organization && { orgName: organization.name }),
                  ...(facility && { facilityName: facility.name }),
                  ...(tenant && { tenantName: `${tenant.user.firstName} ${tenant.user.lastName}` }),
                }),
              downloadReport,
              clearReport,
            )}
          />
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <div className="flex w-full justify-between mb-8 flex-col lg:flex-row">
          <ToggleSwitch arrayOptions={energyToggle} option={activeToggle} setActiveToggle={setActiveToggle as any} />
          <div className="flex items-center justify-end gap-4 mt-3 lg:mt-0 flex-wrap">
            {isLoading || realTimeIsLoading ? (
              <BoxLoader />
            ) : (
              <>
                {energy_type && (
                  <span className="border text-sm h-[45px] px-2 grid place-content-center rounded-[var(--rounded)] text-gray-500">
                    <>{capitalizeFirstLetter(energy_type)}</>
                  </span>
                )}
                {refreshTime && activeToggle === 'real-time' && (
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
        {isLoading || realTimeIsLoading ? (
          <ChartLoader showTop={activeToggle === 'analytics'} showBottom={activeToggle === 'analytics'} />
        ) : (
          <div className="flex flex-col h-full w-full">
            <div className="flex mb-10 flex-col lg:justify-between lg:items-center lg:flex-row">
              <div className="mb-4 lg:mb-0">
                <h2 className="text-3xl text-primary-300/90 font-[700]">{cleanNumber(total)} kWh</h2>
                <p className="text-sm text-gray-500 font-[500]">Energy consumed</p>
              </div>

              {role === 'tenant' && activeToggle === 'analytics' && threshold && (
                <div className="flex flex-col gap-3 border p-2 rounded-[var(--rounded)] max-w-fit">
                  <p className="text-sm text-gray-500 font-[500] border-b-[1px] pb-[2px]">Threshold (kWh)</p>
                  <h3 className="text-xl text-gray-700/90 font-[700]">{threshold}</h3>
                </div>
              )}
            </div>
            <DataPage activeToggle={activeToggle} consumption={consumption} realTimeData={realTimeData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(EnergyConsumption);
