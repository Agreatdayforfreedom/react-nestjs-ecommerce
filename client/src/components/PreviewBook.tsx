import { Link } from 'react-router-dom';
import { Book } from '../interfaces';

interface Props {
  book: Book;
}

export const PreviewBook = ({ book }: Props) => {
  return (
    <>
      <div className="w-full text-center border">
        <Link to={`/book/${book.id}`}>
          <img
            src={book.image}
            alt={book.name}
            className="w-56 h-80 sm:w-36 sm:h-56 m-auto hover:shadow-xl hover:shadow-slate-300 transition-all"
          />
          <p className="text-orange-600 text-xl font-light hover:underline">
            {book.name}
          </p>
        </Link>
        <p>{book.author}</p>
        <p className="font-bold text-green-600">${book.price} usd</p>
        <button></button>
      </div>
    </>
  );
};
