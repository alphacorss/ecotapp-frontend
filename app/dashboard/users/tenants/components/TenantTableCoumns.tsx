'use client';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

import TableCell from '@/app/components/table/TableCell';
import TableContext from '@/app/components/table/TableContext';
import { TableHeader } from '@/app/components/table/TableHeader';
import { TUserExtended } from '@/app/types';

export const TenantTableCoumns = (showDeleteModal: (id: string) => void, showDetailsModal: (id: string) => void) => {
  const columns: ColumnDef<TUserExtended>[] = [
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
        if (row.original.user.firstName) {
          return <TableCell>{row.original.user.firstName}</TableCell>;
        } else {
          return <TableCell>-</TableCell>;
        }
      },
    },
    {
      accessorKey: 'user.lastName',
      header: ({ column }) => {
        return <TableHeader title="Last Name" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        if (row.original.user.lastName) {
          return <TableCell>{row.original.user.lastName}</TableCell>;
        } else {
          return <TableCell>-</TableCell>;
        }
      },
    },
    {
      accessorKey: 'facility.name',
      header: ({ column }) => {
        return <TableHeader title="Facility Name" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        if (row.original?.facility?.name) {
          return <TableCell>{row.original.facility.name}</TableCell>;
        } else {
          return <TableCell>-</TableCell>;
        }
      },
    },
    {
      accessorKey: 'facility.organization.name',
      header: ({ column }) => {
        return <TableHeader title="Organization Name" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        if (row.original?.facility?.organization?.name) {
          return (
            <TableCell>
              <p>{row.original.facility.organization.name}</p>
            </TableCell>
          );
        } else {
          return <TableCell>-</TableCell>;
        }
      },
    },
    {
      id: 'action',
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
