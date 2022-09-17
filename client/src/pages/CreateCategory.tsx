import axios from 'axios';
import { FormEvent } from 'react';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
import { useForm } from '../hooks/useForm';
import { configAxios } from '../utils/configAxios';

interface Category {
  name: string;
}
export const CreateCategory = () => {
  const { form, handleChange } = useForm<Category>();

  const token = localStorage.getItem('token');
  if (!token) return <Loading />;
  const config = configAxios(token);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { data } = await axios.post(
      `${import.meta.env.VITE_URL_BACK}/categories`,
      form,
      config
    );
    console.log(data);
  };

  return (
    <div>
      <form
        className="bg-slate-100 mt-10 p-8 rounded-md shadow-md m-auto md:w-4/6 lg:w-1/2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col my-3">
          <label htmlFor="name" className="mb-1 font-bold text-slate-600">
            Category
          </label>
          <input
            className="p-2 border"
            type="text"
            name="name"
            placeholder="Name"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <Button bName="Create" />
        </div>
      </form>
    </div>
  );
};
