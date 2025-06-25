import { Loader2 } from 'lucide-react';
import React from 'react';

const ChartSpinnerLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[350px] min-h-[200px]">
      <Loader2 className="animate-spin text-primary-500 mb-3" size={40} />
      <span className="text-gray-500 text-sm font-medium">Loading chart data...</span>
    </div>
  );
};

export default ChartSpinnerLoader;
