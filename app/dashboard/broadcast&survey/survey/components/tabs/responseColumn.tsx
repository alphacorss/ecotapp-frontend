'use client';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

import TableCell from '@/app/components/table/TableCell';
import { TableHeader } from '@/app/components/table/TableHeader';
import { TResponseTable } from '@/app/types';

export const ResponseTabColumns = () => {
  const columns: ColumnDef<TResponseTable>[] = [
    {
      accessorKey: 'questionId',
      header: ({ column }) => {
        return <TableHeader title="Id" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        const index = row.index;
        return <TableCell>{(index + 1).toString()}</TableCell>;
      },
    },
    {
      accessorKey: 'questionText',
      header: ({ column }) => {
        return <TableHeader title="Question" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        return <TableCell>{row.original.question}</TableCell>;
      },
    },
    {
      accessorKey: 'emailAddress',
      header: ({ column }) => {
        return <TableHeader title="Email Address" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        return <TableCell>{row.original.emailAddress}</TableCell>;
      },
    },
    {
      accessorKey: 'answer',
      header: ({ column }) => {
        return <TableHeader title="Response" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        return <TableCell>{row.original.answer}</TableCell>;
      },
    },
  ];
  return columns;
};
