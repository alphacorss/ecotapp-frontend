import { useQuery } from '@tanstack/react-query';
import React from 'react';

import qry from '@/lib/queries';

interface RegressionData {
  correlation: number;
  intercept: number;
  slope: number;
}

export type RegressionFilter = {
  energy_type: string;
  organization?: string;
  facility: string;
  start_date: string;
  end_date: string;
};

export const useRegressionAnalysis = (filter: RegressionFilter) => {
  // Destructure filter
  const { energy_type, facility, start_date, end_date } = filter;

  // Fetch regression data
  const regressionQuery = useQuery({
    queryKey: ['regression', energy_type, facility, start_date, end_date],
    queryFn: () => qry.getEnergyRegressionRq(start_date, end_date, energy_type, facility),
    enabled: !!facility && !!energy_type && !!start_date && !!end_date,
  });

  // Transform regression data into chart points
  const generateChartData = (regressionData: RegressionData) => {
    const { slope, intercept } = regressionData;
    const points = [];

    // Generate points for X-axis (you might want to adjust the range based on your needs)
    for (let x = 0; x <= 100; x += 10) {
      // Calculate Y using the regression formula: Y = mx + b
      const y = slope * x + intercept;

      points.push({
        name: x, // X value
        pv: null, // This will be used for scatter points from actual data
        uv: y, // Regression line Y value
        amt: y, // You can use this for confidence intervals if needed
      });
    }

    return points;
  };

  const chartData = React.useMemo(() => {
    if (regressionQuery.data?.data?.stat) {
      return generateChartData(regressionQuery.data.data.stat);
    }
    return [];
  }, [regressionQuery.data]);

  return {
    chartData,
    isLoading: regressionQuery.isLoading,
    isError: regressionQuery.isError,
    correlation: regressionQuery.data?.data?.stat?.correlation,
  };
};
