'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Sms } from 'iconsax-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputComponent } from '@/app/_components/inputs/InputComponent';
import BackendError from '@/app/_components/utils/FormError';
import Loader from '@/app/_components/utils/Loader';
import useClearError from '@/app/_hooks/useClearError';
import { Button } from '@/components/ui/button';
import { baseUrl } from '@/lib/utils';

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ForgotPasswordSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
  });

  useClearError(errors, clearErrors);

  const onSubmit = async (data: ForgotPasswordSchema) => {
    try {
      await axios.post(`${baseUrl}/auth/requestpasswordreset`, data);
      setTimeout(() => {
        router.push(`/auth/reset-password?email=${data.email}`);
      }, 1000);
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      setError('root', {
        message: errorMessage,
      });
    }
  };

  return (
    <React.Fragment>
      <h1 className="text-2xl md:text-3xl font-[600] tracking-tight mb-3">Forgot your Password?</h1>
      <p className="text-sm text-gray-500 font-[500] text-center mb-7">
        Enter your registered email address to receive a reset instruction
      </p>

      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          id="email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          register={register}
          error={errors.email?.message}
          placeholder="Enter your email address"
          before={<Sms color="gray" size={18} className="ml-3" />}
        />

        <Button disabled={isSubmitting} className="mt-3">
          {isSubmitting ? <Loader /> : 'Send recovery instructions'}
        </Button>
        <BackendError errors={errors} />
        {isSubmitSuccessful && (
          <p className="text-green-500 font-[500] text-xs text-center">
            A verification code has been sent to your email{' '}
            <Link className="text-primary-300/90" href={`/auth/reset-password?email=${getValues('email')}`}>
              Reset password
            </Link>
          </p>
        )}
      </form>
    </React.Fragment>
  );
};

export default ForgotPassword;
