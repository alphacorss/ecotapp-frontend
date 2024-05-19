import React from 'react';
import { UseFormReset, UseFormSetError } from 'react-hook-form';

import { TMutationHandler } from '../types';

export const useHandleFormState = (
  mutation: TMutationHandler,
  reset: UseFormReset<any>,
  setError: UseFormSetError<any>,
  onClose: () => void,
) => {
  React.useEffect(() => {
    if (mutation.isSuccess) {
      onClose();
      reset();
      mutation.reset();
    } else if (mutation.error) {
      const errorMessage = (mutation.error as any).response?.data?.message;
      setError('root', { message: errorMessage });
    }
  }, [mutation, onClose, reset, setError]);
};
