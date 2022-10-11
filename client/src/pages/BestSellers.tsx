import axios from 'axios';
import { useEffect, useState } from 'react';
import { PreviewBook } from '../components/PreviewBook';
import { Book } from '../interfaces';

export const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState<Book[]>([]);

  useEffect(() => {
    const getTop = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/book/tophundred`
      );
      setBestSellers(data);
    };
    getTop();
  }, []);
  return (
    <section className="w-full">
      <div>
        <p className="text-center my-3 font-bold text-2xl border-y text-orange-400">
          Best sellers
        </p>
      </div>
      <div className="grid border p-1 mx-2 mt-2 gap-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {bestSellers &&
          bestSellers.map((book: Book, i: number) => (
            <PreviewBook book={book} key={book.id} best={true} i={i + 1} />
          ))}
      </div>
    </section>
  );
};
