import cookie from 'cookie';

import {IDemographics} from "../types/GlobalState";
import {backendRequestOptions} from "../helpers/cookie";
import config from '../../config';

const API_URL =  config('apiURL');

export const submitDemographics = (data: IDemographics) => {
  return fetch(`${ API_URL }/api/demographics/`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: "include",
    }
  )
}


export const fetchAboutData = () => {
  return fetch(`${ API_URL }/about`, {
    credentials: 'include',
  })
    .then(res => res.json())
}

export const fetchProfileData = (sessionKey: string) => {
  return fetch(`${ API_URL }/profile/${ sessionKey }`, {
    credentials: 'include',
  })
    .then(res => res.json())
}

export const fetchSessionData = (req?: any) => {
  const options = __SERVER__ ? backendRequestOptions(req) : {
    credentials: 'include',
  };
  return fetch(`${ API_URL }/api/index`, options)
    .then(res => res.json())
}
