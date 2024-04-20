import React from 'react';

const SectionHeader = ({ title, description }: { title: string; description: string }) => {
  return (
    <div>
      <h3 className="text-xl font-[600] text-gray-600 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 font-[400]">{description}</p>
    </div>
  );
};

export default SectionHeader;
