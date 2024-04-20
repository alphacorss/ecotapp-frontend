import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'outline-0 ring-0 flex w-full text-sm text-gray-700 font-[500] placeholder:font-[400] tracking- ring-offset-white font file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#C0C0C0] disabled:cursor-not-allowed disabled:opacity-50  rounded-[var(--rounded)] p-3',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
