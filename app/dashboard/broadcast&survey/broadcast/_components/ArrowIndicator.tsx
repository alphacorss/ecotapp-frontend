import { ArrowRight } from 'iconsax-react';

export const ArrowIndicator = ({
  sendTo,
  option,
}: {
  sendTo: string | null | undefined;
  option: string | null | undefined;
}) => {
  return <>{sendTo && option && <ArrowRight className="text-gray-400" />}</>;
};
