import { ArrowRight2 } from 'iconsax-react';
import React from 'react';

import GoBack from '../Back';
import FormInfo from '@/app/_components/utils/FormInfo';
import { certifications } from '@/app/_constants/forms';
import { TFacilityTabs } from '@/app/types';
import { Button } from '@/components/ui/button';

const FormThree = ({
  setValidTabs,
  setActiveTab,
  selectedCertifications,
  setSelectedCertification,
  handleCancel,
}: {
  setValidTabs: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  selectedCertifications: string[];
  setSelectedCertification: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveTab: React.Dispatch<React.SetStateAction<TFacilityTabs>>;
  handleCancel: () => void;
}) => {
  const [fromTwoError, setFromTwoError] = React.useState(false);

  const submitFormThree = () => {
    if (selectedCertifications.length === 0) {
      setFromTwoError(true);
      return;
    }
    setActiveTab('address');
    setValidTabs((prev) => ({ ...prev, certifications: true }));
  };

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (fromTwoError) {
      timeout = setTimeout(() => {
        setFromTwoError(false);
      }, 3000);
    }

    return () => clearTimeout(timeout);
  }, [fromTwoError]);

  return (
    <div>
      <GoBack tab="amenities" setActiveTab={setActiveTab} setValidTabs={setValidTabs} />
      <FormInfo
        title="Select Amenities for the Facility"
        description="Select the boxes corresponding to the amenities available in the facility"
      />
      <div className="flex justify-start items-center flex-wrap gap-4 cursor-pointer">
        {certifications.map((certification) => (
          <span
            key={certification}
            onClick={() => {
              if (selectedCertifications.includes(certification)) {
                setSelectedCertification(selectedCertifications.filter((item) => item !== certification));
              } else {
                setSelectedCertification([...selectedCertifications, certification]);
              }
            }}
            className={`border border-gray-300 text-sm font-[500] text-gray-500 p-2 rounded-[var(--rounded)] ${
              selectedCertifications.includes(certification)
                ? 'bg-primary-300 text-white border-primary-300'
                : 'bg-white'
            }`}
          >
            {certification}
          </span>
        ))}
      </div>
      {fromTwoError && (
        <p className={`error-input mt-5 ${fromTwoError ? 'animate-fade-in opacity-1' : 'animate-fade-out opacity-0'}`}>
          Please select at least one certification
        </p>
      )}
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-5 mt-12">
        <Button onClick={handleCancel} type="button" className="w-full" variant="outline">
          Cancel
        </Button>
        <Button type="submit" className="w-full flex gap-2" onClick={submitFormThree}>
          Next <ArrowRight2 size={18} />
        </Button>
      </div>
    </div>
  );
};

export default FormThree;
