import axios from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Alert } from '../interfaces';
import useAuth from '../context/hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { Navigate, useNavigate } from 'react-router-dom';
import { Auth } from '../context/AuthProvider';

const initialState = {
  username: '',
  email: '',
  password: '',
  rpassword: '',
};

export const Signup = () => {
  const [alert, setAlert] = useState<Alert>({} as Alert);

  const navigate = useNavigate();

  //hooks
  const { auth, setAuth, loading } = useAuth();
  const { handleChange, form } = useForm(initialState);

  const handleSubmit = async (
    evt: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    evt.preventDefault();

    const { username, email, password, rpassword } = form;

    // validatios
    if ([username, email, password, rpassword].includes('')) {
      setAlert({ message: 'All fields are required', err: true });
      setTimeout(() => {
        setAlert({} as Alert);
      }, 3000);
      return;
    }

    if (password !== rpassword) {
      setAlert({ message: 'Passwords do not match', err: true });
      setTimeout(() => {
        setAlert({} as Alert);
      }, 3000);
      return;
    }

    const { data } = await axios.post(
      `${import.meta.env.VITE_URL_BACK}/auth/signup`,
      { username, email, password }
    );
    localStorage.setItem('token', data.access_token);
    navigate('/');
    setAuth(data);
  };

  const { message } = alert;
  if (loading) return <p>Loading</p>;
  if (auth.id) return <Navigate to="/" />;
  return (
    <section className="mx-4">
      <form
        className="bg-slate-100 mt-10 p-8 rounded-md shadow-md m-auto md:w-4/6 lg:w-1/2"
        onSubmit={handleSubmit}
      >
        {message && <p>{alert.message}</p>}
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
            htmlFor="email"
            className="mb-1 font-bold text-slate-600 text-md"
          >
            Email
          </label>
          <input
            className="p-2 border"
            type="email"
            name="email"
            placeholder="hey@example.com"
            id="email"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col my-3">
          <label htmlFor="password" className="mb-1 font-bold text-slate-600">
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

        <div className="flex flex-col my-3">
          <label htmlFor="rpassword" className="mb-1 font-bold text-slate-600">
            Repeat Password
          </label>
          <input
            className="p-2 border"
            type="password"
            name="rpassword"
            placeholder="Repeat Password"
            id="rpassword"
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
    </section>
  );
};
