export interface Config {
  headers: {
    'Content-Type': string;
    Authorization: string;
  };
}

export const configAxios = (token: string): Config => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};
