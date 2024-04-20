'use client';
import React from 'react';

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
