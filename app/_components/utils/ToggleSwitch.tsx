import React from 'react';

const ToggleSwitch = ({
  arrayOptions,
  option,
  onClick,
  showView,
}: {
  arrayOptions: {
    name: string;
    label: string;
    icon: () => React.JSX.Element;
  }[];
  option: string | null;
  onClick: () => void;
  showView?: boolean;
}) => {
  return (
    <ul className="grid grid-cols-2 text-center bg-gray-200 md:place-content-center p-1 rounded-[5px] min-w-fit">
      {arrayOptions.map((toggle) => (
        <li
          key={toggle.name}
          onClick={() => onClick()}
          className={`${
            option === toggle.name ? 'text-gray-900 bg-white rounded-[4px] font-[600]' : 'text-gray-500'
          } p-2 px-3 cursor-pointer transition font-[500] flex gap-1 items-center text-sm tracking-tight whitespace-nowrap`}
        >
          {toggle.icon()} {toggle.label} {showView && 'View'}
        </li>
      ))}
    </ul>
  );
};

export default ToggleSwitch;
