import config from '../../config';
import { backendRequestOptions } from '../helpers/cookie';

const API_URL = config('apiURL');

export const fetchEvaluatorAyah = (req?: any) => {
  const options = __SERVER__
    ? backendRequestOptions(req)
    : {
        credentials: 'include',
      };
  return fetch(`${API_URL}/api/v2/evaluator/?format=json`, options).then(
    (res: Response) => res.json()
  );
};

export const submitAyah = (evaluation: string, recordingId: number) => {
  const ayah = {
    recording_id: recordingId,
    evaluation,
  };
  fetch(`${API_URL}/api/v2/submit_evaluation`, {
    method: 'POST',
    body: JSON.stringify({ ayah }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
    .then(res => {
      if (res.status === 201) {
        console.log('Successfully Submitted!');
      }
    })
    .catch(e => {
      console.log(e.message);
    });
};

export const fetchSpecificEvaluatorAyah = (
  surahNum: number,
  ayahNum: number,
  recordingId: number,
) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      recording_id: recordingId,
      surah: surahNum,
      ayah: ayahNum,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
  };
  return fetch(`${API_URL}/api/v2/evaluator/?format=json`, options).then(
    (res: Response) => {
      if (res.status !== 200) {
        return Promise.reject(res);
      } else {
        return res.json();
      }
    }
  );
};
