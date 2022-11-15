import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_API_URL } from '@env';

export const GET = 'GET';
export const FIND = 'FIND';
export const SAVE = 'POST';
export const UPDATE = 'PATCH';
export const DELETE = 'DELETE';

const loginPath = '/api/auth';

export const token = async () => await AsyncStorage.getItem('token');

const API = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: { 
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": null ,
    "Accept":"*/*"
  },
});

export async function login (email, password) {
  return await API.post(loginPath, { email, password });
};

API.interceptors.request.use(async config => {
  if (!(config.url === loginPath)) {
    const sToken = await token();
      if (sToken) {
        config.headers.Authorization = `Bearer ${sToken}`;
      }
  }
  console.log(); // ! Not remove
  return config;
});

/**
 * Generic function to make api calls
 * @param {ENUM} operation - Consts FIND, GET, SAVE or UPDATE
 * @param {string} model - Model name in API
 * @param {object} payload - Data to send
 * @param {object} params - Object that can contain id of model or queries and skip for find calls.
 */
  export async function process(operation, model, payload = {}, params = {}) {
  const { id, queries, limit, skip } = params || {};

  switch (operation) {
    // case FIND:
    //   return await API.get(
    //     `/api/${model}?${queries ? queries + '&' : ''}${
    //       limit ? '$limit=' + limit : ''
    //     }&$skip=${skip}`,
    //     null,
    //     oAuth
    //   );
    case FIND:
      return await API.get(`/api/${model}`);
    case GET:
      return await API.get(`/api/${model}/${id}${queries || ''}`, null);
    case SAVE:
      return await API.post(`/api/${model}`, payload);
    case UPDATE:
      return await API.patch(`/api/${model}/${id}`, payload);
    case DELETE:
      return await API.delete(`/api/${model}/${id}`, null);
    default:
      return null;
  }
};