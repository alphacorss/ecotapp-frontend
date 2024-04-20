'use client';
import { Table } from '@tanstack/react-table';
import { SearchNormal } from 'iconsax-react';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import { InputComponent } from '../inputs/InputComponent';
import { TableColumnVisibility } from '../utils/DropDowns';

export const PageFilterAndType = ({
  table,
  globalFilter,
  setGlobalFilter,
  showMultiView,
}: {
  table: Table<any>;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  showMultiView: boolean;
}) => {
  const searchParams = useSearchParams().get('sp');

  React.useEffect(() => {
    if (searchParams) {
      setGlobalFilter(searchParams);
    }
  }, [searchParams, setGlobalFilter]);

  return (
    <div
      className={`flex md:items-center items-start  gap-5 w-full py-4 flex-col md:flex-row transition ${
        showMultiView ? 'justify-between' : 'justify-end'
      }`}
    >
      <div className="flex gap-2 justify-end items-center w-full h-[40px]">
        <InputComponent
          id="search-table"
          name="search-table"
          placeholder="Search here..."
          autoComplete="off"
          container="max-w-[300px] gap-0"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="bg-transparent py-[7.5px]"
          before={<SearchNormal size={20} color="gray" className="ml-3" />}
        />
        <TableColumnVisibility table={table} />
      </div>
    </div>
  );
};
