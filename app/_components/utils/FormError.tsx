import React from 'react';
import { FieldErrors } from 'react-hook-form';

const BackendError = ({ errors }: { errors: FieldErrors }) => {
  return (
    <>
      {errors.root && (
        <p
          className={`text-xs font-[500] text-error-300 select-none text-center 
          ${errors.root ? 'animate-fade-in opacity-1' : 'animate-fade-out opacity-0'}`}
        >
          {errors.root?.message}
        </p>
      )}
    </>
  );
};

export default BackendError;
