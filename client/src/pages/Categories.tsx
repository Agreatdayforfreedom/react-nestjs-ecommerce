import axios from 'axios';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { Book, Category } from '../interfaces';

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesBooks, setCategoriesBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState<string>('');

  const queries = useLocation();
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/categories`
      );
      setCategories(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (query === '') return;
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/categories/${
          queries.search.split('?')[1]
        }`
      );
      console.log(data);
      setCategoriesBooks(data.books);
    };
    fetch();
    setQuery(queries.search);
  }, [queries]);

  if (query === '') {
    return (
      <div className="flex w-2/3 m-auto justify-between mt-10">
        {categories.map((c) => (
          <Link
            to={`/categories?${c.id}`}
            type="submit"
            className="inline-block text-2xl text-amber-500 font-bold hover:cursor-pointer after:content-[''] after:w-0 after:block after:bg-amber-600 after:h-1 hover:after:w-full after:transition-all"
          >
            {c.name}
          </Link>
        ))}
      </div>
    );
  }

  return <p>dajwo0d9awjd0aw9dja0wd9j</p>;
};
