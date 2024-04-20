import React from 'react';

const useClearErrorMessage = (error: boolean, setError: React.Dispatch<React.SetStateAction<boolean>>) => {
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error) {
      timer = setTimeout(() => {
        setError(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [error, setError]);
  return null;
};

export default useClearErrorMessage;
