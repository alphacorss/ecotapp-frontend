import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { Table } from '@tanstack/react-table';
import { Notification, Setting4 } from 'iconsax-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

import FilterBtn from './FilterBtn';
import NotificationComponent from './NotificationComponent';
import { TComboBoxSelector, TMessages } from '@/app/types';
import { Dialog } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export const DropdownMenuComponent = ({
  array,
  trigger,
  triggerClassName,
}: {
  array?: React.ReactNode[];
  trigger: React.ReactNode;
  triggerClassName?: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={cn(
          'border border-gray-300 ring-0 outline-0 p-[5px] rounded-[var(--rounded)] cursor-pointer bg-transparent',
          triggerClassName,
        )}
      >
        {trigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-sm font-[400] flex flex-col gap-2 p-2">
        {array && array.map((item, i) => <Dialog key={i}>{item}</Dialog>)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const NotificationDropDown = ({ notifications }: { notifications: TMessages[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="ring-0 outline-0 cursor-pointer bg-transparent px-3 py-3">
        <span>
          <Notification size={24} color="gray" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={15}
        className="text-sm font-[400] flex gap-2 px-5 justify-end w-fit h-fit bg-transparent border-none ring-0 shadow-none"
      >
        <Dialog>
          <div className="max-w-[400px] h-fit bg-white card">
            <NotificationComponent
              notifications={notifications}
              containerClass={notifications?.length > 0 ? 'h-fit max-h-[400px]' : ''}
            />
          </div>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const TableColumnVisibility = ({ table }: { table: any }) => {
  const allVisible = table.getIsAllColumnsVisible();
  const customLabels: any = {
    _id: 'Id',
    organization_name: 'Organization Name',
    address_country: 'Country',
    address_state: 'State',
    noOfFacilities: 'Number Of Facilities',
    user_firstName: 'First Name',
    user_lastName: 'Last Name',
    user_email: 'Email',
    user_phone: 'Phone',
    facility_name: 'Facility Name',
    'facility_organization.name': 'Organization Name',
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="outline-0 ring-0">
        <button
          className={`flex items-center gap-2 text-sm border border-[#C0C0C0] p-2 rounded-[var(--rounded)] font-[500] text-gray-600 ${
            allVisible ? '' : 'bg-gray-200'
          }`}
        >
          <Setting4 size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((column: any) => column.getCanHide() && column.id !== '_id' && column.id !== 'action')
          .map((column: any) => {
            const label = customLabels[column.id] || column.id;
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize right-0 border-none outline-none"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {label}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const SearchByDropDown = ({ array, table }: { table: Table<any>; array?: TComboBoxSelector[] }) => {
  const searchBy = useSearchParams().get('sb');
  const router = useRouter();
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-0 ring-0 h-full">
        <FilterBtn />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-xs font-[500] text-gray-500 p-2">Search By</DropdownMenuLabel>
        {array?.map((item: any, i: number) => {
          return (
            <DropdownMenuCheckboxItem
              key={i}
              className={`capitalize border-none outline-none cursor-pointer transition duration-150 ease-in-out hover:bg-gray-100 text-gray-600`}
              checked={searchBy === item.value}
              onClick={() => {
                table.reset();
                router.push(`${pathname}?vt=list&sb=${item.value}`);
              }}
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
