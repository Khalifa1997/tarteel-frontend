import { backendRequestOptions } from '../helpers/cookie';
import { getApiURL } from '../client/utils/apiUtils';

const API_URL: string = getApiURL();

export const fetchRandomAyah = (req?: any) => {
  const options = __SERVER__
    ? backendRequestOptions(req)
    : {
        credentials: 'include',
      };
  return fetch(`${API_URL}/v1/quran/ayah/random/`, options)
    .then(res =>res.json())
    .then(json => {
      // Rename b/c ayah shape takes chapterId and verseNumber instead of
      // surah and number
      const oldChapterId = 'chapter_id';
      const newChapterId = 'surah';
      const oldVerseNumber = 'verse_number';
      const newVerseNumber = 'number';
      json[oldChapterId] = json[newChapterId];
      json[oldVerseNumber] = json[newVerseNumber];
      return json;
    });
};

export const fetchSpecificAyah = (surah: number, ayah: number) => {
  const options = {
    credentials: 'include',
  };
  return fetch(`${API_URL}/v1/quran/ayah/?ayah=${ayah}&surah=${surah}`, options)
    .then(res => res.json())
    .then(json => {
      // Rename b/c ayah shape takes chapterId and verseNumber instead of
      // surah and number
      const OLD_CHAPTER_ID = 'chapter_id';
      const NEW_CHAPTER_ID = 'surah';
      const OLD_VERSE_NUMBER = 'verse_number';
      const NEW_VERSE_NUMBER = 'number';
      json[OLD_CHAPTER_ID] = json[NEW_CHAPTER_ID];
      json[OLD_VERSE_NUMBER] = json[NEW_VERSE_NUMBER];
      return json;
    });
};

/** Upload the recording file after each recitation. */
export const sendRecording = (
  audio: any,
  surah: number,
  ayah: number,
  hash: string,
  sessionId: string,
  isContinuous: boolean,
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
  return fetch(`${API_URL}/v1/surah/${num}/?format=json`)
    .then(res => res.json());
};
