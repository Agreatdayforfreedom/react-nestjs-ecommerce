import axios from 'axios';
import { stringify } from 'querystring';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AsideFilter } from '../components/AsideFilter';
import { DDFiltersAndOrders } from '../components/DDFiltersAndOrders';
import { FilterCard } from '../components/FilterCard';
import { Spinner } from '../components/Loading';
import { OrderMenu } from '../components/OrderMenu';
import { PreviewBook } from '../components/PreviewBook';
import useBook from '../context/hooks/useBook';
import { Book } from '../interfaces';
import { SpawnBooksSection } from '../components/SpawnBooksSection';

interface CatBooks {
  cat: string;
  books: Book[];
}
export const Categories = () => {
  const [categoriesBooks, setCategoriesBooks] = useState<CatBooks>(
    {} as CatBooks
  );
  const [loading, setLoading] = useState(true);

  const loc = useLocation();
  const { categories, loading: loadingBook } = useBook();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/book/category${loc.search}
        `
      );
      setCategoriesBooks(data);
      setLoading(false);
    };
    if (loc.search !== '') {
      fetch();
    }
  }, [loc]);

  if (loc.search === '') {
    if (loadingBook) return <Spinner />;
    return (
      <div className="flex w-2/3 m-auto justify-between mt-10">
        {categories.map((c) => (
          <Link
            key={c.id}
            to={`/categories?cat=${c.name}${c.id}`}
            type="submit"
            className="inline-block text-2xl text-amber-500 font-bold hover:cursor-pointer after:content-[''] after:w-0 after:block after:bg-amber-600 after:h-1 hover:after:w-full after:transition-all"
          >
            {c.name}
          </Link>
        ))}
      </div>
    );
  }
  if (loading) return <Spinner />;

  return (
    <>
      <SpawnBooksSection
        books={categoriesBooks.books}
        text={categoriesBooks.cat}
      />
    </>
  );
};
