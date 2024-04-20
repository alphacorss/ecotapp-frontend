'use client';
import { ColumnDef } from '@tanstack/react-table';
import * as React from 'react';

import TableCell from '@/app/_components/table/TableCell';
import TableContext from '@/app/_components/table/TableContext';
import { TableHeader } from '@/app/_components/table/TableHeader';
import { TFacility } from '@/app/types';

export const FacilityColumn = (
  // eslint-disable-next-line no-unused-vars
  showDeleteModal: (id: string) => void,
  // eslint-disable-next-line no-unused-vars
  showDetailsModal: (id: string) => void,
) => {
  const columns: ColumnDef<TFacility>[] = [
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
        return <TableHeader title="Facility Name" column={column} isSorted={column.getIsSorted()} />;
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
      accessorKey: 'organization.name',
      header: ({ column }) => {
        return <TableHeader title="Organization Name" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        if (row.original.organization) {
          return <TableCell>{row.original.organization?.name}</TableCell>;
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
