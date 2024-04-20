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
      <label className="input-label">Send to</label>
      <MultiSelect options={options} value={selected} onChange={setSelected} labelledBy="Select" />
      <ErrorMessage error={error} />
    </div>
  );
};
