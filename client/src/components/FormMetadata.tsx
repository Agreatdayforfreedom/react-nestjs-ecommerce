import axios from 'axios';
import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useBook from '../context/hooks/useBook';
import { useForm } from '../hooks/useForm';
import { Metadata } from '../interfaces';
import { Button } from './Button';

export const FormMetadata = () => {
  const [loading, setLoading] = useState(false);
  const { handleChange, form, setForm } = useForm<Metadata>();

  const { handleSubmitMetadata } = useBook();
  const params = useParams();
  console.log(params);
  useEffect(() => {
    const getMetadata = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/metadata/${params.idM}`
      );
      setForm(data);
      setLoading(false);
    };
    if (params.idM) {
      getMetadata();
    }
  }, [params]);

  const submit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (params.idM) {
      handleSubmitMetadata(form, params.idM);
    } else if (params.id) {
      handleSubmitMetadata(form, params.id);
    }
  };

  if (loading) return <p>Spinner</p>;
  return (
    <form
      className="bg-slate-100 p-8 rounded-md shadow-md m-auto md:w-4/6 lg:w-1/2"
      onSubmit={submit}
    >
      <div className="flex flex-col my-3">
        <label htmlFor="publisher" className="mb-1 font-bold text-slate-600">
          Publisher
        </label>
        <input
          className="p-2 border"
          type="text"
          name="publisher"
          value={(form && form.publisher) || ''}
          placeholder="Exampublisher"
          id="publisher"
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col my-3">
        <label htmlFor="pages" className="mb-1 font-bold text-slate-600">
          Pages
        </label>
        <input
          className="p-2 border"
          type="number"
          name="pages"
          value={(form && form.pages) || ''}
          placeholder="221"
          id="pages"
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col my-3">
        <label htmlFor="language" className="mb-1 font-bold text-slate-600">
          Language
        </label>
        <input
          className="p-2 border"
          type="text"
          name="language"
          value={(form && form.language) || ''}
          placeholder="English"
          id="language"
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end">
        <Button bName="Save" />
      </div>
    </form>
  );
};
