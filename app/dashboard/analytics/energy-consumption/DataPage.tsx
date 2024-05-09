import React from 'react';

import Analytics from './_components/Analytics';
import RealTime from './_components/RealTime';
import { cleanChartDataMonthly } from '../helpers';
import { TAnalyticsConsumption } from '@/app/types';

const DataPage = ({ viewType, consumption }: { viewType: string | null; consumption: TAnalyticsConsumption }) => {
  const monthlyData = cleanChartDataMonthly(consumption?.array_of_energy);

  return (
    <React.Fragment>
      {viewType === 'analytics' ? (
        <Analytics consumption={consumption} monthlyData={monthlyData} />
      ) : (
        <div className="min-h-[calc(100%-30px)]">
          <RealTime />
        </div>
      )}
    </React.Fragment>
  );
};

export default DataPage;
