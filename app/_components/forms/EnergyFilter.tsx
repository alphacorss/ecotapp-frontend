import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ComboBoxFormComponent } from '@/app/_components/utils/ComboBoxes';
import { energyTypeArray } from '@/app/_constants/data';
import Queries from '@/app/_context/Queries';
import User from '@/app/_context/User';
import useClearError from '@/app/_hooks/useClearError';
import usePathParams from '@/app/_hooks/usePathParams';
import { high, low, mid } from '@/app/dashboard/home/helpers';
import { TFacility, TOrg, TFacilityUser, TOrgUser } from '@/app/types';
import { Button } from '@/components/ui/button';
import { getUser, setUrlParams, zodInputValidators } from '@/lib/utils';

const energy_type = zodInputValidators.dropDown;
const organization = zodInputValidators.optionalDropDown;
const facility = zodInputValidators.optionalDropDown;
const tenant = zodInputValidators.optionalDropDown;

const schema = z.object({
  energy_type,
  organization,
  facility,
  tenant,
  refreshTime: z.union([zodInputValidators.refreshTime.nullish(), z.literal('')]),
});

type EnergyFilterProps = z.infer<typeof schema>;

const EnergyFilter = ({
  showRefreshTime,
  setShowFilterModal,
}: {
  showRefreshTime?: boolean;
  setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { facilityId, tenantId, orgId, viewType, energy_type, refreshTime } = usePathParams();
  const { role } = React.useContext(User);

  const orgUser = getUser() as TOrgUser;
  const facilityUser = getUser() as TFacilityUser;

  const orgUserId = orgUser?.organization?._id;
  const facilityUserId = facilityUser?.facility?._id;

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<EnergyFilterProps>({
    defaultValues: {
      energy_type: energy_type || '',
      organization: orgId || orgUserId || '',
      facility: facilityId || facilityUserId || '',
      tenant: tenantId || '',
      refreshTime: refreshTime || '',
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
    .filter((user: TFacilityUser) => user.facility._id === selectedFacility)
    .map((user: TFacilityUser) => ({
      label: user.user.firstName + ' ' + user.user.lastName,
      value: user._id,
    }));

  useClearError(errors, clearErrors);

  const onSubmit = (data: EnergyFilterProps) => {
    setShowFilterModal(false);
    setUrlParams({
      vt: viewType,
      energy_type: data.energy_type,
      refreshtime: data.refreshTime,
      ...(data.organization && { orgId: data.organization }),
      ...(data.facility && { facilityId: data.facility }),
      ...(data.tenant && { tenantId: data.tenant }),
    });
  };

  return (
    <div>
      <h1 className="text-xl font-[600] mb-5">Filter</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {showRefreshTime && (
          <ComboBoxFormComponent
            label="Refresh Time"
            data={[
              { label: '1 minute', value: '1m' },
              { label: '5 minutes', value: '5m' },
              { label: '15 minutes', value: '15m' },
              { label: '30 minutes', value: '30m' },
              { label: '1 hour', value: '1h' },
            ]}
            selectorName="refreshTime"
            setValue={setValue}
            title="Refresh Time"
            watch={watch}
            error={errors.refreshTime?.message}
            register={register}
          />
        )}

        <ComboBoxFormComponent
          label="Type of Energy"
          data={energyTypeArray}
          selectorName="energy_type"
          setValue={setValue}
          title="Energy Type"
          watch={watch}
          error={errors.energy_type?.message}
          register={register}
        />

        {high.includes(role as string) && (
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
        )}

        {(high.includes(role as string) || mid.includes(role as string)) && (
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
        )}

        {(high.includes(role as string) || mid.includes(role as string) || low.includes(role as string)) && (
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
        )}

        <div className="w-full flex items-center gap-5 mt-10">
          <Button
            type="button"
            className="w-full"
            variant="outline"
            onClick={() => {
              setValue('energy_type', '');
              setValue('organization', '');
              setValue('facility', '');
              setValue('tenant', '');
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
