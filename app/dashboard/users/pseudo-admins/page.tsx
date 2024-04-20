'use client';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { AddEditUser } from '@/app/_components/forms/AddEditUser';
import MainWrapper from '@/app/_components/layout/MainWrapper';
import DataTable from '@/app/_components/table/Table';
import { UserColumnData } from '@/app/_components/table/UserColumn';
import DeleteModalContent from '@/app/_components/utils/DeleteModalContent';
import GetItemModal from '@/app/_components/utils/GetItemModal';
import Loader from '@/app/_components/utils/Loader';
import { ModalComponent } from '@/app/_components/utils/Modal';
import SectionHeader from '@/app/_components/utils/SectionHeader';
import SuccessModalContent from '@/app/_components/utils/SuccessModalContent';
import ViewUser from '@/app/_components/view/ViewUser';
import Main from '@/app/_context/Main';
import Queries from '@/app/_context/Queries';
import { Modals } from '@/app/_slices/ModalSlice';
import { TUser } from '@/app/types';
import { Button } from '@/components/ui/button';

export default function PseudoAdminsComponent() {
  const router = useRouter();
  const pseudoAdminId = useSearchParams().get('pseudoAdminId');
  const pseudoAdminsCtx = React.useContext(Queries);
  const { pseudoAdmin, pseudoAdmins } = pseudoAdminsCtx;
  const pseudoAdminData: TUser = pseudoAdmin?.data?.data?.data?.user;
  const pseudoAdminsData = pseudoAdmins?.data?.data?.users;

  const { modalState, handleCloseModal, handleOpenModal } = React.useContext(Main);

  const showDetailsModal = (id: string) => {
    pseudoAdminsData.forEach((user: TUser) => {
      if (user._id === id) {
        router.push(`/dashboard/users/pseudo-admins?tab=overview&pseudoAdminId=${user._id}`);
      }
    });
    pseudoAdmin.refetch();
    handleOpenModal(Modals.viewPseudoAdminModal);
  };

  const showDeleteModal = (id: string) => {
    pseudoAdminsData.forEach((user: TUser) => {
      if (user._id === id) {
        router.push(`/dashboard/users/pseudo-admins?pseudoAdminId=${user._id}`);
      }
    });
    handleCloseModal(Modals.viewPseudoAdminModal);
    handleOpenModal(Modals.deletePseudoAdminModal);
  };

  const closeModalFn = (modal: Modals) => {
    router.push('/dashboard/users/pseudo-admins');
    handleCloseModal(modal);
    pseudoAdminsCtx.addPseudoAdmin.reset();
    pseudoAdminsCtx.editPseudoAdmin.reset();
  };

  React.useEffect(() => {
    if (pseudoAdminId) {
      if (modalState.modals.deletePseudoAdminModal) {
        handleCloseModal(Modals.viewPseudoAdminModal);
        return;
      }
      handleOpenModal(Modals.viewPseudoAdminModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pseudoAdminId]);

  return (
    <MainWrapper>
      <div className="card min-h-full flex flex-col h-full">
        <div className="flex justify-between items-start mb-5 lg:mb-8 lg:flex-row flex-col gap-3 lg:gap-0">
          <SectionHeader title="Pseudo Admins" description=" Manage and review your Pseudo Admin details here." />
          <Button variant="outline" onClick={() => handleOpenModal(Modals.addPseudoAdminModal)}>
            Add Pseudo Admin +
          </Button>
        </div>

        {/* Add new Pseudo Admin */}
        <ModalComponent
          open={modalState.modals.addPseudoAdminModal}
          setOpen={() => handleCloseModal(Modals.addPseudoAdminModal)}
          contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
          content={
            <AddEditUser
              user={pseudoAdminData}
              action="add"
              role="pseudoadmin"
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              modalToClose={Modals.addPseudoAdminModal}
              modalToOpen={Modals.addedPseudoAdminModal}
              mutation={pseudoAdminsCtx.addPseudoAdmin}
            />
          }
        />

        {/* View Pseudo Admin */}
        <ModalComponent
          open={modalState.modals.viewPseudoAdminModal}
          setOpen={() => closeModalFn(Modals.viewPseudoAdminModal)}
          contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
          content={
            <GetItemModal
              ctx={pseudoAdmin}
              component={
                <ViewUser
                  role="pseudoadmin"
                  user={pseudoAdminData}
                  showEditModal={() => {
                    handleCloseModal(Modals.viewPseudoAdminModal);
                    handleOpenModal(Modals.editPseudoAdminModal);
                  }}
                  showDeleteModal={() => showDeleteModal(pseudoAdminData._id)}
                />
              }
            />
          }
        />

        {/* Edit Pseudo Admin */}
        <ModalComponent
          open={modalState.modals.editPseudoAdminModal}
          setOpen={() => closeModalFn(Modals.editPseudoAdminModal)}
          contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
          content={
            <AddEditUser
              user={pseudoAdminData}
              action="edit"
              role="pseudoadmin"
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              modalToClose={Modals.editPseudoAdminModal}
              modalToOpen={Modals.editedPseudoAdminModal}
              mutation={pseudoAdminsCtx.editPseudoAdmin}
            />
          }
        />

        {/* Delete Pseudo Admin */}
        <ModalComponent
          open={modalState.modals.deletePseudoAdminModal}
          setOpen={() => closeModalFn(Modals.deletePseudoAdminModal)}
          content={
            <DeleteModalContent
              title="Delete Pseudo Admin"
              message="This action will permanently remove the selected Pseudo Admin. Are you sure you want to delete this Pseudo Admin? "
              id={pseudoAdminData?._id}
              mutation={pseudoAdminsCtx.deletePseudoAdmin}
              onCancel={() => closeModalFn(Modals.deletePseudoAdminModal)}
            />
          }
        />

        {/* added a new Pseudo Admin to the System */}
        <ModalComponent
          open={modalState.modals.addedPseudoAdminModal}
          setOpen={() => closeModalFn(Modals.addedPseudoAdminModal)}
          content={
            <SuccessModalContent
              actionBtnText="Go to User Management"
              title="Pseudo Admin Added Successfully"
              message="You’ve successfully added a new Pseudo Admin to the System"
              onConfirm={() => closeModalFn(Modals.addedPseudoAdminModal)}
            />
          }
        />

        {/* updated a Pseudo Admin to the System */}
        <ModalComponent
          open={modalState.modals.editedPseudoAdminModal}
          setOpen={() => closeModalFn(Modals.editedPseudoAdminModal)}
          content={
            <SuccessModalContent
              actionBtnText="Go to User Management"
              title="Pseudo Admin Updated Successfully"
              message="You’ve successfully update a Pseudo Admin to the System"
              onConfirm={() => {
                closeModalFn(Modals.editedPseudoAdminModal);
                handleCloseModal(Modals.viewPseudoAdminModal);
              }}
            />
          }
        />

        {/* data table */}
        {pseudoAdminsCtx.pseudoAdmins.isLoading ? (
          <div className="w-full h-full grid place-content-center">
            <Loader />
          </div>
        ) : (
          <DataTable
            showMultiView={false}
            data={pseudoAdminsData || []}
            columns={UserColumnData(showDeleteModal, showDetailsModal) as ColumnDef<unknown, unknown>[]}
          />
        )}
      </div>
    </MainWrapper>
  );
}
