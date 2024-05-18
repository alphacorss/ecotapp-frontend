import React from 'react';

import { cleanChartDataHourly, getStartEndDateByHourDiff } from '../../helpers';
import AreaComponent from '@/app/_components/charts/AreaChart';
import { TRealTimeData } from '@/app/types';

const RealTime = ({ realTimeData }: { realTimeData: TRealTimeData }) => {
  const { start_date } = getStartEndDateByHourDiff(24);
  const startHour = parseInt(start_date.split('-').slice(3).join('-'));
  const hourlyData = cleanChartDataHourly(realTimeData?.array_of_energy, startHour);

  return (
    <React.Fragment>
      <AreaComponent type="temperature" data={hourlyData} />
    </React.Fragment>
  );
};

export default RealTime;
