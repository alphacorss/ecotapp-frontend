import { NetworkIcon, Building } from 'lucide-react';
import React from 'react';

import { TFacility, TFacilityUser, TOrg, TUser } from '@/app/types';
import { capitalizeFirstLetter } from '@/lib/utils';

const SectionHeader = ({ title, description }: { title: string; description: string }) => {
  return (
    <div>
      <h3 className="text-xl font-[600] text-gray-600 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 font-[400]">{description}</p>
    </div>
  );
};

export default SectionHeader;

export const OrganizationHeader = ({
  organization,
  showUser,
  user,
}: {
  organization: TOrg | undefined;
  showUser?: boolean;
  user?: TUser;
}) => {
  return (
    <>
      {organization && (
        <>
          {showUser ? (
            <h3 className="text-xl font-[600] text-gray-600 mb-1">
              {capitalizeFirstLetter(`${user?.user.firstName} ${user?.user.lastName}`)}
            </h3>
          ) : (
            <h3 className="text-xl font-[600] text-gray-600 mb-1">{capitalizeFirstLetter(organization.name)}</h3>
          )}
        </>
      )}
    </>
  );
};

export const FacilityHeader = ({
  facilityData,
  user,
  showUser,
}: {
  facilityData: TFacility | undefined;
  user?: TFacilityUser;
  showUser?: boolean;
}) => {
  return (
    <>
      {facilityData && (
        <div>
          {showUser ? (
            <h2 className="text-lg font-[600] text-gray-600 mb-1">
              {capitalizeFirstLetter(`${user?.user.firstName} ${user?.user.lastName}`)}
            </h2>
          ) : (
            <h3 className="text-xl font-[600] text-gray-600 mb-1">{capitalizeFirstLetter(facilityData.name)}</h3>
          )}
          <span className="text-gray-500 flex items-center gap-2 text-sm">
            <NetworkIcon size={18} />
            {facilityData.organization.name}
          </span>
        </div>
      )}
    </>
  );
};

export const TenantHeader = ({ extendedUser }: { extendedUser: TFacilityUser | undefined }) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-[600] text-gray-600">
        {capitalizeFirstLetter(extendedUser?.user.firstName as string)}{' '}
        {capitalizeFirstLetter(extendedUser?.user.lastName as string)}
      </h3>
      <div className="flex gap-3 justify-center items-center">
        <span className="text-gray-500 flex items-center gap-2 text-sm">
          <NetworkIcon size={18} />
          {capitalizeFirstLetter(extendedUser?.facility?.organization?.name as string)}
        </span>
        <span className="text-gray-500">•</span>
        <span className="text-gray-500 flex items-center gap-2 text-sm">
          <Building size={18} />
          {capitalizeFirstLetter(extendedUser?.facility?.name as string)}
        </span>
      </div>
    </div>
  );
};
