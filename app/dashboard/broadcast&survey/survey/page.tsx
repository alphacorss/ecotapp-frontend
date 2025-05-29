'use client';
import React from 'react';

import { ColumnData } from './components/columns/columns';
import { TenantColumn } from './components/columns/TenantColumn';
import CreateTitle from './components/creating/CreateTitle';
import CreatingSurvey from './components/creating/CreatingSurvey';
import EmptyState from './components/EmptyState';
import Respond from './components/response/Respond';
import ViewSurveyDetails from './components/view/ViewSurveyDetails';
import DataTable from '@/app/_components/tables/Table';
import { DeleteModalContent, SuccessModalContent } from '@/app/_components/utils/Modals';
import { ModalComponent } from '@/app/_components/utils/Modals';
import SectionHeader from '@/app/_components/utils/SectionHeader';
import Main from '@/app/_context/Main';
import Queries from '@/app/_context/Queries';
import SurveyCtx from '@/app/_context/Survey';
import { Modals } from '@/app/enums';
import { Button } from '@/components/ui/button';
import { getRole } from '@/lib/utils';

/**
 * Survey component for managing and interacting with surveys.
 * Handles creation, viewing, responding to, and deleting surveys based on user role.
 */
const Survey = () => {
  // Context and state for survey management
  const {
    surveyId,
    surveyInfo,
    resetForms,
    setCreatingSurvey,
    setShowPreview,
    creatingSurvey,
    showPreview,
    setSurveyInfo,
  } = React.useContext(SurveyCtx);

  // Context for modal state management
  const { modalState, handleOpenModal, handleCloseModal } = React.useContext(Main);

  // Context for data queries and mutations
  const { mySurveys, createdSurveys, deleteSurvey, respondToSurvey, tenantDeleteSurvey } = React.useContext(Queries);

  // Determine user role and fetch survey data
  const role = getRole();
  const createdSurveysData = createdSurveys?.data?.data?.surveys;
  const tntSurveyDatas = mySurveys?.data?.data?.surveys;
  const hasData = createdSurveysData?.length > 0 || tntSurveyDatas?.length > 0;

  return (
    <div className="min-h-full card w-full lg:p-8 flex flex-col gap-5 lg:gap-10">
      {/* Header section with title and action button (visible when data exists and not in creation/preview mode) */}
      {hasData && !creatingSurvey && !showPreview && (
        <div className="flex justify-between items-start lg:flex-row flex-col gap-3 lg:gap-0">
          <SectionHeader
            title="Survey"
            description={
              role === 'tenant'
                ? `Manage surveys effortlessly.`
                : `Create and manage surveys effortlessly to gather valuable insights.`
            }
          />

          {/* Show 'Add Survey' button only for non-tenant users */}
          {role !== 'tenant' && (
            <Button variant="outline" onClick={() => handleOpenModal(Modals.createSurveyModal)}>
              Add Survey +
            </Button>
          )}
        </div>
      )}

      {/* Modal for creating a new survey title */}
      <ModalComponent
        open={modalState.modals.createSurveyModal}
        setOpen={() => handleCloseModal(Modals.createSurveyModal)}
        contentClass="min-w-[min(90vw,500px)] max-h-[90svh] overflow-y-auto"
        content={<CreateTitle />}
      />

      {/* Modal for viewing survey details */}
      <ModalComponent
        open={modalState.modals.viewSurveyModal}
        setOpen={() => resetForms()}
        contentClass="w-[min(90vw,900px)] max-w-[90vw] max-h-[90vh] overflow-y-auto min-h-fit"
        content={<ViewSurveyDetails />}
      />

      {/* Modal for success notification after sending a survey */}
      <ModalComponent
        open={modalState.modals.surveySentModal}
        setOpen={() => handleCloseModal(Modals.surveySentModal)}
        content={
          <SuccessModalContent
            title="Survey sent successfully"
            message="You've successfully added a new survey to the system"
            onConfirm={() => {
              resetForms();
              setCreatingSurvey(false);
              setShowPreview(false);
              handleCloseModal(Modals.surveySentModal);
            }}
          />
        }
      />

      {/* Modal for success notification after submitting a survey response */}
      <ModalComponent
        open={modalState.modals.surveySubmiited}
        setOpen={() => handleCloseModal(Modals.surveySubmiited)}
        content={
          <SuccessModalContent
            title="Survey submitted successfully"
            message="Thank you for sharing your insights! Your feedback helps shape a more sustainable and efficient system."
            onConfirm={() => {
              resetForms();
              setCreatingSurvey(false);
              setShowPreview(false);
              setSurveyInfo(null);
              respondToSurvey.reset();
              handleCloseModal(Modals.surveySubmiited);
            }}
            actionBtnText="Go to Survey"
          />
        }
      />

      {/* Modal for confirming survey deletion */}
      <ModalComponent
        open={modalState.modals.deleteSurveyModal}
        setOpen={() => {
          handleCloseModal(Modals.deleteSurveyModal);
          role === 'tenant' ? tenantDeleteSurvey.reset() : deleteSurvey.reset();
        }}
        content={
          <DeleteModalContent
            title="Delete Survey?"
            message="This action will permanently remove the selected survey. Are you sure you want to delete this survey? "
            id={surveyId}
            mutation={role === 'tenant' ? tenantDeleteSurvey : deleteSurvey}
            onCancel={() => handleCloseModal(Modals.deleteSurveyModal)}
          />
        }
      />

      {/* Conditional rendering based on survey state */}
      {hasData || creatingSurvey ? (
        <>
          {creatingSurvey ? (
            <CreatingSurvey />
          ) : surveyInfo ? (
            <Respond />
          ) : (
            <div>
              {role !== 'tenant' ? (
                <DataTable showMultiView={false} data={createdSurveysData} columns={ColumnData()} />
              ) : (
                <DataTable showMultiView={false} data={tntSurveyDatas} columns={TenantColumn()} />
              )}
            </div>
          )}
        </>
      ) : (
        <EmptyState imgpath="/pages/survey-empty.svg" btnText="Create a survey" />
      )}
    </div>
  );
};

export default Survey;
