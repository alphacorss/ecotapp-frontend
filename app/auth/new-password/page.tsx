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
import { ModalComponent } from '@/app/_components/utils/Modal';
import SuccessModalContent from '@/app/_components/utils/SuccessModalContent';
import { Button } from '@/components/ui/button';
import { baseUrl, zodInputValidators } from '@/lib/utils';

const password = zodInputValidators.password;
const confirmPassword = zodInputValidators.password;

const forgotPasswordSchema = z
  .object({
    password,
    confirmPassword,
    email: z.union([z.string().email().nullish(), z.literal('')]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

const ResetPassword = () => {
  const navigate = useRouter();
  const token = useSearchParams().get('token');
  const resetPassword = useSearchParams().get('reset');
  const emailFromQuery = useSearchParams().get('email');
  const [success, setSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ForgotPasswordSchema>({
    defaultValues: {
      email: emailFromQuery || '',
    },
    reValidateMode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    const newPassword = data.password;
    const url = resetPassword ? `${baseUrl}/auth/forgetpassword` : `${baseUrl}/auth/verifyregistration`;
    const body = resetPassword ? { ...data, newPassword, passwordResetToken: token } : { newPassword, token };
    try {
      const response = await axios.post(url, body);
      if (response.status !== 200) throw new Error('An error occurred');
      setSuccess(true);
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      setError('root', {
        message: errorMessage,
      });
      return;
    }
  };

  return (
    <div className="bg-gradient-to-b from-primary-75/60 to-accent-50 h-[100svh] w-full py-16 flex justify-center items-center">
      <div className="w-[min(90vw,550px)] mx-auto overflow-y-auto bg-white shadow-[0_1px_5px_rgb(0,0,0,0.2)] rounded-[var(--rounded)] flex flex-col items-center py-10 px-5 md:px-16 scroll-mr-10">
        {isSubmitSuccessful ? (
          <ModalComponent
            open={success}
            content={
              <SuccessModalContent
                actionBtnText="Login to your account"
                title={'Login to your account'}
                message={
                  resetPassword
                    ? 'Your password has been reset successfully'
                    : 'Your password has been setup successfully. You can now login to your account.'
                }
                onConfirm={() => {
                  setSuccess(false);
                  navigate.push('/auth/login');
                }}
              />
            }
          />
        ) : (
          <div className="w-full flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl font-[600] tracking-tight mb-3">Setup A New Password</h1>
            <p className="text-sm text-gray-500 font-[500] text-center mb-7">Enter your new password</p>

            <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              {resetPassword && (
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
              )}
              <InputComponent
                id="password"
                name="password"
                isPassword
                autoComplete="off"
                register={register}
                error={errors.password?.message}
                label="Enter a new password"
                placeholder="Password"
                before={<Lock1 color="gray" size={18} className="ml-3" />}
              />

              <InputComponent
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="off"
                isPassword
                register={register}
                error={errors.confirmPassword?.message}
                label="Confirm Password"
                placeholder="Confirm Password"
                before={<Lock1 color="gray" size={18} className="ml-3" />}
              />

              <Button disabled={isSubmitting} className="mt-3">
                {isSubmitting ? <Loader /> : resetPassword ? 'Reset Password' : 'Complete Registration'}
              </Button>
              <BackendError errors={errors} />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
