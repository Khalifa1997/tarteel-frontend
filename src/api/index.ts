import { backendRequestOptions } from '../helpers/cookie';
import { IDemographics } from '../types/GlobalState';
import { getApiURL } from '../client/utils/apiUtils';

const API_URL: string = getApiURL();

export const submitDemographics = (data: IDemographics) => {
  /**
   * Posts a demographic to the database. Checks to make sure the response is
   * valid (201) as well.
   *
   * @param data - Custom {@link IDemographics | demographic} type.
   * @returns Response to the 'v1/demographic/ URL
   */
  return fetch(`${API_URL}/v1/demographic/`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
  }).then(response => {
    if (response.status !== 201) {
      console.log(`Unable to create a demographic! 
      Instead of 201, received ${response.status} with response:\n ${
        response.body
      }`);
    }
  });
};

export const fetchAboutData = () => {
  /** Load the about page data from the backend. */
  const options: object = {
    credentials: 'include',
  };
  return fetch(`${API_URL}/v1/about/?format=json`, options)
    .then(res => res.json());
};

export const fetchProfileData = (sessionId: string) => {
  /** Get the profile data for a specific session id/user. */
  const options: object = {
    credentials: 'include',
    mode: 'cors',
  };
  return fetch(`${API_URL}/v1/profile/${sessionId}/?format=json`, options)
    .then(res => res.json());
};

export const fetchSessionData = (req?: any) => {
  /** Get the user stats based on their session ID. */
  const options: object = __SERVER__
    ? backendRequestOptions(req)
    : {
        credentials: 'include',
      };
  return fetch(`${API_URL}/v1/index/?format=json`, options)
    .then(res => res.json());
};

export const getDatasetRecordings = (req?: any) => {
  /** Download page request for CSV and random audio files. */
  const options: object = __SERVER__
    ? backendRequestOptions(req)
    : {
        credentials: 'include',
      };
  return fetch(`${API_URL}/v1/download-audio/?format=json`, options)
    .then(res => res.json());
};
