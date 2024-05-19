import React from 'react';
import { UseFormClearErrors } from 'react-hook-form';

const useClearError = (errors: Record<string, any>, clearErrors: UseFormClearErrors<any>) => {
  React.useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (errors) {
      timeout = setTimeout(() => {
        clearErrors();
      }, 3000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [clearErrors, errors]);
};

export default useClearError;
