import { useQuery } from '@tanstack/react-query';
import React from 'react';

import Queries from '@/app/_context/Queries';
import usePathParams from '@/app/_hooks/usePathParams';
import { TFacility, TFacilityUser, TOrg } from '@/app/types';
import qry from '@/lib/queries';
import { getDateIndexes } from '@/lib/utils';

const { year, monthIndex, dayIndex } = getDateIndexes();

const useAnalytics = () => {
  const { viewType, energy_type, refreshTime, orgId, facilityId, tenantId } = usePathParams();

  const { orgs, facilities, tenants } = React.useContext(Queries);
  const [showFilterModal, setShowFilterModal] = React.useState(false);

  const today = `${year}-${monthIndex}-${dayIndex}`;

  const q = `unit=${201}&date=${today}&energy_type=${energy_type}&organization=${orgId}&facility=${facilityId}&tenant=${tenantId}`;

  const analytics = useQuery({
    queryKey: ['analytics', energy_type, orgId, facilityId, tenantId],
    queryFn: () => qry.analyticsRq(q),
  });

  const isLoading = analytics.isLoading;
  const consumption = analytics.data?.data.data.stat;
  const total = consumption?.total_energy_consumed;

  const organization: TOrg | undefined = orgs.data?.data?.organization?.find((org: TOrg) => org._id === orgId);

  const facilitiesArry = facilities.data?.data?.facilities ?? facilities.data?.data?.data?.facilities;
  const facility = facilitiesArry?.find((f: TFacility) => f._id === facilityId);

  const tenantsArry = tenants.data?.data?.users ?? tenants.data?.data?.data?.users;
  const tenant = tenantsArry?.find((t: TFacilityUser) => t._id === tenantId);

  return {
    isLoading,
    consumption,
    total,
    organization,
    facility,
    tenant,
    viewType,
    energy_type,
    refreshTime,
    showFilterModal,
    setShowFilterModal,
  };
};

export default useAnalytics;
