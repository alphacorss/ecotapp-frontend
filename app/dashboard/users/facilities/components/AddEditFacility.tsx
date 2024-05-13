import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import FormFour from './forms/FormFour';
import FormOne from './forms/FormOne';
import FormThree from './forms/FormThree';
import FormTwo from './forms/FormTwo';
import TabIndicator from './TabIndicator';
import { addressSchema } from '@/app/_components/forms/AddEditAddress';
import BackendError from '@/app/_components/utils/FormError';
import Queries from '@/app/_context/Queries';
import useClearError from '@/app/_hooks/useClearError';
import { Modals } from '@/app/_slices/ModalSlice';
import { high } from '@/app/dashboard/home/helpers';
import { TFacility, TFacilityTabs, TMutationHandler, TOrgUser } from '@/app/types';
import { Button } from '@/components/ui/button';
import { getUser, zodInputValidators } from '@/lib/utils';

const siteId = zodInputValidators.twoNumbers;
const name = zodInputValidators.longText;
const area = zodInputValidators.name;
const totalCommonAreas = zodInputValidators.noneNull;
const buidingFoundation = zodInputValidators.name;
const totalNumberOfUnits = zodInputValidators.twoNumbers;
const backupgenerator = zodInputValidators.dropDown;
const totalNumberOfMeters = zodInputValidators.dropDown;
const organizationId = zodInputValidators.dropDown;

const formOneSchema = z.object({
  organizationId,
  siteId,
  name,
  area,
  totalCommonAreas,
  buidingFoundation,
  totalNumberOfUnits,
  backupgenerator,
  totalNumberOfMeters,
});

const schema = z.object({
  ...formOneSchema.shape,
  ...addressSchema.shape,
});

export type TFacilityFormOne = z.infer<typeof formOneSchema>;
export type TFacilityForm = z.infer<typeof schema>;

const AddEditFacility = ({
  action,
  mutation,
  modalToClose,
  modalToOpen,
  handleCloseModal,
  handleOpenModal,
}: {
  action: 'add' | 'edit';
  mutation: TMutationHandler;
  modalToClose: Modals;
  modalToOpen: Modals;
  handleCloseModal: (modal: Modals) => void;
  handleOpenModal: (modal: Modals) => void;
}) => {
  const user = getUser() as TOrgUser;
  const role = user?.user?.role[0];

  const orgId = user?.organization?._id;
  const orgUser = user?.organization;

  const { facility } = React.useContext(Queries);
  const { mutate, isPending, isSuccess, isError, error } = mutation;
  const [activeTab, setActiveTab] = React.useState<TFacilityTabs>('form');
  const [validTabs, setValidTabs] = React.useState<Record<string, boolean>>({
    form: false,
    amenities: false,
    certifications: false,
    address: false,
  });

  const facilityData: TFacility = facility.data?.data.data.facility;

  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>(
    facilityData ? facilityData.Amenities : [],
  );
  const [selectedCertifications, setSelectedCertifications] = React.useState<string[]>(
    facilityData ? facilityData.Certifications : [],
  );

  const {
    trigger,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...facilityData,
      organizationId: high.includes(role as string) ? facilityData?.organization._id : orgId,
    },
    reValidateMode: 'onChange',
  });

  useClearError(errors, clearErrors);

  const handleAddFacility: SubmitHandler<any> = (data) => {
    const addData = {
      ...data,
      Amenities: selectedAmenities,
      Certifications: selectedCertifications,
    };
    const updateData = {
      ...facilityData,
      ...data,
      Amenities: selectedAmenities,
      Certifications: selectedCertifications,
      id: facilityData?._id,
    };
    mutate(action === 'add' ? addData : updateData);
  };

  React.useEffect(() => {
    if (isSuccess) {
      handleCloseModal(modalToClose);
      handleOpenModal(modalToOpen);
      mutation.reset();
      reset();
    } else if (error) {
      const errorMessage = (error as any).response?.data?.message;
      setError('root', { message: errorMessage });
    }
  }, [
    action,
    error,
    handleCloseModal,
    handleOpenModal,
    isSuccess,
    modalToClose,
    modalToOpen,
    mutation,
    reset,
    setError,
  ]);

  const handleCancel = () => {
    handleCloseModal(modalToClose);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleAddFacility)}>
      <h1 className="text-3xl text-gray-600 font-[600] text-center mb-5">
        {action === 'add' ? 'Add' : 'Edit'} Facility
      </h1>

      <TabIndicator validTabs={validTabs} activeTab={activeTab} />
      {activeTab === 'form' && (
        <FormOne
          orgUser={orgUser}
          watch={watch}
          errors={errors}
          trigger={trigger}
          register={register}
          setValue={setValue}
          setActiveTab={setActiveTab}
          setValidTabs={setValidTabs}
          handleCancel={handleCancel}
        />
      )}
      {activeTab === 'amenities' && (
        <FormTwo
          setActiveTab={setActiveTab}
          setValidTabs={setValidTabs}
          selectedAmenities={selectedAmenities}
          setSelectedAmenities={setSelectedAmenities}
          handleCancel={handleCancel}
        />
      )}
      {activeTab === 'certifications' && (
        <FormThree
          setActiveTab={setActiveTab}
          setValidTabs={setValidTabs}
          selectedCertifications={selectedCertifications}
          setSelectedCertification={setSelectedCertifications}
          handleCancel={handleCancel}
        />
      )}
      {activeTab === 'address' && (
        <>
          <FormFour
            watch={watch}
            errors={errors}
            register={register}
            setValue={setValue}
            setActiveTab={setActiveTab}
            setValidTabs={setValidTabs}
          />
          <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-5 mt-12">
            <Button
              type="button"
              className="w-full"
              variant="outline"
              onClick={() => {
                handleCloseModal(modalToClose);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className={`w-full flex gap-2 ${isPending ? 'bg-gray-300' : isError ? 'bg-error-300 ' : ''}`}
            >
              {isPending ? (
                <Loader />
              ) : (
                {
                  add: `Add Facility`,
                  edit: `Update Facility`,
                }[action]
              )}
            </Button>
          </div>
        </>
      )}
      <BackendError errors={errors} />
    </form>
  );
};

export default AddEditFacility;
