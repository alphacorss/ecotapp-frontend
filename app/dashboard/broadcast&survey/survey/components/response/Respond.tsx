import React from 'react';

import useRespond from './Respond.hook';
import Responses from './Responses';
import ErrorMessage from '@/app/_components/utils/ErrorMessage';
import Loader from '@/app/_components/utils/Loader';
import { Button } from '@/components/ui/button';

const Respond = () => {
  const {
    isMobile,
    surveyInfo,
    setSurveyInfo,
    userAnswer,
    isPending,
    hasResponded,
    error,
    backenderror,
    reset,
    handleChange,
    handleRespondToSurvey,
  } = useRespond();

  return (
    <>
      {surveyInfo && (
        <div>
          <p className="text-2xl font-[600] my-5">{surveyInfo.title}</p>
          <p className="font-[500] text-sm text-gray-700 mb-10">{surveyInfo.description}</p>
          <div className="">
            <div className="w-full flex justify-between items-center mb-5">
              <h1 className="font-[600]">Questions</h1>
              {!isMobile && (
                <div className="flex gap-10 items-center justify-between">
                  <p className="font-[600]">Yes</p>
                  <p className="font-[600]">No</p>
                </div>
              )}
            </div>

            <ol className="flex flex-col w-full">
              {surveyInfo.questions.map((question, index) =>
                userAnswer && userAnswer[index] ? (
                  <Responses
                    index={index}
                    isMobile={isMobile}
                    question={question}
                    key={question._id}
                    userAnswer={userAnswer}
                    handleChange={handleChange}
                  />
                ) : (
                  <Responses
                    index={index}
                    isMobile={isMobile}
                    key={question._id}
                    question={question}
                    userAnswer={userAnswer}
                    handleChange={handleChange}
                  />
                ),
              )}
            </ol>

            <div className="flex flex-col gap-4 lg:flex-row lg:gap-[80px] justify-between items-center mt-10 mb-3">
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
