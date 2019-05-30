import { IRecognitionRequest } from '../types/GlobalState';
import { getApiURL } from '../client/utils/apiUtils';

const API_URL: string = getApiURL();

export const fetchIqraRecogniton = (req: IRecognitionRequest) => {
  /** Request a search for a certain ayah from the iqra API. */
  const { arabicText, translation } = req;
  return fetch(`${API_URL}/iqra/search/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      arabicText,
      translation,
    }),
  }).then(res => res.json)
};
