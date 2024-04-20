import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

import Loader from '../utils/Loader';
import { Button } from '@/components/ui/button';
import { baseUrl } from '@/lib/utils';

export const ResetPassword = ({ email }: { email: string | undefined }) => {
  const requestPasswordReset = async (email: string | undefined) => {
    const response = await axios.post(`${baseUrl}/auth/requestpasswordreset`, {
      email,
    });
    return response;
  };

  const reset = useQuery({
    queryKey: ['reset', email],
    queryFn: () => requestPasswordReset(email),
    enabled: false,
  });

  return (
    <Button
      type="button"
      className={`mt-5 font-[500] ${
        reset.isLoading || reset.isFetching
          ? 'bg-gray-300'
          : reset.isSuccess
            ? 'bg-green-500 border-green-500 hover:bg-green-500 text-white'
            : reset.isError
              ? 'bg-red-500 border-red-500 hover:bg-red-500 text-white'
              : ''
      }`}
      variant="outline"
      disabled={reset.isLoading || reset.isFetching}
      onClick={() => reset.refetch()}
    >
      {reset.isLoading || reset.isFetching ? (
        <Loader />
      ) : reset.isSuccess ? (
        'Recovery instruction sent'
      ) : reset.isError ? (
        'Something went wrong! Click to retry'
      ) : (
        'Send password recovery instruction'
      )}
    </Button>
  );
};
