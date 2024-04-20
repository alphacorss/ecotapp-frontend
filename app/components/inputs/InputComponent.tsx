'use client';
import { Eye, EyeSlash } from 'iconsax-react';
import { AlertCircle } from 'lucide-react';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { Input, InputProps } from '../../../components/ui/input';
import { cn } from '@/lib/utils';

interface InputComponentProps extends InputProps {
  name: string;
  register?: UseFormRegister<any>;
  label?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  error?: string | undefined;
  container?: string;
  isPassword?: boolean;
}

export const InputComponent = ({
  name,
  error,
  label,
  after,
  before,
  register,
  container,
  isPassword,
  ...props
}: InputComponentProps) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const togglePasswordVisibility = () => {
    if (!isPassword) return;
    setPasswordVisible(!passwordVisible);
  };
  return (
    <div className={cn('flex gap-1 flex-col w-full rounded-[var(--rounded)]', container)}>
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <div
        className={`flex items-center border rounded-[var(--rounded)] ${
          error ? 'border-error-300' : 'border-[#C0C0C0]'
        }`}
      >
        {before}
        <Input
          type={isPassword && !passwordVisible ? 'password' : 'text'}
          id={name}
          {...props}
          {...(register && register(name))}
        />
        <>
          {isPassword && (
            <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none mr-3">
              {!passwordVisible ? <Eye size={18} color="gray" /> : <EyeSlash size={18} color="gray" />}
            </button>
          )}
        </>
        {after}
        {error ? <AlertCircle size={18} className="text-error-300  mr-3" /> : null}
      </div>
      {error && (
        <p
          className={`error-input  
          ${error ? 'animate-fade-in opacity-1' : 'animate-fade-out opacity-0'}`}
        >
          {error}
        </p>
      )}
    </div>
  );
};
