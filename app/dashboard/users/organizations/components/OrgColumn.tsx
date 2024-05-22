'use client';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

import TableCell from '@/app/_components/tables/TableCell';
import TableContext from '@/app/_components/tables/TableContext';
import { TableHeader } from '@/app/_components/tables/TableHeader';
import { TOrg } from '@/app/types';

export const OrgColumnData = (showDeleteModal: (id: string) => void, showDetailsModal: (id: string) => void) => {
  const columns: ColumnDef<TOrg>[] = [
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
      accessorKey: 'name',
      header: ({ column }) => {
        return <TableHeader title="Organization Name" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        if (row.original.name) {
          return <TableCell>{row.original.name}</TableCell>;
        } else {
          return <TableCell>-</TableCell>;
        }
      },
    },
    {
      accessorKey: 'city',
      header: ({ column }) => {
        return <TableHeader title="City" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        if (row.original.city) {
          return <TableCell>{row.original.city}</TableCell>;
        } else {
          return <TableCell>-</TableCell>;
        }
      },
    },
    {
      accessorKey: 'province',
      header: ({ column }) => {
        return <TableHeader title="Province" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        if (row.original.province) {
          return <TableCell>{row.original.province}</TableCell>;
        } else {
          return <TableCell>-</TableCell>;
        }
      },
    },
    {
      accessorKey: 'country',
      header: ({ column }) => {
        return <TableHeader title="Country" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        if (row.original.country) {
          return (
            <TableCell>
              <p>{row.original.country}</p>
            </TableCell>
          );
        } else {
          return <TableCell>0</TableCell>;
        }
      },
    },
    {
      id: 'action',
      cell: ({ row }) => {
        const id = row.original._id;
        return (
          <TableContext
            type="organization"
            showDetailsModal={() => showDetailsModal(id)}
            showDeleteModal={() => showDeleteModal(id)}
          />
        );
      },
    },
  ];
  return columns;
};
