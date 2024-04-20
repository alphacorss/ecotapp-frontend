'use client';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import AddEditFacility from './components/AddEditFacility';
import { FacilityColumn } from './components/FacilityColumn';
import MainWrapper from '@/app/components/layout/MainWrapper';
import DataTable from '@/app/components/table/Table';
import DeleteModalContent from '@/app/components/utils/DeleteModalContent';
import Loader from '@/app/components/utils/Loader';
import { ModalComponent } from '@/app/components/utils/Modal';
import SectionHeader from '@/app/components/utils/SectionHeader';
import SuccessModalContent from '@/app/components/utils/SuccessModalContent';
import ViewBusinessDetails from '@/app/components/view/ViewBusinessDetails';
import Main from '@/app/context/Main';
import Queries from '@/app/context/Queries';
import { Modals } from '@/app/slices/ModalSlice';
import { TFacility } from '@/app/types';
import { Button } from '@/components/ui/button';

const Facilities = () => {
  const router = useRouter();
  const facilityId = useSearchParams().get('facilityId');
  const facilitiesCtx = React.useContext(Queries);
  const { facility } = facilitiesCtx;
  const facilityData = facility.data?.data.data.facility;

  const { modalState, handleCloseModal, handleOpenModal } = React.useContext(Main);

  const showDeleteModal = (id: string) => {
    facilitiesCtx.facilities.data?.data.facilities.forEach((facility: TFacility) => {
      if (facility._id === id) {
        router.push(`/dashboard/users/facilities?tab=overview&facilityId=${facility._id}`);
      }
    });
    handleOpenModal(Modals.deleteFacilityModal);
  };

  const showDetailsModal = (id: string) => {
    facilitiesCtx.facilities.data?.data.facilities.forEach((facility: TFacility) => {
      if (facility._id === id) {
        router.push(`/dashboard/users/facilities?tab=overview&facilityId=${facility._id}`);
      }
    });
    facility.refetch();
    handleOpenModal(Modals.viewFacilityModal);
  };

  const showEditFacilityModal = (id: string) => {
    facilitiesCtx.facilities.data?.data.facilities.forEach((facility: TFacility) => {
      if (facility._id === id) {
        router.push(`/dashboard/users/facilities?tab=overview&facilityId=${facility._id}`);
      }
    });
    handleOpenModal(Modals.editFacilityModal);
  };

  const closeModalFn = (modal: Modals) => {
    router.push('/dashboard/users/facilities?vt=list');
    handleCloseModal(modal);
    facilitiesCtx.addFacility.reset();
    facilitiesCtx.editFacility.reset();
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

  return (
    <MainWrapper>
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
              mutation={facilitiesCtx.addFacility}
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
              mutation={facilitiesCtx.editFacility}
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
              message="You’ve successfully added a new Facility to the System"
              onConfirm={() => handleCloseModal(Modals.addedFacilityModal)}
            />
          }
        />

        {/* updated a Facility to the System */}
        <ModalComponent
          open={modalState.modals.editedFacilityModal}
          setOpen={() => {
            handleCloseModal(Modals.editedFacilityModal);
            facilitiesCtx.editFacility.reset();
          }}
          content={
            <SuccessModalContent
              actionBtnText="Ok"
              title="Facility Updated Successfully"
              message="You’ve successfully update a Facility to the System"
              onConfirm={() => {
                handleCloseModal(Modals.editedFacilityModal);
                facilitiesCtx.editFacility.reset();
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
            <>
              {facility.isFetching || facility.isLoading ? (
                <div className="grid w-full place-content-center">
                  <Loader />
                </div>
              ) : facility.isError ? (
                <p className="text-error-300 text-center">Something went wrong, please try again later</p>
              ) : (
                <ViewBusinessDetails
                  facilityData={facilityData}
                  showDeleteModal={showDeleteModal}
                  showEditModal={showEditFacilityModal}
                />
              )}
            </>
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
              mutation={facilitiesCtx.deleteFacility}
              onCancel={() => {
                closeModalFn(Modals.deleteFacilityModal);
                closeModalFn(Modals.viewFacilityModal);
              }}
            />
          }
        />

        {/* data table */}
        {facilitiesCtx.facilities.isLoading ? (
          <div className="w-full h-full grid place-content-center">
            <Loader />
          </div>
        ) : (
          <DataTable
            showMultiView={false}
            data={facilitiesCtx.facilities.data?.data.facilities || []}
            columns={FacilityColumn(showDeleteModal, showDetailsModal) as ColumnDef<unknown, unknown>[]}
          />
        )}
      </div>
    </MainWrapper>
  );
};

export default Facilities;
