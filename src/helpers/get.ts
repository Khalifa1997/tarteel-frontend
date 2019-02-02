import {fetchSessionData} from "../api";
import {setAyah} from "../store/actions/ayahs";
import {setDemographicData} from "../store/actions/demographicData";
import {setFetchedProfile, setPassedOnBoarding, setUserRecitedAyahs} from "../store/actions/profile";
import {toggleIsContinuous} from "../store/actions/status";
import {IProfile} from "../types/GlobalState";

export const getLocalStorage = async (store: any) => {
  try {
    const passedOnBoarding = Boolean(JSON.parse(await localStorage.getItem("passedOnBoarding")));
    if (passedOnBoarding) {
      store.dispatch(setPassedOnBoarding());
    }
    store.dispatch(setUserRecitedAyahs(Number(await localStorage.getItem("userRecitedAyahs"))));
    const demographicData = await localStorage.getItem("demographicData");
    if (demographicData) {
      store.dispatch(setDemographicData(JSON.parse(demographicData)));
    }
  } catch (e) {
    console.log(e.message);
  }
};


export const loadSessionData = (store: any, request) => {
    return fetchSessionData(request)
      .then((profile: Partial<IProfile>) => {
        return store.dispatch(setFetchedProfile(profile))
      })
      .catch((e) => {

      })
}
