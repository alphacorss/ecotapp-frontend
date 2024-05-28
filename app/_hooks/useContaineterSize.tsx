import React from 'react';

export const useContainerDimensions = (ref: React.RefObject<HTMLButtonElement | null>) => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const getDimensions = () => {
      if (ref.current) {
        return {
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        };
      }
      return { width: 0, height: 0 };
    };

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (ref.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref]);

  return dimensions;
};
