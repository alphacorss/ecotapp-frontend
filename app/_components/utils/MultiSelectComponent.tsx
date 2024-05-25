import React from 'react';
import { MultiSelect } from 'react-multi-select-component';

import ErrorMessage from './ErrorMessage';
import { TComboBoxSelector } from '@/app/types';

export const MultiSelectComponent = ({
  options,
  selected,
  setSelected,
  error,
}: {
  error?: string | null;
  options: TComboBoxSelector[];
  selected: TComboBoxSelector[];
  setSelected: React.Dispatch<React.SetStateAction<TComboBoxSelector[]>>;
}) => {
  return (
    <div className="flex flex-col">
      <label className="input-label font-[600] text-sm font-poppins text-gray-600">Send to</label>
      <MultiSelect value={selected} options={options} labelledBy="Select" onChange={setSelected} />
      <ErrorMessage error={error} />
    </div>
  );
};
