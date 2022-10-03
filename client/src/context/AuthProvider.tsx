import axios, { AxiosRequestConfig } from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../interfaces';
import { Config, configAxios } from '../utils/configAxios';

interface Props {
  children: ReactNode;
}

export interface Auth {
  id: number;
  username: string;
  role: string;
  cart: {
    id: number;
  };
  LIBScredits: number;
}

export interface AuthContextProps {
  auth: Auth;
  setAuth: (state: Auth) => void;
  refreshToken: () => void;
  loading: Loading;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: Props): JSX.Element => {
  const [auth, setAuth] = useState<Auth>({} as Auth);
  const [loading, setLoading] = useState<Loading>(true);

  const navigate = useNavigate();

  const token: string | null = localStorage.getItem('token');

  const config = configAxios(token!);
  useEffect(() => {
    const auth = async () => {
      try {
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

  const refreshToken = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/auth/refresh`,
        config
      );
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      }
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
      }
      setTimeout(() => {
        const { access_token, ...remainder } = data;
        setAuth(remainder);
        setLoading(false);
        navigate('/cart');
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setAuth({} as Auth);
    localStorage.removeItem('token');
  };
  return (
    <AuthContext.Provider
      value={
        { auth, setAuth, loading, logout, refreshToken } as AuthContextProps
      }
    >
      {children}
    </AuthContext.Provider>
  );
};
