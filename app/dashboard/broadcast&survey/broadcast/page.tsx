'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputComponent } from '@/app/components/inputs/InputComponent';
import { TextArea } from '@/app/components/inputs/TextArea';
import MainWrapper from '@/app/components/layout/MainWrapper';
import BackendError from '@/app/components/utils/FormError';
import Loader from '@/app/components/utils/Loader';
import { ModalComponent } from '@/app/components/utils/Modal';
import { MultiSelectComponent } from '@/app/components/utils/MultiSelectComponent';
import SuccessModalContent from '@/app/components/utils/SuccessModalContent';
import { broadcastRoles } from '@/app/constants/data';
import Queries from '@/app/context/Queries';
import useClearError from '@/app/hooks/useClearError';
import { TComboBoxSelector } from '@/app/types';
import { Button } from '@/components/ui/button';
import { getRole, zodInputValidators } from '@/lib/utils';

const subject = zodInputValidators.longText;
const content = zodInputValidators.message;

const schemaa = z.object({ subject, content });

type BroadcastForm = z.infer<typeof schemaa>;

const Broadcast = () => {
  const { sendMessage } = React.useContext(Queries);
  const [noRole, setNoRole] = React.useState<string | null>(null);
  const [successModal, setSuccessModal] = React.useState(false);
  const [selected, setSelected] = React.useState<TComboBoxSelector[]>([]);

  const { mutate, isError, isPending, error, isSuccess } = sendMessage;

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    reset,
    formState: { errors },
  } = useForm<BroadcastForm>({
    resolver: zodResolver(schemaa),
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

  const options = broadcastRoles.filter((role) => role.allowedRoles.includes(getRole() as string));

  return (
    <MainWrapper>
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
            <p className="text-xs text-gray-400">Manage and review your Pseudo Admin details here.</p>
          </div>
          <MultiSelectComponent error={noRole} options={options} selected={selected} setSelected={setSelected} />
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
    </MainWrapper>
  );
};

export default Broadcast;
