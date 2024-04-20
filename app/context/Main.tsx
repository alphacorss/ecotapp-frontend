/* eslint-disable no-unused-vars */
import { useCycle } from 'framer-motion';
import React, { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { QueriesCtxProvider } from './Queries';
import { SurveyCtxProvider } from './Survey';
import { Modals, ModalsState, closeModal, openModal } from '../slices/ModalSlice';
import { RootState } from '../store';

export type TMainCtx = {
  definedGlobalWidth: number;
  mobileNav: boolean;
  modalState: ModalsState;
  toggleMobileNav: () => void;
  handleOpenModal: (modal: Modals) => void;
  handleCloseModal: (modal: Modals) => void;
};

const Main = createContext<TMainCtx>({
  mobileNav: false,
  definedGlobalWidth: 767,
  modalState: {} as ModalsState,
  toggleMobileNav: () => {},
  handleOpenModal: () => {},
  handleCloseModal: () => {},
});

export function MainCtxProvider({ children }: React.PropsWithChildren<{}>) {
  const dispatch = useDispatch();
  const definedGlobalWidth = 767;

  const modalState = useSelector((state: RootState) => state.modals);
  const [mobileNav, toggleMobileNav] = useCycle(false, true);

  const handleCloseModal = (modal: Modals) => {
    dispatch(closeModal(modal));
  };

  const handleOpenModal = (modal: Modals) => {
    dispatch(openModal(modal));
  };

  const contextValue = {
    definedGlobalWidth,
    mobileNav,
    modalState,
    toggleMobileNav,
    handleOpenModal,
    handleCloseModal,
  };

  return (
    <Main.Provider value={contextValue}>
      <QueriesCtxProvider>
        <SurveyCtxProvider>{children}</SurveyCtxProvider>
      </QueriesCtxProvider>
    </Main.Provider>
  );
}

export default Main;
