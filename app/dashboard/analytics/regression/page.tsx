'use client';
import React from 'react';

import ScatterComponent from '@/app/_components/charts/ScatterChart';
import EnergyFilter from '@/app/_components/forms/EnergyFilter';
import FilterBtn from '@/app/_components/utils/FilterBtn';
import { ModalComponent } from '@/app/_components/utils/Modals';
import SectionHeader from '@/app/_components/utils/SectionHeader';
import { SelectComponent } from '@/app/_components/utils/SelectComponent';
import { largeDataSet } from '@/app/_constants/data';

const RegressionAnalysis = () => {
  const [showFilterModal, setShowFilterModal] = React.useState(false);

  const barData = [...largeDataSet];

  return (
    <div className="card min-h-full flex flex-col h-full overflow-y-auto">
      <div className="flex justify-between items-start mb-5">
        <SectionHeader title="Regression Analysis" description="" />
      </div>
      <div className="flex justify-end items-end mb-5 gap-3">
        <div className="h-[40px]">
          <SelectComponent
            size="h40"
            className="h-[100px]"
            array={[
              {
                name: 'Hdd',
                value: 'hdd',
              },
              {
                name: 'Cdd',
                value: 'cdd',
              },
              {
                name: 'Occupancy Rate',
                value: 'occupancy_rate',
              },
            ]}
            handleSelect={() => {}}
            title="Variable"
            defaultValue="hdd"
          />
        </div>
        <span className="h-[40px]" onClick={() => setShowFilterModal(!showFilterModal)}>
          <FilterBtn />
        </span>
      </div>

      <div className="flex flex-col h-full">
        <ScatterComponent data={barData} />
      </div>

      <ModalComponent
        open={showFilterModal}
        setOpen={() => setShowFilterModal(false)}
        contentClass="min-w-[min(90vw,500px)] max-h-[90svh] overflow-y-auto"
        content={<EnergyFilter setShowFilterModal={setShowFilterModal} />}
      />
    </div>
  );
};

export default RegressionAnalysis;
