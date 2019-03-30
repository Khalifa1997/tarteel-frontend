import { IDemographics } from '../types/GlobalState';
import { setCookie } from './cookie';

export function setDemographicData(obj: IDemographics) {
  try {
    localStorage.setItem('demographicData', JSON.stringify(obj));
    setCookie('demographicData', true, { path: '/' });
  } catch (e) {
    console.log(e.message);
  }
}

export function storeUserRecitedAyahs(num: number) {
  try {
    localStorage.setItem('userRecitedAyahs', String(num));
  } catch (e) {
    console.log(e.message);
  }
}
