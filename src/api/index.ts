import config from '../../config';
import { backendRequestOptions } from '../helpers/cookie';
import { IDemographics } from '../types/GlobalState';

const API_URL = config('apiURL');

export const submitDemographics = (data: IDemographics) => {
  return fetch(`${API_URL}/api/demographics/`, {
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
  return fetch(`${API_URL}/api/about?format=json`, {
    credentials: 'include',
  }).then(res => res.json());
};

export const fetchProfileData = (sessionKey: string) => {
  return fetch(`${API_URL}/api/profile/${sessionKey}?format=json`, {
    credentials: 'include',
  }).then(res => res.json());
};

export const fetchSessionData = (req?: any) => {
  const options = __SERVER__
    ? backendRequestOptions(req)
    : {
        credentials: 'include',
      };
  return fetch(`${API_URL}/api/index/?format=json`, options).then(res =>
    res.json()
  );
};

export const getDatasetRecordings = (req?: any) => {
  const options = __SERVER__
    ? backendRequestOptions(req)
    : {
        credentials: 'include',
      };
  return fetch(`${API_URL}/api/download-audio/?format=json`, options).then(
    res => res.json()
  );
};
