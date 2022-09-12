import axios, { AxiosRequestConfig } from 'axios';
import { FormEvent } from 'react';
import { useForm } from '../hooks/useForm';
import { User } from '../interfaces';
import { configAxios } from '../utils/configAxios';

interface FormGen {
  name: string;
  review?: string;
  price: number;
  stock: number;
  author: string;
}

export const CreateBook = () => {
  const { form, handleChange } = useForm<FormGen>();

  // const { name, review, price, stock, author } = form;

  const token = localStorage.getItem('token');
  if (!token) return <p>loading</p>;

  const config = configAxios(token);

  const handleSubmit = async (
    evt: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    evt.preventDefault();

    const { data } = await axios.post(
      `${import.meta.env.VITE_URL_BACK}/book`,
      form,
      config
    );

    console.log(data);
  };

  return (
    <>
      <form
        className="bg-slate-100 mt-10 p-8 rounded-md shadow-md m-auto md:w-4/6 lg:w-1/2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col my-3">
          <label htmlFor="name" className="mb-1 font-bold text-slate-600">
            Name
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

        <div className="flex flex-col my-3">
          <label htmlFor="price" className="mb-1 font-bold text-slate-600">
            Price
          </label>
          <input
            className="p-2 border"
            type="price"
            name="price"
            placeholder="$2000"
            id="price"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col my-3">
          <label htmlFor="stock" className="mb-1 font-bold text-slate-600">
            Stock
          </label>
          <input
            className="p-2 border"
            type="text"
            name="stock"
            placeholder="0"
            id="stock"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col my-3">
          <label htmlFor="author" className="mb-1 font-bold text-slate-600">
            Author
          </label>
          <input
            className="p-2 border"
            type="text"
            name="author"
            placeholder="e.g Friedrich Nietzsche"
            id="author"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col my-3">
          <label
            htmlFor="review"
            className="mb-1 font-bold text-slate-600 text-md"
          >
            Review
          </label>
          <input
            className="p-2 border"
            type="review"
            name="review"
            placeholder="e.g once there was a boy who was a boy..."
            id="review"
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
    </>
  );
};
