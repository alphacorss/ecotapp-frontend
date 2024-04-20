import { Check } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

const SuccessModalContent = ({
  title,
  message,
  onConfirm,
  actionBtnText,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  actionBtnText?: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-3 px-3 py-5 text-center">
      <span className="bg-[#12B76A] p-2 rounded-full grid place-content-center">
        <Check className="h-5 w-5 text-white" strokeWidth={4} />
      </span>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-xs font-[500] text-gray-500 -mt-2 mb-5 text-center">{message}</p>
      <div className="flex justify-center items-cente gap-4 w-full">
        <Button className="btn btn-secondary w-full" onClick={onConfirm}>
          {actionBtnText || 'Ok'}
        </Button>
      </div>
    </div>
  );
};

export default SuccessModalContent;
