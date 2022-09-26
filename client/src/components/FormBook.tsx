import axios from 'axios';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { IoMdVolumeHigh } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import useBook from '../context/hooks/useBook';
import { useForm } from '../hooks/useForm';
import { Book } from '../interfaces';
import { configAxios } from '../utils/configAxios';
import { Button } from './Button';

export interface FormGen {
  id?: number;
  name: string;
  review?: string;
  price: number;
  stock: number;
  author: string;
}

export const FormBook = () => {
  const { form, setForm, handleChange } = useForm<Book>();

  const [loading, setLoading] = useState(true);
  const {
    categories,
    catId,
    setCatId,
    handleSubmit,
    setFile,
    getBook,
    loading: loadingBook,
    book,
  } = useBook();

  const params = useParams();
  useEffect(() => {
    if (params.id) {
      getBook(params.id);
    }
  }, []);

  useEffect(() => {
    if (params.id) {
      setForm(book);
      if (book.categories) {
        setCatId(book.categories.map((c) => c.id));
      }
      setLoading(false);
    }
    if (!params.id) {
      setCatId([]);
    }
    console.log(params);
  }, [params, book]);

  //submit
  const submit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const {
      isNew,
      categories,
      createdAt,
      metadata,
      updatedAt,
      image,
      ...rest
    } = form;
    handleSubmit(rest);
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
        console.log(options[i], 'OPTIONS');
        setCatId([...catId, parseInt(options[i].value)]);
      }
    }
  };

  const quitCategory = (cid: any) => {
    setCatId(catId.filter((c) => c !== cid));
  };

  if (loading && loadingBook) return <p>loading</p>;
  return (
    <div className="pt-10">
      <form
        className="bg-slate-100 p-8 rounded-md shadow-md m-auto md:w-4/6 lg:w-1/2"
        onSubmit={submit}
      >
        <div className="flex flex-col my-3">
          <label htmlFor="name" className="mb-1 font-bold text-slate-600">
            Name
          </label>
          <input
            className="p-2 border"
            type="text"
            name="name"
            value={(form && form.name) || ''}
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
            value={(form && form.price) || ''}
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
            value={(form && form.stock) || ''}
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
            value={(form && form.author) || ''}
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
            {categories.map((opt) => (
              <option value={opt.id} key={opt.id}>
                {opt.name}
              </option>
            ))}
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
            value={(form && form.review) || ''}
            placeholder="e.g once there was a boy who was a boy..."
            id="review"
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
