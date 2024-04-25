import React from 'react';

import HomeCard from '../HomeCards';
import HomeMain from '../HomeMain';
import User from '@/app/_context/User';
import { cardsData } from '@/app/dashboard/home/helpers';
import { TRole } from '@/app/types';

const HighAdminHomePage = () => {
  const role = React.useContext(User).role;

  return (
    <div className="flex flex-col gap-5 justify-between min-h-full">
      <div
        className={`grid gap-5 ${
          role === 'superadmin' || role === ('psuedoadmin' as TRole)
            ? 'grid-cols-1 md:grid-cols-3'
            : 'grid-cols-1 md:grid-cols-2'
        }`}
      >
        {cardsData.map((data, i) => {
          if (!data.allowedRoles.includes(role as TRole)) return null;
          return <HomeCard key={i} data={data} />;
        })}
      </div>
      <HomeMain />
    </div>
  );
};

export default HighAdminHomePage;
