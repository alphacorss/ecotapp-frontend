'use client';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

import { TableHeader } from './TableHeader';
import { TUser } from '../../types';
import TableCell from '@/app/_components/tables/TableCell';
import TableContext from '@/app/_components/tables/TableContext';

export const UserColumnData = (showDeleteModal: (id: string) => void, showDetailsModal: (id: string) => void) => {
  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: '_id',
      header: ({ column }) => {
        return <TableHeader title="Index" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        const index = row.index;
        return <TableCell>{(index + 1).toString()}</TableCell>;
      },
    },
    {
      accessorKey: 'user.firstName',
      header: ({ column }) => {
        return <TableHeader title="First Name" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        if (row.original.user) {
          return <TableCell>{row.original.user.firstName}</TableCell>;
        } else {
          return <TableCell>User not available</TableCell>;
        }
      },
    },
    {
      accessorKey: 'user.lastName',
      header: ({ column }) => {
        return <TableHeader title="Last Name" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        if (row.original.user) {
          return <TableCell>{row.original.user.lastName}</TableCell>;
        } else {
          return <TableCell>User not available</TableCell>;
        }
      },
    },
    {
      accessorKey: 'user.email',
      header: ({ column }) => {
        return <TableHeader title="Email" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        if (row.original.user) {
          return (
            <p className="text-gray-500 font-[500] whitespace-nowrap lowercase order-1">{row.original.user.email}</p>
          );
        } else {
          return <TableCell>User not available</TableCell>;
        }
      },
    },
    {
      accessorKey: 'user.phone',
      header: ({ column }) => {
        return <TableHeader title="Phone" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        if (row.original.user) {
          return (
            <TableCell>
              <p>{row.original.user.phone}</p>
            </TableCell>
          );
        } else {
          return <TableCell>User not available</TableCell>;
        }
      },
    },
    {
      id: 'action',
      header: ({ column }) => {
        return <TableHeader title="" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        const id = row.original._id;
        return (
          <TableContext showDetailsModal={() => showDetailsModal(id)} showDeleteModal={() => showDeleteModal(id)} />
        );
      },
    },
  ];
  return columns;
};
