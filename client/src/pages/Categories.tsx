import axios from 'axios';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { PreviewBook } from '../components/PreviewBook';
import { useForm } from '../hooks/useForm';
import { Book, Category } from '../interfaces';

export const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesBooks, setCategoriesBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const queries = useLocation();
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/categories`
      );
      setCategories(data);
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    setCategoriesBooks([]);
    const fetch = async () => {
      if (queries.search === '') return;
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/categories/${
          queries.search.split('?')[1]
        }`
      );
      setCategoriesBooks(data[0].books);
      setLoading(false);
    };
    fetch();
  }, [queries]);

  if (loading) return <p>loading</p>;
  if (queries.search === '') {
    return (
      <div className="flex w-2/3 m-auto justify-between mt-10">
        {categories.map((c) => (
          <Link
            key={c.id}
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

  if (loading) return <p>loading</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3">
      {categoriesBooks &&
        categoriesBooks.map((book) => (
          <PreviewBook book={book} key={book.id} />
        ))}
    </div>
  );
};
