import config from '../../config';
import { backendRequestOptions } from '../helpers/cookie';
import { IDemographics } from '../types/GlobalState';

const API_URL = __DEVELOPMENT__ ? 'http://localhost:8000' : config('apiURL');

export const submitDemographics = (data: IDemographics) => {
  return fetch(`${API_URL}/v1/demographics/`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
  });
};

export const fetchAboutData = () => {
  return fetch(`${API_URL}/v1/about/?format=json`, {
    credentials: 'include',
  }).then(res => res.json());
};

export const fetchProfileData = (sessionId: string) => {
  return fetch(`${API_URL}/v1/profile/${sessionId}?format=json`, {
    credentials: 'include',
  }).then(res => res.json());
};

export const fetchSessionData = (req?: any) => {
  const options = __SERVER__
    ? backendRequestOptions(req)
    : {
        credentials: 'include',
      };
  return fetch(`${API_URL}/v1/index/?format=json`, options).then(res =>
    res.json()
  );
};

export const getDatasetRecordings = (req?: any) => {
  const options = __SERVER__
    ? backendRequestOptions(req)
    : {
        credentials: 'include',
      };
  return fetch(`${API_URL}/download-audio/?format=json`, options).then(
    res => res.json()
  );
};
