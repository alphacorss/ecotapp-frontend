import { ColumnDef } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { AddEditUser } from '@/app/_components/forms/AddEditUser';
import DataTable from '@/app/_components/table/Table';
import { UserColumnData } from '@/app/_components/table/UserColumn';
import DeleteModalContent from '@/app/_components/utils/DeleteModalContent';
import GetItemModal from '@/app/_components/utils/GetItemModal';
import { ModalComponent } from '@/app/_components/utils/Modal';
import SectionHeader from '@/app/_components/utils/SectionHeader';
import SuccessModalContent from '@/app/_components/utils/SuccessModalContent';
import ViewUser from '@/app/_components/view/ViewUser';
import Main from '@/app/_context/Main';
import Queries from '@/app/_context/Queries';
import { Modals } from '@/app/_slices/ModalSlice';
import { TFacility, TUser } from '@/app/types';
import { Button } from '@/components/ui/button';

const FacilityManagersTab = ({ facility }: { facility: TFacility }) => {
  const router = useRouter();
  const facilityManagerId = useSearchParams().get('facilityManagerId');
  const { modalState, handleCloseModal, handleOpenModal } = React.useContext(Main);
  const facilityManagerCtx = React.useContext(Queries);
  const { facilityManager, facilityManagers, addFacilityManager, editFacilityManager, deleteFacilityManager } =
    facilityManagerCtx;
  const facilityManagerData: TUser = facilityManager?.data?.data?.data?.user;
  const facilityManagersData = facilityManagers?.data?.data?.data?.users;

  const showDetailsModal = (id: string) => {
    facilityManagersData.forEach((user: TUser) => {
      if (user._id === id) {
        router.push(
          `/dashboard/users/facilities?tab=managers&facilityId=${facility._id}&facilityManagerId=${user._id}`,
        );
      }
    });
    facilityManager.refetch();
    handleOpenModal(Modals.viewFacilityManagerModal);
  };

  const showDeleteModal = (id: string) => {
    facilityManagersData.forEach((user: TUser) => {
      if (user._id === id) {
        router.push(
          `/dashboard/users/facilities?tab=managers&facilityId=${facility._id}&facilityManagerId=${user._id}`,
        );
      }
    });
    handleCloseModal(Modals.viewFacilityManagerModal);
    handleOpenModal(Modals.deleteFacilityManagerModal);
  };

  const closeModalFn = (modal: Modals) => {
    router.push(`/dashboard/users/facilities?tab=managers&facilityId=${facility._id}`);
    handleCloseModal(modal);
    addFacilityManager.reset();
    editFacilityManager.reset();
  };

  React.useEffect(() => {
    if (facilityManagerId) {
      if (modalState.modals.deleteFacilityManagerModal) {
        handleCloseModal(Modals.viewFacilityManagerModal);
        return;
      }
      handleOpenModal(Modals.viewFacilityManagerModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facilityManagerId]);

  return (
    <div className="w-full flex justify-between flex-col h-full">
      <div className="flex items-center justify-between w-full mb-10">
        <SectionHeader title="Managers" description="Manage and review your Admin details here." />
        <Button variant="outline" onClick={() => handleOpenModal(Modals.addFacilityManagerModal)}>
          Add Manager +
        </Button>
      </div>

      {/* Add new Facility Manager */}
      <ModalComponent
        open={modalState.modals.addFacilityManagerModal}
        setOpen={() => handleCloseModal(Modals.addFacilityManagerModal)}
        contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
        content={
          <AddEditUser
            Id={facility._id}
            user={facilityManagerData}
            action="add"
            role="facilitymanager"
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            modalToClose={Modals.addFacilityManagerModal}
            modalToOpen={Modals.addedFacilityManagerModal}
            mutation={addFacilityManager}
          />
        }
      />

      {/* View Facility Manager */}
      <ModalComponent
        open={modalState.modals.viewFacilityManagerModal}
        setOpen={() => closeModalFn(Modals.viewFacilityManagerModal)}
        contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
        content={
          <GetItemModal
            ctx={facilityManager}
            component={
              <ViewUser
                user={facilityManagerData}
                role="facilitymanager"
                facility={facility}
                showEditModal={() => handleOpenModal(Modals.editFacilityManagerModal)}
                showDeleteModal={() => showDeleteModal(facilityManagerData?._id)}
              />
            }
          />
        }
      />

      {/* Edit Facility Manager */}
      <ModalComponent
        open={modalState.modals.editFacilityManagerModal}
        setOpen={() => handleCloseModal(Modals.editFacilityManagerModal)}
        contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
        content={
          <AddEditUser
            Id={facility._id}
            user={facilityManagerData}
            action="edit"
            role="facilitymanager"
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            modalToClose={Modals.editFacilityManagerModal}
            modalToOpen={Modals.editedFacilityManagerModal}
            mutation={editFacilityManager}
          />
        }
      />

      {/* Delete Facility Manager */}
      <ModalComponent
        open={modalState.modals.deleteFacilityManagerModal}
        setOpen={() => closeModalFn(Modals.deleteFacilityManagerModal)}
        content={
          <DeleteModalContent
            title="Delete Facility Manager"
            message="This action will permanently remove the selected Facility Manager. Are you sure you want to delete this Facility Manager? "
            id={facilityManagerData?._id}
            mutation={deleteFacilityManager}
            onCancel={() => closeModalFn(Modals.deleteFacilityManagerModal)}
          />
        }
      />

      {/* added a new Facility Manager to the System */}
      <ModalComponent
        open={modalState.modals.addedFacilityManagerModal}
        setOpen={() => closeModalFn(Modals.addedFacilityManagerModal)}
        content={
          <SuccessModalContent
            title="Facility Manager Added Successfully"
            message="You’ve successfully added a new Facility Manager to the System"
            onConfirm={() => handleCloseModal(Modals.addedFacilityManagerModal)}
          />
        }
      />

      {/* updated a Facility Manager to the System */}
      <ModalComponent
        open={modalState.modals.editedFacilityManagerModal}
        setOpen={() => closeModalFn(Modals.editedFacilityManagerModal)}
        content={
          <SuccessModalContent
            title="Facility Manager Updated Successfully"
            message="You’ve successfully update a Facility Manager to the System"
            onConfirm={() => {
              closeModalFn(Modals.editedFacilityManagerModal);
              handleCloseModal(Modals.viewFacilityManagerModal);
            }}
          />
        }
      />

      <div className="h-full">
        <DataTable
          showMultiView={false}
          data={facilityManagersData || []}
          columns={UserColumnData(showDeleteModal, showDetailsModal) as ColumnDef<unknown, unknown>[]}
        />
      </div>
    </div>
  );
};

export default FacilityManagersTab;
