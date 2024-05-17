import { Chart1, DocumentDownload, Firstline, Location, PresentionChart, Trash } from 'iconsax-react';
import { Plus } from 'lucide-react';

import { getDateIndexes } from '@/lib/utils';

export const viewDetailsTabs = [
  {
    title: 'Overview',
    href: 'overview',
  },
  {
    title: 'Admins',
    href: 'admins',
  },
  {
    title: 'Managers',
    href: 'managers',
  },
];

export const broadcastRoles = [
  {
    label: 'Pseudo Admins',
    value: 'psuedoadmin',
    allowedRoles: ['superadmin'],
  },
  {
    label: 'Organization Admins',
    value: 'organizationadmin',
    allowedRoles: ['superadmin', 'psuedoadmin'],
  },
  {
    label: 'Organization Managers',
    value: 'organizationmanager',
    allowedRoles: ['superadmin', 'psuedoadmin', 'organizationadmin'],
  },
  {
    label: 'Facility Managers',
    value: 'facilitymanager',
    allowedRoles: ['superadmin', 'psuedoadmin', 'organizationadmin', 'organizationmanager'],
  },
  {
    label: 'Tenants',
    value: 'tenant',
    allowedRoles: ['superadmin', 'psuedoadmin', 'organizationadmin', 'organizationmanager', 'facilityadmin'],
  },
];

export const filterToggle = [
  {
    name: 'list',
    label: 'List',
    icon: () => <Firstline size={16} />,
  },
  {
    name: 'map',
    label: 'Map',
    icon: () => <Location size={16} />,
  },
];

export const energyToggle = [
  {
    name: 'analytics',
    label: 'Analytics',
    icon: () => <Chart1 size={16} />,
  },
  {
    name: 'real-time',
    label: 'Real Time',
    icon: () => <PresentionChart size={16} />,
  },
];

export const homeSelectOptions = [
  { name: 'Last 30 days', value: 'last_30' },
  { name: 'Last 60 days', value: 'last_60' },
  { name: 'Last 90 days', value: 'last_90' },
];

const { dayIndex, monthIndex, year } = getDateIndexes();

export const chartSelectOptions = [
  { value: `${year}-${monthIndex}-${dayIndex}`, name: 'Last 30 days' },
  { value: `${year}-${parseInt(monthIndex) - 1}-${dayIndex}`, name: 'Last 60 days' },
  { value: `${year}-${parseInt(monthIndex) - 2}-${dayIndex}`, name: 'Last 90 days' },
];

export const analyticsOptionsArry = (
  addToReportAction: () => void,
  downloadAction: () => void,
  clearAction: () => void,
) => {
  return [
    <button key={'addToReportAction'} className="more font-[500] font-poppins" onClick={addToReportAction}>
      <Plus className="h-4 w-4" />
      Add to report
    </button>,
    <button key={'downloadAction'} className="more font-[500] font-poppins" onClick={downloadAction}>
      <DocumentDownload className="h-4 w-4" />
      Download report
    </button>,
    <button key={'clearAction'} className="more font-[500] font-poppins text-error-300" onClick={clearAction}>
      <Trash className="h-4 w-4" />
      Clear report
    </button>,
  ];
};

export const energyTypeArray = [
  { label: 'Electricity', value: 'electricity' },
  // { label: 'Water', value: 'water' },
  // { label: 'Gas', value: 'gas' },
  // { label: 'Heat', value: 'heat' },
];

export const barData = [
  { name: 'Jan', amt: 4000 },
  { name: 'Feb', amt: 3000 },
  { name: 'Mar', amt: 2000 },
  { name: 'Apr', amt: 0 },
  { name: 'May', amt: 1890 },
  { name: 'Jun', amt: 2390 },
  { name: 'Jul', amt: 2321 },
  { name: 'Aug', amt: 3729 },
  { name: 'Sep', amt: 2934 },
  { name: 'Oct', amt: 1111 },
  { name: 'Nov', amt: 3490 },
  { name: 'Dec', amt: 1278 },
];

export const pieData = [
  { name: 'Water', amt: 2400 },
  { name: 'Electricity', amt: 2210 },
  { name: 'Gas', amt: 2290 },
  { name: 'Heat', amt: 2000 },
];

export const toggleData = [
  {
    period: 'last_7_days',
    value: 380000,
    percentage: 8.34,
  },
  {
    period: 'last_30_days',
    value: 43372300,
    percentage: 9.55,
  },
  {
    period: 'last_90_days',
    value: 433723002324,
    percentage: 34.12,
  },
];

export const largeDataSet = [
  { name: 'Jan', uv: 4150, pv: 4000, amt: 1980 },
  { name: 'Feb', uv: 1190, pv: 4310, amt: 2080 },
  { name: 'Mar', uv: 7250, pv: 4200, amt: 2080 },
  { name: 'Apr', uv: 6150, pv: 3700, amt: 2450 },
  { name: 'May', uv: 2950, pv: 2500, amt: 2350 },
  { name: 'Jun', uv: 1115, pv: 4290, amt: 2090 },
  { name: 'Jul', uv: 2970, pv: 4320, amt: 2100 },
  { name: 'Aug', uv: 3950, pv: 4900, amt: 2150 },
  { name: 'Sep', uv: 2050, pv: 1450, amt: 2260 },
  { name: 'Oct', uv: 2050, pv: 4280, amt: 2150 },
  { name: 'Nov', uv: 8100, pv: 4350, amt: 2070 },
  { name: 'Dec', uv: 2950, pv: 9900, amt: 2310 },
];
