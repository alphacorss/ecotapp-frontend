'use client';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import { AddEditTenant } from './components/TenantForm';
import { TenantTableCoumns } from './components/TenantTableCoumns';
import MainWrapper from '@/app/_components/layout/MainWrapper';
import DataTable from '@/app/_components/table/Table';
import GetItemModal from '@/app/_components/utils/GetItemModal';
import Loader from '@/app/_components/utils/Loader';
import { ModalComponent } from '@/app/_components/utils/Modals';
import { SuccessModalContent, DeleteModalContent } from '@/app/_components/utils/Modals';
import SectionHeader from '@/app/_components/utils/SectionHeader';
import ViewUser from '@/app/_components/view/ViewUser';
import Main from '@/app/_context/Main';
import Queries from '@/app/_context/Queries';
import { Modals } from '@/app/_slices/ModalSlice';
import { TFacilityUser } from '@/app/types';
import { Button } from '@/components/ui/button';
import { setUrlParams } from '@/lib/utils';

export default function TenantsComponent() {
  const router = useRouter();
  const tenantId = useSearchParams().get('tenantId');
  const tenantsCtx = React.useContext(Queries);
  const { tenant, tenants, addTenant, editTenant, deleteTenant } = tenantsCtx;
  const tenantData: TFacilityUser = tenant?.data?.data?.data?.user;
  const tenantsData = tenants?.data?.data?.users;

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

  return (
    <MainWrapper>
      <div className="card min-h-full flex flex-col h-full">
        <div className="flex justify-between items-start mb-5 lg:mb-8 lg:flex-row flex-col gap-3 lg:gap-0">
          <SectionHeader title="Tenants" description=" Manage and review your Tenant details here." />
          <Button variant="outline" onClick={() => handleOpenModal(Modals.addTenantModal)}>
            Add Tenant +
          </Button>
        </div>

        {/* Add new Tenant */}
        <ModalComponent
          open={modalState.modals.addTenantModal}
          setOpen={() => handleCloseModal(Modals.addTenantModal)}
          contentClass="min-w-[min(90vw,600px)] max-h-[90svh] overflow-y-auto"
          content={
            <AddEditTenant
              user={tenantData}
              action="add"
              role="tenant"
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              modalToClose={Modals.addTenantModal}
              modalToOpen={Modals.addedTenantModal}
              mutation={tenantsCtx.addTenant}
            />
          }
        />

        {/* View Pseudo Admin */}
        <ModalComponent
          open={modalState.modals.viewTenantModal}
          setOpen={() => closeModalFn(Modals.viewTenantModal)}
          contentClass="min-w-[min(90vw,700px)] max-h-[90svh] overflow-y-auto"
          content={
            <GetItemModal
              ctx={tenant}
              component={
                <ViewUser
                  role="tenant"
                  user={tenantData}
                  showEditModal={() => handleOpenModal(Modals.editTenantModal)}
                  showDeleteModal={() => showDeleteModal(tenantData._id)}
                />
              }
            />
          }
        />

        {/* Edit Tenant */}
        <ModalComponent
          open={modalState.modals.editTenantModal}
          setOpen={() => handleCloseModal(Modals.editTenantModal)}
          contentClass="min-w-[min(90vw,600px)] max-h-[90svh] overflow-y-auto"
          content={
            <AddEditTenant
              user={tenantData}
              action="edit"
              role="tenant"
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
              modalToClose={Modals.editTenantModal}
              modalToOpen={Modals.editedTenantModal}
              mutation={tenantsCtx.editTenant}
            />
          }
        />

        {/* Delete Tenant */}
        <ModalComponent
          open={modalState.modals.deleteTenantModal}
          setOpen={() => closeModalFn(Modals.deleteTenantModal)}
          content={
            <DeleteModalContent
              title="Delete Tenant"
              message="This action will permanently remove the selected Tenant. Are you sure you want to delete this Tenant? "
              id={tenantId as string}
              mutation={deleteTenant}
              onCancel={() => closeModalFn(Modals.deleteTenantModal)}
            />
          }
        />

        {/* added a new Tenant to the System */}
        <ModalComponent
          open={modalState.modals.addedTenantModal}
          setOpen={() => closeModalFn(Modals.addedTenantModal)}
          content={
            <SuccessModalContent
              actionBtnText="Go to User Management"
              title="Tenant Added Successfully"
              message="You’ve successfully added a new Tenant to the System"
              onConfirm={() => closeModalFn(Modals.addedTenantModal)}
            />
          }
        />

        {/* updated a Tenant to the System */}
        <ModalComponent
          open={modalState.modals.editedTenantModal}
          setOpen={() => closeModalFn(Modals.editedTenantModal)}
          content={
            <SuccessModalContent
              actionBtnText="Go to User Management"
              title="Tenant Updated Successfully"
              message="You’ve successfully update a Tenant to the System"
              onConfirm={() => {
                closeModalFn(Modals.editedTenantModal);
                handleCloseModal(Modals.viewTenantModal);
              }}
            />
          }
        />

        {/* data table */}
        {tenantsCtx.tenants.isLoading ? (
          <div className="w-full h-full grid place-content-center">
            <Loader />
          </div>
        ) : (
          <DataTable
            showMultiView={false}
            data={tenantsData || []}
            columns={TenantTableCoumns(showDeleteModal, showDetailsModal) as ColumnDef<unknown, unknown>[]}
          />
        )}
      </div>
    </MainWrapper>
  );
}
