'use client';
import React from 'react';

import DoubleLineComponent from '@/app/_components/charts/DoubleLine';
import EnergyFilter from '@/app/_components/forms/EnergyFilter';
import FilterBtn from '@/app/_components/utils/FilterBtn';
import { ModalComponent } from '@/app/_components/utils/Modals';
import SectionHeader from '@/app/_components/utils/SectionHeader';
import { SelectComponent } from '@/app/_components/utils/SelectComponent';
import { largeDataSet } from '@/app/_constants/data';
import useLocalStorage from '@/app/_hooks/useLocalStorage';

const CarbonTrading = () => {
  const [showFilterModal, setShowFilterModal] = React.useState(false);

  const barData = [...largeDataSet];

  const COLORS = ['#D91668', '#1AD916'];

  const lines = [
    {
      COLORS: COLORS[0],
      name: 'Carbon Emitted',
      dataKey: 'amt',
      show: true,
    },
    {
      COLORS: COLORS[1],
      name: 'Carbon Off-setted',
      dataKey: 'uv',
      show: true,
    },
  ];

  const [line, setLine] = useLocalStorage('@carbonDefault', 'all');
  const [linesData, setLinesData] = useLocalStorage('@linesDataCarbon', lines);
  const [showLine1, setShowLine1] = React.useState(true);
  const [showLine2, setShowLine2] = React.useState(true);

  const handleSelectShowLine = (line: string) => {
    if (line === 'all') {
      setShowLine1(true);
      setShowLine2(true);
      setLinesData((prev) => prev.map((item) => ({ ...item, show: true })));
    } else if (line === 'carbon_emitted') {
      setShowLine1(true);
      setShowLine2(false);
      setLinesData((prev) =>
        prev.map((item) => ({
          ...item,
          show: item.name === 'Carbon Emitted' ? true : false,
        })),
      );
    } else if (line === 'carbon_off_setted') {
      setShowLine1(false);
      setShowLine2(true);
      setLinesData((prev) =>
        prev.map((item) => ({
          ...item,
          show: item.name === 'Carbon Off-setted' ? true : false,
        })),
      );
    }
  };

  return (
    <div className="card min-h-full flex flex-col h-full overflow-y-auto">
      <div className="flex justify-between items-start mb-5">
        <SectionHeader title="Carbon" description="" />
      </div>
      <div className="flex justify-end items-end mb-5 gap-3 z-[1000]">
        <div>
          <SelectComponent
            array={[
              { value: 'all', name: 'All' },
              { value: 'carbon_emitted', name: 'Carbon Emitted' },
              { value: 'carbon_off_setted', name: 'Carbon Off-setted' },
            ]}
            defaultValue={line}
            title=""
            handleSelect={(line) => {
              setLine(line);
              handleSelectShowLine(line);
            }}
            className="h-[100px]"
            size="h40"
          />
        </div>
        <span className="h-[40px]" onClick={() => setShowFilterModal(!showFilterModal)}>
          <FilterBtn />
        </span>
      </div>

      <div className="flex flex-col h-full">
        <DoubleLineComponent
          data={barData}
          lines={linesData}
          COLORS={COLORS}
          showLine1={showLine1}
          showLine2={showLine2}
        />
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

export default CarbonTrading;
