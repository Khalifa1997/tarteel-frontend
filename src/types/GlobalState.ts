import AyahShape from "../shapes/AyahShape";

interface ReduxState {
  ayahs: {
    currentAyah: AyahShape;
    prevAyah: AyahShape[];
    nextAyah: AyahShape[];
    isFetchingCurrentAyah: boolean;
    currentSurah: ISearchSurah;
  };
  status: IStatus;
  demographicData: IDemographics;
  profile: IProfile;
  evaluator: IEvaluator;
  recognition: IRecognition;
  router: IRouter;
  dataset: IDataset;
}

export interface IRouter {
  location: Location;
}

export interface IStatus {
  isRecording: boolean;
  isDoneRecording: boolean;
  isContinuous: boolean;
  isFetching: boolean;
}

export interface IProfile {
  passedOnBoarding: boolean;
  recordingCount: number;
  dailyCount: number;
  evaluationsCount: number;
  userRecitedAyahs: number;
  sessionKey: string;
  askForDemographics: boolean;
}

export interface IDataset {
  sample: string[];
}

export interface IDemographics {
  gender: string;
  age: string;
  qiraah: string;
  ethnicity: string;
}

interface IEvaluator {
  currentAyah: AyahShape;
  nextAyah: AyahShape;
}

export interface ISearchAyah {
  displayText: string;
  text: string;
}

export interface ISearchSurah {
  chapterId: string;
  ayahs: {
    [key: string]: ISearchAyah;
  };
}

export interface IRecognition {
  queryText: string;
  suggestions: [];
  matchedTerms: string[];
  matches: any[];
  canRecord: boolean;
}

export default ReduxState;
