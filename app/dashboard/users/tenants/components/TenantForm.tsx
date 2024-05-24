import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputComponent } from '@/app/_components/inputs/InputComponent';
import { InputComponentWithSelector } from '@/app/_components/inputs/InputComponentWithSelector';
import { ComboBoxFormComponent } from '@/app/_components/utils/ComboBoxes';
import BackendError from '@/app/_components/utils/FormError';
import Loader from '@/app/_components/utils/Loader';
import { countries } from '@/app/_constants/countryCodes';
import { userForm } from '@/app/_constants/forms';
import Queries from '@/app/_context/Queries';
import useClearError from '@/app/_hooks/useClearError';
import { useHandleFormState } from '@/app/_hooks/useHandleFormState';
import { Modals } from '@/app/enums';
import { TComboBoxSelector, TFacility, TMutationHandler, TRole, TFacilityUser } from '@/app/types';
import { Button } from '@/components/ui/button';
import { capitalizeFirstLetter, zodInputValidators } from '@/lib/utils';

type Props = {
  facilityId: string;
  currentUser: TFacilityUser;
  user: TFacilityUser;
  action: 'add' | 'edit';
  role: TRole;
  modalToOpen: Modals;
  modalToClose: Modals;
  mutation: TMutationHandler;
  handleCloseModal: (modal: Modals) => void;
  handleOpenModal: (modal: Modals) => void;
};

const firstName = zodInputValidators.name;
const lastName = zodInputValidators.name;
const email = zodInputValidators.email;
const phone = zodInputValidators.phone;
const country = zodInputValidators.dropDown;
const facilityId = zodInputValidators.dropDown;

const schema = z.object({
  firstName,
  lastName,
  email,
  country,
  phone,
  facilityId,
});

type FormFieldsUser = z.infer<typeof schema>;

export const AddEditTenant = ({
  role,
  user,
  currentUser,
  action,
  modalToOpen,
  modalToClose,
  mutation,
  facilityId,
  handleCloseModal,
  handleOpenModal,
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<FormFieldsUser>({
    defaultValues: {
      firstName: user?.user?.firstName,
      lastName: user?.user?.lastName,
      email: user?.user?.email,
      country: user?.user?.phone?.split('-')[0],
      phone: user?.user?.phone?.split('-')[1],
      facilityId: facilityId ? facilityId : user?.facility?._id,
    },
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFieldsUser> = (data) => {
    const userData = {
      ...data,
      phone: `${data.country}-${data.phone}`,
      role,
    };

    const updatedData = {
      ...data,
      id: user?._id,
      phone: `${data.country}-${data.phone}`,
      role,
    };

    mutation.mutate(action === 'add' ? userData : updatedData);
  };

  useClearError(errors, clearErrors);
  useHandleFormState(mutation, reset, setError, () => {
    handleCloseModal(modalToClose);
    handleOpenModal(modalToOpen);
  });

  const cleanRole = capitalizeFirstLetter(role.replace(/([A-Z])/g, ' $1').trim());

  const facilities = React.useContext(Queries).facilities;
  const facilitiesList = facilities.data?.data.facilities ?? facilities.data?.data?.data?.facilities;

  const availableFacilities: TComboBoxSelector[] = facilityId
    ? [
        {
          label: currentUser?.facility?.name,
          value: currentUser?.facility?._id,
        },
      ]
    : facilitiesList
        ?.filter((facility: TFacility) => facility.organization?._id)
        .map((facility: TFacility) => ({
          label: facility.name,
          value: facility._id,
        }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <h2 className="text-2xl font-semibold mb-5 text-center">
        {
          {
            add: `Add ${cleanRole} `,
            edit: `Edit ${cleanRole} `,
          }[action]
        }
      </h2>
      <div className="py-4 mb-5">
        <h3 className="text-lg font-bold">Personal Information</h3>
        <p className="text-xs text-gray-600 font-[600] tracking-tight">Enter the Information of the {cleanRole}</p>
      </div>
      <div className="flex flex-col gap-5 mb-5">
        <ComboBoxFormComponent
          title="Facility"
          error={errors.facilityId?.message}
          register={register}
          label={'Facility'}
          data={availableFacilities}
          setValue={setValue}
          watch={watch}
          selectorName={'facilityId'}
          disabled={!!facilityId}
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {userForm.map((input) => (
          <InputComponent
            key={input.id}
            id={input.id}
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            error={errors[input.name as keyof FormFieldsUser]?.message}
            register={register}
            disabled={input.name === 'email' && action === 'edit'}
          />
        ))}

        <InputComponentWithSelector
          inputId="phone"
          inputType="number"
          inputName="phone"
          inputLabel="Phone Number"
          inputPlaceholder="12345678"
          selectorName="country"
          arry={countries}
          setValue={setValue}
          watch={watch}
          register={register}
          inputError={errors.phone?.message}
          selectorError={errors.country?.message}
        />
      </div>
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-5 mt-12 mb-3">
        <Button
          type="button"
          onClick={() => {
            handleCloseModal(modalToClose);
            reset();
          }}
          className="w-full"
          variant="outline"
        >
          Cancel
        </Button>

        <Button type="submit" disabled={mutation && mutation.isPending} className="w-full">
          {mutation && mutation.isPending ? (
            <Loader />
          ) : (
            {
              add: `Add ${cleanRole}`,
              edit: `Edit ${cleanRole}`,
            }[action]
          )}
        </Button>
      </div>
      <BackendError errors={errors} />
    </form>
  );
};
