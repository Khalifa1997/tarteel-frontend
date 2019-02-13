import Cookies, {CookieAttributes} from 'js-cookie'

export const backendRequestOptions = (request: any) => {
  const cookies = request.universalCookies.getAll();
  const cookieString = Object.entries(cookies).map(([key, val]) => `${key}=${val}`).join('; ');
  return {
    headers: {
      Cookie: cookieString,
    },
    credentials: 'include',
  }
}

export const setCookie = (name: string, value: any, options: CookieAttributes) => {
  if (__CLIENT__) {
    Cookies.set(name, value, options)
  }
}


export const getCookie = (cookies, key) => {
  return cookies ? cookies.get(key) ? JSON.parse(cookies.get(key)) : false : false
}
