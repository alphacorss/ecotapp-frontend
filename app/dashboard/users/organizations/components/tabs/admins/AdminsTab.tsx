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
import { TOrg, TUser } from '@/app/types';
import { Button } from '@/components/ui/button';

const AdminsTab = ({ org }: { org: TOrg }) => {
  const router = useRouter();
  const orgAdminId = useSearchParams().get('orgAdminId');
  const { modalState, handleCloseModal, handleOpenModal } = React.useContext(Main);
  const orgAdminsCtx = React.useContext(Queries);
  const { orgAdmin, orgAdmins, addOrgAdmin, editOrgAdmin, deleteOrgAdmin } = orgAdminsCtx;
  const orgAdminData: TUser = orgAdmin?.data?.data?.data?.user;
  const orgAdminsData = orgAdmins?.data?.data?.data?.users;

  const showDetailsModal = (id: string) => {
    orgAdminsData.forEach((user: TUser) => {
      if (user._id === id) {
        router.push(`/dashboard/users/organizations?tab=admins&orgId=${org._id}&orgAdminId=${user._id}`);
      }
    });
    orgAdmin.refetch();
    handleOpenModal(Modals.viewOrgAdminModal);
  };

  const showDeleteModal = (id: string) => {
    orgAdminsData.forEach((user: TUser) => {
      if (user._id === id) {
        router.push(`/dashboard/users/organizations?tab=admins&orgId=${org._id}&orgAdminId=${user._id}`);
      }
    });
    handleCloseModal(Modals.viewOrgAdminModal);
    handleOpenModal(Modals.deleteOrgAdminModal);
  };

  const closeModalFn = (modal: Modals) => {
    router.push(`/dashboard/users/organizations?tab=admins&orgId=${org._id}`);
    handleCloseModal(modal);
    addOrgAdmin.reset();
    editOrgAdmin.reset();
  };

  React.useEffect(() => {
    if (orgAdminId) {
      if (modalState.modals.deleteOrgAdminModal) {
        handleCloseModal(Modals.viewOrgAdminModal);
        return;
      }
      handleOpenModal(Modals.viewOrgAdminModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgAdminId]);

  return (
    <div className="w-full flex justify-between flex-col h-full">
      <div className="flex items-center justify-between w-full mb-10">
        <SectionHeader title="Administrators" description="Manage and review your Admin details here." />
        <Button variant="outline" onClick={() => handleOpenModal(Modals.addOrgAdminModal)}>
          Add Admin +
        </Button>
      </div>

      {/* Add new Organization Admin */}
      <ModalComponent
        open={modalState.modals.addOrgAdminModal}
        setOpen={() => handleCloseModal(Modals.addOrgAdminModal)}
        contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
        content={
          <AddEditUser
            Id={org._id}
            user={orgAdminData}
            action="add"
            role="organizationadmin"
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            modalToClose={Modals.addOrgAdminModal}
            modalToOpen={Modals.addedOrgAdminModal}
            mutation={orgAdminsCtx.addOrgAdmin}
          />
        }
      />

      {/* View Organization Admin */}
      <ModalComponent
        open={modalState.modals.viewOrgAdminModal}
        setOpen={() => closeModalFn(Modals.viewOrgAdminModal)}
        contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
        content={
          <GetItemModal
            ctx={orgAdmin}
            component={
              <ViewUser
                org={org}
                role="organizationadmin"
                user={orgAdminData}
                showEditModal={() => handleOpenModal(Modals.editOrgAdminModal)}
                showDeleteModal={() => showDeleteModal(orgAdminData?._id)}
              />
            }
          />
        }
      />

      {/* Edit Organization Admin */}
      <ModalComponent
        open={modalState.modals.editOrgAdminModal}
        setOpen={() => handleCloseModal(Modals.editOrgAdminModal)}
        contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
        content={
          <AddEditUser
            Id={org._id}
            user={orgAdminData}
            action="edit"
            role="organizationadmin"
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            modalToClose={Modals.editOrgAdminModal}
            modalToOpen={Modals.editedOrgAdminModal}
            mutation={orgAdminsCtx.editOrgAdmin}
          />
        }
      />

      {/* Delete Organization Admin */}
      <ModalComponent
        open={modalState.modals.deleteOrgAdminModal}
        setOpen={() => closeModalFn(Modals.deleteOrgAdminModal)}
        content={
          <DeleteModalContent
            title="Delete Organization Admin"
            message="This action will permanently remove the selected Organization Admin. Are you sure you want to delete this Organization Admin? "
            id={orgAdminData?._id}
            mutation={deleteOrgAdmin}
            onCancel={() => closeModalFn(Modals.deleteOrgAdminModal)}
          />
        }
      />

      {/* added a new Organization Admin to the System */}
      <ModalComponent
        open={modalState.modals.addedOrgAdminModal}
        setOpen={() => closeModalFn(Modals.addedOrgAdminModal)}
        content={
          <SuccessModalContent
            title="Organization Admin Added Successfully"
            message="You’ve successfully added a new Organization Admin to the System"
            onConfirm={() => handleCloseModal(Modals.addedOrgAdminModal)}
          />
        }
      />

      {/* updated a Organization Admin to the System */}
      <ModalComponent
        open={modalState.modals.editedOrgAdminModal}
        setOpen={() => closeModalFn(Modals.editedOrgAdminModal)}
        content={
          <SuccessModalContent
            title="Organization Admin Updated Successfully"
            message="You’ve successfully update a Organization Admin to the System"
            onConfirm={() => {
              closeModalFn(Modals.editedOrgAdminModal);
              handleCloseModal(Modals.viewOrgAdminModal);
            }}
          />
        }
      />

      <div className="h-full">
        <DataTable
          showMultiView={false}
          data={orgAdminsData || []}
          columns={UserColumnData(showDeleteModal, showDetailsModal) as ColumnDef<unknown, unknown>[]}
        />
      </div>
    </div>
  );
};

export default AdminsTab;
