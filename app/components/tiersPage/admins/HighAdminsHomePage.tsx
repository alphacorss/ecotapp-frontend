import React from 'react';

import BarComponent from '../../charts/BarChart';
import { PieComponent } from '../../charts/PieChart';
import HomeCard from '../../utils/HomeCard';
import { SelectComponent } from '../../utils/SelectComponent';
import Auth from '@/app/context/User';
import { TChart, TRole } from '@/app/types';

export type THomeData = {
  title: string;
  allowedRoles: TRole[];
  data: { period: string; value: number; percentage: number }[];
}[];

const HighAdminHomePage = ({
  data,
  total,
  percentage,
  barChart,
  pieChart,
  handleSelect,
}: {
  data: THomeData;
  total: number;
  percentage: number;
  barChart: TChart;
  pieChart: TChart;
  handleSelect: (value: string) => void;
}) => {
  const role = React.useContext(Auth).role;
  return (
    <>
      <div
        className={`grid  gap-5 ${
          role === 'superadmin' || role === ('psuedoadmin' as TRole)
            ? 'grid-cols-1 md:grid-cols-3'
            : 'grid-cols-1 md:grid-cols-2'
        }`}
      >
        {data.map((item, i) => {
          if (!item.allowedRoles.includes(role as TRole)) return null;
          return <HomeCard key={i} title={item.title} data={item.data} />;
        })}
      </div>
      <div className="card flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-lg font-[600] text-gray-600">Total Energy Consumption</h1>
          {/* <More size={20} className="text-gray-600 cursor-pointer" /> */}
        </div>
        <div className="flex justify-between items-start mb-6 flex-col md:flex-row">
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-3xl font-bold text-primary-300">{total} kWh</h1>
              <p className="text-xs text-gray-400 font-[500]">Current month</p>
            </div>
            <div>
              <p className="text-green-500 font-bold text-lg">+ {percentage}%</p>
              <p className="text-xs text-gray-400 font-[500]">Next month</p>
            </div>
          </div>
          <div>
            <SelectComponent
              className="h-[100px]"
              title="Filter"
              array={[
                { name: 'Last 7 days', value: 'last_7_days' },
                { name: 'Last 30 days', value: 'last_30_days' },
                { name: 'Last 90 days', value: 'last_90_days' },
              ]}
              handleSelect={handleSelect}
            />
          </div>
        </div>

        <div className="flex gap-5 justify-between items-center flex-col md:flex-row">
          <div className="flex-[7]">
            <BarComponent data={barChart.data} />
          </div>
          <div className="flex-[3.5]">
            <PieComponent data={pieChart.data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HighAdminHomePage;
