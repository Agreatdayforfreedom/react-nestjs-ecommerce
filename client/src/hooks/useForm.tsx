import { ChangeEvent, useState } from 'react';

interface Form<T> {
  handleChange: (props: ChangeEvent<HTMLInputElement>) => void;
  form: T;
  setForm: (state: T) => void;
}

export const useForm = <T extends Object>(): Form<T> => {
  const [form, setForm] = useState<T>({} as T);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  };

  return {
    handleChange,
    form,
    setForm,
  };
};
