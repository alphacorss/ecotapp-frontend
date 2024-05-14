'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import AddEditOrg from './components/AddEditOrg';
import { OrgColumnData } from './components/OrgColumn';
import useOrg from './page.hook';
import ViewBusinessDetails from '../../../_components/view/ViewBusinessDetails';
import DataTable from '@/app/_components/table/Table';
import GetItemModal from '@/app/_components/utils/GetItemModal';
import Loader from '@/app/_components/utils/Loader';
import { DeleteModalContent, SuccessModalContent } from '@/app/_components/utils/Modals';
import { ModalComponent } from '@/app/_components/utils/Modals';
import SectionHeader from '@/app/_components/utils/SectionHeader';
import { Modals } from '@/app/_slices/ModalSlice';
import { Button } from '@/components/ui/button';

export default function OrganizationsComponent() {
  const {
    orgIdQuery,
    orgCtx,
    orgData,
    modalState,
    handleOpenModal,
    handleCloseModal,
    closeModalFn,
    showDeleteModal,
    showDetailsModal,
    showEditOrgModal,
  } = useOrg();

  return (
    <div className="card min-h-full flex flex-col h-full">
      <div className="flex justify-between items-start mb-5 lg:mb-8 lg:flex-row flex-col gap-3 lg:gap-0">
        <SectionHeader title="Organizations" description=" Manage and review your Organization details here." />
        <Button variant="outline" onClick={() => handleOpenModal(Modals.addOrgModal)}>
          Add Organization +
        </Button>
      </div>

      {/* Add new Organization */}
      <ModalComponent
        open={modalState.modals.addOrgModal}
        setOpen={() => closeModalFn(Modals.addOrgModal)}
        contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
        content={
          <AddEditOrg
            org={orgData?.organization}
            action="add"
            mutation={orgCtx.addOrg}
            modalToOpen={Modals.addedOrgModal}
            modalToClose={Modals.addOrgModal}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        }
      />

      {/* Edit new Organization */}
      <ModalComponent
        open={modalState.modals.editOrgModal}
        setOpen={() => handleCloseModal(Modals.editOrgModal)}
        contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
        content={
          <AddEditOrg
            org={orgData?.organization}
            action="edit"
            mutation={orgCtx.editOrg}
            modalToOpen={Modals.editedOrgModal}
            modalToClose={Modals.editOrgModal}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
          />
        }
      />

      {/* View Organization */}
      <ModalComponent
        open={modalState.modals.viewOrgModal}
        setOpen={() => closeModalFn(Modals.viewOrgModal)}
        contentClass="min-w-[min(90vw,1000px)] max-h-[90svh] overflow-y-auto transition-all duration-300 ease-in-out"
        content={
          <GetItemModal
            component={
              <ViewBusinessDetails
                orgData={orgData}
                showEditModal={showEditOrgModal}
                showDeleteModal={showDeleteModal}
              />
            }
            ctx={orgCtx.org}
          />
        }
      />

      {/* Delete Organization */}
      <ModalComponent
        open={modalState.modals.deleteOrgModal}
        setOpen={() => handleCloseModal(Modals.deleteOrgModal)}
        content={
          <DeleteModalContent
            title="Delete Organization"
            message="This action will permanently remove the selected Organization. Are you sure you want to delete this Organization?"
            id={orgIdQuery as string}
            mutation={orgCtx.deleteOrg}
            onCancel={() => {
              closeModalFn(Modals.deleteOrgModal);
              closeModalFn(Modals.viewOrgModal);
            }}
          />
        }
      />

      {/* added a new Organization to the System */}
      <ModalComponent
        open={modalState.modals.addedOrgModal}
        setOpen={() => closeModalFn(Modals.addedOrgModal)}
        content={
          <SuccessModalContent
            actionBtnText="Go to Organizations"
            title="Organization Added Successfully"
            message="You’ve successfully added a new organization to the system"
            onConfirm={() => closeModalFn(Modals.addedOrgModal)}
          />
        }
      />

      {/* updated a Organization to the System */}
      <ModalComponent
        open={modalState.modals.editedOrgModal}
        setOpen={() => {
          handleCloseModal(Modals.editedOrgModal);
          orgCtx.editOrg.reset();
        }}
        content={
          <SuccessModalContent
            actionBtnText="Ok"
            title="Organization Updated Successfully"
            message="You’ve successfully updated an organization in the system"
            onConfirm={() => {
              handleCloseModal(Modals.editedOrgModal);
              orgCtx.editOrg.reset();
            }}
          />
        }
      />

      {/* data table */}
      {orgCtx.pseudoAdmins.isLoading ? (
        <div className="w-full h-full grid place-content-center">
          <Loader />
        </div>
      ) : (
        <DataTable
          showMultiView={false}
          data={orgCtx.orgs.data?.data.organization || []}
          columns={OrgColumnData(showDeleteModal, showDetailsModal) as ColumnDef<unknown, unknown>[]}
        />
      )}
    </div>
  );
}
