'use client';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { TextAreaProps } from '../../../components/ui/input';
import { cn } from '@/lib/utils';

interface TTextAreaProps extends TextAreaProps {
  name: string;
  register?: UseFormRegister<any>;
  label?: string;
  error?: string | undefined;
  container?: string;
}

export const TextArea = ({ name, error, label, register, container, ...props }: TTextAreaProps) => {
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
        <textarea
          id={name}
          {...props}
          {...(register && register(name))}
          className="outline-0 ring-0 flex w-full text-sm font-[500] ring-offset-white placeholder:text-gray-500/40 rounded-[var(--rounded)] p-3 min-h-[100px]"
        />
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
