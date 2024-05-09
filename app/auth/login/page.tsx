'use client';
import { Lock1, Sms } from 'iconsax-react';
import Link from 'next/link';
import React from 'react';

import useLoginHook from './login.hook';
import { InputComponent } from '@/app/_components/inputs/InputComponent';
import BackendError from '@/app/_components/utils/FormError';
import Loader from '@/app/_components/utils/Loader';
import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';

const LoginPage = () => {
  const {
    errors,
    handleSubmit,
    isSubmitting,
    isSubmitSuccessful,
    onSubmit,
    register,
    // setStayLoggedIn,
    // stayLoggedIn,
    authError,
  } = useLoginHook();

  return (
    <div className="bg-gradient-to-b from-primary-75/60 to-accent-50 h-[100svh] w-full py-16 flex justify-center items-center">
      <div className="w-[min(90vw,550px)] mx-auto overflow-y-auto bg-white shadow-[0_1px_5px_rgb(0,0,0,0.2)] rounded-[var(--rounded)] flex flex-col items-center py-10 px-5 md:px-16 scroll-mr-10 mb-6">
        <h1 className="text-3xl font-[600] tracking-tight mb-3">Sign in</h1>
        <p className="text-sm text-gray-500 font-[500] text-center mb-10">
          Login with your credentials to manage your energy
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
          <InputComponent
            name="email"
            autoComplete="email"
            register={register}
            error={errors.email?.message}
            placeholder="Enter your email address"
            before={<Sms color="gray" size={18} className="ml-3" />}
          />
          <InputComponent
            name="password"
            isPassword
            register={register}
            autoComplete="current-password"
            error={errors.password?.message}
            placeholder="Enter your password"
            before={<Lock1 color="gray" size={18} className="ml-3" />}
          />
          <div className="justify-between items-center flex">
            {/* <span className="flex justify-center items-center gap-2">
              <Checkbox id="stayLoggedIn" checked={stayLoggedIn} onCheckedChange={(e) => setStayLoggedIn(Boolean(e))} />
              <label htmlFor="stayLoggedIn" className="text-xs font-[500] text-gray-500 select-none cursor-pointer">
                Stay logged in
              </label>
            </span> */}

            <Link href="/auth/forgot-password" className="text-xs font-[500] text-primary-300">
              Forgot password?
            </Link>
          </div>

          <Button
            disabled={isSubmitting}
            className={`mt-3 ${isSubmitSuccessful ? 'bg-green-500 hover:bg-green-500' : 'bg-primary-300'}`}
          >
            {isSubmitting ? <Loader /> : isSubmitSuccessful ? 'Login successful' : 'Sign in'}
          </Button>
          <BackendError errors={errors} />
          {authError && (
            <p
              className={`text-xs font-[500] text-error-300 select-none text-center 
           ${authError ? 'animate-fade-in opacity-1' : 'animate-fade-out opacity-0'}`}
            >
              User validation failed, please sign in again
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
