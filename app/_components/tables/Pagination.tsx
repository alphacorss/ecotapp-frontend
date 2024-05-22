import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import React from 'react';

import { SelectComponent } from '../utils/SelectComponent';
import { Button } from '@/components/ui/button';

const PaginationComponent = ({ table }: { table: any }) => {
  const [totalPages, setTotalPages] = React.useState(1);

  React.useEffect(() => {
    setTotalPages(table.getPageCount());
  }, [table]);

  function pageNumbers(totalPages: number, currentPage: number) {
    var shownPages = 3;
    var result = [];
    if (totalPages > 5) {
      if (totalPages <= shownPages) {
        for (let i = 1; i <= totalPages; i++) {
          result.push(i);
        }
        return result;
      }
      if (currentPage === 1) {
        result.push(1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages);
      } else if (currentPage === totalPages - 3) {
        result.push(currentPage - 1, currentPage, '...', totalPages - 2, totalPages - 1, totalPages);
      } else if (currentPage > totalPages - shownPages) {
        result.push(
          totalPages - totalPages + 1,
          totalPages - totalPages + 2,
          '...',
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        result.push(currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 2, totalPages - 1, totalPages);
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        result.push(i);
      }
    }
    return result;
  }

  const availiablePages = pageNumbers(totalPages, table.getState().pagination.pageIndex + 1);

  return (
    <div className="flex md:items-center items-start justify-between space-x-2 py-4 md:flex-row flex-col gap-3 md:gap-0 border-t-[1px] border-gray-200">
      <div>
        <div className="text-sm tracking-tight text-gray-500 font-[500] flex gap-2 items-center">
          <p className="text-sm tracking-tight text-gray-500 font-[500]">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {availiablePages.map((page: any, index) => {
          return (
            <Button
              key={index}
              className={`p-3 h-[30px] rounded-[var(--rounded)] font-[500] hover:text-white ${
                table.getState().pagination.pageIndex === page - 1
                  ? 'bg-primary-300/80 text-white'
                  : 'bg-white text-gray-500'
              }`}
              onClick={() => {
                table.setPageIndex(page - 1);
              }}
            >
              {page}
            </Button>
          );
        })}

        <Button
          size="sm"
          className="p-2 h-auto flex items-center gap-2 border-gray-600 text-gray-600"
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeft2 className="h-4 w-4" /> Previous
        </Button>

        <Button
          size="sm"
          className="p-2 h-auto flex items-center gap-2 border-gray-600 text-gray-600"
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next <ArrowRight2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm whitespace-nowrap font-[500] text-gray-600">Go to page</p>
        <SelectComponent
          title="Page"
          className="h-20"
          size="small"
          array={Array.from({ length: totalPages }, (_, i) => ({
            value: JSON.stringify(i + 1),
            name: `${i + 1}`,
          }))}
          placeholder="0"
          handleSelect={(value) => table.setPageIndex(Number(value) - 1)}
        />
      </div>
    </div>
  );
};

export default PaginationComponent;
