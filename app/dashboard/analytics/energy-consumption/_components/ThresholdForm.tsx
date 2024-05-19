import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { InputComponent } from '@/app/_components/inputs/InputComponent';
import BackendError from '@/app/_components/utils/FormError';
import Loader from '@/app/_components/utils/Loader';
import Queries from '@/app/_context/Queries';
import useClearError from '@/app/_hooks/useClearError';
import { useHandleFormState } from '@/app/_hooks/useHandleFormState';
import { Button } from '@/components/ui/button';

const schema = z
  .object({
    threshold: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Input must be a number',
    }),
  })
  .superRefine((data, ctx) => {
    if (parseFloat(data.threshold) <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Threshold must be greater than 0',
        path: ['threshold'],
      });
    }
  });

type FormField = z.infer<typeof schema>;

const ThresholdForm = ({
  setThresholdModal,
  setThresholdSet,
}: {
  setThresholdModal: React.Dispatch<React.SetStateAction<boolean>>;
  setThresholdSet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setThreshold } = React.useContext(Queries);
  const mutation = setThreshold;

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<FormField>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormField> = (data: FormField) => {
    mutation.mutate(parseInt(data.threshold, 10));
  };

  useClearError(errors, clearErrors);
  useHandleFormState(mutation, clearErrors, setError, () => {
    setThresholdModal(false);
    setThresholdSet(true);
  });

  return (
    <div>
      <h1 className="text-xl font-[600] mb-5">Set Threshold</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          label="Threshold"
          name="threshold"
          type="number"
          register={register}
          error={errors?.threshold?.message}
        />

        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-5 mt-12 mb-3">
          <Button
            type="button"
            onClick={() => {
              setThresholdModal(false);
              mutation.reset();
            }}
            className="w-full"
            variant="outline"
          >
            Cancel
          </Button>

          <Button type="submit" disabled={mutation && mutation.isPending} className="w-full">
            {mutation && mutation.isPending ? <Loader /> : 'Set Threshold'}
          </Button>
        </div>
        <BackendError errors={errors} />
      </form>
    </div>
  );
};

export default ThresholdForm;
