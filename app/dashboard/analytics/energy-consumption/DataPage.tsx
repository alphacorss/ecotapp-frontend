import { ArrowUp } from 'lucide-react';
import React from 'react';

import AreaComponent from '@/app/_components/charts/AreaChart';

const DataPage = ({ viewType, barData }: { viewType: string | null; barData: { name: string; amt: number }[] }) => {
  return (
    <>
      {viewType === 'analytics' ? (
        <div className="flex flex-col">
          <AreaComponent type="monotone" data={barData} />
          <div className="border mt-10 flex justify-between p-5 rounded-[var(--rounded)]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`flex flex-col items-start justify-between p-5 w-full ${i + 1 !== 3 ? 'border-r' : ''}`}
              >
                <h3 className="text-gray-500 font-[600] text-sm mb-3">Energy Use Intensity</h3>
                <div className="flex justify-between items-end w-full max-w-[calc(100%-50px)]">
                  <h2 className="text-3xl text-gray-800 font-[600]">
                    10,000 <span className="text-sm text-gray-400">kWh</span>
                  </h2>
                  <span className="text-xs text-[#0B7041] border border-[#9EE1C2] bg-[#E7F8F0] rounded-[var(--rounded)] p-1 lg:p-2 font-[500] flex gap-1 items-center">
                    {<ArrowUp size={15} />}
                    20%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="min-h-[calc(100%-30px)]">
          <AreaComponent type="temperature" data={barData} />
        </div>
      )}
    </>
  );
};

export default DataPage;
