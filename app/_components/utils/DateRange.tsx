'use client';

import { format } from 'date-fns';
import { AlertCircle, Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  className?: string;
  error: string | undefined;
  label?: string;
  setDateError: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export function DatePickerWithRange({ error, label, date, setDate, className, setDateError }: Props) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex gap-1 flex-col w-full rounded-[var(--rounded)]">
            <p className="input-label">{label}</p>
            <div
              className={`flex items-center border rounded-[var(--rounded)] ${
                error ? 'border-error-300' : 'border-[#C0C0C0]'
              }`}
            >
              <button
                id="date"
                type="button"
                className={cn(
                  'outline-0 ring-0 flex items-center w-full text-sm text-gray-700 font-[500] placeholder:font-[400] tracking- ring-offset-white font placeholder:text-[#C0C0C0] disabled:cursor-not-allowed disabled:opacity-50  rounded-[var(--rounded)] p-3',
                  !date && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className={`mr-2 h-4 w-4 ${!date ? 'text-[#C0C0C0]' : ''}`} />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span className="text-[#C0C0C0] font-[300]">Pick a date</span>
                )}
              </button>
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
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            onDayBlur={() => setDateError(undefined)}
            onDayFocus={() => setDateError(undefined)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
