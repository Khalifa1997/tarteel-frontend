
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
