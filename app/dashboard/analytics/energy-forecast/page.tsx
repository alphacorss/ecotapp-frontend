'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { DateRange } from 'react-day-picker';

import EmptyState from '../_components/EmptyState';
import LineComponent from '@/app/_components/charts/LineChart';
import EnergyFilter from '@/app/_components/forms/EnergyFilter';
import MainWrapper from '@/app/_components/layout/MainWrapper';
import FilterBtn from '@/app/_components/utils/FilterBtn';
import { ModalComponent } from '@/app/_components/utils/Modal';
import SectionHeader from '@/app/_components/utils/SectionHeader';
import { largeDataSet } from '@/app/_constants/data';
import { convertDate } from '@/lib/utils';

const EnergyForecast = () => {
  const from = useSearchParams().get('from');
  const to = useSearchParams().get('to');
  const filter = useSearchParams().get('filter');

  const [showFilterModal, setShowFilterModal] = React.useState(false);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: from ? (convertDate(from, false) as Date) : undefined,
    to: to ? (convertDate(to, false) as Date) : undefined,
  });

  const [dateError, setDateError] = React.useState<string | undefined>(undefined);

  const barData = [...largeDataSet];

  return (
    <MainWrapper>
      <div className="card min-h-full flex flex-col h-full overflow-y-auto">
        <div className="flex justify-between items-start mb-5">
          <SectionHeader title="Energy Forecast" description="" />
        </div>
        <div className="flex justify-end items-end mb-5">
          {filter !== 'false' && (
            <span className="h-[40px]" onClick={() => setShowFilterModal(!showFilterModal)}>
              <FilterBtn />
            </span>
          )}
        </div>
        {filter !== 'false' && (
          <div className="flex flex-col h-full">
            <LineComponent data={barData} />
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

export default EnergyForecast;
