/* eslint-disable import/order */
'use client';
import React from 'react';

import { EnergyForecastFilter, useEnergyForecast } from './page.hook';
import LineComponent from '@/app/_components/charts/LineChart';
import EnergyFilter from '@/app/_components/forms/EnergyFilter';
import FilterBtn from '@/app/_components/utils/FilterBtn';
import { ModalComponent } from '@/app/_components/utils/Modals';
import SectionHeader from '@/app/_components/utils/SectionHeader';
import User from '@/app/_context/User';
import { high } from '@/app/dashboard/home/helpers';
import ChartSpinnerLoader from '../../../_components/utils/ChartSpinnerLoader';

const getDefaultDateRange = () => {
  const now = new Date();
  const start = `${now.getFullYear()}-01-01`;
  const end = `${now.getFullYear()}-12-31`;
  return { start, end };
};

const EnergyForecast = () => {
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const { role } = React.useContext(User);

  // Determine which fields to show
  const isSuperAdmin = [...high].includes(role || '');

  const { start, end } = getDefaultDateRange();
  const [filter, setFilter] = React.useState<EnergyForecastFilter>({
    energy_type: 'gas',
    organization: '',
    facility: '',
    start_date: start,
    end_date: end,
  });

  const facultyAndOrgFilterExists = filter?.facility !== '' || filter?.organization !== '';

  const { chartData, isLoading, isError } = useEnergyForecast({
    energy_type: filter.energy_type || 'gas',
    facility: filter.facility || '',
    organization: filter.organization || '',
    start_date: filter.start_date || start,
    end_date: filter.end_date || end,
  });

  // Adapt chartData to match LineComponent's expected keys
  const lineChartData = chartData.map((item: { month: string; consumption: number }) => ({
    name: item.month, // for XAxis
    pv: item.consumption, // for Line dataKey
  }));

  const handleFilterSubmit = (data: EnergyForecastFilter) => {
    setFilter({ ...data });
    setShowFilterModal(false);
  };

  return (
    <div className="card min-h-full flex flex-col h-full overflow-y-auto">
      <div className="flex justify-between items-start mb-5">
        <SectionHeader title="Energy Forecast" description="" />
      </div>
      <div className="flex justify-end items-end mb-5 z-[1]">
        <span className="h-[40px]" onClick={() => setShowFilterModal(!showFilterModal)}>
          <FilterBtn />
        </span>
      </div>

      <div className="flex flex-col h-full">
        {!facultyAndOrgFilterExists && !isError ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500">Please update the filter</p>
          </div>
        ) : isError || !chartData ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500">No data found</p>
          </div>
        ) : isLoading ? (
          <ChartSpinnerLoader />
        ) : (
          <LineComponent data={lineChartData} />
        )}
      </div>

      <ModalComponent
        open={showFilterModal}
        setOpen={() => setShowFilterModal(false)}
        contentClass="min-w-[min(90vw,500px)] max-h-[90svh] overflow-y-auto"
        content={
          <EnergyFilter
            setShowFilterModal={setShowFilterModal}
            onSubmit={handleFilterSubmit}
            showOrg={isSuperAdmin}
            showFacility={true}
            showEnergyType={true}
            showDateRange={true}
            energyTypeOptions={[
              { label: 'Gas', value: 'gas' },
              { label: 'Electricity', value: 'electricity' },
            ]}
            defaultValues={filter}
          />
        }
      />
    </div>
  );
};

export default EnergyForecast;
