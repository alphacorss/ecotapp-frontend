import { ArrowRight2 } from 'iconsax-react';
import React from 'react';

import GoBack from '../Back';
import FormInfo from '@/app/components/utils/FormInfo';
import { amenities } from '@/app/constants/forms';
import { TFacilityTabs } from '@/app/types';
import { Button } from '@/components/ui/button';

const FormTwo = ({
  setValidTabs,
  setActiveTab,
  selectedAmenities,
  setSelectedAmenities,
  handleCancel,
}: {
  setValidTabs: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  selectedAmenities: string[];
  setSelectedAmenities: React.Dispatch<React.SetStateAction<string[]>>;
  setActiveTab: React.Dispatch<React.SetStateAction<TFacilityTabs>>;
  handleCancel: () => void;
}) => {
  const [fromTwoError, setFromTwoError] = React.useState(false);

  const submitFormTwo = () => {
    if (selectedAmenities.length === 0) {
      setFromTwoError(true);
      return;
    }
    setActiveTab('certifications');
    setValidTabs((prev) => ({ ...prev, amenities: true }));
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
      <GoBack tab="form" setActiveTab={setActiveTab} setValidTabs={setValidTabs} />
      <FormInfo
        title="Select Amenities for the Facility"
        description="Select the boxes corresponding to the amenities available in the facility"
      />
      <div className="flex justify-start items-center flex-wrap gap-4 cursor-pointer">
        {amenities.map((amenity) => (
          <span
            key={amenity}
            onClick={() => {
              if (selectedAmenities.includes(amenity)) {
                setSelectedAmenities(selectedAmenities.filter((item) => item !== amenity));
              } else {
                setSelectedAmenities([...selectedAmenities, amenity]);
              }
            }}
            className={`border text-sm font-[500] text-gray-500 border-gray-300 p-2 rounded-[var(--rounded)] ${
              selectedAmenities.includes(amenity) ? 'bg-primary-300 text-white border-primary-300' : 'bg-white'
            }`}
          >
            {amenity}
          </span>
        ))}
      </div>
      {fromTwoError && (
        <p className={`error-input mt-5 ${fromTwoError ? 'animate-fade-in opacity-1' : 'animate-fade-out opacity-0'}`}>
          Please select at least one amenity
        </p>
      )}
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-5 mt-12">
        <Button onClick={handleCancel} type="button" className="w-full" variant="outline">
          Cancel
        </Button>
        <Button type="submit" className="w-full flex gap-2" onClick={submitFormTwo}>
          Next <ArrowRight2 size={18} />
        </Button>
      </div>
    </div>
  );
};

export default FormTwo;
