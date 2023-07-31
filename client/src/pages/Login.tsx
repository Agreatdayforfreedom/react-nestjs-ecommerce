import axios, { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { Auth } from '../context/AuthProvider';
import useAuth from '../context/hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { Alert } from '../interfaces';

interface LoginForm {
  username: string;
  password: string;
}

export const Login = () => {
  const [alert, setAlert] = useState<Alert>({} as Alert);

  const { handleChange, form } = useForm<LoginForm>();

  const { setAuth, auth, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (
    evt: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    evt.preventDefault();
    const { username, password } = form;

    if (!username || !password) {
      setAlert({ message: 'All fields are required', err: true });
      setTimeout(() => {
        setAlert({} as Alert);
      }, 3000);
      return;
    }
    //if token is expired
    const token = localStorage.getItem('token');
    if (token) return localStorage.removeItem('token');

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL_BACK}/auth/login`,
        { username, password }
      );
      localStorage.setItem('token', data.access_token);
      setAuth(data);
      navigate('/');
    } catch (error) {
      setAuth({} as Auth);
      if (error instanceof AxiosError) {
        setAlert({ message: error.response?.data.message, err: true });
      }
    }
  };

  const { message } = alert;
  if (loading) return <Spinner />;
  if (auth.id) return <Navigate to="/" />;
  return (
    <div>
      <form
        className="bg-slate-100 mt-10 p-8 rounded-md shadow-md m-auto md:w-4/6 lg:w-1/2"
        onSubmit={handleSubmit}
      >
        {message ? <p className="alert">{message}</p> : ''}
        <div className="flex flex-col my-3">
          <label htmlFor="username" className="mb-1 font-bold text-slate-600">
            Username
          </label>
          <input
            className="p-2 border"
            type="text"
            name="username"
            placeholder="Username"
            id="username"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col my-3">
          <label
            htmlFor="password"
            className="mb-1 font-bold text-slate-600 text-md"
          >
            Password
          </label>
          <input
            className="p-2 border"
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          {/* TODO: convert to component */}
          <button
            type="submit"
            className="border px-4 py-3 bg-orange-400 
          rounded-md font-bold text-white hover:bg-orange-500 transition-all"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
