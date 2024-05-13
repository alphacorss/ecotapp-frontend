import { ArrowRight2 } from 'iconsax-react';
import React from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch } from 'react-hook-form';

import { TFacilityForm } from '../AddEditFacility';
import { InputComponent } from '@/app/_components/inputs/InputComponent';
import { ComboBoxFormComponent } from '@/app/_components/utils/ComboBoxes';
import FormInfo from '@/app/_components/utils/FormInfo';
import { backupGenerators, facilityFormFields, numberOfMeters } from '@/app/_constants/forms';
import Queries from '@/app/_context/Queries';
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
  const orgs = React.useContext(Queries).orgs;
  const availableOrgs: TComboBoxSelector[] = orgUser
    ? [
        {
          label: orgUser.name,
          value: orgUser._id,
        },
      ]
    : orgs.data?.data.organization?.map((org: TOrg) => ({
        label: org.name,
        value: org._id,
      }));

  const triggerValidation = async () => {
    return await trigger([
      'organizationId',
      'siteId',
      'name',
      'area',
      'totalCommonAreas',
      'buidingFoundation',
      'totalNumberOfUnits',
      'backupgenerator',
      'totalNumberOfMeters',
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
        {facilityFormFields.map((input) => (
          <InputComponent
            key={input.name}
            id={input.name}
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            error={errors[input.name as keyof TFacilityForm]?.message}
            register={register}
          />
        ))}

        <ComboBoxFormComponent
          label={'Backup Generator'}
          title="Backup Generator"
          data={backupGenerators}
          setValue={setValue}
          watch={watch}
          selectorName={'backupgenerator'}
          register={register}
          error={errors?.backupgenerator?.message}
        />

        <ComboBoxFormComponent
          label={'Total Number of Meters'}
          title="Total Number of Meters"
          data={numberOfMeters}
          setValue={setValue}
          watch={watch}
          selectorName={'totalNumberOfMeters'}
          register={register}
          error={errors?.totalNumberOfMeters?.message}
        />
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
