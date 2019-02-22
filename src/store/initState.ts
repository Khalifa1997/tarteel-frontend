import ReduxState from '../types/GlobalState';
import { getCookie } from '../helpers/cookie';

const emptyAyah = {
  id: -1,
  verseNumber: -1,
  chapterId: -1,
  pageNumber: -1,
  juzNumber: -1,
  hizbNumber: -1,
  rubNumber: -1,
  verseKey: '',
  words: [],
  textMadani: '',
  textSimple: '',
  sajdah: false,
  translations: [],
  hash: -1,
  sessionId: '',
};

const initState: (cookies?: any) => ReduxState = cookies => {
  return {
    ayahs: {
      currentAyah: emptyAyah,
      prevAyah: [],
      nextAyah: [],
      isFetchingCurrentAyah: false,
      currentSurah: {
        chapterId: '',
        ayahs: {},
      },
    },
    status: {
      isRecording: false,
      isDoneRecording: false,
      isContinuous: getCookie(cookies, 'continuous'),
      isFetching: true,
    },
    demographicData: {
      gender: '',
      age: '',
      qiraah: '',
      ethnicity: '',
    },
    profile: {
      passedOnBoarding: getCookie(cookies, 'passedOnBoarding'),
      recordingCount: 0,
      dailyCount: 0,
      userRecitedAyahs: 0,
      evaluationsCount: 0,
      sessionKey: '',
      askForDemographics: false,
    },
    evaluator: {
      currentAyah: emptyAyah,
      nextAyah: emptyAyah,
    },
    recognition: {
      queryText: '',
      matches: [],
      matchedTerms: [],
      suggestions: [],
      canRecord: true,
    },
    router: {
      location: {},
    },
    dataset: {
      sample: [],
    },
  };
};

export default initState;
