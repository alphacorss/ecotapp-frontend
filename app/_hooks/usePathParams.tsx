import { usePathname, useSearchParams } from 'next/navigation';

import { TRole } from '../types';
import { getRole, getToken } from '@/lib/utils';

const usePathParams = () => {
  const path = usePathname();
  const pseudoAdminId = useSearchParams().get('pseudoAdminId');
  const orgId = useSearchParams().get('orgId');
  const facilityId = useSearchParams().get('facilityId');
  const orgAdminId = useSearchParams().get('orgAdminId');
  const orgManagerId = useSearchParams().get('orgManagerId');
  const facilityManagerId = useSearchParams().get('facilityManagerId');
  const tenantId = useSearchParams().get('tenantId');
  const surveyId = useSearchParams().get('surveyId');

  const defaultEnable = !!path.includes('dashboard') && !!getToken();
  const blockTenant = getRole() !== 'tenant';
  const allowOnlySuperAdmin = getRole() === 'superadmin';
  const allowOnlyHighAdmin = getRole() === 'superadmin' || getRole() === ('psuedoadmin' as TRole);
  const blockFacilityManager = getRole() !== 'facilitymanager';

  return {
    pseudoAdminId,
    orgId,
    facilityId,
    orgAdminId,
    orgManagerId,
    facilityManagerId,
    tenantId,
    surveyId,
    defaultEnable,
    blockTenant,
    allowOnlySuperAdmin,
    allowOnlyHighAdmin,
    blockFacilityManager,
  };
};

export default usePathParams;
