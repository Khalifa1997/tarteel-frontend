import config from '../../config';
import { backendRequestOptions } from '../helpers/cookie';

const API_URL = __DEVELOPMENT__ ? 'http://localhost:8000' : config('apiURL');

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
  console.log(ayah);
  fetch(`${API_URL}/api/v2/evaluator/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ ayah }),
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
