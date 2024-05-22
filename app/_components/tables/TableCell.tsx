import React from 'react';

import { cn } from '@/lib/utils';

const TableCell = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span
      className={cn(
        'text-gray-600 lg:text-gray-500 font-[500] capitalize line-clamp-2 hover:line-clamp-none',
        className,
      )}
    >
      {children}
    </span>
  );
};

export default TableCell;
