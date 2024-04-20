import React from 'react';

import Loader from './Loader';

const GetItemModal = ({
  ctx,
  component,
}: {
  ctx: {
    isFetching: boolean;
    isError: boolean;
    isLoading: boolean;
  };
  component: React.ReactNode;
}) => {
  return (
    <>
      {ctx.isFetching || ctx.isLoading ? (
        <div className="grid w-full place-content-center">
          <Loader />
        </div>
      ) : ctx.isError ? (
        <p className="text-error-300 text-center">Something went wrong, please try again later</p>
      ) : (
        component
      )}
    </>
  );
};

export default GetItemModal;
