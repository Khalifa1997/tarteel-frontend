import config from '../../../config';

/**
 * Get the API URL based on whether we're in a local dev environment,
 * staging (now.sh) by looking at the link or production (tarteel.io).
 */
export const getApiURL = () => {
  if (__DEVELOPMENT__) {
    return 'http://localhost:8000';
  } else if (config('deployIsProd')) {
    return config('apiURL');
  } else {
    return config('apiDevURL');
  }
};
