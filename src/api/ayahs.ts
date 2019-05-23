import { backendRequestOptions } from '../helpers/cookie';
import { getApiURL } from '../client/utils/apiUtils';

const API_URL: string = getApiURL();

export const fetchRandomAyah = (req?: any) => {
  const options = __SERVER__
    ? backendRequestOptions(req)
    : {
        credentials: 'include',
      };
  return fetch(`${API_URL}/v1/get_ayah/?format=json`, options)
    .then(res => res.json())
    .then(json => {
      return json;
    });
};

export const fetchSpecificAyah = (surah: number, ayah: number) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      surah,
      ayah,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
  };
  return fetch(`${API_URL}/v1/get_ayah/?format=json`, options).then(res =>
    res.json()
  );
};

// Uploading the recording file after each recitation.
export const sendRecording = (
  audio: any,
  surah: number,
  ayah: number,
  hash: string,
  sessionId: string,
  isContinuous: boolean
): Promise<Response> => {
  const recitationMode = isContinuous ? 'continuous' : 'discrete';
  const body = new FormData();

  body.append('file', audio, surah + '_' + ayah + '_' + hash + '.wav');
  body.append('surah_num', String(surah));
  body.append('ayah_num', String(ayah));
  body.append('hash_string', hash);
  body.append('session_id', sessionId);
  body.append('recitation_mode', recitationMode);

  return fetch(`${API_URL}/v1/recordings/`, {
    method: 'POST',
    body,
    credentials: 'include',
  });
};

export const fetchSurah = (num: number) => {
  return fetch(`${API_URL}/v1/surah/${num}/?format=json`).then(res =>
    res.json()
  );
};
