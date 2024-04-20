import React, { memo } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import GoBack from '../Back';
import AddEditAddress, { TAddressForm } from '@/app/components/forms/AddEditAddress';
import FormInfo from '@/app/components/utils/FormInfo';
import { TFacilityTabs } from '@/app/types';

const FormFour = ({
  watch,
  errors,
  register,
  setValue,
  setActiveTab,
  setValidTabs,
}: {
  watch: UseFormWatch<any>;
  errors: FieldErrors<TAddressForm>;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  setValidTabs: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setActiveTab: React.Dispatch<React.SetStateAction<TFacilityTabs>>;
}) => {
  return (
    <div>
      <GoBack tab="certifications" setActiveTab={setActiveTab} setValidTabs={setValidTabs} />
      <FormInfo title="Address Information" description="Provide the Address of the facility" />

      <AddEditAddress errors={errors} watch={watch} register={register} setValue={setValue} />
    </div>
  );
};

export default memo(FormFour);
