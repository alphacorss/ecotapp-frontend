import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import BackendError from '../utils/FormError';
import Loader from '../utils/Loader';
import { InputComponent } from '@/app/_components/inputs/InputComponent';
import { InputComponentWithSelector } from '@/app/_components/inputs/InputComponentWithSelector';
import { countries } from '@/app/_constants/countryCodes';
import { userForm } from '@/app/_constants/forms';
import useClearError from '@/app/_hooks/useClearError';
import { useHandleFormState } from '@/app/_hooks/useHandleFormState';
import { Modals } from '@/app/_slices/ModalSlice';
import { TMutationHandler, TRole, TUser } from '@/app/types';
import { Button } from '@/components/ui/button';
import { cleanRoleSingular, zodInputValidators } from '@/lib/utils';

type Props = {
  Id?: string | null;
  user: TUser | undefined;
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
const country = zodInputValidators.dropDown;
const phone = zodInputValidators.phone;

const schema = z.object({ firstName, lastName, email, country, phone });

type FormFieldsUser = z.infer<typeof schema>;

export const AddEditUser = ({
  Id,
  role,
  user,
  action,
  modalToOpen,
  modalToClose,
  mutation,
  handleCloseModal,
  handleOpenModal,
}: Props) => {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { isDirty, errors },
  } = useForm<FormFieldsUser>({
    defaultValues: {
      firstName: user?.user?.firstName,
      lastName: user?.user?.lastName,
      email: user?.user?.email,
      country: user?.user?.phone?.split('-')[0],
      phone: user?.user?.phone?.split('-')[1],
    },
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFieldsUser> = (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: `${data.country}-${data.phone}`,
      organizationId: Id,
      facilityId: Id,
      role: role === 'pseudoadmin' ? 'psuedoadmin' : role,
    };

    const updatedData = {
      ...userData,
      id: user?._id,
    };

    action === 'add' ? mutation.mutate(userData) : mutation.mutate(updatedData);
  };

  useClearError(errors, clearErrors);
  useHandleFormState(mutation, reset, setError, () => {
    handleCloseModal(modalToClose);
    handleOpenModal(modalToOpen);
  });

  const userRole = cleanRoleSingular(role);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <h2 className="text-2xl font-semibold mb-5 text-center">
        {
          {
            add: `Add ${userRole} `,
            edit: `Edit ${userRole} `,
          }[action]
        }
      </h2>
      <div className="py-4 mb-5">
        <h3 className="text-lg font-bold">Personal Information</h3>
        <p className="text-xs text-gray-600 font-[600] tracking-tight">Enter the Information of the {userRole}</p>
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
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-5 mt-12 mb-2">
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

        <Button type="submit" disabled={!isDirty || (mutation && mutation.isPending)} className="w-full">
          {mutation && mutation.isPending ? (
            <Loader />
          ) : (
            {
              add: `Add ${userRole}`,
              edit: `Apply Changes to ${userRole}`,
            }[action]
          )}
        </Button>
      </div>
      <BackendError errors={errors} />
    </form>
  );
};
