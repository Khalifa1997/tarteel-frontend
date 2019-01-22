import {backendRequestOptions} from "../helpers/cookie";
import config from '../../config';


const API_URL =  config('apiURL');

export const fetchEvaluatorAyah = (req?: any) => {
  const options = __SERVER__ ? backendRequestOptions(req) : {
    credentials: 'include',
  };
  return fetch(`${ API_URL }/api/evaluator`, options)
    .then(res => res.json())
}


export const submitAyah = (evaluation: string, recordingId: number) => {
  const ayah = {
    "recording_id": recordingId,
    evaluation,
  }
  fetch(`${ API_URL }/api/evaluator/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ayah})
  })
    .then((res => {
      if (res.status === 201) {
        console.log("Successfully Submitted!");
      }
    }))
    .catch((e) => {
      console.log(e.message);
    })
}
