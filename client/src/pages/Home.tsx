import { useEffect, useState } from 'react';
import axios from 'axios';
import { PreviewBook } from '../components/PreviewBook';
import { Book } from '../interfaces';

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_URL_BACK}/book/books`
      );
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <section className="flex">
      {books.map((book: Book) => (
        <PreviewBook book={book} key={book.name} />
      ))}
    </section>
  );
};

export default Home;
