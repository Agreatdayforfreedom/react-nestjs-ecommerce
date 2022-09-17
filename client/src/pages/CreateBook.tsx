import axios, { AxiosRequestConfig } from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
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
  const [file, setFile] = useState<any>();
  const [catId, setCatId] = useState<number[]>([]);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  if (!token) return <Loading />;

  const config = configAxios(token);

  //submit
  const handleSubmit = async (
    evt: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    evt.preventDefault();
    const { name, price, stock, author } = form;
    if ([name, price, stock, author].includes('')) return console.log('error');
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file, file.name);
    const { data } = await axios.post(
      `${import.meta.env.VITE_URL_BACK}/book`,
      { ...form, categories: catId },
      config
    );
    if (data.response) {
      throw new Error('Error trying to create the book');
    }
    await axios.post(
      `${import.meta.env.VITE_URL_BACK}/book/upload/${data.id}`,
      formData,
      config
    );

    navigate('/');
  };
  const handleChangeSelect = (evt: ChangeEvent<HTMLSelectElement>) => {
    //get all opts
    var options = evt.target.options;
    for (var i = 0, l = options.length; i < l; i++) {
      //if is selected then true
      if (options[i].selected) {
        //and if exist in catId state then return
        if (catId.find((v) => v.toString() === options[i].value)) {
          return;
        }
        //else add to the array
        setCatId([...catId, parseInt(options[i].value)]);
      }
    }
  };

  const quitCategory = (cid: any) => {
    setCatId(catId.filter((c) => c !== cid));
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
            htmlFor="file"
            className="mb-1 font-bold text-slate-600 text-md"
          >
            Image
          </label>
          <input
            className="p-2 border"
            type="file"
            name="file"
            id="file"
            onChange={(evt: ChangeEvent<HTMLInputElement>) =>
              evt.target.files?.length && setFile(evt.target.files[0])
            }
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="categories"
            className="mb-1 font-bold text-slate-600 text-md"
          >
            Category
          </label>
          <select
            multiple
            className="p-1 rounded border border-orange-700"
            name="categories"
            id="categories"
            onChange={handleChangeSelect}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          {catId &&
            catId.map((cid) => (
              <div className="flex my-1" key={cid}>
                <p className="font-bold">{cid}</p>
                <button
                  onClick={() => quitCategory(cid)}
                  className="flex text-sm rounded-full mx-2 px-2 bg-red-800"
                >
                  x
                </button>
              </div>
            ))}
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
          <Button bName="Create" />
        </div>
      </form>
    </>
  );
};
