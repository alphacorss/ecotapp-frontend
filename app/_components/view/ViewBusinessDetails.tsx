import { NetworkIcon } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import AdminsTab from '../../dashboard/users/organizations/components/tabs/admins/AdminsTab';
import { Btns } from '../../dashboard/users/organizations/components/tabs/Buttons';
import ManagersTab from '../../dashboard/users/organizations/components/tabs/managers/ManagersTab';
import { viewDetailsTabs } from '@/app/_constants/data';
import FacilityManagersTab from '@/app/dashboard/users/facilities/components/FacilityManagersTab';
import FacilityOverviewsTab from '@/app/dashboard/users/facilities/components/overview/OverviewsTab';
import OrgOverviewTab from '@/app/dashboard/users/organizations/components/tabs/overview/OrgOverviewTab';
import { TFacility, TSingleOrg } from '@/app/types';

const ViewBusinessDetails = ({
  orgData,
  facilityData,
  showDeleteModal,
  showEditModal,
}: {
  orgData?: TSingleOrg;
  facilityData?: TFacility;
  showDeleteModal: (id: string) => void;
  showEditModal: (id: string) => void;
}) => {
  const tab = useSearchParams().get('tab');
  const name = orgData?.organization.name || facilityData?.name;

  return (
    <div className="w-full">
      <h2 className="text-xl text-gray-800 font-[600] mb-1">{name}</h2>
      {facilityData && (
        <span className="text-gray-500 flex items-center gap-2 text-sm">
          <NetworkIcon size={18} />
          {facilityData.organization.name}
        </span>
      )}
      <hr className="my-3 mb-8" />

      <ul
        className={`grid text-center gap-3 w-full mb-10 bg-gray-200 place-content-center p-1 rounded-[7px] ${
          orgData ? 'grid-cols-3' : 'grid-cols-2'
        }`}
      >
        {viewDetailsTabs.map((link, i) => {
          const params = new URLSearchParams();
          params.set('tab', link.href);
          if (facilityData) params.set('facilityId', facilityData?._id);
          if (orgData) params.set('orgId', orgData?.organization._id);
          if (link.href === 'admins' && !orgData) return null;
          return (
            <li
              key={i}
              onClick={() => window.history.replaceState({}, '', `?${params}`)}
              className={`cursor-pointer p-2 text-sm transition font-[600] ${
                tab === link.href ? 'text-gray-700 bg-white rounded-[var(--rounded)]' : 'text-gray-500'
              }`}
            >
              {link.title}
            </li>
          );
        })}
      </ul>

      <div className="flex w-full lg:gap-10 gap-5 flex-col justify-between h-[calc(90vh-220px)]">
        {orgData && (
          <>
            {tab === 'overview' ? (
              <OrgOverviewTab singleOrg={orgData} />
            ) : tab === 'admins' && orgData ? (
              <AdminsTab org={orgData.organization} />
            ) : (
              <ManagersTab org={orgData.organization} />
            )}
            {tab === 'overview' && (
              <Btns
                orgId={orgData.organization._id}
                showDeleteModal={showDeleteModal}
                showEditModal={showEditModal}
                type={'org'}
              />
            )}
          </>
        )}
        {facilityData && (
          <>
            {tab === 'overview' ? (
              <FacilityOverviewsTab facility={facilityData} />
            ) : (
              <FacilityManagersTab facility={facilityData} />
            )}
            {tab === 'overview' && (
              <>
                <Btns
                  orgId={facilityData.organization._id}
                  facilityId={facilityData._id}
                  showDeleteModal={showDeleteModal}
                  showEditModal={showEditModal}
                  type={'facility'}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewBusinessDetails;
