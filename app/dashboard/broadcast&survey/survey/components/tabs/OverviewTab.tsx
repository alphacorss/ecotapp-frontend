'use client';
import React from 'react';

import Queries from '@/app/_context/Queries';
import { TOrg, TSurveyData } from '@/app/types';
import { capitalizeFirstLetter, cleanDate, cleanTime } from '@/lib/utils';

const OverviewTab = ({ surveyDetail }: { surveyDetail: TSurveyData | undefined }) => {
  let to = '';
  const { orgs, facilities } = React.useContext(Queries);
  const isOrg = surveyDetail?.to[0]?.includes('organization');
  const isFacility = surveyDetail?.to[0]?.includes('facility');

  if (surveyDetail?.to[0] === 'all') {
    to = 'All tenants';
  } else {
    if (isOrg) {
      const org = orgs?.data?.data?.organization?.find((org: TOrg) => {
        return org._id === surveyDetail?.to[0]?.split('_')[1];
      });

      to = `${org?.name}`;
    } else {
      const facility = facilities?.data?.data?.facility?.find((facility: TOrg) => {
        return facility._id === surveyDetail?.to[0]?.split('_')[1];
      });

      to = `${facility?.name}`;
    }
  }

  const info = [
    {
      title: 'Created By',
      value: `${surveyDetail?.from?.firstName} ${surveyDetail?.from?.lastName}`,
    },
    {
      title: isOrg ? 'Sent to Organization' : isFacility ? 'Sent to Facility' : 'Sent to Tenant',
      value: `${to}`,
    },
    {
      title: 'No of Responses',
      value: surveyDetail?.responseCounts || 0,
    },
    {
      title: 'Date Created',
      value: cleanDate(surveyDetail?.createdAt || ''),
    },
    {
      title: 'Time Created',
      value: cleanTime(surveyDetail?.createdAt || ''),
    },
  ];

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full mb-10">
        <p className="text-left text-xs text-gray-400 font-[500] mb-1">Survey Description</p>
        <p className="text-left text-gray-900 font-[500]">
          {capitalizeFirstLetter(surveyDetail?.description || 'No description provided for this survey')}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-y-8">
        {info.map((item, i) => (
          <div key={i} className="flex flex-col text-left">
            <p className="text-left text-xs text-gray-400 font-[500] mb-1">{item.title}</p>
            <p className="text-left text-gray-900 font-[500]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewTab;
