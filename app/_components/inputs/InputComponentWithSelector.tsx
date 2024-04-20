'use client';
import { AlertCircle } from 'lucide-react';
import React from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { Input, InputProps } from '../../../components/ui/input';
import { NestedComboBoxComponentInput } from '../utils/ComboBoxes';
import { TCountry } from '@/app/types';

interface InputComponentProps extends InputProps {
  inputId: string;
  inputType: string;
  inputName: string;
  inputLabel: string;
  inputPlaceholder: string;
  inputError: string | undefined;
  selectorError?: string | undefined;
  register: UseFormRegister<any>;
  selectorName: string;
  arry: TCountry[];
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

export const InputComponentWithSelector = ({
  inputId,
  inputType,
  inputName,
  inputLabel,
  inputPlaceholder,
  inputError,
  selectorError,
  selectorName,
  arry,
  register,
  watch,
  setValue,
  ...props
}: InputComponentProps) => {
  return (
    <div className="flex gap-1 flex-col w-full">
      <label htmlFor={inputId} className="input-label">
        {inputLabel}
      </label>
      <div
        className={`flex items-center border rounded-[var(--rounded)] pr-3
           ${inputError || selectorError ? 'border-error-300' : 'border-gray-300'}`}
      >
        <NestedComboBoxComponentInput
          data={arry}
          setValue={setValue}
          watch={watch}
          register={register}
          error={selectorError}
          selectorName={selectorName}
        />
        <Input
          id={inputId}
          type={inputType}
          placeholder={inputPlaceholder}
          {...props}
          {...(register && register(inputName))}
          className="ml-1"
        />
        {(inputError || selectorError) && <AlertCircle size={18} className="h-4 min-w-[15px] text-error-300 ml-2" />}
      </div>
      {(inputError || selectorError) && (
        <div
          className={`text-xs font-[500] text-error-300 select-none  
            ${inputError || selectorError ? 'animate-fade-in opacity-1' : 'animate-fade-out opacity-0'}`}
        >
          {inputError || selectorError}
        </div>
      )}
    </div>
  );
};
