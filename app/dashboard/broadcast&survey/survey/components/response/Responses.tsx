import React from 'react';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Responses = ({
  index,
  isMobile,
  question,
  userAnswer,
  handleChange,
}: {
  index: number;
  isMobile: boolean;
  userAnswer: any[];
  question: { _id: string; questionText: string };
  handleChange: (info: { questionId: string; response: string }) => void;
}) => {
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
        disabled={userAnswer[index]}
        className="flex gap-10 items-center lg:justify-between"
        value={userAnswer[index]}
        onValueChange={(e) => {
          handleChange({
            questionId: question._id,
            response: e,
          });
        }}
      >
        {isMobile ? (
          <div className="flex gap-5 items-center ml-6">
            <div className="flex items-center">
              <label htmlFor="yes" className="font-[500] mr-2">
                Yes
              </label>
              <RadioGroupItem value="yes" id="yes" />
            </div>
            <div className="flex items-center">
              <label htmlFor="no" className="font-[500] mr-2">
                No
              </label>
              <RadioGroupItem value="no" id="no" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center ">
              <RadioGroupItem value="yes" id="yes" />
              <label htmlFor="yes"></label>
            </div>
            <div className="flex items-center ">
              <RadioGroupItem value="no" id="no" />
              <label htmlFor="no"></label>
            </div>
          </>
        )}
      </RadioGroup>
    </li>
  );
};

export default Responses;
