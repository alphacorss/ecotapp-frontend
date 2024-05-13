import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import Main from '@/app/_context/Main';
import Queries from '@/app/_context/Queries';
import { Modals } from '@/app/_slices/ModalSlice';
import { TFacilityUser } from '@/app/types';
import { getUser, setUrlParams } from '@/lib/utils';

const useTenant = () => {
  const router = useRouter();
  const tenantId = useSearchParams().get('tenantId');
  const tenantsCtx = React.useContext(Queries);
  const { tenant, tenants, addTenant, editTenant, deleteTenant } = tenantsCtx;
  const tenantData = getUser() as TFacilityUser;
  const tenantsData = tenants?.data?.data?.users ?? tenants?.data?.data?.data.users;
  const user = getUser() as TFacilityUser;
  const facilityId = user?.facility?._id;

  const { modalState, handleCloseModal, handleOpenModal } = React.useContext(Main);

  const showDetailsModal = (id: string) => {
    tenantsData.forEach((user: TFacilityUser) => {
      if (user._id === id) {
        setUrlParams({ tab: 'overview', tenantId: user._id });
      }
    });
    tenant.refetch();
    handleOpenModal(Modals.viewTenantModal);
  };

  const showDeleteModal = (id: string) => {
    tenantsData.forEach((user: TFacilityUser) => {
      if (user._id === id) {
        setUrlParams({ tab: 'overview', tenantId: user._id });
      }
    });
    handleCloseModal(Modals.viewTenantModal);
    handleOpenModal(Modals.deleteTenantModal);
  };

  const closeModalFn = (modal: Modals) => {
    router.push(`/dashboard/users/tenants`);
    handleCloseModal(modal);
    addTenant.reset();
    editTenant.reset();
  };

  React.useEffect(() => {
    if (tenantId) {
      if (modalState.modals.deleteTenantModal) {
        handleCloseModal(Modals.viewTenantModal);
        return;
      }
      handleOpenModal(Modals.viewTenantModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenantId]);
  return {
    facilityId,
    tenantData,
    tenantsData,
    modalState,
    tenant,
    tenants,
    deleteTenant,
    addTenant,
    editTenant,
    tenantId,
    tenantsCtx,
    showDetailsModal,
    showDeleteModal,
    closeModalFn,
    handleCloseModal,
    handleOpenModal,
  };
};

export default useTenant;
