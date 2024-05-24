import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

import Main from '@/app/_context/Main';
import Queries from '@/app/_context/Queries';
import { Modals } from '@/app/enums';
import { TFacility } from '@/app/types';
import { setUrlParams } from '@/lib/utils';

const useFacility = () => {
  const router = useRouter();
  const facilityId = useSearchParams().get('facilityId');
  const queryCtx = React.useContext(Queries);
  const facilitiesHigh = queryCtx.facilities.data?.data?.facilities;
  const facilitiesMid = queryCtx.facilities.data?.data?.data?.facilities;
  const facilityData = queryCtx.facility.data?.data.data.facility;
  const facilities = facilitiesHigh ?? facilitiesMid;

  const { modalState, handleCloseModal, handleOpenModal } = React.useContext(Main);

  const showDeleteModal = (id: string) => {
    facilities.forEach((facility: TFacility) => {
      if (facility._id === id) {
        setUrlParams({ facilityId: facility._id });
      }
    });
    handleOpenModal(Modals.deleteFacilityModal);
  };

  const showDetailsModal = (id: string) => {
    facilities.forEach((facility: TFacility) => {
      if (facility._id === id) {
        setUrlParams({ tab: 'overview', facilityId: facility._id });
      }
    });
    queryCtx.facility.refetch();
    handleOpenModal(Modals.viewFacilityModal);
  };

  const showEditFacilityModal = (id: string) => {
    facilities.forEach((facility: TFacility) => {
      if (facility._id === id) {
        setUrlParams({ tab: 'overview', facilityId: facility._id });
      }
    });
    handleOpenModal(Modals.editFacilityModal);
  };

  const closeModalFn = (modal: Modals) => {
    router.push('/dashboard/users/facilities?vt=list');
    handleCloseModal(modal);
    queryCtx.addFacility.reset();
    queryCtx.editFacility.reset();
  };

  React.useEffect(() => {
    if (facilityId) {
      if (modalState.modals.deleteFacilityModal) {
        handleCloseModal(Modals.viewFacilityModal);
        return;
      }
      handleOpenModal(Modals.viewFacilityModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilityId]);

  return {
    facilityId,
    facilityData,
    facilities,
    modalState,
    queryCtx,
    handleCloseModal,
    handleOpenModal,
    showDeleteModal,
    showDetailsModal,
    showEditFacilityModal,
    closeModalFn,
  };
};

export default useFacility;
