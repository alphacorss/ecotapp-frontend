import { UseQueryResult, useQuery } from '@tanstack/react-query';
import React, { createContext } from 'react';

import User from './User';
import { useHandleMutation } from '../_hooks/useHandleMutation';
import usePathParams from '../_hooks/usePathParams';
import { high, mid } from '../dashboard/home/helpers';
import { TFacilityUser, TMutationHandler, TOrgUser, TRole } from '../types';
import qry from '@/lib/queries';
import { getRole } from '@/lib/utils';

const Queries = createContext({
  // pseudo admins
  pseudoAdmins: {} as UseQueryResult<any, Error>,
  pseudoAdmin: {} as UseQueryResult<any, Error>,
  addPseudoAdmin: {} as TMutationHandler,
  editPseudoAdmin: {} as TMutationHandler,
  deletePseudoAdmin: {} as TMutationHandler,
  // tenants
  tenants: {} as UseQueryResult<any, Error>,
  addTenant: {} as TMutationHandler,
  editTenant: {} as TMutationHandler,
  deleteTenant: {} as TMutationHandler,
  tenant: {} as UseQueryResult<any, Error>,
  //facilities
  facilities: {} as UseQueryResult<any, Error>,
  facility: {} as UseQueryResult<any, Error>,
  deleteFacility: {} as TMutationHandler,
  addFacility: {} as TMutationHandler,
  editFacility: {} as TMutationHandler,
  // facilities managers
  facilityManagers: {} as UseQueryResult<any, Error>,
  addFacilityManager: {} as TMutationHandler,
  editFacilityManager: {} as TMutationHandler,
  facilityManager: {} as UseQueryResult<any, Error>,
  deleteFacilityManager: {} as TMutationHandler,
  //organizations
  orgs: {} as UseQueryResult<any, Error>,
  org: {} as UseQueryResult<any, Error>,
  addOrg: {} as TMutationHandler,
  editOrg: {} as TMutationHandler,
  deleteOrg: {} as TMutationHandler,
  //orgAdmin
  addOrgAdmin: {} as TMutationHandler,
  orgAdmins: {} as UseQueryResult<any, Error>,
  orgAdmin: {} as UseQueryResult<any, Error>,
  editOrgAdmin: {} as TMutationHandler,
  deleteOrgAdmin: {} as TMutationHandler,
  //orgManager
  orgManagers: {} as UseQueryResult<any, Error>,
  addOrgManager: {} as TMutationHandler,
  orgManager: {} as UseQueryResult<any, Error>,
  editOrgManager: {} as TMutationHandler,
  deleteOrgManager: {} as TMutationHandler,
  // profile
  updateProfile: {} as TMutationHandler,
  updatePassword: {} as TMutationHandler,
  // broadcast
  sendMessage: {} as TMutationHandler,
  myMessages: {} as UseQueryResult<any, Error>,
  //survey
  createSurvey: {} as TMutationHandler,
  mySurveys: {} as UseQueryResult<any, Error>,
  createdSurveys: {} as UseQueryResult<any, Error>,
  respondToSurvey: {} as TMutationHandler,
  deleteSurvey: {} as TMutationHandler,
  tenantDeleteSurvey: {} as TMutationHandler,
});

export type TQueriesCtx = typeof Queries;

export function QueriesCtxProvider({ children }: React.PropsWithChildren<{}>) {
  const userObj = React.useContext(User);
  const role = userObj.role;

  const orgUser = userObj.user as TOrgUser;
  const facilityUser = userObj.user as TFacilityUser;

  const orgUserAdminId = orgUser?.organization?._id;
  const facilityUserAdminId = facilityUser?.facility?._id;

  const {
    pseudoAdminId,
    orgId,
    orgAdminId,
    orgManagerId,
    facilityId,
    facilityManagerId,
    tenantId,
    defaultEnable,
    blockTenant,
    blockFacilityManager,
    allowOnlySuperAdmin,
    allowOnlyHighAdmin,
  } = usePathParams();

  //pseudo admins
  const pseudoAdmins = useQuery({
    queryKey: ['pseudoadmins'],
    queryFn: () => qry.listByRoleRq('psuedoadmin' as TRole),
    enabled: defaultEnable && allowOnlySuperAdmin,
  });

  const pseudoAdmin = useQuery({
    queryKey: ['pseudoadmin', pseudoAdminId],
    queryFn: () => qry.getUserRq(pseudoAdminId as string, 'psuedoadmin' as TRole),
    enabled: defaultEnable && !!pseudoAdminId,
  });

  const addPseudoAdmin = useHandleMutation(qry.addUserRq, [pseudoAdmins]);
  const deletePseudoAdmin = useHandleMutation(
    () => qry.deleteUserRq(pseudoAdminId as string, 'psuedoadmin' as TRole),
    [pseudoAdmins],
  );
  const editPseudoAdmin = useHandleMutation(qry.editUserRq, [pseudoAdmins]);

  //orgAdmin
  const orgAdmins = useQuery({
    queryKey: ['organizationadmins'],
    queryFn: () => qry.listByRoleByOrgId(orgId as string, 'organizationadmin'),
    enabled: defaultEnable && !!orgId && allowOnlyHighAdmin,
  });

  const orgAdmin = useQuery({
    queryKey: ['organizationadmin', orgAdminId],
    queryFn: () => qry.getUserRq(orgAdminId as string, 'organizationadmin'),
    enabled: defaultEnable && !!orgAdminId && allowOnlyHighAdmin,
  });

  const addOrgAdmin = useHandleMutation(qry.addUserRq, [orgAdmins]);
  const editOrgAdmin = useHandleMutation(qry.editUserRq, [orgAdmins]);
  const deleteOrgAdmin = useHandleMutation(
    () => qry.deleteUserRq(orgAdminId as string, 'organizationadmin'),
    [orgAdmins],
  );

  //orgManager
  const orgManagers = useQuery({
    queryKey: ['organizationmanagers'],
    queryFn: () => qry.listByRoleByOrgId(orgId as string, 'organizationmanager'),
    enabled: defaultEnable && !!orgId && allowOnlyHighAdmin,
  });

  const orgManager = useQuery({
    queryKey: ['organizationmanager', orgManagerId],
    queryFn: () => qry.getUserRq(orgManagerId as string, 'organizationmanager'),
    enabled: defaultEnable && !!orgManagerId && allowOnlyHighAdmin,
  });

  const addOrgManager = useHandleMutation(qry.addUserRq, [orgManagers]);
  const editOrgManager = useHandleMutation(qry.editUserRq, [orgManagers]);
  const deleteOrgManager = useHandleMutation(
    () => qry.deleteUserRq(orgManagerId as string, 'organizationmanager'),
    [orgManagers],
  );

  //facilities
  const facilities = useQuery({
    queryKey: ['facilities'],
    queryFn: () =>
      high.includes(role as string) ? qry.getFacilitiesRq() : qry.listFacilityByOrgId(orgUserAdminId as string),
    enabled: defaultEnable && blockTenant,
  });

  //facility managers
  const facilityManagers = useQuery({
    queryKey: ['facilitymanagers'],
    queryFn: () => qry.listByRoleByOrgId(facilityId as string, 'facilitymanager'),
    enabled: defaultEnable && !!facilityId && blockTenant && blockFacilityManager,
  });

  const facilityManager = useQuery({
    queryKey: ['facilitymanager', facilityManagerId],
    queryFn: () => qry.getUserRq(facilityManagerId as string, 'facilitymanager'),
    enabled: defaultEnable && !!facilityManagerId && blockTenant && blockFacilityManager,
  });

  const addFacilityManager = useHandleMutation(qry.addUserRq, [facilityManagers]);

  const deleteFacilityManager = useHandleMutation(
    () => qry.deleteUserRq(facilityManagerId as string, 'facilitymanager'),
    [facilityManagers],
  );

  const editFacilityManager = useHandleMutation(qry.editUserRq, [facilityManagers]);

  //tenants
  const tenants = useQuery({
    queryKey: ['tenants'],
    queryFn: () =>
      high.includes(role as string)
        ? qry.listByRoleRq('tenant' as TRole)
        : mid.includes(role as string)
          ? qry.listTenantByFacilityRq(orgUserAdminId as string)
          : qry.listTenantByFacilityRq(facilityUserAdminId as string),
    enabled: defaultEnable && blockTenant,
    staleTime: 1000 * 60 * 60,
  });

  const tenant = useQuery({
    queryKey: ['tenant', tenantId],
    queryFn: () => qry.getUserRq(tenantId as string, 'tenant'),
    enabled: defaultEnable && !!tenantId && blockTenant,
  });

  const addTenant = useHandleMutation(qry.addUserRq, [tenants]);
  const editTenant = useHandleMutation(qry.editUserRq, [tenants]);
  const deleteTenant = useHandleMutation(() => qry.deleteUserRq(tenantId as string, 'tenant'), [tenants]);

  const facility = useQuery({
    queryKey: ['facility', facilityId],
    queryFn: () => qry.getFacilityRq(facilityId as string),
    enabled: defaultEnable && !!facilityId && blockTenant,
  });

  const addFacility = useHandleMutation(qry.addFacilityRq, [facilities]);
  const editFacility = useHandleMutation(qry.editFacilityRq, [facilities, tenants, facility]);
  const deleteFacility = useHandleMutation(qry.deleteFacilityRq, [facilities, tenants]);

  //organizations
  const orgs = useQuery({
    queryKey: ['organizations'],
    queryFn: qry.getOrganizationsRq,
    enabled: defaultEnable && allowOnlyHighAdmin,
  });
  const org = useQuery({
    queryKey: ['organization', orgId],
    queryFn: () => qry.getOrganizationRq(orgId as string),
    enabled: defaultEnable && !!orgId && allowOnlyHighAdmin,
  });

  const addOrg = useHandleMutation(qry.addOrgRq, [orgs]);
  const editOrg = useHandleMutation(qry.editOrgRq, [orgs, org, facilities, tenants]);
  const deleteOrg = useHandleMutation(qry.deleteOrgRq, [orgs, facilities, tenants]);
  //profile
  const updateProfile = useHandleMutation(qry.updateProfileRq, []);
  const updatePassword = useHandleMutation(qry.resetPasswordInAppRq, []);

  //broadcast
  const sendMessage = useHandleMutation(qry.sendMessageRq, []);
  const myMessages = useQuery({
    queryKey: ['messages'],
    queryFn: () => qry.getMyMessagesRq(),
    enabled: defaultEnable && getRole() !== 'superadmin',
  });

  //survey
  const mySurveys = useQuery({
    queryKey: ['mysurveys'],
    queryFn: () => qry.mySurveysRq(),
    enabled: defaultEnable && getRole() === 'tenant',
  });

  const createdSurveys = useQuery({
    queryKey: ['createdsurveys'],
    queryFn: () => qry.createdSurveysRq(),
    enabled: defaultEnable && blockTenant,
  });

  const createSurvey = useHandleMutation(qry.createSurveyRq, [createdSurveys]);
  const respondToSurvey = useHandleMutation(qry.respondToSurveyRq, [mySurveys]);
  const deleteSurvey = useHandleMutation(qry.deleteSurveyRq, [createdSurveys]);
  const tenantDeleteSurvey = useHandleMutation(qry.tenantDeleteSurveyRq, [mySurveys]);

  const contextValue = {
    // pseudo admins
    pseudoAdmins,
    pseudoAdmin,
    addPseudoAdmin,
    editPseudoAdmin,
    deletePseudoAdmin,
    // tenants
    tenants,
    addTenant,
    editTenant,
    deleteTenant,
    tenant,
    //facilities
    facilities,
    facility,
    deleteFacility,
    addFacility,
    editFacility,
    // facilities managers
    facilityManagers,
    addFacilityManager,
    editFacilityManager,
    facilityManager,
    deleteFacilityManager,
    //organizations
    orgs,
    org,
    addOrg,
    editOrg,
    deleteOrg,
    //orgAdmin
    addOrgAdmin,
    orgAdmins,
    orgAdmin,
    editOrgAdmin,
    deleteOrgAdmin,
    //orgManager
    orgManagers,
    addOrgManager,
    orgManager,
    editOrgManager,
    deleteOrgManager,
    // profile
    updateProfile,
    updatePassword,
    // broadcast
    sendMessage,
    myMessages,
    //survey
    mySurveys,
    createSurvey,
    createdSurveys,
    respondToSurvey,
    deleteSurvey,
    tenantDeleteSurvey,
  };

  return <Queries.Provider value={contextValue}>{children}</Queries.Provider>;
}

export default Queries;
