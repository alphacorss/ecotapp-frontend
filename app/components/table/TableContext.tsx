import { Eye, Trash } from 'iconsax-react';
import { MoreVertical } from 'lucide-react';
import React from 'react';

import { DropdownMenuComponent } from '../utils/DropDowns';

const TableContext = ({
  showDetailsModal,
  showDeleteModal,
  type,
  extraBtns,
}: {
  showDetailsModal: () => void;
  showDeleteModal: () => void;
  type?: 'user' | 'organization';
  extraBtns?: React.ReactNode[];
}) => {
  return (
    <DropdownMenuComponent
      trigger={<MoreVertical size={25} />}
      array={[
        ...(type === 'organization' ? [extraBtns] : []),
        <button key={'manage'} className="more" onClick={showDetailsModal}>
          <Eye className="h-4 w-4" />
          View Details
        </button>,

        <button key={'delete'} className="more text-error-300" onClick={showDeleteModal}>
          <Trash className="h-4 w-4" />
          Delete
        </button>,
      ]}
    />
  );
};

export default TableContext;
