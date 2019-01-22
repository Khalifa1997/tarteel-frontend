import config from '../../config';

export default (req: any) => {
  const locales = config('locales');
  const availableLocals = Object.keys(locales);
  const expireDate = new Date();
  let currentLocal;

  const cookies = req.universalCookies;

  expireDate.setFullYear(expireDate.getFullYear() + 1);

  if (req && req.query.lang) {
    currentLocal = req.query.lang;
  } else {
    currentLocal = cookies.get('currentLocale');
  }

  if (availableLocals.indexOf(currentLocal) === -1) {
    currentLocal = config('defaultLocale');
  }

  cookies.set('currentLocale', currentLocal, {
    path: '/',
    expires: new Date(expireDate),
  });
  const localeData = config('localeMessages')[currentLocal];

  return localeData.messages;
};
