'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputComponent } from '@/app/_components/inputs/InputComponent';
import { TextArea } from '@/app/_components/inputs/TextArea';
import { ComboBoxFormComponent } from '@/app/_components/utils/ComboBoxes';
import BackendError from '@/app/_components/utils/FormError';
import Loader from '@/app/_components/utils/Loader';
import { ModalComponent } from '@/app/_components/utils/Modals';
import { SuccessModalContent } from '@/app/_components/utils/Modals';
import { MultiSelectComponent } from '@/app/_components/utils/MultiSelectComponent';
import Queries from '@/app/_context/Queries';
import useClearError from '@/app/_hooks/useClearError';
import useGetRoleList from '@/app/_hooks/useGetRoleList';
import { TComboBoxSelector } from '@/app/types';
import { Button } from '@/components/ui/button';
import { zodInputValidators } from '@/lib/utils';

const sendTo = z.union([zodInputValidators.dropDown.nullish(), z.literal('')]);
const option = z.union([zodInputValidators.dropDown.nullish(), z.literal('')]);
const subject = zodInputValidators.longText;
const content = zodInputValidators.message;

const schema = z.object({ sendTo, option, subject, content }).superRefine((data, ctx) => {
  if (!data.sendTo) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please select an option',
      path: ['sendTo'],
    });
  }

  if (!data.option) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Please select an option',
      path: ['option'],
    });
  }
});

type BroadcastForm = z.infer<typeof schema>;

const Broadcast = () => {
  const { sendMessage } = React.useContext(Queries);
  const [noRole, setNoRole] = React.useState<string | null>(null);
  const [successModal, setSuccessModal] = React.useState(false);
  const [selected, setSelected] = React.useState<TComboBoxSelector[]>([]);

  const { allOrgs, allFacilities, allTenants } = useGetRoleList();

  const { mutate, isError, isPending, error, isSuccess } = sendMessage;

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BroadcastForm>({
    resolver: zodResolver(schema),
  });

  useClearError(errors, clearErrors);

  const onSubmit: SubmitHandler<BroadcastForm> = async (response) => {
    const selectedRoles = selected.map((role) => role.value);
    if (selectedRoles.length === 0) {
      setNoRole('Select at least one role');
      return;
    }

    mutate({ ...response, to: selectedRoles });
  };

  React.useEffect(() => {
    if (isSuccess) {
      setSuccessModal(!successModal);
      setSelected([]);
      reset();
      sendMessage.reset();
    }

    if (isError) {
      setError('root', { message: error?.message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  const sendTo = watch('sendTo');
  const option = watch('option');

  const sendToArry = [
    {
      label: 'Organization',
      value: 'organization',
    },
    {
      label: 'Facility',
      value: 'facility',
    },
    {
      label: 'Tenants',
      value: 'tenant',
    },
  ];

  const tntOptions = [
    {
      label: 'All Tenants',
      value: 'all',
    },
    {
      label: 'Tenants by Organization',
      value: 'byOrganization',
    },
    {
      label: 'Tenants by Facility',
      value: 'byFacility',
    },
    {
      label: 'Specific Tenants',
      value: 'specific',
    },
  ];

  const adminsOptions = [
    {
      label: sendTo === 'organization' ? 'All Organization Admins and Managers' : 'All Facility Managers',
      value: 'all',
    },
    {
      label: sendTo === 'organization' ? 'Specific Organizations Admins and Manager' : 'Specific Facility Managers',
      value: 'specific',
    },
  ];

  const optionArry = sendTo === 'tenant' ? tntOptions : adminsOptions;
  const multiSelectOption = sendTo === 'organization' ? allOrgs : sendTo === 'tenant' ? allTenants : allFacilities;

  return (
    <React.Fragment>
      <ModalComponent
        open={successModal}
        setOpen={setSuccessModal}
        content={
          <SuccessModalContent
            actionBtnText="Ok"
            title="Broadcast Sent Successfully"
            message="Your Message Has Been Delivered to All Relevant Recipients"
            onConfirm={() => setSuccessModal(false)}
          />
        }
      />
      <div className="min-h-full card w-full py-5 md:py-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-[min(100%,600px)] mx-auto">
          <div className="text-center mb-4">
            <h3 className="text-xl font-[600] text-gray-60 mb-1">Broadcast Message</h3>
            <p className="text-xs text-gray-400">Reach All Admins and Tenants with Important Updates</p>
          </div>

          <ComboBoxFormComponent
            hideSearch
            watch={watch}
            title=""
            label={'Send To'}
            register={register}
            setValue={setValue}
            data={sendToArry}
            selectorName={'sendTo'}
            labelClass="font-[600] text-sm font-poppins text-gray-600"
            error={errors.sendTo?.message}
            contentHeight="h-auto"
          />

          {sendTo && (
            <ComboBoxFormComponent
              hideSearch
              watch={watch}
              title=""
              label={'Option'}
              register={register}
              setValue={setValue}
              data={optionArry}
              selectorName={'option'}
              labelClass="font-[600] text-sm font-poppins text-gray-600"
              error={errors.option?.message}
              contentHeight="h-auto"
              contentWidth="w-full"
            />
          )}

          {
            
          }

          {option === 'specific' && (
            <MultiSelectComponent
              error={noRole}
              selected={selected}
              setSelected={setSelected}
              options={multiSelectOption}
            />
          )}

          <InputComponent
            name="subject"
            label="Subject"
            placeholder="Enter subject"
            register={register}
            error={errors.subject?.message}
          />

          <TextArea
            name="content"
            label="Message"
            register={register}
            placeholder="Enter message"
            error={errors.content?.message}
          />

          <Button className={`mt-5 -mb-3`} disabled={isPending}>
            {isPending ? 'Sending...' : 'Send Broadcast Message'}
            {isPending && <Loader />}
          </Button>
          <BackendError errors={errors} />
        </form>
      </div>
    </React.Fragment>
  );
};

export default Broadcast;
