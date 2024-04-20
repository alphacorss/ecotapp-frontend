'use client';
import { Check, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { ScrollArea } from '../../../components/ui/scroll-area';
import { TComboBoxSelector, TCountry } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function NestedComboBoxComponentInput({
  data,
  watch,
  setValue,
  selectorName,
  register,
  error,
}: {
  selectorName: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  data: TCountry[];
  register: UseFormRegister<any>;
  error: string | undefined;
}) {
  const [open, setOpen] = React.useState(false);

  const value = watch(selectorName);

  const findCountry = (searchTerm: string) => {
    return data.find((item) => {
      return item.mobileCode === searchTerm || item.mobileCode === searchTerm;
    });
  };

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="p-0 h-auto" asChild>
        <Button
          type="button"
          variant="link"
          role="combobox"
          aria-expanded={open}
          {...register(selectorName)}
          className={`border-none h-[45px] px-1 pl-3 flex min-w-fit items-center gap-2 ${
            error ? 'border-red-500' : ''
          }`}
        >
          {value && (
            <Image
              width={20}
              height={20}
              alt="flag"
              className="rounded-full"
              src={'/flags/' + findCountry(value)?.code.toLowerCase() + '.svg'}
            />
          )}
          {value ? `${findCountry(value)?.code}` : setValue(selectorName, '+1')}
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput className="text-xs tracking-tighter" placeholder="Search by country name" />
          <ScrollArea className="h-40 w-full rounded-md border">
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {data.map((item, i) => {
                return (
                  <CommandItem
                    key={i}
                    value={item.name.toLowerCase()}
                    className="cursor-pointer"
                    onSelect={() => {
                      setValue(selectorName, item.mobileCode);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn('mr-2 h-4 w-4', value === item.mobileCode ? 'opacity-100' : 'opacity-0')} />
                    <Image
                      width={20}
                      height={20}
                      alt="flag"
                      className="rounded-full mr-2"
                      src={'/flags/' + item?.code.toLowerCase() + '.svg' || ''}
                    />
                    {`${item.name} ${item.mobileCode}`}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function ComboBoxFormCountryState({
  label,
  data,
  title,
  watch,
  setValue,
  selectorName,
  register,
  error,
}: {
  label: string;
  title: string;
  watch: UseFormWatch<any>;
  selectorName: string;
  setValue: UseFormSetValue<any>;
  data: TComboBoxSelector[];
  error: string | undefined;
  register: UseFormRegister<any>;
}) {
  const [open, setOpen] = React.useState(false);
  const value = watch(selectorName);

  const name = data?.find((item) => item.label?.toLowerCase() === value?.toLowerCase())?.label;

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="h-auto" asChild>
        <div className="w-full flex flex-col gap-1">
          <p className="input-label">{label}</p>
          <Button
            type="button"
            variant="link"
            role="combobox"
            {...register(selectorName)}
            aria-expanded={open}
            className={`justify-between border font-[500] border-gray-300 h-[45px] ${error ? 'border-red-500' : ''}
          ${value ? 'text-gray-700' : 'text-gray-500/40'}
            `}
          >
            {value ? name : `Select an option`}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-black" />
          </Button>
          {error && (
            <p className={`error-input ${error ? 'animate-fade-in opacity-1' : 'animate-fade-out opacity-0'}`}>
              {error}
            </p>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-[250px] p-0">
        <Command>
          <CommandInput className="text-xs tracking-tighter" placeholder={`Search by ${title.toLowerCase()} name`} />
          <ScrollArea className="h-40 w-full rounded-md border">
            <CommandEmpty>No {title.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {data?.map((item, i) => {
                return (
                  <CommandItem
                    key={i}
                    value={item?.label?.toLowerCase()}
                    className={`cursor-pointer ${value === item?.label?.toLowerCase() ? 'bg-gray-200' : ''}`}
                    onSelect={(currentValue) => {
                      setValue(selectorName, currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn('mr-2 h-4 w-4', value === item?.label?.toLowerCase() ? 'opacity-100' : 'opacity-0')}
                    />
                    {item?.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function ComboBoxFormComponent({
  label,
  data,
  title,
  setValue,
  watch,
  selectorName,
  register,
  error,
  disabled,
  labelClass,
}: {
  label: string;
  title: string;
  disabled?: boolean;
  selectorName: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
  data: TComboBoxSelector[];
  error: string | undefined;
  register: UseFormRegister<any>;
  labelClass?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const value = watch(selectorName);

  const name = data?.find((item) => item?.value === value)?.label;

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={disabled} className="h-auto" asChild>
        <div className={`w-full flex flex-col gap-1 ${disabled ? 'pointer-events-none' : ''}`}>
          <p className={cn('input-label', labelClass)}>{label}</p>
          <Button
            type="button"
            variant="link"
            role="combobox"
            disabled={disabled}
            {...register(selectorName)}
            aria-expanded={open}
            className={`justify-between border font-[500] border-gray-300 h-[45px] ${error ? 'border-red-500' : ''}
          ${value ? 'text-gray-700' : 'text-gray-500/40'}
            `}
          >
            {value ? name : `Select an option`}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-black" />
          </Button>
          {error && (
            <p className={`error-input ${error ? 'animate-fade-in opacity-1' : 'animate-fade-out opacity-0'}`}>
              {error}
            </p>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="min-w-[250px] p-0">
        <Command>
          <CommandInput className="text-xs tracking-tighter" placeholder={`Search by ${title.toLowerCase()} name`} />
          <ScrollArea className="h-40 w-full rounded-md border">
            <CommandEmpty>No {title.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {data?.map((item, i) => {
                return (
                  <CommandItem
                    key={i}
                    value={item?.label?.toLowerCase()}
                    className={`cursor-pointer ${value === item?.value ? 'bg-gray-200' : ''}`}
                    onSelect={() => {
                      setValue(selectorName, item?.value);
                      setOpen(false);
                    }}
                  >
                    <Check className={cn('mr-2 h-4 w-4', value === item?.value ? 'opacity-100' : 'opacity-0')} />
                    {item?.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
