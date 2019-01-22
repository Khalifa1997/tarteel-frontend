import ReduxState from "../types/GlobalState";

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
}

const initState: (cookies?: any) => ReduxState = (cookies) => {
  return ({
    users: [],
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
      isContinuous: cookies ? JSON.stringify(cookies.get('continuous')) : false,
      isFetching: true,
    },
    demographicData: {
      gender: "",
      age: "",
      qiraah: "",
      ethnicity: "",
    },
    profile: {
      passedOnBoarding: false,
      recordingCount: 0,
      dailyCount: 0,
      userRecitedAyahs: 0,
      evaluationsCount: 0,
      sessionKey: "",
      askForDemographics: false,
    },
    evaluator: {
      currentAyah: emptyAyah,
      nextAyah: emptyAyah,
    },
    router: {
      location: {}
    }
  })
};

export default initState;
