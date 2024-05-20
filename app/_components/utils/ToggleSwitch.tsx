import React from 'react';

import { cn } from '@/lib/utils';

const ToggleSwitch = ({
  arrayOptions,
  option,
  onClick,
  showView,
  itemClass,
  setActiveToggle,
}: {
  arrayOptions: {
    name: string;
    label: string;
    icon: () => React.JSX.Element | null;
  }[];
  option: string | null;
  onClick?: () => void;
  showView?: boolean;
  itemClass?: string;
  setActiveToggle?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <ul
      className={`grid ${`grid-cols-${arrayOptions.length}`} text-center bg-gray-200 md:place-content-center p-1 rounded-[7px] min-w-fit`}
    >
      {arrayOptions.map((toggle) => (
        <li
          key={toggle.name}
          onClick={() => (setActiveToggle ? setActiveToggle(toggle.name) : onClick && onClick())}
          className={cn(
            ` ${
              option === toggle.name ? 'text-gray-900 bg-white rounded-[5px] font-[600]' : 'text-gray-500'
            } p-2 px-3 cursor-pointer transition font-[500] flex gap-1 items-center justify-center text-sm tracking-tight whitespace-nowrap`,
            itemClass,
          )}
        >
          {toggle.icon()} {toggle.label} {showView && 'View'}
        </li>
      ))}
    </ul>
  );
};

export default ToggleSwitch;
