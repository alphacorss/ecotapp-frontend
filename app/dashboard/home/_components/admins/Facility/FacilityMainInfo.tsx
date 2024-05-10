import { useQuery } from '@tanstack/react-query';
import React from 'react';

import BarComponent from '@/app/_components/charts/BarChart';
import { PieComponent } from '@/app/_components/charts/PieChart';
import { HomeMainLoader } from '@/app/_components/utils/Loader';
import { SelectComponent } from '@/app/_components/utils/SelectComponent';
import { chartSelectOptions } from '@/app/_constants/data';
import User from '@/app/_context/User';
import useLocalStorage from '@/app/_hooks/useLocalStorage';
import { TFacilityUser } from '@/app/types';
import qry from '@/lib/queries';
import { futurePercentage, getDateIndexes } from '@/lib/utils';

export const FacilityMainInfo = () => {
  const { year, monthIndex, dayIndex } = getDateIndexes();

  const [selected, setSelected] = useLocalStorage(`@homeChart_tenant`, `${year}-${monthIndex}-${dayIndex}`);

  const user = React.useContext(User).user as TFacilityUser;
  const units = user.facility.totalNumberOfUnits;

  const homeChart = useQuery({
    queryKey: ['homeChart_facility', selected],
    queryFn: () => qry.homeChartsRq(selected, units),
    retry: 0,
    refetchOnMount: false,
  });

  if (homeChart.isLoading) return <HomeMainLoader />;
  if (homeChart.isError) return <div className="error-page flex-1">Something went wrong loading the charts</div>;

  const chart = homeChart?.data?.data?.data?.stat;

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const percentageForecast = futurePercentage(chart.next_month_energy_forcast, chart.current_month_energy) ?? 0;

  return (
    <div className="card flex-1">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-lg font-[600] text-gray-600">Total Energy Consumption</h1>
      </div>
      <div className="flex justify-between items-start mb-6 flex-col md:flex-row">
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-3xl font-bold text-primary-300">{chart.current_month_energy} kWh</h1>
            <p className="text-xs text-gray-400 font-[500]">Current month</p>
          </div>
          <div>
            <p className="text-green-500 font-bold text-lg">+ {percentageForecast}%</p>
            <p className={`text-xs text-gray-400 font-[500]`}>Next month</p>
          </div>
        </div>
        <div>
          <SelectComponent
            title="Filter"
            className="h-[100px]"
            defaultValue={selected}
            array={chartSelectOptions}
            handleSelect={handleSelect}
          />
        </div>
      </div>

      <div className="flex gap-5 justify-between items-center flex-col md:flex-row">
        <div className="flex-[7]">
          <BarComponent data={chart.array_of_energy} />
        </div>
        <div className="flex-[3]">
          <PieComponent data={chart.current_month_energy_breakdown} />
        </div>
      </div>
    </div>
  );
};
