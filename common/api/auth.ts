import { API_URL, URL_PATH } from '../constants';
import { LoggedUser } from '../types';

export const login = async (
  username: string,
  password: string
): Promise<LoggedUser> => {
  const res = await fetch(`${API_URL}/${URL_PATH.LOGIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Username: username,
      Password: password,
    }),
  });
  if (!res.ok) {
    throw new Error(`Status ${res.status}, login failed, invalid credentials`);
  }
  const data = await res.json();
  return {
    userId: data.UserId,
    accessToken: data.AccessToken,
    refreshToken: data.RefreshToken,
  } as LoggedUser;
};
