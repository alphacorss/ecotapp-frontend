import { Trash } from 'iconsax-react';
import React from 'react';

import ErrorMessage from '@/app/_components/utils/ErrorMessage';

type QuestionInputProps = {
  index: number;
  name: string;
  value: string;
  error?: string | null;
  handleAddQuestion: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteQuestion: () => void;
};

const QuestionInput = ({
  index,
  name,
  value,
  error,
  handleAddQuestion,
  onChange,
  handleDeleteQuestion,
}: QuestionInputProps) => {
  return (
    <li className="w-full mb-3">
      <label className="w-full flex items-center mb-1">
        <span className={`mr-3 text-sm font-[600] ${error ? 'text-red-500' : 'text-gray-600'}`}>{index}.</span>
        <div
          className={`flex w-full justify-between items-center border rounded-[var(--rounded)] p-3 ${
            error ? 'border-red-500' : ''
          }`}
        >
          <input
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddQuestion();
              }
            }}
            className="w-full placeholder:text-sm placeholder:font-[500] placeholder:text-gray-300 text-gray-600 text-sm font-[500] bg-transparent border-none outline-0 ring-0"
            placeholder="Enter your survey question"
          />
          <Trash onClick={handleDeleteQuestion} className="h-5 w-5 ml-2 cursor-pointer text-gray-600" />
        </div>
      </label>
      <ErrorMessage error={error} />
    </li>
  );
};

export default QuestionInput;
