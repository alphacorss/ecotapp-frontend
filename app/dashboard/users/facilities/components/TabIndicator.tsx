import React from 'react';

const TabIndicator = ({ activeTab, validTabs }: { activeTab: string; validTabs: Record<string, boolean> }) => {
  const formTab = `h-[7px] rounded-full ${activeTab === 'form' || validTabs.form ? 'bg-primary-100' : 'bg-gray-300 '}`;
  const amenitiesTab = `h-[7px] rounded-full ${
    activeTab === 'amenities' || validTabs.amenities ? 'bg-primary-100' : 'bg-gray-300 '
  }`;
  const certificationsTab = `h-[7px] rounded-full ${
    activeTab === 'certifications' || validTabs.certifications ? 'bg-primary-100' : 'bg-gray-300 '
  }`;
  const addressTab = `h-[7px] rounded-full ${
    activeTab === 'address' || validTabs.address ? 'bg-primary-100' : 'bg-gray-300 '
  }`;
  return (
    <div className="grid grid-cols-4 w-full gap-3 transition mb-10">
      <span className={formTab}></span>
      <span className={amenitiesTab}></span>
      <span className={certificationsTab}></span>
      <span className={addressTab}></span>
    </div>
  );
};

export default TabIndicator;
