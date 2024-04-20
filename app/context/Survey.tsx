/* eslint-disable no-unused-vars */
import React, { createContext } from 'react';

import Main from './Main';
import Queries from './Queries';
import useEditableDiv from '../hooks/useEditableDiv';
import { Modals } from '../slices/ModalSlice';
import { TComboBoxSelector, TQuestion, TSurveyData } from '../types';

export type TSurveyCtx = {
  surveyId: string;
  setSurveyId: React.Dispatch<React.SetStateAction<string>>;
  surveyInfo: TSurveyData | null;
  setSurveyInfo: React.Dispatch<React.SetStateAction<TSurveyData | null>>;
  showResponse: (data: TSurveyData) => void;
  handleShowDeleteModal: (id: string) => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  titleRef: React.RefObject<HTMLInputElement>;
  questions: TQuestion[];
  handleAddQuestion: () => void;
  handleDeleteQuestion: (id: string) => void;
  handleQuestionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  creatingSurvey: boolean;
  setCreatingSurvey: React.Dispatch<React.SetStateAction<boolean>>;
  showPreview: boolean;
  sendToTenant: string;
  setSendToTenant: React.Dispatch<React.SetStateAction<string>>;
  sendToOption: TComboBoxSelector[];
  setSendToOption: React.Dispatch<React.SetStateAction<TComboBoxSelector[]>>;
  handleSubmitQuestions: () => void;
  handleShowSurveyDetailsModal: (id: string) => void;
  resetForms: () => void;
};

const SurveyCtx = createContext<TSurveyCtx>({
  surveyId: '',
  setSurveyId: () => {},
  surveyInfo: null,
  setSurveyInfo: () => {},
  showResponse: (data: TSurveyData) => {},
  handleShowDeleteModal: () => {},
  title: '',
  setTitle: () => {},
  description: '',
  setDescription: () => {},
  titleRef: React.createRef<HTMLInputElement>(),
  questions: [],
  handleAddQuestion: () => {},
  handleDeleteQuestion: () => {},
  handleQuestionChange: () => {},
  setShowPreview: () => {},
  creatingSurvey: false,
  setCreatingSurvey: () => {},
  showPreview: false,
  sendToTenant: '',
  setSendToTenant: () => {},
  sendToOption: [],
  setSendToOption: () => {},
  handleSubmitQuestions: () => {},
  handleShowSurveyDetailsModal: () => {},
  resetForms: () => {},
});

export function SurveyCtxProvider({ children }: React.PropsWithChildren<{}>) {
  const { createSurvey } = React.useContext(Queries);
  const { handleCloseModal, handleOpenModal } = React.useContext(Main);
  const [surveyId, setSurveyId] = React.useState<string>('');
  const [creatingSurvey, setCreatingSurvey] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [sendToTenant, setSendToTenant] = React.useState<string>('all');
  const [sendToOption, setSendToOption] = React.useState<TComboBoxSelector[]>([]);
  const [surveyInfo, setSurveyInfo] = React.useState<TSurveyData | null>(null);

  const titleRef = React.useRef(null);
  useEditableDiv(title, titleRef);

  const [questions, setQuestions] = React.useState<TQuestion[]>([
    {
      _id: Date.now().toString(),
      questionText: '',
    },
  ]);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setQuestions((prev) => {
      return prev.map((question) => {
        if (question._id.toString() === id) {
          return {
            ...question,
            questionText: value,
          };
        }
        return question;
      });
    });
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        _id: Date.now().toString(),
        questionText: '',
      },
    ]);
  };

  const handleDeleteQuestion = (id: string) => {
    if (questions.length === 1) return;
    setQuestions((prev) => prev.filter((question) => question._id !== id));
  };

  const handleShowSurveyDetailsModal = (id: string) => {
    setSurveyId(id);
    handleOpenModal(Modals.viewSurveyModal);
  };

  const handleShowDeleteModal = (id: string) => {
    setSurveyId(id);
    handleOpenModal(Modals.deleteSurveyModal);
  };

  const handleSubmitQuestions = () => {
    if (sendToTenant === 'all') {
      const data = {
        title,
        questions: questions.map((el) => ({ questionText: el.questionText })),
        description,
        to: ['all'],
      };
      createSurvey.mutate(data);
    } else {
      const data = {
        title,
        questions: questions.map((el) => ({ questionText: el.questionText })),
        description,
        to: [`${sendToTenant}_${sendToOption[0]?.value}`],
      };
      createSurvey.mutate(data);
    }
  };

  const showResponse = (data: TSurveyData) => {
    setShowPreview(false);
    setCreatingSurvey(false);
    setSurveyInfo(data);
  };

  const resetForms = () => {
    setCreatingSurvey(false);
    setShowPreview(false);
    handleCloseModal(Modals.createSurveyModal);
    handleCloseModal(Modals.viewSurveyModal);
    setSurveyId('');
    setTitle('');
    setDescription('');
    setQuestions([
      {
        _id: Date.now().toString(),
        questionText: '',
      },
    ]);
  };

  const contextValue = {
    surveyInfo,
    setSurveyInfo,
    showResponse,
    handleShowDeleteModal,
    title,
    setTitle,
    description,
    setDescription,
    titleRef,
    questions,
    handleAddQuestion,
    handleDeleteQuestion,
    handleQuestionChange,

    setShowPreview,
    creatingSurvey,
    setCreatingSurvey,
    showPreview,
    sendToTenant,
    setSendToTenant,
    sendToOption,
    setSendToOption,
    handleSubmitQuestions,
    handleShowSurveyDetailsModal,
    resetForms,
    handleOpenModal,
    handleCloseModal,
    surveyId,
    setSurveyId,
  };

  return <SurveyCtx.Provider value={contextValue}>{children}</SurveyCtx.Provider>;
}

export default SurveyCtx;
