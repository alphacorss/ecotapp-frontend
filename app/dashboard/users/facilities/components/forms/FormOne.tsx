import { ArrowRight2 } from 'iconsax-react';
import React from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form';

import { TFacilityForm } from '../AddEditFacility';
import { InputComponent } from '@/app/_components/inputs/InputComponent';
import { ComboBoxFormComponent } from '@/app/_components/utils/ComboBoxes';
import FormInfo from '@/app/_components/utils/FormInfo';
import { buildingTypes, facilityFormFields } from '@/app/_constants/forms';
import useGetRoleList from '@/app/_hooks/useGetRoleList';
import { TComboBoxSelector, TFacilityTabs, TOrg } from '@/app/types';
import { Button } from '@/components/ui/button';

const FormOne = ({
  orgUser,
  errors,
  watch,
  trigger,
  register,
  setValue,
  setActiveTab,
  setValidTabs,
  handleCancel,
}: {
  orgUser: TOrg;
  trigger: UseFormTrigger<any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors<TFacilityForm>;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  setValidTabs: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setActiveTab: React.Dispatch<React.SetStateAction<TFacilityTabs>>;
  handleCancel: () => void;
}) => {
  const { allOrgs } = useGetRoleList();

  const availableOrgs: TComboBoxSelector[] = orgUser
    ? [
        {
          label: orgUser.name,
          value: orgUser._id,
        },
      ]
    : allOrgs;

  const triggerValidation = async () => {
    return await trigger([
      'organizationId',
      'siteId',
      'name',
      'grossFloorArea',
      'buildingType',
      'totalNumberOfUnits',
      'totalFloors',
      'alternativeEnergySource',
    ]);
  };

  const handleNext = async () => {
    const valid = await triggerValidation();
    if (!valid) return;

    setActiveTab('amenities');
    setValidTabs((prev) => ({ ...prev, form: true }));
  };

  return (
    <div>
      <FormInfo title="Facility Information" description="Enter the facility information" />
      <div className="mb-5">
        <ComboBoxFormComponent
          label={'Organization'}
          title="Organization"
          data={availableOrgs}
          setValue={setValue}
          watch={watch}
          defaultValue={orgUser?._id}
          selectorName={'organizationId'}
          register={register}
          disabled={!!orgUser}
          error={errors?.organizationId?.message}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {facilityFormFields.map((input) => {
          if (input.type === 'dropdown' && input.name === 'buildingType') {
            return (
              <ComboBoxFormComponent
                key={input.name}
                label={input.label}
                title={input.label}
                data={buildingTypes}
                setValue={setValue}
                watch={watch}
                selectorName={input.name}
                register={register}
                error={errors[input.name as keyof TFacilityForm]?.message}
              />
            );
          }
          return (
            <InputComponent
              key={input.name}
              id={input.name}
              name={input.name}
              label={input.label}
              placeholder={input.placeholder}
              error={errors[input.name as keyof TFacilityForm]?.message}
              register={register}
              type={input.type}
            />
          );
        })}
      </div>
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-5 mt-12">
        <Button type="button" className="w-full" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleNext} type="button" className="w-full flex gap-2">
          Next <ArrowRight2 size={18} />
        </Button>
      </div>
    </div>
  );
};

export default FormOne;
