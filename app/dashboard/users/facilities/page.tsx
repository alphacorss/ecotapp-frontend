'use client';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import AddEditFacility from './components/AddEditFacility';
import { FacilityColumn } from './components/FacilityColumn';
import useFacility from './page.hook';
import DataTable from '@/app/_components/table/Table';
import Loader from '@/app/_components/utils/Loader';
import { DeleteModalContent, SuccessModalContent } from '@/app/_components/utils/Modals';
import { ModalComponent } from '@/app/_components/utils/Modals';
import SectionHeader from '@/app/_components/utils/SectionHeader';
import ViewBusinessDetails from '@/app/_components/view/ViewBusinessDetails';
import { Modals } from '@/app/_slices/ModalSlice';
import { Button } from '@/components/ui/button';

const Facilities = () => {
  const {
    facilityId,
    modalState,
    queryCtx,
    facilities,
    facilityData,
    handleCloseModal,
    handleOpenModal,
    showDeleteModal,
    showDetailsModal,
    showEditFacilityModal,
    closeModalFn,
  } = useFacility();

  return (
    <div className="card min-h-full flex flex-col h-full">
      <div className="flex justify-between items-start mb-5 lg:mb-8 lg:flex-row flex-col gap-3 lg:gap-0">
        <SectionHeader title="Facilities" description=" Manage and review your Facility details here." />
        <Button variant="outline" onClick={() => handleOpenModal(Modals.addFacilityModal)}>
          Add Facility +
        </Button>
      </div>

      {/* Add new Facility */}
      <ModalComponent
        open={modalState.modals.addFacilityModal}
        setOpen={() => handleCloseModal(Modals.addFacilityModal)}
        contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
        content={
          <AddEditFacility
            action="add"
            mutation={queryCtx.addFacility}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            modalToClose={Modals.addFacilityModal}
            modalToOpen={Modals.addedFacilityModal}
          />
        }
      />
      {/* Edit Facility */}
      <ModalComponent
        open={modalState.modals.editFacilityModal}
        setOpen={() => handleCloseModal(Modals.editFacilityModal)}
        contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
        content={
          <AddEditFacility
            action="edit"
            mutation={queryCtx.editFacility}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            modalToClose={Modals.editFacilityModal}
            modalToOpen={Modals.editedFacilityModal}
          />
        }
      />

      {/* added a new Facility to the System */}
      <ModalComponent
        open={modalState.modals.addedFacilityModal}
        setOpen={() => handleCloseModal(Modals.addedFacilityModal)}
        content={
          <SuccessModalContent
            actionBtnText="Ok"
            title="Facility Added Successfully"
            message="You’ve successfully added a new facility to the System"
            onConfirm={() => handleCloseModal(Modals.addedFacilityModal)}
          />
        }
      />

      {/* updated a Facility to the System */}
      <ModalComponent
        open={modalState.modals.editedFacilityModal}
        setOpen={() => {
          handleCloseModal(Modals.editedFacilityModal);
          queryCtx.editFacility.reset();
        }}
        content={
          <SuccessModalContent
            actionBtnText="Ok"
            title="Facility Updated Successfully"
            message="You’ve successfully updated a facility in the System"
            onConfirm={() => {
              handleCloseModal(Modals.editedFacilityModal);
              queryCtx.editFacility.reset();
            }}
          />
        }
      />

      {/* View Facility */}
      <ModalComponent
        open={modalState.modals.viewFacilityModal}
        setOpen={() => closeModalFn(Modals.viewFacilityModal)}
        contentClass="min-w-[min(90vw,900px)] max-h-[90svh] overflow-y-auto"
        content={
          <ViewBusinessDetails
            queryCtx={queryCtx}
            facilityData={facilityData}
            showDeleteModal={showDeleteModal}
            showEditModal={showEditFacilityModal}
          />
        }
      />

      {/* Delete Facility */}
      <ModalComponent
        open={modalState.modals.deleteFacilityModal}
        setOpen={() => handleCloseModal(Modals.deleteFacilityModal)}
        content={
          <DeleteModalContent
            title="Delete Facility?"
            message="This action will permanently remove the selected Facility. Are you sure you want to delete this Facility?"
            id={facilityId as string}
            mutation={queryCtx.deleteFacility}
            onCancel={() => {
              closeModalFn(Modals.deleteFacilityModal);
              closeModalFn(Modals.viewFacilityModal);
            }}
          />
        }
      />

      {/* data table */}
      {queryCtx.facilities.isLoading ? (
        <div className="w-full h-full grid place-content-center">
          <Loader />
        </div>
      ) : (
        <DataTable
          showMultiView={false}
          data={facilities || []}
          columns={FacilityColumn(showDeleteModal, showDetailsModal) as ColumnDef<unknown, unknown>[]}
        />
      )}
    </div>
  );
};

export default Facilities;
