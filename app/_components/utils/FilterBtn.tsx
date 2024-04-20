import { Filter } from 'iconsax-react';
import React from 'react';

const FilterBtn = () => {
  return (
    <span
      className="flex gap-1 items-center border border-gray-300 px-2 rounded-md cursor-pointer transition duration-150 ease-in-out hover:bg-gray-100 text-gray-500 h-full"
      onClick={() => {}}
    >
      <Filter size="20" /> Filter
    </span>
  );
};

export default FilterBtn;
