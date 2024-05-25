import React from 'react';

import Queries from '../_context/Queries';
import { TComboBoxSelector, TFacility, TFacilityUser, TOrg } from '../types';

const useGetRoleList = () => {
  const { orgs, facilities, tenants } = React.useContext(Queries);

  const orgArr: TOrg[] = orgs.data?.data?.organization ?? orgs.data?.data?.data?.organization;
  const facilitiesArr: TFacility[] = facilities.data?.data.facilities ?? facilities.data?.data?.data?.facilities;
  const tenantsArr: TFacilityUser[] = tenants.data?.data?.users ?? tenants.data?.data?.data?.users;

  const allOrgs: TComboBoxSelector[] = orgArr?.map((org: TOrg) => ({
    label: org.name,
    value: org._id,
  }));

  const allFacilities: TComboBoxSelector[] = facilitiesArr?.map((facility: TFacility) => ({
    label: facility.name,
    value: facility._id,
  }));

  const allFacilitiesByOrg = (orgId: string) =>
    facilitiesArr
      ?.filter((facility) => facility.organization._id === orgId)
      .map((facility) => ({
        label: facility.name,
        value: facility._id,
      }));

  const allTenants: TComboBoxSelector[] = tenantsArr?.map((user: TFacilityUser) => ({
    label: user.user.firstName + ' ' + user.user.lastName,
    value: user._id,
  })) as TComboBoxSelector[];

  const allTenantsByFacility = (facilityId: string) =>
    tenantsArr
      ?.filter((tenant) => tenant.facility._id === facilityId)
      .map((tenant) => ({
        label: tenant.user.firstName + ' ' + tenant.user.lastName,
        value: tenant._id,
      })) as TComboBoxSelector[];

  return {
    orgArr,
    facilitiesArr,
    tenantsArr,
    allOrgs,
    allFacilities,
    allTenants,
    allFacilitiesByOrg,
    allTenantsByFacility,
  };
};

export default useGetRoleList;
