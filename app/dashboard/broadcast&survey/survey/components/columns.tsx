'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Trash } from 'iconsax-react';
import { Eye, MoreVertical } from 'lucide-react';
import * as React from 'react';

import TableCell from '@/app/_components/table/TableCell';
import { TableHeader } from '@/app/_components/table/TableHeader';
import { DropdownMenuComponent } from '@/app/_components/utils/DropDowns';
import SurveyCtx from '@/app/_context/Survey';
import { TSurveyData } from '@/app/types';
import { cleanDate } from '@/lib/utils';

export const ColumnData = () => {
  const { handleShowSurveyDetailsModal, handleShowDeleteModal } = React.useContext(SurveyCtx);

  const columns: ColumnDef<TSurveyData>[] = [
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
      accessorKey: 'title',
      header: ({ column }) => {
        return <TableHeader title="Title" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        return <TableCell>{row.original.title}</TableCell>;
      },
    },
    {
      accessorKey: 'responseCounts',
      header: ({ column }) => {
        return <TableHeader title="No of Responses" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        return <TableCell>{row.original.responseCounts}</TableCell>;
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return <TableHeader title="Date created" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        const date = cleanDate(row.original.createdAt);
        return <TableCell>{date}</TableCell>;
      },
    },
    {
      id: 'action',
      cell: ({ row }) => {
        const id = row.original._id;
        return (
          <DropdownMenuComponent
            trigger={<MoreVertical size={25} />}
            array={[
              <button key={'manage'} className="more" onClick={() => handleShowSurveyDetailsModal(id)}>
                <Eye className="h-4 w-4" />
                View Details
              </button>,

              <button key={'delete'} className="more text-error-300" onClick={() => handleShowDeleteModal(id)}>
                <Trash className="h-4 w-4" />
                Delete
              </button>,
            ]}
          />
        );
      },
    },
  ];
  return columns;
};
