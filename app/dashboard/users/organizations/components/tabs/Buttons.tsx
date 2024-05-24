import { Diagram, Edit2, Trash } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Modals } from '@/app/_slices/ModalSlice';
import { Button } from '@/components/ui/button';

export const Btns = ({
  orgId,
  facilityId,
  type,
  showDeleteModal,
  showEditModal,
  closeModalFn,
  modalToClose,
}: {
  orgId?: string;
  facilityId?: string;
  type: string;
  showDeleteModal: (id: string) => void;
  showEditModal: (id: string) => void;
  closeModalFn: (modal: Modals) => void;
  modalToClose: Modals;
}) => {
  const router = useRouter();
  const id = type === 'org' ? orgId : facilityId;
  return (
    <div className="w-full gap-5 flex pb-5 flex-col lg:flex-row">
      <Button className="flex gap-3 w-full" variant="outline" onClick={() => showEditModal(id as string)}>
        <Edit2 className="w-4 h-4" /> Edit {type === 'org' ? 'Organization' : 'Facility'}
      </Button>
      <Button
        className="flex gap-3 w-full"
        variant="outline"
        onClick={() => {
          closeModalFn(modalToClose);
          router.push(
            `/dashboard/analytics/energy-consumption?vt=analytics&filter=true&from=03-12-24&to=03-28-24&energy_type=electricity&${
              type === 'org' && `orgId=${id}`
            }&${type === 'facility' && `facilityId=${facilityId}&orgId=${orgId}`}`,
          );
        }}
      >
        <Diagram className="w-4 h-4" />
        View Analytics
      </Button>
      <Button className="flex gap-3 w-full" variant="destructiveOutline" onClick={() => showDeleteModal(id as string)}>
        <Trash className="w-4 h-4" /> Delete {type === 'org' ? 'Organization' : 'Facility'}
      </Button>
    </div>
  );
};
