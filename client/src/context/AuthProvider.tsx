import axios, { AxiosRequestConfig } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Config, configAxios } from '../utils/configAxios';

interface Props {
  children: ReactNode;
}

export interface Auth {
  id: number;
  username: string;
  role: string;
}

export interface AuthContextProps {
  auth: Auth;
  setAuth: (state: Auth) => void;
  loading: Loading;
  logout: () => void;
}

export type Loading = boolean;

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [auth, setAuth] = useState<Auth>({} as Auth);
  const [loading, setLoading] = useState<Loading>(true);

  useEffect(() => {
    const auth = async () => {
      try {
        const token: string | null = localStorage.getItem('token');
        if (!token) return setLoading(false);

        const config = configAxios(token);

        const { data } = await axios(
          `${import.meta.env.VITE_URL_BACK}/auth/profile`,
          config as AxiosRequestConfig<Config>
        );
        setAuth(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    auth();
  }, []);

  const logout = () => {
    setAuth({} as Auth);
    localStorage.removeItem('token');
    console.log(auth);
  };
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loading, logout } as AuthContextProps}
    >
      {children}
    </AuthContext.Provider>
  );
};
