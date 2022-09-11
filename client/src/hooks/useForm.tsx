import { ChangeEvent, useState } from 'react';
import { FormSignUp } from '../interfaces';

export const useForm = <T extends Object>(initialState: T): any => {
  const [form, setForm] = useState<T>(initialState);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  };

  return {
    handleChange,
    form,
  };
};
