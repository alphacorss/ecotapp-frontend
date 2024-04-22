import { Filter } from 'iconsax-react';
import { ChevronDown } from 'lucide-react';
import React from 'react';

import BarComponent from '../../charts/BarChart';
import { DropdownMenuComponent } from '../../utils/DropDowns';
import NotificationComponent from '../../utils/NotificationComponent';
import { SelectComponent } from '../../utils/SelectComponent';
import Queries from '@/app/_context/Queries';
import { TChart, TMessages } from '@/app/types';
import { Button } from '@/components/ui/button';

const HomePageTenant = ({
  chart,
  handleSelect,
}: {
  chart: TChart;
  // eslint-disable-next-line no-unused-vars
  handleSelect: (value: string) => void;
}) => {
  const { myMessages } = React.useContext(Queries);
  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = React.useState(77);
  const types = [
    {
      name: 'Water',
      value: 190,
    },
    {
      name: 'Electricity',
      value: 200,
    },
    {
      name: 'Gas',
      value: 300,
    },
    {
      name: 'Solar',
      value: 400,
    },
  ];

  const notifications: TMessages[] = myMessages?.data?.data?.messages;

  return (
    <>
      <div className="flex gap-5">
        <div className="card flex-[7]">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-[700] text-gray-600 pb-1">Total Energy Consumption</h3>
            <div>
              <SelectComponent
                size="small"
                className="h-[100px] w-fit"
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
          <div className="flex flex-col gap-3 mb-8">
            <h2 className="text-primary-200 font-[500] text-2xl">1,700kWh</h2>

            <div className="w-full bg-[#EBEBEB] rounded-[7px] dark:bg-gray-700">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-[7px] rounded-tr-none rounded-br-none"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-500 font-[500] text-xs">
                Next Month Prediction: <span className="text-primary-500 font-[600]">3,400kWh</span>
              </p>
              <p className="text-gray-500 font-[500] text-xs">
                Max. Threshold: <span className="text-primary-500 font-[600]">2,700kWh</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-start border border-gray-300 p-3 rounded-[var(--rounded)]">
            <h3 className="text-lg font-[700] text-gray-600 pb-1 mb-3">Consumption by Energy Type</h3>
            <div className="flex justify-between flex-wrap items-center w-full">
              {types.map((type, index) => (
                <div className="flex flex-col items-start gap-1" key={index}>
                  <p className="text-gray-400 font-[500] text-[13px]">{type.name}</p>
                  <p className="text-gray-700 font-[600]">{type.value}kWh</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card flex-[4]">
          <NotificationComponent notifications={notifications} />
        </div>
      </div>
      <div className="card w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-lg font-[600] text-gray-600">Consumption History</h1>
        </div>
        <div className="flex justify-end items-center mb-6 flex-col md:flex-row gap-3">
          <DropdownMenuComponent
            trigger={
              <Button className="px-2" variant="outlineGrayHover">
                Energy Type <ChevronDown size={20} />
              </Button>
            }
          />
          <DropdownMenuComponent
            trigger={
              <Button className="px-2" variant="outlineGrayHover">
                <Filter size={20} /> Filter
              </Button>
            }
          />
        </div>

        <div className="flex gap-10 justify-between items-center flex-col md:flex-row">
          <BarComponent data={chart.data} />
        </div>
      </div>
    </>
  );
};

export default HomePageTenant;
