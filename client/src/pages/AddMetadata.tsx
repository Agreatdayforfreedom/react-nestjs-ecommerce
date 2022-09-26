import axios from 'axios';
import { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { FormMetadata } from '../components/FormMetadata';
import { useForm } from '../hooks/useForm';
import { configAxios } from '../utils/configAxios';

export const AddMetadata = () => {
  // const { handleChange, form } = useForm();

  // const token = localStorage.getItem('token');
  // if (!token) return <p>loading</p>;

  // const navigate = useNavigate();
  // const { id } = useParams();
  // const config = configAxios(token);

  // const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
  //   evt.preventDefault();

  //   const { data } = await axios.post(
  //     `${import.meta.env.VITE_URL_BACK}/metadata`,
  //     { ...form, book: id },
  //     config
  //   );
  //   console.log(data);
  //   navigate(`/book/${id}`);
  // };

  return <FormMetadata />;
};
