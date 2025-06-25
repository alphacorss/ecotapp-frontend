import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ComboBoxFormComponent } from '@/app/_components/utils/ComboBoxes';
import User from '@/app/_context/User';
import useClearError from '@/app/_hooks/useClearError';
import useGetRoleList from '@/app/_hooks/useGetRoleList';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { getUser } from '@/lib/utils';

// New: Flexible schema
const schema = z.object({
  energy_type: z.string().optional(),
  organization: z.string().optional(),
  facility: z.string().optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
});

type EnergyFilterProps = z.infer<typeof schema>;

type Props = {
  setShowFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (data: EnergyFilterProps) => void;
  showOrg?: boolean;
  showFacility?: boolean;
  showTenant?: boolean; // for future
  showEnergyType?: boolean;
  showDateRange?: boolean;
  energyTypeOptions?: { label: string; value: string }[];
  defaultValues?: Partial<EnergyFilterProps>;
};

const EnergyFilter = ({
  setShowFilterModal,
  onSubmit,
  showOrg = false,
  showFacility = false,
  showEnergyType = false,
  showDateRange = false,
  energyTypeOptions = [],
  defaultValues = {},
}: Props) => {
  const { role } = React.useContext(User);
  const orgUser = getUser();
  let orgUserId = '';
  let facilityUserId = '';
  if (orgUser && 'organization' in orgUser && orgUser.organization) {
    orgUserId = orgUser.organization._id;
  }
  if (orgUser && 'facility' in orgUser && orgUser.facility) {
    facilityUserId = orgUser.facility._id;
  }
  const { allOrgs, allFacilitiesByOrg } = useGetRoleList();

  // For tenants, get facility from profile
  const isTenant = role === 'tenant';
  const tenantFacility =
    isTenant && 'facility' in orgUser && orgUser.facility
      ? [{ label: orgUser.facility.name, value: orgUser.facility._id }]
      : [];

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<EnergyFilterProps>({
    defaultValues: {
      energy_type: defaultValues.energy_type || '',
      organization: defaultValues.organization || orgUserId || '',
      facility: defaultValues.facility || facilityUserId || '',
      start_date: defaultValues.start_date || '',
      end_date: defaultValues.end_date || '',
    },
    resolver: zodResolver(schema),
  });

  const selectedOrg = watch('organization');

  useClearError(errors, clearErrors);

  // Date pickers state
  const [startDate, setStartDate] = React.useState(
    defaultValues.start_date ? new Date(defaultValues.start_date) : undefined,
  );
  const [endDate, setEndDate] = React.useState(defaultValues.end_date ? new Date(defaultValues.end_date) : undefined);

  React.useEffect(() => {
    if (startDate) setValue('start_date', startDate.toISOString().slice(0, 10));
    if (endDate) setValue('end_date', endDate.toISOString().slice(0, 10));
  }, [startDate, endDate, setValue]);

  const handleFormSubmit = (data: EnergyFilterProps) => {
    setShowFilterModal(false);
    onSubmit(data);
  };

  const reset = () => {
    setValue('organization', '');
    setValue('facility', '');
    setValue('energy_type', '');
    setStartDate(undefined);
    setEndDate(undefined);
  };

  // Show facility for all roles if showFacility is true
  const showFacilityDropdown = showFacility;
  // For tenants, use facility from profile; for others, use allFacilitiesByOrg
  const facilityData = isTenant ? tenantFacility : allFacilitiesByOrg(selectedOrg as string);
  const facilityDisabled = showOrg && !isTenant && !selectedOrg;

  return (
    <div>
      <h1 className="text-xl font-[600] mb-5">Filter</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">
        {showEnergyType && (
          <ComboBoxFormComponent
            label="Type of Energy"
            data={energyTypeOptions}
            selectorName="energy_type"
            setValue={setValue}
            title="Energy Type"
            watch={watch}
            error={errors.energy_type?.message}
            register={register}
          />
        )}
        {showOrg && (
          <ComboBoxFormComponent
            label="Organization"
            data={allOrgs}
            selectorName="organization"
            setValue={setValue}
            title="Organization"
            watch={watch}
            error={errors.organization?.message}
            register={register}
          />
        )}
        {showFacilityDropdown && (
          <ComboBoxFormComponent
            label="Facility"
            data={facilityData}
            selectorName="facility"
            setValue={setValue}
            title="Facility"
            watch={watch}
            error={errors.facility?.message}
            register={register}
            disabled={facilityDisabled}
          />
        )}
        {showDateRange && (
          <div className="flex gap-4">
            <div>
              <label className="block mb-1">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={'w-full justify-start text-left font-normal ' + (!startDate ? 'text-gray-400' : '')}
                  >
                    {startDate ? startDate.toISOString().slice(0, 10) : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="min-w-[320px] p-4">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date);
                    }}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <label className="block mb-1">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={'w-full justify-start text-left font-normal ' + (!endDate ? 'text-gray-400' : '')}
                  >
                    {endDate ? endDate.toISOString().slice(0, 10) : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="min-w-[320px] p-4">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => {
                      setEndDate(date);
                    }}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
        <div className="w-full flex items-center gap-5 mt-10">
          <Button type="button" className="w-full" variant="outline" onClick={reset}>
            Reset
          </Button>
          <Button className="w-full">Apply Filter</Button>
        </div>
      </form>
    </div>
  );
};

export default EnergyFilter;
