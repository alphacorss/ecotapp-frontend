import React from 'react';

const ErrorMessage = ({ error }: { error?: string | null }) => {
  return (
    <>
      {error && (
        <p
          className={`error-input  
          ${error ? 'animate-fade-in opacity-1' : 'animate-fade-out opacity-0'}`}
        >
          {error}
        </p>
      )}
    </>
  );
};

export default ErrorMessage;
