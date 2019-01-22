import AyahShape from "../shapes/AyahShape";

interface ReduxState {
  users: IUser[];
  ayahs: {
    currentAyah: AyahShape;
    prevAyah: AyahShape[],
    nextAyah: AyahShape[],
    isFetchingCurrentAyah: boolean;
    currentSurah: ISearchSurah;
  };
  status: IStatus;
  demographicData: IDemographics;
  profile: IProfile;
  evaluator: IEvaluator;
  router: {
    location: Location;
  }
}

export interface IUser {
  name: string;
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
    [key: string]: ISearchAyah
  };
}

export default ReduxState;
