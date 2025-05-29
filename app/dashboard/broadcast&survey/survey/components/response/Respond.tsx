import React, { useState } from 'react';

import useRespond from './Respond.hook';
import ErrorMessage from '@/app/_components/utils/ErrorMessage';
import Loader from '@/app/_components/utils/Loader';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Respond = () => {
  const {
    isMobile,
    surveyInfo,
    setSurveyInfo,
    isPending,
    hasResponded,
    error,
    backenderror,
    handleChange,
    reset,
    handleRespondToSurvey,
  } = useRespond();

  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({});

  // Helper: Get the current user's response (if any)
  const getCurrentUserAnswers = () => {
    const userId = surveyInfo?.responses?.[0]?.user; // Assumes only one response per user
    const userResponse = surveyInfo?.responses?.find((r) => r.user === userId);
    if (!userResponse) return {};
    return userResponse.answers.reduce((acc: any, ans: any) => {
      acc[ans.question] = ans.answer;
      return acc;
    }, {});
  };

  const currentUserAnswers = getCurrentUserAnswers();

  // Handler for radio change
  const handleRadioChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

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
              {surveyInfo?.questions?.map((question, index) => {
                const alreadyAnswered = currentUserAnswers[question._id];
                return (
                  <li
                    key={question._id}
                    className="w-full flex lg:justify-between items-start lg:gap-0 gap-3 flex-col mb-8 lg:mb-5 lg:flex-row"
                  >
                    <div className="flex mr-3">
                      <span className="mr-3 text-sm font-[600]">{index + 1}.</span>
                      <div className="flex w-full justify-between items-center rounded-[var(--rounded)]">
                        <span className="font-[500] text-sm text-gray-700">{question.questionText}</span>
                      </div>
                    </div>
                    <RadioGroup
                      disabled={!!alreadyAnswered}
                      className="flex gap-10 items-center lg:justify-between ml-6"
                      value={alreadyAnswered ? alreadyAnswered : answers[question._id] || ''}
                      onValueChange={(e) => {
                        handleRadioChange(question._id, e);
                        handleChange({
                          questionId: question._id,
                          response: e,
                        });
                      }}
                    >
                      {isMobile ? (
                        <div className="flex gap-5 items-center">
                          <div className="flex items-center">
                            <label htmlFor={`yes-${question._id}`} className="font-[500] mr-2">
                              Yes
                            </label>
                            <RadioGroupItem value="yes" id={`yes-${question._id}`} />
                          </div>
                          <div className="flex items-center">
                            <label htmlFor={`no-${question._id}`} className="font-[500] mr-2">
                              No
                            </label>
                            <RadioGroupItem value="no" id={`no-${question._id}`} />
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center ">
                            <RadioGroupItem value="yes" id={`yes-${question._id}`} />
                            <label htmlFor={`yes-${question._id}`}></label>
                          </div>
                          <div className="flex items-center ">
                            <RadioGroupItem value="no" id={`no-${question._id}`} />
                            <label htmlFor={`no-${question._id}`}></label>
                          </div>
                        </>
                      )}
                    </RadioGroup>
                  </li>
                );
              })}
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
