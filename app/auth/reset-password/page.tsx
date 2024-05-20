'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Lock1, Sms } from 'iconsax-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputComponent } from '@/app/_components/inputs/InputComponent';
import BackendError from '@/app/_components/utils/FormError';
import Loader from '@/app/_components/utils/Loader';
import { Button } from '@/components/ui/button';
import { baseUrl, zodInputValidators } from '@/lib/utils';

const verificationCode = zodInputValidators.code;
const email = zodInputValidators.email;

const resetPasswordSchema = z.object({ verificationCode, email });

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const navigate = useRouter();
  const emailFromQuery = useSearchParams().get('email');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    defaultValues: {
      email: emailFromQuery || '',
    },
    reValidateMode: 'onChange',
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/verifypasswordreset`, data);
      if (response.status !== 200) throw new Error('An error occurred');
      const token = response.data.data.passwordResetToken;
      navigate.push(`/auth/new-password?token=${token}&reset=${true}&email=${data.email}`);
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      setError('root', {
        message: errorMessage,
      });
      return;
    }
  };

  return (
    <React.Fragment>
      <h1 className="text-2xl md:text-3xl font-[600] tracking-tight mb-3">Password Reset</h1>
      <p className="text-sm text-gray-500 font-[500] text-center mb-7">
        A security code has been sent to your email address in order to reset your password.
      </p>

      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          id="email"
          name="email"
          type="email"
          error={errors.email?.message}
          register={register}
          label="Email"
          placeholder="Enter you email address"
          before={<Sms color="gray" size={18} className="ml-3" />}
        />
        <InputComponent
          id="text"
          name="verificationCode"
          type="text"
          error={errors.verificationCode?.message}
          register={register}
          label="Security Code"
          placeholder="Enter the security code sent to your email address"
          before={<Lock1 color="gray" size={18} className="ml-3" />}
        />

        <Button disabled={isSubmitting} className="mt-3">
          {isSubmitting ? <Loader /> : 'Reset Password'}
        </Button>
        <BackendError errors={errors} />
      </form>
    </React.Fragment>
  );
};

export default ResetPassword;
