import React from 'react';

import Responses from './Responses';
import ErrorMessage from '@/app/components/utils/ErrorMessage';
import Loader from '@/app/components/utils/Loader';
import Main from '@/app/context/Main';
import Queries from '@/app/context/Queries';
import SurveyCtx from '@/app/context/Survey';
import useClearErrorMessage from '@/app/hooks/useClearErrorMessage';
import { Modals } from '@/app/slices/ModalSlice';
import { Button } from '@/components/ui/button';
import { getUserAnswer, hasUserResponded } from '@/lib/utils';

interface IResponse {
  questionId: string;
  response: string;
}

const Respond = () => {
  const { surveyInfo, setSurveyInfo } = React.useContext(SurveyCtx);
  const [error, setError] = React.useState(false);
  const { respondToSurvey } = React.useContext(Queries);
  const { handleOpenModal } = React.useContext(Main);
  const hasResponded = hasUserResponded(surveyInfo?.filledBy || {});
  const userAnswer = getUserAnswer(surveyInfo);

  const { reset, isPending, isError, error: backenderror, isSuccess } = respondToSurvey;

  React.useEffect(() => {
    if (isError) {
      setError(true);
    }

    if (isSuccess) {
      handleOpenModal(Modals.surveySubmiited);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, backenderror]);

  const r = surveyInfo?.questions.map((question) => ({
    questionId: question._id,
    response: '',
  }));

  const [responses, setResponses] = React.useState<IResponse[]>(r || []);

  const handleChange = (info: { questionId: string; response: string }) => {
    setResponses((prev) => {
      return prev.map((response) => {
        if (response.questionId === info.questionId) {
          return {
            ...response,
            response: info.response,
          };
        }
        return response;
      });
    });
  };

  const handleRespondToSurvey = () => {
    const hasEmpty = responses.some((response) => response.response === '');

    if (hasEmpty) {
      setError(true);
      return;
    }

    respondToSurvey.mutate({
      surveyId: surveyInfo?._id,
      responses,
    });
  };

  useClearErrorMessage(error, setError);

  return (
    <>
      {surveyInfo && (
        <div>
          <p className="text-2xl font-[600] my-5">{surveyInfo.title}</p>
          <p className="font-[500] text-sm text-gray-700 mb-10">{surveyInfo.description}</p>
          <div className="">
            <div className="w-full flex justify-between items-center mb-5">
              <h1 className="font-[600]">Questions</h1>
              <div className="flex gap-10 items-center justify-between">
                <p className="font-[600]">Yes</p>
                <p className="font-[600]">No</p>
              </div>
            </div>

            <ol className="flex flex-col w-full">
              {surveyInfo.questions.map((question, index) =>
                userAnswer && userAnswer[index] ? (
                  <Responses
                    key={question._id}
                    question={question}
                    index={index}
                    userAnswer={userAnswer}
                    handleChange={handleChange}
                  />
                ) : (
                  <Responses
                    index={index}
                    key={question._id}
                    question={question}
                    userAnswer={userAnswer}
                    handleChange={handleChange}
                  />
                ),
              )}
            </ol>

            <div className="flex gap-[80px] justify-between items-center mt-10 mb-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  reset();
                  setSurveyInfo(null);
                }}
              >
                Cancel
              </Button>
              <Button className="w-full" disabled={isPending || hasResponded} onClick={handleRespondToSurvey}>
                {isPending ? 'Sending...' : hasResponded ? 'Already responded' : 'Submit'}
                {isPending && <Loader />}
              </Button>
            </div>
            <ErrorMessage
              error={
                error && (backenderror as any)?.response
                  ? (backenderror as any)?.response?.data?.message
                  : error
                    ? 'Please respond to all questions before submitting'
                    : null
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Respond;
