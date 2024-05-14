import React from 'react';

import ViewModalInfo from '@/app/_components/view/ViewModalInfo';
import HomeMain from '@/app/dashboard/home/_components/HomeMain';
import { TFacility } from '@/app/types';

const FacilityOverviewsTab = ({ facility }: { facility: TFacility }) => {
  return (
    <div className="w-full flex justify-between flex-col">
      <div className="mb-8">
        <div className="w-full mb-8">
          <h3 className="font-[700] tracking-tight mb-3">Facility information</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-10">
            <ViewModalInfo title="Facility Name" info={facility.name} />
            <ViewModalInfo
              title="Address"
              info={`No ${facility.apt}, ${facility.street}, ${facility.province}, ${facility.country}`}
            />
            <ViewModalInfo title="Backup Generator" info={facility.backupgenerator} />
            <ViewModalInfo title="Total No. of Units" info={facility.totalNumberOfUnits} />
            <ViewModalInfo lowercase title="Total Common Areas" info={`${facility.totalCommonAreas} sq. ft.`} />
            <ViewModalInfo title="Building Foundation" info={facility.buidingFoundation} />
            <ViewModalInfo lowercase title="Area (GFA)" info={`${facility.area} sq. ft.`} />
            <ViewModalInfo title="Total No. of Meters" info={facility.totalNumberOfMeters} />
          </div>
        </div>
        <div className="mb-8">
          <p className="text-gray-400 tracking-tight text-xs font-[500] mb-1 capitalize">Certifications</p>
          <div className="flex flex-wrap items-center gap-3">
            {facility.Certifications.map((cert, i) => (
              <p
                key={i}
                className="border border-gray-300 text-gray-600 text-sm font-[500] p-1 px-2 rounded-[var(--rounded)]"
              >
                {cert}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p className="text-gray-400 tracking-tight text-xs font-[500] mb-1 capitalize">Amenities</p>
          <div className="flex flex-wrap items-center gap-3">
            {facility.Amenities.map((amenity, i) => (
              <p
                key={i}
                className="border border-gray-300 text-gray-600 text-sm font-[500] p-1 px-2 rounded-[var(--rounded)]"
              >
                {amenity}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div>
        <HomeMain title="Energy Consumption" />
      </div>
    </div>
  );
};

export default FacilityOverviewsTab;
