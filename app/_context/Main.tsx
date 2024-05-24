import { useCycle } from 'framer-motion';
import React, { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { QueriesCtxProvider } from './Queries';
import { SurveyCtxProvider } from './Survey';
import useWindowDimensions from '../_hooks/useMediaQuery';
import { ModalsState, closeModal, openModal } from '../_slices/ModalSlice';
import { Modals } from '../enums';
import { RootState } from '../store';

export type TMainCtx = {
  isMobile: boolean;
  mobileNav: boolean;
  modalState: ModalsState;
  toggleMobileNav: () => void;
  handleOpenModal: (modal: Modals) => void;
  handleCloseModal: (modal: Modals) => void;
};

const Main = createContext<TMainCtx>({
  isMobile: false,
  mobileNav: false,
  modalState: {} as ModalsState,
  toggleMobileNav: () => {},
  handleOpenModal: () => {},
  handleCloseModal: () => {},
});

export function MainCtxProvider({ children }: React.PropsWithChildren<{}>) {
  const dispatch = useDispatch();
  const currentWindowWidth = useWindowDimensions();

  const modalState = useSelector((state: RootState) => state.modals);
  const [mobileNav, toggleMobileNav] = useCycle(false, true);
  const isMobile = currentWindowWidth.currentWindowWidth < 1024;

  const handleCloseModal = (modal: Modals) => {
    dispatch(closeModal(modal));
  };

  const handleOpenModal = (modal: Modals) => {
    dispatch(openModal(modal));
  };

  const contextValue = {
    isMobile,
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
