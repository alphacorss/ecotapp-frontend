import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { PieComponent } from '@/app/_components/charts/PieChart';
import { BoxLoader } from '@/app/_components/utils/Loader';
import { SelectComponent } from '@/app/_components/utils/SelectComponent';
import { chartSelectOptions } from '@/app/_constants/data';
import { MOCK_PIE_CHART_DATA } from '@/app/_constants/mockChartData';
import useLocalStorage from '@/app/_hooks/useLocalStorage';
import qry from '@/lib/queries';
import { getDateIndexes } from '@/lib/utils';

const { year, monthIndex, dayIndex } = getDateIndexes();

const PieHomeComponent = () => {
  const [selected, setSelected] = useLocalStorage(`@homeChart`, `${year}-${monthIndex}-${dayIndex}`);

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const homePieChart = useQuery({
    queryKey: ['homePieChart', selected],
    queryFn: () => qry.homePieChartsRq(selected, '201'),
    retry: 0,
    refetchOnMount: false,
  });

  // Get chart data with fallback to mock data
  const chart = homePieChart?.data?.data?.data?.stat || MOCK_PIE_CHART_DATA.current_month_energy_breakdown;

  if (homePieChart.isError) {
    console.error('Error loading pie chart data, falling back to mock data');
  }

  return (
    <div className="flex-[2] h-auto flex flex-col justify-between border p-[20px] rounded-[var(--rounded)]">
      <div className="grid place-content-end">
        <SelectComponent
          className="h-[100px]"
          title="Filter"
          defaultValue={selected}
          array={chartSelectOptions}
          handleSelect={handleSelect}
        />
      </div>

      {homePieChart.isLoading ? <BoxLoader className="h-full w-full mt-6" /> : <PieComponent data={chart} />}
    </div>
  );
};

export default PieHomeComponent;
