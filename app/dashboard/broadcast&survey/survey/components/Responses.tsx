import React from 'react';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const Responses = ({
  question,
  index,
  userAnswer,
  handleChange,
}: {
  question: { _id: string; questionText: string };
  index: number;
  userAnswer: any[];
  // eslint-disable-next-line no-unused-vars
  handleChange: (info: { questionId: string; response: string }) => void;
}) => {
  return (
    <li key={question._id} className="w-full flex justify-between items-center gap-5">
      <div className="flex items-center mr-3">
        <span className="mr-3 text-sm font-[600]">{index + 1}.</span>
        <div className="flex w-full justify-between items-center rounded-[var(--rounded)] p-2">
          <span className="font-[500] text-sm text-gray-700">{question.questionText}</span>
        </div>
      </div>
      <RadioGroup
        disabled={userAnswer[index]}
        className="flex gap-10 items-center justify-between"
        value={userAnswer[index]}
        onValueChange={(e) => {
          handleChange({
            questionId: question._id,
            response: e,
          });
        }}
      >
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
  );
};

export default Responses;
