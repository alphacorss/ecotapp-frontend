import React, { useContext } from 'react';

import { InputComponent } from '@/app/components/inputs/InputComponent';
import Main from '@/app/context/Main';
import SurveyCtx from '@/app/context/Survey';
import useClearErrorMessage from '@/app/hooks/useClearErrorMessage';
import { Modals } from '@/app/slices/ModalSlice';
import { Button } from '@/components/ui/button';

const CreateTitle = () => {
  const { title, setTitle, setCreatingSurvey } = React.useContext(SurveyCtx);
  const { handleCloseModal } = useContext(Main);
  const [error, setError] = React.useState(false);
  useClearErrorMessage(error, setError);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full text-center">
      <h1 className="text-3xl font-[600] mt-5">Survey Title</h1>
      <p className="text-sm font-[500] text-gray-500 mt-3 mb-5">
        To begin your survey, create a compelling title that captures the essence of your survey.
      </p>
      <InputComponent
        id="survey-title"
        name="survey-title"
        value={title}
        autoComplete="off"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Survey Title"
        error={error ? 'Please fill out the title' : undefined}
      />
      <Button
        className="mt-10 mb-2 w-full"
        onClick={() => {
          if (title.trim() === '') {
            setError(true);
            return;
          }

          handleCloseModal(Modals.createSurveyModal);
          setCreatingSurvey(true);
        }}
      >
        Proceed
      </Button>
    </form>
  );
};

export default CreateTitle;
