import Image from 'next/image';
import React from 'react';

export const FacilityHomeCard = ({ title, info }: { title: string; info: string }) => {
  return (
    <div className="card p-6">
      <Image src="/home.svg" alt="Energy" width={40} height={40} className="mb-4 border rounded-sm p-2" />
      <div className="flex flex-col">
        <p className="text-xs lg:text-sm font-[400] text-gray-400">{title}</p>
        <p className="lg:text-3xl font-[600] text-gray-700">{info}</p>
      </div>
    </div>
  );
};
