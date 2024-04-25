import axios from './middleware';
import { TFormUser, TRole } from '@/app/types';
import { baseUrl } from '@/lib/utils';

//lists
const listByRoleRq = async (role: TRole) => {
  const { data } = await axios.get(`${baseUrl}/profile/list${role}`);
  return data;
};

const listByRoleByOrgId = async (id: string, role: TRole) => {
  const response = await axios.get(`${baseUrl}/profile/list${role}/${id}`);
  return response;
};

//user
const getUserRq = async (id: string, role: TRole) => {
  const response = await axios.get(`${baseUrl}/profile/get${role}/${id}`);
  return response;
};

const deleteUserRq = async (id: string, role: TRole) => {
  const response = await axios.delete(`${baseUrl}/profile/admindelete${role}/${id}`);
  return response;
};

const addUserRq = async (data: TFormUser) => {
  const response = await axios.post(`${baseUrl}/auth/signup${data.role}`, data);
  return response;
};

const editUserRq = async (data: { data: TFormUser; id: string; role: TRole }) => {
  const response = await axios.put(`${baseUrl}/profile/adminedit${data.role}/${data.id}`, data);
  return response;
};

const resetPasswordRq = async (email: string) => {
  const response = await axios.post(`${baseUrl}/auth/requestpasswordreset`, {
    email,
  });
  return response;
};

//organizations
const getOrganizationsRq = async () => {
  const { data } = await axios.get(`${baseUrl}/business/listorganization`);
  return data;
};

const getOrganizationRq = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/business/getorganization/${id}`);
  return data;
};

const addOrgRq = async (data: TFormUser) => {
  const response = await axios.post(`${baseUrl}/business/createorganization`, data);
  return response;
};

const editOrgRq = async (data: { data: TFormUser; id: string }) => {
  const response = await axios.put(`${baseUrl}/business/editorganization/${data.id}`, data);
  return response;
};

const deleteOrgRq = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/business/deleteorganization/${id}`);
  return response;
};

//facilities
const getFacilitiesRq = async () => {
  const { data } = await axios.get(`${baseUrl}/business/listfacility`);
  return data;
};

const getFacilityRq = async (id: string) => {
  const response = await axios.get(`${baseUrl}/business/getfacility/${id}`);
  return response;
};

const editFacilityRq = async (data: any) => {
  const response = await axios.put(`${baseUrl}/business/editfacility/${data.id}`, data);
  return response;
};

const addFacilityRq = async (data: any) => {
  const response = await axios.post(`${baseUrl}/business/createfacility`, data);
  return response;
};

const deleteFacilityRq = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/business/deletefacility/${id}`);
  return response;
};

//profile
const updateProfileRq = async (data: {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  role: TRole;
}) => {
  const password = data.password !== '' ? data.password : undefined;
  const response = await axios.put(`${baseUrl}/profile/edit${data.role}`, {
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    password,
  });
  return response;
};

const resetPasswordInAppRq = async (data: { currentPasword: string; newPassword: string }) => {
  const response = await axios.post(`${baseUrl}/auth/forgetpasswordinapp`, {
    oldPassword: data.currentPasword,
    newPassword: data.newPassword,
  });
  return response;
};

//broadcast
const sendMessageRq = async (info: { subject: string; content: string; to: string[] }) => {
  const formData = new FormData();
  formData.append('subject', info.subject);
  formData.append('content', info.content);
  info.to.forEach((role) => formData.append('to', role));

  const { data } = await axios.post(`${baseUrl}/business/createmessage`, formData);
  return data;
};

const getMyMessagesRq = async () => {
  const { data } = await axios.get(`${baseUrl}/business/mymessages`);
  return data;
};

//survey
const createSurveyRq = async (info: { title: string; description: string; questions: { questionText: string }[] }) => {
  const { data } = await axios.post(`${baseUrl}/business/createsurvey`, info);
  return data;
};

const mySurveysRq = async () => {
  const { data } = await axios.get(`${baseUrl}/business/mysurvey`);
  return data;
};

const surverDetailRq = async (id: string) => {
  const { data } = await axios.get(`${baseUrl}/business/survey/${id}`);
  return data;
};

const createdSurveysRq = async () => {
  const { data } = await axios.get(`${baseUrl}/business/allsurvey`);
  return data;
};

const respondToSurveyRq = async (info: { surveyId: string; responses: { questionId: string; response: string }[] }) => {
  const responsesData = Object.fromEntries(info.responses.map((response) => [response.questionId, response.response]));

  const { data } = await axios.put(`${baseUrl}/business/mysurvey/answer/${info.surveyId}`, responsesData);

  return data;
};

const deleteSurveyRq = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/business/deletesurvey/${id}`);
  return response;
};

const tenantDeleteSurveyRq = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/business/mysurvey/${id}`);
  return response;
};

// homepage data
const homeCardsRq = async (q: string) => {
  const response = await axios.get(`${baseUrl}/statistic/appstat/organizatiofacilitytenantinfo?q=${q}`);
  return response;
};

const homeCardsFacilityRq = async (q: string, faciltyId: string) => {
  const response = await axios.get(`${baseUrl}/statistic/appstat/tenantinfo/${faciltyId}?q=${q}`);
  return response;
};

const homeChartsRq = async (date: string, unit: string) => {
  const response = await axios.get(`${baseUrl}/statistic/energyStat/history?date=${date}&unit=${unit}`);
  return response;
};

const homeChartsTntRq = async (date: string, unit: string) => {
  const response = await axios.get(`${baseUrl}/statistic/energyStat/history?date=${date}&unit=${unit}`);
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  listByRoleRq,
  listByRoleByOrgId,
  getUserRq,
  deleteUserRq,
  addUserRq,
  editUserRq,
  resetPasswordRq,
  getOrganizationsRq,
  getOrganizationRq,
  addOrgRq,
  editOrgRq,
  deleteOrgRq,
  getFacilitiesRq,
  getFacilityRq,
  editFacilityRq,
  addFacilityRq,
  deleteFacilityRq,
  updateProfileRq,
  resetPasswordInAppRq,
  sendMessageRq,
  getMyMessagesRq,
  createSurveyRq,
  mySurveysRq,
  surverDetailRq,
  createdSurveysRq,
  respondToSurveyRq,
  deleteSurveyRq,
  tenantDeleteSurveyRq,
  homeCardsRq,
  homeCardsFacilityRq,
  homeChartsRq,
  homeChartsTntRq,
};
