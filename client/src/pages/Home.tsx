import { useEffect, useState } from 'react';
import axios from 'axios';
import { PreviewBook } from '../components/PreviewBook';
import { Book } from '../interfaces';
import { Slider } from '../components/Slider';
import useBook from '../context/hooks/useBook';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [booksCat, setBooksCat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const f = async () => {
      try {
        const { data } = await axios(`${import.meta.env.VITE_URL_BACK}/book`);
        console.log(data);
        setBooks(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    f();

    const fa = async () => {
      try {
        const { data } = await axios(
          `${import.meta.env.VITE_URL_BACK}/book/category?cat=Fiction2`
        );
        console.log(data);
        setBooksCat(data.books);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fa();
  }, []);
  if (loading) return <p>loading</p>;
  return (
    <section className="flex flex-col">
      <Slider books={books} title="You might be interested" />
    </section>
  );
};

export default Home;
