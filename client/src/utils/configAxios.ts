export interface Config {
  headers: {
    'Content-Type': string;
    Authorization: string;
  };
}

export const configAxios = (): Config => {
  const token: string | null = localStorage.getItem('token');

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};
