import { backendRequestOptions } from '../helpers/cookie';
import { IDemographics } from '../types/GlobalState';
import { getApiURL } from '../helpers/utils';


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
      Instead of 201, received ${response.status} with response:\n ${response.body}`)
    }
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
  return fetch(`${API_URL}/v1/index/?format=json`, options).then(
    res => res.json());
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
