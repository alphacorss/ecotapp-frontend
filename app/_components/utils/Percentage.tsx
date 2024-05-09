import { ArrowDown, ArrowUp } from 'iconsax-react';

export const Percentage = ({ number }: { number: number }) => {
  return (
    <>
      {number > 0 ? (
        <span className="text-xs text-[#0B7041] border border-[#9EE1C2] bg-[#E7F8F0] rounded-[var(--rounded)] p-1 lg:p-2 font-[500] flex gap-1 items-center">
          {<ArrowUp size={18} className="font-[700]" />}
          {number}%
        </span>
      ) : (
        <span className="text-xs text-[#922922] border border-[#FEECEB] bg-[#FEECEB] rounded-[var(--rounded)] p-1 lg:p-2 font-[500] flex gap-1 items-center">
          <ArrowDown size={18} className="font-[700]" />
          {Math.round(number)}%
        </span>
      )}
    </>
  );
};
