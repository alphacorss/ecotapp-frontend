'use client';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';

import { PageFilterAndType } from './PageFilterAndType';
import PaginationComponent from './Pagination';
import Main from '@/app/_context/Main';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showMultiView: boolean;
}

function DataTable<TData, TValue>({ data, columns, showMultiView }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const { isMobile } = React.useContext(Main);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      globalFilter,
      columnFilters,
      columnVisibility,
    },
  });

  const headerData = table.getHeaderGroups().flatMap((headerGroup) =>
    headerGroup.headers.map((header) => ({
      id: header.id,
      item: flexRender(header.column.columnDef.header, header.getContext()),
    })),
  );

  return (
    <>
      {isMobile ? (
        <div className="">
          <PageFilterAndType
            table={table}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            showMultiView={showMultiView}
          />
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => {
              const rowData = row.getVisibleCells().reduce((acc: any, cell) => {
                acc[cell.column.id] = flexRender(cell.column.columnDef.cell, cell.getContext());
                return acc;
              }, {});

              return (
                <div key={i} className="border rounded-[var(--rounded)] p-4 mb-4 flex flex-col w-full break-all">
                  {headerData.map((header, index) => {
                    if (header.id === '_id') return null;

                    const isAction = header.id === 'action';
                    return (
                      <div
                        key={index}
                        className={`flex flex-col items-start justify-center mb-5 "font-[500] ${isAction ? '-order-1' : ''}`}
                      >
                        <div className="flex gap-1 text-gray-400 text-sm font-[500]">
                          {header.item} {isAction ? '' : ':'}
                        </div>
                        <div>{rowData[header.id]}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <div className="h-24 text-center">No results.</div>
          )}
          <PaginationComponent table={table} />
        </div>
      ) : (
        <>
          <PageFilterAndType
            table={table}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            showMultiView={showMultiView}
          />
          <Table className="mb-10">
            <TableHeader className="bg-[#EBEBEB]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={`pl-6 whitespace-nowrap ${header.id === 'action' ? 'w-[1px]' : ''}`}
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id} className={`${cell.column.id === 'action' ? 'pr-6' : 'pl-6'}`}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <PaginationComponent table={table} />
        </>
      )}
    </>
  );
}

export default DataTable;
