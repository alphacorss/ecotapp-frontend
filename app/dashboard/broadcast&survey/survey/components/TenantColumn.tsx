'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Messages, Trash } from 'iconsax-react';
import { MoreVertical } from 'lucide-react';
import * as React from 'react';

import TableCell from '@/app/_components/table/TableCell';
import { TableHeader } from '@/app/_components/table/TableHeader';
import { DropdownMenuComponent } from '@/app/_components/utils/DropDowns';
import SurveyCtx from '@/app/_context/Survey';
import { TRole, TSurveyData } from '@/app/types';
import { cleanDate, cleanRoleSingular, hasUserResponded } from '@/lib/utils';

export const TenantColumn = () => {
  const { showResponse, handleShowDeleteModal } = React.useContext(SurveyCtx);

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
        const filledBy = row.original.filledBy;
        const userFilled = hasUserResponded(filledBy);
        return (
          <TableCell className="flex items-center gap-3">
            {row.original.title}
            {!userFilled && <span className="p-1 px-2 bg-[#E7F8F0] text-[#0B7041] rounded-[var(--rounded)]">New</span>}
          </TableCell>
        );
      },
    },
    {
      accessorKey: 'from',
      header: ({ column }) => {
        return <TableHeader title="Sent by" column={column} isSorted={column.getIsSorted()} />;
      },
      cell: ({ row }) => {
        const from = `${cleanRoleSingular(row.original.from.role[0] as TRole)}`;
        return <TableCell>{from}</TableCell>;
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => {
        return <TableHeader title="Date Received" column={column} isSorted={column.getIsSorted()} />;
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
              <button key={'manage'} className="more" onClick={() => showResponse(row.original)}>
                <Messages className="h-4 w-4" />
                Respond
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
