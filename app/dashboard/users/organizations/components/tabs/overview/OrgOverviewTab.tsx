import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import ViewModalInfo from '@/app/_components/view/ViewModalInfo';
import { closeModal } from '@/app/_slices/ModalSlice';
import HomeMain from '@/app/dashboard/home/_components/HomeMain';
import { Modals } from '@/app/enums';
import { TSingleOrg } from '@/app/types';
import { Button } from '@/components/ui/button';

const OrgOverviewTab = ({ singleOrg }: { singleOrg: TSingleOrg }) => {
  const dispatch = useDispatch();
  const { organization } = singleOrg;
  return (
    <div className="w-full flex justify-between flex-col">
      <div className="w-full lg:mb-16 mb-8">
        <h3 className="font-[700] tracking-tight mb-3">Organization information</h3>

        <div className="grid md:grid-cols-3 gap-5 gap-x-10">
          <ViewModalInfo title="Organization Name" info={organization.name} />
          <div>
            <p className="text-gray-400 tracking-tight text-xs font-[500] mb-1">No of Facilities</p>
            <span className="flex items-center gap-3 text-gray-600 tracking-tight text-sm font-[600]">
              <p>{singleOrg.facilities.length}</p>
              <Button
                variant="outline"
                className="p-0 px-2 rounded-[4px] h-auto"
                onClick={() => dispatch(closeModal(Modals.viewOrgModal))}
              >
                <Link href={`/dashboard/users/facilities?sp=${organization.name}`}>View</Link>
              </Button>
            </span>
          </div>
          <ViewModalInfo
            title="Address"
            info={`No ${organization.apt}, ${organization.street}, ${organization.province}, ${organization.country}`}
          />
        </div>
      </div>
      <div>
        <HomeMain title="Energy Consumption" />
      </div>
    </div>
  );
};

export default OrgOverviewTab;
