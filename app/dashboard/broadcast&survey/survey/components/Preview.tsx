import React, { useContext } from 'react';

import ErrorMessage from '@/app/components/utils/ErrorMessage';
import Loader from '@/app/components/utils/Loader';
import Main from '@/app/context/Main';
import Queries from '@/app/context/Queries';
import SurveyCtx from '@/app/context/Survey';
import { Modals } from '@/app/slices/ModalSlice';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Preview = () => {
  const {
    title,
    description,
    showPreview,
    setShowPreview,
    questions,
    setCreatingSurvey,
    handleSubmitQuestions,
    resetForms,
  } = React.useContext(SurveyCtx);

  const { createSurvey } = useContext(Queries);

  const { handleOpenModal } = useContext(Main);
  const [error, setError] = React.useState(false);
  const { isPending, isError, reset, error: backenderror, isSuccess } = createSurvey;

  React.useEffect(() => {
    if (isError) {
      setError(true);
    }

    if (isSuccess) {
      reset();
      resetForms();
      handleOpenModal(Modals.surveySentModal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, backenderror]);

  return (
    <div>
      <p className="text-2xl font-[600] my-5">{title}</p>
      <p className="font-[500] text-sm text-gray-700 mb-10">{description}</p>
      <div className="">
        <div className="w-full flex justify-between items-center mb-5">
          <h1 className="font-[600]">Questions</h1>
          <div className="flex gap-10 items-center justify-between">
            <p className="font-[600]">Yes</p>
            <p className="font-[600]">No</p>
          </div>
        </div>

        <ol className="flex flex-col w-full">
          {questions.map((question, index) => (
            <li key={question._id} className="w-full flex justify-between items-center gap-5">
              <div className="flex items-center mr-3">
                <span className="mr-3 text-sm font-[600]">{index + 1}.</span>
                <div className="flex w-full justify-between items-center rounded-[var(--rounded)] p-2">
                  <span className="font-[500] text-sm text-gray-700">{question.questionText}</span>
                </div>
              </div>
              <RadioGroup disabled className="flex gap-10 items-center justify-between">
                <div className="flex items-center ">
                  <RadioGroupItem value="yes" id="yes" />
                  <label htmlFor="yes"></label>
                </div>
                <div className="flex items-center ">
                  <RadioGroupItem value="no" id="no" />
                  <label htmlFor="no"></label>
                </div>
              </RadioGroup>
            </li>
          ))}
        </ol>

        <div className="flex  gap-[80px] justify-between items-center mt-10">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => (showPreview ? setShowPreview(false) : setCreatingSurvey(false))}
          >
            {showPreview ? 'Go back' : ' Cancel'}
          </Button>
          <Button className="w-full" disabled={isPending} onClick={handleSubmitQuestions}>
            {isPending ? 'Sending...' : 'Send Survey'}
            {isPending && <Loader />}
          </Button>
        </div>
        <ErrorMessage error={error ? 'Please fill out the title and description' : null} />
      </div>
    </div>
  );
};

export default Preview;
