import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import AddEditAddress, { addressSchema } from '@/app/_components/forms/AddEditAddress';
import { InputComponent } from '@/app/_components/inputs/InputComponent';
import BackendError from '@/app/_components/utils/FormError';
import FormInfo from '@/app/_components/utils/FormInfo';
import Loader from '@/app/_components/utils/Loader';
import { initialOrg } from '@/app/_constants/initialData';
import useClearError from '@/app/_hooks/useClearError';
import { Modals } from '@/app/_slices/ModalSlice';
import { TMutationHandler, TOrg } from '@/app/types';
import { Button } from '@/components/ui/button';
import { zodInputValidators } from '@/lib/utils';

const name = zodInputValidators.longText;
const orgSchema = z.object({
  name,
  ...addressSchema.shape,
});

type FormFieldOrg = z.infer<typeof orgSchema>;

const AddEditOrg = ({
  org,
  action,
  mutation,
  modalToOpen,
  modalToClose,
  handleOpenModal,
  handleCloseModal,
}: {
  org: TOrg;
  action: 'add' | 'edit';
  modalToOpen: Modals;
  modalToClose: Modals;
  mutation: TMutationHandler;
  handleOpenModal: (modal: Modals) => void;
  handleCloseModal: (modal: Modals) => void;
}) => {
  const { mutate, isPending } = mutation;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    setError,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormFieldOrg>({
    defaultValues: action === 'edit' ? { ...org } : { ...initialOrg },
    resolver: zodResolver(orgSchema),
  });

  const onSubmit = (data: FormFieldOrg) => {
    const orgData = {
      faclitiesCount: '0',
      ...data,
      id: org?._id || '',
    };
    mutate(orgData);
  };

  React.useEffect(() => {
    if (mutation.isSuccess) {
      handleCloseModal(modalToClose);
      handleOpenModal(modalToOpen);
      reset();
    } else if (mutation.error) {
      const errorMessage = (mutation.error as any).response?.data?.message;
      setError('root', { message: errorMessage });
    }
  }, [action, mutation, handleCloseModal, handleOpenModal, modalToClose, modalToOpen, reset, setError]);

  useClearError(errors, clearErrors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <h2 className="text-2xl font-semibold mb-5 text-center">
        {
          {
            add: `Add New Organization`,
            edit: `Edit Organization `,
          }[action]
        }
      </h2>
      <div className="">
        <FormInfo
          title="Organization Information"
          description="Enter the Information of the Organization

"
        />
      </div>
      <div className="flex flex-col gap-5">
        <InputComponent
          key="name"
          id="name"
          name="name"
          label="Organization Name"
          placeholder="Enter Organization Name"
          error={errors.name?.message}
          register={register}
        />
        <div>
          <FormInfo title="Address Information" description="Provide the Address of the facility" />
          <AddEditAddress setValue={setValue} errors={errors} watch={watch} register={register} />
        </div>
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

        <Button disabled={!isDirty || isPending} className="w-full ">
          {isPending ? (
            <Loader />
          ) : (
            {
              add: `Add Organization`,
              edit: `Update Organization`,
            }[action]
          )}
        </Button>
      </div>
      <BackendError errors={errors} />
    </form>
  );
};

export default AddEditOrg;
