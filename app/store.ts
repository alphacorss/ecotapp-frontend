import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './slices/ModalSlice';

export const store = configureStore({
  reducer: {
    modals: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
