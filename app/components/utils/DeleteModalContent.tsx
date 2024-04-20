import { X } from 'lucide-react';
import React from 'react';

import { TMutationHandler } from '@/app/types';
import { Button } from '@/components/ui/button';

const DeleteModalContent = ({
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
  const { mutate, isPending, isSuccess, isError, reset } = mutation;

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
          {isPending ? 'Deleting...' : isSuccess ? 'Deleted' : isError ? 'Something went wrong' : 'Delete'}
        </Button>
        <Button variant="destructiveOutline" className="btn btn-primary w-full" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteModalContent;
