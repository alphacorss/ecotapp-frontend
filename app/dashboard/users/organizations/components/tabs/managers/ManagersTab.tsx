import { ColumnDef } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { AddEditUser } from '@/app/_components/forms/AddEditUser';
import DataTable from '@/app/_components/tables/Table';
import { UserColumnData } from '@/app/_components/tables/UserColumn';
import GetItemModal from '@/app/_components/utils/GetItemModal';
import { DeleteModalContent, SuccessModalContent } from '@/app/_components/utils/Modals';
import { ModalComponent } from '@/app/_components/utils/Modals';
import SectionHeader from '@/app/_components/utils/SectionHeader';
import ViewUser from '@/app/_components/view/ViewUser';
import Main from '@/app/_context/Main';
import Queries from '@/app/_context/Queries';
import { Modals } from '@/app/enums';
import { TOrg, TUser } from '@/app/types';
import { Button } from '@/components/ui/button';

const ManagersTab = ({ org }: { org: TOrg }) => {
  const router = useRouter();
  const orgManagerId = useSearchParams().get('orgManagerId');
  const { modalState, handleCloseModal, handleOpenModal } = React.useContext(Main);
  const orgManagersCtx = React.useContext(Queries);
  const { orgManager, orgManagers, addOrgManager, editOrgManager, deleteOrgManager } = orgManagersCtx;
  const orgManagerData: TUser = orgManager?.data?.data?.data?.user;
  const orgManagersData = orgManagers?.data?.data?.data?.users;

  const showDetailsModal = (id: string) => {
    orgManagersData.forEach((user: TUser) => {
      if (user._id === id) {
        const params = new URLSearchParams();
        params.set('tab', 'managers');
        params.set('orgId', org._id);
        params.set('orgManagerId', user._id);
        window.history.replaceState({}, '', `?${params}`);
      }
    });
    orgManager.refetch();
    handleOpenModal(Modals.viewOrgManagerModal);
  };

  const showDeleteModal = (id: string) => {
    orgManagersData.forEach((user: TUser) => {
      if (user._id === id) {
        const params = new URLSearchParams();
        params.set('tab', 'managers');
        params.set('orgId', org._id);
        params.set('orgManagerId', user._id);
      }
    });
    handleCloseModal(Modals.viewOrgManagerModal);
    handleOpenModal(Modals.deleteOrgManagerModal);
  };

  const closeModalFn = (modal: Modals) => {
    router.push(`/dashboard/users/organizations?tab=managers&orgId=${org._id}`);
    handleCloseModal(modal);
    addOrgManager.reset();
    editOrgManager.reset();
  };

  React.useEffect(() => {
    if (orgManagerId) {
      if (modalState.modals.deleteOrgManagerModal) {
        handleCloseModal(Modals.viewOrgManagerModal);
        return;
      }
      handleOpenModal(Modals.viewOrgManagerModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgManagerId]);

  return (
    <div className="w-full flex justify-between flex-col h-full">
      <div className="flex lg:items-center lg:justify-between items-start w-full mb-10 flex-col lg:flex-row gap-3 lg:gap-0">
        <SectionHeader title="Managers" description="Manage and review your Admin details here." />
        <Button variant="outline" onClick={() => handleOpenModal(Modals.addOrgManagerModal)}>
          Add Manager +
        </Button>
      </div>

      {/* Add new Organization Manager */}
      <ModalComponent
        open={modalState.modals.addOrgManagerModal}
        setOpen={() => handleCloseModal(Modals.addOrgManagerModal)}
        contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
        content={
          <AddEditUser
            Id={org._id}
            user={orgManagerData}
            action="add"
            role="organizationmanager"
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            modalToClose={Modals.addOrgManagerModal}
            modalToOpen={Modals.addedOrgManagerModal}
            mutation={addOrgManager}
          />
        }
      />

      {/* View Organization Manager */}
      <ModalComponent
        open={modalState.modals.viewOrgManagerModal}
        setOpen={() => closeModalFn(Modals.viewOrgManagerModal)}
        contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
        content={
          <GetItemModal
            ctx={orgManager}
            component={
              <ViewUser
                org={org}
                role="organizationmanager"
                user={orgManagerData}
                showEditModal={() => handleOpenModal(Modals.editOrgManagerModal)}
                showDeleteModal={() => showDeleteModal(orgManagerData?._id)}
              />
            }
          />
        }
      />

      {/* Edit Organization Manager */}
      <ModalComponent
        open={modalState.modals.editOrgManagerModal}
        setOpen={() => handleCloseModal(Modals.editOrgManagerModal)}
        contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
        content={
          <AddEditUser
            Id={org._id}
            user={orgManagerData}
            action="edit"
            role="organizationmanager"
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            modalToClose={Modals.editOrgManagerModal}
            modalToOpen={Modals.editedOrgManagerModal}
            mutation={orgManagersCtx.editOrgManager}
          />
        }
      />

      {/* Delete Organization Manager */}
      <ModalComponent
        open={modalState.modals.deleteOrgManagerModal}
        setOpen={() => closeModalFn(Modals.deleteOrgManagerModal)}
        content={
          <DeleteModalContent
            title="Delete Organization Manager"
            message="This action will permanently remove the selected Organization Manager. Are you sure you want to delete this Organization Manager? "
            id={orgManagerData?._id}
            mutation={deleteOrgManager}
            onCancel={() => closeModalFn(Modals.deleteOrgManagerModal)}
          />
        }
      />

      {/* added a new Organization Manager to the System */}
      <ModalComponent
        open={modalState.modals.addedOrgManagerModal}
        setOpen={() => closeModalFn(Modals.addedOrgManagerModal)}
        content={
          <SuccessModalContent
            title="Organization Manager Added Successfully"
            message="You’ve successfully added a new organization manager to the system"
            onConfirm={() => handleCloseModal(Modals.addedOrgManagerModal)}
          />
        }
      />

      {/* updated a Organization Manager to the System */}
      <ModalComponent
        open={modalState.modals.editedOrgManagerModal}
        setOpen={() => closeModalFn(Modals.editedOrgManagerModal)}
        content={
          <SuccessModalContent
            title="Organization Manager Updated Successfully"
            message="You’ve successfully updated an organization manager in the system"
            onConfirm={() => {
              closeModalFn(Modals.editedOrgManagerModal);
              handleCloseModal(Modals.viewOrgManagerModal);
            }}
          />
        }
      />

      <div className="h-full">
        <DataTable
          showMultiView={false}
          data={orgManagersData || []}
          columns={UserColumnData(showDeleteModal, showDetailsModal) as ColumnDef<unknown, unknown>[]}
        />
      </div>
    </div>
  );
};

export default ManagersTab;
