import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DDFiltersAndOrders } from '../components/DDFiltersAndOrders';
import { Loading } from '../components/Loading';
import { PreviewBook } from '../components/PreviewBook';
import useBook from '../context/hooks/useBook';
import { IoMdArrowDropright } from 'react-icons/io';
import axios from 'axios';
import { Book, Loading as ILoading } from '../interfaces';
import { AsideFilter } from '../components/AsideFilter';
import { OrderMenu } from '../components/OrderMenu';

export const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<ILoading>(true);

  const { search, params, categories } = useBook();

  const loc = useLocation();

  const getBooksWithFilter = async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/book${loc.search}`
      );
      setBooks(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooksWithFilter();
  }, [loc]);

  if (loading) return <Loading />;
  return (
    <>
      <OrderMenu />
      <div className="flex flex-col md:flex-row">
        <div className="md:hidden">
          <DDFiltersAndOrders />
        </div>
        <AsideFilter />

        <section className="p-1 w-full">
          <div className="grid border p-1 mx-2 mt-2 gap-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {books[0] ? (
              books.map((book) => <PreviewBook book={book} key={book.id} />)
            ) : (
              <div className="w-full text-center mt-10">
                <p className="font-bold text-red-600">Book not found</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};
