import { useQuery } from '@tanstack/react-query';
import React from 'react';

import qry from '@/lib/queries';

export type EnergyForecastFilter = {
  energy_type?: string;
  organization?: string;
  facility?: string;
  start_date?: string;
  end_date?: string;
};

export const useEnergyForecast = (filter: EnergyForecastFilter) => {
  // Destructure filter
  const { energy_type, facility, start_date, end_date } = filter;

  // Fetch regression data
  const energyForecastQuery = useQuery({
    queryKey: ['energyForecast', energy_type, facility, start_date, end_date],
    queryFn: () => qry.getEnergyForecastRq(start_date, end_date, energy_type, facility),
    enabled: true,
  });

  const chartData = React.useMemo(() => {
    const stat = energyForecastQuery.data?.data?.stat || [];
    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return stat.map((item: { month: number; consumption: number }) => ({
      month: monthNames[item.month] || `Month ${item.month}`,
      consumption: item.consumption,
    }));
  }, [energyForecastQuery.data]);

  return {
    chartData,
    isLoading: energyForecastQuery.isLoading,
    isError: energyForecastQuery.isError,
  };
};
