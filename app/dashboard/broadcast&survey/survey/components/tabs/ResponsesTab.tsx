import React from 'react';

import { ResponseTabColumns } from './responseColumn';
import DataTable from '@/app/_components/tables/Table';
import { TQuestion, TResponseTable, TSurveyData } from '@/app/types';

const ResponsesTab = ({ surveyDetail }: { surveyDetail: TSurveyData | undefined }) => {
  const convertToTable = (questions: TQuestion[] | undefined) => {
    const tableData: TResponseTable[] = [];

    if (!questions) {
      return tableData;
    }

    questions.forEach((question) => {
      question?.responses?.forEach((response) => {
        tableData.push({
          question: question.questionText,
          emailAddress: response.email,
          answer: response.answer,
        });
      });
    });

    return tableData;
  };

  return (
    <div>
      <DataTable
        data={convertToTable(surveyDetail?.questions) || []}
        columns={ResponseTabColumns() as any[]}
        showMultiView={false}
      />
    </div>
  );
};

export default ResponsesTab;
