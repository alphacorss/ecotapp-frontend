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

  const viewType = useSearchParams().get('vt');
  const filter = useSearchParams().get('filter');
  const from = useSearchParams().get('from');
  const to = useSearchParams().get('to');
  const energy_type = useSearchParams().get('energy_type');
  const unit = useSearchParams().get('unit');
  const refreshTime = useSearchParams().get('refreshtime');

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
    viewType,
    filter,
    from,
    to,
    energy_type,
    unit,
    refreshTime,
  };
};

export default usePathParams;
