import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import Main from '@/app/_context/Main';
import Queries from '@/app/_context/Queries';
import { Modals } from '@/app/enums';
import { TOrg, TSingleOrg } from '@/app/types';
import { setUrlParams } from '@/lib/utils';

const useOrg = () => {
  const router = useRouter();
  const orgIdQuery = useSearchParams().get('orgId');
  const orgCtx = React.useContext(Queries);
  const orgData: TSingleOrg = orgCtx.org.data?.data;

  const { modalState, handleCloseModal, handleOpenModal } = React.useContext(Main);

  const showDeleteModal = (id: string) => {
    orgCtx.orgs.data?.data.organization.forEach((org: TOrg) => {
      if (org._id === id) {
        const params = new URLSearchParams();
        params.set('orgId', org._id);
        window.history.replaceState({}, '', `?${params}`);
      }
    });
    handleCloseModal(Modals.viewOrgModal);
    handleOpenModal(Modals.deleteOrgModal);
  };

  const showDetailsModal = (orgId: string) => {
    orgCtx.orgs.data?.data.organization.forEach((org: TOrg) => {
      if (org._id === orgId) {
        setUrlParams({ tab: 'overview', orgId: org._id });
      }
    });
    orgCtx.org.refetch();
    handleOpenModal(Modals.viewOrgModal);
  };

  const showEditOrgModal = (id: string) => {
    orgCtx.orgs.data?.data.organization.forEach((org: TOrg) => {
      if (org._id === id) {
        setUrlParams({ tab: 'overview', orgId: org._id });
      }
    });
    handleOpenModal(Modals.editOrgModal);
  };

  const closeModalFn = (modal: Modals) => {
    router.push('/dashboard/users/organizations');
    handleCloseModal(modal);
    orgCtx.addOrg.reset();
    orgCtx.editOrg.reset();
  };

  React.useEffect(() => {
    if (orgIdQuery) {
      if (modalState.modals.deleteOrgModal) {
        handleCloseModal(Modals.viewOrgModal);
        return;
      }
      handleOpenModal(Modals.viewOrgModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgIdQuery]);

  return {
    orgData,
    orgIdQuery,
    orgCtx,
    showDeleteModal,
    showDetailsModal,
    showEditOrgModal,
    closeModalFn,
    handleCloseModal,
    handleOpenModal,
    modalState,
  };
};

export default useOrg;
