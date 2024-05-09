'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import LineComponent from '@/app/_components/charts/LineChart';
import EnergyFilter from '@/app/_components/forms/EnergyFilter';
import FilterBtn from '@/app/_components/utils/FilterBtn';
import { ModalComponent } from '@/app/_components/utils/Modals';
import SectionHeader from '@/app/_components/utils/SectionHeader';
import { largeDataSet } from '@/app/_constants/data';

const EnergyForecast = () => {
  const filter = useSearchParams().get('filter');

  const [showFilterModal, setShowFilterModal] = React.useState(false);

  const barData = [...largeDataSet];

  return (
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
        content={<EnergyFilter setShowFilterModal={setShowFilterModal} />}
      />
    </div>
  );
};

export default EnergyForecast;
