import React from 'react';

const FormInfo = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="py-4 mb-5">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-xs text-gray-500 font-[500] tracking-wide">{description}</p>
    </div>
  );
};

export default FormInfo;
