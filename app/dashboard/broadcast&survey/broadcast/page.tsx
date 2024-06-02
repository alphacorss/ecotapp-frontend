'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ArrowIndicator } from './_components/ArrowIndicator';
import { SelectedOptionButton, TierSelectedOptionButton } from './_components/SelectedOptionButton';
import { adminsOptions, sendToArry, tntOptions } from './helper';
import { InputComponent } from '@/app/_components/inputs/InputComponent';
import { TextArea } from '@/app/_components/inputs/TextArea';
import { ComboBoxFormComponent, ComboBoxFormMultiSelectComponent } from '@/app/_components/utils/ComboBoxes';
import BackendError from '@/app/_components/utils/FormError';
import Loader from '@/app/_components/utils/Loader';
import { ModalComponent } from '@/app/_components/utils/Modals';
import { SuccessModalContent } from '@/app/_components/utils/Modals';
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
  const [successModal, setSuccessModal] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<TComboBoxSelector[]>([]);
  const [selectedError, setSelectedError] = React.useState<string | undefined>(undefined);

  const { allOrgs, allFacilities, allTenants } = useGetRoleList();

  // eslint-disable-next-line no-unused-vars
  const { mutate, isError, isPending, error, isSuccess } = sendMessage;

  const {
    getValues,
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
    const isEmpty = selectedValues.length === 0;

    if (isEmpty) {
      setSelectedError('Please select at least one recipient');
      return;
    }

    // mutate({ ...response, to: selectedRoles });
  };

  React.useEffect(() => {
    if (isSuccess) {
      setSuccessModal(!successModal);
      setSelectedValues([]);
      reset();
      sendMessage.reset();
    }

    if (isError) {
      setError('root', { message: error?.message });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess]);

  const sendTo = getValues().sendTo;
  const option = getValues().option;

  const optionArry = sendTo === 'tenant' ? tntOptions : adminsOptions(sendTo);
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="text-center mb-4">
            <h3 className="text-xl font-[600] text-gray-60 mb-1">Broadcast Message</h3>
            <p className="text-xs text-gray-400">Reach All Admins and Tenants with Important Updates</p>
          </div>

          <div className="flex flex-wrap gap-5 items-center">
            <SelectedOptionButton
              arry={sendToArry}
              label="Send To"
              value={sendTo}
              onClick={() => {
                setSelectedValues([]);
                reset({
                  sendTo: undefined,
                  option: undefined,
                });
              }}
            />
            <ArrowIndicator sendTo={sendTo} option={option} />
            <SelectedOptionButton
              arry={optionArry}
              label="Option"
              value={option}
              onClick={() => {
                setSelectedValues([]);
                setValue('option', undefined);
              }}
            />
            {selectedValues.length > 0 && <ArrowIndicator sendTo={sendTo} option={option} />}
            <TierSelectedOptionButton
              sendTo={sendTo}
              option={option}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
            />
          </div>
          {!sendTo && (
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
          )}

          {sendTo && !option && (
            <ComboBoxFormComponent
              hideSearch
              watch={watch}
              title=""
              label={'Send To'}
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

          {option === 'specific' && (
            <ComboBoxFormMultiSelectComponent
              title=""
              label={'Send To'}
              data={multiSelectOption}
              error={selectedError}
              setError={setSelectedError}
              values={selectedValues}
              setValues={setSelectedValues}
            />
          )}
          {option === 'byFacility' && (
            <ComboBoxFormMultiSelectComponent
              title="Facility"
              label={'Send To'}
              data={allFacilities}
              error={selectedError}
              setError={setSelectedError}
              values={selectedValues}
              setValues={setSelectedValues}
            />
          )}
          {option === 'byOrganization' && (
            <ComboBoxFormMultiSelectComponent
              title="Organization"
              label={'Send To'}
              data={allOrgs}
              error={selectedError}
              setError={setSelectedError}
              values={selectedValues}
              setValues={setSelectedValues}
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
