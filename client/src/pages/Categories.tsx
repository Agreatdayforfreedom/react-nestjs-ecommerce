import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AsideFilter } from '../components/AsideFilter';
import { DDFiltersAndOrders } from '../components/DDFiltersAndOrders';
import { Loading } from '../components/Loading';
import { OrderMenu } from '../components/OrderMenu';
import { PreviewBook } from '../components/PreviewBook';
import useBook from '../context/hooks/useBook';
import { Book } from '../interfaces';

export const Categories = () => {
  const [categoriesBooks, setCategoriesBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const loc = useLocation();

  const { categories, loading: loadingBook, search } = useBook();

  useEffect(() => {
    setCategoriesBooks([]);
    const fetch = async () => {
      if (loc.search === '') return;
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/book/category${loc.search}
        `
      );
      setCategoriesBooks(data);
      setLoading(false);
    };
    fetch();
  }, [loc]);

  if (loadingBook) return <Loading />;
  if (loc.search === '') {
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

  if (loading || loadingBook) return <Loading />;
  return (
    <>
      <OrderMenu />
      <div className="md:flex">
        <AsideFilter />
        <div className="md:hidden">
          <DDFiltersAndOrders />
        </div>
        <section className="w-full">
          <div className="grid border p-1 mx-2 mt-2 gap-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {categoriesBooks &&
              categoriesBooks.map((book) => (
                <PreviewBook book={book} key={book.id} />
              ))}
          </div>
        </section>
      </div>
    </>
  );
};
