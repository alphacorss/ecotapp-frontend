import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Auth from '@/app/_context/User';
import useClearError from '@/app/_hooks/useClearError';
import { baseUrl, zodInputValidators } from '@/lib/utils';

const email = zodInputValidators.email;
const password = zodInputValidators.password;

const loginSchema = z.object({ email, password });

type LoginSchema = z.infer<typeof loginSchema>;

const useLoginHook = () => {
  const { isError } = React.useContext(Auth);
  const [authError, setAuthError] = React.useState(false);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isError) {
      setAuthError(true);

      timeout = setTimeout(() => {
        setAuthError(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [isError]);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LoginSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  useClearError(errors, clearErrors);

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, data);
      const { token, role } = response.data.data;
      document.cookie = `token=${token}; path=/`;
      document.cookie = `role=${role}; path=/`;
      reset();
      window.location.replace('/dashboard/home');
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      setError('root', {
        message: errorMessage,
      });
    }
  };
  return {
    errors,
    isSubmitting,
    isSubmitSuccessful,
    register,
    onSubmit,
    handleSubmit,
    authError,
  };
};

export default useLoginHook;
