import React from 'react';

const ViewModalInfo = ({ title, info, lowercase }: { title: string; info: string; lowercase?: boolean }) => {
  return (
    <div className="flex flex-col">
      <p className="text-gray-400 text-xs font-[500] mb-1 capitalize">{title}</p>
      <p className={`text-gray-600 tracking-tight text-sm font-[600] ${lowercase ? 'lowercase' : 'capitalize'}`}>
        {info}
      </p>
    </div>
  );
};

export default ViewModalInfo;
