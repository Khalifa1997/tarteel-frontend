import {IDemographics} from "../types/GlobalState";


export function setDemographicData(obj: IDemographics) {
  try {
    localStorage.setItem("demographicData", JSON.stringify(obj));
  } catch (e) {
    console.log(e.message)
  }
}

export function storeUserRecitedAyahs(num: number) {
  try {
    localStorage.setItem("userRecitedAyahs", String(num))
  } catch (e) {
    console.log(e.message)
  }
}

export function storePassedOnBoarding() {
  try {
    localStorage.setItem("passedOnBoarding", String(true));
  }
  catch (e) {
    console.log(e.message)
  }
}
