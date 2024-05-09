import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { cleanChartDataHourly, getStartEndDateByHourDiff } from '../../helpers';
import AreaComponent from '@/app/_components/charts/AreaChart';
import { ChartLoader } from '@/app/_components/utils/Loader';
import usePathParams from '@/app/_hooks/usePathParams';
import qry from '@/lib/queries';
import { getDateIndexes } from '@/lib/utils';

const { year, monthIndex, dayIndex } = getDateIndexes();

const RealTime = () => {
  const today = `${year}-0${monthIndex}-0${dayIndex}`;
  const { energy_type, refreshTime, orgId, facilityId, tenantId } = usePathParams();

  const { start_date, end_date } = getStartEndDateByHourDiff(24);
  const q = `unit=${201}&date=${today}&energy_type=${energy_type}&start_date=${start_date}&end_date=${end_date}`;

  const realTime = useQuery({
    queryKey: ['realTime', energy_type, orgId, facilityId, tenantId, refreshTime],
    queryFn: () => qry.realTimeRq(q),
    refetchInterval: 10000 * parseInt(refreshTime as string),
    refetchOnMount: false,
  });

  const isLoading = realTime.isLoading;

  if (isLoading) return <ChartLoader />;

  const consumption = realTime.data?.data.data.stat;
  const startHour = parseInt(start_date.split('-').slice(3).join('-'));
  const hourlyData = cleanChartDataHourly(consumption?.array_of_energy, startHour);

  return (
    <React.Fragment>
      <AreaComponent type="temperature" data={hourlyData} />
    </React.Fragment>
  );
};

export default RealTime;
