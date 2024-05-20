import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { TCountry } from '@/app/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const selectVariant = cva('w-full h-11 min-w-fit whitespace-nowrap', {
  variants: {
    variant: {
      default: 'rounded-[var(--rounded)] border-gray-300',
      ghost: 'border-none bg-transparent p-0 h-auto text-xs',
    },
    size: {
      default: 'h-[45px]',
      h40: 'h-[40px]',
      small: 'h-[35px]',
      auto: 'h-auto',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

interface SelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof selectVariant> {
  asChild?: boolean;
  title: string;
  placeholder?: string;
  icon?: React.ReactNode;
  defaultValue?: string;
  handleSelect: (value: string) => void;
  array: { name: string; value: string }[];
}

export function SelectComponent({
  icon,
  size,
  title,
  array,
  variant,
  className,
  placeholder,
  defaultValue,
  handleSelect,
}: SelectProps) {
  return (
    <Select onValueChange={handleSelect} defaultValue={!placeholder ? defaultValue ?? array[0]?.value : ''}>
      <SelectTrigger className={cn(selectVariant({ variant, size }))}>
        <div className="flex justify-start gap-3">
          {icon ? icon : null}
          <SelectValue
            placeholder={placeholder}
            defaultValue={defaultValue ?? array[0]?.value}
            className="placeholder:text-gray-400 text-gray-400 p-0"
          />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          <ScrollArea className={cn(selectVariant({ className }))}>
            {array.map((item, index) => {
              return (
                <SelectItem key={index} value={item.value} className="cursor-pointer">
                  {item.name}
                </SelectItem>
              );
            })}
          </ScrollArea>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

interface CountrySelectorProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof selectVariant> {
  asChild?: boolean;
  title: string;
  placeholder?: string;
  icon?: React.ReactNode;
  handleSelect: () => void;
  array: TCountry[];
  error?: { state: string; error: string };
  defaultSelected?: string;
}

export function CountrySelector({
  icon,
  size,
  title,
  array,
  error,
  variant,
  className,
  placeholder,
  defaultSelected,
  handleSelect,
}: CountrySelectorProps) {
  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger
        className={cn(selectVariant({ variant, size }))}
        style={error?.state ? { borderColor: 'red' } : {}}
      >
        <div className="flex justify-start gap-3">
          {icon ? icon : null}
          <SelectValue
            placeholder={defaultSelected ? defaultSelected : placeholder}
            className="placeholder:text-gray-400 text-gray-400"
          />
        </div>
      </SelectTrigger>
      <p
        className={`text-xs font-[500] text-error-300 select-none mt-1  
          ${error?.state ? 'animate-fade-in opacity-1' : 'animate-fade-out opacity-0'}`}
      >
        {error?.state ? error.error : ''}
      </p>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          <ScrollArea className={cn(selectVariant({ className }))}>
            {array.map((item, index) => {
              return (
                <SelectItem key={index} value={item.code} className="cursor-pointer">
                  {item.name}
                </SelectItem>
              );
            })}
          </ScrollArea>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
