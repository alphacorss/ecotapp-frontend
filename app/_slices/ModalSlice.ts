/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Modals } from '../enums';

export interface ModalsState {
  modals: {
    none: boolean;
    // Pseudo Admin Modals
    viewPseudoAdminModal: boolean;
    addPseudoAdminModal: boolean;
    addedPseudoAdminModal: boolean;
    editPseudoAdminModal: boolean;
    editedPseudoAdminModal: boolean;
    deletePseudoAdminModal: boolean;
    deletedPseudoAdminModal: boolean;
    // organization Modals
    viewOrgModal: boolean;
    addOrgModal: boolean;
    addedOrgModal: boolean;
    editOrgModal: boolean;
    editedOrgModal: boolean;
    deleteOrgModal: boolean;
    deletedOrgModal: boolean;
    // org admin
    viewOrgAdminModal: boolean;
    addOrgAdminModal: boolean;
    addedOrgAdminModal: boolean;
    editOrgAdminModal: boolean;
    editedOrgAdminModal: boolean;
    deleteOrgAdminModal: boolean;
    deletedOrgAdminModal: boolean;
    // org manager
    viewOrgManagerModal: boolean;
    addOrgManagerModal: boolean;
    addedOrgManagerModal: boolean;
    editOrgManagerModal: boolean;
    editedOrgManagerModal: boolean;
    deleteOrgManagerModal: boolean;
    deletedOrgManagerModal: boolean;
    //facility
    viewFacilityModal: boolean;
    addFacilityModal: boolean;
    addedFacilityModal: boolean;
    editFacilityModal: boolean;
    editedFacilityModal: boolean;
    deleteFacilityModal: boolean;
    deletedFacilityModal: boolean;
    // facility manager
    viewFacilityManagerModal: boolean;
    addFacilityManagerModal: boolean;
    addedFacilityManagerModal: boolean;
    editFacilityManagerModal: boolean;
    editedFacilityManagerModal: boolean;
    deleteFacilityManagerModal: boolean;
    deletedFacilityManagerModal: boolean;
    //tenant
    viewTenantModal: boolean;
    addTenantModal: boolean;
    addedTenantModal: boolean;
    editTenantModal: boolean;
    editedTenantModal: boolean;
    deleteTenantModal: boolean;
    deletedTenantModal: boolean;
    //survey
    createSurveyModal: boolean;
    viewSurveyModal: boolean;
    editSurveyModal: boolean;
    deleteSurveyModal: boolean;
    surveySentModal: boolean;
    surveySubmiited: boolean;
    //setting
    settingUserUpdated: boolean;
  };
}

const initialState: ModalsState = {
  modals: {
    none: false,
    // Pseudo Admin Modals
    viewPseudoAdminModal: false,
    addPseudoAdminModal: false,
    addedPseudoAdminModal: false,
    editPseudoAdminModal: false,
    editedPseudoAdminModal: false,
    deletePseudoAdminModal: false,
    deletedPseudoAdminModal: false,
    // organization Modals
    viewOrgModal: false,
    addOrgModal: false,
    addedOrgModal: false,
    editOrgModal: false,
    editedOrgModal: false,
    deleteOrgModal: false,
    deletedOrgModal: false,
    // org admin
    viewOrgAdminModal: false,
    addOrgAdminModal: false,
    addedOrgAdminModal: false,
    editOrgAdminModal: false,
    editedOrgAdminModal: false,
    deleteOrgAdminModal: false,
    deletedOrgAdminModal: false,
    // org manager
    viewOrgManagerModal: false,
    addOrgManagerModal: false,
    addedOrgManagerModal: false,
    editOrgManagerModal: false,
    editedOrgManagerModal: false,
    deleteOrgManagerModal: false,
    deletedOrgManagerModal: false,
    //facility
    viewFacilityModal: false,
    addFacilityModal: false,
    addedFacilityModal: false,
    editFacilityModal: false,
    editedFacilityModal: false,
    deleteFacilityModal: false,
    deletedFacilityModal: false,
    // facility manager
    viewFacilityManagerModal: false,
    addFacilityManagerModal: false,
    addedFacilityManagerModal: false,
    editFacilityManagerModal: false,
    editedFacilityManagerModal: false,
    deleteFacilityManagerModal: false,
    deletedFacilityManagerModal: false,
    //tenant
    viewTenantModal: false,
    addTenantModal: false,
    addedTenantModal: false,
    editTenantModal: false,
    editedTenantModal: false,
    deleteTenantModal: false,
    deletedTenantModal: false,
    //survey
    createSurveyModal: false,
    viewSurveyModal: false,
    editSurveyModal: false,
    deleteSurveyModal: false,
    surveySentModal: false,
    surveySubmiited: false,
    //setting
    settingUserUpdated: false,
  },
};

export const modals = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<Modals>) => {
      state.modals[action.payload] = !state.modals[action.payload];
    },
    openModal: (state, action: PayloadAction<Modals>) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<Modals>) => {
      state.modals[action.payload] = false;
    },
    closeAllModals: (state) => {
      state.modals = initialState.modals;
    },
  },
});

export const { toggleModal, closeAllModals, openModal, closeModal } = modals.actions;
export default modals.reducer;
