import { TAnalyticsConsumption } from '@/app/types';

export const cardsData = (consumption: TAnalyticsConsumption | undefined) => {
  if (!consumption) return [];

  return [
    {
      title: 'Energy Use Intensity',
      value: consumption.energy_use_intensity.value,
      percentage: consumption.energy_use_intensity.percentage_increase,
    },
    {
      title: 'Energy Cost Intensity',
      value: consumption.energy_cost_intensity.value,
      percentage: consumption.energy_cost_intensity.percentage_increase,
    },
    {
      title: 'Energy Efficiency',
      value: consumption.energy_efficiency.value,
      percentage: consumption.energy_efficiency.percentage_increase,
    },
  ];
};

export const cleanChartDataHourly = (arr: number[], start_hour: number) => {
  const result = [];
  const hourInSeconds = 3600; // 1 hour = 3600 seconds
  const maxHours = 24;

  for (let i = 0; i < arr.length; i++) {
    const timeSeconds = ((i + start_hour) % maxHours) * hourInSeconds; // Calculate time in seconds based on start_hour
    const hours = Math.floor(timeSeconds / 3600);

    const timeString = `${hours.toString().padStart(2, '0')}:00`;
    const value = arr[i];

    result.push({ time: timeString, value: value });
  }

  return result;
};

export const cleanChartDataMonthly = (data: number[]) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return data?.map((value, index) => ({ time: months[index], value }));
};

export const getStartEndDateByHourDiff = (duration: number): { start_date: string; end_date: string } => {
  // Get the current date
  const currentDate: Date = new Date();

  // Calculate the end date by adding the duration in hours
  const endDate: Date = new Date(currentDate.getTime() + duration * 60 * 60 * 1000);

  // Format the dates
  const formatDate = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}-${String(date.getMinutes()).padStart(2, '0')}-${String(date.getSeconds()).padStart(2, '0')}`;
  };

  return {
    start_date: formatDate(currentDate),
    end_date: formatDate(endDate),
  };
};
