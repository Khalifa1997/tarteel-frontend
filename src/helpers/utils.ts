import config from "../../config";

export const commaFormatter = (num: number) => Number(num).toLocaleString();

export const kFormatter = (num: number) => {
  return num > 999 ? (num / 1000).toFixed(1) + 'k' : num;
};

export const getApiURL = () => {
  if (__DEVELOPMENT__) {
    return 'http://localhost:8000';
  } else if (window.location.href.indexOf("now.sh") > -1) {
    return config('apiDevURL');
  } else {
    return config('apiURL');
  }
};
