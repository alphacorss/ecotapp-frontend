import { Column } from '@tanstack/react-table';
import { ArrowDown } from 'lucide-react';
import React from 'react';

export const TableHeader = ({
  title,
  column,
  isSorted,
}: {
  title: string;
  column: Column<any, unknown>;
  isSorted: string | Boolean;
}) => {
  return (
    <button
      className="flex items-center gap-2 text-gray-400 text-sm font-[500] lg:text-gray-700"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {title}
      {isSorted === 'asc' && <ArrowDown size={18} className={`h-3 w-3 `} />}
    </button>
  );
};
