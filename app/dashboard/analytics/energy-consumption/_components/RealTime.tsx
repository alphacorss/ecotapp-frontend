import React from 'react';

import { cleanChartDataHourly, getStartEndDateByHourDiff } from '../../helpers';
import AreaComponent from '@/app/_components/charts/AreaChart';
import { MOCK_REAL_TIME_DATA } from '@/app/_constants/mockChartData';
import { TRealTimeData } from '@/app/types';

const RealTime = ({ realTimeData }: { realTimeData: TRealTimeData }) => {
  const { start_date } = getStartEndDateByHourDiff(24);
  const startHour = parseInt(start_date.split('-').slice(3).join('-'));

  // Use mock data if realTimeData is undefined
  // const chartRealTimeData = realTimeData || MOCK_REAL_TIME_DATA;
  const chartRealTimeData = MOCK_REAL_TIME_DATA;
  const hourlyData = cleanChartDataHourly(chartRealTimeData?.array_of_energy, startHour);

  return (
    <React.Fragment>
      <AreaComponent type="temperature" data={hourlyData} />
    </React.Fragment>
  );
};

export default RealTime;
