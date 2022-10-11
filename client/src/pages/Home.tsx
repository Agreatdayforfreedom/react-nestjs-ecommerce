import { useEffect, useState } from 'react';
import axios from 'axios';
import { PreviewBook } from '../components/PreviewBook';
import { Book } from '../interfaces';
import { Slider } from '../components/Slider';
import useBook from '../context/hooks/useBook';
import { Spinner } from '../components/Spinner';
import { Link } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { bestSellers, getTop } = useBook();

  const f = async () => {
    try {
      const { data } = await axios(`${import.meta.env.VITE_URL_BACK}/book`);
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    f();
    getTop();
    setLoading(false);
  }, []);
  if (loading) return <Spinner />;
  return (
    <section className="flex flex-col mx-1">
      <div className="relative  w-full bg-black my-2 after:content-[''] after:absolute after:bg-neutral-900 after:top-0 after:w-full after:h-full after:opacity-50">
        <img
          src="/imgs/1.jpg"
          alt="ilustrative image of a book"
          className="w-full max-w-full h-auto  opacity-80 border-2 border-neutral-800"
        />
        <div className="absolute flex justify-center items-center top-0 w-full h-full">
          <p className="flex flex-col text-center z-50 text-3xl text-white w-1/2">
            There are no beautiful surfaces without a terrible depth.
            <span className="text-start text-sm">- Friedrich Nietzsche</span>
          </p>
        </div>
      </div>
      <div className="flex justify-between border py-2">
        <div className="flex flex-col w-full mx-1">
          <Link
            to="/bestsellers"
            className="text-end px-2 text-orange-400 hover:underline"
          >
            Best sellers
          </Link>
          <div className="grid mt-2 gap-2 grid-cols-3 ws:grid-cols-5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {bestSellers.map((bs, i) => (
              <PreviewBook
                book={bs}
                key={bs.id}
                best={true}
                i={i + 1}
                infoInvisible={true}
              />
            ))}
          </div>
        </div>
        <aside className="w-1/6 border ml-1">some info</aside>
      </div>
      <Slider books={books} title="You might be interested" />
    </section>
  );
};

export default Home;
