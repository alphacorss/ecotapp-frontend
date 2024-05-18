import React from 'react';

import Analytics from './Analytics';
import RealTime from './RealTime';
import { cleanChartDataMonthly } from '../../helpers';
import { TAnalyticsConsumption, TRealTimeData } from '@/app/types';

const DataPage = ({
  viewType,
  consumption,
  realTimeData,
}: {
  viewType: string | null;
  realTimeData: TRealTimeData;
  consumption: TAnalyticsConsumption;
}) => {
  const monthlyData = cleanChartDataMonthly(consumption?.array_of_energy);

  return (
    <React.Fragment>
      {viewType === 'analytics' ? (
        <Analytics consumption={consumption} monthlyData={monthlyData} />
      ) : (
        <div className="min-h-[calc(100%-30px)]">
          <RealTime realTimeData={realTimeData} />
        </div>
      )}
    </React.Fragment>
  );
};

export default DataPage;
