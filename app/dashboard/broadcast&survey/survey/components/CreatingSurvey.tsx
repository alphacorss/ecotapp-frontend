import React from 'react';

import CreateSurvey from './CreateSurvey';
import Preview from './Preview';
import SurveyCtx from '@/app/_context/Survey';

const CreatingSurvey = () => {
  const { showPreview } = React.useContext(SurveyCtx);

  return <>{showPreview ? <Preview /> : <CreateSurvey />}</>;
};

export default CreatingSurvey;
