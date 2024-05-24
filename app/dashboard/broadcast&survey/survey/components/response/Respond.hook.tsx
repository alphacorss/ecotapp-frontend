import React from 'react';

import Main from '@/app/_context/Main';
import Queries from '@/app/_context/Queries';
import SurveyCtx from '@/app/_context/Survey';
import useClearErrorMessage from '@/app/_hooks/useClearErrorMessage';
import { Modals } from '@/app/_slices/ModalSlice';
import { getUserAnswer, hasUserResponded } from '@/lib/utils';

interface IResponse {
  questionId: string;
  response: string;
}

const useRespond = () => {
  const { surveyInfo, setSurveyInfo } = React.useContext(SurveyCtx);
  const [error, setError] = React.useState(false);
  const { respondToSurvey } = React.useContext(Queries);
  const { handleOpenModal, isMobile } = React.useContext(Main);
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

  return {
    isMobile,
    surveyInfo,
    setSurveyInfo,
    error,
    backenderror,
    isPending,
    hasResponded,
    userAnswer,
    handleChange,
    reset,
    handleRespondToSurvey,
  };
};

export default useRespond;
