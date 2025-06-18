import { TCurrentMonthEnergyBreakdown, TAnalyticsConsumption, TRealTimeData } from '../types';

// Mock data for Home Chart (Bar Chart)
export const MOCK_HOME_CHART_DATA = {
  array_of_energy: [1200, 1350, 1400, 1250, 1300, 1450, 1500, 1550, 1400, 1450, 1600, 1500],
  current_month_energy: 1500,
  current_month_energy_breakdown: {
    electricity: 1500,
    gas: 300,
    water: 200,
    heat: 100,
  },
  next_month_energy_forcast: 1600,
  percentage_increase_from_last_month: 6.67,
};

// Mock data for Pie Chart
export const MOCK_PIE_CHART_DATA: { current_month_energy_breakdown: TCurrentMonthEnergyBreakdown } = {
  current_month_energy_breakdown: {
    electricity: 1500,
    gas: 300,
    water: 200,
    heat: 100,
  },
};

// Mock data for Line Chart
export const MOCK_LINE_CHART_DATA = [
  { name: 'Jan', pv: 2400 },
  { name: 'Feb', pv: 1398 },
  { name: 'Mar', pv: 9800 },
  { name: 'Apr', pv: 3908 },
  { name: 'May', pv: 4800 },
  { name: 'Jun', pv: 3800 },
  { name: 'Jul', pv: 4300 },
  { name: 'Aug', pv: 4100 },
  { name: 'Sep', pv: 3490 },
  { name: 'Oct', pv: 3200 },
  { name: 'Nov', pv: 3780 },
  { name: 'Dec', pv: 4500 },
];

// Mock data for Area Chart
export const MOCK_AREA_CHART_DATA = [
  { time: 'Jan', value: 2400 },
  { time: 'Feb', value: 1398 },
  { time: 'Mar', value: 9800 },
  { time: 'Apr', value: 3908 },
  { time: 'May', value: 4800 },
  { time: 'Jun', value: 3800 },
  { time: 'Jul', value: 4300 },
  { time: 'Aug', value: 4100 },
  { time: 'Sep', value: 3490 },
  { time: 'Oct', value: 3200 },
  { time: 'Nov', value: 3780 },
  { time: 'Dec', value: 4500 },
];

// Mock data for Scatter Chart
export const MOCK_SCATTER_CHART_DATA = [
  { name: 'Jan', pv: 2400, uv: 4000 },
  { name: 'Feb', pv: 1398, uv: 3000 },
  { name: 'Mar', pv: 9800, uv: 2000 },
  { name: 'Apr', pv: 3908, uv: 2780 },
  { name: 'May', pv: 4800, uv: 1890 },
  { name: 'Jun', pv: 3800, uv: 2390 },
  { name: 'Jul', pv: 4300, uv: 3490 },
  { name: 'Aug', pv: 4100, uv: 4000 },
  { name: 'Sep', pv: 3490, uv: 3600 },
  { name: 'Oct', pv: 3200, uv: 3000 },
  { name: 'Nov', pv: 3780, uv: 2000 },
  { name: 'Dec', pv: 4500, uv: 4800 },
];

// Mock data for Double Line Chart
export const MOCK_DOUBLE_LINE_CHART_DATA = [
  { name: 'Jan', pv: 2400, uv: 4000 },
  { name: 'Feb', pv: 1398, uv: 3000 },
  { name: 'Mar', pv: 9800, uv: 2000 },
  { name: 'Apr', pv: 3908, uv: 2780 },
  { name: 'May', pv: 4800, uv: 1890 },
  { name: 'Jun', pv: 3800, uv: 2390 },
  { name: 'Jul', pv: 4300, uv: 3490 },
  { name: 'Aug', pv: 4100, uv: 4000 },
  { name: 'Sep', pv: 3490, uv: 3600 },
  { name: 'Oct', pv: 3200, uv: 3000 },
  { name: 'Nov', pv: 3780, uv: 2000 },
  { name: 'Dec', pv: 4500, uv: 4800 },
];

// Mock data for Analytics Consumption
export const MOCK_ANALYTICS_CONSUMPTION: TAnalyticsConsumption = {
  array_of_energy: [1200, 1350, 1400, 1250, 1300, 1450, 1500, 1550, 1400, 1450, 1600, 1500],
  total_energy_consumed: 15000,
  energy_use_intensity: {
    value: 50,
    percentage_increase: 5.5,
  },
  energy_cost_intensity: {
    value: 75,
    percentage_increase: 3.2,
  },
  energy_efficiency: {
    value: 85,
    percentage_increase: 2.1,
  },
};

// Mock data for Real-Time Data
export const MOCK_REAL_TIME_DATA: TRealTimeData = {
  array_of_energy: [100, 150, 120, 180, 200, 220, 240, 260, 280, 300, 320, 340],
  total_energy_consumed: 2500,
};
