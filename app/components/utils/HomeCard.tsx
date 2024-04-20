'use client';
import { ArrowUp, Buliding, People } from 'iconsax-react';
import { NetworkIcon } from 'lucide-react';
import React from 'react';

import { SelectComponent } from './SelectComponent';

type TCardProps = {
  title: string;
  data: {
    period: string;
    value: number;
    percentage: number;
  }[];
};

const HomeCard = ({ title, data }: TCardProps) => {
  const [selected, setSelected] = React.useState('last_7_days');

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  return (
    <div className="card p-[24px] min-h-[150px] justify-between flex flex-col">
      <div className="flex justify-between items-start flex-row lg:items-center mb-[16px]">
        <span className="text-xs font-[500] text-gray-500 border p-2 rounded-[var(--rounded)]">
          {title.includes('Facilit') && <Buliding size={20} className="text-gray-400" />}
          {title.includes('Tenants') && <People size={20} className="text-gray-400" />}
          {title.includes('Organization') && <NetworkIcon size={20} className="text-gray-400" />}
        </span>
        <p className="text-xs font-[500] text-gray-500 whitespace-nowrap">
          <SelectComponent
            variant="ghost"
            size="auto"
            className="h-[100px]"
            title="Filter"
            array={[
              { name: 'Last 7 days', value: 'last_7_days' },
              { name: 'Last 30 days', value: 'last_30_days' },
              { name: 'Last 90 days', value: 'last_90_days' },
            ]}
            handleSelect={handleSelect}
          />
        </p>
      </div>
      <div>
        {data.map((item, i) => {
          if (item.period === selected) {
            return (
              <div key={i} className="flex gap-3 justify-between items-end">
                <div className="flex flex-col lg:text-3xl font-[600] text-gray-700 gap-[8px]">
                  <p className="text-xs lg:text-sm font-[400] text-gray-400">{title}</p>
                  <p>{item.value}</p>
                </div>
                <span className="text-xs text-[#0B7041] border border-[#9EE1C2] bg-[#E7F8F0] rounded-[var(--rounded)] p-1 lg:p-2 font-[500] flex gap-1 items-center">
                  {<ArrowUp size={15} />}
                  {item.percentage}%
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default HomeCard;
