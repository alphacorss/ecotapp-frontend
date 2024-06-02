import { X } from 'lucide-react';

import { TComboBoxSelector } from '@/app/types';
import { Button } from '@/components/ui/button';

export const SelectedOptionButton = ({
  arry,
  label,
  value,
  onClick,
}: {
  arry: TComboBoxSelector[];
  label: string;
  value: string | null | undefined;
  onClick: () => void;
}) => {
  return (
    <>
      {value && (
        <Button type="button" variant="outline" className="flex gap-3" onClick={onClick}>
          {arry.find((item) => item.value === value)?.label}
          <span className="border-2 grid place-content-center p-[1px] rounded-full border-primary-300">
            <X size={10} strokeWidth={4} />
          </span>
        </Button>
      )}
    </>
  );
};

export const TierSelectedOptionButton = ({
  sendTo,
  option,
  selectedValues,
  setSelectedValues,
}: {
  sendTo: string | null | undefined;
  option: string | null | undefined;
  selectedValues: TComboBoxSelector[];
  setSelectedValues: (values: TComboBoxSelector[]) => void;
}) => {
  return (
    <>
      {sendTo && option && selectedValues.length > 0 && (
        <Button type="button" variant="outline" className="flex gap-3" onClick={() => setSelectedValues([])}>
          <span className="flex-nowrap flex whitespace-nowrap gap-3 items-center">
            {selectedValues
              .slice(0, 1)
              .map((item) => item.label)
              .join(',')}
            {selectedValues.length > 1 && (
              <p className="bg-[#E7EEFB] p-1 px-2 rounded-full">{selectedValues.length - 1} others</p>
            )}
          </span>

          <span className="border-2 grid place-content-center p-[1px] rounded-full border-primary-300">
            <X size={10} strokeWidth={4} />
          </span>
        </Button>
      )}
    </>
  );
};
