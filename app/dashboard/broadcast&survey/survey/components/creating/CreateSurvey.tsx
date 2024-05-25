import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import QuestionInput from './QuestionInput';
import { ComboBoxFormComponent } from '@/app/_components/utils/ComboBoxes';
import ErrorMessage from '@/app/_components/utils/ErrorMessage';
import SurveyCtx from '@/app/_context/Survey';
import useClearError from '@/app/_hooks/useClearError';
import useClearErrorMessage from '@/app/_hooks/useClearErrorMessage';
import useGetRoleList from '@/app/_hooks/useGetRoleList';
import { Button } from '@/components/ui/button';
import { zodInputValidators } from '@/lib/utils';

const schema = z
  .object({
    toSend: z.union([zodInputValidators.dropDown.nullish(), z.literal('')]),
    facilityId: z.union([zodInputValidators.dropDown.nullish(), z.literal('')]),
    organizationId: z.union([zodInputValidators.dropDown.nullish(), z.literal('')]),
  })
  .superRefine((data, ctx) => {
    if (data.toSend === 'organization' && data.organizationId === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select an organization',
        path: ['organizationId'],
      });
    }
    if (data.toSend === 'facility' && data.facilityId === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please select a facility',
        path: ['facilityId'],
      });
    }
  });

type SurveyForm = z.infer<typeof schema>;

const CreateSurvey = () => {
  const sCtx = React.useContext(SurveyCtx);
  const [error, setError] = useState(false);
  const [emptyQuestion, setEmptyQuestion] = React.useState(false);

  const isEmpty = sCtx.questions.find((question) => question.questionText.trim() === '');

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SurveyForm>({
    defaultValues: {
      toSend: sCtx.sendToTenant,
      organizationId: sCtx.sendToOption[0]?.value || '',
      facilityId: sCtx.sendToOption[0]?.value || '',
    },
    resolver: zodResolver(schema),
  });

  const sendTo = [
    {
      label: 'All Tenants',
      value: 'all',
    },
    {
      label: 'Organization',
      value: 'organization',
    },
    {
      label: 'Facility',
      value: 'facility',
    },
  ];

  const selectedOption = watch('toSend');

  const { allOrgs, allFacilities } = useGetRoleList();

  useClearError(errors, clearErrors);
  useClearErrorMessage(error, setError);
  useClearErrorMessage(emptyQuestion, setEmptyQuestion);

  const onSubmit: SubmitHandler<SurveyForm> = (data) => {
    if (sCtx.title.trim() === '' || sCtx.description.trim() === '') {
      setError(true);
      return;
    }

    if (isEmpty) {
      setEmptyQuestion(true);
      return;
    }

    sCtx.setSendToTenant(data.toSend || '');
    sCtx.setSendToOption(data.toSend === 'organization' ? allOrgs : data.toSend === 'facility' ? allFacilities : []);
    sCtx.setShowPreview(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        ref={sCtx.titleRef}
        contentEditable
        className="text-3xl font-[600] mt-5 focus:outline-none focus:ring-0 w-full min-h-12 border-none bg-transparent"
        onInput={(e) => sCtx.setTitle(e.currentTarget.textContent as string)}
      >
        {sCtx.title}
      </div>
      <div className="my-5 flex flex-col gap-5">
        <ComboBoxFormComponent
          watch={watch}
          title=""
          label={'Send To'}
          register={register}
          setValue={setValue}
          data={sendTo}
          selectorName={'toSend'}
          labelClass="font-[600] text-sm font-poppins text-gray-600"
          error={errors.toSend?.message}
        />
        {selectedOption !== 'all' && (
          <ComboBoxFormComponent
            watch={watch}
            title={selectedOption === 'organization' ? 'Organization' : 'Facility'}
            label={selectedOption === 'organization' ? 'Organization' : 'Facility'}
            register={register}
            setValue={setValue}
            data={selectedOption === 'organization' ? allOrgs : allFacilities}
            selectorName={selectedOption === 'organization' ? 'organizationId' : 'facilityId'}
            labelClass="font-[600] text-sm font-poppins text-gray-600"
            error={selectedOption === 'organization' ? errors.organizationId?.message : errors.facilityId?.message}
          />
        )}
      </div>
      <div className="w-full">
        <h1 className="font-[600] text-sm font-poppins text-gray-600">Survey Description</h1>
        <textarea
          className={`w-fullsCtx. min-h-[100px] mt-1 p-3 rounded-[var(--rounded)] border border-gray-200 focus:outline-none focus:ring-0 placeholder:text-sm placeholder:font-[500] placeholder:text-gray-300 text-gray-600 text-sm font-[500] w-full ${
            error ? 'border-red-500' : ''
          }`}
          value={sCtx.description}
          onChange={(e) => sCtx.setDescription(e.target.value)}
          placeholder="Enter a description..."
        />
        <ErrorMessage error={error ? 'Please fill out the title and description' : null} />
      </div>

      <div className="mt-5">
        <div className="w-full flex justify-between items-center mb-3">
          <h1 className="font-[600] font-poppins text-gray-600">Questions</h1>
          <Button variant="ghost" onClick={sCtx.handleAddQuestion}>
            Add a question +
          </Button>
        </div>

        <ol className="flex flex-col w-full">
          {sCtx.questions.map((question, index) => (
            <QuestionInput
              key={question._id}
              index={index + 1}
              handleAddQuestion={sCtx.handleAddQuestion}
              name={question._id.toString()}
              value={question.questionText}
              onChange={sCtx.handleQuestionChange}
              handleDeleteQuestion={() => sCtx.handleDeleteQuestion(question._id)}
              error={isEmpty?._id === question._id && emptyQuestion ? 'Please fill out this question' : null}
            />
          ))}
        </ol>

        <div className="flex gap-[80px] justify-between items-center mt-10">
          <Button variant="outline" type="button" className="w-full" onClick={sCtx.resetForms}>
            Cancel
          </Button>
          <Button className="w-full">Preview Survey</Button>
        </div>
      </div>
    </form>
  );
};

export default CreateSurvey;
