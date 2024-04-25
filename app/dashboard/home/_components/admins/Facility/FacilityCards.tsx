import React from 'react';

import FacilityCard from './FacilityCard';
import { facilityCardsData } from '../../../helpers';
import User from '@/app/_context/User';
import { TFacilityUser } from '@/app/types';

export const FacilityHomeCards = () => {
  const user = React.useContext(User).user as TFacilityUser;
  const facilityId = user.facility._id;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {facilityCardsData.map((data, i) => {
        return <FacilityCard key={i} facilityId={facilityId} data={data} />;
      })}
    </div>
  );
};
