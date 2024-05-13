'use client';
import { Check, X } from 'lucide-react';
import React from 'react';

import Loader from './Loader';
import { TMutationHandler } from '@/app/types';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export function ModalComponent({
  open,
  setOpen,
  content,
  trigger,
  contentClass,
}: {
  open?: boolean;
  contentClass?: string;
  trigger?: React.ReactNode;
  content: React.ReactNode;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={contentClass}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        {content}
      </DialogContent>
    </Dialog>
  );
}

export const SuccessModalContent = ({
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

export const DeleteModalContent = ({
  id,
  title,
  message,
  mutation,
  onCancel,
}: {
  id: string;
  title: string;
  message: string;
  mutation: TMutationHandler;
  onCancel: () => void;
}) => {
  const { mutate, isPending, isSuccess, isError, error, reset } = mutation;

  const handleDelete = () => {
    mutate(id);
  };

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isSuccess) {
      timeout = setTimeout(() => {
        onCancel();
        reset();
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [isSuccess, onCancel, reset]);

  return (
    <div className="flex flex-col justify-center items-center w-full gap-3 p-5">
      <span className="bg-error-300 p-2 rounded-full grid place-content-center">
        <X className="h-5 w-5 text-white" strokeWidth={4} />
      </span>
      <h1 className="text-2xl font-semibold text-center">{title}</h1>
      <p className="text-xs font-[500] text-gray-500 -mt-2 mb-3 text-center">{message}</p>
      <div className="flex justify-center items-cente gap-4 w-full">
        <Button variant="destructive" className={`btn btn-secondary w-full`} onClick={handleDelete}>
          {isPending ? <Loader /> : isSuccess ? 'Deleted' : 'Delete'}
        </Button>
        <Button variant="destructiveOutline" className="btn btn-primary w-full" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      {isError && (
        <p className="text-xs font-[500] text-red-500  text-center">{(error as any).response?.data?.message}</p>
      )}
    </div>
  );
};
