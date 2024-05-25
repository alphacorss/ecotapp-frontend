import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { PieComponent } from '@/app/_components/charts/PieChart';
import { BoxLoader } from '@/app/_components/utils/Loader';
import { SelectComponent } from '@/app/_components/utils/SelectComponent';
import { chartSelectOptions } from '@/app/_constants/data';
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

  const chart = homePieChart?.data?.data?.data?.stat;

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

      <>
        {homePieChart.isLoading || homePieChart.isFetching ? (
          <BoxLoader className="h-full w-full mt-6" />
        ) : (
          <PieComponent data={chart.current_month_energy_breakdown} />
        )}
      </>
    </div>
  );
};

export default PieHomeComponent;
