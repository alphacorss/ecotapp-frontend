import { Loader2 } from 'lucide-react';
import React from 'react';

import './Loader.css';
import { cn } from '@/lib/utils';

const Loader = (props: any) => {
  return <Loader2 size={24} className="animate-spin" {...props} />;
};

export const PageLoader = () => {
  return (
    <div className="w-full h-[100svh] grid place-content-center">
      <span className="loader"></span>
      <p className="text-primary-300 text-xs text-center font-[500]">Please wait</p>
    </div>
  );
};

export const HomeCardLoader = () => {
  return (
    <div className="card p-5 min-h-[128px] flex flex-col gap-5">
      <div className="flex justify-between gap-5">
        <div className="size-[34px] animate-pulse rounded-md bg-gray-200"></div>
        <div className="size-[34px] flex-1 animate-pulse rounded-md bg-gray-200"></div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="size-4 w-full animate-pulse rounded-md bg-gray-200"></div>
        <div className="size-4 w-full animate-pulse rounded-md bg-gray-200"></div>
        <div className="size-2 w-full animate-pulse rounded-md bg-gray-200"></div>
      </div>
    </div>
  );
};

export const HomeMainLoader = () => {
  return (
    <div className="card p-5 flex flex-1 flex-col gap-2">
      <div className="h-[30px] w-6/12 animate-pulse rounded-md bg-gray-200"></div>
      <div className="h-[20px] w-6/12 animate-pulse rounded-md bg-gray-200"></div>
      <div className="h-[20px] w-6/12 animate-pulse rounded-md bg-gray-200 mb-7"></div>
      <div className="flex flex-1 w-full gap-5">
        <div className="flex-1 animate-pulse rounded-md bg-gray-200"></div>
        <div className="flex-1 animate-pulse rounded-md bg-gray-200"></div>
      </div>
    </div>
  );
};

export const BoxLoader = ({ className }: { className?: string }) => {
  return <div className={cn('h-[45px] border w-[100px] animate-pulse bg-gray-200 rounded-md', className)}></div>;
};

export const ChartLoader = ({ showTop, showBottom }: { showTop?: boolean; showBottom?: boolean }) => {
  return (
    <div className="border rounded-md p-5 h-[full] w-full min-h-[calc(100px)] flex flex-col gap-5">
      {showTop && (
        <div className="flex gap-5 mb-10">
          <div className="size-[50px] animate-pulse rounded-md bg-gray-200"></div>
          <div className="size-[50px] w-[200px] animate-pulse rounded-md bg-gray-200"></div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="h-[350px] mb-5 w-full animate-pulse rounded-md bg-gray-200"></div>
        {showBottom && <div className="h-[150px] w-full animate-pulse rounded-md bg-gray-200"></div>}
      </div>
    </div>
  );
};

export default Loader;
