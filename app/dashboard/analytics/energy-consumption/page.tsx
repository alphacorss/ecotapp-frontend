'use client';
import { format } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { DateRange } from 'react-day-picker';

import DataPage from './DataPage';
import EnergyFilter from '../../../components/forms/EnergyFilter';
import EmptyState from '../_components/EmptyState';
import MainWrapper from '@/app/components/layout/MainWrapper';
import FilterBtn from '@/app/components/utils/FilterBtn';
import { ModalComponent } from '@/app/components/utils/Modal';
import SectionHeader from '@/app/components/utils/SectionHeader';
import ToggleSwitch from '@/app/components/utils/ToggleSwitch';
import { barData, energyToggle } from '@/app/constants/data';
import { capitalizeFirstLetter, convertDate } from '@/lib/utils';

const EnergyConsumption = () => {
  const viewType = useSearchParams().get('vt');
  const filter = useSearchParams().get('filter');
  const from = useSearchParams().get('from');
  const to = useSearchParams().get('to');
  const energyType = useSearchParams().get('energyType');
  const router = useRouter();
  const currentPath = usePathname();

  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: from ? (convertDate(from, false) as Date) : undefined,
    to: to ? (convertDate(to, false) as Date) : undefined,
  });

  const [dateError, setDateError] = React.useState<string | undefined>(undefined);

  return (
    <MainWrapper>
      <div className="card min-h-full flex flex-col h-full overflow-y-auto">
        <div className="flex justify-between items-start mb-5 lg:mb-8 lg:flex-row flex-col gap-3 lg:gap-0 border-b-[1px] border-gray-200 pb-5">
          <SectionHeader title="Energy Consumption" description="View Analytics and Real time energy consumption" />
        </div>
        {filter === 'true' && (
          <div className="flex flex-col justify-between items-end">
            <div className="flex w-full justify-between mb-8">
              <ToggleSwitch
                arrayOptions={energyToggle}
                option={viewType}
                onClick={() => {
                  const newViewType = viewType === 'analytics' ? 'real-time' : 'analytics';
                  router.push(`${currentPath}?vt=${newViewType}&filter=${filter}`);
                }}
              />

              <div className="flex items-center gap-4">
                {date?.from && date?.to && (
                  <span className="border text-sm h-[45px] px-2 grid place-content-center rounded-[var(--rounded)] text-gray-500">
                    <>
                      {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                    </>
                  </span>
                )}

                {energyType && (
                  <span className="border text-sm h-[45px] px-2 grid place-content-center rounded-[var(--rounded)] text-gray-500">
                    <>{capitalizeFirstLetter(energyType)}</>
                  </span>
                )}

                <span className="h-[45px]" onClick={() => setShowFilterModal(!showFilterModal)}>
                  <FilterBtn />
                </span>
              </div>
            </div>
            <div className="flex flex-col h-full w-full">
              <div className="flex flex-col justify-center mb-10">
                <h2 className="text-3xl text-primary-300/90 font-[700]">3800000 kWh</h2>
                <p className="text-sm text-gray-500 font-[500]">Energy consumed</p>
              </div>
              <DataPage viewType={viewType} barData={barData} />
            </div>
          </div>
        )}

        <ModalComponent
          open={showFilterModal}
          setOpen={() => setShowFilterModal(false)}
          contentClass="min-w-[min(90vw,500px)] max-h-[90svh] overflow-y-auto"
          content={
            <EnergyFilter
              date={date}
              setDate={setDate}
              dateError={dateError}
              setDateError={setDateError}
              setShowFilterModal={setShowFilterModal}
            />
          }
        />
        {filter === 'false' && (
          <EmptyState
            imgpath="/analytics-empty.svg"
            btnText="Apply Filter"
            description="Start monitoring and optimizing your energy consumption – Apply Filters to kickstart your insights today!"
            handleOpenModal={() => setShowFilterModal(true)}
          />
        )}
      </div>
    </MainWrapper>
  );
};

export default EnergyConsumption;
