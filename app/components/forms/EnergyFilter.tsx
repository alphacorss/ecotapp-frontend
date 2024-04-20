import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { DateRange } from 'react-day-picker';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ComboBoxFormComponent } from '@/app/components/utils/ComboBoxes';
import { DatePickerWithRange } from '@/app/components/utils/DateRange';
import Queries from '@/app/context/Queries';
import useClearError from '@/app/hooks/useClearError';
import { TFacility, TOrg, TUserExtended } from '@/app/types';
import { Button } from '@/components/ui/button';
import { convertDate, zodInputValidators } from '@/lib/utils';

const energyType = zodInputValidators.dropDown;
const organization = zodInputValidators.optionalDropDown;
const facility = zodInputValidators.optionalDropDown;
const tenant = zodInputValidators.optionalDropDown;

const schema = z.object({
  energyType,
  organization,
  facility,
  tenant,
});

type EnergyFilterProps = z.infer<typeof schema>;

const EnergyFilter = ({
  dateError,
  setDateError,
  date,
  setDate,
  setShowFilterModal,
}: {
  dateError: string | undefined;
  setDateError: React.Dispatch<React.SetStateAction<string | undefined>>;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const currentPath = usePathname();
  const energyType = useSearchParams().get('energyType');
  const orgId = useSearchParams().get('orgId');
  const facilityId = useSearchParams().get('facilityId');
  const tenantId = useSearchParams().get('tenantId');
  const viewType = useSearchParams().get('vt');

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<EnergyFilterProps>({
    defaultValues: {
      energyType: energyType || '',
      organization: orgId || '',
      facility: facilityId || '',
      tenant: tenantId || '',
    },
    resolver: zodResolver(schema),
  });

  const selectedOrg = watch('organization');
  const selectedFacility = watch('facility');

  const { orgs, facilities, tenants } = React.useContext(Queries);
  const orgsOption = orgs.data?.data?.organization.map((org: TOrg) => ({
    label: org.name,
    value: org._id,
  }));
  const facilitiesOption = facilities.data?.data.facilities
    .filter((facility: TFacility) => facility.organization._id === selectedOrg)
    .map((facility: TFacility) => ({
      label: facility.name,
      value: facility._id,
    }));

  const tenantsOption = tenants.data?.data?.users
    .filter((user: TUserExtended) => user.facility._id === selectedFacility)
    .map((user: TUserExtended) => ({
      label: user.user.firstName + ' ' + user.user.lastName,
      value: user._id,
    }));

  useClearError(errors, clearErrors);

  const onSubmit = (data: EnergyFilterProps) => {
    if (!date?.from || !date?.to) {
      setDateError('Please select a date range');
      return;
    }
    const from = convertDate(date.from?.toISOString().split('T')[0], true);
    const to = convertDate(date.to?.toISOString().split('T')[0], true);

    setShowFilterModal(false);
    router.push(
      `${currentPath}?vt=${viewType}&filter=true&from=${from}&to=${to}&energyType=${
        data.energyType
      }${data.organization && `&orgId=${data.organization}`}${
        data.facility &&
        `&facilityId=${data.facility}${data.tenant && `&tenantId=${data.tenant}`}
      `
      }`,
    );
  };

  return (
    <div>
      <h1 className="text-xl font-[600] mb-5">Filter</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <DatePickerWithRange
          label="Date Range"
          date={date}
          setDate={setDate}
          error={dateError}
          setDateError={setDateError}
        />
        <ComboBoxFormComponent
          label="Type of Energy"
          data={[
            { label: 'Electricity', value: 'electricity' },
            { label: 'Water', value: 'water' },
            { label: 'Gas', value: 'gas' },
            { label: 'Heat', value: 'heat' },
          ]}
          selectorName="energyType"
          setValue={setValue}
          title="Energy Type"
          watch={watch}
          error={errors.energyType?.message}
          register={register}
        />

        <ComboBoxFormComponent
          label="Organization"
          data={orgsOption}
          selectorName="organization"
          setValue={setValue}
          title="Organization"
          watch={watch}
          error={errors.organization?.message}
          register={register}
        />

        <ComboBoxFormComponent
          label="Facility"
          data={facilitiesOption}
          selectorName="facility"
          setValue={setValue}
          title="Facility"
          watch={watch}
          error={errors.facility?.message}
          register={register}
          disabled={!selectedOrg}
        />

        <ComboBoxFormComponent
          label="Tenant"
          data={tenantsOption}
          selectorName="tenant"
          setValue={setValue}
          title="Tenant"
          watch={watch}
          error={errors.tenant?.message}
          register={register}
          disabled={!selectedFacility}
        />

        <div className="w-full flex items-center gap-5 mt-10">
          <Button
            type="button"
            className="w-full"
            variant="outline"
            onClick={() => {
              setShowFilterModal(false);
              router.push(`${currentPath}?vt=${viewType}&filter=false`);
            }}
          >
            Reset
          </Button>
          <Button className="w-full">Apply Filter</Button>
        </div>
      </form>
    </div>
  );
};

export default EnergyFilter;
