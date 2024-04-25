import React from 'react';

import { FacilityHomeCards } from './FacilityCards';
import { FacilityMainInfo } from './FacilityMainInfo';

const FacilityManagerHomePage = () => {
  return (
    <div className="flex flex-col gap-5 justify-between min-h-full">
      <FacilityHomeCards />
      <FacilityMainInfo />
    </div>
  );
};

export default FacilityManagerHomePage;
