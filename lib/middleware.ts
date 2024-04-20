import axios from 'axios';

import { getRole, getToken } from './utils';

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // get token from cookie
    getToken() !== '' && (config.headers.Authorization = `Bearer ${getToken()}`);
    getRole() !== undefined && (config.headers.role = getRole());
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  },
);

export default axios;
