import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import Queries from '@/app/context/Queries';
import Auth from '@/app/context/User';
import useClearError from '@/app/hooks/useClearError';
import { getRole, zodInputValidators } from '@/lib/utils';

const firstName = zodInputValidators.name;
const lastName = zodInputValidators.name;
const email = zodInputValidators.email;
const country = zodInputValidators.dropDown;
const phone = zodInputValidators.phone;

const schema = z
  .object({
    firstName,
    lastName,
    email,
    country,
    phone,
    currentPassword: z.union([zodInputValidators.password.nullish(), z.literal('')]),
    newPassword: z.union([zodInputValidators.password.nullish(), z.literal('')]),
    confirmPassword: z.union([zodInputValidators.password.nullish(), z.literal('')]),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .superRefine((data, ctx) => {
    if (data.currentPassword && !data.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please enter a new password',
        path: ['newPassword'],
      });
    }
    if (!data.currentPassword && data.newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please enter your current password',
        path: ['currentPassword'],
      });
    }
  });

export type SettingFormFieldsUser = z.infer<typeof schema>;

const useSettings = () => {
  const { user, userQuery } = React.useContext(Auth);
  const { updateProfile, updatePassword } = React.useContext(Queries);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { isDirty, errors },
  } = useForm<SettingFormFieldsUser>({
    defaultValues: {
      firstName: user?.user?.firstName,
      lastName: user?.user?.lastName,
      email: user?.user?.email,
      country: user?.user?.phone?.split('-')[0],
      phone: user?.user?.phone?.split('-')[1],
    },
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  });

  useClearError(errors, clearErrors);

  const onSubmit: SubmitHandler<SettingFormFieldsUser> = (data) => {
    const role = getRole();
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: `${data.country}-${data.phone}`,
      password: data.newPassword,
      role,
    };

    updateProfile.mutate(userData);
    if (data.newPassword) {
      updatePassword.mutate({
        currentPasword: data.currentPassword,
        newPassword: data.newPassword,
      });
    }
  };

  const error = updateProfile.error || updatePassword.error;
  const isLoading = updatePassword.isPending || updateProfile.isPending;
  const isSuccess = updatePassword.isSuccess || updateProfile.isSuccess;

  const [updated, setUpdated] = React.useState(false);
  React.useEffect(() => {
    if (error) {
      setUpdated(false);
      if (axios.isAxiosError(error)) {
        setError('root', {
          message: error.response?.data?.message,
        });
      }
    } else if (isSuccess) {
      setUpdated(true);
    }
  }, [error, isSuccess, setError]);

  return {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    errors,
    onSubmit,
    isDirty,
    isLoading,
    updated,
    setUpdated,
    userQuery,
    updateProfile,
    updatePassword,
  };
};

export default useSettings;
