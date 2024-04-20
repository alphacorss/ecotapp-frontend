import { ArrowLeft2 } from 'iconsax-react';
import React from 'react';

import { TFacilityTabs } from '@/app/types';

const GoBack = ({
  tab,
  setActiveTab,
  setValidTabs,
}: {
  tab: TFacilityTabs;
  setActiveTab: React.Dispatch<React.SetStateAction<TFacilityTabs>>;
  setValidTabs: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) => {
  const handleGoBack = () => {
    setActiveTab(tab);
    setValidTabs((prev) => ({ ...prev, [tab]: false }));
  };
  return (
    <p
      className="w-full flex gap-1 items-center text-gray-600 font-[500] cursor-pointer select-none text-xs"
      onClick={handleGoBack}
    >
      <ArrowLeft2 size={14} /> Back
    </p>
  );
};

export default GoBack;
