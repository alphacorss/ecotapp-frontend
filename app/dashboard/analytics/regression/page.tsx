'use client';
import React from 'react';

import { RegressionFilter, useRegressionAnalysis } from './page.hook';
import ScatterComponent from '@/app/_components/charts/ScatterChart';
import EnergyFilter from '@/app/_components/forms/EnergyFilter';
import ChartSpinnerLoader from '@/app/_components/utils/ChartSpinnerLoader';
import FilterBtn from '@/app/_components/utils/FilterBtn';
import { ModalComponent } from '@/app/_components/utils/Modals';
import SectionHeader from '@/app/_components/utils/SectionHeader';
import User from '@/app/_context/User';

const GAS_OPTION = [{ label: 'Gas', value: 'gas' }];

const getDefaultDateRange = () => {
  const now = new Date();
  const start = `${now.getFullYear()}-01-01`;
  const end = `${now.getFullYear()}-12-31`;
  return { start, end };
};

// Make all fields optional for filter state and handler
export type RegressionFilterOptional = {
  energy_type?: string;
  organization?: string;
  facility?: string;
  start_date?: string;
  end_date?: string;
};

const RegressionAnalysis = () => {
  const { role } = React.useContext(User);
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  // Filter state
  const { start, end } = getDefaultDateRange();
  const [filter, setFilter] = React.useState<RegressionFilterOptional>({
    energy_type: 'gas',
    organization: '',
    facility: '',
    start_date: start,
    end_date: end,
  });

  const orgAndFacultyFilterExists = filter?.organization !== '' || filter?.facility !== '';

  // Always pass required fields to the hook
  const regressionFilter: RegressionFilter = {
    energy_type: 'gas',
    organization: filter.organization || '',
    facility: filter.facility || '',
    start_date: filter.start_date || start,
    end_date: filter.end_date || end,
  };
  const { chartData, isLoading, isError, correlation } = useRegressionAnalysis(regressionFilter);

  // Determine which fields to show
  const isSuperAdmin = role === 'superadmin';

  // Modal filter submit handler
  const handleFilterSubmit = (data: RegressionFilterOptional) => {
    setFilter({ ...data, energy_type: 'gas' });
    setShowFilterModal(false);
  };

  if (isError) return <div className="error-page">Failed to load regression data</div>;

  return (
    <div className="card min-h-full flex flex-col h-full overflow-y-auto">
      <div className="flex justify-between items-start mb-5">
        <SectionHeader
          title="Regression Analysis"
          description={correlation ? `Correlation: ${(correlation * 100).toFixed(2)}%` : ''}
        />
      </div>
      <div className="flex justify-end items-end mb-5 gap-3 z-[1]">
        <span className="h-[40px]" onClick={() => setShowFilterModal(!showFilterModal)}>
          <FilterBtn />
        </span>
      </div>

      <div className="flex flex-col h-full">
        {!orgAndFacultyFilterExists && !isError ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500">Please update the filter</p>
          </div>
        ) : isError || !chartData ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500">No data found</p>
          </div>
        ) : isLoading ? (
          <ChartSpinnerLoader />
        ) : chartData.length > 0 ? (
          <ScatterComponent data={chartData} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No regression data available</p>
          </div>
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
            energyTypeOptions={GAS_OPTION}
            defaultValues={filter}
          />
        }
      />
    </div>
  );
};

export default RegressionAnalysis;
