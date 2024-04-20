import { Diagram, Edit2, Trash } from 'iconsax-react';
import { Building, NetworkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import ViewModalInfo from './ViewModalInfo';
import { useHandleMutation } from '@/app/_hooks/useHandleMutation';
import { TFacility, TOrg, TRole, TUser, TUserExtended } from '@/app/types';
import { Button } from '@/components/ui/button';
import qry from '@/lib/queries';
import { cleanRole, cleanRoleSingular } from '@/lib/utils';

interface CustomError extends Error {
  response?: { data?: { message?: string } };
}

const ViewUser = ({
  role,
  user,
  org,
  facility,
  showEditModal,
  showDeleteModal,
}: {
  role: TRole;
  user: TUser | TUserExtended;
  org?: TOrg;
  facility?: TFacility;
  showEditModal: () => void;
  showDeleteModal: () => void;
}) => {
  const router = useRouter();
  const userRole = cleanRole(role);
  const userRoleSingular = cleanRoleSingular(role);
  const extendedUser = user as TUserExtended;
  const requestPasswordLink = useHandleMutation(qry.resetPasswordRq, []);
  const { mutate, isError, error: rawError, isPending, isSuccess } = requestPasswordLink;
  const error = rawError as CustomError;

  const handleResetPassword = () => {
    mutate(user.user.email);
  };

  let address = '';
  switch (role) {
    case 'organizationadmin':
      address = `No ${org?.apt}, ${org?.street}, ${org?.province}, ${org?.country}`;
      break;
    case 'organizationmanager':
      address = `No ${org?.apt}, ${org?.street}, ${org?.province}, ${org?.country}`;
      break;
    case 'facilitymanager':
      address = `No ${facility?.apt}, ${facility?.street}, ${facility?.province}, ${facility?.country}`;
      break;
    case 'tenant':
      address = `No ${extendedUser?.facility?.apt}, ${extendedUser?.facility?.street}, ${extendedUser?.facility?.province}, ${extendedUser?.facility?.country}`;
      break;
    default:
      break;
  }

  return (
    <>
      {user && (
        <div>
          <div className="border-b pb-2 border-gray-300 mb-5">
            <h2 className="text-xl font-[600] text-gray-700 mb-3">
              {user.user.firstName} {user.user.lastName}
            </h2>
            {role !== 'pseudoadmin' && (
              <div className="flex items-center gap-3">
                {org ? (
                  <span className="text-gray-500 flex items-center gap-2 text-sm">
                    <NetworkIcon size={18} />
                    {org?.name}
                  </span>
                ) : (
                  <>
                    <span className="text-gray-500 flex items-center gap-2 text-sm">
                      <NetworkIcon size={18} />
                      {extendedUser?.facility?.organization?.name}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-500 flex items-center gap-2 text-sm">
                      <Building size={18} />
                      {extendedUser?.facility?.name}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="mb-10">
            <h1 className="text-xl font-[700] tracking-tight text-gray-700 mb-5">{userRole} Information</h1>
            <div className="grid md:grid-cols-2 gap-y-7">
              <ViewModalInfo title="First Name" info={user.user.firstName} />
              <ViewModalInfo title="Last Name" info={user.user.lastName} />
              <ViewModalInfo title="Phone no." info={user.user.phone} />
              {role !== 'pseudoadmin' && (
                <ViewModalInfo
                  title={`${role.includes('tenant') ? 'Facility' : 'Organization'} Address`}
                  info={address}
                />
              )}
              <ViewModalInfo lowercase title="Email Address" info={user.user.email} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-5">
            <Button variant="outline" className="w-full flex items-center gap-3 font-[500]" onClick={showEditModal}>
              <Edit2 size={17} /> Edit Details
            </Button>
            {role === 'tenant' && (
              <Button
                className="flex gap-3 w-full"
                variant="outline"
                onClick={() =>
                  router.push(
                    `/dashboard/analytics/energy-consumption?vt=analytics&filter=true&from=03-12-24&to=03-28-24&energyType=electricity&orgId=${extendedUser.facility.organization._id}&facilityId=${extendedUser.facility._id}&tenantId=${extendedUser._id}`,
                  )
                }
              >
                <Diagram className="w-4 h-4" />
                View Analytics
              </Button>
            )}
            <Button
              variant="destructiveOutline"
              className="w-full flex items-center gap-3 font-[500]"
              onClick={showDeleteModal}
            >
              <Trash size={17} /> Delete {userRoleSingular}
            </Button>
          </div>
          <Button
            type="button"
            disabled={isPending || isSuccess}
            onClick={() => handleResetPassword()}
            className={`w-full mt-5`}
            variant="outline"
          >
            {isPending
              ? 'Sending...'
              : isSuccess
                ? 'Password Reset Link Sent'
                : isError
                  ? error.response?.data?.message
                  : 'Send Password Reset Link'}
          </Button>
        </div>
      )}
    </>
  );
};

export default ViewUser;
