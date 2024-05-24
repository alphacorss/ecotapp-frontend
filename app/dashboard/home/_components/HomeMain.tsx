import { useQuery } from '@tanstack/react-query';
import React from 'react';

import PieHomeComponent from './PieHomeComponent';
import BarComponent from '@/app/_components/charts/BarChart';
import { HomeMainLoader } from '@/app/_components/utils/Loader';
import qry from '@/lib/queries';
import { cleanNumber, futurePercentage } from '@/lib/utils';

const HomeMain = ({ orgId, title }: { orgId?: string; title?: string }) => {
  const homeChart = useQuery({
    queryKey: ['homeChart'],
    queryFn: () => qry.homeChartsRq('201'),
    retry: 0,
    refetchOnMount: false,
  });

  if (homeChart.isLoading) return <HomeMainLoader />;
  if (homeChart.isError) return <div className="error-page flex-1">Something went wrong loading the charts</div>;

  const chart = homeChart?.data?.data?.data?.stat;

  const percentageForecast: number = futurePercentage(chart.next_month_energy_forcast, chart.current_month_energy) ?? 0;

  return (
    <div className="card flex-1">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-lg font-[600] text-gray-600">{title ? title : 'Total Energy Consumption'}</h1>
      </div>

      <div className="flex w-full h-full gap-5 flex-col lg:flex-row">
        <div className="flex flex-[4] justify-between items-start mb-6 flex-col md:flex-row">
          <div className="flex flex-col gap-5 w-full h-full">
            <div>
              <h1 className="text-3xl font-bold text-primary-300">{cleanNumber(chart.current_month_energy)} kWh</h1>
              <p className="text-xs text-gray-400 font-[500]">Current month</p>
            </div>
            <div>
              <p
                className={`text-green-500 font-bold text-lg ${
                  percentageForecast < 0 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {percentageForecast}%
              </p>
              <p className="text-xs text-gray-400 font-[500]">Next month</p>
            </div>
            <div className="w-full">
              <BarComponent data={chart.array_of_energy} />
            </div>
          </div>
        </div>

        <PieHomeComponent />
      </div>
    </div>
  );
};

export default HomeMain;
