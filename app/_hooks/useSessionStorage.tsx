import React from 'react';

const useSessionStorage = <T,>(key: string, intialValue?: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : intialValue;
    }
  });

  React.useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useSessionStorage;
