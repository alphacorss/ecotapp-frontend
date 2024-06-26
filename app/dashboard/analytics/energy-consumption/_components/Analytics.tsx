import { InfoCircle } from 'iconsax-react';
import React from 'react';

import { cardsData } from '../../helpers';
import AreaComponent from '@/app/_components/charts/AreaChart';
import { Percentage } from '@/app/_components/utils/Percentage';
import { TAnalyticsConsumption } from '@/app/types';
import { cleanNumber } from '@/lib/utils';

const Analytics = ({
  consumption,
  monthlyData,
}: {
  consumption: TAnalyticsConsumption;
  monthlyData: {
    time: string;
    value: number;
  }[];
}) => {
  return (
    <div className="flex flex-col">
      {monthlyData && <AreaComponent type="monotone" data={monthlyData} />}
      <div className="border mt-10 flex lg:flex-row flex-col justify-between p-3 lg:p-5 rounded-[var(--rounded)]">
        {cardsData(consumption).map((data, i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-cetner p-5 w-full ${i + 1 !== 3 ? ' border-b lg:border-b-0 lg:border-r' : ''}`}
          >
            <div className="w-full h-full flex justify-between flex-col">
              <div className="flex gap-3 mb-4 items-end">
                <h3 className="text-gray-500 font-[600] text-sm flex items-center gap-3">{data.title}</h3>
                <span className="text-gray-500">
                  <InfoCircle size={17} strokeWidth={3} />
                </span>
              </div>
              <div className="flex justify-between w-full gap-3">
                <h2 className="text-3xl text-gray-800 font-[600]">
                  {cleanNumber(Math.round(data.value))}{' '}
                  <span className="text-sm text-gray-400">{data.title === 'Energy Efficiency' ? '%' : 'kWh'}</span>
                </h2>
                <Percentage number={data.percentage} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
